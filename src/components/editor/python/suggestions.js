import { languages as MonacoEditorLangs } from 'monaco-editor'

export default [
    {
        label: 'main',  // 显示的提示内容
        kind: MonacoEditorLangs.CompletionItemKind['Function'], // 用来显示提示内容后的不同的图标
        insertText: 'def main(args):\n  return args', // 选择后粘贴到编辑器中的文字
        detail: 'default main function' // 提示内容后的说明
    },
    {
        label: 'import',
        kind: MonacoEditorLangs.CompletionItemKind['Keyword'],
        insertText: 'import',
        detail: 'import'
    }
]
