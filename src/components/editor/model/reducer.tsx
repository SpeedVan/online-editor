import { StateType } from './state'
import { editor as MonacoEditor, languages as MonacoEditorLangs, IKeyboardEvent } from 'monaco-editor'


// export const selectFile = 
//     (newKey: string, { selectKey, models }: StateType, editor:any): StateType => {
//         console.log("selectFile", "old_selectKey", selectKey, "new_selectKey", newKey)
//         return ({ selectKey: newKey, models })
//     }

export const openModel = async ({path, cb}:{path:string, cb:(m:any)=>void}, {models, ...p}:StateType) => {
    return await fetch("https://gitlab.com/api/v4/projects/sv_apitest%2Fp_apitest/repository/tree?ref=6ec5628bbb45e43c5903b3fe54249f296ac24e2c&path=/&per_page=500",{
        headers: {
            "Private-Token": "sF7us_xdFTBseuKeyvNo"
        }
    })
    .then(res => res.text()).then(t=>{
        const m = MonacoEditor.createModel(t, "python")
        cb(m)
        return {models:{...models, [path]:m}, ...p}
    })
}

export const openTmpModel = ({cb}:{cb:(m:any)=>void}, {models, ...p}:StateType) => {
    const m = MonacoEditor.createModel("", "python")
    cb(m)
    return {models:{...models, ["Not Save"]:m}, ...p}
}