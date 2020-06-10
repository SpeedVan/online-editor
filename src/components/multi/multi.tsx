import React from 'react';
import Menu, { ClickParam } from 'antd/lib/menu'
import { FileTextFilled } from '@ant-design/icons';

export type FileInfo = {
  path: string // unique
  modified: boolean
}

export type OnClickType = (key:string) => void 

export type PropsType = {
  selectKey: string
  files: FileInfo[]
  onClick: OnClickType
}

// don't transitive antd dependence outside. e.g.
// const antdOnClick = (onClick:OnClick) => (param: ClickParam) => onClick(param.key)

const Multi = ({ selectKey, files, onClick }:PropsType) => (
  <Menu onClick={e => onClick(e.key)} selectedKeys={[selectKey]} mode="horizontal">
    {files.map(i => <Menu.Item key={i.path} icon={<FileTextFilled />}>{i.path} </Menu.Item>)}
  </Menu>
)

export default Multi