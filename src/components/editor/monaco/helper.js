// import { IStandaloneCodeEditor } from 'monaco-editor'


const GetViewLayoutArr = editor => editor._modelData.viewModel.viewLayout._linesLayout._arr

const GetViewZoneArr = editor => editor._modelData.view.viewZones._zones

const Must = p => {
    if (p == null) {
        throw new Error("must not null")
    }
    return p
}

export default { GetViewLayoutArr, GetViewZoneArr, Must }