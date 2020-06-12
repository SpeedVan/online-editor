import Multi from './index'
import model from './model'
import { run, configure, registerHookComp, registerDumb, ICtxBase, register, ICtx, IAnyObj, ICtxDefault, IRootBase, MODULE_DEFAULT, MODULE_VOID } from 'concent';

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
type ModulePropsType<T> = T extends { 0: infer U } ? U : never;
type KeyType<T, K> = T[keyof T & K] 

type MultiModule = "MultiModule"
type ModuleReducerType = {[key in MultiModule]: typeof model.reducer}
type ModuleStateType = {[key in MultiModule]: typeof model.state}
type PropsType = ModulePropsType<ArgumentTypes<typeof Multi>>
type MenuOnClickType = KeyType<PropsType, "menuOnClick">

interface Ctx
  <
  RootState extends IRootBase & ModuleStateType  = IRootBase & ModuleStateType,
  RootReducer extends IRootBase & ModuleReducerType = IRootBase & ModuleReducerType,
  RootCu extends { [key in keyof RootState]?: any } = IRootBase,
  Props = PropsType,
  PrivState = typeof model.state,
  ModuleName extends Required<MultiModule> = MultiModule,
  ConnectedModules extends keyof RootState = MODULE_VOID,
  Settings extends {onClick:MenuOnClickType} = {onClick:MenuOnClickType},
  RefComputed extends IAnyObj = {},
  Mapped extends IAnyObj = {},
  Extra extends [any, any] | [any] = [any, any],
  >
  extends ICtx
  <
  RootState,
  RootReducer,
  RootCu,
  Props,
  PrivState,
  ModuleName,
  ConnectedModules,
  Settings,
  RefComputed,
  Mapped,
  Extra
  > {
}


// setup [computed props / methods] to ctx 
const setup = (ctx: Ctx): {onClick:MenuOnClickType} => {
  ctx.on("FileMenu_appendFile", (file)=> {
    ctx.setState({files:ctx.state.menuFiles.concat([{path:file, modified:false}])})
  })
  const onClick = (key:string) => ctx.reducer.MultiModule.changeMenu(key, ctx.state)
  return { onClick }
}

const mapProps = (ctx: Ctx): PropsType => {
  // ctx.state
  return {
    menuOnClick: ctx.settings.onClick,
    currentFile: ctx.state.currentFile,
    menuFiles: ctx.state.menuFiles // get simple
  }
}

run({
  MultiModule: model
});

export default registerDumb({ module: 'MultiModule', setup, mapProps })(Multi)