// package: 
// file: msg.proto

import * as jspb from "google-protobuf";

export class Msg extends jspb.Message {
  // hack by shell sed
  getBody_asUTF8(): string;
  static simpleCreate(type: Type, traceId: string, body: string): Msg;

  hasMeta(): boolean;
  clearMeta(): void;
  getMeta(): Meta;
  setMeta(value: Meta): void;

  getBody(): Uint8Array | string;
  getBody_asU8(): Uint8Array;
  getBody_asB64(): string;
  setBody(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Msg.AsObject;
  static toObject(includeInstance: boolean, msg: Msg): Msg.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Msg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Msg;
  static deserializeBinaryFromReader(message: Msg, reader: jspb.BinaryReader): Msg;
}

export namespace Msg {
  export type AsObject = {
    meta?: Meta.AsObject,
    body: Uint8Array | string,
  }
}

export class Meta extends jspb.Message {
  getType(): TypeMap[keyof TypeMap];
  setType(value: TypeMap[keyof TypeMap]): void;

  getTraceid(): string;
  setTraceid(value: string): void;

  getHeaderMap(): jspb.Map<string, string>;
  clearHeaderMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Meta.AsObject;
  static toObject(includeInstance: boolean, msg: Meta): Meta.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Meta, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Meta;
  static deserializeBinaryFromReader(message: Meta, reader: jspb.BinaryReader): Meta;
}

export namespace Meta {
  export type AsObject = {
    type: TypeMap[keyof TypeMap],
    traceid: string,
    headerMap: Array<[string, string]>,
  }
}

export interface TypeMap {
  INTERACTIVE_REQ: 0;
  INTERACTIVE_RESOK: 1;
  INTERACTIVE_RESERR: 2;
}

export const Type: TypeMap;

