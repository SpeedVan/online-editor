

export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
export type ModulePropsType<T> = T extends { 0: infer U } ? U : never;
export type KeyType<T, K> = T[keyof T & K] 


export type FnParamType<F extends Function> = ModulePropsType<ArgumentTypes<F>>

