import {State} from './state'


export const setState = (state: any) => state

export const onClick = (state:State, filename:string):State => {
    state.filemenu.push(filename)
    return state
}