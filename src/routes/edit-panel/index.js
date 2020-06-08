import React from 'react'
import Editor from '../../components/editor'
import style from './style.css'

import FileSystemTree from '../../components/tree';
import 'antd/dist/antd'

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

// const contentChange = () => 123

const EditPanel = () => (
    <Layout>
        <Sider style={{background:"#fff"}}><FileSystemTree data={{}}/></Sider>
        <Layout>
            <Header>Header</Header>
            <Content><Editor text={''}/></Content>
            <Footer>Footer</Footer>
        </Layout>
    </Layout>
);

export default EditPanel;