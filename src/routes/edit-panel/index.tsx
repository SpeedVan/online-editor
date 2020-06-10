import React from 'react'
import Editor from '../../components/editor'
import { Concent as MultiConcent } from '../../components/multi'
import style from './style.module.css'

import FileSystemTree, { model as treeModel, Prop as TreeProp } from '../../components/tree';
// import 'antd/dist/antd'

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

// const contentChange = () => 123

// multiModel.autoConfigure()
// treeModel.autoConfigure()

// run(
//   {
//     FileSystemTree: treeModel.model,
//     MultiPanel: multiModel.model,
//   }
// )

const Multi = MultiConcent.Multi

// const setup = (ctx: ICtxBase) => {
//   ctx.effect(() => {
//     fetch("https://gitlab.com/api/v4/projects/sv_apitest%2Fp_apitest/repository/tree?ref=6ec5628bbb45e43c5903b3fe54249f296ac24e2c&path=/&per_page=500", {
//       headers: {
//         "Private-Token": "sF7us_xdFTBseuKeyvNo"
//       }
//     })
//       .then(res => res.json())
//       .then(j => {
//         const data = j.map((i: any) => ({ title: i.name, isDirectory: i.type == "tree", expand: i.type == "tree" }))
//         ctx.setState({ treeData: data })
//       })
//   }, [])


// }

const EditPanel = () => (
  <Layout>
    <Sider style={{ background: "#fff" }}><FileSystemTree /></Sider>
    <Layout>
      <Header style={{ background: "#fff", lineHeight: "30px", height: "30px" }}><Multi /></Header>
      <Content><Editor text={''} /></Content>
      <Footer>Footer</Footer>
    </Layout>
  </Layout>
);

export default EditPanel;