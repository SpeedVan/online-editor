/* eslint-disable */
import React, {ReactNode} from 'react'
import { run, configure, registerHookComp, registerDumb, ICtxBase, register, ICtx, IAnyFnReturnObj, IAnyObj, ICtxDefault, NoMap, IRootBase, MODULE_DEFAULT, MODULE_VOID } from 'concent';
import model from '../../components/multi/model'
import Multi from '../../components/multi'
import { isSymbol } from 'util';
const { state, reducer } = model

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

type PropsType= ModulePropsType<ArgumentTypes<typeof Multi>>

const config = <
  // ModuleName,
  ModuleName extends keyof RootState,
  Settings,
  ModuleStateType,
  ModuleReducerType,
  
  
  // PropsType extends IAnyObj,
  // RootState extends IRootBase  = IRootBase ,
  // RootReducer extends { [key in keyof RootState]?: any }  = IRootBase ,
  // RootCu extends { [key in keyof RootState]?: any } = IRootBase,
  // Props = {},
  // PrivState = {},
  // ModuleName extends keyof RootState = MODULE_DEFAULT,
  // ConnectedModules extends keyof RootState = MODULE_VOID,
  // Settings extends IAnyObj = {},
  // RefComputed extends IAnyObj = {},
  // Mapped extends IAnyObj = {},
  // ExtraType extends [any, any] | [any] = [any, any],
  RootState extends IRootBase  = IRootBase,
  RootReducer extends IRootBase & ModuleReducerType = IRootBase & ModuleReducerType,
  RootCu extends { [key in keyof RootState]?: any } = IRootBase,
  // Props = PropsType,
  // PrivState = ModuleStateType,
  ConnectedModules extends keyof RootState = MODULE_VOID,
  
  RefComputed extends IAnyObj = {},
  Mapped extends IAnyObj = {},
  Extra extends [any, any] | [any] = [any, any],

  // Ctx=ICtx< RootState, RootReducer, RootCu, PropsType, ModuleStateType, ModuleName, ConnectedModules, RefComputed, Mapped, ExtraType>
  // Ctx extends ICtx
>(
  module:ModuleName,
  component:(props: PropsType) => ReactNode,
  state:ModuleStateType,
  reducer:ModuleReducerType,
  setup: (ctx:ICtx< RootState, RootReducer, RootCu, PropsType, ModuleStateType, ModuleName, ConnectedModules, RefComputed, Mapped, Extra>)=> Settings,
  mapProps: (ctx:ICtx< RootState, RootReducer, RootCu, PropsType, ModuleStateType, ModuleName, ConnectedModules, RefComputed, Mapped, Extra>) => PropsType
  ) => 
    // <Props, ICtx< RootState, RootReducer, RootCu, Props, PrivState, ModuleName, ConnectedModules, RefComputed, Mapped, ExtraType>, Props, RootState, ModuleName, PrivState >
    
    registerHookComp({ module:module, setup:setup, mapProps:mapProps })(component) 


const moduleTypeGuard = (s: string|number|symbol): string|number => {
  if (isSymbol(s)) {
    return ""
  }
  else {
    return s
  }
}