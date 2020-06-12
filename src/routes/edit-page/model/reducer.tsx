import * as mr from 'src/components/multi/model/reducer'
import * as er from '../../../components/editor/model/reducer'

import { StateType } from './state'

export * from '../../../components/multi/model/reducer'
export * from '../../../components/tree/model/reducer'
export * from '../../../components/editor/model/reducer'


export const openFile = async ({path, cb}:{path:string, cb:(m:any)=>void}, state:StateType) => {
    const s = await er.openModel({path, cb}, state)
    const ms = mr.addCurrentMenu(path, {...state, ...s})
    return ms
}

export const openTmpFile = ({cb}:{cb:(m:any)=>void}, state:StateType) => {
    const s = er.openTmpModel({cb}, state)
    const ms = mr.addCurrentMenu("Not Save", {...state, ...s})
    return ms
}
