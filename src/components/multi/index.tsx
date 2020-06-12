import React from 'react';
import Menu, { ClickParam } from 'antd/lib/menu'
import { FileTextFilled } from '@ant-design/icons';

export type FileInfo = {
  path: string // unique
  modified: boolean
}

export type PropsType = {
  currentFile: string
  menuFiles: FileInfo[]
  menuOnClick: (key:string) => void 
}

// don't transitive antd dependence outside. e.g.
// const antdOnClick = (onClick:OnClick) => (param: ClickParam) => onClick(param.key)

const Multi = ({ currentFile, menuFiles, menuOnClick }:PropsType) => (
  <Menu onClick={e => menuOnClick(e.key)} selectedKeys={[currentFile]} mode="horizontal">
    {menuFiles.map(i => <Menu.Item key={i.path} icon={<FileTextFilled />}>{i.path} </Menu.Item>)}
  </Menu>
)

export default Multi