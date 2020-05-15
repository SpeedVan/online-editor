import { h } from 'preact';
import { editor as MonacoEditor, languages } from 'monaco-editor'
import { useRef, useEffect } from 'preact/hooks';
import { memo } from 'preact/compat';
import style from './style'

const onHandleUpdateDefault = (view, t) => {
    // console.log(view, t)
    view.update(t)
};

const code = 
`def main(args):
  return args`

const Editor = memo(function Codemirror({
	value = '',
	extensions = [],
	onTextChange = null,
	onHandleUpdate = onHandleUpdateDefault,
	readOnly = false,
	...rest
}) {
    const container = useRef(null);
	const editor = useRef(null);
    const dispatchRefs = useRef({});

    useEffect(() => {

		// meditor.trigger('随便写点儿啥', 'editor.action.triggerSuggest', {})
		// languages.registerCompletionItemProvider('python', {
		// 	provideCompletionItems () {
		// 		return [{
		// 		  label: 'main',  // 显示的提示内容
		// 		  kind: languages.CompletionItemKind['Function'], // 用来显示提示内容后的不同的图标
		// 		  insertText: code, // 选择后粘贴到编辑器中的文字
		// 		  detail: 'default main function' // 提示内容后的说明
		// 		}];
		// 	},
		// 	triggerCharacters: ['$']
		// })

        let meditor = (editor.current = MonacoEditor.create(container.current, {
			value: value,
			language:"python",
			theme: "vs-dark"
		}))
		

		return () => meditor.dispose();
    }, []);
    
    useEffect(() => {
		dispatchRefs.current.readOnly = readOnly;
		dispatchRefs.current.onHandleUpdate = onHandleUpdate;
		dispatchRefs.current.onTextChange = onTextChange;
	}, [readOnly, onHandleUpdate, onTextChange]);


	return <div ref={container} class={style.editor} {...rest} />;
})

export default Editor