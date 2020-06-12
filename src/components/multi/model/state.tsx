import { FileInfo } from '../index'

export type StateType = {
    menuFiles: FileInfo[]// to make mapProps simple, use Component Type
    currentFile: string
}

const state: StateType = {
    menuFiles: [],
    currentFile: ""
}

export default state