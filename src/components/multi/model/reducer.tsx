import { StateType } from './state'



export const changeMenu = 
    (newKey: string, { currentFile, ...p }: StateType): StateType => ({ currentFile: newKey, ...p })


export const addCurrentMenu = 
    (newKey: string, { currentFile, menuFiles, ...p }: StateType): StateType => {
        return ({ currentFile: newKey, menuFiles: menuFiles.concat({path:newKey, modified:false}), ...p })
    }