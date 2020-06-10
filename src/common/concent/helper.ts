/* eslint-disable */
import React, {ReactNode} from 'react'
import { run, configure, registerHookComp, registerDumb, ICtxBase, register, ICtx, IAnyObj, ICtxDefault, IRootBase, MODULE_DEFAULT, MODULE_VOID } from 'concent';

const config = <
  // ModuleName,
  ModuleName extends keyof RootState,
  Settings,
  PropsType = {},
  ModuleStateType = {},
  ModuleReducerType = {},
  
  
  
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
  RootState extends IRootBase & ModuleStateType  = IRootBase & ModuleStateType,
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
>(module:ModuleName, component:(props: PropsType) => ReactNode, state:ModuleStateType, reducer:ModuleReducerType) => 
    (setup: (ctx:ICtx< RootState, RootReducer, RootCu, PropsType, ModuleStateType, ModuleName, ConnectedModules, RefComputed, Mapped, Extra>)=> Settings) =>
    (mapProps: (ctx:ICtx< RootState, RootReducer, RootCu, PropsType, ModuleStateType, ModuleName, ConnectedModules, RefComputed, Mapped, Extra>) => PropsType) => 
    registerDumb<PropsType, ICtx< RootState, RootReducer, RootCu, PropsType, ModuleStateType, ModuleName, ConnectedModules, RefComputed, Mapped, Extra>, PropsType, RootState, ModuleName, ModuleStateType >({module, setup, mapProps })(component) // <Props, ICtx< RootState, RootReducer, RootCu, Props, PrivState, ModuleName, ConnectedModules, RefComputed, Mapped, ExtraType>, Props, RootState, ModuleName, PrivState >