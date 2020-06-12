
import React, { useState } from 'react';
import { run, registerHookComp, useConcent } from "concent";
import SortableTree, { toggleExpandedForAll, ExtendedNodeData } from 'react-sortable-tree';
// import 'react-sortable-tree/style.css';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';

type tP = {
  node: any,
  path: any,
  treeIndex: any
}

const alertNodeInfo = (rowInfo:any) => {
  console.log(rowInfo)
};

export type PropsType = {
  sync: Function,
  searchString: string,
  searchFocusIndex: number,
  searchFoundCount: number,
  treeData: Array<any>,
  treeFileOnClick: (key:string) => void 
}

const TreeFunc = ({sync, treeData, searchString, searchFocusIndex, searchFoundCount, treeFileOnClick}:PropsType) => {
  const SortableTreeItemRender = (rowInfo:ExtendedNodeData) => ({
    icons: rowInfo.node.isDirectory
      ? [
        <div
          style={{
            borderLeft: 'solid 8px gray',
            borderBottom: 'solid 10px gray',
            marginRight: 10,
            boxSizing: 'border-box',
            width: 16,
            height: 12,
            filter: rowInfo.node.expanded
              ? 'drop-shadow(1px 0 0 gray) drop-shadow(0 1px 0 gray) drop-shadow(0 -1px 0 gray) drop-shadow(-1px 0 0 gray)'
              : 'none',
            borderColor: rowInfo.node.expanded ? 'white' : 'gray',
          }}
        />,
      ]
      : [
        <div
          style={{
            border: 'solid 1px black',
            fontSize: 8,
            textAlign: 'center',
            marginRight: 10,
            width: 12,
            height: 16,
          }}
        >
          F
                            </div>,
      ],
    buttons: [
      <button
        style={{
          padding: 0,
          borderRadius: '100%',
          backgroundColor: 'gray',
          color: 'white',
          width: 16,
          height: 16,
          border: 0,
          fontWeight: 100,
        }}
        onClick={() => alertNodeInfo(rowInfo)}
      >
        i
                        </button>,
    ],
    onClick: () => { if(!rowInfo.node.isDirectory)treeFileOnClick(rowInfo.node.title?rowInfo.node.title.toString():"") }
  })


  // fetch("https://gitlab.com/api/v4/projects/sv_apitest%2Fp_apitest/repository/tree?ref=6ec5628bbb45e43c5903b3fe54249f296ac24e2c&path=/&per_page=500",{
  //     headers: {
  //         "Private-Token": "sF7us_xdFTBseuKeyvNo"
  //     }
  // }).then(res => res.json()).then(j => sync("treeData")({...state, ...{treeData:j.map((i:any)=>({title:i.name, isDirectory:i.type=="tree", expand:i.type=="tree" }))}}))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }} >
      {/* <Search /> */}

      <div style={{ flex: '1 0 50%', padding: '0 0 0 15px' }}>
        <SortableTree
          theme={FileExplorerTheme}
          treeData={treeData}
          onChange={sync("treeData")}
          searchQuery={searchString}
          searchFocusOffset={searchFocusIndex}
          searchFinishCallback={matches => {
            sync("searchFoundCount")(matches.length)
            sync("searchFocusIndex")(matches.length > 0 ? searchFocusIndex % matches.length : 0)
          }
            // updateState((s: any) => ({
            //   ...s, ...{
            //     searchFoundCount: matches.length,
            //     searchFocusIndex: matches.length > 0 ? s.searchFocusIndex % matches.length : 0,
            //   }
            // }))
          }
          canDrag={({ node }) => !node.dragDisabled}
          canDrop={({ nextParent }) => !nextParent || nextParent.isDirectory}
          generateNodeProps={SortableTreeItemRender}
        />
      </div>
    </div>
  )
}

export default TreeFunc

/**
 * old version in Component class style
 */

//
// export default class Tree extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             searchString: '',
//             searchFocusIndex: 0,
//             searchFoundCount: null,
//             treeData: []
//         }

//         fetch("https://gitlab.com/api/v4/projects/sv_apitest%2Fp_apitest/repository/tree?ref=6ec5628bbb45e43c5903b3fe54249f296ac24e2c&path=/&per_page=500",{
//             headers: {
//                 "Private-Token": "sF7us_xdFTBseuKeyvNo"
//             }
//         }).then(res => res.json()).then(d => this.updateTreeData(d.map(i=>({title:i.name, isDirectory:i.type=="tree", expand:i.type=="tree" }))))

//         this.updateTreeData = this.updateTreeData.bind(this);
//         this.expandAll = this.expandAll.bind(this);
//         this.collapseAll = this.collapseAll.bind(this);

//     }

//     updateTreeData(treeData) {
//         this.setState({ treeData });
//     }

//     expand(expanded) {
//         this.setState({
//             treeData: toggleExpandedForAll({
//                 treeData: this.state.treeData,
//                 expanded,
//             }),
//         });
//     }

//     expandAll() {
//         this.expand(true);
//     }

//     collapseAll() {
//         this.expand(false);
//     }

//     render() {
//         const {
//             treeData,
//             searchString,
//             searchFocusIndex,
//             searchFoundCount,
//         } = this.state;

//         const alertNodeInfo = ({ node, path, treeIndex }) => {
//             const objectString = Object.keys(node)
//                 .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
//                 .join(',\n   ');

//             global.alert(
//                 'Info passed to the icon and button generators:\n\n' +
//                 `node: {\n   ${objectString}\n},\n` +
//                 `path: [${path.join(', ')}],\n` +
//                 `treeIndex: ${treeIndex}`
//             );
//         };

//         const selectPrevMatch = () =>
//             this.setState({
//                 searchFocusIndex:
//                     searchFocusIndex !== null
//                         ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
//                         : searchFoundCount - 1,
//             });

//         const selectNextMatch = () =>
//             this.setState({
//                 searchFocusIndex:
//                     searchFocusIndex !== null
//                         ? (searchFocusIndex + 1) % searchFoundCount
//                         : 0,
//             });

//         return (
//             <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }} >
//                 <div style={{ flex: '0 0 auto', padding: '0 15px' }}>
//                     <div>
//                         <h3>File Explorer Theme</h3>
//                         <button onClick={this.expandAll}>Expand All</button>
//                         <button onClick={this.collapseAll}>Collapse All</button>
//                     </div>
//                     <div>
//                         <form style={{ display: 'inline-block' }} onSubmit={event => { event.preventDefault(); }} >
//                             <label htmlFor="find-box">
//                                 Search:&nbsp;
//                                 <input
//                                     id="find-box"
//                                     type="text"
//                                     value={searchString}
//                                     onChange={event =>
//                                         this.setState({ searchString: event.target.value })
//                                     }
//                                 />
//                             </label>

//                             <button type="button" disabled={!searchFoundCount} onClick={selectPrevMatch} >
//                                 &lt;
//                             </button>

//                             <button type="submit" disabled={!searchFoundCount} onClick={selectNextMatch} >
//                                 &gt;
//                             </button>

//                             <span>
//                                 &nbsp;
//                                 {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
//                                 &nbsp;/&nbsp;
//                                 {searchFoundCount || 0}
//                             </span>
//                         </form>
//                     </div>
//                 </div>

//                 <div style={{ flex: '1 0 50%', padding: '0 0 0 15px' }}>
//                     <SortableTree
//                         theme={FileExplorerTheme}
//                         treeData={treeData}
//                         onChange={this.updateTreeData}
//                         searchQuery={searchString}
//                         searchFocusOffset={searchFocusIndex}
//                         searchFinishCallback={matches =>
//                             this.setState({
//                                 searchFoundCount: matches.length,
//                                 searchFocusIndex:
//                                     matches.length > 0 ? searchFocusIndex % matches.length : 0,
//                             })
//                         }
//                         canDrag={({ node }) => !node.dragDisabled}
//                         canDrop={({ nextParent }) => !nextParent || nextParent.isDirectory}
//                         generateNodeProps={rowInfo => ({
//                             icons: rowInfo.node.isDirectory
//                                 ? [
//                                     <div
//                                         style={{
//                                             borderLeft: 'solid 8px gray',
//                                             borderBottom: 'solid 10px gray',
//                                             marginRight: 10,
//                                             boxSizing: 'border-box',
//                                             width: 16,
//                                             height: 12,
//                                             filter: rowInfo.node.expanded
//                                                 ? 'drop-shadow(1px 0 0 gray) drop-shadow(0 1px 0 gray) drop-shadow(0 -1px 0 gray) drop-shadow(-1px 0 0 gray)'
//                                                 : 'none',
//                                             borderColor: rowInfo.node.expanded ? 'white' : 'gray',
//                                         }}
//                                     />,
//                                 ]
//                                 : [
//                                     <div
//                                         style={{
//                                             border: 'solid 1px black',
//                                             fontSize: 8,
//                                             textAlign: 'center',
//                                             marginRight: 10,
//                                             width: 12,
//                                             height: 16,
//                                         }}
//                                     >
//                                         F
//                                     </div>,
//                                 ],
//                             buttons: [
//                                 <button
//                                     style={{
//                                         padding: 0,
//                                         borderRadius: '100%',
//                                         backgroundColor: 'gray',
//                                         color: 'white',
//                                         width: 16,
//                                         height: 16,
//                                         border: 0,
//                                         fontWeight: 100,
//                                     }}
//                                     onClick={() => alertNodeInfo(rowInfo)}
//                                 >
//                                     i
//                                 </button>,
//                             ],
//                             onClick: () => alertNodeInfo(rowInfo)
//                         })}
//                     />
//                 </div>
//             </div>
//         );
//     }
// }