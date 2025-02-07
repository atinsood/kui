/*
 * Copyright 2022 The Kubernetes Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Heading } from 'mdast'
import { u } from 'unist-builder'
import { visit } from 'unist-util-visit'
import { Literal, Node, Root, Text } from 'hast'
import { visitParents } from 'unist-util-visit-parents'

import { Tab } from '@kui-shell/core'

import preprocessCodeBlocks from './components/code/remark-codeblocks-topmatter'
import KuiFrontmatter, { hasWizardSteps, isValidPosition, isValidPositionObj } from './KuiFrontmatter'

export { tryFrontmatter } from './frontmatter-parser'

export function splitTarget(node) {
  if (node.type === 'raw') {
    const match = node.value.match(/<!-- ____KUI__SECTION_START____ (.*)/)
    if (match) {
      return match[1]
    }
  }
}

function isLiteral(node: Node): node is Literal {
  return typeof (node as Literal).value === 'string'
}

function isText(node: Node): node is Text {
  return node.type === 'text' && typeof (node as Text).value === 'string'
}

/** Parse out the frontmatter at the top of a markdown file */
function extractKuiFrontmatter(tree): KuiFrontmatter {
  // e.g.
  // layout:
  //    1: left
  //    default: wizard
  let frontmatter: KuiFrontmatter

  visit(tree, 'yaml', node => {
    if (isLiteral(node) && node.value) {
      try {
        const { load } = require('js-yaml')
        frontmatter = load(node.value)

        return false // stop traversing immediately
      } catch (err) {
        console.error('Error parsing Markdown yaml frontmatter', err)
      }
    }
  })

  return frontmatter
}

function defaultPosition(frontmatter: KuiFrontmatter) {
  return frontmatter && frontmatter.layout ? frontmatter.layout['default'] : undefined
}

function positionOf(sectionIdx: number, frontmatter: KuiFrontmatter) {
  const positionAsGiven =
    frontmatter.layout === 'wizard' ? 'wizard' : frontmatter.layout[sectionIdx] || defaultPosition(frontmatter)

  const position = isValidPosition(positionAsGiven)
    ? positionAsGiven
    : !isValidPositionObj(positionAsGiven)
    ? 'default'
    : positionAsGiven.position

  return { positionAsGiven, position }
}

/** Scan and process the `wizard` schema of the given `frontmatter` */
function preprocessWizardSteps(tree: Root, frontmatter: KuiFrontmatter) {
  if (hasWizardSteps(frontmatter)) {
    if (!frontmatter.layout) {
      frontmatter.layout = 'wizard'
    }

    // since the user defined wizard steps in the topmatter, we need
    // to remove existing thematicBreaks, for now
    let sectionIdx = 1
    visitParents(tree, 'thematicBreak', (node, ancestors) => {
      const { position } = positionOf(sectionIdx++, frontmatter)

      if (position === 'wizard') {
        const parent = ancestors[ancestors.length - 1]
        const childIdx = parent.children.findIndex(_ => _ === node)

        parent.children.splice(childIdx, 1)
      }
    })

    visitParents<Heading>(tree, 'heading', (node, ancestors) => {
      if (ancestors.length > 0 && node.children && node.children[0]) {
        const firstChild = node.children[0]

        if (isText(firstChild)) {
          const parent = ancestors[ancestors.length - 1]
          const childIdx = parent.children.findIndex(_ => _ === node)

          const matchingStep = frontmatter.wizard.steps.find(step =>
            typeof step === 'string'
              ? step === firstChild.value
              : step.match
              ? new RegExp(step.match.replace(/\./g, '\\.')).test(firstChild.value)
              : step.name === firstChild.value
          )

          if (matchingStep) {
            if (childIdx >= 0) {
              if (parent.children[childIdx - 1].type !== 'thematicBreak') {
                // splice in a ---, which below we use to indicate steps
                parent.children.splice(childIdx, 0, u('thematicBreak'))
              }

              // splice in a description? below, this will be parsed
              // out as Title: Description
              if (typeof matchingStep !== 'string') {
                firstChild.value =
                  (matchingStep.name || firstChild.value) +
                  (matchingStep.description ? ': ' + matchingStep.description : '')
              }
            }
          }
        }
      }
    })
  }
}

/** Scan and process the `layout` schema of the given `frontmatter` */
function extractSplitsAndSections(tree /*: Root */, frontmatter: KuiFrontmatter) {
  let sectionIdx = 1
  let currentSection // : { type: 'kui-split', value: string, children: [] }

  const newSection = (sectionIdx: number) => {
    const { positionAsGiven, position } = positionOf(sectionIdx, frontmatter)

    // text to place in empty sections
    const placeholder = isValidPositionObj(positionAsGiven) ? positionAsGiven.placeholder : undefined

    const maximized =
      isValidPositionObj(positionAsGiven) &&
      (positionAsGiven.maximized === true || positionAsGiven.maximized === 'true')

    const count = frontmatter.layoutCount[position] || 0
    frontmatter.layoutCount[position] = count + 1

    return u(
      'subtree',
      {
        data: {
          hProperties: {
            'data-kui-split': position,
            'data-kui-maximized': maximized.toString(),
            'data-kui-split-count': count,
            'data-kui-placeholder': placeholder
          }
        }
      },
      []
    )
  }

  if (frontmatter.layout) {
    frontmatter.layoutCount = {}
    currentSection = newSection(sectionIdx)
  }

  if (currentSection) {
    tree.children = tree.children.reduce((newChildren, node) => {
      if (currentSection) {
        if (node.type === 'thematicBreak') {
          newChildren.push(currentSection)
          currentSection = newSection(++sectionIdx)
        } else {
          currentSection.children.push(node)
        }
      } else {
        newChildren.push(node)
      }

      return newChildren
    }, [])

    tree.children.push(currentSection)
  }
}

/**
 * If `frontmatter.wizard` specifies a `description` overlay, smash it
 * in! This must be run *after* `extractSplitsAndSections`.
 */
function smashInWizardDescription(tree, frontmatter: KuiFrontmatter) {
  if (frontmatter.wizard && frontmatter.wizard.description) {
    const firstWizardSection = tree.children.find(
      _ => _.data && _.data.hProperties && _.data.hProperties['data-kui-split'] === 'wizard'
    )
    if (firstWizardSection && Array.isArray(firstWizardSection.children)) {
      const firstHeadingIdx = firstWizardSection.children.findIndex(_ => _.type === 'heading')
      if (firstHeadingIdx >= 0) {
        firstWizardSection.children.splice(
          firstHeadingIdx + 1,
          0,
          u('paragraph', [u('text', frontmatter.wizard.description)])
        )
      }
    }
  }
}

/** Look for frontmatter and sections */
export function kuiFrontmatter(opts: { tab: Tab }) {
  return (tree: Root) => {
    const frontmatter = extractKuiFrontmatter(tree)

    if (frontmatter) {
      if (frontmatter.title && typeof frontmatter.title === 'string') {
        // don't do this synchronously. react complains about
        // any transitive calls to setState() called from a
        // render() method
        setTimeout(() => opts.tab.setTitle(frontmatter.title))
      }

      preprocessCodeBlocks(tree, frontmatter)
      preprocessWizardSteps(tree, frontmatter)
      extractSplitsAndSections(tree, frontmatter)
      smashInWizardDescription(tree, frontmatter)
    }
  }
}
