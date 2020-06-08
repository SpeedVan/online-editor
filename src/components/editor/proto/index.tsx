import { Msg, Meta, Type } from "./generated/msg_pb"

const encoder = new TextEncoder()
const decoder = new TextDecoder("utf-8")

/**
 * hack
 */
Msg.simpleCreate = (type, traceId, body) => {
    const msg = new Msg()
    const meta = new Meta()
    meta.setType(type)
    meta.setTraceid(traceId)
    msg.setMeta(meta)
    msg.setBody(encoder.encode(body))
    return msg
}

Msg.prototype.getBody_asUTF8 = function () {
    return decoder.decode(this.getBody_asU8())
}

export { Msg, Meta, Type }