import React, { memo, useRef, useEffect } from 'react';
import { editor as MonacoEditor, languages as MonacoEditorLangs, IKeyboardEvent } from 'monaco-editor'
import style from './style.module.css'
import pysg from './python/suggestions'
import helper from './monaco/helper'
import uuid from 'uuid'
import { Msg, Type, Meta } from './proto'
import AnsiUp from 'ansi_up';
// import useScript from './util/useScript'

const ansi_up = new AnsiUp()

// const _utf2buffer = utfstr => {
//     var buf = new ArrayBuffer(utfstr.length);
//     var bufView = new Uint8Array(buf);
//     for (var i = 0, strlen = utfstr.length; i < strlen; i++) {
//         bufView[i] = utfstr.charCodeAt(i);
//     }
//     return buf;
// }

type Tasks = {
	[key:string]: any
}

const Editor = function Codemirror({
	value = '',
	extensions = [],
	onTextChange = null,
	onHandleUpdate = null,
	readOnly = false,
	...rest
}) {
    const container = useRef(document.createElement("div"));
	// const editor = useRef(null);
	// const dispatchRefs = useRef({});

    useEffect(() => {
		MonacoEditorLangs.registerCompletionItemProvider('python', {
			provideCompletionItems: function(model, position) {
				return {
					suggestions:pysg(position)
				};
			}
		})

        const meditor = MonacoEditor.create(container.current, {
			value: value,
			language:"python",
			theme: "vs-dark"
		})

		let tasks:Tasks = {}

		const ws = new WebSocket("ws://python-lang-server.faas-edit.test/interactive");
		ws.binaryType = "arraybuffer"
		ws.onopen = function(e) { 
			console.log("Connection open ...");
		};

		ws.onmessage = function(e:MessageEvent) {
			const msg = Msg.deserializeBinary(e.data)
			const meta = msg.getMeta()
			const traceId = meta.getTraceid()
			const f = tasks[traceId]
			f(msg.getBody_asUTF8())
			delete tasks[traceId]
			// ws.close();
		};

		ws.onclose = function(e) {
			console.log("Connection closed.", e);
		};   

		meditor.onKeyDown((e:IKeyboardEvent) => {
			if (e.metaKey && e.code == "KeyI") {
				console.log(meditor)
				// console.log(meditor._modelData.viewModel.viewLayout._linesLayout._arr)
				console.log(helper.GetViewLayoutArr(meditor))
				// const viewZones = meditor._modelData.view.viewZones
				// console.log(viewZones)
				console.log(helper.GetViewZoneArr(meditor))
			}
			if (e.metaKey && e.code == "Backspace") {
				
				const currLine = helper.Must(meditor.getPosition()).lineNumber
				// const now_viewZones_layouts = meditor._modelData.viewModel.viewLayout._linesLayout._arr
				const now_viewZones_layouts = helper.GetViewLayoutArr(meditor)
				meditor.changeViewZones(function(changeAccessor) {
					now_viewZones_layouts.filter(i=>i.afterLineNumber == currLine-1).map(i=>i.id).forEach(i=>changeAccessor.removeZone(i))
				})
			}

			if (e.metaKey && e.code == "Enter"){
				const currLine = helper.Must(meditor.getPosition()).lineNumber
				// const now_viewZones_layouts = meditor._modelData.viewModel.viewLayout._linesLayout._arr
				const now_viewZones_layouts = helper.GetViewLayoutArr(meditor)
				meditor.changeViewZones(function(changeAccessor) {
					now_viewZones_layouts.filter(i=>i.afterLineNumber == currLine).map(i=>i.id).forEach(i=>changeAccessor.removeZone(i))
				})
				meditor.changeViewZones(function(changeAccessor) {
					
					const position = helper.Must(meditor.getPosition());
					const text = meditor.getValue();
					const splitedText = text.split("\n");
					let sendCode = text
					let max_smaller = 1
					for(let i in now_viewZones_layouts) {
						if (now_viewZones_layouts[i].afterLineNumber >= max_smaller && now_viewZones_layouts[i].afterLineNumber < currLine) {
							max_smaller = now_viewZones_layouts[i].afterLineNumber+1
						}
					}
					sendCode = splitedText.slice(max_smaller-1, currLine).join('\n')
					const traceId = uuid.v4()
					const msg = Msg.simpleCreate(Type.INTERACTIVE_REQ, traceId, sendCode)
					
					const domNode = document.createElement('div');
					domNode.style.background = 'grey';
					domNode.innerHTML = "Waiting..."
					const zoneId = changeAccessor.addZone({
						afterLineNumber: currLine,
						heightInLines: 1,
						domNode: domNode
					});

					tasks[traceId] = (data:string) => meditor.changeViewZones(function(changeAccessor) {
						changeAccessor.removeZone(zoneId)
						const domNode = document.createElement('div');
						domNode.style.background = 'grey';
						const splitedText = data.split("\n");
						const text = ansi_up.ansi_to_html(data)

						domNode.innerHTML = text.replace(/\n/g, "<br />")

						changeAccessor.addZone({
							afterLineNumber: currLine,
							heightInLines: splitedText.length,
							domNode: domNode,
							suppressMouseDown: true
						})
					})

					ws.send(msg.serializeBinary().buffer)
					
				});
				
			}
		})

		return () => {
			console.log("exist")
			ws.close();
			meditor.dispose();
		}
    }, []);


	return <div ref={container} className={style.editor} {...rest} />;
}

export default memo(Editor)


