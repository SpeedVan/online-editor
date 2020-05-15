import { h } from 'preact';
import { editor as MonacoEditor, languages as MonacoEditorLangs } from 'monaco-editor'
import { useRef, useEffect } from 'preact/hooks';
import { memo } from 'preact/compat';
import style from './style'
import pysg from './python/suggestions'

const onHandleUpdateDefault = (view, t) => {
    // console.log(view, t)
    view.update(t)
};


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
		MonacoEditorLangs.registerCompletionItemProvider('python', {
			provideCompletionItems: function(model, position) {
				return {
					suggestions:pysg
				};
			}
		})

        let meditor = (editor.current = MonacoEditor.create(container.current, {
			value: value,
			language:"python",
			theme: "vs-dark"
		}))
		meditor.opt
		

		return () => meditor.dispose();
    }, []);
    
    // useEffect(() => {
	// 	dispatchRefs.current.readOnly = readOnly;
	// 	dispatchRefs.current.onHandleUpdate = onHandleUpdate;
	// 	dispatchRefs.current.onTextChange = onTextChange;
	// }, [readOnly, onHandleUpdate, onTextChange]);


	return <div ref={container} class={style.editor} {...rest} />;
})

export default Editor