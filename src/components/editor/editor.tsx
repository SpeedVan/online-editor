import React, { memo, useRef, useEffect, RefObject, MutableRefObject } from 'react';
import { editor as MonacoEditor, languages as MonacoEditorLangs, IKeyboardEvent } from 'monaco-editor'
import style from './style.module.css'
// import useScript from './util/useScript'
export type PropsType = {
	cRef:MutableRefObject<HTMLDivElement>
}

const Editor = ({
	cRef
}: PropsType) => {
	return <div ref={cRef} className={style.editor} />
}

export default Editor


