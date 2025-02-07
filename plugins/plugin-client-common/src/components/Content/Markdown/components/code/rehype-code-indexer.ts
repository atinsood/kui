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

import { Parent } from 'unist'
import { Element, Root } from 'hast'
import { visitParents as visit } from 'unist-util-visit-parents'

import { tryFrontmatter } from '../../frontmatter'

function isExecutableCodeBlock(language: string) {
  return /^(bash|sh|shell)$/.test(language)
}

function isElementWithProperties(_: Parent): _ is Element {
  const elt = _ as Element
  return typeof elt.tagName === 'string' && elt.properties !== undefined
}

/**
 * Heuristic: Code Blocks inside of closed "tips" (i.e. default-closed
 * expandable sections) are optional in terms of ultimate success of
 * the enclosing guidebook */
function isImplicitlyOptional(_: Parent): _ is Element {
  return isElementWithProperties(_) && _.tagName === 'tip' && _.properties.open === false
}

/**
 * This rehype plugin adds a unique codeIdx ordinal property to each
 * executable code block.
 */
export default function plugin(uuid: string) {
  return (ast: Root) => {
    let codeIdx = 0

    visit<Element>(ast, 'element', function visitor(node, ancestors) {
      if (node.tagName === 'code') {
        // react-markdown v6+ places the language in the className
        const match = node.properties.className ? /language-(\w+)/.exec(node.properties.className.toString()) : ''
        const language = match ? match[1] : undefined

        if (isExecutableCodeBlock(language)) {
          const myCodeIdx = codeIdx++
          node.properties.codeIdx = myCodeIdx

          if (node.children.length === 1 && node.children[0].type === 'text') {
            const code = String(node.children[0].value).trim()
            const { body, attributes } = tryFrontmatter(code)

            if (typeof attributes === 'object') {
              if (!attributes.id) {
                // assign a codeBlockId if the author did not specify one
                attributes.id = `${uuid}-${myCodeIdx}`
              }

              if (attributes.optional !== true) {
                const codeBlockProps = Buffer.from(
                  JSON.stringify(Object.assign({ body, language }, attributes))
                ).toString('base64')

                // go from parent on top, which is in reverse order
                for (let idx = ancestors.length - 1; idx >= 0; idx--) {
                  const _ = ancestors[idx]

                  if (!attributes.validcate && isImplicitlyOptional(_)) {
                    // don't propagate code blocks out of implicitly
                    // optional elements, unless the code block has an
                    // associated validator. The idea is that if the
                    // author went through the trouble of writing a
                    // validator for a code block, it probably isn't
                    // optional. If the absence of a validator, then
                    // we should stop propagating the code block
                    // upwards if we reach some element that seems
                    // indicative of blocking out an optional area,
                    // e.g. an expandable section that is
                    // default-closed
                    break
                  }

                  if (isElementWithProperties(_) && Array.isArray(_.properties.containedCodeBlocks)) {
                    _.properties.containedCodeBlocks.push(codeBlockProps)
                  }
                }
              }
            }
          }
        }
      }
    })
  }
}
