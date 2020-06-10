
import React, { useState } from 'react';
import { run, registerHookComp, useConcent } from "concent";


import SortableTree, { toggleExpandedForAll, ExtendedNodeData } from 'react-sortable-tree';
// import 'react-sortable-tree/style.css';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';

import tmp from './tmp'
import model from './model'
// import Search from './search'

// import { ObjectInspector, TableInspector } from 'react-inspector';
// or use the shorthand
// import Inspector from 'react-inspector';

// const state = useRef({ searchString: '', searchFocusIndex: 0, searchFoundCount: null, treeData: [] })

run({
  // count: {
  //   state: {
  //     sharedCount: 100,
  //     anotherCount: 2
  //   },

  //   //模块级别的计算函数定义，供多个实例共享
  //   computed: {
  //     //定义sharedCount计算函数
  //     sharedCount: sharedCount => sharedCount * 100,
  //     //定义依赖多个值变化的计算key totalCount的计算函数
  //     totalCount: {
  //       fn(newState) {
  //         return newState.sharedCount + newState.anotherCount;
  //       },
  //       depKeys: ["sharedCount", "anotherCount"]
  //     }
  //   }
  // },
  tree: {
    state: {

    },
    // init: async ()=>{//【optional】async state init process, attention this process has nothing to do with whether the component is mounted or not, but the result can effect all the components belong to this module.
    //   const s = await fetch("https://gitlab.com/api/v4/projects/sv_apitest%2Fp_apitest/repository/tree?ref=6ec5628bbb45e43c5903b3fe54249f296ac24e2c&path=/&per_page=500",{
    //     headers: {
    //         "Private-Token": "sF7us_xdFTBseuKeyvNo"
    //     }
    //   }).then(res => res.json())
    //   console.log(s)
    //   // const state = await api.fetchState();
    //   return {treeData:s};
    // }
  },
});

const setup = (ctx:any) => {
  // ctx.watch("count", (count:any) => {
  //   const second = new Date().getSeconds();
  //   if (parseInt(count) === 10)
  //     ctx.setState({ msg: "now change to 10 " + second });
  // });

  //实例级别的计算函数
  // ctx.computed("count", (count:any) => count * 2);

  ctx.effect(()=>{//【optional】async state init process, attention this process has nothing to do with whether the component is mounted or not, but the result can effect all the components belong to this module.
    fetch("https://gitlab.com/api/v4/projects/sv_apitest%2Fp_apitest/repository/tree?ref=6ec5628bbb45e43c5903b3fe54249f296ac24e2c&path=/&per_page=500",{
      headers: {
          "Private-Token": "sF7us_xdFTBseuKeyvNo"
      }
    })
    .then(res => res.json())
    .then(j => {
      const data = j.map((i:any)=>({title:i.name, isDirectory:i.type=="tree", expand:i.type=="tree" }))
      console.log("j", j, data, tmp.DemoTreeData.slice(3))
      ctx.setState({treeData: data})
      // ctx.setState({treeData:j.map((i:any)=>({title:i.name, isDirectory:i.type=="tree", expand:i.type=="tree" }))})
    })
    // console.log(s)
    // // const state = await api.fetchState();
    // return {treeData:s};
  }, [])

  // ctx.effect(() => {
  //   console.log("tigger effect because of count changed");
  //   ctx.emit("msgReceived", `count changed to ${ctx.state.count}`);
  // }, ["count"]);

  // returned result will been collected to ctx.settings
  return {
    changeCount: ctx.sync("treeData")
  };
};

// const iState = { count: 1, msg: "" };
// const Demo = registerHookComp({
//   module: "tree",
//   state: iState,
//   //仅首次渲染之前触发
//   setup,
//   //每一轮渲染之前触发，通常用于转换数据形状，匹配function组件的props
//   mapProps(ctx:any) {
//     return {
//       ...ctx.state,
//       sync: ctx.syncInt,
//       changeCount: ctx.settings.changeCount,
//       doubledCount: ctx.refComputed.count,
//       moduleComputed: ctx.moduleComputed
//     };
//   },
//   render: ({ sync, sharedCount, anotherCount, count, doubledCount, msg, changeCount, moduleComputed }) => {
//     return (
//       <>
//         <hr />
//         sharedCount:
//         <input value={sharedCount} onChange={sync("sharedCount")} /> <br />
//         anotherCount:
//         <input value={anotherCount} onChange={sync("anotherCount")} /> <br />
//         count: {count} <br />
//         doubledCount: {doubledCount} <br />
//         moduleComputed.sharedCount: {moduleComputed.sharedCount} <br />
//         moduleComputed.totalCount: {moduleComputed.totalCount} <br />
//         msg: {msg} <br />
//         <input value={count} onChange={changeCount} />
//       </>
//     );
//   }
// });

// function DemoOri() {
//   //useConcent 返回实例上下文 ctx
//   const { state, settings, refComputed, sync } = useConcent({
//     module: "count",
//     setup,
//     state: iState
//   });
//   const { count, msg, sharedCount } = state;

//   return (
//     <>
//       <hr />
//       <h3>I am function comp</h3>
//       sharedCount: <input
//         value={sharedCount}
//         onChange={sync("sharedCount")}
//       />{" "}
//       <br />
//       count: {count} <br />
//       doubledCount: {refComputed.count} <br />
//       msg: {msg} <br />
//       <input value={count} onChange={settings.changeCount} />
//     </>
//   );
// }

// const MsgBoard = registerHookComp({
//   state: { msg: "no msg" },
//   setup: ctx => {
//     ctx.on("msgReceived", (msg:any) => {
//       ctx.setState({ msg });
//     });
//   },
//   mapProps: (ctx:any) => ({ msg: ctx.state.msg }),
//   render: ({ msg }) => {
//     return <h1>msg: {msg}</h1>;
//   }
// });


type tP = {
  node: any,
  path: any,
  treeIndex: any
}

const alertNodeInfo = ({ node, path, treeIndex }: tP) => {
  const objectString = Object.keys(node)
    .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
    .join(',\n   ');

  global.alert(
    'Info passed to the icon and button generators:\n\n' +
    `node: {\n   ${objectString}\n},\n` +
    `path: [${path.join(', ')}],\n` +
    `treeIndex: ${treeIndex}`
  );
};

export type Prop = {
  // onClick: Function
}

const TreeFunc: React.FC<Prop> = () => {
  const initState = { searchString: '', searchFocusIndex: 0, searchFoundCount: null, treeData: tmp.DemoTreeData }
  const { state, settings, refComputed, sync } = useConcent({
    module: "tree",
    setup,
    state: initState
  })
  // const updateState = (f: any) => setState(f(state))
  
  const { treeData, searchString, searchFocusIndex, searchFoundCount } = state

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
    onClick: () => alertNodeInfo(rowInfo)
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
export { model }

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