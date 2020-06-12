import ms, { StateType as mst } from '../../../components/multi/model/state'
import ts, { StateType as tst } from '../../../components/tree/model/state'
import es, { StateType as est } from '../../../components/editor/model/state'

export type StateType = mst & tst & est

const state: StateType = {...ms, ...ts, ...es}

export default state