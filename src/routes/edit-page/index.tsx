import React from 'react'
// import Editor from '../../components/editor/concent'
import Editor from '../../components/editor'
// import Multi from '../../components/multi/concent'
import Multi, { PropsType as MP } from '../../components/multi'
import style from './style.module.css'


// import Tree from '../../components/tree/concent';
import Tree, { PropsType as TP } from '../../components/tree'
// import 'antd/dist/antd'

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
type ModulePropsType<T> = T extends { 0: infer U } ? U : never;
type KeyType<T, K> = T[keyof T & K] 

// const MapToTP = (props: MP & TP):TP => props

// const MapToMP = (props: MP & TP):MP => props

const EditPage = (props:MP & TP & ModulePropsType<ArgumentTypes<typeof Editor>>) => (
  <Layout>
    <Sider style={{ background: "#fff" }}><Tree {...(props)}/></Sider>
    <Layout>
      <Header style={{ background: "#fff", lineHeight: "30px", height: "30px" }}><Multi {...(props)}/></Header>
      <Content><Editor {...props}/></Content>
      <Footer>Footer</Footer>
    </Layout>
  </Layout>
);


export default EditPage