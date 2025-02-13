/*
 * Copyright 2020 The Kubernetes Authors
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

import React from 'react'

import {
  Events,
  i18n,
  isAbortableResponse,
  isCodedError,
  isCommentaryResponse,
  isTabLayoutModificationResponse,
  isRadioTable,
  isReactResponse,
  isMarkdownResponse,
  isMixedResponse,
  isMultiModalResponse,
  isNavResponse,
  isXtermResponse,
  isTable,
  Tab as KuiTab,
  Stream,
  Streamable,
  Util
} from '@kui-shell/core'

import { BlockViewTraits, BlockOperationTraits } from './'

import {
  BlockModel,
  ProcessingBlock,
  FinishedBlock,
  hasUUID,
  hasCommand,
  hasBeenRerun,
  isBeingRerun,
  isFinished,
  isProcessingOrBeingRerun as isProcessing,
  isOk,
  isCancelled,
  isEmpty,
  isOutputOnly,
  isOutputRedirected,
  isOops,
  isReplay,
  isWithCompleteEvent
} from './BlockModel'

import Actions from './Actions'
import SplitPosition from '../SplitPosition'
import Scalar from '../../../Content/Scalar/' // !! DO NOT MAKE LAZY. See https://github.com/IBM/kui/issues/6758
import KuiContext from '../../../Client/context'
import { Maximizable } from '../../Sidecar/width'
const Ansi = React.lazy(() => import('../../../Content/Scalar/Ansi'))
const ExpandableSection = React.lazy(() => import('../../../spi/ExpandableSection'))

const strings = i18n('plugin-client-common')

type Props = {
  /** tab UUID */
  uuid: string

  /** for key handlers, which may go away soon */
  tab: KuiTab

  /** Block ordinal */
  idx: number

  /** Block ordinal to be displayed to user */
  displayedIdx?: number

  /** Position of the enclosing split. Default: SplitPosition.default */
  splitPosition?: SplitPosition

  model: ProcessingBlock | FinishedBlock
  onRender: () => void
  willUpdateCommand?: (idx: number, command: string) => void
} & Maximizable &
  BlockViewTraits &
  BlockOperationTraits

interface State {
  alreadyListen: boolean
  assertHasContent?: boolean
  isResultRendered: boolean

  nStreamingOutputs: number
  streamingConsumer: Stream
}

export default class Output extends React.PureComponent<Props, State> {
  private readonly _willRemove = () => this.props.willRemove(undefined, this.props.idx)
  private readonly _willUpdateCommand = (command: string) => this.props.willUpdateCommand(this.props.idx, command)

  private streamingOutput: Streamable[] = []

  public constructor(props: Props) {
    super(props)

    const streamingConsumer = this.streamingConsumer.bind(this)

    this.state = {
      alreadyListen: false,
      isResultRendered: false,
      nStreamingOutputs: 0,
      streamingConsumer
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async streamingConsumer(part: Streamable) {
    if (hasUUID(this.props.model)) {
      const tabUUID = this.props.uuid
      const execUUID = this.props.model.execUUID

      // done with this part... not done with all parts
      const done = () => {
        this.props.onRender()
        Events.eventChannelUnsafe.emit(`/command/stdout/done/${tabUUID}/${execUUID}`)
      }

      // part === null: the controller wants to clear prior output
      if (part === null) {
        // remove last output
        this.streamingOutput.pop()
        this.setState(curState => ({
          nStreamingOutputs: curState.nStreamingOutputs - 1
        }))
        done()
      } else {
        if (isOutputRedirected(this.props.model)) {
          // if we were asked to redirect to a file, then we can
          // immediately indicate that we are done with this part
          done()
        } else {
          this.streamingOutput.push(Buffer.isBuffer(part) ? part.toString() : part)

          // use setTimeout to introduce hysteresis, so we aren't
          // forcing a react re-render for a bunch of tiny streaming
          // updates
          setTimeout(() => {
            this.setState({
              nStreamingOutputs: this.streamingOutput.length
            })
            setTimeout(done, 10)
          }, 10)
        }
      }
    }
  }

  public static getDerivedStateFromProps(props: Props, state: State) {
    if (isProcessing(props.model) && !state.alreadyListen) {
      // listen for streaming output (unless the output has been redirected to a file)
      const tabUUID = props.uuid
      Events.eventChannelUnsafe.on(`/command/stdout/${tabUUID}/${props.model.execUUID}`, state.streamingConsumer)

      return {
        alreadyListen: true,
        isResultRendered: false,
        streamingOutput: []
      }
    } else if (isFinished(props.model) && !state.isResultRendered) {
      const tabUUID = props.uuid

      if (!isEmpty(props.model)) {
        Events.eventChannelUnsafe.off(`/command/stdout/${tabUUID}/${props.model.execUUID}`, state.streamingConsumer)
      }

      return {
        alreadyListen: false,
        isResultRendered: true
      }
    } else {
      return state
    }
  }

  private unmounted = false
  public componentWillUnmount() {
    this.unmounted = true
  }

  private onRender(assertHasContent: boolean): void {
    if (this.unmounted) return
    else if (this.props.onRender && !isBeingRerun(this.props.model) && !hasBeenRerun(this.props.model)) {
      // we don't want reruns to trigger any scrolling behavior
      this.props.onRender()
    }
    this.setState({ assertHasContent })
  }

  private readonly _onRender = this.onRender.bind(this)

  private hasStreamingOutput() {
    return this.state.nStreamingOutputs > 0
  }

  private outputWillOverflow() {
    // RadioTable currently uses the Dropdown component that will overflow
    return isWithCompleteEvent(this.props.model) && isRadioTable(this.props.model.response)
  }

  private stream() {
    if (this.hasStreamingOutput()) {
      // we may have duplicates in streamingOutput and response
      // see https://github.com/kubernetes-sigs/kui/pull/8354
      const response = isWithCompleteEvent(this.props.model) ? this.props.model.response : undefined
      const streamingOutput = !response
        ? this.streamingOutput
        : this.streamingOutput.filter(_ => {
            if (isMixedResponse(response)) {
              return !response.find(_2 => _ === _2)
            } else {
              return _ !== response
            }
          })
      if (streamingOutput.length < this.streamingOutput.length) {
        this.streamingOutput = streamingOutput
      }

      if (streamingOutput.every(_ => typeof _ === 'string')) {
        const combined = streamingOutput.join('')
        return (
          <div className="repl-result-like result-vertical" data-stream>
            <React.Suspense fallback={<div />}>
              <Ansi>{combined}</Ansi>
            </React.Suspense>
          </div>
        )
      }

      return (
        <div className="repl-result-like result-vertical" data-stream>
          {streamingOutput.map((part, idx) => (
            <React.Suspense fallback={<div />} key={idx}>
              <Scalar
                tab={this.props.tab}
                execUUID={hasUUID(this.props.model) && this.props.model.execUUID}
                response={part}
                isWidthConstrained={this.props.isWidthConstrained}
                willChangeSize={this.props.willChangeSize}
                willUpdateCommand={this._willUpdateCommand}
                onRender={this._onRender}
              />
            </React.Suspense>
          ))}
        </div>
      )
    }
  }

  private result() {
    if (isProcessing(this.props.model)) {
      return <div className="repl-result" />
    } else if (isEmpty(this.props.model)) {
      // no result to display for these cases
      return <React.Fragment />
    } else {
      const statusCode = isOops(this.props.model)
        ? isCodedError(this.props.model.response)
          ? this.props.model.response.code || this.props.model.response.statusCode
          : 500
        : isFinished(this.props.model)
        ? 0
        : undefined

      return (
        <div
          className={
            'repl-result' +
            (isOops(this.props.model) ? ' oops' : '') +
            (isWithCompleteEvent(this.props.model) && isMixedResponse(this.props.model.response)
              ? ' flex-column'
              : '') +
            (this.outputWillOverflow() ? ' overflow-visible' : '')
          }
          data-status-code={statusCode}
        >
          {isCancelled(this.props.model) ? (
            <React.Fragment />
          ) : (
            <React.Suspense fallback={<div />}>
              <Scalar
                tab={this.props.tab}
                execUUID={hasUUID(this.props.model) && this.props.model.execUUID}
                response={this.props.model.response}
                completeEvent={this.props.model.completeEvent}
                isWidthConstrained={this.props.isWidthConstrained}
                willChangeSize={this.props.willChangeSize}
                willFocusBlock={this.props.willFocusBlock}
                willRemove={this._willRemove}
                willUpdateCommand={this._willUpdateCommand}
                onRender={this._onRender}
              />
            </React.Suspense>
          )}
        </div>
      )
    }
  }

  private cursor() {
    /* if (isProcessing(this.props.model)) {
      return (
        <div className="repl-result-spinner">
          <div className="repl-result-spinner-inner"></div>
        </div>
      )
    } */
  }

  private isShowingSomethingInTerminal(block: BlockModel): block is FinishedBlock {
    if (isProcessing(this.props.model)) {
      return this.hasStreamingOutput()
    } else if (isFinished(block) && !isCancelled(block) && !isEmpty(block)) {
      const { response } = block
      return (
        isOops(block) ||
        isAbortableResponse(response) ||
        isMultiModalResponse(response) ||
        isNavResponse(response) ||
        isCommentaryResponse(response) ||
        isTabLayoutModificationResponse(response) ||
        isReactResponse(response) ||
        Util.isHTML(response) ||
        isMarkdownResponse(response) ||
        (Array.isArray(response) && response.length > 0) ||
        (typeof response === 'string' && response.length > 0) ||
        typeof response === 'number' ||
        isTable(response) ||
        isMixedResponse(response) ||
        (isXtermResponse(response) && response.rows && response.rows.length !== 0) ||
        this.hasStreamingOutput()
      )
    } else {
      return false
    }
  }

  private ok(hasContent: boolean) {
    if (isOk(this.props.model)) {
      if (hasContent) {
        return <div className="ok" />
      } else {
        return <div className="ok">{strings('ok')}</div>
      }
    }
  }

  private ctx(/* insideBrackets: React.ReactNode = this.props.displayedIdx || this.props.idx + 1 */) {
    return (
      <KuiContext.Consumer>
        {config =>
          !config.noPromptContext && (
            <span
              className="repl-context"
              onClick={this.props.willFocusBlock}
              data-input-count={this.props.idx}
              data-custom-prompt={!!config.prompt || undefined}
            />
          )
        }
      </KuiContext.Consumer>
    )
  }

  /** For output-only blocks, render the Block Actions */
  private actions() {
    if (isOutputOnly(this.props.model)) {
      return <Actions {...this.props} command={hasCommand(this.props.model) && this.props.model.command} />
    }
  }

  /** @return the UI for the main/content part of the Output */
  private content(hasContent: boolean) {
    return (
      <div className="result-vertical">
        {this.stream()}
        {this.result()}
        {this.cursor()}
        {this.ok(hasContent)}
      </div>
    )
  }

  public render() {
    const hasContent =
      this.state.assertHasContent !== undefined
        ? this.state.assertHasContent
        : this.isShowingSomethingInTerminal(this.props.model)

    // when displaying blocks in a loaded Snapshot (isReplay) that
    // have not yet been rerun (hasBeenRerun), then wrap an expando
    // around them (except don't wrap expandos around output-only
    // blocks, such as for Commentary)
    const noExpando = !isReplay(this.props.model) || hasBeenRerun(this.props.model) || isOutputOnly(this.props.model)

    const content = noExpando ? (
      this.content(hasContent)
    ) : (
      <ExpandableSection
        className="flex-fill"
        expanded={this.props.splitPosition === 'bottom-strip' /* Default expanded for bottom strip positioning */}
        showMore={strings('Show Sample Output')}
        showLess={strings('Hide Sample Output')}
      >
        {this.content(hasContent)}
      </ExpandableSection>
    )

    return (
      <div className={'repl-output ' + (hasContent ? ' repl-result-has-content' : '')}>
        {hasContent && this.ctx()}
        {content}
        {this.actions()}
      </div>
    )
  }
}
