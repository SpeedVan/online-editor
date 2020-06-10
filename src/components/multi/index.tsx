import Multi, { OnClickType } from './multi'
import model from './model'
import { run, configure, registerHookComp, registerDumb, ICtxBase, register, ICtx, IAnyObj, ICtxDefault, IRootBase, MODULE_DEFAULT, MODULE_VOID } from 'concent';
import { StateType } from './model/state';

const { state, reducer } = model

type FileMenu = "FileMenu"

run({
  FileMenu: model
}, {
  middlewares: [
    (ctx:any, next:any) => {
      console.log(ctx);
      next();
    }
  ]
});


// // from Model module
// interface MyRootReducer extends IRootBase {
//   FileMenu: typeof reducer
// }
type ModuleReducerType = {FileMenu: typeof reducer}

type ModuleStateType = {FileMenu: typeof state}

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

// type BoxedTupleTypes<T extends any[]> =
//   { [P in keyof T]: [T[P]] }[Exclude<keyof T, keyof any[]>]
// type UnionToIntersection<U> =
//   (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

type ModulePropsType<T> = T extends { 0: infer U } ? U : never;
// type ModuleHandlerPropsType<T> = T extends { 1: infer U } ? U : never;

// const func = (a: (string & number)) => {}

type PropsType = ModulePropsType<ArgumentTypes<typeof Multi>>

// type  MHandlerProps = ModuleHandlerPropsType<ArgumentTypes<typeof Multi>>

const f = (s:PropsType) => {
  
}


interface Ctx
  <
  RootState extends IRootBase & ModuleStateType  = IRootBase & ModuleStateType,
  RootReducer extends IRootBase & ModuleReducerType = IRootBase & ModuleReducerType,
  RootCu extends { [key in keyof RootState]?: any } = IRootBase,
  Props = PropsType,
  PrivState = typeof state,
  ModuleName extends Required<FileMenu> = FileMenu,
  ConnectedModules extends keyof RootState = MODULE_VOID,
  Settings extends {onClick:OnClickType} = {onClick:OnClickType},
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
const setup = (ctx: Ctx): {onClick:OnClickType} => {
  const onClick = (key:string) => ctx.reducer.FileMenu.selectFile(key, ctx.state)
  return { onClick }
}

const mapProps = (ctx: Ctx): PropsType => {
  // ctx.state
  return {
    onClick: ctx.settings.onClick,
    selectKey: ctx.state.selectKey,
    files: ctx.state.files // get simple
  }
}

const Concent = {
  // autoConfigure: () => configure('FileMenu', { state, reducer, computed }),
  model: model,
  Multi: registerDumb({ module: 'FileMenu', setup, mapProps })(Multi)
}

export {
  Multi as default,
  Concent
}