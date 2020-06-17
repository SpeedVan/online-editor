import { StateType } from './state'
import { editor as MonacoEditor, languages as MonacoEditorLangs, IKeyboardEvent } from 'monaco-editor'


// export const selectFile = 
//     (newKey: string, { selectKey, models }: StateType, editor:any): StateType => {
//         console.log("selectFile", "old_selectKey", selectKey, "new_selectKey", newKey)
//         return ({ selectKey: newKey, models })
//     }

export const openModel = async ({path, cb}:{path:string, cb:(m:any)=>void}, {models, ...p}:StateType) => {
    // const gitUrl = "https://gitlab.com/api/v4/projects/sv_apitest%2Fp_apitest/repository/tree?ref=6ec5628bbb45e43c5903b3fe54249f296ac24e2c&path=/&per_page=500"
    const gitUrl = "https://www.gitlab.com/api/v4/projects/sv_apitest%2Fp_apitest/repository/files/"+path+"/raw?ref=774ecfb6ab9b2e2ff66d80dcd39cdfa115cabb40"
    return await fetch(gitUrl,{
        headers: {
            "Private-Token": "sF7us_xdFTBseuKeyvNo"
            
        },
        mode:"cors"
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