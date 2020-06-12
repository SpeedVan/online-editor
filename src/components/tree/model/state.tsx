
export type StateType = {
    searchString: string,
    searchFocusIndex: number,
    searchFoundCount: number,
    treeData: Array<any>
}

const state: StateType = { searchString: '', searchFocusIndex: 0, searchFoundCount: 0, treeData: [] }

export default state