import { editor as MonacoEditor, languages as MonacoEditorLangs, IKeyboardEvent } from 'monaco-editor'
import pysg from './python/suggestions'
import helper from './monaco/helper'
import uuid from 'uuid'
import { Msg, Type, Meta } from './proto'
import AnsiUp from 'ansi_up';
import React from 'react'

import Editor from './index'
import model from './model'
import { initEditor } from './model/init'
import { run, configure, registerHookComp, registerDumb, ICtxBase, register, ICtx, IAnyObj, ICtxDefault, IRootBase, MODULE_DEFAULT, MODULE_VOID, NoMap } from 'concent';

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
type ModulePropsType<T> = T extends { 0: infer U } ? U : never;
type KeyType<T, K> = T[keyof T & K] 

type EditorModule = "EditorModule"
type ModuleReducerType = {[key in EditorModule]: typeof model.reducer}
type ModuleStateType = {[key in EditorModule]: typeof model.state}
type PropsType = ModulePropsType<ArgumentTypes<typeof Editor>>
type MenuOnClickType = KeyType<PropsType, "menuOnClick">

interface Ctx
  <
  RootState extends IRootBase & ModuleStateType  = IRootBase & ModuleStateType,
  RootReducer extends IRootBase & ModuleReducerType = IRootBase & ModuleReducerType,
  RootCu extends { [key in keyof RootState]?: any } = IRootBase,
  Props = PropsType,
  PrivState = typeof model.state,
  ModuleName extends Required<EditorModule> = EditorModule,
  ConnectedModules extends keyof RootState = MODULE_VOID,
  Settings extends {container:any} = {container:any},
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

const ansi_up = new AnsiUp()

type Tasks = {
	[key:string]: any
}

// setup [computed props / methods] to ctx 
const setup = (ctx: Ctx) => {
  // const container = document.createElement("div")
  // container.id = "sssssss"
  
  
  ctx.refs.dom = {current:document.createElement("div")}
  ctx.refs.editor = {current:null}
  ctx.effect(() => initEditor(ctx.refs.dom, ctx.refs.editor),[])


  return { }
}

const mapProps = (ctx: Ctx): PropsType => ({cRef: ctx.refs.dom})

run({
  EditorModule: model
});

const render = (ctx:Ctx)=> {
  console.log(ctx)
  return ctx.refs.dom ? <Editor cRef={ctx.refs.dom} /> : <div/>
}

export default registerHookComp({ module:"EditorModule", setup, mapProps })(Editor)