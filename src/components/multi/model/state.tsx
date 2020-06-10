import { FileInfo } from '../multi'

export type StateType = {
    files: FileInfo[]// to make mapProps simple, use Component Type
    selectKey: string
}

const state: StateType = {
    files: [{path:"/path/a.py", modified:false}],
    selectKey: ""
}

export default state