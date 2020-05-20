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


const Editor = function Codemirror({
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
		
		meditor.onKeyDown((e) => {
			if (e.metaKey && e.code == "Enter"){
				const position = meditor.getPosition()
				meditor.changeViewZones(function(changeAccessor) {
					var domNode = document.createElement('div');
					domNode.style.background = 'grey';
					changeAccessor.addZone({
								afterLineNumber: position.lineNumber,
								heightInLines: 3,
								domNode: domNode
					});
				});
			}
		})


		// const contentWidget = {
		// 	domNode: null,
		// 	getId: function() {
		// 		return 'my.content.widget';
		// 	},
		// 	getDomNode: function() {
		// 		if (!this.domNode) {
		// 			this.domNode = document.createElement('div');
		// 			this.domNode.innerHTML = 'My content widget';
		// 			this.domNode.style.background = 'grey';
		// 		}
		// 		return this.domNode;
		// 	},
		// 	getPosition: function() {
		// 		return {
		// 			position: {
		// 				lineNumber: 7,
		// 				column: 8
		// 			},
		// 			preference: [monaco.editor.ContentWidgetPositionPreference.ABOVE, monaco.editor.ContentWidgetPositionPreference.BELOW]
		// 		};
		// 	}
		// };
		// meditor.addContentWidget(contentWidget);

		// return () => meditor.dispose();
    }, []);
    
    // useEffect(() => {
	// 	dispatchRefs.current.readOnly = readOnly;
	// 	dispatchRefs.current.onHandleUpdate = onHandleUpdate;
	// 	dispatchRefs.current.onTextChange = onTextChange;
	// }, [readOnly, onHandleUpdate, onTextChange]);


	return <div ref={container} class={style.editor} {...rest} />;
}

export default memo(Editor)