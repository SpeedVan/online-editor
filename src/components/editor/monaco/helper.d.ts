import { editor as me } from 'monaco-editor'
// import { LinesLayout, EditorWhitespace } from '../../../../node_modules/monaco-editor/esm/vs/editor/common/viewLayout/linesLayout.js'
// import { ViewZones } from '../../../../node_modules/monaco-editor/esm/vs/editor/browser/viewParts/viewZones/viewZones'

declare function GetViewLayoutArr(editor: me.IStandaloneCodeEditor):EditorWhitespace[];

declare function GetViewZoneArr(editor: me.IStandaloneCodeEditor):_zones;

declare function Must<T>(p: T|null):T;

export default { GetViewLayoutArr, GetViewZoneArr, Must }


interface _zones {
    [id: string]: ViewZone;
 }

interface ViewZone {
    whitespaceId: string;
    delegate: me.IViewZone;
    isVisible: bool;
    domNode: HTMLElement;
    marginDomNode?: HTMLElement | null;
}



interface EditorWhitespace {
    id: string;
    afterLineNumber: number;
    ordinal: number;
    height: number;
    minWidth: number;
    prefixSum: number;
}