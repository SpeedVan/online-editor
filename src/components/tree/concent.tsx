import Tree from './index'
import model from './model'
import { run, configure, registerHookComp, registerDumb, ICtxBase, register, ICtx, IAnyObj, ICtxDefault, IRootBase, MODULE_DEFAULT, MODULE_VOID } from 'concent';

const registJson = {
  TreeModule: model
}

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
type ModulePropsType<T> = T extends { 0: infer U } ? U : never;
type KeyType<T, K> = T[keyof T & K]

type TreeModule = "TreeModule"
type ModuleReducerType = {[key in TreeModule]: typeof model.reducer}
type ModuleStateType = {[key in TreeModule]: typeof model.state}
type PropsType = ModulePropsType<ArgumentTypes<typeof Tree>>
type TreeFileOnClickType = KeyType<PropsType, "treeFileOnClick">


interface Ctx
  <
  RootState extends IRootBase & ModuleStateType  = IRootBase & ModuleStateType,
  RootReducer extends IRootBase & ModuleReducerType = IRootBase & ModuleReducerType,
  RootCu extends { [key in keyof RootState]?: any } = IRootBase,
  Props = PropsType,
  PrivState = typeof model.state,
  ModuleName extends Required<TreeModule> = TreeModule,
  ConnectedModules extends keyof RootState = MODULE_VOID,
  Settings extends {onClick:TreeFileOnClickType} = {onClick:TreeFileOnClickType},
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
const setup = (ctx: Ctx): {onClick:TreeFileOnClickType} => {
  ctx.effect(()=> {
      ctx.reducer.Tree.init((data:any)=>ctx.setState({treeData: data}))
  }, [])

  
  const onClick = (key:string) => {
    // ctx.emit("treeFileClick", key)
    // ctx.reducer.Tree.onClick(key, ctx.state)
    // ctx.
  }
  return { onClick }
}

const mapProps = (ctx: Ctx): PropsType => {
  // ctx.state
  return {
    ...ctx.state,
    treeFileOnClick: ctx.settings.onClick,
    sync: ctx.sync,
  }
}

run({
  TreeModule: model
});

export default registerDumb({ module: 'TreeModule', setup, mapProps })(Tree)