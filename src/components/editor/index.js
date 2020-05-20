import { h } from 'preact';
import { editor as MonacoEditor, languages as MonacoEditorLangs } from 'monaco-editor'
import { useRef, useEffect } from 'preact/hooks';
import { memo } from 'preact/compat';
import style from './style'
import pysg from './python/suggestions'

const Editor = function Codemirror({
	value = '',
	extensions = [],
	onTextChange = null,
	onHandleUpdate = null,
	readOnly = false,
	...rest
}) {
    const container = useRef(null);
	const editor = useRef(null);
    const dispatchRefs = useRef({});

    useEffect(() => {
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

		meditor.onKeyDown((e) => {
			if (e.metaKey && e.code == "KeyI") {
				console.log(meditor)
				console.log(meditor._modelData.viewModel.viewLayout._linesLayout._arr)
			}
			if (e.metaKey && e.code == "Backspace") {
				const currLine = meditor.getPosition().lineNumber
				const now_viewZones_layouts = meditor._modelData.viewModel.viewLayout._linesLayout._arr
				meditor.changeViewZones(function(changeAccessor) {
					now_viewZones_layouts.filter(i=>i.afterLineNumber == currLine-1).map(i=>i.id).forEach(i=>changeAccessor.removeZone(i))
				})
			}

			if (e.metaKey && e.code == "Enter"){
				const currLine = meditor.getPosition().lineNumber
				const now_viewZones_layouts = meditor._modelData.viewModel.viewLayout._linesLayout._arr
				meditor.changeViewZones(function(changeAccessor) {
					now_viewZones_layouts.filter(i=>i.afterLineNumber == currLine).map(i=>i.id).forEach(i=>changeAccessor.removeZone(i))
				})
				meditor.changeViewZones(function(changeAccessor) {
					const domNode = document.createElement('div');
					const position = meditor.getPosition();
					const text = meditor.getValue(position);
					const splitedText = text.split("\n");
					let sendCode = text
					let max_smaller = 1
					for(let i in now_viewZones_layouts) {
						if (now_viewZones_layouts[i].afterLineNumber >= max_smaller && now_viewZones_layouts[i].afterLineNumber < currLine) {
							max_smaller = now_viewZones_layouts[i].afterLineNumber+1
						}
					}
					sendCode = splitedText.slice(max_smaller-1, currLine).join('\n')
					fetch('http://127.0.0.1:8888/',{
						method:'POST',
						mode:'cors',
						body: sendCode
					}).then(res =>res.text())
					.then(text => {
						domNode.innerHTML = text
					}) 
					
					domNode.style.background = 'grey';
					changeAccessor.addZone({
						afterLineNumber: currLine,
						heightInLines: 3,
						domNode: domNode
					});
				});
				
			}
		})

		return () => meditor.dispose();
    }, []);


	return <div ref={container} class={style.editor} {...rest} />;
}

export default memo(Editor)