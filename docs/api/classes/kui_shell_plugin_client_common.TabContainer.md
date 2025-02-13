[Kui API Documentation - v11.0.0](../README.md) / [@kui-shell/plugin-client-common](../modules/kui_shell_plugin_client_common.md) / TabContainer

# Class: TabContainer

[@kui-shell/plugin-client-common](../modules/kui_shell_plugin_client_common.md).TabContainer

## Hierarchy

- `PureComponent`<`Props`, `State`\>

  ↳ **`TabContainer`**

## Table of contents

### Constructors

- [constructor](kui_shell_plugin_client_common.TabContainer.md#constructor)

### Properties

- [\_onCloseTab](kui_shell_plugin_client_common.TabContainer.md#_onclosetab)
- [\_onSwitchTab](kui_shell_plugin_client_common.TabContainer.md#_onswitchtab)
- [\_onTabReady](kui_shell_plugin_client_common.TabContainer.md#_ontabready)
- [context](kui_shell_plugin_client_common.TabContainer.md#context)
- [isFirstTabReady](kui_shell_plugin_client_common.TabContainer.md#isfirsttabready)
- [props](kui_shell_plugin_client_common.TabContainer.md#props)
- [refs](kui_shell_plugin_client_common.TabContainer.md#refs)
- [state](kui_shell_plugin_client_common.TabContainer.md#state)
- [contextType](kui_shell_plugin_client_common.TabContainer.md#contexttype)

### Accessors

- [needsSidebar](kui_shell_plugin_client_common.TabContainer.md#needssidebar)

### Methods

- [UNSAFE_componentWillMount](kui_shell_plugin_client_common.TabContainer.md#unsafe_componentwillmount)
- [UNSAFE_componentWillReceiveProps](kui_shell_plugin_client_common.TabContainer.md#unsafe_componentwillreceiveprops)
- [UNSAFE_componentWillUpdate](kui_shell_plugin_client_common.TabContainer.md#unsafe_componentwillupdate)
- [\_onNewTab](kui_shell_plugin_client_common.TabContainer.md#_onnewtab)
- [\_onSetTabTitle](kui_shell_plugin_client_common.TabContainer.md#_onsettabtitle)
- [captureState](kui_shell_plugin_client_common.TabContainer.md#capturestate)
- [children](kui_shell_plugin_client_common.TabContainer.md#children)
- [componentDidCatch](kui_shell_plugin_client_common.TabContainer.md#componentdidcatch)
- [componentDidMount](kui_shell_plugin_client_common.TabContainer.md#componentdidmount)
- [componentDidUpdate](kui_shell_plugin_client_common.TabContainer.md#componentdidupdate)
- [componentWillMount](kui_shell_plugin_client_common.TabContainer.md#componentwillmount)
- [componentWillReceiveProps](kui_shell_plugin_client_common.TabContainer.md#componentwillreceiveprops)
- [componentWillUnmount](kui_shell_plugin_client_common.TabContainer.md#componentwillunmount)
- [componentWillUpdate](kui_shell_plugin_client_common.TabContainer.md#componentwillupdate)
- [forceUpdate](kui_shell_plugin_client_common.TabContainer.md#forceupdate)
- [getSnapshotBeforeUpdate](kui_shell_plugin_client_common.TabContainer.md#getsnapshotbeforeupdate)
- [graft](kui_shell_plugin_client_common.TabContainer.md#graft)
- [listenForTabClose](kui_shell_plugin_client_common.TabContainer.md#listenfortabclose)
- [newTabModel](kui_shell_plugin_client_common.TabContainer.md#newtabmodel)
- [onCloseTab](kui_shell_plugin_client_common.TabContainer.md#onclosetab)
- [onNewTab](kui_shell_plugin_client_common.TabContainer.md#onnewtab)
- [onSwitchTab](kui_shell_plugin_client_common.TabContainer.md#onswitchtab)
- [onTabReady](kui_shell_plugin_client_common.TabContainer.md#ontabready)
- [render](kui_shell_plugin_client_common.TabContainer.md#render)
- [restoreState](kui_shell_plugin_client_common.TabContainer.md#restorestate)
- [setState](kui_shell_plugin_client_common.TabContainer.md#setstate)
- [shouldComponentUpdate](kui_shell_plugin_client_common.TabContainer.md#shouldcomponentupdate)
- [sidebar](kui_shell_plugin_client_common.TabContainer.md#sidebar)
- [tabContent](kui_shell_plugin_client_common.TabContainer.md#tabcontent)
- [toggleSidebar](kui_shell_plugin_client_common.TabContainer.md#togglesidebar)
- [topTabStripe](kui_shell_plugin_client_common.TabContainer.md#toptabstripe)
- [willUpdateTopTabButtons](kui_shell_plugin_client_common.TabContainer.md#willupdatetoptabbuttons)

## Constructors

### constructor

• **new TabContainer**(`props`)

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `props` | `Props` |

#### Overrides

React.PureComponent&lt;Props, State\&gt;.constructor

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:68](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L68)

## Properties

### \_onCloseTab

• `Private` `Readonly` **\_onCloseTab**: `any`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:163](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L163)

---

### \_onSwitchTab

• `Private` `Readonly` **\_onSwitchTab**: `any`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:143](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L143)

---

### \_onTabReady

• `Private` `Readonly` **\_onTabReady**: `any`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:285](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L285)

---

### context

• **context**: `any`

If using the new style context, re-declare this in your class to be the
`React.ContextType` of your `static contextType`.
Should be used with type annotation or static contextType.

```ts
static contextType = MyContext
// For TS pre-3.7:
context!: React.ContextType<typeof MyContext>
// For TS 3.7 and above:
declare context: React.ContextType<typeof MyContext>
```

**`see`** https://reactjs.org/docs/context.html

#### Inherited from

React.PureComponent.context

#### Defined in

node_modules/@types/react/index.d.ts:479

---

### isFirstTabReady

• `Private` **isFirstTabReady**: `boolean` = `false`

Has the first tab activated itself?

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:66](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L66)

---

### props

• `Readonly` **props**: `Readonly`<`Props`\> & `Readonly`<{ `children?`: `ReactNode` }\>

#### Inherited from

React.PureComponent.props

#### Defined in

node_modules/@types/react/index.d.ts:504

---

### refs

• **refs**: `Object`

**`deprecated`**
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

React.PureComponent.refs

#### Defined in

node_modules/@types/react/index.d.ts:510

---

### state

• **state**: `Readonly`<`State`\>

#### Inherited from

React.PureComponent.state

#### Defined in

node_modules/@types/react/index.d.ts:505

---

### contextType

▪ `Static` `Optional` **contextType**: `Context`<`any`\>

If set, `this.context` will be set at runtime to the current value of the given Context.

Usage:

```ts
type MyContext = number
const Ctx = React.createContext<MyContext>(0)

class Foo extends React.Component {
  static contextType = Ctx
  context!: React.ContextType<typeof Ctx>
  render() {
    return <>My context's value: {this.context}</>
  }
}
```

**`see`** https://reactjs.org/docs/context.html#classcontexttype

#### Inherited from

React.PureComponent.contextType

#### Defined in

node_modules/@types/react/index.d.ts:461

## Accessors

### needsSidebar

• `Private` `get` **needsSidebar**(): `boolean`

#### Returns

`boolean`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:344](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L344)

## Methods

### UNSAFE_componentWillMount

▸ `Optional` **UNSAFE_componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

React.PureComponent.UNSAFE_componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:717

---

### UNSAFE_componentWillReceiveProps

▸ `Optional` **UNSAFE_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name          | Type                 |
| :------------ | :------------------- |
| `nextProps`   | `Readonly`<`Props`\> |
| `nextContext` | `any`                |

#### Returns

`void`

#### Inherited from

React.PureComponent.UNSAFE_componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:749

---

### UNSAFE_componentWillUpdate

▸ `Optional` **UNSAFE_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name          | Type                 |
| :------------ | :------------------- |
| `nextProps`   | `Readonly`<`Props`\> |
| `nextState`   | `Readonly`<`State`\> |
| `nextContext` | `any`                |

#### Returns

`void`

#### Inherited from

React.PureComponent.UNSAFE_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:777

---

### \_onNewTab

▸ `Private` `Readonly` **\_onNewTab**(): `void`

#### Returns

`void`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:222](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L222)

---

### \_onSetTabTitle

▸ `Private` `Readonly` **\_onSetTabTitle**(`uuid`, `title`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `uuid`  | `string` |
| `title` | `string` |

#### Returns

`void`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:306](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L306)

---

### captureState

▸ `Private` **captureState**(): `void`

save tab state such as CWD prior to a tab switch

#### Returns

`void`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:111](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L111)

---

### children

▸ `Private` **children**(`uuid`): `Object`

Graft the tab `uuid`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `uuid` | `string` |

#### Returns

`Object`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:237](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L237)

---

### componentDidCatch

▸ `Optional` **componentDidCatch**(`error`, `errorInfo`): `void`

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

#### Parameters

| Name        | Type        |
| :---------- | :---------- |
| `error`     | `Error`     |
| `errorInfo` | `ErrorInfo` |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentDidCatch

#### Defined in

node_modules/@types/react/index.d.ts:646

---

### componentDidMount

▸ `Optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.PureComponent.componentDidMount

#### Defined in

node_modules/@types/react/index.d.ts:625

---

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name        | Type                 |
| :---------- | :------------------- |
| `prevProps` | `Readonly`<`Props`\> |
| `prevState` | `Readonly`<`State`\> |
| `snapshot?` | `any`                |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentDidUpdate

#### Defined in

node_modules/@types/react/index.d.ts:688

---

### componentWillMount

▸ `Optional` **componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:703

---

### componentWillReceiveProps

▸ `Optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name          | Type                 |
| :------------ | :------------------- |
| `nextProps`   | `Readonly`<`Props`\> |
| `nextContext` | `any`                |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:732

---

### componentWillUnmount

▸ `Optional` **componentWillUnmount**(): `void`

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillUnmount

#### Defined in

node_modules/@types/react/index.d.ts:641

---

### componentWillUpdate

▸ `Optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name          | Type                 |
| :------------ | :------------------- |
| `nextProps`   | `Readonly`<`Props`\> |
| `nextState`   | `Readonly`<`State`\> |
| `nextContext` | `any`                |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:762

---

### forceUpdate

▸ **forceUpdate**(`callback?`): `void`

#### Parameters

| Name        | Type         |
| :---------- | :----------- |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.PureComponent.forceUpdate

#### Defined in

node_modules/@types/react/index.d.ts:496

---

### getSnapshotBeforeUpdate

▸ `Optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Name        | Type                 |
| :---------- | :------------------- |
| `prevProps` | `Readonly`<`Props`\> |
| `prevState` | `Readonly`<`State`\> |

#### Returns

`any`

#### Inherited from

React.PureComponent.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

---

### graft

▸ `Private` **graft**(`node`, `uuid`, `key?`): `Object`

#### Parameters

| Name   | Type        |
| :----- | :---------- |
| `node` | `ReactNode` |
| `uuid` | `string`    |
| `key?` | `number`    |

#### Returns

`Object`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:224](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L224)

---

### listenForTabClose

▸ `Private` **listenForTabClose**(`model`): `void`

#### Parameters

| Name    | Type                                                     |
| :------ | :------------------------------------------------------- |
| `model` | [`TabModel`](kui_shell_plugin_client_common.TabModel.md) |

#### Returns

`void`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:165](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L165)

---

### newTabModel

▸ `Private` **newTabModel**(`spec?`, `doNotChangeActiveTab?`): [`TabModel`](kui_shell_plugin_client_common.TabModel.md)

#### Parameters

| Name                           | Type                      | Default value | Description                                                         |
| :----------------------------- | :------------------------ | :------------ | :------------------------------------------------------------------ |
| `spec`                         | `Object`                  | `{}`          | -                                                                   |
| `spec.cmdline?`                | `string`                  | `undefined`   | Optionally execute a command in the new tab                         |
| `spec.exec?`                   | `"pexec"` \| `"qexec"`    | `undefined`   | Execute the command line with qexec or pexec? Default: pexec.       |
| `spec.onClose?`                | `string`                  | `undefined`   | Optionally execute a command when the tab is closed                 |
| `spec.statusStripeDecoration?` | `StatusStripeChangeEvent` | `undefined`   | Optionally specify color and message to display in the StatusStripe |
| `spec.title?`                  | `string`                  | `undefined`   | Optional tab title                                                  |
| `doNotChangeActiveTab`         | `boolean`                 | `false`       | -                                                                   |

#### Returns

[`TabModel`](kui_shell_plugin_client_common.TabModel.md)

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:176](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L176)

---

### onCloseTab

▸ `Private` **onCloseTab**(`idx`): `Promise`<`void`\>

Close Tab event

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `idx` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:149](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L149)

---

### onNewTab

▸ `Private` **onNewTab**(`spec?`, `doNotChangeActiveTab?`): `void`

New Tab event

#### Parameters

| Name                           | Type                      | Default value | Description                                                         |
| :----------------------------- | :------------------------ | :------------ | :------------------------------------------------------------------ |
| `spec`                         | `Object`                  | `{}`          | -                                                                   |
| `spec.cmdline?`                | `string`                  | `undefined`   | Optionally execute a command in the new tab                         |
| `spec.exec?`                   | `"pexec"` \| `"qexec"`    | `undefined`   | Execute the command line with qexec or pexec? Default: pexec.       |
| `spec.onClose?`                | `string`                  | `undefined`   | Optionally execute a command when the tab is closed                 |
| `spec.statusStripeDecoration?` | `StatusStripeChangeEvent` | `undefined`   | Optionally specify color and message to display in the StatusStripe |
| `spec.title?`                  | `string`                  | `undefined`   | Optional tab title                                                  |
| `doNotChangeActiveTab`         | `boolean`                 | `false`       | -                                                                   |

#### Returns

`void`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:199](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L199)

---

### onSwitchTab

▸ `Private` **onSwitchTab**(`idx`): `Promise`<`void`\>

Switch Tab event: update state so that activeIdx=idx

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `idx` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:128](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L128)

---

### onTabReady

▸ `Private` **onTabReady**(`tab`): `void`

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `tab` | `Tab` |

#### Returns

`void`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:259](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L259)

---

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.PureComponent.render

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:361](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L361)

---

### restoreState

▸ `Private` **restoreState**(`tabIdx`): `void`

restore tab state after a tab switch

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `tabIdx` | `number` |

#### Returns

`void`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:120](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L120)

---

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type                  |
| :--- | :-------------------- |
| `K`  | extends keyof `State` |

#### Parameters

| Name        | Type                                                                                                                                       |
| :---------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `state`     | `State` \| (`prevState`: `Readonly`<`State`\>, `props`: `Readonly`<`Props`\>) => `State` \| `Pick`<`State`, `K`\> \| `Pick`<`State`, `K`\> |
| `callback?` | () => `void`                                                                                                                               |

#### Returns

`void`

#### Inherited from

React.PureComponent.setState

#### Defined in

node_modules/@types/react/index.d.ts:491

---

### shouldComponentUpdate

▸ `Optional` **shouldComponentUpdate**(`nextProps`, `nextState`, `nextContext`): `boolean`

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters

| Name          | Type                 |
| :------------ | :------------------- |
| `nextProps`   | `Readonly`<`Props`\> |
| `nextState`   | `Readonly`<`State`\> |
| `nextContext` | `any`                |

#### Returns

`boolean`

#### Inherited from

React.PureComponent.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:636

---

### sidebar

▸ `Private` **sidebar**(): `Element`

#### Returns

`Element`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:348](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L348)

---

### tabContent

▸ `Private` **tabContent**(): `Element`

Render the content of the tabs

#### Returns

`Element`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:320](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L320)

---

### toggleSidebar

▸ `Private` `Readonly` **toggleSidebar**(): `void`

#### Returns

`void`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:342](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L342)

---

### topTabStripe

▸ `Private` **topTabStripe**(): `Element`

Render the row of Tabs along the top

#### Returns

`Element`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:288](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L288)

---

### willUpdateTopTabButtons

▸ `Private` **willUpdateTopTabButtons**(`uuid`, `buttons`): `void`

#### Parameters

| Name      | Type                                   |
| :-------- | :------------------------------------- |
| `uuid`    | `string`                               |
| `buttons` | `TopTabButton`<{ `key`: `string` }\>[] |

#### Returns

`void`

#### Defined in

[plugins/plugin-client-common/src/components/Client/TabContainer.tsx:245](https://github.com/kubernetes-sigs/kui/blob/kui/plugins/plugin-client-common/src/components/Client/TabContainer.tsx#L245)
