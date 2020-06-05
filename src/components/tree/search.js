// import React from 'react'

// const search = () => (
//     <div style={{ flex: '0 0 auto', padding: '0 15px' }}>
//         <div>
//             <h3>File Explorer Theme</h3>
//             <button onClick={this.expandAll}>Expand All</button>
//             <button onClick={this.collapseAll}>Collapse All</button>
//         </div>
//         <div>
//             <form style={{ display: 'inline-block' }} onSubmit={event => { event.preventDefault(); }} >
//                 <label htmlFor="find-box">
//                     Search:&nbsp;
//                     <input
//                         id="find-box"
//                         type="text"
//                         value={searchString}
//                         onChange={event =>
//                             this.setState({ searchString: event.target.value })
//                         }
//                     />
//                 </label>

//                 <button type="button" disabled={!searchFoundCount} onClick={selectPrevMatch} >
//                     &lt;
//                 </button>

//                 <button type="submit" disabled={!searchFoundCount} onClick={selectNextMatch} >
//                     &gt;
//                 </button>

//                 <span>
//                     &nbsp;
//                     {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
//                     &nbsp;/&nbsp;
//                     {searchFoundCount || 0}
//                 </span>
//             </form>
//         </div>
//     </div>
// )