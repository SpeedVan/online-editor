require('./msg_pb.js')

const Msg = proto.Msg
const Meta = proto.Meta
const Type = proto.Type
const encoder = new TextEncoder("utf-8")
const decoder = new TextDecoder("utf-8")

Msg.simpleCreate=function(type, traceId, body) {
    const msg = new Msg()
    const meta = new Meta()
    meta.setType(type)
    meta.setTraceid(traceId)
    msg.setMeta(meta)
    msg.setBody(encoder.encode(body))
    return msg
}

Msg.prototype.getBody_asUTF8=function(){
    return decoder.decode(this.getBody_asU8())
}
export {Msg, Meta, Type}