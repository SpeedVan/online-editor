import Editor from '../../components/editor'
import style from './style'

import C from '../../components/tree';

import { Layout } from 'antd';
import 'antd/dist/antd.css';
const { Header, Footer, Sider, Content } = Layout;
const LocalEdit = () => (
	<div class={style.edit}>
		<Layout>
            <Sider style={{background:"#fff"}}><C data={{}} /></Sider>
            <Layout>
                <Header>Header</Header>
                <Content><Editor value={''} /></Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
		
	</div>
);

export default LocalEdit;