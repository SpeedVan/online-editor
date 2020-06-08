# Path to this plugin
PROTOC_GEN_TS_PATH="./../../../../node_modules/.bin/protoc-gen-ts"

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="./generated"

mkdir -p ${OUT_DIR}

protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="${OUT_DIR}" \
    *.proto

sed -i "" '/export class Msg extends jspb\.Message {/a\
  \  // hack by shell sed\
  \  getBody_asUTF8(): string;\
  \  static simpleCreate\(type: Type, traceId: string, body: string\): Msg;\
  \
  ' ./generated/msg_pb.d.ts

sed -i "" '1i\
/* eslint-disable */
' ./generated/msg_pb.js

sed -i "" 's/  getMeta(): Meta | undefined;/  getMeta(): Meta;/' ./generated/msg_pb.d.ts
sed -i "" 's/  setMeta(value?: Meta): void;/  setMeta(value: Meta): void;/' ./generated/msg_pb.d.ts