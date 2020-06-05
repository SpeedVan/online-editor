import React from 'react'
import Editor from '../../components/editor'
import style from './style.css'

import C from '../../components/tree';

import { Layout } from 'antd';
import 'antd/dist/antd.css';
const { Header, Footer, Sider, Content } = Layout;

// const contentChange = () => 123

const EditPanel = () => (
    <Layout>
        <Sider style={{background:"#fff"}}><C data={{}}/></Sider>
        <Layout>
            <Header>Header</Header>
            <Content><Editor text={''}/></Content>
            <Footer>Footer</Footer>
        </Layout>
    </Layout>
);

export default EditPanel;