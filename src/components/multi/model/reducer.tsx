import { StateType } from './state'



export const selectFile = 
    (newKey: string, { selectKey, ...p }: StateType): StateType => {
        console.log("selectFile", "old_selectKey", selectKey, "new_selectKey", newKey)
        return ({ selectKey: newKey, ...p })
    }