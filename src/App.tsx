import React from 'react';
// import logo from './logo.svg';
import style from './App.module.css';
import Home from './routes/home'
import Editor from './routes/edit-panel'

import { BrowserRouter, Switch, Route, Link, HashRouter } from 'react-router-dom';
import { createHashHistory } from 'history';

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

type Item = {
  id: number
  path: string
  name: string
  component: React.FC
}

type Prop = {
  data: Array<Item>
}

const HeaderPanel: React.FC<Prop> = ({data}) => (
  <Header className={style["ant-layout-header"]}>
    <h1>GIT ONLINER EDITOR</h1>
    <nav>
      {data.map(i=><Link to={i.path}>{i.name}</Link>)}
      {/* <Link to="/">Home</Link>
      <Link to="/editor">LocalEditor</Link> */}
    </nav>
  </Header>
);

const ContentPanel: React.FC<Prop> = ({data}) => (
  <Layout>
    <Switch>
      {data.map(i=><Route exact key={i.id} path={i.path} component={i.component} />)}
      {/* <Route path={'/editor'} children={<Editor />} />
      <Route path={'/'} children={<Home />}/> */}
      {/* <Route path={'/editor'} component={Editor} />
      <Route path={'/'} component={Home}/> */}
    </Switch>
  </Layout>
)

const p: Array<Item> = [
  { id:1, path: '/', name: 'Home', component: Home },
  { id:2, path: '/editor', name: 'Editor', component: Editor }
]


const App = () => (
  <Layout>
    <HashRouter>
      <HeaderPanel data={p}/>
      <ContentPanel data={p}/>
    </HashRouter>
  </Layout>
)

export default App;
