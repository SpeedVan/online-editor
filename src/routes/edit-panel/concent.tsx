
import EditPanel from './index'
import { run, configure, registerHookComp, registerDumb, ICtxBase, register, ICtx, IAnyObj, ICtxDefault, IRootBase, MODULE_DEFAULT, MODULE_VOID } from 'concent';
import model from './model'

import { initEditor } from './../../components/editor/model/init'

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
type ModulePropsType<T> = T extends { 0: infer U } ? U : never;
type KeyType<T, K> = T[keyof T & K]

type EditPage = "EditPage"
type ModuleReducerType = { [key in EditPage]: typeof model.reducer }
type ModuleStateType = { [key in EditPage]: typeof model.state }
type PropsType = ModulePropsType<ArgumentTypes<typeof EditPanel>>

type TreeFileOnClickType = KeyType<PropsType, "treeFileOnClick">
type MenuOnClickType = KeyType<PropsType, "menuOnClick">
type TSettings = { mOnClick: MenuOnClickType, tOnClick: TreeFileOnClickType }

interface Ctx
  <
  RootState extends IRootBase & ModuleStateType = IRootBase & ModuleStateType,
  RootReducer extends IRootBase & ModuleReducerType = IRootBase & ModuleReducerType,
  RootCu extends { [key in keyof RootState]?: any } = IRootBase,
  Props = PropsType,
  PrivState = typeof model.state,
  ModuleName extends Required<EditPage> = EditPage,
  ConnectedModules extends keyof RootState = MODULE_VOID,
  Settings extends TSettings = TSettings,
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


const setup = (ctx: Ctx): TSettings => {

  const mOnClick = (key: string) => {
    ctx.reducer.EditPage.changeMenu(key, ctx.state)
    const editor = ctx.refs.editor.current
    editor.setModel(ctx.state.models[key])
  }

  ctx.refs.dom = {current:document.createElement("div")}
  ctx.refs.editor = {current:null}
  ctx.effect(() => {
    ctx.reducer.EditPage.init((data: any) => ctx.setState({ treeData: data }))
  }, [])

  ctx.effect(() => {
    const result = initEditor(ctx.refs.dom, ctx.refs.editor)
    const editor = ctx.refs.editor.current
    ctx.reducer.EditPage.openTmpFile({cb:(m:any)=>{
      editor.setModel(m)
    }}, ctx.state)
    return result
  }, [])


  const tOnClick = (key: string) => {
    if (ctx.state.menuFiles.every(i=>i.path !== key)) {
      const editor = ctx.refs.editor.current
      ctx.reducer.EditPage.openFile({path:key, cb:(m:any)=> {
        editor.setModel(m)
      }}, ctx.state)
    } else {
      mOnClick(key)
    }
  }
  return { mOnClick, tOnClick }
}

const mapProps = (ctx: Ctx): PropsType => {
  // ctx.state
  console.log(",ctx.settings",ctx.settings)
  return {
    ...ctx.state,
    menuOnClick: ctx.settings.mOnClick,
    treeFileOnClick: ctx.settings.tOnClick,
    sync: ctx.sync,
    cRef: ctx.refs.dom,
  }
}

run({
  EditPage: model
});

export default registerHookComp({ module: 'EditPage', setup, mapProps })(EditPanel)