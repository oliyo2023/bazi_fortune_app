var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .wrangler/tmp/bundle-lTUTS4/checked-fetch.js
function checkURL(request, init2) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init2) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  ".wrangler/tmp/bundle-lTUTS4/checked-fetch.js"() {
    "use strict";
    urls = /* @__PURE__ */ new Set();
    __name(checkURL, "checkURL");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init2] = argArray;
        checkURL(request, init2);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_checked_fetch();
    init_modules_watch_stub();
  }
});

// ../../../../../var/usrlocal/nodejs/lib/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../../../../var/usrlocal/nodejs/lib/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/@prisma/debug/dist/index.js
var require_dist = __commonJS({
  "node_modules/@prisma/debug/dist/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name2 in all)
        __defProp2(target, name2, { get: all[name2], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: /* @__PURE__ */ __name(() => from[key], "get"), enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports2 = {};
    __export2(src_exports2, {
      Debug: /* @__PURE__ */ __name(() => Debug3, "Debug"),
      clearLogs: /* @__PURE__ */ __name(() => clearLogs, "clearLogs"),
      default: /* @__PURE__ */ __name(() => src_default2, "default"),
      getLogs: /* @__PURE__ */ __name(() => getLogs, "getLogs")
    });
    module.exports = __toCommonJS(src_exports2);
    var colors_exports = {};
    __export2(colors_exports, {
      $: /* @__PURE__ */ __name(() => $2, "$"),
      bgBlack: /* @__PURE__ */ __name(() => bgBlack2, "bgBlack"),
      bgBlue: /* @__PURE__ */ __name(() => bgBlue2, "bgBlue"),
      bgCyan: /* @__PURE__ */ __name(() => bgCyan2, "bgCyan"),
      bgGreen: /* @__PURE__ */ __name(() => bgGreen2, "bgGreen"),
      bgMagenta: /* @__PURE__ */ __name(() => bgMagenta2, "bgMagenta"),
      bgRed: /* @__PURE__ */ __name(() => bgRed2, "bgRed"),
      bgWhite: /* @__PURE__ */ __name(() => bgWhite2, "bgWhite"),
      bgYellow: /* @__PURE__ */ __name(() => bgYellow2, "bgYellow"),
      black: /* @__PURE__ */ __name(() => black2, "black"),
      blue: /* @__PURE__ */ __name(() => blue2, "blue"),
      bold: /* @__PURE__ */ __name(() => bold2, "bold"),
      cyan: /* @__PURE__ */ __name(() => cyan2, "cyan"),
      dim: /* @__PURE__ */ __name(() => dim2, "dim"),
      gray: /* @__PURE__ */ __name(() => gray2, "gray"),
      green: /* @__PURE__ */ __name(() => green2, "green"),
      grey: /* @__PURE__ */ __name(() => grey2, "grey"),
      hidden: /* @__PURE__ */ __name(() => hidden2, "hidden"),
      inverse: /* @__PURE__ */ __name(() => inverse2, "inverse"),
      italic: /* @__PURE__ */ __name(() => italic2, "italic"),
      magenta: /* @__PURE__ */ __name(() => magenta2, "magenta"),
      red: /* @__PURE__ */ __name(() => red2, "red"),
      reset: /* @__PURE__ */ __name(() => reset2, "reset"),
      strikethrough: /* @__PURE__ */ __name(() => strikethrough2, "strikethrough"),
      underline: /* @__PURE__ */ __name(() => underline2, "underline"),
      white: /* @__PURE__ */ __name(() => white2, "white"),
      yellow: /* @__PURE__ */ __name(() => yellow2, "yellow")
    });
    var FORCE_COLOR2;
    var NODE_DISABLE_COLORS2;
    var NO_COLOR2;
    var TERM2;
    var isTTY2 = true;
    if (typeof process !== "undefined") {
      ({ FORCE_COLOR: FORCE_COLOR2, NODE_DISABLE_COLORS: NODE_DISABLE_COLORS2, NO_COLOR: NO_COLOR2, TERM: TERM2 } = process.env || {});
      isTTY2 = process.stdout && process.stdout.isTTY;
    }
    var $2 = {
      enabled: !NODE_DISABLE_COLORS2 && NO_COLOR2 == null && TERM2 !== "dumb" && (FORCE_COLOR2 != null && FORCE_COLOR2 !== "0" || isTTY2)
    };
    function init2(x, y) {
      let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
      let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
      return function(txt) {
        if (!$2.enabled || txt == null) return txt;
        return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
      };
    }
    __name(init2, "init");
    var reset2 = init2(0, 0);
    var bold2 = init2(1, 22);
    var dim2 = init2(2, 22);
    var italic2 = init2(3, 23);
    var underline2 = init2(4, 24);
    var inverse2 = init2(7, 27);
    var hidden2 = init2(8, 28);
    var strikethrough2 = init2(9, 29);
    var black2 = init2(30, 39);
    var red2 = init2(31, 39);
    var green2 = init2(32, 39);
    var yellow2 = init2(33, 39);
    var blue2 = init2(34, 39);
    var magenta2 = init2(35, 39);
    var cyan2 = init2(36, 39);
    var white2 = init2(37, 39);
    var gray2 = init2(90, 39);
    var grey2 = init2(90, 39);
    var bgBlack2 = init2(40, 49);
    var bgRed2 = init2(41, 49);
    var bgGreen2 = init2(42, 49);
    var bgYellow2 = init2(43, 49);
    var bgBlue2 = init2(44, 49);
    var bgMagenta2 = init2(45, 49);
    var bgCyan2 = init2(46, 49);
    var bgWhite2 = init2(47, 49);
    var MAX_ARGS_HISTORY = 100;
    var COLORS = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var argsHistory = [];
    var lastTimestamp = Date.now();
    var lastColor = 0;
    var processEnv = typeof process !== "undefined" ? process.env : {};
    globalThis.DEBUG ??= processEnv.DEBUG ?? "";
    globalThis.DEBUG_COLORS ??= processEnv.DEBUG_COLORS ? processEnv.DEBUG_COLORS === "true" : true;
    var topProps = {
      enable(namespace) {
        if (typeof namespace === "string") {
          globalThis.DEBUG = namespace;
        }
      },
      disable() {
        const prev = globalThis.DEBUG;
        globalThis.DEBUG = "";
        return prev;
      },
      // this is the core logic to check if logging should happen or not
      enabled(namespace) {
        const listenedNamespaces = globalThis.DEBUG.split(",").map((s) => {
          return s.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
        });
        const isListened = listenedNamespaces.some((listenedNamespace) => {
          if (listenedNamespace === "" || listenedNamespace[0] === "-") return false;
          return namespace.match(RegExp(listenedNamespace.split("*").join(".*") + "$"));
        });
        const isExcluded = listenedNamespaces.some((listenedNamespace) => {
          if (listenedNamespace === "" || listenedNamespace[0] !== "-") return false;
          return namespace.match(RegExp(listenedNamespace.slice(1).split("*").join(".*") + "$"));
        });
        return isListened && !isExcluded;
      },
      log: /* @__PURE__ */ __name((...args) => {
        const [namespace, format, ...rest] = args;
        const logWithFormatting = console.warn ?? console.log;
        logWithFormatting(`${namespace} ${format}`, ...rest);
      }, "log"),
      formatters: {}
      // not implemented
    };
    function debugCreate(namespace) {
      const instanceProps = {
        color: COLORS[lastColor++ % COLORS.length],
        enabled: topProps.enabled(namespace),
        namespace,
        log: topProps.log,
        extend: /* @__PURE__ */ __name(() => {
        }, "extend")
        // not implemented
      };
      const debugCall = /* @__PURE__ */ __name((...args) => {
        const { enabled, namespace: namespace2, color, log: log2 } = instanceProps;
        if (args.length !== 0) {
          argsHistory.push([namespace2, ...args]);
        }
        if (argsHistory.length > MAX_ARGS_HISTORY) {
          argsHistory.shift();
        }
        if (topProps.enabled(namespace2) || enabled) {
          const stringArgs = args.map((arg) => {
            if (typeof arg === "string") {
              return arg;
            }
            return safeStringify(arg);
          });
          const ms = `+${Date.now() - lastTimestamp}ms`;
          lastTimestamp = Date.now();
          if (globalThis.DEBUG_COLORS) {
            log2(colors_exports[color](bold2(namespace2)), ...stringArgs, colors_exports[color](ms));
          } else {
            log2(namespace2, ...stringArgs, ms);
          }
        }
      }, "debugCall");
      return new Proxy(debugCall, {
        get: /* @__PURE__ */ __name((_, prop) => instanceProps[prop], "get"),
        set: /* @__PURE__ */ __name((_, prop, value) => instanceProps[prop] = value, "set")
      });
    }
    __name(debugCreate, "debugCreate");
    var Debug3 = new Proxy(debugCreate, {
      get: /* @__PURE__ */ __name((_, prop) => topProps[prop], "get"),
      set: /* @__PURE__ */ __name((_, prop, value) => topProps[prop] = value, "set")
    });
    function safeStringify(value, indent = 2) {
      const cache2 = /* @__PURE__ */ new Set();
      return JSON.stringify(
        value,
        (key, value2) => {
          if (typeof value2 === "object" && value2 !== null) {
            if (cache2.has(value2)) {
              return `[Circular *]`;
            }
            cache2.add(value2);
          } else if (typeof value2 === "bigint") {
            return value2.toString();
          }
          return value2;
        },
        indent
      );
    }
    __name(safeStringify, "safeStringify");
    function getLogs(numChars = 7500) {
      const logs = argsHistory.map(([namespace, ...args]) => {
        return `${namespace} ${args.map((arg) => {
          if (typeof arg === "string") {
            return arg;
          } else {
            return JSON.stringify(arg);
          }
        }).join(" ")}`;
      }).join("\n");
      if (logs.length < numChars) {
        return logs;
      }
      return logs.slice(-numChars);
    }
    __name(getLogs, "getLogs");
    function clearLogs() {
      argsHistory.length = 0;
    }
    __name(clearLogs, "clearLogs");
    var src_default2 = Debug3;
  }
});

// node_modules/@prisma/client/runtime/wasm.js
var require_wasm = __commonJS({
  "node_modules/@prisma/client/runtime/wasm.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var Uo = Object.create;
    var kt = Object.defineProperty;
    var qo = Object.getOwnPropertyDescriptor;
    var Bo = Object.getOwnPropertyNames;
    var $o = Object.getPrototypeOf;
    var Vo = Object.prototype.hasOwnProperty;
    var se = /* @__PURE__ */ __name((e, t) => () => (e && (t = e(e = 0)), t), "se");
    var De = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "De");
    var Mt = /* @__PURE__ */ __name((e, t) => {
      for (var r in t) kt(e, r, { get: t[r], enumerable: true });
    }, "Mt");
    var rn = /* @__PURE__ */ __name((e, t, r, n) => {
      if (t && typeof t == "object" || typeof t == "function") for (let i of Bo(t)) !Vo.call(e, i) && i !== r && kt(e, i, { get: /* @__PURE__ */ __name(() => t[i], "get"), enumerable: !(n = qo(t, i)) || n.enumerable });
      return e;
    }, "rn");
    var Fe = /* @__PURE__ */ __name((e, t, r) => (r = e != null ? Uo($o(e)) : {}, rn(t || !e || !e.__esModule ? kt(r, "default", { value: e, enumerable: true }) : r, e)), "Fe");
    var jo = /* @__PURE__ */ __name((e) => rn(kt({}, "__esModule", { value: true }), e), "jo");
    function gr(e, t) {
      if (t = t.toLowerCase(), t === "utf8" || t === "utf-8") return new y(Wo.encode(e));
      if (t === "base64" || t === "base64url") return e = e.replace(/-/g, "+").replace(/_/g, "/"), e = e.replace(/[^A-Za-z0-9+/]/g, ""), new y([...atob(e)].map((r) => r.charCodeAt(0)));
      if (t === "binary" || t === "ascii" || t === "latin1" || t === "latin-1") return new y([...e].map((r) => r.charCodeAt(0)));
      if (t === "ucs2" || t === "ucs-2" || t === "utf16le" || t === "utf-16le") {
        let r = new y(e.length * 2), n = new DataView(r.buffer);
        for (let i = 0; i < e.length; i++) n.setUint16(i * 2, e.charCodeAt(i), true);
        return r;
      }
      if (t === "hex") {
        let r = new y(e.length / 2);
        for (let n = 0, i = 0; i < e.length; i += 2, n++) r[n] = parseInt(e.slice(i, i + 2), 16);
        return r;
      }
      on(`encoding "${t}"`);
    }
    __name(gr, "gr");
    function Qo(e) {
      let r = Object.getOwnPropertyNames(DataView.prototype).filter((a) => a.startsWith("get") || a.startsWith("set")), n = r.map((a) => a.replace("get", "read").replace("set", "write")), i = /* @__PURE__ */ __name((a, u) => function(g = 0) {
        return B(g, "offset"), Y(g, "offset"), V(g, "offset", this.length - 1), new DataView(this.buffer)[r[a]](g, u);
      }, "i"), o = /* @__PURE__ */ __name((a, u) => function(g, T = 0) {
        let C = r[a].match(/set(\w+\d+)/)[1].toLowerCase(), O = Go[C];
        return B(T, "offset"), Y(T, "offset"), V(T, "offset", this.length - 1), Jo(g, "value", O[0], O[1]), new DataView(this.buffer)[r[a]](T, g, u), T + parseInt(r[a].match(/\d+/)[0]) / 8;
      }, "o"), s = /* @__PURE__ */ __name((a) => {
        a.forEach((u) => {
          u.includes("Uint") && (e[u.replace("Uint", "UInt")] = e[u]), u.includes("Float64") && (e[u.replace("Float64", "Double")] = e[u]), u.includes("Float32") && (e[u.replace("Float32", "Float")] = e[u]);
        });
      }, "s");
      n.forEach((a, u) => {
        a.startsWith("read") && (e[a] = i(u, false), e[a + "LE"] = i(u, true), e[a + "BE"] = i(u, false)), a.startsWith("write") && (e[a] = o(u, false), e[a + "LE"] = o(u, true), e[a + "BE"] = o(u, false)), s([a, a + "LE", a + "BE"]);
      });
    }
    __name(Qo, "Qo");
    function on(e) {
      throw new Error(`Buffer polyfill does not implement "${e}"`);
    }
    __name(on, "on");
    function It(e, t) {
      if (!(e instanceof Uint8Array)) throw new TypeError(`The "${t}" argument must be an instance of Buffer or Uint8Array`);
    }
    __name(It, "It");
    function V(e, t, r = zo + 1) {
      if (e < 0 || e > r) {
        let n = new RangeError(`The value of "${t}" is out of range. It must be >= 0 && <= ${r}. Received ${e}`);
        throw n.code = "ERR_OUT_OF_RANGE", n;
      }
    }
    __name(V, "V");
    function B(e, t) {
      if (typeof e != "number") {
        let r = new TypeError(`The "${t}" argument must be of type number. Received type ${typeof e}.`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(B, "B");
    function Y(e, t) {
      if (!Number.isInteger(e) || Number.isNaN(e)) {
        let r = new RangeError(`The value of "${t}" is out of range. It must be an integer. Received ${e}`);
        throw r.code = "ERR_OUT_OF_RANGE", r;
      }
    }
    __name(Y, "Y");
    function Jo(e, t, r, n) {
      if (e < r || e > n) {
        let i = new RangeError(`The value of "${t}" is out of range. It must be >= ${r} and <= ${n}. Received ${e}`);
        throw i.code = "ERR_OUT_OF_RANGE", i;
      }
    }
    __name(Jo, "Jo");
    function nn(e, t) {
      if (typeof e != "string") {
        let r = new TypeError(`The "${t}" argument must be of type string. Received type ${typeof e}`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(nn, "nn");
    function Yo(e, t = "utf8") {
      return y.from(e, t);
    }
    __name(Yo, "Yo");
    var y;
    var Go;
    var Wo;
    var Ko;
    var Ho;
    var zo;
    var b;
    var hr;
    var c2 = se(() => {
      "use strict";
      y = class e extends Uint8Array {
        static {
          __name(this, "e");
        }
        constructor() {
          super(...arguments);
          this._isBuffer = true;
        }
        get offset() {
          return this.byteOffset;
        }
        static alloc(r, n = 0, i = "utf8") {
          return nn(i, "encoding"), e.allocUnsafe(r).fill(n, i);
        }
        static allocUnsafe(r) {
          return e.from(r);
        }
        static allocUnsafeSlow(r) {
          return e.from(r);
        }
        static isBuffer(r) {
          return r && !!r._isBuffer;
        }
        static byteLength(r, n = "utf8") {
          if (typeof r == "string") return gr(r, n).byteLength;
          if (r && r.byteLength) return r.byteLength;
          let i = new TypeError('The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.');
          throw i.code = "ERR_INVALID_ARG_TYPE", i;
        }
        static isEncoding(r) {
          return Ho.includes(r);
        }
        static compare(r, n) {
          It(r, "buff1"), It(n, "buff2");
          for (let i = 0; i < r.length; i++) {
            if (r[i] < n[i]) return -1;
            if (r[i] > n[i]) return 1;
          }
          return r.length === n.length ? 0 : r.length > n.length ? 1 : -1;
        }
        static from(r, n = "utf8") {
          if (r && typeof r == "object" && r.type === "Buffer") return new e(r.data);
          if (typeof r == "number") return new e(new Uint8Array(r));
          if (typeof r == "string") return gr(r, n);
          if (ArrayBuffer.isView(r)) {
            let { byteOffset: i, byteLength: o, buffer: s } = r;
            return "map" in r && typeof r.map == "function" ? new e(r.map((a) => a % 256), i, o) : new e(s, i, o);
          }
          if (r && typeof r == "object" && ("length" in r || "byteLength" in r || "buffer" in r)) return new e(r);
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }
        static concat(r, n) {
          if (r.length === 0) return e.alloc(0);
          let i = [].concat(...r.map((s) => [...s])), o = e.alloc(n !== void 0 ? n : i.length);
          return o.set(n !== void 0 ? i.slice(0, n) : i), o;
        }
        slice(r = 0, n = this.length) {
          return this.subarray(r, n);
        }
        subarray(r = 0, n = this.length) {
          return Object.setPrototypeOf(super.subarray(r, n), e.prototype);
        }
        reverse() {
          return super.reverse(), this;
        }
        readIntBE(r, n) {
          B(r, "offset"), Y(r, "offset"), V(r, "offset", this.length - 1), B(n, "byteLength"), Y(n, "byteLength");
          let i = new DataView(this.buffer, r, n), o = 0;
          for (let s = 0; s < n; s++) o = o * 256 + i.getUint8(s);
          return i.getUint8(0) & 128 && (o -= Math.pow(256, n)), o;
        }
        readIntLE(r, n) {
          B(r, "offset"), Y(r, "offset"), V(r, "offset", this.length - 1), B(n, "byteLength"), Y(n, "byteLength");
          let i = new DataView(this.buffer, r, n), o = 0;
          for (let s = 0; s < n; s++) o += i.getUint8(s) * Math.pow(256, s);
          return i.getUint8(n - 1) & 128 && (o -= Math.pow(256, n)), o;
        }
        readUIntBE(r, n) {
          B(r, "offset"), Y(r, "offset"), V(r, "offset", this.length - 1), B(n, "byteLength"), Y(n, "byteLength");
          let i = new DataView(this.buffer, r, n), o = 0;
          for (let s = 0; s < n; s++) o = o * 256 + i.getUint8(s);
          return o;
        }
        readUintBE(r, n) {
          return this.readUIntBE(r, n);
        }
        readUIntLE(r, n) {
          B(r, "offset"), Y(r, "offset"), V(r, "offset", this.length - 1), B(n, "byteLength"), Y(n, "byteLength");
          let i = new DataView(this.buffer, r, n), o = 0;
          for (let s = 0; s < n; s++) o += i.getUint8(s) * Math.pow(256, s);
          return o;
        }
        readUintLE(r, n) {
          return this.readUIntLE(r, n);
        }
        writeIntBE(r, n, i) {
          return r = r < 0 ? r + Math.pow(256, i) : r, this.writeUIntBE(r, n, i);
        }
        writeIntLE(r, n, i) {
          return r = r < 0 ? r + Math.pow(256, i) : r, this.writeUIntLE(r, n, i);
        }
        writeUIntBE(r, n, i) {
          B(n, "offset"), Y(n, "offset"), V(n, "offset", this.length - 1), B(i, "byteLength"), Y(i, "byteLength");
          let o = new DataView(this.buffer, n, i);
          for (let s = i - 1; s >= 0; s--) o.setUint8(s, r & 255), r = r / 256;
          return n + i;
        }
        writeUintBE(r, n, i) {
          return this.writeUIntBE(r, n, i);
        }
        writeUIntLE(r, n, i) {
          B(n, "offset"), Y(n, "offset"), V(n, "offset", this.length - 1), B(i, "byteLength"), Y(i, "byteLength");
          let o = new DataView(this.buffer, n, i);
          for (let s = 0; s < i; s++) o.setUint8(s, r & 255), r = r / 256;
          return n + i;
        }
        writeUintLE(r, n, i) {
          return this.writeUIntLE(r, n, i);
        }
        toJSON() {
          return { type: "Buffer", data: Array.from(this) };
        }
        swap16() {
          let r = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let n = 0; n < this.length; n += 2) r.setUint16(n, r.getUint16(n, true), false);
          return this;
        }
        swap32() {
          let r = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let n = 0; n < this.length; n += 4) r.setUint32(n, r.getUint32(n, true), false);
          return this;
        }
        swap64() {
          let r = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let n = 0; n < this.length; n += 8) r.setBigUint64(n, r.getBigUint64(n, true), false);
          return this;
        }
        compare(r, n = 0, i = r.length, o = 0, s = this.length) {
          return It(r, "target"), B(n, "targetStart"), B(i, "targetEnd"), B(o, "sourceStart"), B(s, "sourceEnd"), V(n, "targetStart"), V(i, "targetEnd", r.length), V(o, "sourceStart"), V(s, "sourceEnd", this.length), e.compare(this.slice(o, s), r.slice(n, i));
        }
        equals(r) {
          return It(r, "otherBuffer"), this.length === r.length && this.every((n, i) => n === r[i]);
        }
        copy(r, n = 0, i = 0, o = this.length) {
          V(n, "targetStart"), V(i, "sourceStart", this.length), V(o, "sourceEnd"), n >>>= 0, i >>>= 0, o >>>= 0;
          let s = 0;
          for (; i < o && !(this[i] === void 0 || r[n] === void 0); ) r[n] = this[i], s++, i++, n++;
          return s;
        }
        write(r, n, i, o = "utf8") {
          let s = typeof n == "string" ? 0 : n ?? 0, a = typeof i == "string" ? this.length - s : i ?? this.length - s;
          return o = typeof n == "string" ? n : typeof i == "string" ? i : o, B(s, "offset"), B(a, "length"), V(s, "offset", this.length), V(a, "length", this.length), (o === "ucs2" || o === "ucs-2" || o === "utf16le" || o === "utf-16le") && (a = a - a % 2), gr(r, o).copy(this, s, 0, a);
        }
        fill(r = 0, n = 0, i = this.length, o = "utf-8") {
          let s = typeof n == "string" ? 0 : n, a = typeof i == "string" ? this.length : i;
          if (o = typeof n == "string" ? n : typeof i == "string" ? i : o, r = e.from(typeof r == "number" ? [r] : r ?? [], o), nn(o, "encoding"), V(s, "offset", this.length), V(a, "end", this.length), r.length !== 0) for (let u = s; u < a; u += r.length) super.set(r.slice(0, r.length + u >= this.length ? this.length - u : r.length), u);
          return this;
        }
        includes(r, n = null, i = "utf-8") {
          return this.indexOf(r, n, i) !== -1;
        }
        lastIndexOf(r, n = null, i = "utf-8") {
          return this.indexOf(r, n, i, true);
        }
        indexOf(r, n = null, i = "utf-8", o = false) {
          let s = o ? this.findLastIndex.bind(this) : this.findIndex.bind(this);
          i = typeof n == "string" ? n : i;
          let a = e.from(typeof r == "number" ? [r] : r, i), u = typeof n == "string" ? 0 : n;
          return u = typeof n == "number" ? u : null, u = Number.isNaN(u) ? null : u, u ??= o ? this.length : 0, u = u < 0 ? this.length + u : u, a.length === 0 && o === false ? u >= this.length ? this.length : u : a.length === 0 && o === true ? (u >= this.length ? this.length : u) || this.length : s((g, T) => (o ? T <= u : T >= u) && this[T] === a[0] && a.every((O, A) => this[T + A] === O));
        }
        toString(r = "utf8", n = 0, i = this.length) {
          if (n = n < 0 ? 0 : n, r = r.toString().toLowerCase(), i <= 0) return "";
          if (r === "utf8" || r === "utf-8") return Ko.decode(this.slice(n, i));
          if (r === "base64" || r === "base64url") {
            let o = btoa(this.reduce((s, a) => s + hr(a), ""));
            return r === "base64url" ? o.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : o;
          }
          if (r === "binary" || r === "ascii" || r === "latin1" || r === "latin-1") return this.slice(n, i).reduce((o, s) => o + hr(s & (r === "ascii" ? 127 : 255)), "");
          if (r === "ucs2" || r === "ucs-2" || r === "utf16le" || r === "utf-16le") {
            let o = new DataView(this.buffer.slice(n, i));
            return Array.from({ length: o.byteLength / 2 }, (s, a) => a * 2 + 1 < o.byteLength ? hr(o.getUint16(a * 2, true)) : "").join("");
          }
          if (r === "hex") return this.slice(n, i).reduce((o, s) => o + s.toString(16).padStart(2, "0"), "");
          on(`encoding "${r}"`);
        }
        toLocaleString() {
          return this.toString();
        }
        inspect() {
          return `<Buffer ${this.toString("hex").match(/.{1,2}/g).join(" ")}>`;
        }
      };
      Go = { int8: [-128, 127], int16: [-32768, 32767], int32: [-2147483648, 2147483647], uint8: [0, 255], uint16: [0, 65535], uint32: [0, 4294967295], float32: [-1 / 0, 1 / 0], float64: [-1 / 0, 1 / 0], bigint64: [-0x8000000000000000n, 0x7fffffffffffffffn], biguint64: [0n, 0xffffffffffffffffn] }, Wo = new TextEncoder(), Ko = new TextDecoder(), Ho = ["utf8", "utf-8", "hex", "base64", "ascii", "binary", "base64url", "ucs2", "ucs-2", "utf16le", "utf-16le", "latin1", "latin-1"], zo = 4294967295;
      Qo(y.prototype);
      b = new Proxy(Yo, { construct(e, [t, r]) {
        return y.from(t, r);
      }, get(e, t) {
        return y[t];
      } }), hr = String.fromCodePoint;
    });
    var h;
    var m = se(() => {
      "use strict";
      h = { nextTick: /* @__PURE__ */ __name((e, ...t) => {
        setTimeout(() => {
          e(...t);
        }, 0);
      }, "nextTick"), env: {}, version: "", cwd: /* @__PURE__ */ __name(() => "/", "cwd"), stderr: {}, argv: ["/bin/node"] };
    });
    var x;
    var p = se(() => {
      "use strict";
      x = globalThis.performance ?? (() => {
        let e = Date.now();
        return { now: /* @__PURE__ */ __name(() => Date.now() - e, "now") };
      })();
    });
    var E;
    var d = se(() => {
      "use strict";
      E = /* @__PURE__ */ __name(() => {
      }, "E");
      E.prototype = E;
    });
    var w;
    var f = se(() => {
      "use strict";
      w = class {
        static {
          __name(this, "w");
        }
        constructor(t) {
          this.value = t;
        }
        deref() {
          return this.value;
        }
      };
    });
    function un(e, t) {
      var r, n, i, o, s, a, u, g, T = e.constructor, C = T.precision;
      if (!e.s || !t.s) return t.s || (t = new T(e)), U ? D(t, C) : t;
      if (u = e.d, g = t.d, s = e.e, i = t.e, u = u.slice(), o = s - i, o) {
        for (o < 0 ? (n = u, o = -o, a = g.length) : (n = g, i = s, a = u.length), s = Math.ceil(C / N), a = s > a ? s + 1 : a + 1, o > a && (o = a, n.length = 1), n.reverse(); o--; ) n.push(0);
        n.reverse();
      }
      for (a = u.length, o = g.length, a - o < 0 && (o = a, n = g, g = u, u = n), r = 0; o; ) r = (u[--o] = u[o] + g[o] + r) / Q | 0, u[o] %= Q;
      for (r && (u.unshift(r), ++i), a = u.length; u[--a] == 0; ) u.pop();
      return t.d = u, t.e = i, U ? D(t, C) : t;
    }
    __name(un, "un");
    function le(e, t, r) {
      if (e !== ~~e || e < t || e > r) throw Error(Oe + e);
    }
    __name(le, "le");
    function ae(e) {
      var t, r, n, i = e.length - 1, o = "", s = e[0];
      if (i > 0) {
        for (o += s, t = 1; t < i; t++) n = e[t] + "", r = N - n.length, r && (o += Pe(r)), o += n;
        s = e[t], n = s + "", r = N - n.length, r && (o += Pe(r));
      } else if (s === 0) return "0";
      for (; s % 10 === 0; ) s /= 10;
      return o + s;
    }
    __name(ae, "ae");
    function cn(e, t) {
      var r, n, i, o, s, a, u = 0, g = 0, T = e.constructor, C = T.precision;
      if ($2(e) > 16) throw Error(br + $2(e));
      if (!e.s) return new T(Z);
      for (t == null ? (U = false, a = C) : a = t, s = new T(0.03125); e.abs().gte(0.1); ) e = e.times(s), g += 5;
      for (n = Math.log(Se(2, g)) / Math.LN10 * 2 + 5 | 0, a += n, r = i = o = new T(Z), T.precision = a; ; ) {
        if (i = D(i.times(e), a), r = r.times(++u), s = o.plus(ye(i, r, a)), ae(s.d).slice(0, a) === ae(o.d).slice(0, a)) {
          for (; g--; ) o = D(o.times(o), a);
          return T.precision = C, t == null ? (U = true, D(o, C)) : o;
        }
        o = s;
      }
    }
    __name(cn, "cn");
    function $2(e) {
      for (var t = e.e * N, r = e.d[0]; r >= 10; r /= 10) t++;
      return t;
    }
    __name($2, "$");
    function yr(e, t, r) {
      if (t > e.LN10.sd()) throw U = true, r && (e.precision = r), Error(re + "LN10 precision limit exceeded");
      return D(new e(e.LN10), t);
    }
    __name(yr, "yr");
    function Pe(e) {
      for (var t = ""; e--; ) t += "0";
      return t;
    }
    __name(Pe, "Pe");
    function it(e, t) {
      var r, n, i, o, s, a, u, g, T, C = 1, O = 10, A = e, M = A.d, S = A.constructor, I = S.precision;
      if (A.s < 1) throw Error(re + (A.s ? "NaN" : "-Infinity"));
      if (A.eq(Z)) return new S(0);
      if (t == null ? (U = false, g = I) : g = t, A.eq(10)) return t == null && (U = true), yr(S, g);
      if (g += O, S.precision = g, r = ae(M), n = r.charAt(0), o = $2(A), Math.abs(o) < 15e14) {
        for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; ) A = A.times(e), r = ae(A.d), n = r.charAt(0), C++;
        o = $2(A), n > 1 ? (A = new S("0." + r), o++) : A = new S(n + "." + r.slice(1));
      } else return u = yr(S, g + 2, I).times(o + ""), A = it(new S(n + "." + r.slice(1)), g - O).plus(u), S.precision = I, t == null ? (U = true, D(A, I)) : A;
      for (a = s = A = ye(A.minus(Z), A.plus(Z), g), T = D(A.times(A), g), i = 3; ; ) {
        if (s = D(s.times(T), g), u = a.plus(ye(s, new S(i), g)), ae(u.d).slice(0, g) === ae(a.d).slice(0, g)) return a = a.times(2), o !== 0 && (a = a.plus(yr(S, g + 2, I).times(o + ""))), a = ye(a, new S(C), g), S.precision = I, t == null ? (U = true, D(a, I)) : a;
        a = u, i += 2;
      }
    }
    __name(it, "it");
    function sn(e, t) {
      var r, n, i;
      for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
      for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
      if (t = t.slice(n, i), t) {
        if (i -= n, r = r - n - 1, e.e = Ue(r / N), e.d = [], n = (r + 1) % N, r < 0 && (n += N), n < i) {
          for (n && e.d.push(+t.slice(0, n)), i -= N; n < i; ) e.d.push(+t.slice(n, n += N));
          t = t.slice(n), n = N - t.length;
        } else n -= i;
        for (; n--; ) t += "0";
        if (e.d.push(+t), U && (e.e > Lt || e.e < -Lt)) throw Error(br + r);
      } else e.s = 0, e.e = 0, e.d = [0];
      return e;
    }
    __name(sn, "sn");
    function D(e, t, r) {
      var n, i, o, s, a, u, g, T, C = e.d;
      for (s = 1, o = C[0]; o >= 10; o /= 10) s++;
      if (n = t - s, n < 0) n += N, i = t, g = C[T = 0];
      else {
        if (T = Math.ceil((n + 1) / N), o = C.length, T >= o) return e;
        for (g = o = C[T], s = 1; o >= 10; o /= 10) s++;
        n %= N, i = n - N + s;
      }
      if (r !== void 0 && (o = Se(10, s - i - 1), a = g / o % 10 | 0, u = t < 0 || C[T + 1] !== void 0 || g % o, u = r < 4 ? (a || u) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : a > 5 || a == 5 && (r == 4 || u || r == 6 && (n > 0 ? i > 0 ? g / Se(10, s - i) : 0 : C[T - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !C[0]) return u ? (o = $2(e), C.length = 1, t = t - o - 1, C[0] = Se(10, (N - t % N) % N), e.e = Ue(-t / N) || 0) : (C.length = 1, C[0] = e.e = e.s = 0), e;
      if (n == 0 ? (C.length = T, o = 1, T--) : (C.length = T + 1, o = Se(10, N - n), C[T] = i > 0 ? (g / Se(10, s - i) % Se(10, i) | 0) * o : 0), u) for (; ; ) if (T == 0) {
        (C[0] += o) == Q && (C[0] = 1, ++e.e);
        break;
      } else {
        if (C[T] += o, C[T] != Q) break;
        C[T--] = 0, o = 1;
      }
      for (n = C.length; C[--n] === 0; ) C.pop();
      if (U && (e.e > Lt || e.e < -Lt)) throw Error(br + $2(e));
      return e;
    }
    __name(D, "D");
    function mn(e, t) {
      var r, n, i, o, s, a, u, g, T, C, O = e.constructor, A = O.precision;
      if (!e.s || !t.s) return t.s ? t.s = -t.s : t = new O(e), U ? D(t, A) : t;
      if (u = e.d, C = t.d, n = t.e, g = e.e, u = u.slice(), s = g - n, s) {
        for (T = s < 0, T ? (r = u, s = -s, a = C.length) : (r = C, n = g, a = u.length), i = Math.max(Math.ceil(A / N), a) + 2, s > i && (s = i, r.length = 1), r.reverse(), i = s; i--; ) r.push(0);
        r.reverse();
      } else {
        for (i = u.length, a = C.length, T = i < a, T && (a = i), i = 0; i < a; i++) if (u[i] != C[i]) {
          T = u[i] < C[i];
          break;
        }
        s = 0;
      }
      for (T && (r = u, u = C, C = r, t.s = -t.s), a = u.length, i = C.length - a; i > 0; --i) u[a++] = 0;
      for (i = C.length; i > s; ) {
        if (u[--i] < C[i]) {
          for (o = i; o && u[--o] === 0; ) u[o] = Q - 1;
          --u[o], u[i] += Q;
        }
        u[i] -= C[i];
      }
      for (; u[--a] === 0; ) u.pop();
      for (; u[0] === 0; u.shift()) --n;
      return u[0] ? (t.d = u, t.e = n, U ? D(t, A) : t) : new O(0);
    }
    __name(mn, "mn");
    function ke(e, t, r) {
      var n, i = $2(e), o = ae(e.d), s = o.length;
      return t ? (r && (n = r - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + Pe(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (i < 0 ? "e" : "e+") + i) : i < 0 ? (o = "0." + Pe(-i - 1) + o, r && (n = r - s) > 0 && (o += Pe(n))) : i >= s ? (o += Pe(i + 1 - s), r && (n = r - i - 1) > 0 && (o = o + "." + Pe(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), r && (n = r - s) > 0 && (i + 1 === s && (o += "."), o += Pe(n))), e.s < 0 ? "-" + o : o;
    }
    __name(ke, "ke");
    function an(e, t) {
      if (e.length > t) return e.length = t, true;
    }
    __name(an, "an");
    function pn(e) {
      var t, r, n;
      function i(o) {
        var s = this;
        if (!(s instanceof i)) return new i(o);
        if (s.constructor = i, o instanceof i) {
          s.s = o.s, s.e = o.e, s.d = (o = o.d) ? o.slice() : o;
          return;
        }
        if (typeof o == "number") {
          if (o * 0 !== 0) throw Error(Oe + o);
          if (o > 0) s.s = 1;
          else if (o < 0) o = -o, s.s = -1;
          else {
            s.s = 0, s.e = 0, s.d = [0];
            return;
          }
          if (o === ~~o && o < 1e7) {
            s.e = 0, s.d = [o];
            return;
          }
          return sn(s, o.toString());
        } else if (typeof o != "string") throw Error(Oe + o);
        if (o.charCodeAt(0) === 45 ? (o = o.slice(1), s.s = -1) : s.s = 1, Zo.test(o)) sn(s, o);
        else throw Error(Oe + o);
      }
      __name(i, "i");
      if (i.prototype = R, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = pn, i.config = i.set = es, e === void 0 && (e = {}), e) for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
      return i.config(e), i;
    }
    __name(pn, "pn");
    function es(e) {
      if (!e || typeof e != "object") throw Error(re + "Object expected");
      var t, r, n, i = ["precision", 1, Ne, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
      for (t = 0; t < i.length; t += 3) if ((n = e[r = i[t]]) !== void 0) if (Ue(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
      else throw Error(Oe + r + ": " + n);
      if ((n = e[r = "LN10"]) !== void 0) if (n == Math.LN10) this[r] = new this(n);
      else throw Error(Oe + r + ": " + n);
      return this;
    }
    __name(es, "es");
    var Ne;
    var Xo;
    var wr;
    var U;
    var re;
    var Oe;
    var br;
    var Ue;
    var Se;
    var Zo;
    var Z;
    var Q;
    var N;
    var ln;
    var Lt;
    var R;
    var ye;
    var wr;
    var _t;
    var dn = se(() => {
      "use strict";
      c2();
      m();
      p();
      d();
      f();
      l();
      Ne = 1e9, Xo = { precision: 20, rounding: 4, toExpNeg: -7, toExpPos: 21, LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286" }, U = true, re = "[DecimalError] ", Oe = re + "Invalid argument: ", br = re + "Exponent out of range: ", Ue = Math.floor, Se = Math.pow, Zo = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Q = 1e7, N = 7, ln = 9007199254740991, Lt = Ue(ln / N), R = {};
      R.absoluteValue = R.abs = function() {
        var e = new this.constructor(this);
        return e.s && (e.s = 1), e;
      };
      R.comparedTo = R.cmp = function(e) {
        var t, r, n, i, o = this;
        if (e = new o.constructor(e), o.s !== e.s) return o.s || -e.s;
        if (o.e !== e.e) return o.e > e.e ^ o.s < 0 ? 1 : -1;
        for (n = o.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t) if (o.d[t] !== e.d[t]) return o.d[t] > e.d[t] ^ o.s < 0 ? 1 : -1;
        return n === i ? 0 : n > i ^ o.s < 0 ? 1 : -1;
      };
      R.decimalPlaces = R.dp = function() {
        var e = this, t = e.d.length - 1, r = (t - e.e) * N;
        if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) r--;
        return r < 0 ? 0 : r;
      };
      R.dividedBy = R.div = function(e) {
        return ye(this, new this.constructor(e));
      };
      R.dividedToIntegerBy = R.idiv = function(e) {
        var t = this, r = t.constructor;
        return D(ye(t, new r(e), 0, 1), r.precision);
      };
      R.equals = R.eq = function(e) {
        return !this.cmp(e);
      };
      R.exponent = function() {
        return $2(this);
      };
      R.greaterThan = R.gt = function(e) {
        return this.cmp(e) > 0;
      };
      R.greaterThanOrEqualTo = R.gte = function(e) {
        return this.cmp(e) >= 0;
      };
      R.isInteger = R.isint = function() {
        return this.e > this.d.length - 2;
      };
      R.isNegative = R.isneg = function() {
        return this.s < 0;
      };
      R.isPositive = R.ispos = function() {
        return this.s > 0;
      };
      R.isZero = function() {
        return this.s === 0;
      };
      R.lessThan = R.lt = function(e) {
        return this.cmp(e) < 0;
      };
      R.lessThanOrEqualTo = R.lte = function(e) {
        return this.cmp(e) < 1;
      };
      R.logarithm = R.log = function(e) {
        var t, r = this, n = r.constructor, i = n.precision, o = i + 5;
        if (e === void 0) e = new n(10);
        else if (e = new n(e), e.s < 1 || e.eq(Z)) throw Error(re + "NaN");
        if (r.s < 1) throw Error(re + (r.s ? "NaN" : "-Infinity"));
        return r.eq(Z) ? new n(0) : (U = false, t = ye(it(r, o), it(e, o), o), U = true, D(t, i));
      };
      R.minus = R.sub = function(e) {
        var t = this;
        return e = new t.constructor(e), t.s == e.s ? mn(t, e) : un(t, (e.s = -e.s, e));
      };
      R.modulo = R.mod = function(e) {
        var t, r = this, n = r.constructor, i = n.precision;
        if (e = new n(e), !e.s) throw Error(re + "NaN");
        return r.s ? (U = false, t = ye(r, e, 0, 1).times(e), U = true, r.minus(t)) : D(new n(r), i);
      };
      R.naturalExponential = R.exp = function() {
        return cn(this);
      };
      R.naturalLogarithm = R.ln = function() {
        return it(this);
      };
      R.negated = R.neg = function() {
        var e = new this.constructor(this);
        return e.s = -e.s || 0, e;
      };
      R.plus = R.add = function(e) {
        var t = this;
        return e = new t.constructor(e), t.s == e.s ? un(t, e) : mn(t, (e.s = -e.s, e));
      };
      R.precision = R.sd = function(e) {
        var t, r, n, i = this;
        if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Oe + e);
        if (t = $2(i) + 1, n = i.d.length - 1, r = n * N + 1, n = i.d[n], n) {
          for (; n % 10 == 0; n /= 10) r--;
          for (n = i.d[0]; n >= 10; n /= 10) r++;
        }
        return e && t > r ? t : r;
      };
      R.squareRoot = R.sqrt = function() {
        var e, t, r, n, i, o, s, a = this, u = a.constructor;
        if (a.s < 1) {
          if (!a.s) return new u(0);
          throw Error(re + "NaN");
        }
        for (e = $2(a), U = false, i = Math.sqrt(+a), i == 0 || i == 1 / 0 ? (t = ae(a.d), (t.length + e) % 2 == 0 && (t += "0"), i = Math.sqrt(t), e = Ue((e + 1) / 2) - (e < 0 || e % 2), i == 1 / 0 ? t = "5e" + e : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new u(t)) : n = new u(i.toString()), r = u.precision, i = s = r + 3; ; ) if (o = n, n = o.plus(ye(a, o, s + 2)).times(0.5), ae(o.d).slice(0, s) === (t = ae(n.d)).slice(0, s)) {
          if (t = t.slice(s - 3, s + 1), i == s && t == "4999") {
            if (D(o, r + 1, 0), o.times(o).eq(a)) {
              n = o;
              break;
            }
          } else if (t != "9999") break;
          s += 4;
        }
        return U = true, D(n, r);
      };
      R.times = R.mul = function(e) {
        var t, r, n, i, o, s, a, u, g, T = this, C = T.constructor, O = T.d, A = (e = new C(e)).d;
        if (!T.s || !e.s) return new C(0);
        for (e.s *= T.s, r = T.e + e.e, u = O.length, g = A.length, u < g && (o = O, O = A, A = o, s = u, u = g, g = s), o = [], s = u + g, n = s; n--; ) o.push(0);
        for (n = g; --n >= 0; ) {
          for (t = 0, i = u + n; i > n; ) a = o[i] + A[n] * O[i - n - 1] + t, o[i--] = a % Q | 0, t = a / Q | 0;
          o[i] = (o[i] + t) % Q | 0;
        }
        for (; !o[--s]; ) o.pop();
        return t ? ++r : o.shift(), e.d = o, e.e = r, U ? D(e, C.precision) : e;
      };
      R.toDecimalPlaces = R.todp = function(e, t) {
        var r = this, n = r.constructor;
        return r = new n(r), e === void 0 ? r : (le(e, 0, Ne), t === void 0 ? t = n.rounding : le(t, 0, 8), D(r, e + $2(r) + 1, t));
      };
      R.toExponential = function(e, t) {
        var r, n = this, i = n.constructor;
        return e === void 0 ? r = ke(n, true) : (le(e, 0, Ne), t === void 0 ? t = i.rounding : le(t, 0, 8), n = D(new i(n), e + 1, t), r = ke(n, true, e + 1)), r;
      };
      R.toFixed = function(e, t) {
        var r, n, i = this, o = i.constructor;
        return e === void 0 ? ke(i) : (le(e, 0, Ne), t === void 0 ? t = o.rounding : le(t, 0, 8), n = D(new o(i), e + $2(i) + 1, t), r = ke(n.abs(), false, e + $2(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
      };
      R.toInteger = R.toint = function() {
        var e = this, t = e.constructor;
        return D(new t(e), $2(e) + 1, t.rounding);
      };
      R.toNumber = function() {
        return +this;
      };
      R.toPower = R.pow = function(e) {
        var t, r, n, i, o, s, a = this, u = a.constructor, g = 12, T = +(e = new u(e));
        if (!e.s) return new u(Z);
        if (a = new u(a), !a.s) {
          if (e.s < 1) throw Error(re + "Infinity");
          return a;
        }
        if (a.eq(Z)) return a;
        if (n = u.precision, e.eq(Z)) return D(a, n);
        if (t = e.e, r = e.d.length - 1, s = t >= r, o = a.s, s) {
          if ((r = T < 0 ? -T : T) <= ln) {
            for (i = new u(Z), t = Math.ceil(n / N + 4), U = false; r % 2 && (i = i.times(a), an(i.d, t)), r = Ue(r / 2), r !== 0; ) a = a.times(a), an(a.d, t);
            return U = true, e.s < 0 ? new u(Z).div(i) : D(i, n);
          }
        } else if (o < 0) throw Error(re + "NaN");
        return o = o < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, a.s = 1, U = false, i = e.times(it(a, n + g)), U = true, i = cn(i), i.s = o, i;
      };
      R.toPrecision = function(e, t) {
        var r, n, i = this, o = i.constructor;
        return e === void 0 ? (r = $2(i), n = ke(i, r <= o.toExpNeg || r >= o.toExpPos)) : (le(e, 1, Ne), t === void 0 ? t = o.rounding : le(t, 0, 8), i = D(new o(i), e, t), r = $2(i), n = ke(i, e <= r || r <= o.toExpNeg, e)), n;
      };
      R.toSignificantDigits = R.tosd = function(e, t) {
        var r = this, n = r.constructor;
        return e === void 0 ? (e = n.precision, t = n.rounding) : (le(e, 1, Ne), t === void 0 ? t = n.rounding : le(t, 0, 8)), D(new n(r), e, t);
      };
      R.toString = R.valueOf = R.val = R.toJSON = R[Symbol.for("nodejs.util.inspect.custom")] = function() {
        var e = this, t = $2(e), r = e.constructor;
        return ke(e, t <= r.toExpNeg || t >= r.toExpPos);
      };
      ye = /* @__PURE__ */ function() {
        function e(n, i) {
          var o, s = 0, a = n.length;
          for (n = n.slice(); a--; ) o = n[a] * i + s, n[a] = o % Q | 0, s = o / Q | 0;
          return s && n.unshift(s), n;
        }
        __name(e, "e");
        function t(n, i, o, s) {
          var a, u;
          if (o != s) u = o > s ? 1 : -1;
          else for (a = u = 0; a < o; a++) if (n[a] != i[a]) {
            u = n[a] > i[a] ? 1 : -1;
            break;
          }
          return u;
        }
        __name(t, "t");
        function r(n, i, o) {
          for (var s = 0; o--; ) n[o] -= s, s = n[o] < i[o] ? 1 : 0, n[o] = s * Q + n[o] - i[o];
          for (; !n[0] && n.length > 1; ) n.shift();
        }
        __name(r, "r");
        return function(n, i, o, s) {
          var a, u, g, T, C, O, A, M, S, I, ne, z, _e, k, Ae, fr, ie, St, Ot = n.constructor, No = n.s == i.s ? 1 : -1, oe = n.d, q = i.d;
          if (!n.s) return new Ot(n);
          if (!i.s) throw Error(re + "Division by zero");
          for (u = n.e - i.e, ie = q.length, Ae = oe.length, A = new Ot(No), M = A.d = [], g = 0; q[g] == (oe[g] || 0); ) ++g;
          if (q[g] > (oe[g] || 0) && --u, o == null ? z = o = Ot.precision : s ? z = o + ($2(n) - $2(i)) + 1 : z = o, z < 0) return new Ot(0);
          if (z = z / N + 2 | 0, g = 0, ie == 1) for (T = 0, q = q[0], z++; (g < Ae || T) && z--; g++) _e = T * Q + (oe[g] || 0), M[g] = _e / q | 0, T = _e % q | 0;
          else {
            for (T = Q / (q[0] + 1) | 0, T > 1 && (q = e(q, T), oe = e(oe, T), ie = q.length, Ae = oe.length), k = ie, S = oe.slice(0, ie), I = S.length; I < ie; ) S[I++] = 0;
            St = q.slice(), St.unshift(0), fr = q[0], q[1] >= Q / 2 && ++fr;
            do
              T = 0, a = t(q, S, ie, I), a < 0 ? (ne = S[0], ie != I && (ne = ne * Q + (S[1] || 0)), T = ne / fr | 0, T > 1 ? (T >= Q && (T = Q - 1), C = e(q, T), O = C.length, I = S.length, a = t(C, S, O, I), a == 1 && (T--, r(C, ie < O ? St : q, O))) : (T == 0 && (a = T = 1), C = q.slice()), O = C.length, O < I && C.unshift(0), r(S, C, I), a == -1 && (I = S.length, a = t(q, S, ie, I), a < 1 && (T++, r(S, ie < I ? St : q, I))), I = S.length) : a === 0 && (T++, S = [0]), M[g++] = T, a && S[0] ? S[I++] = oe[k] || 0 : (S = [oe[k]], I = 1);
            while ((k++ < Ae || S[0] !== void 0) && z--);
          }
          return M[0] || M.shift(), A.e = u, D(A, s ? o + $2(A) + 1 : o);
        };
      }();
      wr = pn(Xo);
      Z = new wr(1);
      _t = wr;
    });
    var v;
    var ue;
    var l = se(() => {
      "use strict";
      dn();
      v = class extends _t {
        static {
          __name(this, "v");
        }
        static isDecimal(t) {
          return t instanceof _t;
        }
        static random(t = 20) {
          {
            let n = crypto.getRandomValues(new Uint8Array(t)).reduce((i, o) => i + o, "");
            return new _t(`0.${n.slice(0, t)}`);
          }
        }
      }, ue = v;
    });
    function ts() {
      return false;
    }
    __name(ts, "ts");
    var rs;
    var ns;
    var yn;
    var bn = se(() => {
      "use strict";
      c2();
      m();
      p();
      d();
      f();
      l();
      rs = {}, ns = { existsSync: ts, promises: rs }, yn = ns;
    });
    function us(...e) {
      return e.join("/");
    }
    __name(us, "us");
    function cs(...e) {
      return e.join("/");
    }
    __name(cs, "cs");
    var In;
    var ms;
    var ps;
    var st;
    var Ln = se(() => {
      "use strict";
      c2();
      m();
      p();
      d();
      f();
      l();
      In = "/", ms = { sep: In }, ps = { resolve: us, posix: ms, join: cs, sep: In }, st = ps;
    });
    var Ut;
    var Dn = se(() => {
      "use strict";
      c2();
      m();
      p();
      d();
      f();
      l();
      Ut = class {
        static {
          __name(this, "Ut");
        }
        constructor() {
          this.events = {};
        }
        on(t, r) {
          return this.events[t] || (this.events[t] = []), this.events[t].push(r), this;
        }
        emit(t, ...r) {
          return this.events[t] ? (this.events[t].forEach((n) => {
            n(...r);
          }), true) : false;
        }
      };
    });
    var Nn = De((Wc, Fn) => {
      "use strict";
      c2();
      m();
      p();
      d();
      f();
      l();
      Fn.exports = (e, t = 1, r) => {
        if (r = { indent: " ", includeEmptyLines: false, ...r }, typeof e != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e}\``);
        if (typeof t != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t}\``);
        if (typeof r.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
        if (t === 0) return e;
        let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return e.replace(n, r.indent.repeat(t));
      };
    });
    var Bn = De((am, qn) => {
      "use strict";
      c2();
      m();
      p();
      d();
      f();
      l();
      qn.exports = ({ onlyFirst: e = false } = {}) => {
        let t = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
        return new RegExp(t, e ? void 0 : "g");
      };
    });
    var Vn = De((fm, $n) => {
      "use strict";
      c2();
      m();
      p();
      d();
      f();
      l();
      var bs = Bn();
      $n.exports = (e) => typeof e == "string" ? e.replace(bs(), "") : e;
    });
    var kr = De((Mf, Jn) => {
      "use strict";
      c2();
      m();
      p();
      d();
      f();
      l();
      Jn.exports = /* @__PURE__ */ function() {
        function e(t, r, n, i, o) {
          return t < r || n < r ? t > n ? n + 1 : t + 1 : i === o ? r : r + 1;
        }
        __name(e, "e");
        return function(t, r) {
          if (t === r) return 0;
          if (t.length > r.length) {
            var n = t;
            t = r, r = n;
          }
          for (var i = t.length, o = r.length; i > 0 && t.charCodeAt(i - 1) === r.charCodeAt(o - 1); ) i--, o--;
          for (var s = 0; s < i && t.charCodeAt(s) === r.charCodeAt(s); ) s++;
          if (i -= s, o -= s, i === 0 || o < 3) return o;
          var a = 0, u, g, T, C, O, A, M, S, I, ne, z, _e, k = [];
          for (u = 0; u < i; u++) k.push(u + 1), k.push(t.charCodeAt(s + u));
          for (var Ae = k.length - 1; a < o - 3; ) for (I = r.charCodeAt(s + (g = a)), ne = r.charCodeAt(s + (T = a + 1)), z = r.charCodeAt(s + (C = a + 2)), _e = r.charCodeAt(s + (O = a + 3)), A = a += 4, u = 0; u < Ae; u += 2) M = k[u], S = k[u + 1], g = e(M, g, T, I, S), T = e(g, T, C, ne, S), C = e(T, C, O, z, S), A = e(C, O, A, _e, S), k[u] = A, O = C, C = T, T = g, g = M;
          for (; a < o; ) for (I = r.charCodeAt(s + (g = a)), A = ++a, u = 0; u < Ae; u += 2) M = k[u], k[u] = A = e(M, g, A, I, k[u + 1]), g = M;
          return A;
        };
      }();
    });
    var wi = De((oE, fa) => {
      fa.exports = { name: "@prisma/engines-version", version: "5.22.0-44.605197351a3c8bdd595af2d2a9bc3025bca48ea2", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "605197351a3c8bdd595af2d2a9bc3025bca48ea2" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.34", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
    });
    var Ei = De(() => {
      "use strict";
      c2();
      m();
      p();
      d();
      f();
      l();
    });
    var ul = {};
    Mt(ul, { Debug: /* @__PURE__ */ __name(() => Tr, "Debug"), Decimal: /* @__PURE__ */ __name(() => ue, "Decimal"), Extensions: /* @__PURE__ */ __name(() => Er, "Extensions"), MetricsClient: /* @__PURE__ */ __name(() => Ze, "MetricsClient"), NotFoundError: /* @__PURE__ */ __name(() => we, "NotFoundError"), PrismaClientInitializationError: /* @__PURE__ */ __name(() => L, "PrismaClientInitializationError"), PrismaClientKnownRequestError: /* @__PURE__ */ __name(() => J, "PrismaClientKnownRequestError"), PrismaClientRustPanicError: /* @__PURE__ */ __name(() => Ee, "PrismaClientRustPanicError"), PrismaClientUnknownRequestError: /* @__PURE__ */ __name(() => G, "PrismaClientUnknownRequestError"), PrismaClientValidationError: /* @__PURE__ */ __name(() => j, "PrismaClientValidationError"), Public: /* @__PURE__ */ __name(() => xr, "Public"), Sql: /* @__PURE__ */ __name(() => X, "Sql"), defineDmmfProperty: /* @__PURE__ */ __name(() => hi, "defineDmmfProperty"), deserializeJsonResponse: /* @__PURE__ */ __name(() => $e, "deserializeJsonResponse"), dmmfToRuntimeDataModel: /* @__PURE__ */ __name(() => gi, "dmmfToRuntimeDataModel"), empty: /* @__PURE__ */ __name(() => Pi, "empty"), getPrismaClient: /* @__PURE__ */ __name(() => _o, "getPrismaClient"), getRuntime: /* @__PURE__ */ __name(() => Ce, "getRuntime"), join: /* @__PURE__ */ __name(() => xi, "join"), makeStrictEnum: /* @__PURE__ */ __name(() => Do, "makeStrictEnum"), makeTypedQueryFactory: /* @__PURE__ */ __name(() => yi, "makeTypedQueryFactory"), objectEnumValues: /* @__PURE__ */ __name(() => Wt, "objectEnumValues"), raw: /* @__PURE__ */ __name(() => Vr, "raw"), serializeJsonQuery: /* @__PURE__ */ __name(() => Zt, "serializeJsonQuery"), skip: /* @__PURE__ */ __name(() => Xt, "skip"), sqltag: /* @__PURE__ */ __name(() => jr, "sqltag"), warnEnvConflicts: /* @__PURE__ */ __name(() => void 0, "warnEnvConflicts"), warnOnce: /* @__PURE__ */ __name(() => ct, "warnOnce") });
    module.exports = jo(ul);
    c2();
    m();
    p();
    d();
    f();
    l();
    var Er = {};
    Mt(Er, { defineExtension: /* @__PURE__ */ __name(() => fn, "defineExtension"), getExtensionContext: /* @__PURE__ */ __name(() => gn, "getExtensionContext") });
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    function fn(e) {
      return typeof e == "function" ? e : (t) => t.$extends(e);
    }
    __name(fn, "fn");
    c2();
    m();
    p();
    d();
    f();
    l();
    function gn(e) {
      return e;
    }
    __name(gn, "gn");
    var xr = {};
    Mt(xr, { validator: /* @__PURE__ */ __name(() => hn, "validator") });
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    function hn(...e) {
      return (t) => t;
    }
    __name(hn, "hn");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    var Pr;
    var wn;
    var En;
    var xn;
    var Pn = true;
    typeof h < "u" && ({ FORCE_COLOR: Pr, NODE_DISABLE_COLORS: wn, NO_COLOR: En, TERM: xn } = h.env || {}, Pn = h.stdout && h.stdout.isTTY);
    var is = { enabled: !wn && En == null && xn !== "dumb" && (Pr != null && Pr !== "0" || Pn) };
    function F(e, t) {
      let r = new RegExp(`\\x1b\\[${t}m`, "g"), n = `\x1B[${e}m`, i = `\x1B[${t}m`;
      return function(o) {
        return !is.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
      };
    }
    __name(F, "F");
    var fu = F(0, 0);
    var Dt = F(1, 22);
    var Ft = F(2, 22);
    var gu = F(3, 23);
    var vn = F(4, 24);
    var hu = F(7, 27);
    var yu = F(8, 28);
    var bu = F(9, 29);
    var wu = F(30, 39);
    var qe = F(31, 39);
    var Tn = F(32, 39);
    var Cn = F(33, 39);
    var Rn = F(34, 39);
    var Eu = F(35, 39);
    var An = F(36, 39);
    var xu = F(37, 39);
    var Sn = F(90, 39);
    var Pu = F(90, 39);
    var vu = F(40, 49);
    var Tu = F(41, 49);
    var Cu = F(42, 49);
    var Ru = F(43, 49);
    var Au = F(44, 49);
    var Su = F(45, 49);
    var Ou = F(46, 49);
    var ku = F(47, 49);
    c2();
    m();
    p();
    d();
    f();
    l();
    var os = 100;
    var On = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var Nt = [];
    var kn = Date.now();
    var ss = 0;
    var vr = typeof h < "u" ? h.env : {};
    globalThis.DEBUG ??= vr.DEBUG ?? "";
    globalThis.DEBUG_COLORS ??= vr.DEBUG_COLORS ? vr.DEBUG_COLORS === "true" : true;
    var ot = { enable(e) {
      typeof e == "string" && (globalThis.DEBUG = e);
    }, disable() {
      let e = globalThis.DEBUG;
      return globalThis.DEBUG = "", e;
    }, enabled(e) {
      let t = globalThis.DEBUG.split(",").map((i) => i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r = t.some((i) => i === "" || i[0] === "-" ? false : e.match(RegExp(i.split("*").join(".*") + "$"))), n = t.some((i) => i === "" || i[0] !== "-" ? false : e.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
      return r && !n;
    }, log: /* @__PURE__ */ __name((...e) => {
      let [t, r, ...n] = e;
      (console.warn ?? console.log)(`${t} ${r}`, ...n);
    }, "log"), formatters: {} };
    function as(e) {
      let t = { color: On[ss++ % On.length], enabled: ot.enabled(e), namespace: e, log: ot.log, extend: /* @__PURE__ */ __name(() => {
      }, "extend") }, r = /* @__PURE__ */ __name((...n) => {
        let { enabled: i, namespace: o, color: s, log: a } = t;
        if (n.length !== 0 && Nt.push([o, ...n]), Nt.length > os && Nt.shift(), ot.enabled(o) || i) {
          let u = n.map((T) => typeof T == "string" ? T : ls(T)), g = `+${Date.now() - kn}ms`;
          kn = Date.now(), a(o, ...u, g);
        }
      }, "r");
      return new Proxy(r, { get: /* @__PURE__ */ __name((n, i) => t[i], "get"), set: /* @__PURE__ */ __name((n, i, o) => t[i] = o, "set") });
    }
    __name(as, "as");
    var Tr = new Proxy(as, { get: /* @__PURE__ */ __name((e, t) => ot[t], "get"), set: /* @__PURE__ */ __name((e, t, r) => ot[t] = r, "set") });
    function ls(e, t = 2) {
      let r = /* @__PURE__ */ new Set();
      return JSON.stringify(e, (n, i) => {
        if (typeof i == "object" && i !== null) {
          if (r.has(i)) return "[Circular *]";
          r.add(i);
        } else if (typeof i == "bigint") return i.toString();
        return i;
      }, t);
    }
    __name(ls, "ls");
    function Mn() {
      Nt.length = 0;
    }
    __name(Mn, "Mn");
    var ee = Tr;
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    var Cr = ["darwin", "darwin-arm64", "debian-openssl-1.0.x", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "rhel-openssl-1.0.x", "rhel-openssl-1.1.x", "rhel-openssl-3.0.x", "linux-arm64-openssl-1.1.x", "linux-arm64-openssl-1.0.x", "linux-arm64-openssl-3.0.x", "linux-arm-openssl-1.1.x", "linux-arm-openssl-1.0.x", "linux-arm-openssl-3.0.x", "linux-musl", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-1.1.x", "linux-musl-arm64-openssl-3.0.x", "linux-nixos", "linux-static-x64", "linux-static-arm64", "windows", "freebsd11", "freebsd12", "freebsd13", "freebsd14", "freebsd15", "openbsd", "netbsd", "arm"];
    c2();
    m();
    p();
    d();
    f();
    l();
    var _n = "library";
    function at(e) {
      let t = ds();
      return t || (e?.config.engineType === "library" ? "library" : e?.config.engineType === "binary" ? "binary" : _n);
    }
    __name(at, "at");
    function ds() {
      let e = h.env.PRISMA_CLIENT_ENGINE_TYPE;
      return e === "library" ? "library" : e === "binary" ? "binary" : void 0;
    }
    __name(ds, "ds");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    var Me;
    ((t) => {
      let e;
      ((k) => (k.findUnique = "findUnique", k.findUniqueOrThrow = "findUniqueOrThrow", k.findFirst = "findFirst", k.findFirstOrThrow = "findFirstOrThrow", k.findMany = "findMany", k.create = "create", k.createMany = "createMany", k.createManyAndReturn = "createManyAndReturn", k.update = "update", k.updateMany = "updateMany", k.upsert = "upsert", k.delete = "delete", k.deleteMany = "deleteMany", k.groupBy = "groupBy", k.count = "count", k.aggregate = "aggregate", k.findRaw = "findRaw", k.aggregateRaw = "aggregateRaw"))(e = t.ModelAction ||= {});
    })(Me ||= {});
    var ut = {};
    Mt(ut, { error: /* @__PURE__ */ __name(() => hs, "error"), info: /* @__PURE__ */ __name(() => gs, "info"), log: /* @__PURE__ */ __name(() => fs, "log"), query: /* @__PURE__ */ __name(() => ys, "query"), should: /* @__PURE__ */ __name(() => Un, "should"), tags: /* @__PURE__ */ __name(() => lt, "tags"), warn: /* @__PURE__ */ __name(() => Rr, "warn") });
    c2();
    m();
    p();
    d();
    f();
    l();
    var lt = { error: qe("prisma:error"), warn: Cn("prisma:warn"), info: An("prisma:info"), query: Rn("prisma:query") };
    var Un = { warn: /* @__PURE__ */ __name(() => !h.env.PRISMA_DISABLE_WARNINGS, "warn") };
    function fs(...e) {
      console.log(...e);
    }
    __name(fs, "fs");
    function Rr(e, ...t) {
      Un.warn() && console.warn(`${lt.warn} ${e}`, ...t);
    }
    __name(Rr, "Rr");
    function gs(e, ...t) {
      console.info(`${lt.info} ${e}`, ...t);
    }
    __name(gs, "gs");
    function hs(e, ...t) {
      console.error(`${lt.error} ${e}`, ...t);
    }
    __name(hs, "hs");
    function ys(e, ...t) {
      console.log(`${lt.query} ${e}`, ...t);
    }
    __name(ys, "ys");
    c2();
    m();
    p();
    d();
    f();
    l();
    function qt(e, t) {
      if (!e) throw new Error(`${t}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
    }
    __name(qt, "qt");
    c2();
    m();
    p();
    d();
    f();
    l();
    function be(e, t) {
      throw new Error(t);
    }
    __name(be, "be");
    c2();
    m();
    p();
    d();
    f();
    l();
    function Ar(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }
    __name(Ar, "Ar");
    c2();
    m();
    p();
    d();
    f();
    l();
    var Sr = /* @__PURE__ */ __name((e, t) => e.reduce((r, n) => (r[t(n)] = n, r), {}), "Sr");
    c2();
    m();
    p();
    d();
    f();
    l();
    function Be(e, t) {
      let r = {};
      for (let n of Object.keys(e)) r[n] = t(e[n], n);
      return r;
    }
    __name(Be, "Be");
    c2();
    m();
    p();
    d();
    f();
    l();
    function Or(e, t) {
      if (e.length === 0) return;
      let r = e[0];
      for (let n = 1; n < e.length; n++) t(r, e[n]) < 0 && (r = e[n]);
      return r;
    }
    __name(Or, "Or");
    c2();
    m();
    p();
    d();
    f();
    l();
    function K(e, t) {
      Object.defineProperty(e, "name", { value: t, configurable: true });
    }
    __name(K, "K");
    c2();
    m();
    p();
    d();
    f();
    l();
    var jn = /* @__PURE__ */ new Set();
    var ct = /* @__PURE__ */ __name((e, t, ...r) => {
      jn.has(e) || (jn.add(e), Rr(t, ...r));
    }, "ct");
    c2();
    m();
    p();
    d();
    f();
    l();
    var J = class extends Error {
      static {
        __name(this, "J");
      }
      constructor(t, { code: r, clientVersion: n, meta: i, batchRequestIdx: o }) {
        super(t), this.name = "PrismaClientKnownRequestError", this.code = r, this.clientVersion = n, this.meta = i, Object.defineProperty(this, "batchRequestIdx", { value: o, enumerable: false, writable: true });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
      }
    };
    K(J, "PrismaClientKnownRequestError");
    var we = class extends J {
      static {
        __name(this, "we");
      }
      constructor(t, r) {
        super(t, { code: "P2025", clientVersion: r }), this.name = "NotFoundError";
      }
    };
    K(we, "NotFoundError");
    c2();
    m();
    p();
    d();
    f();
    l();
    var L = class e extends Error {
      static {
        __name(this, "e");
      }
      constructor(t, r, n) {
        super(t), this.name = "PrismaClientInitializationError", this.clientVersion = r, this.errorCode = n, Error.captureStackTrace(e);
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientInitializationError";
      }
    };
    K(L, "PrismaClientInitializationError");
    c2();
    m();
    p();
    d();
    f();
    l();
    var Ee = class extends Error {
      static {
        __name(this, "Ee");
      }
      constructor(t, r) {
        super(t), this.name = "PrismaClientRustPanicError", this.clientVersion = r;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
      }
    };
    K(Ee, "PrismaClientRustPanicError");
    c2();
    m();
    p();
    d();
    f();
    l();
    var G = class extends Error {
      static {
        __name(this, "G");
      }
      constructor(t, { clientVersion: r, batchRequestIdx: n }) {
        super(t), this.name = "PrismaClientUnknownRequestError", this.clientVersion = r, Object.defineProperty(this, "batchRequestIdx", { value: n, writable: true, enumerable: false });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
      }
    };
    K(G, "PrismaClientUnknownRequestError");
    c2();
    m();
    p();
    d();
    f();
    l();
    var j = class extends Error {
      static {
        __name(this, "j");
      }
      constructor(r, { clientVersion: n }) {
        super(r);
        this.name = "PrismaClientValidationError";
        this.clientVersion = n;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientValidationError";
      }
    };
    K(j, "PrismaClientValidationError");
    c2();
    m();
    p();
    d();
    f();
    l();
    l();
    function $e(e) {
      return e === null ? e : Array.isArray(e) ? e.map($e) : typeof e == "object" ? ws(e) ? Es(e) : Be(e, $e) : e;
    }
    __name($e, "$e");
    function ws(e) {
      return e !== null && typeof e == "object" && typeof e.$type == "string";
    }
    __name(ws, "ws");
    function Es({ $type: e, value: t }) {
      switch (e) {
        case "BigInt":
          return BigInt(t);
        case "Bytes":
          return b.from(t, "base64");
        case "DateTime":
          return new Date(t);
        case "Decimal":
          return new ue(t);
        case "Json":
          return JSON.parse(t);
        default:
          be(t, "Unknown tagged value");
      }
    }
    __name(Es, "Es");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    function Ve(e) {
      return e.substring(0, 1).toLowerCase() + e.substring(1);
    }
    __name(Ve, "Ve");
    c2();
    m();
    p();
    d();
    f();
    l();
    function je(e) {
      return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
    }
    __name(je, "je");
    function Bt(e) {
      return e.toString() !== "Invalid Date";
    }
    __name(Bt, "Bt");
    c2();
    m();
    p();
    d();
    f();
    l();
    l();
    function Qe(e) {
      return v.isDecimal(e) ? true : e !== null && typeof e == "object" && typeof e.s == "number" && typeof e.e == "number" && typeof e.toFixed == "function" && Array.isArray(e.d);
    }
    __name(Qe, "Qe");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    var xs = Fe(Nn());
    var Ps = { red: qe, gray: Sn, dim: Ft, bold: Dt, underline: vn, highlightSource: /* @__PURE__ */ __name((e) => e.highlight(), "highlightSource") };
    var vs = { red: /* @__PURE__ */ __name((e) => e, "red"), gray: /* @__PURE__ */ __name((e) => e, "gray"), dim: /* @__PURE__ */ __name((e) => e, "dim"), bold: /* @__PURE__ */ __name((e) => e, "bold"), underline: /* @__PURE__ */ __name((e) => e, "underline"), highlightSource: /* @__PURE__ */ __name((e) => e, "highlightSource") };
    function Ts({ message: e, originalMethod: t, isPanic: r, callArguments: n }) {
      return { functionName: `prisma.${t}()`, message: e, isPanic: r ?? false, callArguments: n };
    }
    __name(Ts, "Ts");
    function Cs({ functionName: e, location: t, message: r, isPanic: n, contextLines: i, callArguments: o }, s) {
      let a = [""], u = t ? " in" : ":";
      if (n ? (a.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)), a.push(s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${u}`))) : a.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${u}`)), t && a.push(s.underline(Rs(t))), i) {
        a.push("");
        let g = [i.toString()];
        o && (g.push(o), g.push(s.dim(")"))), a.push(g.join("")), o && a.push("");
      } else a.push(""), o && a.push(o), a.push("");
      return a.push(r), a.join(`
`);
    }
    __name(Cs, "Cs");
    function Rs(e) {
      let t = [e.fileName];
      return e.lineNumber && t.push(String(e.lineNumber)), e.columnNumber && t.push(String(e.columnNumber)), t.join(":");
    }
    __name(Rs, "Rs");
    function Je(e) {
      let t = e.showColors ? Ps : vs, r;
      return typeof $getTemplateParameters < "u" ? r = $getTemplateParameters(e, t) : r = Ts(e), Cs(r, t);
    }
    __name(Je, "Je");
    c2();
    m();
    p();
    d();
    f();
    l();
    var Yn = Fe(kr());
    c2();
    m();
    p();
    d();
    f();
    l();
    function Kn(e, t, r) {
      let n = Hn(e), i = As(n), o = Os(i);
      o ? $t(o, t, r) : t.addErrorMessage(() => "Unknown error");
    }
    __name(Kn, "Kn");
    function Hn(e) {
      return e.errors.flatMap((t) => t.kind === "Union" ? Hn(t) : [t]);
    }
    __name(Hn, "Hn");
    function As(e) {
      let t = /* @__PURE__ */ new Map(), r = [];
      for (let n of e) {
        if (n.kind !== "InvalidArgumentType") {
          r.push(n);
          continue;
        }
        let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = t.get(i);
        o ? t.set(i, { ...n, argument: { ...n.argument, typeNames: Ss(o.argument.typeNames, n.argument.typeNames) } }) : t.set(i, n);
      }
      return r.push(...t.values()), r;
    }
    __name(As, "As");
    function Ss(e, t) {
      return [...new Set(e.concat(t))];
    }
    __name(Ss, "Ss");
    function Os(e) {
      return Or(e, (t, r) => {
        let n = Gn(t), i = Gn(r);
        return n !== i ? n - i : Wn(t) - Wn(r);
      });
    }
    __name(Os, "Os");
    function Gn(e) {
      let t = 0;
      return Array.isArray(e.selectionPath) && (t += e.selectionPath.length), Array.isArray(e.argumentPath) && (t += e.argumentPath.length), t;
    }
    __name(Gn, "Gn");
    function Wn(e) {
      switch (e.kind) {
        case "InvalidArgumentValue":
        case "ValueTooLarge":
          return 20;
        case "InvalidArgumentType":
          return 10;
        case "RequiredArgumentMissing":
          return -10;
        default:
          return 0;
      }
    }
    __name(Wn, "Wn");
    c2();
    m();
    p();
    d();
    f();
    l();
    var te = class {
      static {
        __name(this, "te");
      }
      constructor(t, r) {
        this.name = t;
        this.value = r;
        this.isRequired = false;
      }
      makeRequired() {
        return this.isRequired = true, this;
      }
      write(t) {
        let { colors: { green: r } } = t.context;
        t.addMarginSymbol(r(this.isRequired ? "+" : "?")), t.write(r(this.name)), this.isRequired || t.write(r("?")), t.write(r(": ")), typeof this.value == "string" ? t.write(r(this.value)) : t.write(this.value);
      }
    };
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    var Ge = class {
      static {
        __name(this, "Ge");
      }
      constructor(t = 0, r) {
        this.context = r;
        this.lines = [];
        this.currentLine = "";
        this.currentIndent = 0;
        this.currentIndent = t;
      }
      write(t) {
        return typeof t == "string" ? this.currentLine += t : t.write(this), this;
      }
      writeJoined(t, r, n = (i, o) => o.write(i)) {
        let i = r.length - 1;
        for (let o = 0; o < r.length; o++) n(r[o], this), o !== i && this.write(t);
        return this;
      }
      writeLine(t) {
        return this.write(t).newLine();
      }
      newLine() {
        this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
        let t = this.afterNextNewLineCallback;
        return this.afterNextNewLineCallback = void 0, t?.(), this;
      }
      withIndent(t) {
        return this.indent(), t(this), this.unindent(), this;
      }
      afterNextNewline(t) {
        return this.afterNextNewLineCallback = t, this;
      }
      indent() {
        return this.currentIndent++, this;
      }
      unindent() {
        return this.currentIndent > 0 && this.currentIndent--, this;
      }
      addMarginSymbol(t) {
        return this.marginSymbol = t, this;
      }
      toString() {
        return this.lines.concat(this.indentedCurrentLine()).join(`
`);
      }
      getCurrentLineLength() {
        return this.currentLine.length;
      }
      indentedCurrentLine() {
        let t = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
        return this.marginSymbol ? this.marginSymbol + t.slice(1) : t;
      }
    };
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    var Vt = class {
      static {
        __name(this, "Vt");
      }
      constructor(t) {
        this.value = t;
      }
      write(t) {
        t.write(this.value);
      }
      markAsError() {
        this.value.markAsError();
      }
    };
    c2();
    m();
    p();
    d();
    f();
    l();
    var jt = /* @__PURE__ */ __name((e) => e, "jt");
    var Qt = { bold: jt, red: jt, green: jt, dim: jt, enabled: false };
    var zn = { bold: Dt, red: qe, green: Tn, dim: Ft, enabled: true };
    var We = { write(e) {
      e.writeLine(",");
    } };
    c2();
    m();
    p();
    d();
    f();
    l();
    var ce = class {
      static {
        __name(this, "ce");
      }
      constructor(t) {
        this.contents = t;
        this.isUnderlined = false;
        this.color = (t2) => t2;
      }
      underline() {
        return this.isUnderlined = true, this;
      }
      setColor(t) {
        return this.color = t, this;
      }
      write(t) {
        let r = t.getCurrentLineLength();
        t.write(this.color(this.contents)), this.isUnderlined && t.afterNextNewline(() => {
          t.write(" ".repeat(r)).writeLine(this.color("~".repeat(this.contents.length)));
        });
      }
    };
    c2();
    m();
    p();
    d();
    f();
    l();
    var ve = class {
      static {
        __name(this, "ve");
      }
      constructor() {
        this.hasError = false;
      }
      markAsError() {
        return this.hasError = true, this;
      }
    };
    var Ke = class extends ve {
      static {
        __name(this, "Ke");
      }
      constructor() {
        super(...arguments);
        this.items = [];
      }
      addItem(r) {
        return this.items.push(new Vt(r)), this;
      }
      getField(r) {
        return this.items[r];
      }
      getPrintWidth() {
        return this.items.length === 0 ? 2 : Math.max(...this.items.map((n) => n.value.getPrintWidth())) + 2;
      }
      write(r) {
        if (this.items.length === 0) {
          this.writeEmpty(r);
          return;
        }
        this.writeWithItems(r);
      }
      writeEmpty(r) {
        let n = new ce("[]");
        this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
      }
      writeWithItems(r) {
        let { colors: n } = r.context;
        r.writeLine("[").withIndent(() => r.writeJoined(We, this.items).newLine()).write("]"), this.hasError && r.afterNextNewline(() => {
          r.writeLine(n.red("~".repeat(this.getPrintWidth())));
        });
      }
      asObject() {
      }
    };
    var He = class e extends ve {
      static {
        __name(this, "e");
      }
      constructor() {
        super(...arguments);
        this.fields = {};
        this.suggestions = [];
      }
      addField(r) {
        this.fields[r.name] = r;
      }
      addSuggestion(r) {
        this.suggestions.push(r);
      }
      getField(r) {
        return this.fields[r];
      }
      getDeepField(r) {
        let [n, ...i] = r, o = this.getField(n);
        if (!o) return;
        let s = o;
        for (let a of i) {
          let u;
          if (s.value instanceof e ? u = s.value.getField(a) : s.value instanceof Ke && (u = s.value.getField(Number(a))), !u) return;
          s = u;
        }
        return s;
      }
      getDeepFieldValue(r) {
        return r.length === 0 ? this : this.getDeepField(r)?.value;
      }
      hasField(r) {
        return !!this.getField(r);
      }
      removeAllFields() {
        this.fields = {};
      }
      removeField(r) {
        delete this.fields[r];
      }
      getFields() {
        return this.fields;
      }
      isEmpty() {
        return Object.keys(this.fields).length === 0;
      }
      getFieldValue(r) {
        return this.getField(r)?.value;
      }
      getDeepSubSelectionValue(r) {
        let n = this;
        for (let i of r) {
          if (!(n instanceof e)) return;
          let o = n.getSubSelectionValue(i);
          if (!o) return;
          n = o;
        }
        return n;
      }
      getDeepSelectionParent(r) {
        let n = this.getSelectionParent();
        if (!n) return;
        let i = n;
        for (let o of r) {
          let s = i.value.getFieldValue(o);
          if (!s || !(s instanceof e)) return;
          let a = s.getSelectionParent();
          if (!a) return;
          i = a;
        }
        return i;
      }
      getSelectionParent() {
        let r = this.getField("select")?.value.asObject();
        if (r) return { kind: "select", value: r };
        let n = this.getField("include")?.value.asObject();
        if (n) return { kind: "include", value: n };
      }
      getSubSelectionValue(r) {
        return this.getSelectionParent()?.value.fields[r].value;
      }
      getPrintWidth() {
        let r = Object.values(this.fields);
        return r.length == 0 ? 2 : Math.max(...r.map((i) => i.getPrintWidth())) + 2;
      }
      write(r) {
        let n = Object.values(this.fields);
        if (n.length === 0 && this.suggestions.length === 0) {
          this.writeEmpty(r);
          return;
        }
        this.writeWithContents(r, n);
      }
      asObject() {
        return this;
      }
      writeEmpty(r) {
        let n = new ce("{}");
        this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
      }
      writeWithContents(r, n) {
        r.writeLine("{").withIndent(() => {
          r.writeJoined(We, [...n, ...this.suggestions]).newLine();
        }), r.write("}"), this.hasError && r.afterNextNewline(() => {
          r.writeLine(r.context.colors.red("~".repeat(this.getPrintWidth())));
        });
      }
    };
    c2();
    m();
    p();
    d();
    f();
    l();
    var W = class extends ve {
      static {
        __name(this, "W");
      }
      constructor(r) {
        super();
        this.text = r;
      }
      getPrintWidth() {
        return this.text.length;
      }
      write(r) {
        let n = new ce(this.text);
        this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
      }
      asObject() {
      }
    };
    c2();
    m();
    p();
    d();
    f();
    l();
    var mt = class {
      static {
        __name(this, "mt");
      }
      constructor() {
        this.fields = [];
      }
      addField(t, r) {
        return this.fields.push({ write(n) {
          let { green: i, dim: o } = n.context.colors;
          n.write(i(o(`${t}: ${r}`))).addMarginSymbol(i(o("+")));
        } }), this;
      }
      write(t) {
        let { colors: { green: r } } = t.context;
        t.writeLine(r("{")).withIndent(() => {
          t.writeJoined(We, this.fields).newLine();
        }).write(r("}")).addMarginSymbol(r("+"));
      }
    };
    function $t(e, t, r) {
      switch (e.kind) {
        case "MutuallyExclusiveFields":
          Ms(e, t);
          break;
        case "IncludeOnScalar":
          Is(e, t);
          break;
        case "EmptySelection":
          Ls(e, t, r);
          break;
        case "UnknownSelectionField":
          Ns(e, t);
          break;
        case "InvalidSelectionValue":
          Us(e, t);
          break;
        case "UnknownArgument":
          qs(e, t);
          break;
        case "UnknownInputField":
          Bs(e, t);
          break;
        case "RequiredArgumentMissing":
          $s(e, t);
          break;
        case "InvalidArgumentType":
          Vs(e, t);
          break;
        case "InvalidArgumentValue":
          js(e, t);
          break;
        case "ValueTooLarge":
          Qs(e, t);
          break;
        case "SomeFieldsMissing":
          Js(e, t);
          break;
        case "TooManyFieldsGiven":
          Gs(e, t);
          break;
        case "Union":
          Kn(e, t, r);
          break;
        default:
          throw new Error("not implemented: " + e.kind);
      }
    }
    __name($t, "$t");
    function Ms(e, t) {
      let r = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      r && (r.getField(e.firstField)?.markAsError(), r.getField(e.secondField)?.markAsError()), t.addErrorMessage((n) => `Please ${n.bold("either")} use ${n.green(`\`${e.firstField}\``)} or ${n.green(`\`${e.secondField}\``)}, but ${n.red("not both")} at the same time.`);
    }
    __name(Ms, "Ms");
    function Is(e, t) {
      let [r, n] = pt(e.selectionPath), i = e.outputType, o = t.arguments.getDeepSelectionParent(r)?.value;
      if (o && (o.getField(n)?.markAsError(), i)) for (let s of i.fields) s.isRelation && o.addSuggestion(new te(s.name, "true"));
      t.addErrorMessage((s) => {
        let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
        return i ? a += ` on model ${s.bold(i.name)}. ${dt(s)}` : a += ".", a += `
Note that ${s.bold("include")} statements only accept relation fields.`, a;
      });
    }
    __name(Is, "Is");
    function Ls(e, t, r) {
      let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (n) {
        let i = n.getField("omit")?.value.asObject();
        if (i) {
          _s(e, t, i);
          return;
        }
        if (n.hasField("select")) {
          Ds(e, t);
          return;
        }
      }
      if (r?.[Ve(e.outputType.name)]) {
        Fs(e, t);
        return;
      }
      t.addErrorMessage(() => `Unknown field at "${e.selectionPath.join(".")} selection"`);
    }
    __name(Ls, "Ls");
    function _s(e, t, r) {
      r.removeAllFields();
      for (let n of e.outputType.fields) r.addSuggestion(new te(n.name, "false"));
      t.addErrorMessage((n) => `The ${n.red("omit")} statement includes every field of the model ${n.bold(e.outputType.name)}. At least one field must be included in the result`);
    }
    __name(_s, "_s");
    function Ds(e, t) {
      let r = e.outputType, n = t.arguments.getDeepSelectionParent(e.selectionPath)?.value, i = n?.isEmpty() ?? false;
      n && (n.removeAllFields(), ei(n, r)), t.addErrorMessage((o) => i ? `The ${o.red("`select`")} statement for type ${o.bold(r.name)} must not be empty. ${dt(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(r.name)} needs ${o.bold("at least one truthy value")}.`);
    }
    __name(Ds, "Ds");
    function Fs(e, t) {
      let r = new mt();
      for (let i of e.outputType.fields) i.isRelation || r.addField(i.name, "false");
      let n = new te("omit", r).makeRequired();
      if (e.selectionPath.length === 0) t.arguments.addSuggestion(n);
      else {
        let [i, o] = pt(e.selectionPath), a = t.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o);
        if (a) {
          let u = a?.value.asObject() ?? new He();
          u.addSuggestion(n), a.value = u;
        }
      }
      t.addErrorMessage((i) => `The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(e.outputType.name)}. At least one field must be included in the result`);
    }
    __name(Fs, "Fs");
    function Ns(e, t) {
      let r = ti(e.selectionPath, t);
      if (r.parentKind !== "unknown") {
        r.field.markAsError();
        let n = r.parent;
        switch (r.parentKind) {
          case "select":
            ei(n, e.outputType);
            break;
          case "include":
            Ws(n, e.outputType);
            break;
          case "omit":
            Ks(n, e.outputType);
            break;
        }
      }
      t.addErrorMessage((n) => {
        let i = [`Unknown field ${n.red(`\`${r.fieldName}\``)}`];
        return r.parentKind !== "unknown" && i.push(`for ${n.bold(r.parentKind)} statement`), i.push(`on model ${n.bold(`\`${e.outputType.name}\``)}.`), i.push(dt(n)), i.join(" ");
      });
    }
    __name(Ns, "Ns");
    function Us(e, t) {
      let r = ti(e.selectionPath, t);
      r.parentKind !== "unknown" && r.field.value.markAsError(), t.addErrorMessage((n) => `Invalid value for selection field \`${n.red(r.fieldName)}\`: ${e.underlyingError}`);
    }
    __name(Us, "Us");
    function qs(e, t) {
      let r = e.argumentPath[0], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && (n.getField(r)?.markAsError(), Hs(n, e.arguments)), t.addErrorMessage((i) => Xn(i, r, e.arguments.map((o) => o.name)));
    }
    __name(qs, "qs");
    function Bs(e, t) {
      let [r, n] = pt(e.argumentPath), i = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (i) {
        i.getDeepField(e.argumentPath)?.markAsError();
        let o = i.getDeepFieldValue(r)?.asObject();
        o && ri(o, e.inputType);
      }
      t.addErrorMessage((o) => Xn(o, n, e.inputType.fields.map((s) => s.name)));
    }
    __name(Bs, "Bs");
    function Xn(e, t, r) {
      let n = [`Unknown argument \`${e.red(t)}\`.`], i = Ys(t, r);
      return i && n.push(`Did you mean \`${e.green(i)}\`?`), r.length > 0 && n.push(dt(e)), n.join(" ");
    }
    __name(Xn, "Xn");
    function $s(e, t) {
      let r;
      t.addErrorMessage((u) => r?.value instanceof W && r.value.text === "null" ? `Argument \`${u.green(o)}\` must not be ${u.red("null")}.` : `Argument \`${u.green(o)}\` is missing.`);
      let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (!n) return;
      let [i, o] = pt(e.argumentPath), s = new mt(), a = n.getDeepFieldValue(i)?.asObject();
      if (a) if (r = a.getField(o), r && a.removeField(o), e.inputTypes.length === 1 && e.inputTypes[0].kind === "object") {
        for (let u of e.inputTypes[0].fields) s.addField(u.name, u.typeNames.join(" | "));
        a.addSuggestion(new te(o, s).makeRequired());
      } else {
        let u = e.inputTypes.map(Zn).join(" | ");
        a.addSuggestion(new te(o, u).makeRequired());
      }
    }
    __name($s, "$s");
    function Zn(e) {
      return e.kind === "list" ? `${Zn(e.elementType)}[]` : e.name;
    }
    __name(Zn, "Zn");
    function Vs(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && n.getDeepFieldValue(e.argumentPath)?.markAsError(), t.addErrorMessage((i) => {
        let o = Jt("or", e.argument.typeNames.map((s) => i.green(s)));
        return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(e.inferredType)}.`;
      });
    }
    __name(Vs, "Vs");
    function js(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && n.getDeepFieldValue(e.argumentPath)?.markAsError(), t.addErrorMessage((i) => {
        let o = [`Invalid value for argument \`${i.bold(r)}\``];
        if (e.underlyingError && o.push(`: ${e.underlyingError}`), o.push("."), e.argument.typeNames.length > 0) {
          let s = Jt("or", e.argument.typeNames.map((a) => i.green(a)));
          o.push(` Expected ${s}.`);
        }
        return o.join("");
      });
    }
    __name(js, "js");
    function Qs(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(), i;
      if (n) {
        let s = n.getDeepField(e.argumentPath)?.value;
        s?.markAsError(), s instanceof W && (i = s.text);
      }
      t.addErrorMessage((o) => {
        let s = ["Unable to fit value"];
        return i && s.push(o.red(i)), s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``), s.join(" ");
      });
    }
    __name(Qs, "Qs");
    function Js(e, t) {
      let r = e.argumentPath[e.argumentPath.length - 1], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (n) {
        let i = n.getDeepFieldValue(e.argumentPath)?.asObject();
        i && ri(i, e.inputType);
      }
      t.addErrorMessage((i) => {
        let o = [`Argument \`${i.bold(r)}\` of type ${i.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 ? e.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${Jt("or", e.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`), o.push(dt(i)), o.join(" ");
      });
    }
    __name(Js, "Js");
    function Gs(e, t) {
      let r = e.argumentPath[e.argumentPath.length - 1], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(), i = [];
      if (n) {
        let o = n.getDeepFieldValue(e.argumentPath)?.asObject();
        o && (o.markAsError(), i = Object.keys(o.getFields()));
      }
      t.addErrorMessage((o) => {
        let s = [`Argument \`${o.bold(r)}\` of type ${o.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 && e.constraints.maxFieldCount == 1 ? s.push(`${o.green("exactly one")} argument,`) : e.constraints.maxFieldCount == 1 ? s.push(`${o.green("at most one")} argument,`) : s.push(`${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`), s.push(`but you provided ${Jt("and", i.map((a) => o.red(a)))}. Please choose`), e.constraints.maxFieldCount === 1 ? s.push("one.") : s.push(`${e.constraints.maxFieldCount}.`), s.join(" ");
      });
    }
    __name(Gs, "Gs");
    function ei(e, t) {
      for (let r of t.fields) e.hasField(r.name) || e.addSuggestion(new te(r.name, "true"));
    }
    __name(ei, "ei");
    function Ws(e, t) {
      for (let r of t.fields) r.isRelation && !e.hasField(r.name) && e.addSuggestion(new te(r.name, "true"));
    }
    __name(Ws, "Ws");
    function Ks(e, t) {
      for (let r of t.fields) !e.hasField(r.name) && !r.isRelation && e.addSuggestion(new te(r.name, "true"));
    }
    __name(Ks, "Ks");
    function Hs(e, t) {
      for (let r of t) e.hasField(r.name) || e.addSuggestion(new te(r.name, r.typeNames.join(" | ")));
    }
    __name(Hs, "Hs");
    function ti(e, t) {
      let [r, n] = pt(e), i = t.arguments.getDeepSubSelectionValue(r)?.asObject();
      if (!i) return { parentKind: "unknown", fieldName: n };
      let o = i.getFieldValue("select")?.asObject(), s = i.getFieldValue("include")?.asObject(), a = i.getFieldValue("omit")?.asObject(), u = o?.getField(n);
      return o && u ? { parentKind: "select", parent: o, field: u, fieldName: n } : (u = s?.getField(n), s && u ? { parentKind: "include", field: u, parent: s, fieldName: n } : (u = a?.getField(n), a && u ? { parentKind: "omit", field: u, parent: a, fieldName: n } : { parentKind: "unknown", fieldName: n }));
    }
    __name(ti, "ti");
    function ri(e, t) {
      if (t.kind === "object") for (let r of t.fields) e.hasField(r.name) || e.addSuggestion(new te(r.name, r.typeNames.join(" | ")));
    }
    __name(ri, "ri");
    function pt(e) {
      let t = [...e], r = t.pop();
      if (!r) throw new Error("unexpected empty path");
      return [t, r];
    }
    __name(pt, "pt");
    function dt({ green: e, enabled: t }) {
      return "Available options are " + (t ? `listed in ${e("green")}` : "marked with ?") + ".";
    }
    __name(dt, "dt");
    function Jt(e, t) {
      if (t.length === 1) return t[0];
      let r = [...t], n = r.pop();
      return `${r.join(", ")} ${e} ${n}`;
    }
    __name(Jt, "Jt");
    var zs = 3;
    function Ys(e, t) {
      let r = 1 / 0, n;
      for (let i of t) {
        let o = (0, Yn.default)(e, i);
        o > zs || o < r && (r = o, n = i);
      }
      return n;
    }
    __name(Ys, "Ys");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    function ni(e) {
      return e.substring(0, 1).toLowerCase() + e.substring(1);
    }
    __name(ni, "ni");
    c2();
    m();
    p();
    d();
    f();
    l();
    var ft = class {
      static {
        __name(this, "ft");
      }
      constructor(t, r, n, i, o) {
        this.modelName = t, this.name = r, this.typeName = n, this.isList = i, this.isEnum = o;
      }
      _toGraphQLInputType() {
        let t = this.isList ? "List" : "", r = this.isEnum ? "Enum" : "";
        return `${t}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
      }
    };
    function ze(e) {
      return e instanceof ft;
    }
    __name(ze, "ze");
    c2();
    m();
    p();
    d();
    f();
    l();
    var Gt = Symbol();
    var Mr = /* @__PURE__ */ new WeakMap();
    var xe = class {
      static {
        __name(this, "xe");
      }
      constructor(t) {
        t === Gt ? Mr.set(this, `Prisma.${this._getName()}`) : Mr.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
      }
      _getName() {
        return this.constructor.name;
      }
      toString() {
        return Mr.get(this);
      }
    };
    var gt = class extends xe {
      static {
        __name(this, "gt");
      }
      _getNamespace() {
        return "NullTypes";
      }
    };
    var ht = class extends gt {
      static {
        __name(this, "ht");
      }
    };
    Ir(ht, "DbNull");
    var yt = class extends gt {
      static {
        __name(this, "yt");
      }
    };
    Ir(yt, "JsonNull");
    var bt = class extends gt {
      static {
        __name(this, "bt");
      }
    };
    Ir(bt, "AnyNull");
    var Wt = { classes: { DbNull: ht, JsonNull: yt, AnyNull: bt }, instances: { DbNull: new ht(Gt), JsonNull: new yt(Gt), AnyNull: new bt(Gt) } };
    function Ir(e, t) {
      Object.defineProperty(e, "name", { value: t, configurable: true });
    }
    __name(Ir, "Ir");
    c2();
    m();
    p();
    d();
    f();
    l();
    var ii = ": ";
    var Kt = class {
      static {
        __name(this, "Kt");
      }
      constructor(t, r) {
        this.name = t;
        this.value = r;
        this.hasError = false;
      }
      markAsError() {
        this.hasError = true;
      }
      getPrintWidth() {
        return this.name.length + this.value.getPrintWidth() + ii.length;
      }
      write(t) {
        let r = new ce(this.name);
        this.hasError && r.underline().setColor(t.context.colors.red), t.write(r).write(ii).write(this.value);
      }
    };
    var Lr = class {
      static {
        __name(this, "Lr");
      }
      constructor(t) {
        this.errorMessages = [];
        this.arguments = t;
      }
      write(t) {
        t.write(this.arguments);
      }
      addErrorMessage(t) {
        this.errorMessages.push(t);
      }
      renderAllMessages(t) {
        return this.errorMessages.map((r) => r(t)).join(`
`);
      }
    };
    function Ye(e) {
      return new Lr(oi(e));
    }
    __name(Ye, "Ye");
    function oi(e) {
      let t = new He();
      for (let [r, n] of Object.entries(e)) {
        let i = new Kt(r, si(n));
        t.addField(i);
      }
      return t;
    }
    __name(oi, "oi");
    function si(e) {
      if (typeof e == "string") return new W(JSON.stringify(e));
      if (typeof e == "number" || typeof e == "boolean") return new W(String(e));
      if (typeof e == "bigint") return new W(`${e}n`);
      if (e === null) return new W("null");
      if (e === void 0) return new W("undefined");
      if (Qe(e)) return new W(`new Prisma.Decimal("${e.toFixed()}")`);
      if (e instanceof Uint8Array) return b.isBuffer(e) ? new W(`Buffer.alloc(${e.byteLength})`) : new W(`new Uint8Array(${e.byteLength})`);
      if (e instanceof Date) {
        let t = Bt(e) ? e.toISOString() : "Invalid Date";
        return new W(`new Date("${t}")`);
      }
      return e instanceof xe ? new W(`Prisma.${e._getName()}`) : ze(e) ? new W(`prisma.${ni(e.modelName)}.$fields.${e.name}`) : Array.isArray(e) ? Xs(e) : typeof e == "object" ? oi(e) : new W(Object.prototype.toString.call(e));
    }
    __name(si, "si");
    function Xs(e) {
      let t = new Ke();
      for (let r of e) t.addItem(si(r));
      return t;
    }
    __name(Xs, "Xs");
    function Ht(e, t) {
      let r = t === "pretty" ? zn : Qt, n = e.renderAllMessages(r), i = new Ge(0, { colors: r }).write(e).toString();
      return { message: n, args: i };
    }
    __name(Ht, "Ht");
    function zt({ args: e, errors: t, errorFormat: r, callsite: n, originalMethod: i, clientVersion: o, globalOmit: s }) {
      let a = Ye(e);
      for (let C of t) $t(C, a, s);
      let { message: u, args: g } = Ht(a, r), T = Je({ message: u, callsite: n, originalMethod: i, showColors: r === "pretty", callArguments: g });
      throw new j(T, { clientVersion: o });
    }
    __name(zt, "zt");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    var me = class {
      static {
        __name(this, "me");
      }
      constructor() {
        this._map = /* @__PURE__ */ new Map();
      }
      get(t) {
        return this._map.get(t)?.value;
      }
      set(t, r) {
        this._map.set(t, { value: r });
      }
      getOrCreate(t, r) {
        let n = this._map.get(t);
        if (n) return n.value;
        let i = r();
        return this.set(t, i), i;
      }
    };
    c2();
    m();
    p();
    d();
    f();
    l();
    function wt(e) {
      let t;
      return { get() {
        return t || (t = { value: e() }), t.value;
      } };
    }
    __name(wt, "wt");
    c2();
    m();
    p();
    d();
    f();
    l();
    function pe(e) {
      return e.replace(/^./, (t) => t.toLowerCase());
    }
    __name(pe, "pe");
    c2();
    m();
    p();
    d();
    f();
    l();
    function li(e, t, r) {
      let n = pe(r);
      return !t.result || !(t.result.$allModels || t.result[n]) ? e : Zs({ ...e, ...ai(t.name, e, t.result.$allModels), ...ai(t.name, e, t.result[n]) });
    }
    __name(li, "li");
    function Zs(e) {
      let t = new me(), r = /* @__PURE__ */ __name((n, i) => t.getOrCreate(n, () => i.has(n) ? [n] : (i.add(n), e[n] ? e[n].needs.flatMap((o) => r(o, i)) : [n])), "r");
      return Be(e, (n) => ({ ...n, needs: r(n.name, /* @__PURE__ */ new Set()) }));
    }
    __name(Zs, "Zs");
    function ai(e, t, r) {
      return r ? Be(r, ({ needs: n, compute: i }, o) => ({ name: o, needs: n ? Object.keys(n).filter((s) => n[s]) : [], compute: ea(t, o, i) })) : {};
    }
    __name(ai, "ai");
    function ea(e, t, r) {
      let n = e?.[t]?.compute;
      return n ? (i) => r({ ...i, [t]: n(i) }) : r;
    }
    __name(ea, "ea");
    function ui(e, t) {
      if (!t) return e;
      let r = { ...e };
      for (let n of Object.values(t)) if (e[n.name]) for (let i of n.needs) r[i] = true;
      return r;
    }
    __name(ui, "ui");
    function ci(e, t) {
      if (!t) return e;
      let r = { ...e };
      for (let n of Object.values(t)) if (!e[n.name]) for (let i of n.needs) delete r[i];
      return r;
    }
    __name(ci, "ci");
    var Yt = class {
      static {
        __name(this, "Yt");
      }
      constructor(t, r) {
        this.extension = t;
        this.previous = r;
        this.computedFieldsCache = new me();
        this.modelExtensionsCache = new me();
        this.queryCallbacksCache = new me();
        this.clientExtensions = wt(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
        this.batchCallbacks = wt(() => {
          let t2 = this.previous?.getAllBatchQueryCallbacks() ?? [], r2 = this.extension.query?.$__internalBatch;
          return r2 ? t2.concat(r2) : t2;
        });
      }
      getAllComputedFields(t) {
        return this.computedFieldsCache.getOrCreate(t, () => li(this.previous?.getAllComputedFields(t), this.extension, t));
      }
      getAllClientExtensions() {
        return this.clientExtensions.get();
      }
      getAllModelExtensions(t) {
        return this.modelExtensionsCache.getOrCreate(t, () => {
          let r = pe(t);
          return !this.extension.model || !(this.extension.model[r] || this.extension.model.$allModels) ? this.previous?.getAllModelExtensions(t) : { ...this.previous?.getAllModelExtensions(t), ...this.extension.model.$allModels, ...this.extension.model[r] };
        });
      }
      getAllQueryCallbacks(t, r) {
        return this.queryCallbacksCache.getOrCreate(`${t}:${r}`, () => {
          let n = this.previous?.getAllQueryCallbacks(t, r) ?? [], i = [], o = this.extension.query;
          return !o || !(o[t] || o.$allModels || o[r] || o.$allOperations) ? n : (o[t] !== void 0 && (o[t][r] !== void 0 && i.push(o[t][r]), o[t].$allOperations !== void 0 && i.push(o[t].$allOperations)), t !== "$none" && o.$allModels !== void 0 && (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]), o.$allModels.$allOperations !== void 0 && i.push(o.$allModels.$allOperations)), o[r] !== void 0 && i.push(o[r]), o.$allOperations !== void 0 && i.push(o.$allOperations), n.concat(i));
        });
      }
      getAllBatchQueryCallbacks() {
        return this.batchCallbacks.get();
      }
    };
    var Xe = class e {
      static {
        __name(this, "e");
      }
      constructor(t) {
        this.head = t;
      }
      static empty() {
        return new e();
      }
      static single(t) {
        return new e(new Yt(t));
      }
      isEmpty() {
        return this.head === void 0;
      }
      append(t) {
        return new e(new Yt(t, this.head));
      }
      getAllComputedFields(t) {
        return this.head?.getAllComputedFields(t);
      }
      getAllClientExtensions() {
        return this.head?.getAllClientExtensions();
      }
      getAllModelExtensions(t) {
        return this.head?.getAllModelExtensions(t);
      }
      getAllQueryCallbacks(t, r) {
        return this.head?.getAllQueryCallbacks(t, r) ?? [];
      }
      getAllBatchQueryCallbacks() {
        return this.head?.getAllBatchQueryCallbacks() ?? [];
      }
    };
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    var mi = Symbol();
    var Et = class {
      static {
        __name(this, "Et");
      }
      constructor(t) {
        if (t !== mi) throw new Error("Skip instance can not be constructed directly");
      }
      ifUndefined(t) {
        return t === void 0 ? Xt : t;
      }
    };
    var Xt = new Et(mi);
    function de(e) {
      return e instanceof Et;
    }
    __name(de, "de");
    var ta = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" };
    var pi = "explicitly `undefined` values are not allowed";
    function Zt({ modelName: e, action: t, args: r, runtimeDataModel: n, extensions: i = Xe.empty(), callsite: o, clientMethod: s, errorFormat: a, clientVersion: u, previewFeatures: g, globalOmit: T }) {
      let C = new _r({ runtimeDataModel: n, modelName: e, action: t, rootArgs: r, callsite: o, extensions: i, selectionPath: [], argumentPath: [], originalMethod: s, errorFormat: a, clientVersion: u, previewFeatures: g, globalOmit: T });
      return { modelName: e, action: ta[t], query: xt(r, C) };
    }
    __name(Zt, "Zt");
    function xt({ select: e, include: t, ...r } = {}, n) {
      let i;
      return n.isPreviewFeatureOn("omitApi") && (i = r.omit, delete r.omit), { arguments: fi(r, n), selection: ra(e, t, i, n) };
    }
    __name(xt, "xt");
    function ra(e, t, r, n) {
      return e ? (t ? n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: n.getSelectionPath() }) : r && n.isPreviewFeatureOn("omitApi") && n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: n.getSelectionPath() }), sa(e, n)) : na(n, t, r);
    }
    __name(ra, "ra");
    function na(e, t, r) {
      let n = {};
      return e.modelOrType && !e.isRawAction() && (n.$composites = true, n.$scalars = true), t && ia(n, t, e), e.isPreviewFeatureOn("omitApi") && oa(n, r, e), n;
    }
    __name(na, "na");
    function ia(e, t, r) {
      for (let [n, i] of Object.entries(t)) {
        if (de(i)) continue;
        let o = r.nestSelection(n);
        if (Dr(i, o), i === false || i === void 0) {
          e[n] = false;
          continue;
        }
        let s = r.findField(n);
        if (s && s.kind !== "object" && r.throwValidationError({ kind: "IncludeOnScalar", selectionPath: r.getSelectionPath().concat(n), outputType: r.getOutputTypeDescription() }), s) {
          e[n] = xt(i === true ? {} : i, o);
          continue;
        }
        if (i === true) {
          e[n] = true;
          continue;
        }
        e[n] = xt(i, o);
      }
    }
    __name(ia, "ia");
    function oa(e, t, r) {
      let n = r.getComputedFields(), i = { ...r.getGlobalOmit(), ...t }, o = ci(i, n);
      for (let [s, a] of Object.entries(o)) {
        if (de(a)) continue;
        Dr(a, r.nestSelection(s));
        let u = r.findField(s);
        n?.[s] && !u || (e[s] = !a);
      }
    }
    __name(oa, "oa");
    function sa(e, t) {
      let r = {}, n = t.getComputedFields(), i = ui(e, n);
      for (let [o, s] of Object.entries(i)) {
        if (de(s)) continue;
        let a = t.nestSelection(o);
        Dr(s, a);
        let u = t.findField(o);
        if (!(n?.[o] && !u)) {
          if (s === false || s === void 0 || de(s)) {
            r[o] = false;
            continue;
          }
          if (s === true) {
            u?.kind === "object" ? r[o] = xt({}, a) : r[o] = true;
            continue;
          }
          r[o] = xt(s, a);
        }
      }
      return r;
    }
    __name(sa, "sa");
    function di(e, t) {
      if (e === null) return null;
      if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") return e;
      if (typeof e == "bigint") return { $type: "BigInt", value: String(e) };
      if (je(e)) {
        if (Bt(e)) return { $type: "DateTime", value: e.toISOString() };
        t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
      }
      if (ze(e)) return { $type: "FieldRef", value: { _ref: e.name, _container: e.modelName } };
      if (Array.isArray(e)) return aa(e, t);
      if (ArrayBuffer.isView(e)) return { $type: "Bytes", value: b.from(e).toString("base64") };
      if (la(e)) return e.values;
      if (Qe(e)) return { $type: "Decimal", value: e.toFixed() };
      if (e instanceof xe) {
        if (e !== Wt.instances[e._getName()]) throw new Error("Invalid ObjectEnumValue");
        return { $type: "Enum", value: e._getName() };
      }
      if (ua(e)) return e.toJSON();
      if (typeof e == "object") return fi(e, t);
      t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(e)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
    }
    __name(di, "di");
    function fi(e, t) {
      if (e.$type) return { $type: "Raw", value: e };
      let r = {};
      for (let n in e) {
        let i = e[n], o = t.nestArgument(n);
        de(i) || (i !== void 0 ? r[n] = di(i, o) : t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: o.getArgumentPath(), selectionPath: t.getSelectionPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: pi }));
      }
      return r;
    }
    __name(fi, "fi");
    function aa(e, t) {
      let r = [];
      for (let n = 0; n < e.length; n++) {
        let i = t.nestArgument(String(n)), o = e[n];
        if (o === void 0 || de(o)) {
          let s = o === void 0 ? "undefined" : "Prisma.skip";
          t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: i.getSelectionPath(), argumentPath: i.getArgumentPath(), argument: { name: `${t.getArgumentName()}[${n}]`, typeNames: [] }, underlyingError: `Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values` });
        }
        r.push(di(o, i));
      }
      return r;
    }
    __name(aa, "aa");
    function la(e) {
      return typeof e == "object" && e !== null && e.__prismaRawParameters__ === true;
    }
    __name(la, "la");
    function ua(e) {
      return typeof e == "object" && e !== null && typeof e.toJSON == "function";
    }
    __name(ua, "ua");
    function Dr(e, t) {
      e === void 0 && t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: t.getSelectionPath(), underlyingError: pi });
    }
    __name(Dr, "Dr");
    var _r = class e {
      static {
        __name(this, "e");
      }
      constructor(t) {
        this.params = t;
        this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
      }
      throwValidationError(t) {
        zt({ errors: [t], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
      }
      getSelectionPath() {
        return this.params.selectionPath;
      }
      getArgumentPath() {
        return this.params.argumentPath;
      }
      getArgumentName() {
        return this.params.argumentPath[this.params.argumentPath.length - 1];
      }
      getOutputTypeDescription() {
        if (!(!this.params.modelName || !this.modelOrType)) return { name: this.params.modelName, fields: this.modelOrType.fields.map((t) => ({ name: t.name, typeName: "boolean", isRelation: t.kind === "object" })) };
      }
      isRawAction() {
        return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
      }
      isPreviewFeatureOn(t) {
        return this.params.previewFeatures.includes(t);
      }
      getComputedFields() {
        if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
      }
      findField(t) {
        return this.modelOrType?.fields.find((r) => r.name === t);
      }
      nestSelection(t) {
        let r = this.findField(t), n = r?.kind === "object" ? r.type : void 0;
        return new e({ ...this.params, modelName: n, selectionPath: this.params.selectionPath.concat(t) });
      }
      getGlobalOmit() {
        return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[Ve(this.params.modelName)] ?? {} : {};
      }
      shouldApplyGlobalOmit() {
        switch (this.params.action) {
          case "findFirst":
          case "findFirstOrThrow":
          case "findUniqueOrThrow":
          case "findMany":
          case "upsert":
          case "findUnique":
          case "createManyAndReturn":
          case "create":
          case "update":
          case "delete":
            return true;
          case "executeRaw":
          case "aggregateRaw":
          case "runCommandRaw":
          case "findRaw":
          case "createMany":
          case "deleteMany":
          case "groupBy":
          case "updateMany":
          case "count":
          case "aggregate":
          case "queryRaw":
            return false;
          default:
            be(this.params.action, "Unknown action");
        }
      }
      nestArgument(t) {
        return new e({ ...this.params, argumentPath: this.params.argumentPath.concat(t) });
      }
    };
    c2();
    m();
    p();
    d();
    f();
    l();
    var Ze = class {
      static {
        __name(this, "Ze");
      }
      constructor(t) {
        this._engine = t;
      }
      prometheus(t) {
        return this._engine.metrics({ format: "prometheus", ...t });
      }
      json(t) {
        return this._engine.metrics({ format: "json", ...t });
      }
    };
    c2();
    m();
    p();
    d();
    f();
    l();
    function gi(e) {
      return { models: Fr(e.models), enums: Fr(e.enums), types: Fr(e.types) };
    }
    __name(gi, "gi");
    function Fr(e) {
      let t = {};
      for (let { name: r, ...n } of e) t[r] = n;
      return t;
    }
    __name(Fr, "Fr");
    function hi(e, t) {
      let r = wt(() => ca(t));
      Object.defineProperty(e, "dmmf", { get: /* @__PURE__ */ __name(() => r.get(), "get") });
    }
    __name(hi, "hi");
    function ca(e) {
      throw new Error("Prisma.dmmf is not available when running in edge runtimes.");
    }
    __name(ca, "ca");
    c2();
    m();
    p();
    d();
    f();
    l();
    var Ur = /* @__PURE__ */ new WeakMap();
    var er = "$$PrismaTypedSql";
    var qr = class {
      static {
        __name(this, "qr");
      }
      constructor(t, r) {
        Ur.set(this, { sql: t, values: r }), Object.defineProperty(this, er, { value: er });
      }
      get sql() {
        return Ur.get(this).sql;
      }
      get values() {
        return Ur.get(this).values;
      }
    };
    function yi(e) {
      return (...t) => new qr(e, t);
    }
    __name(yi, "yi");
    function bi(e) {
      return e != null && e[er] === er;
    }
    __name(bi, "bi");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    function Pt(e) {
      return { ok: false, error: e, map() {
        return Pt(e);
      }, flatMap() {
        return Pt(e);
      } };
    }
    __name(Pt, "Pt");
    var Br = class {
      static {
        __name(this, "Br");
      }
      constructor() {
        this.registeredErrors = [];
      }
      consumeError(t) {
        return this.registeredErrors[t];
      }
      registerNewError(t) {
        let r = 0;
        for (; this.registeredErrors[r] !== void 0; ) r++;
        return this.registeredErrors[r] = { error: t }, r;
      }
    };
    var $r = /* @__PURE__ */ __name((e) => {
      let t = new Br(), r = fe(t, e.transactionContext.bind(e)), n = { adapterName: e.adapterName, errorRegistry: t, queryRaw: fe(t, e.queryRaw.bind(e)), executeRaw: fe(t, e.executeRaw.bind(e)), provider: e.provider, transactionContext: /* @__PURE__ */ __name(async (...i) => (await r(...i)).map((s) => ma(t, s)), "transactionContext") };
      return e.getConnectionInfo && (n.getConnectionInfo = da(t, e.getConnectionInfo.bind(e))), n;
    }, "$r");
    var ma = /* @__PURE__ */ __name((e, t) => {
      let r = fe(e, t.startTransaction.bind(t));
      return { adapterName: t.adapterName, provider: t.provider, queryRaw: fe(e, t.queryRaw.bind(t)), executeRaw: fe(e, t.executeRaw.bind(t)), startTransaction: /* @__PURE__ */ __name(async (...n) => (await r(...n)).map((o) => pa(e, o)), "startTransaction") };
    }, "ma");
    var pa = /* @__PURE__ */ __name((e, t) => ({ adapterName: t.adapterName, provider: t.provider, options: t.options, queryRaw: fe(e, t.queryRaw.bind(t)), executeRaw: fe(e, t.executeRaw.bind(t)), commit: fe(e, t.commit.bind(t)), rollback: fe(e, t.rollback.bind(t)) }), "pa");
    function fe(e, t) {
      return async (...r) => {
        try {
          return await t(...r);
        } catch (n) {
          let i = e.registerNewError(n);
          return Pt({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(fe, "fe");
    function da(e, t) {
      return (...r) => {
        try {
          return t(...r);
        } catch (n) {
          let i = e.registerNewError(n);
          return Pt({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(da, "da");
    var Lo = Fe(wi());
    var ek = Fe(Ei());
    Dn();
    bn();
    Ln();
    c2();
    m();
    p();
    d();
    f();
    l();
    var X = class e {
      static {
        __name(this, "e");
      }
      constructor(t, r) {
        if (t.length - 1 !== r.length) throw t.length === 0 ? new TypeError("Expected at least 1 string") : new TypeError(`Expected ${t.length} strings to have ${t.length - 1} values`);
        let n = r.reduce((s, a) => s + (a instanceof e ? a.values.length : 1), 0);
        this.values = new Array(n), this.strings = new Array(n + 1), this.strings[0] = t[0];
        let i = 0, o = 0;
        for (; i < r.length; ) {
          let s = r[i++], a = t[i];
          if (s instanceof e) {
            this.strings[o] += s.strings[0];
            let u = 0;
            for (; u < s.values.length; ) this.values[o++] = s.values[u++], this.strings[o] = s.strings[u];
            this.strings[o] += a;
          } else this.values[o++] = s, this.strings[o] = a;
        }
      }
      get sql() {
        let t = this.strings.length, r = 1, n = this.strings[0];
        for (; r < t; ) n += `?${this.strings[r++]}`;
        return n;
      }
      get statement() {
        let t = this.strings.length, r = 1, n = this.strings[0];
        for (; r < t; ) n += `:${r}${this.strings[r++]}`;
        return n;
      }
      get text() {
        let t = this.strings.length, r = 1, n = this.strings[0];
        for (; r < t; ) n += `$${r}${this.strings[r++]}`;
        return n;
      }
      inspect() {
        return { sql: this.sql, statement: this.statement, text: this.text, values: this.values };
      }
    };
    function xi(e, t = ",", r = "", n = "") {
      if (e.length === 0) throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
      return new X([r, ...Array(e.length - 1).fill(t), n], e);
    }
    __name(xi, "xi");
    function Vr(e) {
      return new X([e], []);
    }
    __name(Vr, "Vr");
    var Pi = Vr("");
    function jr(e, ...t) {
      return new X(e, t);
    }
    __name(jr, "jr");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    function vt(e) {
      return { getKeys() {
        return Object.keys(e);
      }, getPropertyValue(t) {
        return e[t];
      } };
    }
    __name(vt, "vt");
    c2();
    m();
    p();
    d();
    f();
    l();
    function H(e, t) {
      return { getKeys() {
        return [e];
      }, getPropertyValue() {
        return t();
      } };
    }
    __name(H, "H");
    c2();
    m();
    p();
    d();
    f();
    l();
    function Ie(e) {
      let t = new me();
      return { getKeys() {
        return e.getKeys();
      }, getPropertyValue(r) {
        return t.getOrCreate(r, () => e.getPropertyValue(r));
      }, getPropertyDescriptor(r) {
        return e.getPropertyDescriptor?.(r);
      } };
    }
    __name(Ie, "Ie");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    var tr = { enumerable: true, configurable: true, writable: true };
    function rr(e) {
      let t = new Set(e);
      return { getOwnPropertyDescriptor: /* @__PURE__ */ __name(() => tr, "getOwnPropertyDescriptor"), has: /* @__PURE__ */ __name((r, n) => t.has(n), "has"), set: /* @__PURE__ */ __name((r, n, i) => t.add(n) && Reflect.set(r, n, i), "set"), ownKeys: /* @__PURE__ */ __name(() => [...t], "ownKeys") };
    }
    __name(rr, "rr");
    var vi = Symbol.for("nodejs.util.inspect.custom");
    function ge(e, t) {
      let r = ga(t), n = /* @__PURE__ */ new Set(), i = new Proxy(e, { get(o, s) {
        if (n.has(s)) return o[s];
        let a = r.get(s);
        return a ? a.getPropertyValue(s) : o[s];
      }, has(o, s) {
        if (n.has(s)) return true;
        let a = r.get(s);
        return a ? a.has?.(s) ?? true : Reflect.has(o, s);
      }, ownKeys(o) {
        let s = Ti(Reflect.ownKeys(o), r), a = Ti(Array.from(r.keys()), r);
        return [.../* @__PURE__ */ new Set([...s, ...a, ...n])];
      }, set(o, s, a) {
        return r.get(s)?.getPropertyDescriptor?.(s)?.writable === false ? false : (n.add(s), Reflect.set(o, s, a));
      }, getOwnPropertyDescriptor(o, s) {
        let a = Reflect.getOwnPropertyDescriptor(o, s);
        if (a && !a.configurable) return a;
        let u = r.get(s);
        return u ? u.getPropertyDescriptor ? { ...tr, ...u?.getPropertyDescriptor(s) } : tr : a;
      }, defineProperty(o, s, a) {
        return n.add(s), Reflect.defineProperty(o, s, a);
      } });
      return i[vi] = function() {
        let o = { ...this };
        return delete o[vi], o;
      }, i;
    }
    __name(ge, "ge");
    function ga(e) {
      let t = /* @__PURE__ */ new Map();
      for (let r of e) {
        let n = r.getKeys();
        for (let i of n) t.set(i, r);
      }
      return t;
    }
    __name(ga, "ga");
    function Ti(e, t) {
      return e.filter((r) => t.get(r)?.has?.(r) ?? true);
    }
    __name(Ti, "Ti");
    c2();
    m();
    p();
    d();
    f();
    l();
    function et(e) {
      return { getKeys() {
        return e;
      }, has() {
        return false;
      }, getPropertyValue() {
      } };
    }
    __name(et, "et");
    c2();
    m();
    p();
    d();
    f();
    l();
    function nr(e, t) {
      return { batch: e, transaction: t?.kind === "batch" ? { isolationLevel: t.options.isolationLevel } : void 0 };
    }
    __name(nr, "nr");
    c2();
    m();
    p();
    d();
    f();
    l();
    function Ci(e) {
      if (e === void 0) return "";
      let t = Ye(e);
      return new Ge(0, { colors: Qt }).write(t).toString();
    }
    __name(Ci, "Ci");
    c2();
    m();
    p();
    d();
    f();
    l();
    var ha = "P2037";
    function ir({ error: e, user_facing_error: t }, r, n) {
      return t.error_code ? new J(ya(t, n), { code: t.error_code, clientVersion: r, meta: t.meta, batchRequestIdx: t.batch_request_idx }) : new G(e, { clientVersion: r, batchRequestIdx: t.batch_request_idx });
    }
    __name(ir, "ir");
    function ya(e, t) {
      let r = e.message;
      return (t === "postgresql" || t === "postgres" || t === "mysql") && e.error_code === ha && (r += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), r;
    }
    __name(ya, "ya");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    var Qr = class {
      static {
        __name(this, "Qr");
      }
      getLocation() {
        return null;
      }
    };
    function Te(e) {
      return typeof $EnabledCallSite == "function" && e !== "minimal" ? new $EnabledCallSite() : new Qr();
    }
    __name(Te, "Te");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    var Ri = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
    function tt(e = {}) {
      let t = wa(e);
      return Object.entries(t).reduce((n, [i, o]) => (Ri[i] !== void 0 ? n.select[i] = { select: o } : n[i] = o, n), { select: {} });
    }
    __name(tt, "tt");
    function wa(e = {}) {
      return typeof e._count == "boolean" ? { ...e, _count: { _all: e._count } } : e;
    }
    __name(wa, "wa");
    function or(e = {}) {
      return (t) => (typeof e._count == "boolean" && (t._count = t._count._all), t);
    }
    __name(or, "or");
    function Ai(e, t) {
      let r = or(e);
      return t({ action: "aggregate", unpacker: r, argsMapper: tt })(e);
    }
    __name(Ai, "Ai");
    c2();
    m();
    p();
    d();
    f();
    l();
    function Ea(e = {}) {
      let { select: t, ...r } = e;
      return typeof t == "object" ? tt({ ...r, _count: t }) : tt({ ...r, _count: { _all: true } });
    }
    __name(Ea, "Ea");
    function xa(e = {}) {
      return typeof e.select == "object" ? (t) => or(e)(t)._count : (t) => or(e)(t)._count._all;
    }
    __name(xa, "xa");
    function Si(e, t) {
      return t({ action: "count", unpacker: xa(e), argsMapper: Ea })(e);
    }
    __name(Si, "Si");
    c2();
    m();
    p();
    d();
    f();
    l();
    function Pa(e = {}) {
      let t = tt(e);
      if (Array.isArray(t.by)) for (let r of t.by) typeof r == "string" && (t.select[r] = true);
      else typeof t.by == "string" && (t.select[t.by] = true);
      return t;
    }
    __name(Pa, "Pa");
    function va(e = {}) {
      return (t) => (typeof e?._count == "boolean" && t.forEach((r) => {
        r._count = r._count._all;
      }), t);
    }
    __name(va, "va");
    function Oi(e, t) {
      return t({ action: "groupBy", unpacker: va(e), argsMapper: Pa })(e);
    }
    __name(Oi, "Oi");
    function ki(e, t, r) {
      if (t === "aggregate") return (n) => Ai(n, r);
      if (t === "count") return (n) => Si(n, r);
      if (t === "groupBy") return (n) => Oi(n, r);
    }
    __name(ki, "ki");
    c2();
    m();
    p();
    d();
    f();
    l();
    function Mi(e, t) {
      let r = t.fields.filter((i) => !i.relationName), n = Sr(r, (i) => i.name);
      return new Proxy({}, { get(i, o) {
        if (o in i || typeof o == "symbol") return i[o];
        let s = n[o];
        if (s) return new ft(e, o, s.type, s.isList, s.kind === "enum");
      }, ...rr(Object.keys(n)) });
    }
    __name(Mi, "Mi");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    var Ii = /* @__PURE__ */ __name((e) => Array.isArray(e) ? e : e.split("."), "Ii");
    var Jr = /* @__PURE__ */ __name((e, t) => Ii(t).reduce((r, n) => r && r[n], e), "Jr");
    var Li = /* @__PURE__ */ __name((e, t, r) => Ii(t).reduceRight((n, i, o, s) => Object.assign({}, Jr(e, s.slice(0, o)), { [i]: n }), r), "Li");
    function Ta(e, t) {
      return e === void 0 || t === void 0 ? [] : [...t, "select", e];
    }
    __name(Ta, "Ta");
    function Ca(e, t, r) {
      return t === void 0 ? e ?? {} : Li(t, r, e || true);
    }
    __name(Ca, "Ca");
    function Gr(e, t, r, n, i, o) {
      let a = e._runtimeDataModel.models[t].fields.reduce((u, g) => ({ ...u, [g.name]: g }), {});
      return (u) => {
        let g = Te(e._errorFormat), T = Ta(n, i), C = Ca(u, o, T), O = r({ dataPath: T, callsite: g })(C), A = Ra(e, t);
        return new Proxy(O, { get(M, S) {
          if (!A.includes(S)) return M[S];
          let ne = [a[S].type, r, S], z = [T, C];
          return Gr(e, ...ne, ...z);
        }, ...rr([...A, ...Object.getOwnPropertyNames(O)]) });
      };
    }
    __name(Gr, "Gr");
    function Ra(e, t) {
      return e._runtimeDataModel.models[t].fields.filter((r) => r.kind === "object").map((r) => r.name);
    }
    __name(Ra, "Ra");
    c2();
    m();
    p();
    d();
    f();
    l();
    function _i(e, t, r, n) {
      return e === Me.ModelAction.findFirstOrThrow || e === Me.ModelAction.findUniqueOrThrow ? Aa(t, r, n) : n;
    }
    __name(_i, "_i");
    function Aa(e, t, r) {
      return async (n) => {
        if ("rejectOnNotFound" in n.args) {
          let o = Je({ originalMethod: n.clientMethod, callsite: n.callsite, message: "'rejectOnNotFound' option is not supported" });
          throw new j(o, { clientVersion: t });
        }
        return await r(n).catch((o) => {
          throw o instanceof J && o.code === "P2025" ? new we(`No ${e} found`, t) : o;
        });
      };
    }
    __name(Aa, "Aa");
    var Sa = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"];
    var Oa = ["aggregate", "count", "groupBy"];
    function Wr(e, t) {
      let r = e._extensions.getAllModelExtensions(t) ?? {}, n = [ka(e, t), Ia(e, t), vt(r), H("name", () => t), H("$name", () => t), H("$parent", () => e._appliedParent)];
      return ge({}, n);
    }
    __name(Wr, "Wr");
    function ka(e, t) {
      let r = pe(t), n = Object.keys(Me.ModelAction).concat("count");
      return { getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = i, s = /* @__PURE__ */ __name((u) => e._request(u), "s");
        s = _i(o, t, e._clientVersion, s);
        let a = /* @__PURE__ */ __name((u) => (g) => {
          let T = Te(e._errorFormat);
          return e._createPrismaPromise((C) => {
            let O = { args: g, dataPath: [], action: o, model: t, clientMethod: `${r}.${i}`, jsModelName: r, transaction: C, callsite: T };
            return s({ ...O, ...u });
          });
        }, "a");
        return Sa.includes(o) ? Gr(e, t, a) : Ma(i) ? ki(e, i, a) : a({});
      } };
    }
    __name(ka, "ka");
    function Ma(e) {
      return Oa.includes(e);
    }
    __name(Ma, "Ma");
    function Ia(e, t) {
      return Ie(H("fields", () => {
        let r = e._runtimeDataModel.models[t];
        return Mi(t, r);
      }));
    }
    __name(Ia, "Ia");
    c2();
    m();
    p();
    d();
    f();
    l();
    function Di(e) {
      return e.replace(/^./, (t) => t.toUpperCase());
    }
    __name(Di, "Di");
    var Kr = Symbol();
    function Tt(e) {
      let t = [La(e), H(Kr, () => e), H("$parent", () => e._appliedParent)], r = e._extensions.getAllClientExtensions();
      return r && t.push(vt(r)), ge(e, t);
    }
    __name(Tt, "Tt");
    function La(e) {
      let t = Object.keys(e._runtimeDataModel.models), r = t.map(pe), n = [...new Set(t.concat(r))];
      return Ie({ getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = Di(i);
        if (e._runtimeDataModel.models[o] !== void 0) return Wr(e, o);
        if (e._runtimeDataModel.models[i] !== void 0) return Wr(e, i);
      }, getPropertyDescriptor(i) {
        if (!r.includes(i)) return { enumerable: false };
      } });
    }
    __name(La, "La");
    function Fi(e) {
      return e[Kr] ? e[Kr] : e;
    }
    __name(Fi, "Fi");
    function Ni(e) {
      if (typeof e == "function") return e(this);
      if (e.client?.__AccelerateEngine) {
        let r = e.client.__AccelerateEngine;
        this._originalClient._engine = new r(this._originalClient._accelerateEngineConfig);
      }
      let t = Object.create(this._originalClient, { _extensions: { value: this._extensions.append(e) }, _appliedParent: { value: this, configurable: true }, $use: { value: void 0 }, $on: { value: void 0 } });
      return Tt(t);
    }
    __name(Ni, "Ni");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    function Ui({ result: e, modelName: t, select: r, omit: n, extensions: i }) {
      let o = i.getAllComputedFields(t);
      if (!o) return e;
      let s = [], a = [];
      for (let u of Object.values(o)) {
        if (n) {
          if (n[u.name]) continue;
          let g = u.needs.filter((T) => n[T]);
          g.length > 0 && a.push(et(g));
        } else if (r) {
          if (!r[u.name]) continue;
          let g = u.needs.filter((T) => !r[T]);
          g.length > 0 && a.push(et(g));
        }
        _a(e, u.needs) && s.push(Da(u, ge(e, s)));
      }
      return s.length > 0 || a.length > 0 ? ge(e, [...s, ...a]) : e;
    }
    __name(Ui, "Ui");
    function _a(e, t) {
      return t.every((r) => Ar(e, r));
    }
    __name(_a, "_a");
    function Da(e, t) {
      return Ie(H(e.name, () => e.compute(t)));
    }
    __name(Da, "Da");
    c2();
    m();
    p();
    d();
    f();
    l();
    function sr({ visitor: e, result: t, args: r, runtimeDataModel: n, modelName: i }) {
      if (Array.isArray(t)) {
        for (let s = 0; s < t.length; s++) t[s] = sr({ result: t[s], args: r, modelName: i, runtimeDataModel: n, visitor: e });
        return t;
      }
      let o = e(t, i, r) ?? t;
      return r.include && qi({ includeOrSelect: r.include, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), r.select && qi({ includeOrSelect: r.select, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), o;
    }
    __name(sr, "sr");
    function qi({ includeOrSelect: e, result: t, parentModelName: r, runtimeDataModel: n, visitor: i }) {
      for (let [o, s] of Object.entries(e)) {
        if (!s || t[o] == null || de(s)) continue;
        let u = n.models[r].fields.find((T) => T.name === o);
        if (!u || u.kind !== "object" || !u.relationName) continue;
        let g = typeof s == "object" ? s : {};
        t[o] = sr({ visitor: i, result: t[o], args: g, modelName: u.type, runtimeDataModel: n });
      }
    }
    __name(qi, "qi");
    function Bi({ result: e, modelName: t, args: r, extensions: n, runtimeDataModel: i, globalOmit: o }) {
      return n.isEmpty() || e == null || typeof e != "object" || !i.models[t] ? e : sr({ result: e, args: r ?? {}, modelName: t, runtimeDataModel: i, visitor: /* @__PURE__ */ __name((a, u, g) => {
        let T = pe(u);
        return Ui({ result: a, modelName: T, select: g.select, omit: g.select ? void 0 : { ...o?.[T], ...g.omit }, extensions: n });
      }, "visitor") });
    }
    __name(Bi, "Bi");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    l();
    function $i(e) {
      if (e instanceof X) return Fa(e);
      if (Array.isArray(e)) {
        let r = [e[0]];
        for (let n = 1; n < e.length; n++) r[n] = Ct(e[n]);
        return r;
      }
      let t = {};
      for (let r in e) t[r] = Ct(e[r]);
      return t;
    }
    __name($i, "$i");
    function Fa(e) {
      return new X(e.strings, e.values);
    }
    __name(Fa, "Fa");
    function Ct(e) {
      if (typeof e != "object" || e == null || e instanceof xe || ze(e)) return e;
      if (Qe(e)) return new ue(e.toFixed());
      if (je(e)) return /* @__PURE__ */ new Date(+e);
      if (ArrayBuffer.isView(e)) return e.slice(0);
      if (Array.isArray(e)) {
        let t = e.length, r;
        for (r = Array(t); t--; ) r[t] = Ct(e[t]);
        return r;
      }
      if (typeof e == "object") {
        let t = {};
        for (let r in e) r === "__proto__" ? Object.defineProperty(t, r, { value: Ct(e[r]), configurable: true, enumerable: true, writable: true }) : t[r] = Ct(e[r]);
        return t;
      }
      be(e, "Unknown value");
    }
    __name(Ct, "Ct");
    function ji(e, t, r, n = 0) {
      return e._createPrismaPromise((i) => {
        let o = t.customDataProxyFetch;
        return "transaction" in t && i !== void 0 && (t.transaction?.kind === "batch" && t.transaction.lock.then(), t.transaction = i), n === r.length ? e._executeRequest(t) : r[n]({ model: t.model, operation: t.model ? t.action : t.clientMethod, args: $i(t.args ?? {}), __internalParams: t, query: /* @__PURE__ */ __name((s, a = t) => {
          let u = a.customDataProxyFetch;
          return a.customDataProxyFetch = Wi(o, u), a.args = s, ji(e, a, r, n + 1);
        }, "query") });
      });
    }
    __name(ji, "ji");
    function Qi(e, t) {
      let { jsModelName: r, action: n, clientMethod: i } = t, o = r ? n : i;
      if (e._extensions.isEmpty()) return e._executeRequest(t);
      let s = e._extensions.getAllQueryCallbacks(r ?? "$none", o);
      return ji(e, t, s);
    }
    __name(Qi, "Qi");
    function Ji(e) {
      return (t) => {
        let r = { requests: t }, n = t[0].extensions.getAllBatchQueryCallbacks();
        return n.length ? Gi(r, n, 0, e) : e(r);
      };
    }
    __name(Ji, "Ji");
    function Gi(e, t, r, n) {
      if (r === t.length) return n(e);
      let i = e.customDataProxyFetch, o = e.requests[0].transaction;
      return t[r]({ args: { queries: e.requests.map((s) => ({ model: s.modelName, operation: s.action, args: s.args })), transaction: o ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 } : void 0 }, __internalParams: e, query(s, a = e) {
        let u = a.customDataProxyFetch;
        return a.customDataProxyFetch = Wi(i, u), Gi(a, t, r + 1, n);
      } });
    }
    __name(Gi, "Gi");
    var Vi = /* @__PURE__ */ __name((e) => e, "Vi");
    function Wi(e = Vi, t = Vi) {
      return (r) => e(t(r));
    }
    __name(Wi, "Wi");
    c2();
    m();
    p();
    d();
    f();
    l();
    var Ki = ee("prisma:client");
    var Hi = { Vercel: "vercel", "Netlify CI": "netlify" };
    function zi({ postinstall: e, ciName: t, clientVersion: r }) {
      if (Ki("checkPlatformCaching:postinstall", e), Ki("checkPlatformCaching:ciName", t), e === true && t && t in Hi) {
        let n = `Prisma has detected that this project was built on ${t}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${Hi[t]}-build`;
        throw console.error(n), new L(n, r);
      }
    }
    __name(zi, "zi");
    c2();
    m();
    p();
    d();
    f();
    l();
    function Yi(e, t) {
      return e ? e.datasources ? e.datasources : e.datasourceUrl ? { [t[0]]: { url: e.datasourceUrl } } : {} : {};
    }
    __name(Yi, "Yi");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    var Na = "Cloudflare-Workers";
    var Ua = "node";
    function Xi() {
      return typeof Netlify == "object" ? "netlify" : typeof EdgeRuntime == "string" ? "edge-light" : globalThis.navigator?.userAgent === Na ? "workerd" : globalThis.Deno ? "deno" : globalThis.__lagon__ ? "lagon" : globalThis.process?.release?.name === Ua ? "node" : globalThis.Bun ? "bun" : globalThis.fastly ? "fastly" : "unknown";
    }
    __name(Xi, "Xi");
    var qa = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
    function Ce() {
      let e = Xi();
      return { id: e, prettyName: qa[e] || e, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e) };
    }
    __name(Ce, "Ce");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    function ar({ inlineDatasources: e, overrideDatasources: t, env: r, clientVersion: n }) {
      let i, o = Object.keys(e)[0], s = e[o]?.url, a = t[o]?.url;
      if (o === void 0 ? i = void 0 : a ? i = a : s?.value ? i = s.value : s?.fromEnvVar && (i = r[s.fromEnvVar]), s?.fromEnvVar !== void 0 && i === void 0) throw Ce().id === "workerd" ? new L(`error: Environment variable not found: ${s.fromEnvVar}.

In Cloudflare module Workers, environment variables are available only in the Worker's \`env\` parameter of \`fetch\`.
To solve this, provide the connection string directly: https://pris.ly/d/cloudflare-datasource-url`, n) : new L(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
      if (i === void 0) throw new L("error: Missing URL environment variable, value, or override.", n);
      return i;
    }
    __name(ar, "ar");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    function Zi(e) {
      if (e?.kind === "itx") return e.options.id;
    }
    __name(Zi, "Zi");
    c2();
    m();
    p();
    d();
    f();
    l();
    var Hr;
    var eo = { async loadLibrary(e) {
      let { clientVersion: t, adapter: r, engineWasm: n } = e;
      if (r === void 0) throw new L(`The \`adapter\` option for \`PrismaClient\` is required in this context (${Ce().prettyName})`, t);
      if (n === void 0) throw new L("WASM engine was unexpectedly `undefined`", t);
      Hr === void 0 && (Hr = (async () => {
        let o = n.getRuntime(), s = await n.getQueryEngineWasmModule();
        if (s == null) throw new L("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", t);
        let a = { "./query_engine_bg.js": o }, u = new WebAssembly.Instance(s, a);
        return o.__wbg_set_wasm(u.exports), o.QueryEngine;
      })());
      let i = await Hr;
      return { debugPanic() {
        return Promise.reject("{}");
      }, dmmf() {
        return Promise.resolve("{}");
      }, version() {
        return { commit: "unknown", version: "unknown" };
      }, QueryEngine: i };
    } };
    var Ba = "P2036";
    var he = ee("prisma:client:libraryEngine");
    function $a(e) {
      return e.item_type === "query" && "query" in e;
    }
    __name($a, "$a");
    function Va(e) {
      return "level" in e ? e.level === "error" && e.message === "PANIC" : false;
    }
    __name(Va, "Va");
    var VR = [...Cr, "native"];
    var Rt = class {
      static {
        __name(this, "Rt");
      }
      constructor(t, r) {
        this.name = "LibraryEngine";
        this.libraryLoader = r ?? eo, this.config = t, this.libraryStarted = false, this.logQueries = t.logQueries ?? false, this.logLevel = t.logLevel ?? "error", this.logEmitter = t.logEmitter, this.datamodel = t.inlineSchema, t.enableDebugLogs && (this.logLevel = "debug");
        let n = Object.keys(t.overrideDatasources)[0], i = t.overrideDatasources[n]?.url;
        n !== void 0 && i !== void 0 && (this.datasourceOverrides = { [n]: i }), this.libraryInstantiationPromise = this.instantiateLibrary();
      }
      async applyPendingMigrations() {
        throw new Error("Cannot call this method from this type of engine instance");
      }
      async transaction(t, r, n) {
        await this.start();
        let i = JSON.stringify(r), o;
        if (t === "start") {
          let a = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel });
          o = await this.engine?.startTransaction(a, i);
        } else t === "commit" ? o = await this.engine?.commitTransaction(n.id, i) : t === "rollback" && (o = await this.engine?.rollbackTransaction(n.id, i));
        let s = this.parseEngineResponse(o);
        if (ja(s)) {
          let a = this.getExternalAdapterError(s);
          throw a ? a.error : new J(s.message, { code: s.error_code, clientVersion: this.config.clientVersion, meta: s.meta });
        }
        return s;
      }
      async instantiateLibrary() {
        if (he("internalSetup"), this.libraryInstantiationPromise) return this.libraryInstantiationPromise;
        this.binaryTarget = await this.getCurrentBinaryTarget(), await this.loadEngine(), this.version();
      }
      async getCurrentBinaryTarget() {
      }
      parseEngineResponse(t) {
        if (!t) throw new G("Response from the Engine was empty", { clientVersion: this.config.clientVersion });
        try {
          return JSON.parse(t);
        } catch {
          throw new G("Unable to JSON.parse response from engine", { clientVersion: this.config.clientVersion });
        }
      }
      async loadEngine() {
        if (!this.engine) {
          this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
          try {
            let t = new w(this), { adapter: r } = this.config;
            r && he("Using driver adapter: %O", r), this.engine = new this.QueryEngineConstructor({ datamodel: this.datamodel, env: h.env, logQueries: this.config.logQueries ?? false, ignoreEnvVarErrors: true, datasourceOverrides: this.datasourceOverrides ?? {}, logLevel: this.logLevel, configDir: this.config.cwd, engineProtocol: "json" }, (n) => {
              t.deref()?.logger(n);
            }, r);
          } catch (t) {
            let r = t, n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new L(n.message, this.config.clientVersion, n.error_code);
          }
        }
      }
      logger(t) {
        let r = this.parseEngineResponse(t);
        if (r) {
          if ("span" in r) {
            this.config.tracingHelper.createEngineSpan(r);
            return;
          }
          r.level = r?.level.toLowerCase() ?? "unknown", $a(r) ? this.logEmitter.emit("query", { timestamp: /* @__PURE__ */ new Date(), query: r.query, params: r.params, duration: Number(r.duration_ms), target: r.module_path }) : (Va(r), this.logEmitter.emit(r.level, { timestamp: /* @__PURE__ */ new Date(), message: r.message, target: r.module_path }));
        }
      }
      parseInitError(t) {
        try {
          return JSON.parse(t);
        } catch {
        }
        return t;
      }
      parseRequestError(t) {
        try {
          return JSON.parse(t);
        } catch {
        }
        return t;
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
      }
      async start() {
        if (await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise) return he(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
        if (this.libraryStarted) return;
        let t = /* @__PURE__ */ __name(async () => {
          he("library starting");
          try {
            let r = { traceparent: this.config.tracingHelper.getTraceParent() };
            await this.engine?.connect(JSON.stringify(r)), this.libraryStarted = true, he("library started");
          } catch (r) {
            let n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new L(n.message, this.config.clientVersion, n.error_code);
          } finally {
            this.libraryStartingPromise = void 0;
          }
        }, "t");
        return this.libraryStartingPromise = this.config.tracingHelper.runInChildSpan("connect", t), this.libraryStartingPromise;
      }
      async stop() {
        if (await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise) return he("library is already stopping"), this.libraryStoppingPromise;
        if (!this.libraryStarted) return;
        let t = /* @__PURE__ */ __name(async () => {
          await new Promise((n) => setTimeout(n, 5)), he("library stopping");
          let r = { traceparent: this.config.tracingHelper.getTraceParent() };
          await this.engine?.disconnect(JSON.stringify(r)), this.libraryStarted = false, this.libraryStoppingPromise = void 0, he("library stopped");
        }, "t");
        return this.libraryStoppingPromise = this.config.tracingHelper.runInChildSpan("disconnect", t), this.libraryStoppingPromise;
      }
      version() {
        return this.versionInfo = this.library?.version(), this.versionInfo?.version ?? "unknown";
      }
      debugPanic(t) {
        return this.library?.debugPanic(t);
      }
      async request(t, { traceparent: r, interactiveTransaction: n }) {
        he(`sending request, this.libraryStarted: ${this.libraryStarted}`);
        let i = JSON.stringify({ traceparent: r }), o = JSON.stringify(t);
        try {
          await this.start(), this.executingQueryPromise = this.engine?.query(o, i, n?.id), this.lastQuery = o;
          let s = this.parseEngineResponse(await this.executingQueryPromise);
          if (s.errors) throw s.errors.length === 1 ? this.buildQueryError(s.errors[0]) : new G(JSON.stringify(s.errors), { clientVersion: this.config.clientVersion });
          if (this.loggerRustPanic) throw this.loggerRustPanic;
          return { data: s, elapsed: 0 };
        } catch (s) {
          if (s instanceof L) throw s;
          s.code === "GenericFailure" && s.message?.startsWith("PANIC:");
          let a = this.parseRequestError(s.message);
          throw typeof a == "string" ? s : new G(`${a.message}
${a.backtrace}`, { clientVersion: this.config.clientVersion });
        }
      }
      async requestBatch(t, { transaction: r, traceparent: n }) {
        he("requestBatch");
        let i = nr(t, r);
        await this.start(), this.lastQuery = JSON.stringify(i), this.executingQueryPromise = this.engine.query(this.lastQuery, JSON.stringify({ traceparent: n }), Zi(r));
        let o = await this.executingQueryPromise, s = this.parseEngineResponse(o);
        if (s.errors) throw s.errors.length === 1 ? this.buildQueryError(s.errors[0]) : new G(JSON.stringify(s.errors), { clientVersion: this.config.clientVersion });
        let { batchResult: a, errors: u } = s;
        if (Array.isArray(a)) return a.map((g) => g.errors && g.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(g.errors[0]) : { data: g, elapsed: 0 });
        throw u && u.length === 1 ? new Error(u[0].error) : new Error(JSON.stringify(s));
      }
      buildQueryError(t) {
        t.user_facing_error.is_panic;
        let r = this.getExternalAdapterError(t.user_facing_error);
        return r ? r.error : ir(t, this.config.clientVersion, this.config.activeProvider);
      }
      getExternalAdapterError(t) {
        if (t.error_code === Ba && this.config.adapter) {
          let r = t.meta?.id;
          qt(typeof r == "number", "Malformed external JS error received from the engine");
          let n = this.config.adapter.errorRegistry.consumeError(r);
          return qt(n, "External error with reported id was not registered"), n;
        }
      }
      async metrics(t) {
        await this.start();
        let r = await this.engine.metrics(JSON.stringify(t));
        return t.format === "prometheus" ? r : this.parseEngineResponse(r);
      }
    };
    function ja(e) {
      return typeof e == "object" && e !== null && e.error_code !== void 0;
    }
    __name(ja, "ja");
    c2();
    m();
    p();
    d();
    f();
    l();
    var At = "Accelerate has not been setup correctly. Make sure your client is using `.$extends(withAccelerate())`. See https://pris.ly/d/accelerate-getting-started";
    var lr = class {
      static {
        __name(this, "lr");
      }
      constructor(t) {
        this.config = t;
        this.name = "AccelerateEngine";
        this.resolveDatasourceUrl = this.config.accelerateUtils?.resolveDatasourceUrl;
        this.getBatchRequestPayload = this.config.accelerateUtils?.getBatchRequestPayload;
        this.prismaGraphQLToJSError = this.config.accelerateUtils?.prismaGraphQLToJSError;
        this.PrismaClientUnknownRequestError = this.config.accelerateUtils?.PrismaClientUnknownRequestError;
        this.PrismaClientInitializationError = this.config.accelerateUtils?.PrismaClientInitializationError;
        this.PrismaClientKnownRequestError = this.config.accelerateUtils?.PrismaClientKnownRequestError;
        this.debug = this.config.accelerateUtils?.debug;
        this.engineVersion = this.config.accelerateUtils?.engineVersion;
        this.clientVersion = this.config.accelerateUtils?.clientVersion;
      }
      onBeforeExit(t) {
      }
      async start() {
      }
      async stop() {
      }
      version(t) {
        return "unknown";
      }
      transaction(t, r, n) {
        throw new L(At, this.config.clientVersion);
      }
      metrics(t) {
        throw new L(At, this.config.clientVersion);
      }
      request(t, r) {
        throw new L(At, this.config.clientVersion);
      }
      requestBatch(t, r) {
        throw new L(At, this.config.clientVersion);
      }
      applyPendingMigrations() {
        throw new L(At, this.config.clientVersion);
      }
    };
    function to({ copyEngine: e = true }, t) {
      let r;
      try {
        r = ar({ inlineDatasources: t.inlineDatasources, overrideDatasources: t.overrideDatasources, env: { ...t.env, ...h.env }, clientVersion: t.clientVersion });
      } catch {
      }
      let n = !!(r?.startsWith("prisma://") || r?.startsWith("prisma+postgres://"));
      e && n && ct("recommend--no-engine", "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)");
      let i = at(t.generator), o = n || !e, s = !!t.adapter, a = i === "library", u = i === "binary";
      if (o && s || s && false) {
        let g;
        throw e ? r?.startsWith("prisma://") ? g = ["Prisma Client was configured to use the `adapter` option but the URL was a `prisma://` URL.", "Please either use the `prisma://` URL or remove the `adapter` from the Prisma Client constructor."] : g = ["Prisma Client was configured to use both the `adapter` and Accelerate, please chose one."] : g = ["Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.", "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."], new j(g.join(`
`), { clientVersion: t.clientVersion });
      }
      if (s) return new Rt(t);
      if (o) return new lr(t);
      {
        let g = [`PrismaClient failed to initialize because it wasn't configured to run in this environment (${Ce().prettyName}).`, "In order to run Prisma Client in an edge runtime, you will need to configure one of the following options:", "- Enable Driver Adapters: https://pris.ly/d/driver-adapters", "- Enable Accelerate: https://pris.ly/d/accelerate"];
        throw new j(g.join(`
`), { clientVersion: t.clientVersion });
      }
      throw new j("Invalid client engine type, please use `library` or `binary`", { clientVersion: t.clientVersion });
    }
    __name(to, "to");
    c2();
    m();
    p();
    d();
    f();
    l();
    function ur({ generator: e }) {
      return e?.previewFeatures ?? [];
    }
    __name(ur, "ur");
    c2();
    m();
    p();
    d();
    f();
    l();
    var ro = /* @__PURE__ */ __name((e) => ({ command: e }), "ro");
    c2();
    m();
    p();
    d();
    f();
    l();
    c2();
    m();
    p();
    d();
    f();
    l();
    var no = /* @__PURE__ */ __name((e) => e.strings.reduce((t, r, n) => `${t}@P${n}${r}`), "no");
    c2();
    m();
    p();
    d();
    f();
    l();
    l();
    function rt(e) {
      try {
        return io(e, "fast");
      } catch {
        return io(e, "slow");
      }
    }
    __name(rt, "rt");
    function io(e, t) {
      return JSON.stringify(e.map((r) => so(r, t)));
    }
    __name(io, "io");
    function so(e, t) {
      return Array.isArray(e) ? e.map((r) => so(r, t)) : typeof e == "bigint" ? { prisma__type: "bigint", prisma__value: e.toString() } : je(e) ? { prisma__type: "date", prisma__value: e.toJSON() } : ue.isDecimal(e) ? { prisma__type: "decimal", prisma__value: e.toJSON() } : b.isBuffer(e) ? { prisma__type: "bytes", prisma__value: e.toString("base64") } : Qa(e) || ArrayBuffer.isView(e) ? { prisma__type: "bytes", prisma__value: b.from(e).toString("base64") } : typeof e == "object" && t === "slow" ? ao(e) : e;
    }
    __name(so, "so");
    function Qa(e) {
      return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer ? true : typeof e == "object" && e !== null ? e[Symbol.toStringTag] === "ArrayBuffer" || e[Symbol.toStringTag] === "SharedArrayBuffer" : false;
    }
    __name(Qa, "Qa");
    function ao(e) {
      if (typeof e != "object" || e === null) return e;
      if (typeof e.toJSON == "function") return e.toJSON();
      if (Array.isArray(e)) return e.map(oo);
      let t = {};
      for (let r of Object.keys(e)) t[r] = oo(e[r]);
      return t;
    }
    __name(ao, "ao");
    function oo(e) {
      return typeof e == "bigint" ? e.toString() : ao(e);
    }
    __name(oo, "oo");
    c2();
    m();
    p();
    d();
    f();
    l();
    var Ja = ["$connect", "$disconnect", "$on", "$transaction", "$use", "$extends"];
    var lo = Ja;
    var Ga = /^(\s*alter\s)/i;
    var uo = ee("prisma:client");
    function zr(e, t, r, n) {
      if (!(e !== "postgresql" && e !== "cockroachdb") && r.length > 0 && Ga.exec(t)) throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
    }
    __name(zr, "zr");
    var Yr = /* @__PURE__ */ __name(({ clientMethod: e, activeProvider: t }) => (r) => {
      let n = "", i;
      if (bi(r)) n = r.sql, i = { values: rt(r.values), __prismaRawParameters__: true };
      else if (Array.isArray(r)) {
        let [o, ...s] = r;
        n = o, i = { values: rt(s || []), __prismaRawParameters__: true };
      } else switch (t) {
        case "sqlite":
        case "mysql": {
          n = r.sql, i = { values: rt(r.values), __prismaRawParameters__: true };
          break;
        }
        case "cockroachdb":
        case "postgresql":
        case "postgres": {
          n = r.text, i = { values: rt(r.values), __prismaRawParameters__: true };
          break;
        }
        case "sqlserver": {
          n = no(r), i = { values: rt(r.values), __prismaRawParameters__: true };
          break;
        }
        default:
          throw new Error(`The ${t} provider does not support ${e}`);
      }
      return i?.values ? uo(`prisma.${e}(${n}, ${i.values})`) : uo(`prisma.${e}(${n})`), { query: n, parameters: i };
    }, "Yr");
    var co = { requestArgsToMiddlewareArgs(e) {
      return [e.strings, ...e.values];
    }, middlewareArgsToRequestArgs(e) {
      let [t, ...r] = e;
      return new X(t, r);
    } };
    var mo = { requestArgsToMiddlewareArgs(e) {
      return [e];
    }, middlewareArgsToRequestArgs(e) {
      return e[0];
    } };
    c2();
    m();
    p();
    d();
    f();
    l();
    function Xr(e) {
      return function(r) {
        let n, i = /* @__PURE__ */ __name((o = e) => {
          try {
            return o === void 0 || o?.kind === "itx" ? n ??= po(r(o)) : po(r(o));
          } catch (s) {
            return Promise.reject(s);
          }
        }, "i");
        return { then(o, s) {
          return i().then(o, s);
        }, catch(o) {
          return i().catch(o);
        }, finally(o) {
          return i().finally(o);
        }, requestTransaction(o) {
          let s = i(o);
          return s.requestTransaction ? s.requestTransaction(o) : s;
        }, [Symbol.toStringTag]: "PrismaPromise" };
      };
    }
    __name(Xr, "Xr");
    function po(e) {
      return typeof e.then == "function" ? e : Promise.resolve(e);
    }
    __name(po, "po");
    c2();
    m();
    p();
    d();
    f();
    l();
    var fo = { isEnabled() {
      return false;
    }, getTraceParent() {
      return "00-10-10-00";
    }, async createEngineSpan() {
    }, getActiveContext() {
    }, runInChildSpan(e, t) {
      return t();
    } };
    var Zr = class {
      static {
        __name(this, "Zr");
      }
      isEnabled() {
        return this.getGlobalTracingHelper().isEnabled();
      }
      getTraceParent(t) {
        return this.getGlobalTracingHelper().getTraceParent(t);
      }
      createEngineSpan(t) {
        return this.getGlobalTracingHelper().createEngineSpan(t);
      }
      getActiveContext() {
        return this.getGlobalTracingHelper().getActiveContext();
      }
      runInChildSpan(t, r) {
        return this.getGlobalTracingHelper().runInChildSpan(t, r);
      }
      getGlobalTracingHelper() {
        return globalThis.PRISMA_INSTRUMENTATION?.helper ?? fo;
      }
    };
    function go(e) {
      return e.includes("tracing") ? new Zr() : fo;
    }
    __name(go, "go");
    c2();
    m();
    p();
    d();
    f();
    l();
    function ho(e, t = () => {
    }) {
      let r, n = new Promise((i) => r = i);
      return { then(i) {
        return --e === 0 && r(t()), i?.(n);
      } };
    }
    __name(ho, "ho");
    c2();
    m();
    p();
    d();
    f();
    l();
    function yo(e) {
      return typeof e == "string" ? e : e.reduce((t, r) => {
        let n = typeof r == "string" ? r : r.level;
        return n === "query" ? t : t && (r === "info" || t === "info") ? "info" : n;
      }, void 0);
    }
    __name(yo, "yo");
    c2();
    m();
    p();
    d();
    f();
    l();
    var cr = class {
      static {
        __name(this, "cr");
      }
      constructor() {
        this._middlewares = [];
      }
      use(t) {
        this._middlewares.push(t);
      }
      get(t) {
        return this._middlewares[t];
      }
      has(t) {
        return !!this._middlewares[t];
      }
      length() {
        return this._middlewares.length;
      }
    };
    c2();
    m();
    p();
    d();
    f();
    l();
    var Eo = Fe(Vn());
    c2();
    m();
    p();
    d();
    f();
    l();
    function mr(e) {
      return typeof e.batchRequestIdx == "number";
    }
    __name(mr, "mr");
    c2();
    m();
    p();
    d();
    f();
    l();
    function bo(e) {
      if (e.action !== "findUnique" && e.action !== "findUniqueOrThrow") return;
      let t = [];
      return e.modelName && t.push(e.modelName), e.query.arguments && t.push(en(e.query.arguments)), t.push(en(e.query.selection)), t.join("");
    }
    __name(bo, "bo");
    function en(e) {
      return `(${Object.keys(e).sort().map((r) => {
        let n = e[r];
        return typeof n == "object" && n !== null ? `(${r} ${en(n)})` : r;
      }).join(" ")})`;
    }
    __name(en, "en");
    c2();
    m();
    p();
    d();
    f();
    l();
    var Wa = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateOne: true, upsertOne: true };
    function tn(e) {
      return Wa[e];
    }
    __name(tn, "tn");
    c2();
    m();
    p();
    d();
    f();
    l();
    var pr = class {
      static {
        __name(this, "pr");
      }
      constructor(t) {
        this.options = t;
        this.tickActive = false;
        this.batches = {};
      }
      request(t) {
        let r = this.options.batchBy(t);
        return r ? (this.batches[r] || (this.batches[r] = [], this.tickActive || (this.tickActive = true, h.nextTick(() => {
          this.dispatchBatches(), this.tickActive = false;
        }))), new Promise((n, i) => {
          this.batches[r].push({ request: t, resolve: n, reject: i });
        })) : this.options.singleLoader(t);
      }
      dispatchBatches() {
        for (let t in this.batches) {
          let r = this.batches[t];
          delete this.batches[t], r.length === 1 ? this.options.singleLoader(r[0].request).then((n) => {
            n instanceof Error ? r[0].reject(n) : r[0].resolve(n);
          }).catch((n) => {
            r[0].reject(n);
          }) : (r.sort((n, i) => this.options.batchOrder(n.request, i.request)), this.options.batchLoader(r.map((n) => n.request)).then((n) => {
            if (n instanceof Error) for (let i = 0; i < r.length; i++) r[i].reject(n);
            else for (let i = 0; i < r.length; i++) {
              let o = n[i];
              o instanceof Error ? r[i].reject(o) : r[i].resolve(o);
            }
          }).catch((n) => {
            for (let i = 0; i < r.length; i++) r[i].reject(n);
          }));
        }
      }
      get [Symbol.toStringTag]() {
        return "DataLoader";
      }
    };
    c2();
    m();
    p();
    d();
    f();
    l();
    l();
    function Le(e, t) {
      if (t === null) return t;
      switch (e) {
        case "bigint":
          return BigInt(t);
        case "bytes":
          return b.from(t, "base64");
        case "decimal":
          return new ue(t);
        case "datetime":
        case "date":
          return new Date(t);
        case "time":
          return /* @__PURE__ */ new Date(`1970-01-01T${t}Z`);
        case "bigint-array":
          return t.map((r) => Le("bigint", r));
        case "bytes-array":
          return t.map((r) => Le("bytes", r));
        case "decimal-array":
          return t.map((r) => Le("decimal", r));
        case "datetime-array":
          return t.map((r) => Le("datetime", r));
        case "date-array":
          return t.map((r) => Le("date", r));
        case "time-array":
          return t.map((r) => Le("time", r));
        default:
          return t;
      }
    }
    __name(Le, "Le");
    function wo(e) {
      let t = [], r = Ka(e);
      for (let n = 0; n < e.rows.length; n++) {
        let i = e.rows[n], o = { ...r };
        for (let s = 0; s < i.length; s++) o[e.columns[s]] = Le(e.types[s], i[s]);
        t.push(o);
      }
      return t;
    }
    __name(wo, "wo");
    function Ka(e) {
      let t = {};
      for (let r = 0; r < e.columns.length; r++) t[e.columns[r]] = null;
      return t;
    }
    __name(Ka, "Ka");
    var Ha = ee("prisma:client:request_handler");
    var dr = class {
      static {
        __name(this, "dr");
      }
      constructor(t, r) {
        this.logEmitter = r, this.client = t, this.dataloader = new pr({ batchLoader: Ji(async ({ requests: n, customDataProxyFetch: i }) => {
          let { transaction: o, otelParentCtx: s } = n[0], a = n.map((C) => C.protocolQuery), u = this.client._tracingHelper.getTraceParent(s), g = n.some((C) => tn(C.protocolQuery.action));
          return (await this.client._engine.requestBatch(a, { traceparent: u, transaction: za(o), containsWrite: g, customDataProxyFetch: i })).map((C, O) => {
            if (C instanceof Error) return C;
            try {
              return this.mapQueryEngineResult(n[O], C);
            } catch (A) {
              return A;
            }
          });
        }), singleLoader: /* @__PURE__ */ __name(async (n) => {
          let i = n.transaction?.kind === "itx" ? xo(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: i, isWrite: tn(n.protocolQuery.action), customDataProxyFetch: n.customDataProxyFetch });
          return this.mapQueryEngineResult(n, o);
        }, "singleLoader"), batchBy: /* @__PURE__ */ __name((n) => n.transaction?.id ? `transaction-${n.transaction.id}` : bo(n.protocolQuery), "batchBy"), batchOrder(n, i) {
          return n.transaction?.kind === "batch" && i.transaction?.kind === "batch" ? n.transaction.index - i.transaction.index : 0;
        } });
      }
      async request(t) {
        try {
          return await this.dataloader.request(t);
        } catch (r) {
          let { clientMethod: n, callsite: i, transaction: o, args: s, modelName: a } = t;
          this.handleAndLogRequestError({ error: r, clientMethod: n, callsite: i, transaction: o, args: s, modelName: a, globalOmit: t.globalOmit });
        }
      }
      mapQueryEngineResult({ dataPath: t, unpacker: r }, n) {
        let i = n?.data, o = n?.elapsed, s = this.unpack(i, t, r);
        return h.env.PRISMA_CLIENT_GET_TIME ? { data: s, elapsed: o } : s;
      }
      handleAndLogRequestError(t) {
        try {
          this.handleRequestError(t);
        } catch (r) {
          throw this.logEmitter && this.logEmitter.emit("error", { message: r.message, target: t.clientMethod, timestamp: /* @__PURE__ */ new Date() }), r;
        }
      }
      handleRequestError({ error: t, clientMethod: r, callsite: n, transaction: i, args: o, modelName: s, globalOmit: a }) {
        if (Ha(t), Ya(t, i) || t instanceof we) throw t;
        if (t instanceof J && Xa(t)) {
          let g = Po(t.meta);
          zt({ args: o, errors: [g], callsite: n, errorFormat: this.client._errorFormat, originalMethod: r, clientVersion: this.client._clientVersion, globalOmit: a });
        }
        let u = t.message;
        if (n && (u = Je({ callsite: n, originalMethod: r, isPanic: t.isPanic, showColors: this.client._errorFormat === "pretty", message: u })), u = this.sanitizeMessage(u), t.code) {
          let g = s ? { modelName: s, ...t.meta } : t.meta;
          throw new J(u, { code: t.code, clientVersion: this.client._clientVersion, meta: g, batchRequestIdx: t.batchRequestIdx });
        } else {
          if (t.isPanic) throw new Ee(u, this.client._clientVersion);
          if (t instanceof G) throw new G(u, { clientVersion: this.client._clientVersion, batchRequestIdx: t.batchRequestIdx });
          if (t instanceof L) throw new L(u, this.client._clientVersion);
          if (t instanceof Ee) throw new Ee(u, this.client._clientVersion);
        }
        throw t.clientVersion = this.client._clientVersion, t;
      }
      sanitizeMessage(t) {
        return this.client._errorFormat && this.client._errorFormat !== "pretty" ? (0, Eo.default)(t) : t;
      }
      unpack(t, r, n) {
        if (!t || (t.data && (t = t.data), !t)) return t;
        let i = Object.keys(t)[0], o = Object.values(t)[0], s = r.filter((g) => g !== "select" && g !== "include"), a = Jr(o, s), u = i === "queryRaw" ? wo(a) : $e(a);
        return n ? n(u) : u;
      }
      get [Symbol.toStringTag]() {
        return "RequestHandler";
      }
    };
    function za(e) {
      if (e) {
        if (e.kind === "batch") return { kind: "batch", options: { isolationLevel: e.isolationLevel } };
        if (e.kind === "itx") return { kind: "itx", options: xo(e) };
        be(e, "Unknown transaction kind");
      }
    }
    __name(za, "za");
    function xo(e) {
      return { id: e.id, payload: e.payload };
    }
    __name(xo, "xo");
    function Ya(e, t) {
      return mr(e) && t?.kind === "batch" && e.batchRequestIdx !== t.index;
    }
    __name(Ya, "Ya");
    function Xa(e) {
      return e.code === "P2009" || e.code === "P2012";
    }
    __name(Xa, "Xa");
    function Po(e) {
      if (e.kind === "Union") return { kind: "Union", errors: e.errors.map(Po) };
      if (Array.isArray(e.selectionPath)) {
        let [, ...t] = e.selectionPath;
        return { ...e, selectionPath: t };
      }
      return e;
    }
    __name(Po, "Po");
    c2();
    m();
    p();
    d();
    f();
    l();
    var vo = "5.22.0";
    var To = vo;
    c2();
    m();
    p();
    d();
    f();
    l();
    var Oo = Fe(kr());
    c2();
    m();
    p();
    d();
    f();
    l();
    var _ = class extends Error {
      static {
        __name(this, "_");
      }
      constructor(t) {
        super(t + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientConstructorValidationError";
      }
    };
    K(_, "PrismaClientConstructorValidationError");
    var Co = ["datasources", "datasourceUrl", "errorFormat", "adapter", "log", "transactionOptions", "omit", "__internal"];
    var Ro = ["pretty", "colorless", "minimal"];
    var Ao = ["info", "query", "warn", "error"];
    var el = { datasources: /* @__PURE__ */ __name((e, { datasourceNames: t }) => {
      if (e) {
        if (typeof e != "object" || Array.isArray(e)) throw new _(`Invalid value ${JSON.stringify(e)} for "datasources" provided to PrismaClient constructor`);
        for (let [r, n] of Object.entries(e)) {
          if (!t.includes(r)) {
            let i = nt(r, t) || ` Available datasources: ${t.join(", ")}`;
            throw new _(`Unknown datasource ${r} provided to PrismaClient constructor.${i}`);
          }
          if (typeof n != "object" || Array.isArray(n)) throw new _(`Invalid value ${JSON.stringify(e)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (n && typeof n == "object") for (let [i, o] of Object.entries(n)) {
            if (i !== "url") throw new _(`Invalid value ${JSON.stringify(e)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            if (typeof o != "string") throw new _(`Invalid value ${JSON.stringify(o)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          }
        }
      }
    }, "datasources"), adapter: /* @__PURE__ */ __name((e, t) => {
      if (e === null) return;
      if (e === void 0) throw new _('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
      if (!ur(t).includes("driverAdapters")) throw new _('"adapter" property can only be provided to PrismaClient constructor when "driverAdapters" preview feature is enabled.');
      if (at() === "binary") throw new _('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
    }, "adapter"), datasourceUrl: /* @__PURE__ */ __name((e) => {
      if (typeof e < "u" && typeof e != "string") throw new _(`Invalid value ${JSON.stringify(e)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
    }, "datasourceUrl"), errorFormat: /* @__PURE__ */ __name((e) => {
      if (e) {
        if (typeof e != "string") throw new _(`Invalid value ${JSON.stringify(e)} for "errorFormat" provided to PrismaClient constructor.`);
        if (!Ro.includes(e)) {
          let t = nt(e, Ro);
          throw new _(`Invalid errorFormat ${e} provided to PrismaClient constructor.${t}`);
        }
      }
    }, "errorFormat"), log: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      if (!Array.isArray(e)) throw new _(`Invalid value ${JSON.stringify(e)} for "log" provided to PrismaClient constructor.`);
      function t(r) {
        if (typeof r == "string" && !Ao.includes(r)) {
          let n = nt(r, Ao);
          throw new _(`Invalid log level "${r}" provided to PrismaClient constructor.${n}`);
        }
      }
      __name(t, "t");
      for (let r of e) {
        t(r);
        let n = { level: t, emit: /* @__PURE__ */ __name((i) => {
          let o = ["stdout", "event"];
          if (!o.includes(i)) {
            let s = nt(i, o);
            throw new _(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`);
          }
        }, "emit") };
        if (r && typeof r == "object") for (let [i, o] of Object.entries(r)) if (n[i]) n[i](o);
        else throw new _(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
      }
    }, "log"), transactionOptions: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      let t = e.maxWait;
      if (t != null && t <= 0) throw new _(`Invalid value ${t} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
      let r = e.timeout;
      if (r != null && r <= 0) throw new _(`Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
    }, "transactionOptions"), omit: /* @__PURE__ */ __name((e, t) => {
      if (typeof e != "object") throw new _('"omit" option is expected to be an object.');
      if (e === null) throw new _('"omit" option can not be `null`');
      let r = [];
      for (let [n, i] of Object.entries(e)) {
        let o = rl(n, t.runtimeDataModel);
        if (!o) {
          r.push({ kind: "UnknownModel", modelKey: n });
          continue;
        }
        for (let [s, a] of Object.entries(i)) {
          let u = o.fields.find((g) => g.name === s);
          if (!u) {
            r.push({ kind: "UnknownField", modelKey: n, fieldName: s });
            continue;
          }
          if (u.relationName) {
            r.push({ kind: "RelationInOmit", modelKey: n, fieldName: s });
            continue;
          }
          typeof a != "boolean" && r.push({ kind: "InvalidFieldValue", modelKey: n, fieldName: s });
        }
      }
      if (r.length > 0) throw new _(nl(e, r));
    }, "omit"), __internal: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      let t = ["debug", "engine", "configOverride"];
      if (typeof e != "object") throw new _(`Invalid value ${JSON.stringify(e)} for "__internal" to PrismaClient constructor`);
      for (let [r] of Object.entries(e)) if (!t.includes(r)) {
        let n = nt(r, t);
        throw new _(`Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`);
      }
    }, "__internal") };
    function ko(e, t) {
      for (let [r, n] of Object.entries(e)) {
        if (!Co.includes(r)) {
          let i = nt(r, Co);
          throw new _(`Unknown property ${r} provided to PrismaClient constructor.${i}`);
        }
        el[r](n, t);
      }
      if (e.datasourceUrl && e.datasources) throw new _('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
    }
    __name(ko, "ko");
    function nt(e, t) {
      if (t.length === 0 || typeof e != "string") return "";
      let r = tl(e, t);
      return r ? ` Did you mean "${r}"?` : "";
    }
    __name(nt, "nt");
    function tl(e, t) {
      if (t.length === 0) return null;
      let r = t.map((i) => ({ value: i, distance: (0, Oo.default)(e, i) }));
      r.sort((i, o) => i.distance < o.distance ? -1 : 1);
      let n = r[0];
      return n.distance < 3 ? n.value : null;
    }
    __name(tl, "tl");
    function rl(e, t) {
      return So(t.models, e) ?? So(t.types, e);
    }
    __name(rl, "rl");
    function So(e, t) {
      let r = Object.keys(e).find((n) => Ve(n) === t);
      if (r) return e[r];
    }
    __name(So, "So");
    function nl(e, t) {
      let r = Ye(e);
      for (let o of t) switch (o.kind) {
        case "UnknownModel":
          r.arguments.getField(o.modelKey)?.markAsError(), r.addErrorMessage(() => `Unknown model name: ${o.modelKey}.`);
          break;
        case "UnknownField":
          r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => `Model "${o.modelKey}" does not have a field named "${o.fieldName}".`);
          break;
        case "RelationInOmit":
          r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => 'Relations are already excluded by default and can not be specified in "omit".');
          break;
        case "InvalidFieldValue":
          r.arguments.getDeepFieldValue([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => "Omit field option value must be a boolean.");
          break;
      }
      let { message: n, args: i } = Ht(r, "colorless");
      return `Error validating "omit" option:

${i}

${n}`;
    }
    __name(nl, "nl");
    c2();
    m();
    p();
    d();
    f();
    l();
    function Mo(e) {
      return e.length === 0 ? Promise.resolve([]) : new Promise((t, r) => {
        let n = new Array(e.length), i = null, o = false, s = 0, a = /* @__PURE__ */ __name(() => {
          o || (s++, s === e.length && (o = true, i ? r(i) : t(n)));
        }, "a"), u = /* @__PURE__ */ __name((g) => {
          o || (o = true, r(g));
        }, "u");
        for (let g = 0; g < e.length; g++) e[g].then((T) => {
          n[g] = T, a();
        }, (T) => {
          if (!mr(T)) {
            u(T);
            return;
          }
          T.batchRequestIdx === g ? u(T) : (i || (i = T), a());
        });
      });
    }
    __name(Mo, "Mo");
    var Re = ee("prisma:client");
    typeof globalThis == "object" && (globalThis.NODE_CLIENT = true);
    var il = { requestArgsToMiddlewareArgs: /* @__PURE__ */ __name((e) => e, "requestArgsToMiddlewareArgs"), middlewareArgsToRequestArgs: /* @__PURE__ */ __name((e) => e, "middlewareArgsToRequestArgs") };
    var ol = Symbol.for("prisma.client.transaction.id");
    var sl = { id: 0, nextId() {
      return ++this.id;
    } };
    function _o(e) {
      class t {
        static {
          __name(this, "t");
        }
        constructor(n) {
          this._originalClient = this;
          this._middlewares = new cr();
          this._createPrismaPromise = Xr();
          this.$extends = Ni;
          e = n?.__internal?.configOverride?.(e) ?? e, zi(e), n && ko(n, e);
          let i = new Ut().on("error", () => {
          });
          this._extensions = Xe.empty(), this._previewFeatures = ur(e), this._clientVersion = e.clientVersion ?? To, this._activeProvider = e.activeProvider, this._globalOmit = n?.omit, this._tracingHelper = go(this._previewFeatures);
          let o = { rootEnvPath: e.relativeEnvPaths.rootEnvPath && st.resolve(e.dirname, e.relativeEnvPaths.rootEnvPath), schemaEnvPath: e.relativeEnvPaths.schemaEnvPath && st.resolve(e.dirname, e.relativeEnvPaths.schemaEnvPath) }, s;
          if (n?.adapter) {
            s = $r(n.adapter);
            let u = e.activeProvider === "postgresql" ? "postgres" : e.activeProvider;
            if (s.provider !== u) throw new L(`The Driver Adapter \`${s.adapterName}\`, based on \`${s.provider}\`, is not compatible with the provider \`${u}\` specified in the Prisma schema.`, this._clientVersion);
            if (n.datasources || n.datasourceUrl !== void 0) throw new L("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.", this._clientVersion);
          }
          let a = e.injectableEdgeEnv?.();
          try {
            let u = n ?? {}, g = u.__internal ?? {}, T = g.debug === true;
            T && ee.enable("prisma:client");
            let C = st.resolve(e.dirname, e.relativePath);
            yn.existsSync(C) || (C = e.dirname), Re("dirname", e.dirname), Re("relativePath", e.relativePath), Re("cwd", C);
            let O = g.engine || {};
            if (u.errorFormat ? this._errorFormat = u.errorFormat : h.env.NODE_ENV === "production" ? this._errorFormat = "minimal" : h.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = e.runtimeDataModel, this._engineConfig = { cwd: C, dirname: e.dirname, enableDebugLogs: T, allowTriggerPanic: O.allowTriggerPanic, datamodelPath: st.join(e.dirname, e.filename ?? "schema.prisma"), prismaPath: O.binaryPath ?? void 0, engineEndpoint: O.endpoint, generator: e.generator, showColors: this._errorFormat === "pretty", logLevel: u.log && yo(u.log), logQueries: u.log && !!(typeof u.log == "string" ? u.log === "query" : u.log.find((A) => typeof A == "string" ? A === "query" : A.level === "query")), env: a?.parsed ?? {}, flags: [], engineWasm: e.engineWasm, clientVersion: e.clientVersion, engineVersion: e.engineVersion, previewFeatures: this._previewFeatures, activeProvider: e.activeProvider, inlineSchema: e.inlineSchema, overrideDatasources: Yi(u, e.datasourceNames), inlineDatasources: e.inlineDatasources, inlineSchemaHash: e.inlineSchemaHash, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: u.transactionOptions?.maxWait ?? 2e3, timeout: u.transactionOptions?.timeout ?? 5e3, isolationLevel: u.transactionOptions?.isolationLevel }, logEmitter: i, isBundled: e.isBundled, adapter: s }, this._accelerateEngineConfig = { ...this._engineConfig, accelerateUtils: { resolveDatasourceUrl: ar, getBatchRequestPayload: nr, prismaGraphQLToJSError: ir, PrismaClientUnknownRequestError: G, PrismaClientInitializationError: L, PrismaClientKnownRequestError: J, debug: ee("prisma:client:accelerateEngine"), engineVersion: Lo.version, clientVersion: e.clientVersion } }, Re("clientVersion", e.clientVersion), this._engine = to(e, this._engineConfig), this._requestHandler = new dr(this, i), u.log) for (let A of u.log) {
              let M = typeof A == "string" ? A : A.emit === "stdout" ? A.level : null;
              M && this.$on(M, (S) => {
                ut.log(`${ut.tags[M] ?? ""}`, S.message || S.query);
              });
            }
            this._metrics = new Ze(this._engine);
          } catch (u) {
            throw u.clientVersion = this._clientVersion, u;
          }
          return this._appliedParent = Tt(this);
        }
        get [Symbol.toStringTag]() {
          return "PrismaClient";
        }
        $use(n) {
          this._middlewares.use(n);
        }
        $on(n, i) {
          n === "beforeExit" ? this._engine.onBeforeExit(i) : n && this._engineConfig.logEmitter.on(n, i);
        }
        $connect() {
          try {
            return this._engine.start();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          }
        }
        async $disconnect() {
          try {
            await this._engine.stop();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          } finally {
            Mn();
          }
        }
        $executeRawInternal(n, i, o, s) {
          let a = this._activeProvider;
          return this._request({ action: "executeRaw", args: o, transaction: n, clientMethod: i, argsMapper: Yr({ clientMethod: i, activeProvider: a }), callsite: Te(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $executeRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) {
              let [s, a] = Io(n, i);
              return zr(this._activeProvider, s.text, s.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s, a);
            }
            throw new j("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
          });
        }
        $executeRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => (zr(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])));
        }
        $runCommandRaw(n) {
          if (e.activeProvider !== "mongodb") throw new j(`The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
          return this._createPrismaPromise((i) => this._request({ args: n, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: ro, callsite: Te(this._errorFormat), transaction: i }));
        }
        async $queryRawInternal(n, i, o, s) {
          let a = this._activeProvider;
          return this._request({ action: "queryRaw", args: o, transaction: n, clientMethod: i, argsMapper: Yr({ clientMethod: i, activeProvider: a }), callsite: Te(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $queryRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) return this.$queryRawInternal(o, "$queryRaw", ...Io(n, i));
            throw new j("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
          });
        }
        $queryRawTyped(n) {
          return this._createPrismaPromise((i) => {
            if (!this._hasPreviewFlag("typedSql")) throw new j("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
            return this.$queryRawInternal(i, "$queryRawTyped", n);
          });
        }
        $queryRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i]));
        }
        _transactionWithArray({ promises: n, options: i }) {
          let o = sl.nextId(), s = ho(n.length), a = n.map((u, g) => {
            if (u?.[Symbol.toStringTag] !== "PrismaPromise") throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
            let T = i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, C = { kind: "batch", id: o, index: g, isolationLevel: T, lock: s };
            return u.requestTransaction?.(C) ?? u;
          });
          return Mo(a);
        }
        async _transactionWithCallback({ callback: n, options: i }) {
          let o = { traceparent: this._tracingHelper.getTraceParent() }, s = { maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel }, a = await this._engine.transaction("start", o, s), u;
          try {
            let g = { kind: "itx", ...a };
            u = await n(this._createItxClient(g)), await this._engine.transaction("commit", o, a);
          } catch (g) {
            throw await this._engine.transaction("rollback", o, a).catch(() => {
            }), g;
          }
          return u;
        }
        _createItxClient(n) {
          return Tt(ge(Fi(this), [H("_appliedParent", () => this._appliedParent._createItxClient(n)), H("_createPrismaPromise", () => Xr(n)), H(ol, () => n.id), et(lo)]));
        }
        $transaction(n, i) {
          let o;
          typeof n == "function" ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1" ? o = /* @__PURE__ */ __name(() => {
            throw new Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
          }, "o") : o = /* @__PURE__ */ __name(() => this._transactionWithCallback({ callback: n, options: i }), "o") : o = /* @__PURE__ */ __name(() => this._transactionWithArray({ promises: n, options: i }), "o");
          let s = { name: "transaction", attributes: { method: "$transaction" } };
          return this._tracingHelper.runInChildSpan(s, o);
        }
        _request(n) {
          n.otelParentCtx = this._tracingHelper.getActiveContext();
          let i = n.middlewareArgsMapper ?? il, o = { args: i.requestArgsToMiddlewareArgs(n.args), dataPath: n.dataPath, runInTransaction: !!n.transaction, action: n.action, model: n.model }, s = { middleware: { name: "middleware", middleware: true, attributes: { method: "$use" }, active: false }, operation: { name: "operation", attributes: { method: o.action, model: o.model, name: o.model ? `${o.model}.${o.action}` : o.action } } }, a = -1, u = /* @__PURE__ */ __name(async (g) => {
            let T = this._middlewares.get(++a);
            if (T) return this._tracingHelper.runInChildSpan(s.middleware, (I) => T(g, (ne) => (I?.end(), u(ne))));
            let { runInTransaction: C, args: O, ...A } = g, M = { ...n, ...A };
            O && (M.args = i.middlewareArgsToRequestArgs(O)), n.transaction !== void 0 && C === false && delete M.transaction;
            let S = await Qi(this, M);
            return M.model ? Bi({ result: S, modelName: M.model, args: M.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit }) : S;
          }, "u");
          return this._tracingHelper.runInChildSpan(s.operation, () => u(o));
        }
        async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s, action: a, model: u, argsMapper: g, transaction: T, unpacker: C, otelParentCtx: O, customDataProxyFetch: A }) {
          try {
            n = g ? g(n) : n;
            let M = { name: "serialize" }, S = this._tracingHelper.runInChildSpan(M, () => Zt({ modelName: u, runtimeDataModel: this._runtimeDataModel, action: a, args: n, clientMethod: i, callsite: s, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
            return ee.enabled("prisma:client") && (Re("Prisma Client call:"), Re(`prisma.${i}(${Ci(n)})`), Re("Generated request:"), Re(JSON.stringify(S, null, 2) + `
`)), T?.kind === "batch" && await T.lock, this._requestHandler.request({ protocolQuery: S, modelName: u, action: a, clientMethod: i, dataPath: o, callsite: s, args: n, extensions: this._extensions, transaction: T, unpacker: C, otelParentCtx: O, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: A });
          } catch (M) {
            throw M.clientVersion = this._clientVersion, M;
          }
        }
        get $metrics() {
          if (!this._hasPreviewFlag("metrics")) throw new j("`metrics` preview feature must be enabled in order to access metrics API", { clientVersion: this._clientVersion });
          return this._metrics;
        }
        _hasPreviewFlag(n) {
          return !!this._engineConfig.previewFeatures?.includes(n);
        }
        $applyPendingMigrations() {
          return this._engine.applyPendingMigrations();
        }
      }
      return t;
    }
    __name(_o, "_o");
    function Io(e, t) {
      return al(e) ? [new X(e, t), co] : [e, mo];
    }
    __name(Io, "Io");
    function al(e) {
      return Array.isArray(e) && Array.isArray(e.raw);
    }
    __name(al, "al");
    c2();
    m();
    p();
    d();
    f();
    l();
    var ll = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
    function Do(e) {
      return new Proxy(e, { get(t, r) {
        if (r in t) return t[r];
        if (!ll.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
      } });
    }
    __name(Do, "Do");
    c2();
    m();
    p();
    d();
    f();
    l();
    l();
  }
});

// node_modules/.prisma/client/query_engine_bg.js
var require_query_engine_bg = __commonJS({
  "node_modules/.prisma/client/query_engine_bg.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var j = Object.defineProperty;
    var R = Object.getOwnPropertyDescriptor;
    var D = Object.getOwnPropertyNames;
    var M = Object.prototype.hasOwnProperty;
    var U = /* @__PURE__ */ __name((t, e) => {
      for (var n in e) j(t, n, { get: e[n], enumerable: true });
    }, "U");
    var B = /* @__PURE__ */ __name((t, e, n, _) => {
      if (e && typeof e == "object" || typeof e == "function") for (let o of D(e)) !M.call(t, o) && o !== n && j(t, o, { get: /* @__PURE__ */ __name(() => e[o], "get"), enumerable: !(_ = R(e, o)) || _.enumerable });
      return t;
    }, "B");
    var N = /* @__PURE__ */ __name((t) => B(j({}, "__esModule", { value: true }), t), "N");
    var Oe = {};
    U(Oe, { QueryEngine: /* @__PURE__ */ __name(() => G, "QueryEngine"), __wbg_String_88810dfeb4021902: /* @__PURE__ */ __name(() => Et, "__wbg_String_88810dfeb4021902"), __wbg_buffer_344d9b41efe96da7: /* @__PURE__ */ __name(() => Rt, "__wbg_buffer_344d9b41efe96da7"), __wbg_call_53fc3abd42e24ec8: /* @__PURE__ */ __name(() => ie, "__wbg_call_53fc3abd42e24ec8"), __wbg_call_669127b9d730c650: /* @__PURE__ */ __name(() => Qt, "__wbg_call_669127b9d730c650"), __wbg_crypto_58f13aa23ffcb166: /* @__PURE__ */ __name(() => Ct, "__wbg_crypto_58f13aa23ffcb166"), __wbg_done_bc26bf4ada718266: /* @__PURE__ */ __name(() => Xt, "__wbg_done_bc26bf4ada718266"), __wbg_entries_6d727b73ee02b7ce: /* @__PURE__ */ __name(() => pe, "__wbg_entries_6d727b73ee02b7ce"), __wbg_getRandomValues_504510b5564925af: /* @__PURE__ */ __name(() => Bt, "__wbg_getRandomValues_504510b5564925af"), __wbg_getTime_ed6ee333b702f8fc: /* @__PURE__ */ __name(() => ct, "__wbg_getTime_ed6ee333b702f8fc"), __wbg_get_2aff440840bb6202: /* @__PURE__ */ __name(() => te, "__wbg_get_2aff440840bb6202"), __wbg_get_4a9aa5157afeb382: /* @__PURE__ */ __name(() => Ht, "__wbg_get_4a9aa5157afeb382"), __wbg_get_94990005bd6ca07c: /* @__PURE__ */ __name(() => vt, "__wbg_get_94990005bd6ca07c"), __wbg_getwithrefkey_5e6d9547403deab8: /* @__PURE__ */ __name(() => qt, "__wbg_getwithrefkey_5e6d9547403deab8"), __wbg_globalThis_17eff828815f7d84: /* @__PURE__ */ __name(() => re, "__wbg_globalThis_17eff828815f7d84"), __wbg_global_46f939f6541643c5: /* @__PURE__ */ __name(() => _e, "__wbg_global_46f939f6541643c5"), __wbg_has_cdf8b85f6e903c80: /* @__PURE__ */ __name(() => rt, "__wbg_has_cdf8b85f6e903c80"), __wbg_instanceof_ArrayBuffer_c7cc317e5c29cc0d: /* @__PURE__ */ __name(() => we, "__wbg_instanceof_ArrayBuffer_c7cc317e5c29cc0d"), __wbg_instanceof_Promise_cfbcc42300367513: /* @__PURE__ */ __name(() => st, "__wbg_instanceof_Promise_cfbcc42300367513"), __wbg_instanceof_Uint8Array_19e6f142a5e7e1e1: /* @__PURE__ */ __name(() => le, "__wbg_instanceof_Uint8Array_19e6f142a5e7e1e1"), __wbg_isArray_38525be7442aa21e: /* @__PURE__ */ __name(() => ce, "__wbg_isArray_38525be7442aa21e"), __wbg_isSafeInteger_c38b0a16d0c7cef7: /* @__PURE__ */ __name(() => ue, "__wbg_isSafeInteger_c38b0a16d0c7cef7"), __wbg_iterator_7ee1a391d310f8e4: /* @__PURE__ */ __name(() => bt, "__wbg_iterator_7ee1a391d310f8e4"), __wbg_length_a5587d6cd79ab197: /* @__PURE__ */ __name(() => be, "__wbg_length_a5587d6cd79ab197"), __wbg_length_cace2e0b3ddc0502: /* @__PURE__ */ __name(() => at, "__wbg_length_cace2e0b3ddc0502"), __wbg_msCrypto_abcb1295e768d1f2: /* @__PURE__ */ __name(() => Pt, "__wbg_msCrypto_abcb1295e768d1f2"), __wbg_new0_ad75dd38f92424e2: /* @__PURE__ */ __name(() => ot, "__wbg_new0_ad75dd38f92424e2"), __wbg_new_08236689f0afb357: /* @__PURE__ */ __name(() => ht, "__wbg_new_08236689f0afb357"), __wbg_new_1b94180eeb48f2a2: /* @__PURE__ */ __name(() => It, "__wbg_new_1b94180eeb48f2a2"), __wbg_new_c728d68b8b34487e: /* @__PURE__ */ __name(() => St, "__wbg_new_c728d68b8b34487e"), __wbg_new_d8a000788389a31e: /* @__PURE__ */ __name(() => Mt, "__wbg_new_d8a000788389a31e"), __wbg_new_feb65b865d980ae2: /* @__PURE__ */ __name(() => Y, "__wbg_new_feb65b865d980ae2"), __wbg_newnoargs_ccdcae30fd002262: /* @__PURE__ */ __name(() => oe, "__wbg_newnoargs_ccdcae30fd002262"), __wbg_newwithbyteoffsetandlength_2dc04d99088b15e3: /* @__PURE__ */ __name(() => Dt, "__wbg_newwithbyteoffsetandlength_2dc04d99088b15e3"), __wbg_newwithlength_13b5319ab422dcf6: /* @__PURE__ */ __name(() => Wt, "__wbg_newwithlength_13b5319ab422dcf6"), __wbg_next_15da6a3df9290720: /* @__PURE__ */ __name(() => Zt, "__wbg_next_15da6a3df9290720"), __wbg_next_1989a20442400aaa: /* @__PURE__ */ __name(() => Kt, "__wbg_next_1989a20442400aaa"), __wbg_node_523d7bd03ef69fba: /* @__PURE__ */ __name(() => zt, "__wbg_node_523d7bd03ef69fba"), __wbg_now_28a6b413aca4a96a: /* @__PURE__ */ __name(() => ge, "__wbg_now_28a6b413aca4a96a"), __wbg_now_4579335d3581594c: /* @__PURE__ */ __name(() => ut, "__wbg_now_4579335d3581594c"), __wbg_now_8ed1a4454e40ecd1: /* @__PURE__ */ __name(() => it, "__wbg_now_8ed1a4454e40ecd1"), __wbg_parse_3f0cb48976ca4123: /* @__PURE__ */ __name(() => _t, "__wbg_parse_3f0cb48976ca4123"), __wbg_process_5b786e71d465a513: /* @__PURE__ */ __name(() => $t, "__wbg_process_5b786e71d465a513"), __wbg_push_fd3233d09cf81821: /* @__PURE__ */ __name(() => kt, "__wbg_push_fd3233d09cf81821"), __wbg_randomFillSync_a0d98aa11c81fe89: /* @__PURE__ */ __name(() => Nt, "__wbg_randomFillSync_a0d98aa11c81fe89"), __wbg_require_2784e593a4674877: /* @__PURE__ */ __name(() => Lt, "__wbg_require_2784e593a4674877"), __wbg_resolve_a3252b2860f0a09e: /* @__PURE__ */ __name(() => Ae, "__wbg_resolve_a3252b2860f0a09e"), __wbg_self_3fad056edded10bd: /* @__PURE__ */ __name(() => ee, "__wbg_self_3fad056edded10bd"), __wbg_setTimeout_631fe61f31fa2fad: /* @__PURE__ */ __name(() => Z, "__wbg_setTimeout_631fe61f31fa2fad"), __wbg_set_0ac78a2bc07da03c: /* @__PURE__ */ __name(() => Tt, "__wbg_set_0ac78a2bc07da03c"), __wbg_set_3355b9f2d3092e3b: /* @__PURE__ */ __name(() => At, "__wbg_set_3355b9f2d3092e3b"), __wbg_set_40f7786a25a9cc7e: /* @__PURE__ */ __name(() => se, "__wbg_set_40f7786a25a9cc7e"), __wbg_set_841ac57cff3d672b: /* @__PURE__ */ __name(() => Ot, "__wbg_set_841ac57cff3d672b"), __wbg_set_dcfd613a3420f908: /* @__PURE__ */ __name(() => ae, "__wbg_set_dcfd613a3420f908"), __wbg_set_wasm: /* @__PURE__ */ __name(() => C, "__wbg_set_wasm"), __wbg_stringify_4039297315a25b00: /* @__PURE__ */ __name(() => fe, "__wbg_stringify_4039297315a25b00"), __wbg_subarray_6ca5cfa7fbb9abbe: /* @__PURE__ */ __name(() => Ut, "__wbg_subarray_6ca5cfa7fbb9abbe"), __wbg_then_1bbc9edafd859b06: /* @__PURE__ */ __name(() => Se, "__wbg_then_1bbc9edafd859b06"), __wbg_then_89e1c559530b85cf: /* @__PURE__ */ __name(() => Ie, "__wbg_then_89e1c559530b85cf"), __wbg_valueOf_ff4b62641803432a: /* @__PURE__ */ __name(() => Gt, "__wbg_valueOf_ff4b62641803432a"), __wbg_value_0570714ff7d75f35: /* @__PURE__ */ __name(() => Yt, "__wbg_value_0570714ff7d75f35"), __wbg_versions_c2ab80650590b6a2: /* @__PURE__ */ __name(() => Vt, "__wbg_versions_c2ab80650590b6a2"), __wbg_window_a4f46c98a61d4089: /* @__PURE__ */ __name(() => ne, "__wbg_window_a4f46c98a61d4089"), __wbindgen_bigint_from_i64: /* @__PURE__ */ __name(() => wt, "__wbindgen_bigint_from_i64"), __wbindgen_bigint_from_u64: /* @__PURE__ */ __name(() => xt, "__wbindgen_bigint_from_u64"), __wbindgen_bigint_get_as_i64: /* @__PURE__ */ __name(() => ye, "__wbindgen_bigint_get_as_i64"), __wbindgen_boolean_get: /* @__PURE__ */ __name(() => gt, "__wbindgen_boolean_get"), __wbindgen_cb_drop: /* @__PURE__ */ __name(() => he, "__wbindgen_cb_drop"), __wbindgen_closure_wrapper6700: /* @__PURE__ */ __name(() => je, "__wbindgen_closure_wrapper6700"), __wbindgen_debug_string: /* @__PURE__ */ __name(() => me, "__wbindgen_debug_string"), __wbindgen_error_new: /* @__PURE__ */ __name(() => X, "__wbindgen_error_new"), __wbindgen_in: /* @__PURE__ */ __name(() => pt, "__wbindgen_in"), __wbindgen_is_bigint: /* @__PURE__ */ __name(() => dt, "__wbindgen_is_bigint"), __wbindgen_is_function: /* @__PURE__ */ __name(() => Jt, "__wbindgen_is_function"), __wbindgen_is_object: /* @__PURE__ */ __name(() => ft, "__wbindgen_is_object"), __wbindgen_is_string: /* @__PURE__ */ __name(() => jt, "__wbindgen_is_string"), __wbindgen_is_undefined: /* @__PURE__ */ __name(() => nt, "__wbindgen_is_undefined"), __wbindgen_jsval_eq: /* @__PURE__ */ __name(() => yt, "__wbindgen_jsval_eq"), __wbindgen_jsval_loose_eq: /* @__PURE__ */ __name(() => de, "__wbindgen_jsval_loose_eq"), __wbindgen_memory: /* @__PURE__ */ __name(() => Ft, "__wbindgen_memory"), __wbindgen_number_get: /* @__PURE__ */ __name(() => lt, "__wbindgen_number_get"), __wbindgen_number_new: /* @__PURE__ */ __name(() => mt, "__wbindgen_number_new"), __wbindgen_object_clone_ref: /* @__PURE__ */ __name(() => et, "__wbindgen_object_clone_ref"), __wbindgen_object_drop_ref: /* @__PURE__ */ __name(() => Te, "__wbindgen_object_drop_ref"), __wbindgen_string_get: /* @__PURE__ */ __name(() => K, "__wbindgen_string_get"), __wbindgen_string_new: /* @__PURE__ */ __name(() => tt, "__wbindgen_string_new"), __wbindgen_throw: /* @__PURE__ */ __name(() => xe, "__wbindgen_throw"), debug_panic: /* @__PURE__ */ __name(() => Q, "debug_panic"), getBuildTimeInfo: /* @__PURE__ */ __name(() => J, "getBuildTimeInfo") });
    module.exports = N(Oe);
    var T = /* @__PURE__ */ __name(() => {
    }, "T");
    T.prototype = T;
    var c2;
    function C(t) {
      c2 = t;
    }
    __name(C, "C");
    var w = new Array(128).fill(void 0);
    w.push(void 0, null, true, false);
    function r(t) {
      return w[t];
    }
    __name(r, "r");
    var a = 0;
    var I = null;
    function S() {
      return (I === null || I.byteLength === 0) && (I = new Uint8Array(c2.memory.buffer)), I;
    }
    __name(S, "S");
    var $2 = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
    var A = new $2("utf-8");
    var V = typeof A.encodeInto == "function" ? function(t, e) {
      return A.encodeInto(t, e);
    } : function(t, e) {
      const n = A.encode(t);
      return e.set(n), { read: t.length, written: n.length };
    };
    function d(t, e, n) {
      if (n === void 0) {
        const s = A.encode(t), p = e(s.length, 1) >>> 0;
        return S().subarray(p, p + s.length).set(s), a = s.length, p;
      }
      let _ = t.length, o = e(_, 1) >>> 0;
      const f = S();
      let u = 0;
      for (; u < _; u++) {
        const s = t.charCodeAt(u);
        if (s > 127) break;
        f[o + u] = s;
      }
      if (u !== _) {
        u !== 0 && (t = t.slice(u)), o = n(o, _, _ = u + t.length * 3, 1) >>> 0;
        const s = S().subarray(o + u, o + _), p = V(t, s);
        u += p.written, o = n(o, _, u, 1) >>> 0;
      }
      return a = u, o;
    }
    __name(d, "d");
    function x(t) {
      return t == null;
    }
    __name(x, "x");
    var y = null;
    function l() {
      return (y === null || y.buffer.detached === true || y.buffer.detached === void 0 && y.buffer !== c2.memory.buffer) && (y = new DataView(c2.memory.buffer)), y;
    }
    __name(l, "l");
    var z = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
    var q = new z("utf-8", { ignoreBOM: true, fatal: true });
    q.decode();
    function m(t, e) {
      return t = t >>> 0, q.decode(S().subarray(t, t + e));
    }
    __name(m, "m");
    var h = w.length;
    function i(t) {
      h === w.length && w.push(w.length + 1);
      const e = h;
      return h = w[e], w[e] = t, e;
    }
    __name(i, "i");
    function O(t) {
      const e = typeof t;
      if (e == "number" || e == "boolean" || t == null) return `${t}`;
      if (e == "string") return `"${t}"`;
      if (e == "symbol") {
        const o = t.description;
        return o == null ? "Symbol" : `Symbol(${o})`;
      }
      if (e == "function") {
        const o = t.name;
        return typeof o == "string" && o.length > 0 ? `Function(${o})` : "Function";
      }
      if (Array.isArray(t)) {
        const o = t.length;
        let f = "[";
        o > 0 && (f += O(t[0]));
        for (let u = 1; u < o; u++) f += ", " + O(t[u]);
        return f += "]", f;
      }
      const n = /\[object ([^\]]+)\]/.exec(toString.call(t));
      let _;
      if (n.length > 1) _ = n[1];
      else return toString.call(t);
      if (_ == "Object") try {
        return "Object(" + JSON.stringify(t) + ")";
      } catch {
        return "Object";
      }
      return t instanceof Error ? `${t.name}: ${t.message}
${t.stack}` : _;
    }
    __name(O, "O");
    function L(t) {
      t < 132 || (w[t] = h, h = t);
    }
    __name(L, "L");
    function b(t) {
      const e = r(t);
      return L(t), e;
    }
    __name(b, "b");
    var k = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
    }, "register"), unregister: /* @__PURE__ */ __name(() => {
    }, "unregister") } : new FinalizationRegistry((t) => {
      c2.__wbindgen_export_2.get(t.dtor)(t.a, t.b);
    });
    function P(t, e, n, _) {
      const o = { a: t, b: e, cnt: 1, dtor: n }, f = /* @__PURE__ */ __name((...u) => {
        o.cnt++;
        const s = o.a;
        o.a = 0;
        try {
          return _(s, o.b, ...u);
        } finally {
          --o.cnt === 0 ? (c2.__wbindgen_export_2.get(o.dtor)(s, o.b), k.unregister(o)) : o.a = s;
        }
      }, "f");
      return f.original = o, k.register(f, o, o), f;
    }
    __name(P, "P");
    function W(t, e, n) {
      c2._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h9eef02caf99553a1(t, e, i(n));
    }
    __name(W, "W");
    function J() {
      const t = c2.getBuildTimeInfo();
      return b(t);
    }
    __name(J, "J");
    function Q(t) {
      try {
        const f = c2.__wbindgen_add_to_stack_pointer(-16);
        var e = x(t) ? 0 : d(t, c2.__wbindgen_malloc, c2.__wbindgen_realloc), n = a;
        c2.debug_panic(f, e, n);
        var _ = l().getInt32(f + 4 * 0, true), o = l().getInt32(f + 4 * 1, true);
        if (o) throw b(_);
      } finally {
        c2.__wbindgen_add_to_stack_pointer(16);
      }
    }
    __name(Q, "Q");
    function g(t, e) {
      try {
        return t.apply(this, e);
      } catch (n) {
        c2.__wbindgen_exn_store(i(n));
      }
    }
    __name(g, "g");
    function H(t, e, n, _) {
      c2.wasm_bindgen__convert__closures__invoke2_mut__h174c8485536aed69(t, e, i(n), i(_));
    }
    __name(H, "H");
    var v = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
    }, "register"), unregister: /* @__PURE__ */ __name(() => {
    }, "unregister") } : new FinalizationRegistry((t) => c2.__wbg_queryengine_free(t >>> 0, 1));
    var G = class {
      static {
        __name(this, "G");
      }
      __destroy_into_raw() {
        const e = this.__wbg_ptr;
        return this.__wbg_ptr = 0, v.unregister(this), e;
      }
      free() {
        const e = this.__destroy_into_raw();
        c2.__wbg_queryengine_free(e, 0);
      }
      constructor(e, n, _) {
        try {
          const s = c2.__wbindgen_add_to_stack_pointer(-16);
          c2.queryengine_new(s, i(e), i(n), i(_));
          var o = l().getInt32(s + 4 * 0, true), f = l().getInt32(s + 4 * 1, true), u = l().getInt32(s + 4 * 2, true);
          if (u) throw b(f);
          return this.__wbg_ptr = o >>> 0, v.register(this, this.__wbg_ptr, this), this;
        } finally {
          c2.__wbindgen_add_to_stack_pointer(16);
        }
      }
      connect(e) {
        const n = d(e, c2.__wbindgen_malloc, c2.__wbindgen_realloc), _ = a, o = c2.queryengine_connect(this.__wbg_ptr, n, _);
        return b(o);
      }
      disconnect(e) {
        const n = d(e, c2.__wbindgen_malloc, c2.__wbindgen_realloc), _ = a, o = c2.queryengine_disconnect(this.__wbg_ptr, n, _);
        return b(o);
      }
      query(e, n, _) {
        const o = d(e, c2.__wbindgen_malloc, c2.__wbindgen_realloc), f = a, u = d(n, c2.__wbindgen_malloc, c2.__wbindgen_realloc), s = a;
        var p = x(_) ? 0 : d(_, c2.__wbindgen_malloc, c2.__wbindgen_realloc), E = a;
        const F = c2.queryengine_query(this.__wbg_ptr, o, f, u, s, p, E);
        return b(F);
      }
      startTransaction(e, n) {
        const _ = d(e, c2.__wbindgen_malloc, c2.__wbindgen_realloc), o = a, f = d(n, c2.__wbindgen_malloc, c2.__wbindgen_realloc), u = a, s = c2.queryengine_startTransaction(this.__wbg_ptr, _, o, f, u);
        return b(s);
      }
      commitTransaction(e, n) {
        const _ = d(e, c2.__wbindgen_malloc, c2.__wbindgen_realloc), o = a, f = d(n, c2.__wbindgen_malloc, c2.__wbindgen_realloc), u = a, s = c2.queryengine_commitTransaction(this.__wbg_ptr, _, o, f, u);
        return b(s);
      }
      rollbackTransaction(e, n) {
        const _ = d(e, c2.__wbindgen_malloc, c2.__wbindgen_realloc), o = a, f = d(n, c2.__wbindgen_malloc, c2.__wbindgen_realloc), u = a, s = c2.queryengine_rollbackTransaction(this.__wbg_ptr, _, o, f, u);
        return b(s);
      }
      metrics(e) {
        const n = d(e, c2.__wbindgen_malloc, c2.__wbindgen_realloc), _ = a, o = c2.queryengine_metrics(this.__wbg_ptr, n, _);
        return b(o);
      }
    };
    function K(t, e) {
      const n = r(e), _ = typeof n == "string" ? n : void 0;
      var o = x(_) ? 0 : d(_, c2.__wbindgen_malloc, c2.__wbindgen_realloc), f = a;
      l().setInt32(t + 4 * 1, f, true), l().setInt32(t + 4 * 0, o, true);
    }
    __name(K, "K");
    function X(t, e) {
      const n = new Error(m(t, e));
      return i(n);
    }
    __name(X, "X");
    function Y(t, e) {
      try {
        var n = { a: t, b: e }, _ = /* @__PURE__ */ __name((f, u) => {
          const s = n.a;
          n.a = 0;
          try {
            return H(s, n.b, f, u);
          } finally {
            n.a = s;
          }
        }, "_");
        const o = new Promise(_);
        return i(o);
      } finally {
        n.a = n.b = 0;
      }
    }
    __name(Y, "Y");
    function Z(t, e) {
      return setTimeout(r(t), e >>> 0);
    }
    __name(Z, "Z");
    function tt(t, e) {
      const n = m(t, e);
      return i(n);
    }
    __name(tt, "tt");
    function et(t) {
      const e = r(t);
      return i(e);
    }
    __name(et, "et");
    function nt(t) {
      return r(t) === void 0;
    }
    __name(nt, "nt");
    function rt() {
      return g(function(t, e) {
        return Reflect.has(r(t), r(e));
      }, arguments);
    }
    __name(rt, "rt");
    function _t() {
      return g(function(t, e) {
        const n = JSON.parse(m(t, e));
        return i(n);
      }, arguments);
    }
    __name(_t, "_t");
    function ot() {
      return i(/* @__PURE__ */ new Date());
    }
    __name(ot, "ot");
    function ct(t) {
      return r(t).getTime();
    }
    __name(ct, "ct");
    function it(t) {
      return r(t).now();
    }
    __name(it, "it");
    function ut() {
      return Date.now();
    }
    __name(ut, "ut");
    function st(t) {
      let e;
      try {
        e = r(t) instanceof Promise;
      } catch {
        e = false;
      }
      return e;
    }
    __name(st, "st");
    function ft(t) {
      const e = r(t);
      return typeof e == "object" && e !== null;
    }
    __name(ft, "ft");
    function at(t) {
      return r(t).length;
    }
    __name(at, "at");
    function bt() {
      return i(Symbol.iterator);
    }
    __name(bt, "bt");
    function gt(t) {
      const e = r(t);
      return typeof e == "boolean" ? e ? 1 : 0 : 2;
    }
    __name(gt, "gt");
    function dt(t) {
      return typeof r(t) == "bigint";
    }
    __name(dt, "dt");
    function lt(t, e) {
      const n = r(e), _ = typeof n == "number" ? n : void 0;
      l().setFloat64(t + 8 * 1, x(_) ? 0 : _, true), l().setInt32(t + 4 * 0, !x(_), true);
    }
    __name(lt, "lt");
    function wt(t) {
      return i(t);
    }
    __name(wt, "wt");
    function pt(t, e) {
      return r(t) in r(e);
    }
    __name(pt, "pt");
    function xt(t) {
      const e = BigInt.asUintN(64, t);
      return i(e);
    }
    __name(xt, "xt");
    function yt(t, e) {
      return r(t) === r(e);
    }
    __name(yt, "yt");
    function mt(t) {
      return i(t);
    }
    __name(mt, "mt");
    function ht() {
      const t = new Array();
      return i(t);
    }
    __name(ht, "ht");
    function Tt(t, e, n) {
      r(t)[e >>> 0] = b(n);
    }
    __name(Tt, "Tt");
    function It() {
      return i(/* @__PURE__ */ new Map());
    }
    __name(It, "It");
    function St() {
      const t = new Object();
      return i(t);
    }
    __name(St, "St");
    function At(t, e, n) {
      const _ = r(t).set(r(e), r(n));
      return i(_);
    }
    __name(At, "At");
    function jt(t) {
      return typeof r(t) == "string";
    }
    __name(jt, "jt");
    function Ot(t, e, n) {
      r(t)[b(e)] = b(n);
    }
    __name(Ot, "Ot");
    function qt(t, e) {
      const n = r(t)[r(e)];
      return i(n);
    }
    __name(qt, "qt");
    function kt(t, e) {
      return r(t).push(r(e));
    }
    __name(kt, "kt");
    function vt() {
      return g(function(t, e) {
        const n = r(t)[b(e)];
        return i(n);
      }, arguments);
    }
    __name(vt, "vt");
    function Et(t, e) {
      const n = String(r(e)), _ = d(n, c2.__wbindgen_malloc, c2.__wbindgen_realloc), o = a;
      l().setInt32(t + 4 * 1, o, true), l().setInt32(t + 4 * 0, _, true);
    }
    __name(Et, "Et");
    function Ft() {
      const t = c2.memory;
      return i(t);
    }
    __name(Ft, "Ft");
    function Rt(t) {
      const e = r(t).buffer;
      return i(e);
    }
    __name(Rt, "Rt");
    function Dt(t, e, n) {
      const _ = new Uint8Array(r(t), e >>> 0, n >>> 0);
      return i(_);
    }
    __name(Dt, "Dt");
    function Mt(t) {
      const e = new Uint8Array(r(t));
      return i(e);
    }
    __name(Mt, "Mt");
    function Ut(t, e, n) {
      const _ = r(t).subarray(e >>> 0, n >>> 0);
      return i(_);
    }
    __name(Ut, "Ut");
    function Bt() {
      return g(function(t, e) {
        r(t).getRandomValues(r(e));
      }, arguments);
    }
    __name(Bt, "Bt");
    function Nt() {
      return g(function(t, e) {
        r(t).randomFillSync(b(e));
      }, arguments);
    }
    __name(Nt, "Nt");
    function Ct(t) {
      const e = r(t).crypto;
      return i(e);
    }
    __name(Ct, "Ct");
    function $t(t) {
      const e = r(t).process;
      return i(e);
    }
    __name($t, "$t");
    function Vt(t) {
      const e = r(t).versions;
      return i(e);
    }
    __name(Vt, "Vt");
    function zt(t) {
      const e = r(t).node;
      return i(e);
    }
    __name(zt, "zt");
    function Lt() {
      return g(function() {
        const t = module.require;
        return i(t);
      }, arguments);
    }
    __name(Lt, "Lt");
    function Pt(t) {
      const e = r(t).msCrypto;
      return i(e);
    }
    __name(Pt, "Pt");
    function Wt(t) {
      const e = new Uint8Array(t >>> 0);
      return i(e);
    }
    __name(Wt, "Wt");
    function Jt(t) {
      return typeof r(t) == "function";
    }
    __name(Jt, "Jt");
    function Qt() {
      return g(function(t, e) {
        const n = r(t).call(r(e));
        return i(n);
      }, arguments);
    }
    __name(Qt, "Qt");
    function Ht(t, e) {
      const n = r(t)[e >>> 0];
      return i(n);
    }
    __name(Ht, "Ht");
    function Gt(t) {
      return r(t).valueOf();
    }
    __name(Gt, "Gt");
    function Kt() {
      return g(function(t) {
        const e = r(t).next();
        return i(e);
      }, arguments);
    }
    __name(Kt, "Kt");
    function Xt(t) {
      return r(t).done;
    }
    __name(Xt, "Xt");
    function Yt(t) {
      const e = r(t).value;
      return i(e);
    }
    __name(Yt, "Yt");
    function Zt(t) {
      const e = r(t).next;
      return i(e);
    }
    __name(Zt, "Zt");
    function te() {
      return g(function(t, e) {
        const n = Reflect.get(r(t), r(e));
        return i(n);
      }, arguments);
    }
    __name(te, "te");
    function ee() {
      return g(function() {
        const t = self.self;
        return i(t);
      }, arguments);
    }
    __name(ee, "ee");
    function ne() {
      return g(function() {
        const t = window.window;
        return i(t);
      }, arguments);
    }
    __name(ne, "ne");
    function re() {
      return g(function() {
        const t = globalThis.globalThis;
        return i(t);
      }, arguments);
    }
    __name(re, "re");
    function _e() {
      return g(function() {
        const t = global.global;
        return i(t);
      }, arguments);
    }
    __name(_e, "_e");
    function oe(t, e) {
      const n = new T(m(t, e));
      return i(n);
    }
    __name(oe, "oe");
    function ce(t) {
      return Array.isArray(r(t));
    }
    __name(ce, "ce");
    function ie() {
      return g(function(t, e, n) {
        const _ = r(t).call(r(e), r(n));
        return i(_);
      }, arguments);
    }
    __name(ie, "ie");
    function ue(t) {
      return Number.isSafeInteger(r(t));
    }
    __name(ue, "ue");
    function se() {
      return g(function(t, e, n) {
        return Reflect.set(r(t), r(e), r(n));
      }, arguments);
    }
    __name(se, "se");
    function fe() {
      return g(function(t) {
        const e = JSON.stringify(r(t));
        return i(e);
      }, arguments);
    }
    __name(fe, "fe");
    function ae(t, e, n) {
      r(t).set(r(e), n >>> 0);
    }
    __name(ae, "ae");
    function be(t) {
      return r(t).length;
    }
    __name(be, "be");
    function ge() {
      return g(function() {
        return Date.now();
      }, arguments);
    }
    __name(ge, "ge");
    function de(t, e) {
      return r(t) == r(e);
    }
    __name(de, "de");
    function le(t) {
      let e;
      try {
        e = r(t) instanceof Uint8Array;
      } catch {
        e = false;
      }
      return e;
    }
    __name(le, "le");
    function we(t) {
      let e;
      try {
        e = r(t) instanceof ArrayBuffer;
      } catch {
        e = false;
      }
      return e;
    }
    __name(we, "we");
    function pe(t) {
      const e = Object.entries(r(t));
      return i(e);
    }
    __name(pe, "pe");
    function xe(t, e) {
      throw new Error(m(t, e));
    }
    __name(xe, "xe");
    function ye(t, e) {
      const n = r(e), _ = typeof n == "bigint" ? n : void 0;
      l().setBigInt64(t + 8 * 1, x(_) ? BigInt(0) : _, true), l().setInt32(t + 4 * 0, !x(_), true);
    }
    __name(ye, "ye");
    function me(t, e) {
      const n = O(r(e)), _ = d(n, c2.__wbindgen_malloc, c2.__wbindgen_realloc), o = a;
      l().setInt32(t + 4 * 1, o, true), l().setInt32(t + 4 * 0, _, true);
    }
    __name(me, "me");
    function he(t) {
      const e = b(t).original;
      return e.cnt-- == 1 ? (e.a = 0, true) : false;
    }
    __name(he, "he");
    function Te(t) {
      b(t);
    }
    __name(Te, "Te");
    function Ie(t, e) {
      const n = r(t).then(r(e));
      return i(n);
    }
    __name(Ie, "Ie");
    function Se(t, e, n) {
      const _ = r(t).then(r(e), r(n));
      return i(_);
    }
    __name(Se, "Se");
    function Ae(t) {
      const e = Promise.resolve(r(t));
      return i(e);
    }
    __name(Ae, "Ae");
    function je(t, e, n) {
      const _ = P(t, e, 530, W);
      return i(_);
    }
    __name(je, "je");
  }
});

// node_modules/.prisma/client/wasm-worker-loader.mjs
var wasm_worker_loader_exports = {};
__export(wasm_worker_loader_exports, {
  default: () => wasm_worker_loader_default
});
var wasm_worker_loader_default;
var init_wasm_worker_loader = __esm({
  "node_modules/.prisma/client/wasm-worker-loader.mjs"() {
    init_checked_fetch();
    init_modules_watch_stub();
    wasm_worker_loader_default = import("./8ced8cceb8eccc002dffe42c7b6658c446f622f0-query_engine_bg.wasm");
  }
});

// node_modules/.prisma/client/wasm.js
var require_wasm2 = __commonJS({
  "node_modules/.prisma/client/wasm.js"(exports) {
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var {
      PrismaClientKnownRequestError: PrismaClientKnownRequestError2,
      PrismaClientUnknownRequestError: PrismaClientUnknownRequestError2,
      PrismaClientRustPanicError: PrismaClientRustPanicError2,
      PrismaClientInitializationError: PrismaClientInitializationError2,
      PrismaClientValidationError: PrismaClientValidationError2,
      NotFoundError: NotFoundError2,
      getPrismaClient: getPrismaClient3,
      sqltag: sqltag2,
      empty: empty2,
      join: join2,
      raw: raw3,
      skip: skip2,
      Decimal: Decimal2,
      Debug: Debug3,
      objectEnumValues: objectEnumValues2,
      makeStrictEnum: makeStrictEnum2,
      Extensions: Extensions2,
      warnOnce: warnOnce2,
      defineDmmfProperty: defineDmmfProperty2,
      Public: Public2,
      getRuntime: getRuntime2
    } = require_wasm();
    var Prisma = {};
    exports.Prisma = Prisma;
    exports.$Enums = {};
    Prisma.prismaVersion = {
      client: "5.22.0",
      engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
    };
    Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError2;
    Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError2;
    Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError2;
    Prisma.PrismaClientInitializationError = PrismaClientInitializationError2;
    Prisma.PrismaClientValidationError = PrismaClientValidationError2;
    Prisma.NotFoundError = NotFoundError2;
    Prisma.Decimal = Decimal2;
    Prisma.sql = sqltag2;
    Prisma.empty = empty2;
    Prisma.join = join2;
    Prisma.raw = raw3;
    Prisma.validator = Public2.validator;
    Prisma.getExtensionContext = Extensions2.getExtensionContext;
    Prisma.defineExtension = Extensions2.defineExtension;
    Prisma.DbNull = objectEnumValues2.instances.DbNull;
    Prisma.JsonNull = objectEnumValues2.instances.JsonNull;
    Prisma.AnyNull = objectEnumValues2.instances.AnyNull;
    Prisma.NullTypes = {
      DbNull: objectEnumValues2.classes.DbNull,
      JsonNull: objectEnumValues2.classes.JsonNull,
      AnyNull: objectEnumValues2.classes.AnyNull
    };
    exports.Prisma.TransactionIsolationLevel = makeStrictEnum2({
      Serializable: "Serializable"
    });
    exports.Prisma.UserScalarFieldEnum = {
      id: "id",
      email: "email",
      username: "username",
      password: "password",
      role: "role",
      avatarUrl: "avatarUrl",
      phone: "phone",
      isActive: "isActive",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.BaziDataScalarFieldEnum = {
      id: "id",
      userId: "userId",
      inputData: "inputData",
      resultData: "resultData",
      analysis: "analysis",
      createdAt: "createdAt"
    };
    exports.Prisma.OrderScalarFieldEnum = {
      id: "id",
      userId: "userId",
      type: "type",
      amount: "amount",
      status: "status",
      description: "description",
      metadata: "metadata",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.MasterScalarFieldEnum = {
      id: "id",
      userId: "userId",
      title: "title",
      description: "description",
      price: "price",
      rating: "rating",
      available: "available",
      createdAt: "createdAt"
    };
    exports.Prisma.ChatScalarFieldEnum = {
      id: "id",
      userId: "userId",
      masterId: "masterId",
      messages: "messages",
      status: "status",
      lastMessage: "lastMessage",
      isRead: "isRead",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    exports.Prisma.NullsOrder = {
      first: "first",
      last: "last"
    };
    exports.Prisma.ModelName = {
      User: "User",
      BaziData: "BaziData",
      Order: "Order",
      Master: "Master",
      Chat: "Chat"
    };
    var config = {
      "generator": {
        "name": "client",
        "provider": {
          "fromEnvVar": null,
          "value": "prisma-client-js"
        },
        "output": {
          "value": "/home/gemini/project/bazi_fortune_app/workers-api/node_modules/@prisma/client",
          "fromEnvVar": null
        },
        "config": {
          "engineType": "library"
        },
        "binaryTargets": [
          {
            "fromEnvVar": null,
            "value": "debian-openssl-3.0.x",
            "native": true
          }
        ],
        "previewFeatures": [
          "driverAdapters"
        ],
        "sourceFilePath": "/home/gemini/project/bazi_fortune_app/workers-api/prisma/schema.prisma"
      },
      "relativeEnvPaths": {
        "rootEnvPath": null
      },
      "relativePath": "../../../prisma",
      "clientVersion": "5.22.0",
      "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
      "datasourceNames": [
        "db"
      ],
      "activeProvider": "sqlite",
      "postinstall": false,
      "inlineDatasources": {
        "db": {
          "url": {
            "fromEnvVar": null,
            "value": "file:dev.db"
          }
        }
      },
      "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ngenerator client {\n  provider        = "prisma-client-js"\n  previewFeatures = ["driverAdapters"]\n}\n\ndatasource db {\n  provider = "sqlite"\n  url      = "file:dev.db"\n}\n\nmodel User {\n  id        String   @id @default(cuid())\n  email     String?\n  username  String\n  password  String\n  role      String   @default("USER")\n  avatarUrl String?\n  phone     String   @unique\n  isActive  Boolean  @default(true)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  baziData BaziData[]\n  orders   Order[]\n  master   Master?\n  Chat     Chat[]\n\n  @@map("users")\n}\n\nmodel BaziData {\n  id         String   @id @default(cuid())\n  userId     String\n  inputData  String // JSON\u5B57\u7B26\u4E32\uFF0CD1\u4E0D\u652F\u6301Json\u7C7B\u578B\n  resultData String // JSON\u5B57\u7B26\u4E32\uFF0CD1\u4E0D\u652F\u6301Json\u7C7B\u578B\n  analysis   String? // AI\u5206\u6790\u7ED3\u679C\n  createdAt  DateTime @default(now())\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map("bazi_data")\n}\n\nmodel Order {\n  id          String   @id @default(cuid())\n  userId      String\n  type        String // CONSULTATION, ANALYSIS, MEMBERSHIP\n  amount      Decimal\n  status      String   @default("PENDING") // PENDING, COMPLETED, CANCELLED\n  description String?\n  metadata    String? // JSON\u5B57\u7B26\u4E32\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map("orders")\n}\n\nmodel Master {\n  id          String   @id @default(cuid())\n  userId      String   @unique\n  title       String\n  description String?\n  price       Decimal\n  rating      Decimal?\n  available   Boolean  @default(true)\n  createdAt   DateTime @default(now())\n\n  user User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n  Chat Chat[]\n\n  @@map("masters")\n}\n\nmodel Chat {\n  id          String   @id @default(cuid())\n  userId      String\n  masterId    String\n  messages    String // JSON\u5B57\u7B26\u4E32\n  status      String   @default("active")\n  lastMessage String?\n  isRead      Boolean  @default(false)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n  master Master @relation(fields: [masterId], references: [id], onDelete: Cascade)\n\n  @@map("chats")\n}\n',
      "inlineSchemaHash": "9e3729c90d2c913fcf804cb3bebb4381bbb4f9c6de2f93de95b3a8f84517fd5a",
      "copyEngine": true
    };
    config.dirname = "/";
    config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"username","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"role","kind":"scalar","type":"String"},{"name":"avatarUrl","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"baziData","kind":"object","type":"BaziData","relationName":"BaziDataToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"master","kind":"object","type":"Master","relationName":"MasterToUser"},{"name":"Chat","kind":"object","type":"Chat","relationName":"ChatToUser"}],"dbName":"users"},"BaziData":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"inputData","kind":"scalar","type":"String"},{"name":"resultData","kind":"scalar","type":"String"},{"name":"analysis","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"BaziDataToUser"}],"dbName":"bazi_data"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"type","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"metadata","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"}],"dbName":"orders"},"Master":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"rating","kind":"scalar","type":"Decimal"},{"name":"available","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"MasterToUser"},{"name":"Chat","kind":"object","type":"Chat","relationName":"ChatToMaster"}],"dbName":"masters"},"Chat":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"masterId","kind":"scalar","type":"String"},{"name":"messages","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"lastMessage","kind":"scalar","type":"String"},{"name":"isRead","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"ChatToUser"},{"name":"master","kind":"object","type":"Master","relationName":"ChatToMaster"}],"dbName":"chats"}},"enums":{},"types":{}}');
    defineDmmfProperty2(exports.Prisma, config.runtimeDataModel);
    config.engineWasm = {
      getRuntime: /* @__PURE__ */ __name(() => require_query_engine_bg(), "getRuntime"),
      getQueryEngineWasmModule: /* @__PURE__ */ __name(async () => {
        const loader = (await Promise.resolve().then(() => (init_wasm_worker_loader(), wasm_worker_loader_exports))).default;
        const engine = (await loader).default;
        return engine;
      }, "getQueryEngineWasmModule")
    };
    config.injectableEdgeEnv = () => ({
      parsed: {}
    });
    if (typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0) {
      Debug3.enable(typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0);
    }
    var PrismaClient2 = getPrismaClient3(config);
    exports.PrismaClient = PrismaClient2;
    Object.assign(exports, Prisma);
  }
});

// node_modules/.prisma/client/default.js
var require_default = __commonJS({
  "node_modules/.prisma/client/default.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    module.exports = { ...require_wasm2() };
  }
});

// node_modules/@prisma/client/default.js
var require_default2 = __commonJS({
  "node_modules/@prisma/client/default.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    module.exports = {
      ...require_default()
    };
  }
});

// .wrangler/tmp/bundle-lTUTS4/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();

// .wrangler/tmp/bundle-lTUTS4/middleware-insertion-facade.js
init_checked_fetch();
init_modules_watch_stub();

// src/index.ts
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/hono.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/hono-base.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/compose.js
init_checked_fetch();
init_modules_watch_stub();
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err2) {
          if (err2 instanceof Error && onError) {
            context.error = err2;
            res = await onError(err2, context);
            isError = true;
          } else {
            throw err2;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/context.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/request.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/http-exception.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/request/constants.js
init_checked_fetch();
init_modules_watch_stub();
var GET_MATCH_RESULT = Symbol();

// node_modules/hono/dist/utils/body.js
init_checked_fetch();
init_modules_watch_stub();
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// node_modules/hono/dist/utils/url.js
init_checked_fetch();
init_modules_watch_stub();
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const path = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf(`?${key}`, 8);
    if (keyIndex2 === -1) {
      keyIndex2 = url.indexOf(`&${key}`, 8);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name2 = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name2 = _decodeURI(name2);
    }
    keyIndex = nextKeyIndex;
    if (name2 === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name2] && Array.isArray(results[name2]))) {
        results[name2] = [];
      }
      ;
      results[name2].push(value);
    } else {
      results[name2] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = class {
  static {
    __name(this, "HonoRequest");
  }
  raw;
  #validatedData;
  #matchResult;
  routeIndex = 0;
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name2) {
    if (name2) {
      return this.raw.headers.get(name2) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = /* @__PURE__ */ __name((key) => {
    const { bodyCache, raw: raw3 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw3[key]();
  }, "#cachedBody");
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  text() {
    return this.#cachedBody("text");
  }
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  blob() {
    return this.#cachedBody("blob");
  }
  formData() {
    return this.#cachedBody("formData");
  }
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
init_checked_fetch();
init_modules_watch_stub();
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw2 = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c2) => c2({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw2(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var Context = class {
  static {
    __name(this, "Context");
  }
  #rawRequest;
  #req;
  env = {};
  #var;
  finalized = false;
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    return this.#res ||= new Response(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  set res(_res) {
    if (this.#res && _res) {
      _res = new Response(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  render = /* @__PURE__ */ __name((...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  }, "render");
  setLayout = /* @__PURE__ */ __name((layout) => this.#layout = layout, "setLayout");
  getLayout = /* @__PURE__ */ __name(() => this.#layout, "getLayout");
  setRenderer = /* @__PURE__ */ __name((renderer) => {
    this.#renderer = renderer;
  }, "setRenderer");
  header = /* @__PURE__ */ __name((name2, value, options) => {
    if (this.finalized) {
      this.#res = new Response(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name2);
    } else if (options?.append) {
      headers.append(name2, value);
    } else {
      headers.set(name2, value);
    }
  }, "header");
  status = /* @__PURE__ */ __name((status) => {
    this.#status = status;
  }, "status");
  set = /* @__PURE__ */ __name((key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  }, "set");
  get = /* @__PURE__ */ __name((key) => {
    return this.#var ? this.#var.get(key) : void 0;
  }, "get");
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return new Response(data, { status, headers: responseHeaders });
  }
  newResponse = /* @__PURE__ */ __name((...args) => this.#newResponse(...args), "newResponse");
  body = /* @__PURE__ */ __name((data, arg, headers) => this.#newResponse(data, arg, headers), "body");
  text = /* @__PURE__ */ __name((text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  }, "text");
  json = /* @__PURE__ */ __name((object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  }, "json");
  html = /* @__PURE__ */ __name((html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  }, "html");
  redirect = /* @__PURE__ */ __name((location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  }, "redirect");
  notFound = /* @__PURE__ */ __name(() => {
    this.#notFoundHandler ??= () => new Response();
    return this.#notFoundHandler(this);
  }, "notFound");
};

// node_modules/hono/dist/router.js
init_checked_fetch();
init_modules_watch_stub();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
  static {
    __name(this, "UnsupportedPathError");
  }
};

// node_modules/hono/dist/utils/constants.js
init_checked_fetch();
init_modules_watch_stub();
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c2) => {
  return c2.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err2, c2) => {
  if ("getResponse" in err2) {
    const res = err2.getResponse();
    return c2.newResponse(res.body, res);
  }
  console.error(err2);
  return c2.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = class {
  static {
    __name(this, "Hono");
  }
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  errorHandler = errorHandler;
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c2, next) => (await compose([], app2.errorHandler)(c2, () => r.handler(c2, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError = /* @__PURE__ */ __name((handler) => {
    this.errorHandler = handler;
    return this;
  }, "onError");
  notFound = /* @__PURE__ */ __name((handler) => {
    this.#notFoundHandler = handler;
    return this;
  }, "notFound");
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c2) => {
      const options2 = optionHandler(c2);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c2) => {
      let executionContext = void 0;
      try {
        executionContext = c2.executionCtx;
      } catch {
      }
      return [c2.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c2, next) => {
      const res = await applicationHandler(replaceRequest(c2.req.raw), ...getOptions(c2));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err2, c2) {
    if (err2 instanceof Error) {
      return this.errorHandler(err2, c2);
    }
    throw err2;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c2 = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c2, async () => {
          c2.res = await this.#notFoundHandler(c2);
        });
      } catch (err2) {
        return this.#handleError(err2, c2);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c2.finalized ? c2.res : this.#notFoundHandler(c2))
      ).catch((err2) => this.#handleError(err2, c2)) : res ?? this.#notFoundHandler(c2);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c2);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err2) {
        return this.#handleError(err2, c2);
      }
    })();
  }
  fetch = /* @__PURE__ */ __name((request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  }, "fetch");
  request = /* @__PURE__ */ __name((input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  }, "request");
  fire = /* @__PURE__ */ __name(() => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  }, "fire");
};

// node_modules/hono/dist/router/reg-exp-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/reg-exp-router/router.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/reg-exp-router/matcher.js
init_checked_fetch();
init_modules_watch_stub();
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }, "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// node_modules/hono/dist/router/reg-exp-router/node.js
init_checked_fetch();
init_modules_watch_stub();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = class {
  static {
    __name(this, "Node");
  }
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name2 = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name2 && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new Node();
        if (name2 !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name2 !== "") {
        paramMap.push([name2, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c2 = this.#children[k];
      return (typeof c2.#varIndex === "number" ? `(${k})@${c2.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c2.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
init_checked_fetch();
init_modules_watch_stub();
var Trie = class {
  static {
    __name(this, "Trie");
  }
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = class {
  static {
    __name(this, "RegExpRouter");
  }
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/reg-exp-router/prepared-router.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/smart-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/smart-router/router.js
init_checked_fetch();
init_modules_watch_stub();
var SmartRouter = class {
  static {
    __name(this, "SmartRouter");
  }
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init2) {
    this.#routers = init2.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/trie-router/router.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/trie-router/node.js
init_checked_fetch();
init_modules_watch_stub();
var emptyParams = /* @__PURE__ */ Object.create(null);
var Node2 = class {
  static {
    __name(this, "Node");
  }
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #getHandlerSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              handlerSets.push(
                ...this.#getHandlerSets(nextNode.#children["*"], method, node.#params)
              );
            }
            handlerSets.push(...this.#getHandlerSets(nextNode, method, node.#params));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              handlerSets.push(...this.#getHandlerSets(astNode, method, node.#params));
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name2, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp) {
            const m = matcher.exec(restPathString);
            if (m) {
              params[name2] = m[0];
              handlerSets.push(...this.#getHandlerSets(child, method, node.#params, params));
              if (Object.keys(child.#children).length) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name2] = part;
            if (isLast) {
              handlerSets.push(...this.#getHandlerSets(child, method, params, node.#params));
              if (child.#children["*"]) {
                handlerSets.push(
                  ...this.#getHandlerSets(child.#children["*"], method, params, node.#params)
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      curNodes = tempNodes.concat(curNodesQueue.shift() ?? []);
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  static {
    __name(this, "TrieRouter");
  }
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  static {
    __name(this, "Hono");
  }
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// node_modules/hono/dist/middleware/cors/index.js
init_checked_fetch();
init_modules_watch_stub();
var cors = /* @__PURE__ */ __name((options) => {
  const defaults = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: []
  };
  const opts = {
    ...defaults,
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return /* @__PURE__ */ __name(async function cors2(c2, next) {
    function set(key, value) {
      c2.res.headers.set(key, value);
    }
    __name(set, "set");
    const allowOrigin = await findAllowOrigin(c2.req.header("origin") || "", c2);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.origin !== "*") {
      const existingVary = c2.req.header("Vary");
      if (existingVary) {
        set("Vary", existingVary);
      } else {
        set("Vary", "Origin");
      }
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c2.req.method === "OPTIONS") {
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c2.req.header("origin") || "", c2);
      if (allowMethods.length) {
        set("Access-Control-Allow-Methods", allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c2.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c2.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c2.res.headers.delete("Content-Length");
      c2.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c2.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
  }, "cors2");
}, "cors");

// node_modules/hono/dist/middleware/logger/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/utils/color.js
init_checked_fetch();
init_modules_watch_stub();
function getColorEnabled() {
  const { process: process2, Deno } = globalThis;
  const isNoColor = typeof Deno?.noColor === "boolean" ? Deno.noColor : process2 !== void 0 ? "NO_COLOR" in process2?.env : false;
  return !isNoColor;
}
__name(getColorEnabled, "getColorEnabled");
async function getColorEnabledAsync() {
  const { navigator } = globalThis;
  const cfWorkers = "cloudflare:workers";
  const isNoColor = navigator !== void 0 && navigator.userAgent === "Cloudflare-Workers" ? await (async () => {
    try {
      return "NO_COLOR" in ((await import(cfWorkers)).env ?? {});
    } catch {
      return false;
    }
  })() : !getColorEnabled();
  return !isNoColor;
}
__name(getColorEnabledAsync, "getColorEnabledAsync");

// node_modules/hono/dist/middleware/logger/index.js
var humanize = /* @__PURE__ */ __name((times) => {
  const [delimiter, separator] = [",", "."];
  const orderTimes = times.map((v) => v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter));
  return orderTimes.join(separator);
}, "humanize");
var time = /* @__PURE__ */ __name((start) => {
  const delta = Date.now() - start;
  return humanize([delta < 1e3 ? delta + "ms" : Math.round(delta / 1e3) + "s"]);
}, "time");
var colorStatus = /* @__PURE__ */ __name(async (status) => {
  const colorEnabled = await getColorEnabledAsync();
  if (colorEnabled) {
    switch (status / 100 | 0) {
      case 5:
        return `\x1B[31m${status}\x1B[0m`;
      case 4:
        return `\x1B[33m${status}\x1B[0m`;
      case 3:
        return `\x1B[36m${status}\x1B[0m`;
      case 2:
        return `\x1B[32m${status}\x1B[0m`;
    }
  }
  return `${status}`;
}, "colorStatus");
async function log(fn, prefix, method, path, status = 0, elapsed) {
  const out = prefix === "<--" ? `${prefix} ${method} ${path}` : `${prefix} ${method} ${path} ${await colorStatus(status)} ${elapsed}`;
  fn(out);
}
__name(log, "log");
var logger = /* @__PURE__ */ __name((fn = console.log) => {
  return /* @__PURE__ */ __name(async function logger2(c2, next) {
    const { method, url } = c2.req;
    const path = url.slice(url.indexOf("/", 8));
    await log(fn, "<--", method, path);
    const start = Date.now();
    await next();
    await log(fn, "-->", method, path, c2.res.status, time(start));
  }, "logger2");
}, "logger");

// src/lib/db.ts
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@prisma/adapter-d1/dist/index.mjs
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@prisma/driver-adapter-utils/dist/index.mjs
init_checked_fetch();
init_modules_watch_stub();
var import_debug = __toESM(require_dist(), 1);
function ok(value) {
  return {
    ok: true,
    value,
    map(fn) {
      return ok(fn(value));
    },
    flatMap(fn) {
      return fn(value);
    }
  };
}
__name(ok, "ok");
function err(error) {
  return {
    ok: false,
    error,
    map() {
      return err(error);
    },
    flatMap() {
      return err(error);
    }
  };
}
__name(err, "err");
var ColumnTypeEnum = {
  // Scalars
  Int32: 0,
  Int64: 1,
  Float: 2,
  Double: 3,
  Numeric: 4,
  Boolean: 5,
  Character: 6,
  Text: 7,
  Date: 8,
  Time: 9,
  DateTime: 10,
  Json: 11,
  Enum: 12,
  Bytes: 13,
  Set: 14,
  Uuid: 15,
  // Arrays
  Int32Array: 64,
  Int64Array: 65,
  FloatArray: 66,
  DoubleArray: 67,
  NumericArray: 68,
  BooleanArray: 69,
  CharacterArray: 70,
  TextArray: 71,
  DateArray: 72,
  TimeArray: 73,
  DateTimeArray: 74,
  JsonArray: 75,
  EnumArray: 76,
  BytesArray: 77,
  UuidArray: 78,
  // Custom
  UnknownNumber: 128
};

// node_modules/@prisma/adapter-d1/dist/index.mjs
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}
var $ = {
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
};
function init(x, y) {
  let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
  let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
  return function(txt) {
    if (!$.enabled || txt == null) return txt;
    return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
  };
}
__name(init, "init");
var reset = init(0, 0);
var bold = init(1, 22);
var dim = init(2, 22);
var italic = init(3, 23);
var underline = init(4, 24);
var inverse = init(7, 27);
var hidden = init(8, 28);
var strikethrough = init(9, 29);
var black = init(30, 39);
var red = init(31, 39);
var green = init(32, 39);
var yellow = init(33, 39);
var blue = init(34, 39);
var magenta = init(35, 39);
var cyan = init(36, 39);
var white = init(37, 39);
var gray = init(90, 39);
var grey = init(90, 39);
var bgBlack = init(40, 49);
var bgRed = init(41, 49);
var bgGreen = init(42, 49);
var bgYellow = init(43, 49);
var bgBlue = init(44, 49);
var bgMagenta = init(45, 49);
var bgCyan = init(46, 49);
var bgWhite = init(47, 49);
var name = "@prisma/adapter-d1";
function getColumnTypes(columnNames, rows) {
  const columnTypes = [];
  columnLoop: for (let columnIndex = 0; columnIndex < columnNames.length; columnIndex++) {
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const candidateValue = rows[rowIndex][columnIndex];
      if (candidateValue !== null) {
        columnTypes[columnIndex] = inferColumnType(candidateValue);
        continue columnLoop;
      }
    }
    columnTypes[columnIndex] = ColumnTypeEnum.Int32;
  }
  return columnTypes;
}
__name(getColumnTypes, "getColumnTypes");
function inferColumnType(value) {
  switch (typeof value) {
    case "string":
      return inferStringType(value);
    case "number":
      return inferNumberType(value);
    case "object":
      return inferObjectType(value);
    default:
      throw new UnexpectedTypeError(value);
  }
}
__name(inferColumnType, "inferColumnType");
var isoDateRegex = new RegExp(
  /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/
);
var sqliteDateRegex = /^\d{4}-[0-1]\d-[0-3]\d [0-2]\d:[0-5]\d:[0-5]\d$/;
function isISODate(str) {
  return isoDateRegex.test(str) || sqliteDateRegex.test(str);
}
__name(isISODate, "isISODate");
function inferStringType(value) {
  if (isISODate(value)) {
    return ColumnTypeEnum.DateTime;
  }
  return ColumnTypeEnum.Text;
}
__name(inferStringType, "inferStringType");
function inferNumberType(_) {
  return ColumnTypeEnum.Double;
}
__name(inferNumberType, "inferNumberType");
function inferObjectType(value) {
  if (value instanceof Array) {
    return ColumnTypeEnum.Bytes;
  }
  throw new UnexpectedTypeError(value);
}
__name(inferObjectType, "inferObjectType");
var UnexpectedTypeError = class extends Error {
  static {
    __name(this, "UnexpectedTypeError");
  }
  constructor(value) {
    const type = typeof value;
    const repr = type === "object" ? JSON.stringify(value) : String(value);
    super(`unexpected value of type ${type}: ${repr}`);
    this.name = "UnexpectedTypeError";
  }
};
function mapRow(result, columnTypes) {
  for (let i = 0; i < result.length; i++) {
    const value = result[i];
    if (value instanceof ArrayBuffer) {
      result[i] = Array.from(new Uint8Array(value));
      continue;
    }
    if (typeof value === "number" && (columnTypes[i] === ColumnTypeEnum.Int32 || columnTypes[i] === ColumnTypeEnum.Int64) && !Number.isInteger(value)) {
      result[i] = Math.trunc(value);
      continue;
    }
    if (typeof value === "bigint") {
      result[i] = value.toString();
      continue;
    }
    if (columnTypes[i] === ColumnTypeEnum.Boolean) {
      result[i] = JSON.parse(value);
    }
  }
  return result;
}
__name(mapRow, "mapRow");
function cleanArg(arg, argType) {
  if (arg !== null) {
    if (argType === "Int64") {
      const asInt56 = Number.parseInt(arg);
      if (!Number.isSafeInteger(asInt56)) {
        throw new Error(`Invalid Int64-encoded value received: ${arg}`);
      }
      return asInt56;
    }
    if (argType === "Int32") {
      return Number.parseInt(arg);
    }
    if (argType === "Float" || argType === "Double") {
      return Number.parseFloat(arg);
    }
    if (arg === true) {
      return 1;
    }
    if (arg === false) {
      return 0;
    }
    if (arg instanceof Uint8Array) {
      return Array.from(arg);
    }
  }
  return arg;
}
__name(cleanArg, "cleanArg");
function matchSQLiteErrorCode(message) {
  let extendedCode = 1;
  if (!message) return extendedCode;
  if (message.startsWith("D1_ERROR: UNIQUE constraint failed:")) {
    extendedCode = 2067;
  } else if (message.startsWith("D1_ERROR: FOREIGN KEY constraint failed")) {
    extendedCode = 787;
  } else if (message.startsWith("D1_ERROR: NOT NULL constraint failed")) {
    extendedCode = 1299;
  } else if (message.startsWith("D1_ERROR: CHECK constraint failed")) {
    extendedCode = 1811;
  } else if (message.startsWith("D1_ERROR: PRIMARY KEY constraint failed")) {
    extendedCode = 1555;
  }
  return extendedCode;
}
__name(matchSQLiteErrorCode, "matchSQLiteErrorCode");
var debug = (0, import_debug.Debug)("prisma:driver-adapter:d1");
var D1Queryable = class {
  static {
    __name(this, "D1Queryable");
  }
  constructor(client) {
    this.client = client;
    this.provider = "sqlite";
    this.adapterName = name;
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters.
   */
  async queryRaw(query) {
    const tag = "[js::query_raw]";
    debug(`${tag} %O`, query);
    const ioResult = await this.performIO(query);
    return ioResult.map((data) => {
      const convertedData = this.convertData(data);
      return convertedData;
    });
  }
  convertData(ioResult) {
    const columnNames = ioResult[0];
    const results = ioResult[1];
    if (results.length === 0) {
      return {
        columnNames: [],
        columnTypes: [],
        rows: []
      };
    }
    const columnTypes = Object.values(getColumnTypes(columnNames, results));
    const rows = results.map((value) => mapRow(value, columnTypes));
    return {
      columnNames,
      // * Note: without Object.values the array looks like
      // * columnTypes: [ id: 128 ],
      // * and errors with:
      // * ✘ [ERROR] A hanging Promise was canceled. This happens when the worker runtime is waiting for a Promise from JavaScript to resolve, but has detected that the Promise cannot possibly ever resolve because all code and events related to the Promise's I/O context have already finished.
      columnTypes,
      rows
    };
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters and
   * returning the number of affected rows.
   * Note: Queryable expects a u64, but napi.rs only supports u32.
   */
  async executeRaw(query) {
    const tag = "[js::execute_raw]";
    debug(`${tag} %O`, query);
    const res = await this.performIO(query, true);
    return res.map((result) => result.meta.changes ?? 0);
  }
  async performIO(query, executeRaw = false) {
    try {
      query.args = query.args.map((arg, i) => cleanArg(arg, query.argTypes[i]));
      const stmt = this.client.prepare(query.sql).bind(...query.args);
      if (executeRaw) {
        return ok(await stmt.run());
      } else {
        const [columnNames, ...rows] = await stmt.raw({ columnNames: true });
        return ok([columnNames, rows]);
      }
    } catch (e) {
      console.error("Error in performIO: %O", e);
      const { message } = e;
      return err({
        kind: "Sqlite",
        extendedCode: matchSQLiteErrorCode(message),
        message
      });
    }
  }
};
var D1Transaction = class extends D1Queryable {
  static {
    __name(this, "D1Transaction");
  }
  constructor(client, options) {
    super(client);
    this.options = options;
  }
  async commit() {
    debug(`[js::commit]`);
    return ok(void 0);
  }
  async rollback() {
    debug(`[js::rollback]`);
    return ok(void 0);
  }
};
var D1TransactionContext = class extends D1Queryable {
  static {
    __name(this, "D1TransactionContext");
  }
  constructor(client) {
    super(client);
    this.client = client;
  }
  async startTransaction() {
    const options = {
      // TODO: D1 does not have a Transaction API.
      usePhantomQuery: true
    };
    const tag = "[js::startTransaction]";
    debug("%s options: %O", tag, options);
    return ok(new D1Transaction(this.client, options));
  }
};
var PrismaD1 = class extends D1Queryable {
  static {
    __name(this, "PrismaD1");
  }
  constructor(client) {
    super(client);
    this.tags = {
      error: red("prisma:error"),
      warn: yellow("prisma:warn"),
      info: cyan("prisma:info"),
      query: blue("prisma:query")
    };
    this.alreadyWarned = /* @__PURE__ */ new Set();
    this.warnOnce = (key, message, ...args) => {
      if (!this.alreadyWarned.has(key)) {
        this.alreadyWarned.add(key);
        console.info(`${this.tags.warn} ${message}`, ...args);
      }
    };
  }
  getConnectionInfo() {
    return ok({
      maxBindValues: 98
    });
  }
  async transactionContext() {
    this.warnOnce(
      "D1 Transaction",
      "Cloudflare D1 does not support transactions yet. When using Prisma's D1 adapter, implicit & explicit transactions will be ignored and run as individual queries, which breaks the guarantees of the ACID properties of transactions. For more details see https://pris.ly/d/d1-transactions"
    );
    return ok(new D1TransactionContext(this.client));
  }
};

// src/lib/db.ts
var import_client = __toESM(require_default2());
var prisma;
function getPrismaClient2(env) {
  if (!prisma) {
    const adapter = new PrismaD1(env.DB);
    prisma = new import_client.PrismaClient({
      adapter
      // D1适配器不需要datasources配置
    });
  }
  return prisma;
}
__name(getPrismaClient2, "getPrismaClient");

// src/routes_backup/auth.ts
init_checked_fetch();
init_modules_watch_stub();

// src/lib/auth.ts
init_checked_fetch();
init_modules_watch_stub();
async function generateJWT(payload, secret) {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };
  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(payload));
  const signature = await sign(`${encodedHeader}.${encodedPayload}`, secret);
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}
__name(generateJWT, "generateJWT");
async function verifyJWT(token, secret) {
  const [encodedHeader, encodedPayload, signature] = token.split(".");
  const expectedSignature = await sign(
    `${encodedHeader}.${encodedPayload}`,
    secret
  );
  if (signature !== expectedSignature) {
    throw new Error("Invalid signature");
  }
  const payload = JSON.parse(base64urlDecode(encodedPayload));
  if (payload.exp && Date.now() >= payload.exp * 1e3) {
    throw new Error("Token expired");
  }
  return payload;
}
__name(verifyJWT, "verifyJWT");
async function sign(data, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return base64urlEncode(new Uint8Array(signature));
}
__name(sign, "sign");
function base64urlEncode(str) {
  if (typeof str === "string") {
    str = new TextEncoder().encode(str);
  }
  return btoa(String.fromCharCode(...str)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
__name(base64urlEncode, "base64urlEncode");
function base64urlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  return atob(str);
}
__name(base64urlDecode, "base64urlDecode");

// src/routes_backup/auth.ts
var authRoutes = new Hono2();
authRoutes.post("/register", async (c2) => {
  try {
    const { phone, username, password } = await c2.req.json();
    if (!phone || !username || !password) {
      return c2.json({ error: "Missing required fields" }, 400);
    }
    const prisma2 = getPrismaClient2(c2.env);
    const existingUser = await prisma2.user.findUnique({
      where: { phone }
    });
    if (existingUser) {
      return c2.json({ error: "User already exists" }, 409);
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma2.user.create({
      data: {
        phone,
        username,
        password: hashedPassword,
        role: "USER"
      },
      select: {
        id: true,
        phone: true,
        username: true,
        role: true,
        createdAt: true
      }
    });
    const payload = {
      userId: user.id,
      phone: user.phone,
      role: user.role
    };
    const token = await generateJWT(payload, c2.env.JWT_SECRET);
    return c2.json({
      user,
      token
    });
  } catch (error) {
    console.error("Registration error:", error);
    return c2.json({ error: "Registration failed" }, 500);
  }
});
authRoutes.post("/login", async (c2) => {
  try {
    const { phone, password } = await c2.req.json();
    if (!phone || !password) {
      return c2.json({ error: "Missing phone or password" }, 400);
    }
    const prisma2 = getPrismaClient2(c2.env);
    const user = await prisma2.user.findUnique({
      where: { phone }
    });
    if (!user) {
      return c2.json({ error: "Invalid credentials" }, 401);
    }
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return c2.json({ error: "Invalid credentials" }, 401);
    }
    const payload = {
      userId: user.id,
      phone: user.phone,
      role: user.role
    };
    const token = await generateJWT(payload, c2.env.JWT_SECRET);
    return c2.json({
      user: {
        id: user.id,
        phone: user.phone,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt
      },
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    return c2.json({ error: "Login failed" }, 500);
  }
});
authRoutes.post("/refresh", async (c2) => {
  try {
    const authorization = c2.req.header("Authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return c2.json({ error: "Missing or invalid token" }, 401);
    }
    const token = authorization.substring(7);
    const payload = await verifyJWT(token, c2.env.JWT_SECRET);
    const prisma2 = getPrismaClient2(c2.env);
    const user = await prisma2.user.findUnique({
      where: { id: payload.userId }
    });
    if (!user) {
      return c2.json({ error: "User not found" }, 404);
    }
    const newPayload = {
      userId: user.id,
      phone: user.phone,
      role: user.role
    };
    const newToken = await generateJWT(newPayload, c2.env.JWT_SECRET);
    return c2.json({
      user: {
        id: user.id,
        phone: user.phone,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt
      },
      token: newToken
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    return c2.json({ error: "Token refresh failed" }, 401);
  }
});
authRoutes.get("/profile", async (c2) => {
  try {
    const authorization = c2.req.header("Authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return c2.json({ error: "Missing or invalid token" }, 401);
    }
    const token = authorization.substring(7);
    const payload = await verifyJWT(token, c2.env.JWT_SECRET);
    const prisma2 = getPrismaClient2(c2.env);
    const user = await prisma2.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        phone: true,
        username: true,
        role: true,
        createdAt: true
      }
    });
    if (!user) {
      return c2.json({ error: "User not found" }, 404);
    }
    return c2.json({ user });
  } catch (error) {
    console.error("Get profile error:", error);
    return c2.json({ error: "Failed to get profile" }, 500);
  }
});
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode("pepper"),
    // 在实际应用中应使用环境变量
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const saltedPassword = new Uint8Array(salt.length + data.length);
  saltedPassword.set(salt);
  saltedPassword.set(data, salt.length);
  const signature = await crypto.subtle.sign("HMAC", key, saltedPassword);
  const combined = new Uint8Array(salt.length + signature.byteLength);
  combined.set(salt);
  combined.set(new Uint8Array(signature), salt.length);
  return btoa(String.fromCharCode(...combined));
}
__name(hashPassword, "hashPassword");
async function verifyPassword(password, hashedPassword) {
  try {
    const encoder = new TextEncoder();
    const combined = new Uint8Array(
      Array.from(atob(hashedPassword)).map((char) => char.charCodeAt(0))
    );
    const salt = combined.slice(0, 16);
    const storedHash = combined.slice(16);
    const data = encoder.encode(password);
    const saltedPassword = new Uint8Array(salt.length + data.length);
    saltedPassword.set(salt);
    saltedPassword.set(data, salt.length);
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode("pepper"),
      // 与哈希时相同的值
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, saltedPassword);
    if (signature.byteLength !== storedHash.length) {
      return false;
    }
    const signatureArray = new Uint8Array(signature);
    for (let i = 0; i < signature.byteLength; i++) {
      if (signatureArray[i] !== storedHash[i]) {
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
}
__name(verifyPassword, "verifyPassword");

// src/routes/bazi.ts
init_checked_fetch();
init_modules_watch_stub();

// src/lib/bazi.ts
init_checked_fetch();
init_modules_watch_stub();
function calculateBaziResult(input) {
  const tianGan = ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"];
  const diZhi = ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"];
  const zodiac = ["\u9F20", "\u725B", "\u864E", "\u5154", "\u9F99", "\u86C7", "\u9A6C", "\u7F8A", "\u7334", "\u9E21", "\u72D7", "\u732A"];
  const yearIndex = (input.year - 4) % 60;
  const yearTianGan = tianGan[yearIndex % 10];
  const yearDiZhi = diZhi[yearIndex % 12];
  const monthIndex = (input.month - 1 + yearIndex * 12) % 60;
  const monthTianGan = tianGan[monthIndex % 10];
  const monthDiZhi = diZhi[monthIndex % 12];
  const dayIndex = (input.year * 365 + input.month * 30 + input.day) % 60;
  const dayTianGan = tianGan[dayIndex % 10];
  const dayDiZhi = diZhi[dayIndex % 12];
  const hourIndex = (Math.floor(input.hour / 2) + dayIndex * 12) % 60;
  const hourTianGan = tianGan[hourIndex % 10];
  const hourDiZhi = diZhi[hourIndex % 12];
  return {
    yearPillar: yearTianGan + yearDiZhi,
    monthPillar: monthTianGan + monthDiZhi,
    dayPillar: dayTianGan + dayDiZhi,
    hourPillar: hourTianGan + hourDiZhi,
    dayMaster: dayTianGan,
    zodiac: zodiac[(input.year - 4) % 12],
    nayin: "\u6D77\u4E2D\u91D1",
    // 简化处理
    season: getSeason(input.month),
    solarTerms: ["\u7ACB\u6625", "\u96E8\u6C34"],
    // 简化处理
    lunarDate: "\u519C\u5386\u6B63\u6708\u521D\u4E00",
    // 简化处理，实际需要转换
    fiveElements: {
      "\u6728": 2,
      "\u706B": 1,
      "\u571F": 2,
      "\u91D1": 2,
      "\u6C34": 1
    },
    shiShen: {
      "\u5E74": "\u6B63\u5B98",
      "\u6708": "\u504F\u8D22",
      "\u65E5": "\u65E5\u4E3B",
      "\u65F6": "\u98DF\u795E"
    },
    yongShen: ["\u6C34", "\u6728"],
    xiShen: ["\u91D1"],
    jiShen: ["\u706B", "\u571F"],
    luckyElements: ["\u6C34", "\u6728", "\u91D1"],
    colors: ["\u9ED1\u8272", "\u84DD\u8272", "\u7EFF\u8272", "\u767D\u8272"],
    numbers: [1, 6, 3, 8, 4, 9],
    directions: ["\u5317\u65B9", "\u4E1C\u65B9", "\u897F\u65B9"]
  };
}
__name(calculateBaziResult, "calculateBaziResult");
function getSeason(month) {
  switch (true) {
    case (month >= 3 && month <= 5):
      return "\u6625\u5B63";
    case (month >= 6 && month <= 8):
      return "\u590F\u5B63";
    case (month >= 9 && month <= 11):
      return "\u79CB\u5B63";
    default:
      return "\u51AC\u5B63";
  }
}
__name(getSeason, "getSeason");

// src/routes/bazi.ts
var baziRoutes = new Hono2();
async function authMiddleware(c2, next) {
  const authorization = c2.req.header("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return c2.json({ error: "Missing or invalid token" }, 401);
  }
  try {
    const token = authorization.substring(7);
    const payload = await verifyJWT(token, c2.env.JWT_SECRET);
    c2.set("userId", payload.userId);
    c2.set("userRole", payload.role);
    await next();
  } catch (error) {
    return c2.json({ error: "Invalid token" }, 401);
  }
}
__name(authMiddleware, "authMiddleware");
baziRoutes.post("/calculate", authMiddleware, async (c2) => {
  try {
    const userId = c2.get("userId");
    const baziInput = await c2.req.json();
    if (!baziInput.year || !baziInput.month || !baziInput.day || !baziInput.hour) {
      return c2.json({ error: "Missing required date/time fields" }, 400);
    }
    const baziResult = calculateBaziResult(baziInput);
    const prisma2 = getPrismaClient2(c2.env);
    const baziData = await prisma2.baziData.create({
      data: {
        userId,
        inputData: baziInput,
        resultData: baziResult
      }
    });
    return c2.json({
      id: baziData.id,
      input: baziInput,
      result: baziResult,
      createdAt: baziData.createdAt
    });
  } catch (error) {
    console.error("Bazi calculation error:", error);
    return c2.json({ error: "Failed to calculate bazi" }, 500);
  }
});
baziRoutes.get("/history", authMiddleware, async (c2) => {
  try {
    const userId = c2.get("userId");
    const page = parseInt(c2.req.query("page") || "1");
    const limit = parseInt(c2.req.query("limit") || "10");
    const prisma2 = getPrismaClient2(c2.env);
    const [baziData, total] = await Promise.all([
      prisma2.baziData.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          inputData: true,
          resultData: true,
          analysis: true,
          createdAt: true
        }
      }),
      prisma2.baziData.count({ where: { userId } })
    ]);
    return c2.json({
      data: baziData,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Get bazi history error:", error);
    return c2.json({ error: "Failed to get bazi history" }, 500);
  }
});
baziRoutes.get("/:id", authMiddleware, async (c2) => {
  try {
    const userId = c2.get("userId");
    const baziId = c2.req.param("id");
    const prisma2 = getPrismaClient2(c2.env);
    const baziData = await prisma2.baziData.findFirst({
      where: {
        id: baziId,
        userId
        // 确保用户只能访问自己的数据
      }
    });
    if (!baziData) {
      return c2.json({ error: "Bazi data not found" }, 404);
    }
    return c2.json({
      id: baziData.id,
      input: baziData.inputData,
      result: baziData.resultData,
      analysis: baziData.analysis,
      createdAt: baziData.createdAt
    });
  } catch (error) {
    console.error("Get bazi detail error:", error);
    return c2.json({ error: "Failed to get bazi detail" }, 500);
  }
});
baziRoutes.put("/:id", authMiddleware, async (c2) => {
  try {
    const userId = c2.get("userId");
    const baziId = c2.req.param("id");
    const baziInput = await c2.req.json();
    if (!baziInput.year || !baziInput.month || !baziInput.day || !baziInput.hour) {
      return c2.json({ error: "Missing required date/time fields" }, 400);
    }
    const prisma2 = getPrismaClient2(c2.env);
    const existingBazi = await prisma2.baziData.findFirst({
      where: {
        id: baziId,
        userId
      }
    });
    if (!existingBazi) {
      return c2.json({ error: "Bazi data not found" }, 404);
    }
    const baziResult = calculateBaziResult(baziInput);
    const updatedBazi = await prisma2.baziData.update({
      where: { id: baziId },
      data: {
        inputData: baziInput,
        resultData: baziResult
      }
    });
    return c2.json({
      id: updatedBazi.id,
      input: baziInput,
      result: baziResult,
      analysis: updatedBazi.analysis,
      createdAt: updatedBazi.createdAt
    });
  } catch (error) {
    console.error("Update bazi error:", error);
    return c2.json({ error: "Failed to update bazi" }, 500);
  }
});
baziRoutes.delete("/:id", authMiddleware, async (c2) => {
  try {
    const userId = c2.get("userId");
    const baziId = c2.req.param("id");
    const prisma2 = getPrismaClient2(c2.env);
    const existingBazi = await prisma2.baziData.findFirst({
      where: {
        id: baziId,
        userId
      }
    });
    if (!existingBazi) {
      return c2.json({ error: "Bazi data not found" }, 404);
    }
    await prisma2.baziData.delete({
      where: { id: baziId }
    });
    return c2.json({ message: "Bazi data deleted successfully" });
  } catch (error) {
    console.error("Delete bazi error:", error);
    return c2.json({ error: "Failed to delete bazi" }, 500);
  }
});

// src/routes/ai.ts
init_checked_fetch();
init_modules_watch_stub();

// src/lib/ai.ts
init_checked_fetch();
init_modules_watch_stub();
async function analyzeBaziWithAI(baziInput, baziResult, language = "zh", aspects) {
  const prompt = buildPrompt(baziInput, baziResult, language, aspects);
  const systemPrompt = getSystemPrompt(language);
  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });
    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }
    const data = await response.json();
    const content = data.choices[0]?.message?.content || "";
    return parseAIResponse(content, language);
  } catch (error) {
    console.error("AI analysis error:", error);
    throw new Error("Failed to analyze bazi with AI");
  }
}
__name(analyzeBaziWithAI, "analyzeBaziWithAI");
function buildPrompt(baziInput, baziResult, language, aspects) {
  if (language === "en") {
    return `
    Please analyze the following Bazi (Four Pillars of Destiny) chart:
    
    Personal Information:
    - Name: ${baziInput.name || "Unknown"}
    - Gender: ${baziInput.gender}
    - Birth Date: ${baziInput.year}-${baziInput.month}-${baziInput.day} ${baziInput.hour}:${baziInput.minute}
    
    Bazi Chart:
    - Year Pillar: ${baziResult.yearPillar}
    - Month Pillar: ${baziResult.monthPillar}
    - Day Pillar: ${baziResult.dayPillar}
    - Hour Pillar: ${baziResult.hourPillar}
    - Day Master: ${baziResult.dayMaster}
    - Zodiac: ${baziResult.zodiac}
    - Nayin: ${baziResult.nayin}
    - Season: ${baziResult.season}
    
    Five Elements Distribution:
    - Wood: ${baziResult.fiveElements["\u6728"]}
    - Fire: ${baziResult.fiveElements["\u706B"]}
    - Earth: ${baziResult.fiveElements["\u571F"]}
    - Metal: ${baziResult.fiveElements["\u91D1"]}
    - Water: ${baziResult.fiveElements["\u6C34"]}
    
    ${aspects ? `Please focus on these aspects: ${aspects.join(", ")}` : "Please provide a comprehensive analysis covering career, relationships, health, and wealth."}
    
    Please provide:
    1. A detailed personality analysis
    2. Strengths and weaknesses
    3. Career prospects
    4. Relationship compatibility
    5. Health considerations
    6. Wealth potential
    7. Lucky periods and colors
    8. Recommendations for balancing the elements
    `;
  } else {
    return `
    \u8BF7\u5206\u6790\u4EE5\u4E0B\u516B\u5B57\u547D\u76D8\uFF1A
    
    \u4E2A\u4EBA\u4FE1\u606F\uFF1A
    - \u59D3\u540D\uFF1A${baziInput.name || "\u672A\u77E5"}
    - \u6027\u522B\uFF1A${baziInput.gender === "male" ? "\u7537" : "\u5973"}
    - \u51FA\u751F\u65E5\u671F\uFF1A${baziInput.year}\u5E74${baziInput.month}\u6708${baziInput.day}\u65E5${baziInput.hour}\u65F6${baziInput.minute}\u5206
    
    \u516B\u5B57\u547D\u76D8\uFF1A
    - \u5E74\u67F1\uFF1A${baziResult.yearPillar}
    - \u6708\u67F1\uFF1A${baziResult.monthPillar}
    - \u65E5\u67F1\uFF1A${baziResult.dayPillar}
    - \u65F6\u67F1\uFF1A${baziResult.hourPillar}
    - \u65E5\u4E3B\uFF1A${baziResult.dayMaster}
    - \u751F\u8096\uFF1A${baziResult.zodiac}
    - \u7EB3\u97F3\uFF1A${baziResult.nayin}
    - \u5B63\u8282\uFF1A${baziResult.season}
    
    \u4E94\u884C\u5206\u5E03\uFF1A
    - \u6728\uFF1A${baziResult.fiveElements["\u6728"]}
    - \u706B\uFF1A${baziResult.fiveElements["\u706B"]}
    - \u571F\uFF1A${baziResult.fiveElements["\u571F"]}
    - \u91D1\uFF1A${baziResult.fiveElements["\u91D1"]}
    - \u6C34\uFF1A${baziResult.fiveElements["\u6C34"]}
    
    ${aspects ? `\u8BF7\u91CD\u70B9\u5206\u6790\u4EE5\u4E0B\u65B9\u9762\uFF1A${aspects.join("\u3001")}` : "\u8BF7\u63D0\u4F9B\u5168\u9762\u5206\u6790\uFF0C\u5305\u62EC\u4E8B\u4E1A\u3001\u5A5A\u59FB\u3001\u5065\u5EB7\u548C\u8D22\u8FD0\u7B49\u65B9\u9762\u3002"}
    
    \u8BF7\u63D0\u4F9B\uFF1A
    1. \u6027\u683C\u7279\u70B9\u5206\u6790
    2. \u4F18\u52BF\u4E0E\u52A3\u52BF
    3. \u4E8B\u4E1A\u53D1\u5C55\u524D\u666F
    4. \u5A5A\u59FB\u60C5\u611F\u72B6\u51B5
    5. \u5065\u5EB7\u6CE8\u610F\u4E8B\u9879
    6. \u8D22\u8FD0\u72B6\u51B5
    7. \u5409\u7965\u65F6\u671F\u4E0E\u989C\u8272
    8. \u5E73\u8861\u4E94\u884C\u7684\u5EFA\u8BAE
    `;
  }
}
__name(buildPrompt, "buildPrompt");
function getSystemPrompt(language) {
  if (language === "en") {
    return `
    You are a professional Chinese astrologer and Bazi (Four Pillars of Destiny) expert with deep knowledge of Chinese metaphysics, 
    Five Elements theory, and traditional Chinese fortune-telling. Your analysis should be:
    
    1. Professional and insightful
    2. Balanced and positive, avoiding overly negative predictions
    3. Culturally sensitive and respectful
    4. Practical with actionable advice
    5. Structured with clear sections
    
    Provide a comprehensive analysis based on the Bazi chart information provided, focusing on giving helpful insights 
    rather than deterministic predictions. Emphasize that Bazi is a tool for self-understanding and guidance, 
    not absolute fate.
    `;
  } else {
    return `
    \u4F60\u662F\u4E00\u4F4D\u4E13\u4E1A\u7684\u4E2D\u56FD\u5360\u661F\u672F\u5927\u5E08\u548C\u516B\u5B57\u547D\u7406\u4E13\u5BB6\uFF0C\u62E5\u6709\u6DF1\u539A\u7684\u4E2D\u56FD\u7384\u5B66\u3001\u4E94\u884C\u7406\u8BBA\u548C\u4F20\u7EDF\u7B97\u547D\u77E5\u8BC6\u3002\u4F60\u7684\u5206\u6790\u5E94\u8BE5\uFF1A
    
    1. \u4E13\u4E1A\u4E14\u6709\u6D1E\u5BDF\u529B
    2. \u5E73\u8861\u79EF\u6781\uFF0C\u907F\u514D\u8FC7\u4E8E\u6D88\u6781\u7684\u9884\u6D4B
    3. \u6587\u5316\u654F\u611F\u4E14\u5C0A\u91CD
    4. \u5B9E\u7528\u4E14\u5177\u6709\u53EF\u64CD\u4F5C\u6027\u7684\u5EFA\u8BAE
    5. \u7ED3\u6784\u6E05\u6670\uFF0C\u5206\u6BB5\u660E\u786E
    
    \u57FA\u4E8E\u63D0\u4F9B\u7684\u516B\u5B57\u547D\u76D8\u4FE1\u606F\u8FDB\u884C\u5168\u9762\u5206\u6790\uFF0C\u91CD\u70B9\u63D0\u4F9B\u6709\u7528\u7684\u89C1\u89E3\u800C\u975E\u51B3\u5B9A\u6027\u9884\u6D4B\u3002\u5F3A\u8C03\u516B\u5B57\u662F\u81EA\u6211\u7406\u89E3\u548C\u6307\u5BFC\u7684\u5DE5\u5177\uFF0C
    \u800C\u975E\u7EDD\u5BF9\u547D\u8FD0\u3002
    `;
  }
}
__name(getSystemPrompt, "getSystemPrompt");
function parseAIResponse(content, language) {
  return {
    analysis: content,
    aspects: ["personality", "career", "relationships", "health", "wealth"],
    suggestions: language === "en" ? ["Meditate regularly", "Balance your elements", "Follow your lucky directions"] : ["\u5B9A\u671F\u51A5\u60F3", "\u5E73\u8861\u4E94\u884C", "\u9075\u5FAA\u5409\u7965\u65B9\u5411"],
    luckyPeriods: language === "en" ? ["2025-2026", "2030-2031"] : ["2025-2026\u5E74", "2030-2031\u5E74"],
    warnings: language === "en" ? ["Avoid risky investments in 2024", "Pay attention to health in autumn"] : ["2024\u5E74\u907F\u514D\u98CE\u9669\u6295\u8D44", "\u79CB\u5B63\u6CE8\u610F\u5065\u5EB7"]
  };
}
__name(parseAIResponse, "parseAIResponse");

// src/routes/ai.ts
var aiRoutes = new Hono2();
async function authMiddleware2(c2, next) {
  const authorization = c2.req.header("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return c2.json({ error: "Missing or invalid token" }, 401);
  }
  try {
    const token = authorization.substring(7);
    const payload = await verifyJWT(token, c2.env.JWT_SECRET);
    c2.set("userId", payload.userId);
    c2.set("userRole", payload.role);
    await next();
  } catch (error) {
    return c2.json({ error: "Invalid token" }, 401);
  }
}
__name(authMiddleware2, "authMiddleware");
aiRoutes.post("/analyze", authMiddleware2, async (c2) => {
  try {
    const userId = c2.get("userId");
    const { baziId, language = "zh", aspects } = await c2.req.json();
    if (!baziId) {
      return c2.json({ error: "Missing baziId" }, 400);
    }
    const prisma2 = getPrismaClient2(c2.env);
    const baziData = await prisma2.baziData.findFirst({
      where: {
        id: baziId,
        userId
        // 确保用户只能分析自己的数据
      }
    });
    if (!baziData) {
      return c2.json({ error: "Bazi data not found" }, 404);
    }
    if (baziData.analysis && !c2.req.query("force")) {
      return c2.json({
        id: baziData.id,
        analysis: baziData.analysis,
        language,
        aspects
      });
    }
    const analysisResult = await analyzeBaziWithAI(
      baziData.inputData,
      baziData.resultData,
      language,
      aspects
    );
    await prisma2.baziData.update({
      where: { id: baziId },
      data: {
        analysis: analysisResult.analysis
      }
    });
    return c2.json({
      id: baziData.id,
      ...analysisResult,
      language,
      aspects
    });
  } catch (error) {
    console.error("AI analysis error:", error);
    return c2.json({ error: "Failed to analyze bazi" }, 500);
  }
});
aiRoutes.get("/history", authMiddleware2, async (c2) => {
  try {
    const userId = c2.get("userId");
    const page = parseInt(c2.req.query("page") || "1");
    const limit = parseInt(c2.req.query("limit") || "10");
    const prisma2 = getPrismaClient2(c2.env);
    const [baziData, total] = await Promise.all([
      prisma2.baziData.findMany({
        where: {
          userId,
          analysis: { not: null }
          // 只返回有分析结果的记录
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          inputData: true,
          resultData: true,
          analysis: true,
          createdAt: true
        }
      }),
      prisma2.baziData.count({
        where: {
          userId,
          analysis: { not: null }
        }
      })
    ]);
    return c2.json({
      data: baziData,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Get AI analysis history error:", error);
    return c2.json({ error: "Failed to get analysis history" }, 500);
  }
});
aiRoutes.delete("/:baziId", authMiddleware2, async (c2) => {
  try {
    const userId = c2.get("userId");
    const baziId = c2.req.param("baziId");
    const prisma2 = getPrismaClient2(c2.env);
    const existingBazi = await prisma2.baziData.findFirst({
      where: {
        id: baziId,
        userId
      }
    });
    if (!existingBazi) {
      return c2.json({ error: "Bazi data not found" }, 404);
    }
    await prisma2.baziData.update({
      where: { id: baziId },
      data: {
        analysis: null
      }
    });
    return c2.json({ message: "Analysis deleted successfully" });
  } catch (error) {
    console.error("Delete analysis error:", error);
    return c2.json({ error: "Failed to delete analysis" }, 500);
  }
});

// src/routes/orders.ts
init_checked_fetch();
init_modules_watch_stub();
var orderRoutes = new Hono2();
async function authMiddleware3(c2, next) {
  const authorization = c2.req.header("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return c2.json({ error: "Missing or invalid token" }, 401);
  }
  try {
    const token = authorization.substring(7);
    const payload = await verifyJWT(token, c2.env.JWT_SECRET);
    c2.set("userId", payload.userId);
    c2.set("userRole", payload.role);
    await next();
  } catch (error) {
    return c2.json({ error: "Invalid token" }, 401);
  }
}
__name(authMiddleware3, "authMiddleware");
orderRoutes.post("/create", authMiddleware3, async (c2) => {
  try {
    const userId = c2.get("userId");
    const { type, amount } = await c2.req.json();
    if (!type || !amount) {
      return c2.json({ error: "Missing required fields" }, 400);
    }
    const prisma2 = getPrismaClient2(c2.env);
    const order = await prisma2.order.create({
      data: {
        userId,
        type,
        amount,
        status: "PENDING"
      }
    });
    return c2.json({
      id: order.id,
      type: order.type,
      amount: order.amount,
      status: order.status,
      createdAt: order.createdAt
    });
  } catch (error) {
    console.error("Create order error:", error);
    return c2.json({ error: "Failed to create order" }, 500);
  }
});
orderRoutes.get("/list", authMiddleware3, async (c2) => {
  try {
    const userId = c2.get("userId");
    const page = parseInt(c2.req.query("page") || "1");
    const limit = parseInt(c2.req.query("limit") || "10");
    const status = c2.req.query("status");
    const prisma2 = getPrismaClient2(c2.env);
    const whereClause = { userId };
    if (status) {
      whereClause.status = status;
    }
    const [orders, total] = await Promise.all([
      prisma2.order.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma2.order.count({ where: whereClause })
    ]);
    return c2.json({
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Get orders error:", error);
    return c2.json({ error: "Failed to get orders" }, 500);
  }
});
orderRoutes.get("/:id", authMiddleware3, async (c2) => {
  try {
    const userId = c2.get("userId");
    const orderId = c2.req.param("id");
    const prisma2 = getPrismaClient2(c2.env);
    const order = await prisma2.order.findFirst({
      where: {
        id: orderId,
        userId
        // 确保用户只能访问自己的订单
      }
    });
    if (!order) {
      return c2.json({ error: "Order not found" }, 404);
    }
    return c2.json(order);
  } catch (error) {
    console.error("Get order detail error:", error);
    return c2.json({ error: "Failed to get order detail" }, 500);
  }
});
orderRoutes.put("/:id/status", authMiddleware3, async (c2) => {
  try {
    const userRole = c2.get("userRole");
    const orderId = c2.req.param("id");
    const { status } = await c2.req.json();
    if (!status) {
      return c2.json({ error: "Missing status" }, 400);
    }
    if (userRole !== "ADMIN" && c2.req.header("X-Payment-Callback") !== "true") {
      return c2.json({ error: "Unauthorized" }, 403);
    }
    const prisma2 = getPrismaClient2(c2.env);
    const existingOrder = await prisma2.order.findUnique({
      where: { id: orderId }
    });
    if (!existingOrder) {
      return c2.json({ error: "Order not found" }, 404);
    }
    const updatedOrder = await prisma2.order.update({
      where: { id: orderId },
      data: { status }
    });
    return c2.json(updatedOrder);
  } catch (error) {
    console.error("Update order status error:", error);
    return c2.json({ error: "Failed to update order status" }, 500);
  }
});
orderRoutes.delete("/:id", authMiddleware3, async (c2) => {
  try {
    const userRole = c2.get("userRole");
    const orderId = c2.req.param("id");
    if (userRole !== "ADMIN") {
      return c2.json({ error: "Unauthorized" }, 403);
    }
    const prisma2 = getPrismaClient2(c2.env);
    const existingOrder = await prisma2.order.findUnique({
      where: { id: orderId }
    });
    if (!existingOrder) {
      return c2.json({ error: "Order not found" }, 404);
    }
    await prisma2.order.delete({
      where: { id: orderId }
    });
    return c2.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete order error:", error);
    return c2.json({ error: "Failed to delete order" }, 500);
  }
});

// src/routes/masters.ts
init_checked_fetch();
init_modules_watch_stub();
var masterRoutes = new Hono2();
async function authMiddleware4(c2, next) {
  const authorization = c2.req.header("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return c2.json({ error: "Missing or invalid token" }, 401);
  }
  try {
    const token = authorization.substring(7);
    const payload = await verifyJWT(token, c2.env.JWT_SECRET);
    c2.set("userId", payload.userId);
    c2.set("userRole", payload.role);
    await next();
  } catch (error) {
    return c2.json({ error: "Invalid token" }, 401);
  }
}
__name(authMiddleware4, "authMiddleware");
masterRoutes.get("/list", async (c2) => {
  try {
    const page = parseInt(c2.req.query("page") || "1");
    const limit = parseInt(c2.req.query("limit") || "10");
    const available = c2.req.query("available");
    const prisma2 = getPrismaClient2(c2.env);
    const whereClause = {};
    if (available !== void 0) {
      whereClause.available = available === "true";
    }
    const [masters, total] = await Promise.all([
      prisma2.master.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              username: true
            }
          }
        },
        orderBy: { rating: "desc" },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma2.master.count({ where: whereClause })
    ]);
    return c2.json({
      data: masters,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Get masters error:", error);
    return c2.json({ error: "Failed to get masters" }, 500);
  }
});
masterRoutes.get("/:id", async (c2) => {
  try {
    const masterId = c2.req.param("id");
    const prisma2 = getPrismaClient2(c2.env);
    const master = await prisma2.master.findUnique({
      where: { id: masterId },
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    });
    if (!master) {
      return c2.json({ error: "Master not found" }, 404);
    }
    return c2.json(master);
  } catch (error) {
    console.error("Get master detail error:", error);
    return c2.json({ error: "Failed to get master detail" }, 500);
  }
});
masterRoutes.post("/apply", authMiddleware4, async (c2) => {
  try {
    const userId = c2.get("userId");
    const { title, description, price } = await c2.req.json();
    if (!title || !price) {
      return c2.json({ error: "Missing required fields" }, 400);
    }
    const prisma2 = getPrismaClient2(c2.env);
    const existingMaster = await prisma2.master.findUnique({
      where: { userId }
    });
    if (existingMaster) {
      return c2.json({ error: "User is already a master" }, 409);
    }
    const master = await prisma2.master.create({
      data: {
        userId,
        title,
        description,
        price,
        available: false
        // 默认不可用，需要管理员审核
      }
    });
    return c2.json({
      id: master.id,
      title: master.title,
      description: master.description,
      price: master.price,
      available: master.available,
      createdAt: master.createdAt
    });
  } catch (error) {
    console.error("Apply to be master error:", error);
    return c2.json({ error: "Failed to apply to be master" }, 500);
  }
});
masterRoutes.put("/:id", authMiddleware4, async (c2) => {
  try {
    const userId = c2.get("userId");
    const userRole = c2.get("userRole");
    const masterId = c2.req.param("id");
    const { title, description, price, available } = await c2.req.json();
    const prisma2 = getPrismaClient2(c2.env);
    const existingMaster = await prisma2.master.findUnique({
      where: { id: masterId }
    });
    if (!existingMaster) {
      return c2.json({ error: "Master not found" }, 404);
    }
    if (existingMaster.userId !== userId && userRole !== "ADMIN") {
      return c2.json({ error: "Unauthorized" }, 403);
    }
    const updateData = {};
    if (title) updateData.title = title;
    if (description !== void 0) updateData.description = description;
    if (price) updateData.price = price;
    if (userRole === "ADMIN" && available !== void 0) updateData.available = available;
    const updatedMaster = await prisma2.master.update({
      where: { id: masterId },
      data: updateData
    });
    return c2.json(updatedMaster);
  } catch (error) {
    console.error("Update master error:", error);
    return c2.json({ error: "Failed to update master" }, 500);
  }
});
masterRoutes.delete("/:id", authMiddleware4, async (c2) => {
  try {
    const userRole = c2.get("userRole");
    const masterId = c2.req.param("id");
    if (userRole !== "ADMIN") {
      return c2.json({ error: "Unauthorized" }, 403);
    }
    const prisma2 = getPrismaClient2(c2.env);
    const existingMaster = await prisma2.master.findUnique({
      where: { id: masterId }
    });
    if (!existingMaster) {
      return c2.json({ error: "Master not found" }, 404);
    }
    await prisma2.master.delete({
      where: { id: masterId }
    });
    return c2.json({ message: "Master deleted successfully" });
  } catch (error) {
    console.error("Delete master error:", error);
    return c2.json({ error: "Failed to delete master" }, 500);
  }
});

// src/routes/chats.ts
init_checked_fetch();
init_modules_watch_stub();
var chatRoutes = new Hono2();
async function authMiddleware5(c2, next) {
  const authorization = c2.req.header("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return c2.json({ error: "Missing or invalid token" }, 401);
  }
  try {
    const token = authorization.substring(7);
    const payload = await verifyJWT(token, c2.env.JWT_SECRET);
    c2.set("userId", payload.userId);
    c2.set("userRole", payload.role);
    await next();
  } catch (error) {
    return c2.json({ error: "Invalid token" }, 401);
  }
}
__name(authMiddleware5, "authMiddleware");
chatRoutes.post("/create", authMiddleware5, async (c2) => {
  try {
    const userId = c2.get("userId");
    const { masterId, initialMessage } = await c2.req.json();
    if (!masterId) {
      return c2.json({ error: "Missing masterId" }, 400);
    }
    const prisma2 = getPrismaClient2(c2.env);
    const master = await prisma2.master.findUnique({
      where: { id: masterId }
    });
    if (!master) {
      return c2.json({ error: "Master not found" }, 404);
    }
    if (!master.available) {
      return c2.json({ error: "Master is not available" }, 400);
    }
    const messages = initialMessage ? [initialMessage] : [];
    const chat = await prisma2.chat.create({
      data: {
        userId,
        masterId,
        messages,
        status: "active"
      }
    });
    return c2.json({
      id: chat.id,
      masterId: chat.masterId,
      messages: chat.messages,
      status: chat.status,
      createdAt: chat.createdAt
    });
  } catch (error) {
    console.error("Create chat error:", error);
    return c2.json({ error: "Failed to create chat" }, 500);
  }
});
chatRoutes.get("/list", authMiddleware5, async (c2) => {
  try {
    const userId = c2.get("userId");
    const page = parseInt(c2.req.query("page") || "1");
    const limit = parseInt(c2.req.query("limit") || "10");
    const status = c2.req.query("status");
    const prisma2 = getPrismaClient2(c2.env);
    const whereClause = { userId };
    if (status) {
      whereClause.status = status;
    }
    const [chats, total] = await Promise.all([
      prisma2.chat.findMany({
        where: whereClause,
        include: {
          master: {
            include: {
              user: {
                select: {
                  username: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma2.chat.count({ where: whereClause })
    ]);
    return c2.json({
      data: chats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Get chats error:", error);
    return c2.json({ error: "Failed to get chats" }, 500);
  }
});
chatRoutes.get("/:id", authMiddleware5, async (c2) => {
  try {
    const userId = c2.get("userId");
    const chatId = c2.req.param("id");
    const prisma2 = getPrismaClient2(c2.env);
    const chat = await prisma2.chat.findFirst({
      where: {
        id: chatId,
        userId
        // 确保用户只能访问自己的聊天
      },
      include: {
        master: {
          include: {
            user: {
              select: {
                username: true
              }
            }
          }
        }
      }
    });
    if (!chat) {
      return c2.json({ error: "Chat not found" }, 404);
    }
    return c2.json(chat);
  } catch (error) {
    console.error("Get chat detail error:", error);
    return c2.json({ error: "Failed to get chat detail" }, 500);
  }
});
chatRoutes.post("/:id/message", authMiddleware5, async (c2) => {
  try {
    const userId = c2.get("userId");
    const chatId = c2.req.param("id");
    const { message } = await c2.req.json();
    if (!message) {
      return c2.json({ error: "Missing message" }, 400);
    }
    const prisma2 = getPrismaClient2(c2.env);
    const existingChat = await prisma2.chat.findFirst({
      where: {
        id: chatId,
        userId
      }
    });
    if (!existingChat) {
      return c2.json({ error: "Chat not found" }, 404);
    }
    if (existingChat.status !== "active") {
      return c2.json({ error: "Chat is not active" }, 400);
    }
    const updatedMessages = [...existingChat.messages, message];
    const updatedChat = await prisma2.chat.update({
      where: { id: chatId },
      data: {
        messages: updatedMessages
      }
    });
    return c2.json({
      id: updatedChat.id,
      messages: updatedMessages,
      status: updatedChat.status,
      updatedAt: updatedChat.createdAt
    });
  } catch (error) {
    console.error("Send message error:", error);
    return c2.json({ error: "Failed to send message" }, 500);
  }
});
chatRoutes.put("/:id/close", authMiddleware5, async (c2) => {
  try {
    const userId = c2.get("userId");
    const chatId = c2.req.param("id");
    const prisma2 = getPrismaClient2(c2.env);
    const existingChat = await prisma2.chat.findFirst({
      where: {
        id: chatId,
        userId
      }
    });
    if (!existingChat) {
      return c2.json({ error: "Chat not found" }, 404);
    }
    const updatedChat = await prisma2.chat.update({
      where: { id: chatId },
      data: {
        status: "closed"
      }
    });
    return c2.json({
      id: updatedChat.id,
      status: updatedChat.status
    });
  } catch (error) {
    console.error("Close chat error:", error);
    return c2.json({ error: "Failed to close chat" }, 500);
  }
});
chatRoutes.delete("/:id", authMiddleware5, async (c2) => {
  try {
    const userId = c2.get("userId");
    const chatId = c2.req.param("id");
    const prisma2 = getPrismaClient2(c2.env);
    const existingChat = await prisma2.chat.findFirst({
      where: {
        id: chatId,
        userId
      }
    });
    if (!existingChat) {
      return c2.json({ error: "Chat not found" }, 404);
    }
    await prisma2.chat.delete({
      where: { id: chatId }
    });
    return c2.json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Delete chat error:", error);
    return c2.json({ error: "Failed to delete chat" }, 500);
  }
});

// src/routes/payments.ts
init_checked_fetch();
init_modules_watch_stub();
var paymentsRoutes = new Hono2();
async function authMiddleware6(c2, next) {
  const authorization = c2.req.header("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return c2.json({ error: "Missing or invalid token" }, 401);
  }
  try {
    const token = authorization.substring(7);
    const payload = await verifyJWT(token, c2.env.JWT_SECRET);
    c2.set("userId", payload.userId);
    c2.set("userRole", payload.role);
    await next();
  } catch (error) {
    return c2.json({ error: "Invalid token" }, 401);
  }
}
__name(authMiddleware6, "authMiddleware");
paymentsRoutes.post("/create-order", authMiddleware6, async (c2) => {
  try {
    const userId = c2.get("userId");
    const { type, amount, description, masterId } = await c2.req.json();
    if (!type || !amount) {
      return c2.json({ error: "Missing required fields" }, 400);
    }
    const prisma2 = getPrismaClient2(c2.env);
    const order = await prisma2.order.create({
      data: {
        userId,
        type,
        amount,
        status: "PENDING"
      }
    });
    const paymentMethod = c2.req.query("method") || "stripe";
    if (paymentMethod === "stripe") {
      const paymentIntent = await createStripePaymentIntent(amount, order.id, c2.env.STRIPE_SECRET_KEY);
      return c2.json({
        orderId: order.id,
        clientSecret: paymentIntent.client_secret,
        paymentMethod: "stripe"
      });
    } else if (paymentMethod === "alipay") {
      const paymentUrl = await createAlipayPayment(amount, order.id, description, c2.env.ALIPAY_APP_ID, c2.env.ALIPAY_PRIVATE_KEY);
      return c2.json({
        orderId: order.id,
        paymentUrl,
        paymentMethod: "alipay"
      });
    }
    return c2.json({ error: "Unsupported payment method" }, 400);
  } catch (error) {
    console.error("Create payment order error:", error);
    return c2.json({ error: "Failed to create payment order" }, 500);
  }
});
paymentsRoutes.post("/webhook/stripe", async (c2) => {
  try {
    const signature = c2.req.header("stripe-signature");
    if (!signature) {
      return c2.json({ error: "Missing signature" }, 400);
    }
    const body = await c2.req.text();
    const event = await verifyStripeWebhook(body, signature, c2.env.STRIPE_WEBHOOK_SECRET);
    const prisma2 = getPrismaClient2(c2.env);
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        await updateOrderStatus(prisma2, paymentIntent.metadata.orderId, "COMPLETED");
        break;
      case "payment_intent.payment_failed":
        const failedPayment = event.data.object;
        await updateOrderStatus(prisma2, failedPayment.metadata.orderId, "CANCELLED");
        break;
    }
    return c2.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return c2.json({ error: "Webhook processing failed" }, 500);
  }
});
paymentsRoutes.post("/webhook/alipay", async (c2) => {
  try {
    const formData = await c2.req.formData();
    const verified = await verifyAlipayNotification(formData, c2.env.ALIPAY_PUBLIC_KEY);
    if (!verified) {
      return c2.json({ error: "Invalid signature" }, 400);
    }
    const prisma2 = getPrismaClient2(c2.env);
    const orderId = formData.get("out_trade_no");
    const tradeStatus = formData.get("trade_status");
    if (tradeStatus === "TRADE_SUCCESS" || tradeStatus === "TRADE_FINISHED") {
      await updateOrderStatus(prisma2, orderId, "COMPLETED");
    }
    return c2.json({ success: true });
  } catch (error) {
    console.error("Alipay webhook error:", error);
    return c2.json({ error: "Webhook processing failed" }, 500);
  }
});
paymentsRoutes.get("/status/:orderId", authMiddleware6, async (c2) => {
  try {
    const orderId = c2.req.param("orderId");
    const userId = c2.get("userId");
    const prisma2 = getPrismaClient2(c2.env);
    const order = await prisma2.order.findFirst({
      where: {
        id: orderId,
        userId
        // 确保用户只能查看自己的订单
      }
    });
    if (!order) {
      return c2.json({ error: "Order not found" }, 404);
    }
    return c2.json({
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      type: order.type,
      createdAt: order.createdAt
    });
  } catch (error) {
    console.error("Get payment status error:", error);
    return c2.json({ error: "Failed to get payment status" }, 500);
  }
});
paymentsRoutes.get("/history", authMiddleware6, async (c2) => {
  try {
    const userId = c2.get("userId");
    const page = parseInt(c2.req.query("page") || "1");
    const limit = parseInt(c2.req.query("limit") || "10");
    const prisma2 = getPrismaClient2(c2.env);
    const [orders, total] = await Promise.all([
      prisma2.order.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma2.order.count({ where: { userId } })
    ]);
    return c2.json({
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Get payment history error:", error);
    return c2.json({ error: "Failed to get payment history" }, 500);
  }
});
async function createStripePaymentIntent(amount, orderId, secretKey) {
  const response = await fetch("https://api.stripe.com/v1/payment_intents", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      amount: Math.round(amount * 100),
      // Stripe使用分为单位
      currency: "usd",
      metadata: { orderId }
    })
  });
  if (!response.ok) {
    throw new Error("Failed to create Stripe payment intent");
  }
  return response.json();
}
__name(createStripePaymentIntent, "createStripePaymentIntent");
async function createAlipayPayment(amount, orderId, description, appId, privateKey) {
  const params = {
    app_id: appId,
    method: "alipay.trade.page.pay",
    charset: "utf-8",
    sign_type: "RSA2",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    version: "1.0",
    notify_url: `${c.env.API_URL}/api/v1/payments/webhook/alipay`,
    return_url: `${c.env.FRONTEND_URL}/payment/success`,
    biz_content: JSON.stringify({
      out_trade_no: orderId,
      total_amount: amount.toString(),
      subject: description || "\u516B\u5B57\u7B97\u547D\u670D\u52A1",
      product_code: "FAST_INSTANT_TRADE_PAY"
    })
  };
  const sign2 = await generateAlipaySignature(params, privateKey);
  params["sign"] = sign2;
  const queryString = new URLSearchParams(params).toString();
  return `https://openapi.alipay.com/gateway.do?${queryString}`;
}
__name(createAlipayPayment, "createAlipayPayment");
async function verifyStripeWebhook(body, signature, webhookSecret) {
  try {
    const crypto2 = __require("crypto");
    const elements = signature.split(",");
    const timestamp = elements.find((e) => e.startsWith("t="))?.substring(2);
    const signedPayload = `${timestamp}.${body}`;
    const expectedSignature = crypto2.createHmac("sha256", webhookSecret).update(signedPayload, "utf8").digest("hex");
    const receivedSignature = elements.find((e) => e.startsWith("v1="))?.substring(3);
    return crypto2.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(receivedSignature || "")
    );
  } catch (error) {
    return false;
  }
}
__name(verifyStripeWebhook, "verifyStripeWebhook");
async function verifyAlipayNotification(formData, publicKey) {
  return true;
}
__name(verifyAlipayNotification, "verifyAlipayNotification");
async function updateOrderStatus(prisma2, orderId, status) {
  return prisma2.order.update({
    where: { id: orderId },
    data: { status }
  });
}
__name(updateOrderStatus, "updateOrderStatus");
async function generateAlipaySignature(params, privateKey) {
  return "generated_signature";
}
__name(generateAlipaySignature, "generateAlipaySignature");

// src/routes/users.ts
init_checked_fetch();
init_modules_watch_stub();
var usersRoutes = new Hono2();
async function authMiddleware7(c2, next) {
  const authorization = c2.req.header("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return c2.json({ error: "Missing or invalid token" }, 401);
  }
  try {
    const token = authorization.substring(7);
    const payload = await verifyJWT(token, c2.env.JWT_SECRET);
    c2.set("userId", payload.userId);
    c2.set("userRole", payload.role);
    await next();
  } catch (error) {
    return c2.json({ error: "Invalid token" }, 401);
  }
}
__name(authMiddleware7, "authMiddleware");
usersRoutes.get("/profile", authMiddleware7, async (c2) => {
  try {
    const userId = c2.get("userId");
    const prisma2 = getPrismaClient2(c2.env);
    const user = await prisma2.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        master: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            rating: true,
            available: true
          }
        }
      }
    });
    if (!user) {
      return c2.json({ error: "User not found" }, 404);
    }
    return c2.json({ user });
  } catch (error) {
    console.error("Get user profile error:", error);
    return c2.json({ error: "Failed to get user profile" }, 500);
  }
});
usersRoutes.put("/profile", authMiddleware7, async (c2) => {
  try {
    const userId = c2.get("userId");
    const { username, email } = await c2.req.json();
    const prisma2 = getPrismaClient2(c2.env);
    if (email) {
      const existingUser = await prisma2.user.findFirst({
        where: {
          email,
          id: { not: userId }
        }
      });
      if (existingUser) {
        return c2.json({ error: "Email already in use" }, 409);
      }
    }
    if (username) {
      const existingUser = await prisma2.user.findFirst({
        where: {
          username,
          id: { not: userId }
        }
      });
      if (existingUser) {
        return c2.json({ error: "Username already in use" }, 409);
      }
    }
    const updatedUser = await prisma2.user.update({
      where: { id: userId },
      data: {
        ...username && { username },
        ...email && { email }
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true
      }
    });
    return c2.json({ user: updatedUser });
  } catch (error) {
    console.error("Update user profile error:", error);
    return c2.json({ error: "Failed to update user profile" }, 500);
  }
});
usersRoutes.post("/avatar", authMiddleware7, async (c2) => {
  try {
    const userId = c2.get("userId");
    const formData = await c2.req.formData();
    const file = formData.get("avatar");
    if (!file) {
      return c2.json({ error: "No file provided" }, 400);
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return c2.json({ error: "Invalid file type. Only JPEG, PNG, and WebP are allowed" }, 400);
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return c2.json({ error: "File too large. Maximum size is 5MB" }, 400);
    }
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const timestamp = Date.now();
    const extension = file.type.split("/")[1];
    const fileName = `avatars/${userId}_${timestamp}.${extension}`;
    const url = await uploadToR2(uint8Array, fileName, file.type, c2.env);
    const prisma2 = getPrismaClient2(c2.env);
    await prisma2.user.update({
      where: { id: userId },
      data: { avatarUrl: url }
    });
    return c2.json({
      message: "Avatar uploaded successfully",
      avatarUrl: url
    });
  } catch (error) {
    console.error("Upload avatar error:", error);
    return c2.json({ error: "Failed to upload avatar" }, 500);
  }
});
usersRoutes.put("/password", authMiddleware7, async (c2) => {
  try {
    const userId = c2.get("userId");
    const { currentPassword, newPassword } = await c2.req.json();
    if (!currentPassword || !newPassword) {
      return c2.json({ error: "Missing required fields" }, 400);
    }
    if (newPassword.length < 8) {
      return c2.json({ error: "Password must be at least 8 characters long" }, 400);
    }
    const prisma2 = getPrismaClient2(c2.env);
    const user = await prisma2.user.findUnique({
      where: { id: userId },
      select: { password: true }
    });
    if (!user) {
      return c2.json({ error: "User not found" }, 404);
    }
    const isValidPassword = await verifyPassword2(currentPassword, user.password);
    if (!isValidPassword) {
      return c2.json({ error: "Current password is incorrect" }, 401);
    }
    const hashedPassword = await hashPassword2(newPassword);
    await prisma2.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });
    return c2.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Update password error:", error);
    return c2.json({ error: "Failed to update password" }, 500);
  }
});
usersRoutes.delete("/account", authMiddleware7, async (c2) => {
  try {
    const userId = c2.get("userId");
    const { password } = await c2.req.json();
    if (!password) {
      return c2.json({ error: "Password is required to delete account" }, 400);
    }
    const prisma2 = getPrismaClient2(c2.env);
    const user = await prisma2.user.findUnique({
      where: { id: userId },
      select: { password: true }
    });
    if (!user) {
      return c2.json({ error: "User not found" }, 404);
    }
    const isValidPassword = await verifyPassword2(password, user.password);
    if (!isValidPassword) {
      return c2.json({ error: "Invalid password" }, 401);
    }
    await prisma2.user.delete({
      where: { id: userId }
    });
    return c2.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    return c2.json({ error: "Failed to delete account" }, 500);
  }
});
usersRoutes.get("/stats", authMiddleware7, async (c2) => {
  try {
    const userId = c2.get("userId");
    const prisma2 = getPrismaClient2(c2.env);
    const [baziCount, orderCount, totalSpent] = await Promise.all([
      prisma2.baziData.count({
        where: { userId }
      }),
      prisma2.order.count({
        where: { userId }
      }),
      prisma2.order.aggregate({
        where: {
          userId,
          status: "COMPLETED"
        },
        _sum: { amount: true }
      })
    ]);
    return c2.json({
      baziCalculations: baziCount,
      totalOrders: orderCount,
      totalSpent: totalSpent._sum.amount || "0"
    });
  } catch (error) {
    console.error("Get user stats error:", error);
    return c2.json({ error: "Failed to get user stats" }, 500);
  }
});
async function uploadToR2(data, fileName, contentType, env) {
  const bucket = env.AVATAR_BUCKET;
  await bucket.put(fileName, data, {
    httpMetadata: {
      contentType
    }
  });
  return `https://pub-${env.R2_ACCOUNT_ID}.r2.dev/${fileName}`;
}
__name(uploadToR2, "uploadToR2");
async function hashPassword2(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode("pepper"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const saltedPassword = new Uint8Array(salt.length + data.length);
  saltedPassword.set(salt);
  saltedPassword.set(data, salt.length);
  const signature = await crypto.subtle.sign("HMAC", key, saltedPassword);
  const combined = new Uint8Array(salt.length + signature.byteLength);
  combined.set(salt);
  combined.set(new Uint8Array(signature), salt.length);
  return btoa(String.fromCharCode(...combined));
}
__name(hashPassword2, "hashPassword");
async function verifyPassword2(password, hashedPassword) {
  try {
    const encoder = new TextEncoder();
    const combined = new Uint8Array(
      ...atob(hashedPassword).split("").map((char) => char.charCodeAt(0))
    );
    const salt = combined.slice(0, 16);
    const storedHash = combined.slice(16);
    const data = encoder.encode(password);
    const saltedPassword = new Uint8Array(salt.length + data.length);
    saltedPassword.set(salt);
    saltedPassword.set(data, salt.length);
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode("pepper"),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, saltedPassword);
    if (signature.byteLength !== storedHash.length) {
      return false;
    }
    const signatureArray = new Uint8Array(signature);
    for (let i = 0; i < signature.byteLength; i++) {
      if (signatureArray[i] !== storedHash[i]) {
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
}
__name(verifyPassword2, "verifyPassword");

// src/routes/websocket.ts
init_checked_fetch();
init_modules_watch_stub();
var websocketRoutes = new Hono2();
var connectedClients = /* @__PURE__ */ new Map();
websocketRoutes.get("/ws", async (c2) => {
  const upgradeHeader = c2.req.header("Upgrade");
  if (upgradeHeader !== "websocket") {
    return c2.text("Expected websocket", 400);
  }
  const token = c2.req.query("token");
  if (!token) {
    return c2.text("Missing token", 401);
  }
  try {
    const payload = await verifyJWT(token, c2.env.JWT_SECRET);
    const userId = payload.userId;
    const webSocketPair = new WebSocketPair();
    const [client, server] = Object.values(webSocketPair);
    const clientInfo = {
      userId,
      socket: client,
      chatIds: /* @__PURE__ */ new Set(),
      lastSeen: Date.now()
    };
    connectedClients.set(userId, clientInfo);
    server.accept();
    server.send(
      JSON.stringify({
        type: "connection",
        data: { status: "connected", userId },
        timestamp: Date.now()
      })
    );
    server.addEventListener("message", async (event) => {
      try {
        const message = JSON.parse(event.data);
        await handleWebSocketMessage(message, userId, server, c2.env);
      } catch (error) {
        console.error("WebSocket message error:", error);
        server.send(
          JSON.stringify({
            type: "error",
            data: { message: "Invalid message format" },
            timestamp: Date.now()
          })
        );
      }
    });
    server.addEventListener("close", () => {
      handleDisconnection(userId);
    });
    server.addEventListener("error", (error) => {
      console.error(`WebSocket error for user ${userId}:`, error);
      handleDisconnection(userId);
    });
    const heartbeatInterval = setInterval(() => {
      try {
        server.send(
          JSON.stringify({
            type: "ping",
            timestamp: Date.now()
          })
        );
      } catch (error) {
        clearInterval(heartbeatInterval);
        handleDisconnection(userId);
      }
    }, 3e4);
    server.addEventListener("close", () => {
      clearInterval(heartbeatInterval);
    });
    return new Response(null, {
      status: 101,
      webSocket: client
    });
  } catch (error) {
    console.error("WebSocket authentication error:", error);
    return c2.text("Authentication failed", 401);
  }
});
async function handleWebSocketMessage(message, userId, socket, env) {
  const prisma2 = getPrismaClient2(env);
  switch (message.type) {
    case "message":
      await handleChatMessage(message, userId, prisma2, socket);
      break;
    case "typing":
      await handleTypingIndicator(message, userId, socket);
      break;
    case "online_status":
      await handleOnlineStatus(userId, message.data);
      break;
    case "read_receipt":
      await handleReadReceipt(message, userId, prisma2, socket);
      break;
    default:
      socket.send(
        JSON.stringify({
          type: "error",
          data: { message: "Unknown message type" },
          timestamp: Date.now()
        })
      );
  }
}
__name(handleWebSocketMessage, "handleWebSocketMessage");
async function handleChatMessage(message, userId, prisma2, senderSocket) {
  try {
    const { chatId, content, type = "text" } = message.data;
    const chat = await prisma2.chat.findFirst({
      where: {
        id: chatId,
        OR: [{ userId }, { master: { userId } }]
      },
      include: {
        user: true,
        master: true
      }
    });
    if (!chat) {
      senderSocket.send(
        JSON.stringify({
          type: "error",
          data: { message: "Chat not found or access denied" },
          timestamp: Date.now()
        })
      );
      return;
    }
    const messageData = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      chatId,
      senderId: userId,
      content,
      type,
      timestamp: message.timestamp,
      read: false
    };
    const updatedMessages = [...chat.messages || [], messageData];
    await prisma2.chat.update({
      where: { id: chatId },
      data: { messages: updatedMessages }
    });
    const receiverId = chat.userId === userId ? chat.master.userId : chat.userId;
    senderSocket.send(
      JSON.stringify({
        type: "message_sent",
        data: messageData,
        timestamp: Date.now()
      })
    );
    const receiverClient = connectedClients.get(receiverId);
    if (receiverClient && receiverClient.socket.readyState === WebSocket.OPEN) {
      receiverClient.socket.send(
        JSON.stringify({
          type: "new_message",
          data: messageData,
          timestamp: Date.now()
        })
      );
    }
    const senderClient = connectedClients.get(userId);
    if (senderClient) {
      senderClient.chatIds.add(chatId);
    }
  } catch (error) {
    console.error("Handle chat message error:", error);
    senderSocket.send(
      JSON.stringify({
        type: "error",
        data: { message: "Failed to send message" },
        timestamp: Date.now()
      })
    );
  }
}
__name(handleChatMessage, "handleChatMessage");
async function handleTypingIndicator(message, userId, senderSocket) {
  try {
    const { chatId, isTyping } = message.data;
    const senderClient = connectedClients.get(userId);
    if (!senderClient || !senderClient.chatIds.has(chatId)) {
      return;
    }
    for (const [clientId, client] of connectedClients) {
      if (clientId !== userId && client.chatIds.has(chatId)) {
        client.socket.send(
          JSON.stringify({
            type: "typing_indicator",
            data: {
              chatId,
              userId,
              isTyping
            },
            timestamp: Date.now()
          })
        );
      }
    }
  } catch (error) {
    console.error("Handle typing indicator error:", error);
  }
}
__name(handleTypingIndicator, "handleTypingIndicator");
async function handleOnlineStatus(userId, data) {
  try {
    const client = connectedClients.get(userId);
    if (client) {
      client.lastSeen = Date.now();
      for (const [clientId, clientInfo] of connectedClients) {
        if (clientId !== userId) {
          clientInfo.socket.send(
            JSON.stringify({
              type: "online_status_change",
              data: {
                userId,
                status: "online",
                lastSeen: client.lastSeen
              },
              timestamp: Date.now()
            })
          );
        }
      }
    }
  } catch (error) {
    console.error("Handle online status error:", error);
  }
}
__name(handleOnlineStatus, "handleOnlineStatus");
async function handleReadReceipt(message, userId, prisma2, senderSocket) {
  try {
    const { chatId, messageId } = message.data;
    const chat = await prisma2.chat.findFirst({
      where: {
        id: chatId,
        OR: [{ userId }, { master: { userId } }]
      }
    });
    if (!chat) {
      return;
    }
    const messages = chat.messages || [];
    const updatedMessages = messages.map(
      (msg) => msg.id === messageId ? { ...msg, read: true } : msg
    );
    await prisma2.chat.update({
      where: { id: chatId },
      data: { messages: updatedMessages }
    });
    const messageSenderId = messages.find(
      (msg) => msg.id === messageId
    )?.senderId;
    if (messageSenderId && messageSenderId !== userId) {
      const senderClient = connectedClients.get(messageSenderId);
      if (senderClient && senderClient.socket.readyState === WebSocket.OPEN) {
        senderClient.socket.send(
          JSON.stringify({
            type: "message_read",
            data: {
              chatId,
              messageId,
              readBy: userId
            },
            timestamp: Date.now()
          })
        );
      }
    }
  } catch (error) {
    console.error("Handle read receipt error:", error);
  }
}
__name(handleReadReceipt, "handleReadReceipt");
function handleDisconnection(userId) {
  const client = connectedClients.get(userId);
  if (client) {
    for (const [clientId, clientInfo] of connectedClients) {
      if (clientId !== userId) {
        clientInfo.socket.send(
          JSON.stringify({
            type: "online_status_change",
            data: {
              userId,
              status: "offline",
              lastSeen: Date.now()
            },
            timestamp: Date.now()
          })
        );
      }
    }
    connectedClients.delete(userId);
  }
}
__name(handleDisconnection, "handleDisconnection");
websocketRoutes.get("/online-users", async (c2) => {
  const onlineUsers = Array.from(connectedClients.entries()).map(
    ([userId, client]) => ({
      userId,
      lastSeen: client.lastSeen
    })
  );
  return c2.json({ onlineUsers });
});
websocketRoutes.get("/chat-history/:chatId", async (c2) => {
  try {
    const token = c2.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c2.json({ error: "Missing token" }, 401);
    }
    const payload = await verifyJWT(token, c2.env.JWT_SECRET);
    const userId = payload.userId;
    const chatId = c2.req.param("chatId");
    const prisma2 = getPrismaClient2(c2.env);
    const chat = await prisma2.chat.findFirst({
      where: {
        id: chatId,
        OR: [{ userId }, { master: { userId } }]
      },
      select: {
        id: true,
        messages: true,
        createdAt: true
      }
    });
    if (!chat) {
      return c2.json({ error: "Chat not found" }, 404);
    }
    return c2.json({
      chatId: chat.id,
      messages: chat.messages || [],
      createdAt: chat.createdAt
    });
  } catch (error) {
    console.error("Get chat history error:", error);
    return c2.json({ error: "Failed to get chat history" }, 500);
  }
});

// src/middleware/cache.ts
init_checked_fetch();
init_modules_watch_stub();
var cache = /* @__PURE__ */ __name((options = {}) => {
  return async (c2, next) => {
    if (c2.req.method !== "GET") {
      return next();
    }
    if (options.condition && !options.condition(c2)) {
      return next();
    }
    const cacheKey = generateCacheKey(c2, options);
    try {
      const cached = c2.env.CACHE ? await c2.env.CACHE.get(cacheKey) : null;
      if (cached) {
        const data = JSON.parse(cached);
        c2.header("X-Cache", "HIT");
        c2.header(
          "X-Cache-Age",
          Math.floor((Date.now() - data.timestamp) / 1e3).toString()
        );
        return c2.json(data.response, data.status);
      }
      c2.header("X-Cache", "MISS");
      await next();
      if (c2.res.status < 400) {
        const response = await c2.res.clone().json();
        const ttl = options.ttl || 300;
        if (c2.env.CACHE) {
          await c2.env.CACHE.put(
            cacheKey,
            JSON.stringify({
              response,
              status: c2.res.status,
              timestamp: Date.now()
            }),
            { expirationTtl: ttl }
          );
        }
      }
    } catch (error) {
      console.error("Cache error:", error);
      await next();
    }
  };
}, "cache");
function generateCacheKey(c2, options) {
  if (options.key) {
    return options.key;
  }
  const url = new URL(c2.req.url);
  const path = url.pathname;
  const search = url.search;
  let cacheKey = `cache:${path}${search}`;
  if (options.vary) {
    const varyHeaders = options.vary.map((header) => `${header}:${c2.req.header(header) || ""}`).join("|");
    cacheKey += `|vary:${varyHeaders}`;
  }
  return cacheKey;
}
__name(generateCacheKey, "generateCacheKey");
var cacheWithParams = /* @__PURE__ */ __name((keyGenerator, options = {}) => {
  return async (c2, next) => {
    const cacheOptions = { ...options, key: keyGenerator(c2) };
    return cache(cacheOptions)(c2, next);
  };
}, "cacheWithParams");
var userCache = /* @__PURE__ */ __name((ttl = 300) => {
  return cacheWithParams((c2) => `user:${c2.get("userId")}:${c2.req.path}`, {
    ttl
  });
}, "userCache");

// src/middleware/rateLimit.ts
init_checked_fetch();
init_modules_watch_stub();
var rateLimit = /* @__PURE__ */ __name((options = {}) => {
  return async (c2, next) => {
    const {
      windowMs = 60 * 1e3,
      // 默认1分钟
      max = 100,
      // 默认100次
      message = "Too many requests, please try again later.",
      skipSuccessfulRequests = false,
      skipFailedRequests = false,
      keyGenerator = defaultKeyGenerator
    } = options;
    const key = `rate_limit:${keyGenerator(c2)}`;
    try {
      const current = c2.env.CACHE ? await c2.env.CACHE.get(key) : null;
      const now = Date.now();
      let record;
      if (current) {
        record = JSON.parse(current);
        if (now > record.resetTime) {
          record = {
            count: 0,
            resetTime: now + windowMs
          };
        }
      } else {
        record = {
          count: 0,
          resetTime: now + windowMs
        };
      }
      record.count++;
      if (c2.env.CACHE) {
        await c2.env.CACHE.put(key, JSON.stringify(record), {
          expirationTtl: Math.ceil(windowMs / 1e3) + 1
        });
      }
      c2.header("X-RateLimit-Limit", max.toString());
      c2.header(
        "X-RateLimit-Remaining",
        Math.max(0, max - record.count).toString()
      );
      c2.header(
        "X-RateLimit-Reset",
        Math.ceil(record.resetTime / 1e3).toString()
      );
      if (record.count > max) {
        c2.header(
          "Retry-After",
          Math.ceil((record.resetTime - now) / 1e3).toString()
        );
        return c2.json(
          {
            error: "Rate limit exceeded",
            message,
            resetTime: record.resetTime,
            windowMs,
            max
          },
          429
        );
      }
      await next();
      if (skipSuccessfulRequests && c2.res.status < 400) {
        record.count--;
        if (c2.env.CACHE) {
          if (c2.env.CACHE) {
            await c2.env.CACHE.put(key, JSON.stringify(record), {
              expirationTtl: Math.ceil(windowMs / 1e3) + 1
            });
          }
        }
      }
      if (skipFailedRequests && c2.res.status >= 400) {
        record.count--;
        await c2.env.CACHE.put(key, JSON.stringify(record), {
          expirationTtl: Math.ceil(windowMs / 1e3) + 1
        });
      }
    } catch (error) {
      console.error("Rate limit error:", error);
      await next();
    }
  };
}, "rateLimit");
function defaultKeyGenerator(c2) {
  const ip = c2.req.header("CF-Connecting-IP") || c2.req.header("X-Forwarded-For") || c2.req.header("X-Real-IP") || "unknown";
  const userAgent = c2.req.header("User-Agent") || "";
  const path = c2.req.path;
  return `${ip}:${path}:${hashString(userAgent.substring(0, 50))}`;
}
__name(defaultKeyGenerator, "defaultKeyGenerator");
var uploadRateLimit = rateLimit({
  windowMs: 60 * 1e3,
  // 1分钟
  max: 5,
  // 最多5次上传
  message: "Upload limit exceeded. Please wait before uploading again."
});
var loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1e3,
  // 15分钟
  max: 5,
  // 最多5次登录尝试
  message: "Too many login attempts. Please try again later.",
  keyGenerator: /* @__PURE__ */ __name(async (c2) => {
    const ip = c2.req.header("CF-Connecting-IP") || "unknown";
    const email = c2.req.raw?.body ? JSON.parse(await c2.req.raw.clone().text()).email : "";
    return `login:${ip}:${email}`;
  }, "keyGenerator")
});
var registerRateLimit = rateLimit({
  windowMs: 60 * 60 * 1e3,
  // 1小时
  max: 3,
  // 最多3次注册
  message: "Registration limit exceeded. Please try again later.",
  keyGenerator: /* @__PURE__ */ __name((c2) => {
    const ip = c2.req.header("CF-Connecting-IP") || "unknown";
    return `register:${ip}`;
  }, "keyGenerator")
});
var baziRateLimit = rateLimit({
  windowMs: 60 * 1e3,
  // 1分钟
  max: 20,
  // 最多20次计算
  message: "Bazi calculation limit exceeded. Please wait before trying again.",
  keyGenerator: /* @__PURE__ */ __name((c2) => {
    const userId = c2.get("userId") || "anonymous";
    return `bazi:${userId}`;
  }, "keyGenerator")
});
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}
__name(hashString, "hashString");

// src/index.ts
var app = new Hono2();
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "https://your-app-domain.com"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(
  "*",
  rateLimit({
    windowMs: 15 * 60 * 1e3,
    // 15分钟
    max: 1e3
    // 每个IP最多1000次请求
  })
);
app.use("/api/v1/masters", cache({ ttl: 300 }));
app.get("/health", (c2) => {
  return c2.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
app.get("/test-db", async (c2) => {
  try {
    const prisma2 = getPrismaClient2(c2.env);
    const count = await prisma2.user.count();
    return c2.json({
      status: "ok",
      userCount: count,
      database: "connected"
    });
  } catch (error) {
    console.error("Database test error:", error);
    return c2.json(
      {
        status: "error",
        error: error.message,
        database: "failed"
      },
      500
    );
  }
});
app.route("/api/v1/auth", authRoutes);
app.route("/api/v1/bazi", baziRoutes);
app.route("/api/v1/ai", aiRoutes);
app.route("/api/v1/orders", orderRoutes);
app.route("/api/v1/masters", masterRoutes);
app.route("/api/v1/chats", chatRoutes);
app.route("/api/v1/payments", paymentsRoutes);
app.route("/api/v1/users", usersRoutes);
app.route("/api/v1/ws", websocketRoutes);
app.post("/api/v1/auth/login", loginRateLimit);
app.post("/api/v1/auth/register", registerRateLimit);
app.post("/api/v1/users/avatar", uploadRateLimit);
app.get("/api/v1/bazi/history", userCache(60));
app.notFound((c2) => {
  return c2.json({ error: "Not Found" }, 404);
});
app.onError((err2, c2) => {
  console.error(err2);
  return c2.json({ error: "Internal Server Error", message: err2.message }, 500);
});
var src_default = {
  fetch: app.fetch
};

// ../../../../../var/usrlocal/nodejs/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_checked_fetch();
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../../var/usrlocal/nodejs/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_checked_fetch();
init_modules_watch_stub();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-lTUTS4/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../../../../../var/usrlocal/nodejs/lib/node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-lTUTS4/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init2) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init2) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
