/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/iobuffer@5.3.2/lib-esm/IOBuffer.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
function t(t, e = "utf8") {
  return new TextDecoder(e).decode(t);
}
!(function (t) {
  if (t.TextEncoder && t.TextDecoder) return !1;
  function e(t = "utf-8") {
    if ("utf-8" !== t)
      throw new RangeError(
        `Failed to construct 'TextEncoder': The encoding label provided ('${t}') is invalid.`
      );
  }
  function i(t = "utf-8", e = { fatal: !1 }) {
    if ("utf-8" !== t)
      throw new RangeError(
        `Failed to construct 'TextDecoder': The encoding label provided ('${t}') is invalid.`
      );
    if (e.fatal)
      throw new Error(
        "Failed to construct 'TextDecoder': the 'fatal' option is unsupported."
      );
  }
  Object.defineProperty(e.prototype, "encoding", { value: "utf-8" }),
    (e.prototype.encode = function (t, e = { stream: !1 }) {
      if (e.stream)
        throw new Error(
          "Failed to encode: the 'stream' option is unsupported."
        );
      let i = 0;
      const s = t.length;
      let r = 0,
        n = Math.max(32, s + (s >> 1) + 7),
        a = new Uint8Array((n >> 3) << 3);
      for (; i < s; ) {
        let e = t.charCodeAt(i++);
        if (e >= 55296 && e <= 56319) {
          if (i < s) {
            const s = t.charCodeAt(i);
            56320 == (64512 & s) &&
              (++i, (e = ((1023 & e) << 10) + (1023 & s) + 65536));
          }
          if (e >= 55296 && e <= 56319) continue;
        }
        if (r + 4 > a.length) {
          (n += 8), (n *= 1 + (i / t.length) * 2), (n = (n >> 3) << 3);
          const e = new Uint8Array(n);
          e.set(a), (a = e);
        }
        if (0 != (4294967168 & e)) {
          if (0 == (4294965248 & e)) a[r++] = ((e >> 6) & 31) | 192;
          else if (0 == (4294901760 & e))
            (a[r++] = ((e >> 12) & 15) | 224), (a[r++] = ((e >> 6) & 63) | 128);
          else {
            if (0 != (4292870144 & e)) continue;
            (a[r++] = ((e >> 18) & 7) | 240),
              (a[r++] = ((e >> 12) & 63) | 128),
              (a[r++] = ((e >> 6) & 63) | 128);
          }
          a[r++] = (63 & e) | 128;
        } else a[r++] = e;
      }
      return a.slice(0, r);
    }),
    Object.defineProperty(i.prototype, "encoding", { value: "utf-8" }),
    Object.defineProperty(i.prototype, "fatal", { value: !1 }),
    Object.defineProperty(i.prototype, "ignoreBOM", { value: !1 }),
    (i.prototype.decode = function (t, e = { stream: !1 }) {
      if (e.stream)
        throw new Error(
          "Failed to decode: the 'stream' option is unsupported."
        );
      const i = new Uint8Array(t);
      let s = 0;
      const r = i.length,
        n = [];
      for (; s < r; ) {
        const t = i[s++];
        if (0 === t) break;
        if (0 == (128 & t)) n.push(t);
        else if (192 == (224 & t)) {
          const e = 63 & i[s++];
          n.push(((31 & t) << 6) | e);
        } else if (224 == (240 & t)) {
          const e = 63 & i[s++],
            r = 63 & i[s++];
          n.push(((31 & t) << 12) | (e << 6) | r);
        } else if (240 == (248 & t)) {
          let e =
            ((7 & t) << 18) |
            ((63 & i[s++]) << 12) |
            ((63 & i[s++]) << 6) |
            (63 & i[s++]);
          e > 65535 &&
            ((e -= 65536),
            n.push(((e >>> 10) & 1023) | 55296),
            (e = 56320 | (1023 & e))),
            n.push(e);
        }
      }
      return String.fromCharCode.apply(null, n);
    }),
    (t.TextEncoder = e),
    (t.TextDecoder = i);
})(
  "undefined" != typeof window
    ? window
    : "undefined" != typeof self
    ? self
    : void 0
);
const e = new TextEncoder();
const i = (() => {
    const t = new Uint8Array(4);
    return !((new Uint32Array(t.buffer)[0] = 1) & t[0]);
  })(),
  s = {
    int8: globalThis.Int8Array,
    uint8: globalThis.Uint8Array,
    int16: globalThis.Int16Array,
    uint16: globalThis.Uint16Array,
    int32: globalThis.Int32Array,
    uint32: globalThis.Uint32Array,
    uint64: globalThis.BigUint64Array,
    int64: globalThis.BigInt64Array,
    float32: globalThis.Float32Array,
    float64: globalThis.Float64Array,
  };
class r {
  constructor(t = 8192, e = {}) {
    let i = !1;
    "number" == typeof t
      ? (t = new ArrayBuffer(t))
      : ((i = !0), (this.lastWrittenByte = t.byteLength));
    const s = e.offset ? e.offset >>> 0 : 0,
      n = t.byteLength - s;
    let a = s;
    (ArrayBuffer.isView(t) || t instanceof r) &&
      (t.byteLength !== t.buffer.byteLength && (a = t.byteOffset + s),
      (t = t.buffer)),
      (this.lastWrittenByte = i ? n : 0),
      (this.buffer = t),
      (this.length = n),
      (this.byteLength = n),
      (this.byteOffset = a),
      (this.offset = 0),
      (this.littleEndian = !0),
      (this._data = new DataView(this.buffer, a, n)),
      (this._mark = 0),
      (this._marks = []);
  }
  available(t = 1) {
    return this.offset + t <= this.length;
  }
  isLittleEndian() {
    return this.littleEndian;
  }
  setLittleEndian() {
    return (this.littleEndian = !0), this;
  }
  isBigEndian() {
    return !this.littleEndian;
  }
  setBigEndian() {
    return (this.littleEndian = !1), this;
  }
  skip(t = 1) {
    return (this.offset += t), this;
  }
  back(t = 1) {
    return (this.offset -= t), this;
  }
  seek(t) {
    return (this.offset = t), this;
  }
  mark() {
    return (this._mark = this.offset), this;
  }
  reset() {
    return (this.offset = this._mark), this;
  }
  pushMark() {
    return this._marks.push(this.offset), this;
  }
  popMark() {
    const t = this._marks.pop();
    if (void 0 === t) throw new Error("Mark stack empty");
    return this.seek(t), this;
  }
  rewind() {
    return (this.offset = 0), this;
  }
  ensureAvailable(t = 1) {
    if (!this.available(t)) {
      const e = 2 * (this.offset + t),
        i = new Uint8Array(e);
      i.set(new Uint8Array(this.buffer)),
        (this.buffer = i.buffer),
        (this.length = this.byteLength = e),
        (this._data = new DataView(this.buffer));
    }
    return this;
  }
  readBoolean() {
    return 0 !== this.readUint8();
  }
  readInt8() {
    return this._data.getInt8(this.offset++);
  }
  readUint8() {
    return this._data.getUint8(this.offset++);
  }
  readByte() {
    return this.readUint8();
  }
  readBytes(t = 1) {
    return this.readArray(t, "uint8");
  }
  readArray(t, e) {
    const r = s[e].BYTES_PER_ELEMENT * t,
      n = this.byteOffset + this.offset,
      a = this.buffer.slice(n, n + r);
    if (this.littleEndian === i && "uint8" !== e && "int8" !== e) {
      const t = new Uint8Array(this.buffer.slice(n, n + r));
      t.reverse();
      const i = new s[e](t.buffer);
      return (this.offset += r), i.reverse(), i;
    }
    const h = new s[e](a);
    return (this.offset += r), h;
  }
  readInt16() {
    const t = this._data.getInt16(this.offset, this.littleEndian);
    return (this.offset += 2), t;
  }
  readUint16() {
    const t = this._data.getUint16(this.offset, this.littleEndian);
    return (this.offset += 2), t;
  }
  readInt32() {
    const t = this._data.getInt32(this.offset, this.littleEndian);
    return (this.offset += 4), t;
  }
  readUint32() {
    const t = this._data.getUint32(this.offset, this.littleEndian);
    return (this.offset += 4), t;
  }
  readFloat32() {
    const t = this._data.getFloat32(this.offset, this.littleEndian);
    return (this.offset += 4), t;
  }
  readFloat64() {
    const t = this._data.getFloat64(this.offset, this.littleEndian);
    return (this.offset += 8), t;
  }
  readBigInt64() {
    const t = this._data.getBigInt64(this.offset, this.littleEndian);
    return (this.offset += 8), t;
  }
  readBigUint64() {
    const t = this._data.getBigUint64(this.offset, this.littleEndian);
    return (this.offset += 8), t;
  }
  readChar() {
    return String.fromCharCode(this.readInt8());
  }
  readChars(t = 1) {
    let e = "";
    for (let i = 0; i < t; i++) e += this.readChar();
    return e;
  }
  readUtf8(e = 1) {
    return t(this.readBytes(e));
  }
  decodeText(e = 1, i = "utf-8") {
    return t(this.readBytes(e), i);
  }
  writeBoolean(t) {
    return this.writeUint8(t ? 255 : 0), this;
  }
  writeInt8(t) {
    return (
      this.ensureAvailable(1),
      this._data.setInt8(this.offset++, t),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeUint8(t) {
    return (
      this.ensureAvailable(1),
      this._data.setUint8(this.offset++, t),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeByte(t) {
    return this.writeUint8(t);
  }
  writeBytes(t) {
    this.ensureAvailable(t.length);
    for (let e = 0; e < t.length; e++) this._data.setUint8(this.offset++, t[e]);
    return this._updateLastWrittenByte(), this;
  }
  writeInt16(t) {
    return (
      this.ensureAvailable(2),
      this._data.setInt16(this.offset, t, this.littleEndian),
      (this.offset += 2),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeUint16(t) {
    return (
      this.ensureAvailable(2),
      this._data.setUint16(this.offset, t, this.littleEndian),
      (this.offset += 2),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeInt32(t) {
    return (
      this.ensureAvailable(4),
      this._data.setInt32(this.offset, t, this.littleEndian),
      (this.offset += 4),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeUint32(t) {
    return (
      this.ensureAvailable(4),
      this._data.setUint32(this.offset, t, this.littleEndian),
      (this.offset += 4),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeFloat32(t) {
    return (
      this.ensureAvailable(4),
      this._data.setFloat32(this.offset, t, this.littleEndian),
      (this.offset += 4),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeFloat64(t) {
    return (
      this.ensureAvailable(8),
      this._data.setFloat64(this.offset, t, this.littleEndian),
      (this.offset += 8),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeBigInt64(t) {
    return (
      this.ensureAvailable(8),
      this._data.setBigInt64(this.offset, t, this.littleEndian),
      (this.offset += 8),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeBigUint64(t) {
    return (
      this.ensureAvailable(8),
      this._data.setBigUint64(this.offset, t, this.littleEndian),
      (this.offset += 8),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeChar(t) {
    return this.writeUint8(t.charCodeAt(0));
  }
  writeChars(t) {
    for (let e = 0; e < t.length; e++) this.writeUint8(t.charCodeAt(e));
    return this;
  }
  writeUtf8(t) {
    return this.writeBytes(
      (function (t) {
        return e.encode(t);
      })(t)
    );
  }
  toArray() {
    return new Uint8Array(this.buffer, this.byteOffset, this.lastWrittenByte);
  }
  _updateLastWrittenByte() {
    this.offset > this.lastWrittenByte && (this.lastWrittenByte = this.offset);
  }
}
export { r as IOBuffer };
export default null;
//# sourceMappingURL=/sm/a222a7caf32e68047a1ce092cab8a1701fa4e1b6349c767db15151fb518f1bce.map
