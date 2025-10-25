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

// .wrangler/tmp/bundle-Ad5A9R/checked-fetch.js
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
  ".wrangler/tmp/bundle-Ad5A9R/checked-fetch.js"() {
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
    var __export = /* @__PURE__ */ __name((target, all) => {
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
    __export(src_exports2, {
      Debug: /* @__PURE__ */ __name(() => Debug3, "Debug"),
      clearLogs: /* @__PURE__ */ __name(() => clearLogs, "clearLogs"),
      default: /* @__PURE__ */ __name(() => src_default2, "default"),
      getLogs: /* @__PURE__ */ __name(() => getLogs, "getLogs")
    });
    module.exports = __toCommonJS(src_exports2);
    var colors_exports = {};
    __export(colors_exports, {
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

// node_modules/@prisma/client/runtime/edge.js
var require_edge = __commonJS({
  "node_modules/@prisma/client/runtime/edge.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var fa = Object.create;
    var cr = Object.defineProperty;
    var ga = Object.getOwnPropertyDescriptor;
    var ha = Object.getOwnPropertyNames;
    var ya = Object.getPrototypeOf;
    var wa = Object.prototype.hasOwnProperty;
    var Se = /* @__PURE__ */ __name((e, t) => () => (e && (t = e(e = 0)), t), "Se");
    var Le = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "Le");
    var pr = /* @__PURE__ */ __name((e, t) => {
      for (var r in t) cr(e, r, { get: t[r], enumerable: true });
    }, "pr");
    var oi = /* @__PURE__ */ __name((e, t, r, n) => {
      if (t && typeof t == "object" || typeof t == "function") for (let i of ha(t)) !wa.call(e, i) && i !== r && cr(e, i, { get: /* @__PURE__ */ __name(() => t[i], "get"), enumerable: !(n = ga(t, i)) || n.enumerable });
      return e;
    }, "oi");
    var qe = /* @__PURE__ */ __name((e, t, r) => (r = e != null ? fa(ya(e)) : {}, oi(t || !e || !e.__esModule ? cr(r, "default", { value: e, enumerable: true }) : r, e)), "qe");
    var Ea = /* @__PURE__ */ __name((e) => oi(cr({}, "__esModule", { value: true }), e), "Ea");
    var y;
    var c2 = Se(() => {
      "use strict";
      y = { nextTick: /* @__PURE__ */ __name((e, ...t) => {
        setTimeout(() => {
          e(...t);
        }, 0);
      }, "nextTick"), env: {}, version: "", cwd: /* @__PURE__ */ __name(() => "/", "cwd"), stderr: {}, argv: ["/bin/node"] };
    });
    var b;
    var p = Se(() => {
      "use strict";
      b = globalThis.performance ?? (() => {
        let e = Date.now();
        return { now: /* @__PURE__ */ __name(() => Date.now() - e, "now") };
      })();
    });
    var E;
    var d = Se(() => {
      "use strict";
      E = /* @__PURE__ */ __name(() => {
      }, "E");
      E.prototype = E;
    });
    var m = Se(() => {
      "use strict";
    });
    var Ti = Le((Ye) => {
      "use strict";
      f();
      c2();
      p();
      d();
      m();
      var ci = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "ci"), ba = ci((e) => {
        "use strict";
        e.byteLength = l, e.toByteArray = g, e.fromByteArray = S;
        var t = [], r = [], n = typeof Uint8Array < "u" ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (o = 0, s = i.length; o < s; ++o) t[o] = i[o], r[i.charCodeAt(o)] = o;
        var o, s;
        r[45] = 62, r[95] = 63;
        function a(A) {
          var R = A.length;
          if (R % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
          var M = A.indexOf("=");
          M === -1 && (M = R);
          var F = M === R ? 0 : 4 - M % 4;
          return [M, F];
        }
        __name(a, "a");
        function l(A) {
          var R = a(A), M = R[0], F = R[1];
          return (M + F) * 3 / 4 - F;
        }
        __name(l, "l");
        function u(A, R, M) {
          return (R + M) * 3 / 4 - M;
        }
        __name(u, "u");
        function g(A) {
          var R, M = a(A), F = M[0], q = M[1], D = new n(u(A, F, q)), I = 0, ae = q > 0 ? F - 4 : F, J;
          for (J = 0; J < ae; J += 4) R = r[A.charCodeAt(J)] << 18 | r[A.charCodeAt(J + 1)] << 12 | r[A.charCodeAt(J + 2)] << 6 | r[A.charCodeAt(J + 3)], D[I++] = R >> 16 & 255, D[I++] = R >> 8 & 255, D[I++] = R & 255;
          return q === 2 && (R = r[A.charCodeAt(J)] << 2 | r[A.charCodeAt(J + 1)] >> 4, D[I++] = R & 255), q === 1 && (R = r[A.charCodeAt(J)] << 10 | r[A.charCodeAt(J + 1)] << 4 | r[A.charCodeAt(J + 2)] >> 2, D[I++] = R >> 8 & 255, D[I++] = R & 255), D;
        }
        __name(g, "g");
        function h(A) {
          return t[A >> 18 & 63] + t[A >> 12 & 63] + t[A >> 6 & 63] + t[A & 63];
        }
        __name(h, "h");
        function v(A, R, M) {
          for (var F, q = [], D = R; D < M; D += 3) F = (A[D] << 16 & 16711680) + (A[D + 1] << 8 & 65280) + (A[D + 2] & 255), q.push(h(F));
          return q.join("");
        }
        __name(v, "v");
        function S(A) {
          for (var R, M = A.length, F = M % 3, q = [], D = 16383, I = 0, ae = M - F; I < ae; I += D) q.push(v(A, I, I + D > ae ? ae : I + D));
          return F === 1 ? (R = A[M - 1], q.push(t[R >> 2] + t[R << 4 & 63] + "==")) : F === 2 && (R = (A[M - 2] << 8) + A[M - 1], q.push(t[R >> 10] + t[R >> 4 & 63] + t[R << 2 & 63] + "=")), q.join("");
        }
        __name(S, "S");
      }), xa = ci((e) => {
        e.read = function(t, r, n, i, o) {
          var s, a, l = o * 8 - i - 1, u = (1 << l) - 1, g = u >> 1, h = -7, v = n ? o - 1 : 0, S = n ? -1 : 1, A = t[r + v];
          for (v += S, s = A & (1 << -h) - 1, A >>= -h, h += l; h > 0; s = s * 256 + t[r + v], v += S, h -= 8) ;
          for (a = s & (1 << -h) - 1, s >>= -h, h += i; h > 0; a = a * 256 + t[r + v], v += S, h -= 8) ;
          if (s === 0) s = 1 - g;
          else {
            if (s === u) return a ? NaN : (A ? -1 : 1) * (1 / 0);
            a = a + Math.pow(2, i), s = s - g;
          }
          return (A ? -1 : 1) * a * Math.pow(2, s - i);
        }, e.write = function(t, r, n, i, o, s) {
          var a, l, u, g = s * 8 - o - 1, h = (1 << g) - 1, v = h >> 1, S = o === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, A = i ? 0 : s - 1, R = i ? 1 : -1, M = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0;
          for (r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (l = isNaN(r) ? 1 : 0, a = h) : (a = Math.floor(Math.log(r) / Math.LN2), r * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), a + v >= 1 ? r += S / u : r += S * Math.pow(2, 1 - v), r * u >= 2 && (a++, u /= 2), a + v >= h ? (l = 0, a = h) : a + v >= 1 ? (l = (r * u - 1) * Math.pow(2, o), a = a + v) : (l = r * Math.pow(2, v - 1) * Math.pow(2, o), a = 0)); o >= 8; t[n + A] = l & 255, A += R, l /= 256, o -= 8) ;
          for (a = a << o | l, g += o; g > 0; t[n + A] = a & 255, A += R, a /= 256, g -= 8) ;
          t[n + A - R] |= M * 128;
        };
      }), tn = ba(), Ke = xa(), si = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
      Ye.Buffer = T;
      Ye.SlowBuffer = Ra;
      Ye.INSPECT_MAX_BYTES = 50;
      var dr = 2147483647;
      Ye.kMaxLength = dr;
      T.TYPED_ARRAY_SUPPORT = Pa();
      !T.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
      function Pa() {
        try {
          let e = new Uint8Array(1), t = { foo: /* @__PURE__ */ __name(function() {
            return 42;
          }, "foo") };
          return Object.setPrototypeOf(t, Uint8Array.prototype), Object.setPrototypeOf(e, t), e.foo() === 42;
        } catch {
          return false;
        }
      }
      __name(Pa, "Pa");
      Object.defineProperty(T.prototype, "parent", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        if (T.isBuffer(this)) return this.buffer;
      }, "get") });
      Object.defineProperty(T.prototype, "offset", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        if (T.isBuffer(this)) return this.byteOffset;
      }, "get") });
      function xe(e) {
        if (e > dr) throw new RangeError('The value "' + e + '" is invalid for option "size"');
        let t = new Uint8Array(e);
        return Object.setPrototypeOf(t, T.prototype), t;
      }
      __name(xe, "xe");
      function T(e, t, r) {
        if (typeof e == "number") {
          if (typeof t == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
          return on(e);
        }
        return pi(e, t, r);
      }
      __name(T, "T");
      T.poolSize = 8192;
      function pi(e, t, r) {
        if (typeof e == "string") return Ta(e, t);
        if (ArrayBuffer.isView(e)) return Ca(e);
        if (e == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
        if (de(e, ArrayBuffer) || e && de(e.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (de(e, SharedArrayBuffer) || e && de(e.buffer, SharedArrayBuffer))) return mi(e, t, r);
        if (typeof e == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
        let n = e.valueOf && e.valueOf();
        if (n != null && n !== e) return T.from(n, t, r);
        let i = Aa(e);
        if (i) return i;
        if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof e[Symbol.toPrimitive] == "function") return T.from(e[Symbol.toPrimitive]("string"), t, r);
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
      }
      __name(pi, "pi");
      T.from = function(e, t, r) {
        return pi(e, t, r);
      };
      Object.setPrototypeOf(T.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(T, Uint8Array);
      function di(e) {
        if (typeof e != "number") throw new TypeError('"size" argument must be of type number');
        if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"');
      }
      __name(di, "di");
      function va(e, t, r) {
        return di(e), e <= 0 ? xe(e) : t !== void 0 ? typeof r == "string" ? xe(e).fill(t, r) : xe(e).fill(t) : xe(e);
      }
      __name(va, "va");
      T.alloc = function(e, t, r) {
        return va(e, t, r);
      };
      function on(e) {
        return di(e), xe(e < 0 ? 0 : sn(e) | 0);
      }
      __name(on, "on");
      T.allocUnsafe = function(e) {
        return on(e);
      };
      T.allocUnsafeSlow = function(e) {
        return on(e);
      };
      function Ta(e, t) {
        if ((typeof t != "string" || t === "") && (t = "utf8"), !T.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
        let r = fi(e, t) | 0, n = xe(r), i = n.write(e, t);
        return i !== r && (n = n.slice(0, i)), n;
      }
      __name(Ta, "Ta");
      function rn(e) {
        let t = e.length < 0 ? 0 : sn(e.length) | 0, r = xe(t);
        for (let n = 0; n < t; n += 1) r[n] = e[n] & 255;
        return r;
      }
      __name(rn, "rn");
      function Ca(e) {
        if (de(e, Uint8Array)) {
          let t = new Uint8Array(e);
          return mi(t.buffer, t.byteOffset, t.byteLength);
        }
        return rn(e);
      }
      __name(Ca, "Ca");
      function mi(e, t, r) {
        if (t < 0 || e.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds');
        if (e.byteLength < t + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
        let n;
        return t === void 0 && r === void 0 ? n = new Uint8Array(e) : r === void 0 ? n = new Uint8Array(e, t) : n = new Uint8Array(e, t, r), Object.setPrototypeOf(n, T.prototype), n;
      }
      __name(mi, "mi");
      function Aa(e) {
        if (T.isBuffer(e)) {
          let t = sn(e.length) | 0, r = xe(t);
          return r.length === 0 || e.copy(r, 0, 0, t), r;
        }
        if (e.length !== void 0) return typeof e.length != "number" || ln(e.length) ? xe(0) : rn(e);
        if (e.type === "Buffer" && Array.isArray(e.data)) return rn(e.data);
      }
      __name(Aa, "Aa");
      function sn(e) {
        if (e >= dr) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + dr.toString(16) + " bytes");
        return e | 0;
      }
      __name(sn, "sn");
      function Ra(e) {
        return +e != e && (e = 0), T.alloc(+e);
      }
      __name(Ra, "Ra");
      T.isBuffer = function(e) {
        return e != null && e._isBuffer === true && e !== T.prototype;
      };
      T.compare = function(e, t) {
        if (de(e, Uint8Array) && (e = T.from(e, e.offset, e.byteLength)), de(t, Uint8Array) && (t = T.from(t, t.offset, t.byteLength)), !T.isBuffer(e) || !T.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
        if (e === t) return 0;
        let r = e.length, n = t.length;
        for (let i = 0, o = Math.min(r, n); i < o; ++i) if (e[i] !== t[i]) {
          r = e[i], n = t[i];
          break;
        }
        return r < n ? -1 : n < r ? 1 : 0;
      };
      T.isEncoding = function(e) {
        switch (String(e).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      T.concat = function(e, t) {
        if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (e.length === 0) return T.alloc(0);
        let r;
        if (t === void 0) for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
        let n = T.allocUnsafe(t), i = 0;
        for (r = 0; r < e.length; ++r) {
          let o = e[r];
          if (de(o, Uint8Array)) i + o.length > n.length ? (T.isBuffer(o) || (o = T.from(o)), o.copy(n, i)) : Uint8Array.prototype.set.call(n, o, i);
          else if (T.isBuffer(o)) o.copy(n, i);
          else throw new TypeError('"list" argument must be an Array of Buffers');
          i += o.length;
        }
        return n;
      };
      function fi(e, t) {
        if (T.isBuffer(e)) return e.length;
        if (ArrayBuffer.isView(e) || de(e, ArrayBuffer)) return e.byteLength;
        if (typeof e != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
        let r = e.length, n = arguments.length > 2 && arguments[2] === true;
        if (!n && r === 0) return 0;
        let i = false;
        for (; ; ) switch (t) {
          case "ascii":
          case "latin1":
          case "binary":
            return r;
          case "utf8":
          case "utf-8":
            return nn(e).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return r * 2;
          case "hex":
            return r >>> 1;
          case "base64":
            return vi(e).length;
          default:
            if (i) return n ? -1 : nn(e).length;
            t = ("" + t).toLowerCase(), i = true;
        }
      }
      __name(fi, "fi");
      T.byteLength = fi;
      function Sa(e, t, r) {
        let n = false;
        if ((t === void 0 || t < 0) && (t = 0), t > this.length || ((r === void 0 || r > this.length) && (r = this.length), r <= 0) || (r >>>= 0, t >>>= 0, r <= t)) return "";
        for (e || (e = "utf8"); ; ) switch (e) {
          case "hex":
            return qa(this, t, r);
          case "utf8":
          case "utf-8":
            return hi(this, t, r);
          case "ascii":
            return _a(this, t, r);
          case "latin1":
          case "binary":
            return La(this, t, r);
          case "base64":
            return Na(this, t, r);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return Ba(this, t, r);
          default:
            if (n) throw new TypeError("Unknown encoding: " + e);
            e = (e + "").toLowerCase(), n = true;
        }
      }
      __name(Sa, "Sa");
      T.prototype._isBuffer = true;
      function Be(e, t, r) {
        let n = e[t];
        e[t] = e[r], e[r] = n;
      }
      __name(Be, "Be");
      T.prototype.swap16 = function() {
        let e = this.length;
        if (e % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (let t = 0; t < e; t += 2) Be(this, t, t + 1);
        return this;
      };
      T.prototype.swap32 = function() {
        let e = this.length;
        if (e % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (let t = 0; t < e; t += 4) Be(this, t, t + 3), Be(this, t + 1, t + 2);
        return this;
      };
      T.prototype.swap64 = function() {
        let e = this.length;
        if (e % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (let t = 0; t < e; t += 8) Be(this, t, t + 7), Be(this, t + 1, t + 6), Be(this, t + 2, t + 5), Be(this, t + 3, t + 4);
        return this;
      };
      T.prototype.toString = function() {
        let e = this.length;
        return e === 0 ? "" : arguments.length === 0 ? hi(this, 0, e) : Sa.apply(this, arguments);
      };
      T.prototype.toLocaleString = T.prototype.toString;
      T.prototype.equals = function(e) {
        if (!T.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
        return this === e ? true : T.compare(this, e) === 0;
      };
      T.prototype.inspect = function() {
        let e = "", t = Ye.INSPECT_MAX_BYTES;
        return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">";
      };
      si && (T.prototype[si] = T.prototype.inspect);
      T.prototype.compare = function(e, t, r, n, i) {
        if (de(e, Uint8Array) && (e = T.from(e, e.offset, e.byteLength)), !T.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
        if (t === void 0 && (t = 0), r === void 0 && (r = e ? e.length : 0), n === void 0 && (n = 0), i === void 0 && (i = this.length), t < 0 || r > e.length || n < 0 || i > this.length) throw new RangeError("out of range index");
        if (n >= i && t >= r) return 0;
        if (n >= i) return -1;
        if (t >= r) return 1;
        if (t >>>= 0, r >>>= 0, n >>>= 0, i >>>= 0, this === e) return 0;
        let o = i - n, s = r - t, a = Math.min(o, s), l = this.slice(n, i), u = e.slice(t, r);
        for (let g = 0; g < a; ++g) if (l[g] !== u[g]) {
          o = l[g], s = u[g];
          break;
        }
        return o < s ? -1 : s < o ? 1 : 0;
      };
      function gi(e, t, r, n, i) {
        if (e.length === 0) return -1;
        if (typeof r == "string" ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, ln(r) && (r = i ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
          if (i) return -1;
          r = e.length - 1;
        } else if (r < 0) if (i) r = 0;
        else return -1;
        if (typeof t == "string" && (t = T.from(t, n)), T.isBuffer(t)) return t.length === 0 ? -1 : ai(e, t, r, n, i);
        if (typeof t == "number") return t = t & 255, typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : ai(e, [t], r, n, i);
        throw new TypeError("val must be string, number or Buffer");
      }
      __name(gi, "gi");
      function ai(e, t, r, n, i) {
        let o = 1, s = e.length, a = t.length;
        if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
          if (e.length < 2 || t.length < 2) return -1;
          o = 2, s /= 2, a /= 2, r /= 2;
        }
        function l(g, h) {
          return o === 1 ? g[h] : g.readUInt16BE(h * o);
        }
        __name(l, "l");
        let u;
        if (i) {
          let g = -1;
          for (u = r; u < s; u++) if (l(e, u) === l(t, g === -1 ? 0 : u - g)) {
            if (g === -1 && (g = u), u - g + 1 === a) return g * o;
          } else g !== -1 && (u -= u - g), g = -1;
        } else for (r + a > s && (r = s - a), u = r; u >= 0; u--) {
          let g = true;
          for (let h = 0; h < a; h++) if (l(e, u + h) !== l(t, h)) {
            g = false;
            break;
          }
          if (g) return u;
        }
        return -1;
      }
      __name(ai, "ai");
      T.prototype.includes = function(e, t, r) {
        return this.indexOf(e, t, r) !== -1;
      };
      T.prototype.indexOf = function(e, t, r) {
        return gi(this, e, t, r, true);
      };
      T.prototype.lastIndexOf = function(e, t, r) {
        return gi(this, e, t, r, false);
      };
      function Ia(e, t, r, n) {
        r = Number(r) || 0;
        let i = e.length - r;
        n ? (n = Number(n), n > i && (n = i)) : n = i;
        let o = t.length;
        n > o / 2 && (n = o / 2);
        let s;
        for (s = 0; s < n; ++s) {
          let a = parseInt(t.substr(s * 2, 2), 16);
          if (ln(a)) return s;
          e[r + s] = a;
        }
        return s;
      }
      __name(Ia, "Ia");
      function Oa(e, t, r, n) {
        return mr(nn(t, e.length - r), e, r, n);
      }
      __name(Oa, "Oa");
      function ka(e, t, r, n) {
        return mr(ja(t), e, r, n);
      }
      __name(ka, "ka");
      function Da(e, t, r, n) {
        return mr(vi(t), e, r, n);
      }
      __name(Da, "Da");
      function Ma(e, t, r, n) {
        return mr(Ja(t, e.length - r), e, r, n);
      }
      __name(Ma, "Ma");
      T.prototype.write = function(e, t, r, n) {
        if (t === void 0) n = "utf8", r = this.length, t = 0;
        else if (r === void 0 && typeof t == "string") n = t, r = this.length, t = 0;
        else if (isFinite(t)) t = t >>> 0, isFinite(r) ? (r = r >>> 0, n === void 0 && (n = "utf8")) : (n = r, r = void 0);
        else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        let i = this.length - t;
        if ((r === void 0 || r > i) && (r = i), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        n || (n = "utf8");
        let o = false;
        for (; ; ) switch (n) {
          case "hex":
            return Ia(this, e, t, r);
          case "utf8":
          case "utf-8":
            return Oa(this, e, t, r);
          case "ascii":
          case "latin1":
          case "binary":
            return ka(this, e, t, r);
          case "base64":
            return Da(this, e, t, r);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return Ma(this, e, t, r);
          default:
            if (o) throw new TypeError("Unknown encoding: " + n);
            n = ("" + n).toLowerCase(), o = true;
        }
      };
      T.prototype.toJSON = function() {
        return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
      };
      function Na(e, t, r) {
        return t === 0 && r === e.length ? tn.fromByteArray(e) : tn.fromByteArray(e.slice(t, r));
      }
      __name(Na, "Na");
      function hi(e, t, r) {
        r = Math.min(e.length, r);
        let n = [], i = t;
        for (; i < r; ) {
          let o = e[i], s = null, a = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
          if (i + a <= r) {
            let l, u, g, h;
            switch (a) {
              case 1:
                o < 128 && (s = o);
                break;
              case 2:
                l = e[i + 1], (l & 192) === 128 && (h = (o & 31) << 6 | l & 63, h > 127 && (s = h));
                break;
              case 3:
                l = e[i + 1], u = e[i + 2], (l & 192) === 128 && (u & 192) === 128 && (h = (o & 15) << 12 | (l & 63) << 6 | u & 63, h > 2047 && (h < 55296 || h > 57343) && (s = h));
                break;
              case 4:
                l = e[i + 1], u = e[i + 2], g = e[i + 3], (l & 192) === 128 && (u & 192) === 128 && (g & 192) === 128 && (h = (o & 15) << 18 | (l & 63) << 12 | (u & 63) << 6 | g & 63, h > 65535 && h < 1114112 && (s = h));
            }
          }
          s === null ? (s = 65533, a = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | s & 1023), n.push(s), i += a;
        }
        return Fa(n);
      }
      __name(hi, "hi");
      var li = 4096;
      function Fa(e) {
        let t = e.length;
        if (t <= li) return String.fromCharCode.apply(String, e);
        let r = "", n = 0;
        for (; n < t; ) r += String.fromCharCode.apply(String, e.slice(n, n += li));
        return r;
      }
      __name(Fa, "Fa");
      function _a(e, t, r) {
        let n = "";
        r = Math.min(e.length, r);
        for (let i = t; i < r; ++i) n += String.fromCharCode(e[i] & 127);
        return n;
      }
      __name(_a, "_a");
      function La(e, t, r) {
        let n = "";
        r = Math.min(e.length, r);
        for (let i = t; i < r; ++i) n += String.fromCharCode(e[i]);
        return n;
      }
      __name(La, "La");
      function qa(e, t, r) {
        let n = e.length;
        (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
        let i = "";
        for (let o = t; o < r; ++o) i += Ga[e[o]];
        return i;
      }
      __name(qa, "qa");
      function Ba(e, t, r) {
        let n = e.slice(t, r), i = "";
        for (let o = 0; o < n.length - 1; o += 2) i += String.fromCharCode(n[o] + n[o + 1] * 256);
        return i;
      }
      __name(Ba, "Ba");
      T.prototype.slice = function(e, t) {
        let r = this.length;
        e = ~~e, t = t === void 0 ? r : ~~t, e < 0 ? (e += r, e < 0 && (e = 0)) : e > r && (e = r), t < 0 ? (t += r, t < 0 && (t = 0)) : t > r && (t = r), t < e && (t = e);
        let n = this.subarray(e, t);
        return Object.setPrototypeOf(n, T.prototype), n;
      };
      function H(e, t, r) {
        if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
        if (e + t > r) throw new RangeError("Trying to access beyond buffer length");
      }
      __name(H, "H");
      T.prototype.readUintLE = T.prototype.readUIntLE = function(e, t, r) {
        e = e >>> 0, t = t >>> 0, r || H(e, t, this.length);
        let n = this[e], i = 1, o = 0;
        for (; ++o < t && (i *= 256); ) n += this[e + o] * i;
        return n;
      };
      T.prototype.readUintBE = T.prototype.readUIntBE = function(e, t, r) {
        e = e >>> 0, t = t >>> 0, r || H(e, t, this.length);
        let n = this[e + --t], i = 1;
        for (; t > 0 && (i *= 256); ) n += this[e + --t] * i;
        return n;
      };
      T.prototype.readUint8 = T.prototype.readUInt8 = function(e, t) {
        return e = e >>> 0, t || H(e, 1, this.length), this[e];
      };
      T.prototype.readUint16LE = T.prototype.readUInt16LE = function(e, t) {
        return e = e >>> 0, t || H(e, 2, this.length), this[e] | this[e + 1] << 8;
      };
      T.prototype.readUint16BE = T.prototype.readUInt16BE = function(e, t) {
        return e = e >>> 0, t || H(e, 2, this.length), this[e] << 8 | this[e + 1];
      };
      T.prototype.readUint32LE = T.prototype.readUInt32LE = function(e, t) {
        return e = e >>> 0, t || H(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
      };
      T.prototype.readUint32BE = T.prototype.readUInt32BE = function(e, t) {
        return e = e >>> 0, t || H(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
      };
      T.prototype.readBigUInt64LE = Ie(function(e) {
        e = e >>> 0, ze(e, "offset");
        let t = this[e], r = this[e + 7];
        (t === void 0 || r === void 0) && Tt(e, this.length - 8);
        let n = t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24, i = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + r * 2 ** 24;
        return BigInt(n) + (BigInt(i) << BigInt(32));
      });
      T.prototype.readBigUInt64BE = Ie(function(e) {
        e = e >>> 0, ze(e, "offset");
        let t = this[e], r = this[e + 7];
        (t === void 0 || r === void 0) && Tt(e, this.length - 8);
        let n = t * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e], i = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + r;
        return (BigInt(n) << BigInt(32)) + BigInt(i);
      });
      T.prototype.readIntLE = function(e, t, r) {
        e = e >>> 0, t = t >>> 0, r || H(e, t, this.length);
        let n = this[e], i = 1, o = 0;
        for (; ++o < t && (i *= 256); ) n += this[e + o] * i;
        return i *= 128, n >= i && (n -= Math.pow(2, 8 * t)), n;
      };
      T.prototype.readIntBE = function(e, t, r) {
        e = e >>> 0, t = t >>> 0, r || H(e, t, this.length);
        let n = t, i = 1, o = this[e + --n];
        for (; n > 0 && (i *= 256); ) o += this[e + --n] * i;
        return i *= 128, o >= i && (o -= Math.pow(2, 8 * t)), o;
      };
      T.prototype.readInt8 = function(e, t) {
        return e = e >>> 0, t || H(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
      };
      T.prototype.readInt16LE = function(e, t) {
        e = e >>> 0, t || H(e, 2, this.length);
        let r = this[e] | this[e + 1] << 8;
        return r & 32768 ? r | 4294901760 : r;
      };
      T.prototype.readInt16BE = function(e, t) {
        e = e >>> 0, t || H(e, 2, this.length);
        let r = this[e + 1] | this[e] << 8;
        return r & 32768 ? r | 4294901760 : r;
      };
      T.prototype.readInt32LE = function(e, t) {
        return e = e >>> 0, t || H(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
      };
      T.prototype.readInt32BE = function(e, t) {
        return e = e >>> 0, t || H(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
      };
      T.prototype.readBigInt64LE = Ie(function(e) {
        e = e >>> 0, ze(e, "offset");
        let t = this[e], r = this[e + 7];
        (t === void 0 || r === void 0) && Tt(e, this.length - 8);
        let n = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (r << 24);
        return (BigInt(n) << BigInt(32)) + BigInt(t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24);
      });
      T.prototype.readBigInt64BE = Ie(function(e) {
        e = e >>> 0, ze(e, "offset");
        let t = this[e], r = this[e + 7];
        (t === void 0 || r === void 0) && Tt(e, this.length - 8);
        let n = (t << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
        return (BigInt(n) << BigInt(32)) + BigInt(this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + r);
      });
      T.prototype.readFloatLE = function(e, t) {
        return e = e >>> 0, t || H(e, 4, this.length), Ke.read(this, e, true, 23, 4);
      };
      T.prototype.readFloatBE = function(e, t) {
        return e = e >>> 0, t || H(e, 4, this.length), Ke.read(this, e, false, 23, 4);
      };
      T.prototype.readDoubleLE = function(e, t) {
        return e = e >>> 0, t || H(e, 8, this.length), Ke.read(this, e, true, 52, 8);
      };
      T.prototype.readDoubleBE = function(e, t) {
        return e = e >>> 0, t || H(e, 8, this.length), Ke.read(this, e, false, 52, 8);
      };
      function re(e, t, r, n, i, o) {
        if (!T.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (t > i || t < o) throw new RangeError('"value" argument is out of bounds');
        if (r + n > e.length) throw new RangeError("Index out of range");
      }
      __name(re, "re");
      T.prototype.writeUintLE = T.prototype.writeUIntLE = function(e, t, r, n) {
        if (e = +e, t = t >>> 0, r = r >>> 0, !n) {
          let s = Math.pow(2, 8 * r) - 1;
          re(this, e, t, r, s, 0);
        }
        let i = 1, o = 0;
        for (this[t] = e & 255; ++o < r && (i *= 256); ) this[t + o] = e / i & 255;
        return t + r;
      };
      T.prototype.writeUintBE = T.prototype.writeUIntBE = function(e, t, r, n) {
        if (e = +e, t = t >>> 0, r = r >>> 0, !n) {
          let s = Math.pow(2, 8 * r) - 1;
          re(this, e, t, r, s, 0);
        }
        let i = r - 1, o = 1;
        for (this[t + i] = e & 255; --i >= 0 && (o *= 256); ) this[t + i] = e / o & 255;
        return t + r;
      };
      T.prototype.writeUint8 = T.prototype.writeUInt8 = function(e, t, r) {
        return e = +e, t = t >>> 0, r || re(this, e, t, 1, 255, 0), this[t] = e & 255, t + 1;
      };
      T.prototype.writeUint16LE = T.prototype.writeUInt16LE = function(e, t, r) {
        return e = +e, t = t >>> 0, r || re(this, e, t, 2, 65535, 0), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
      };
      T.prototype.writeUint16BE = T.prototype.writeUInt16BE = function(e, t, r) {
        return e = +e, t = t >>> 0, r || re(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
      };
      T.prototype.writeUint32LE = T.prototype.writeUInt32LE = function(e, t, r) {
        return e = +e, t = t >>> 0, r || re(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = e & 255, t + 4;
      };
      T.prototype.writeUint32BE = T.prototype.writeUInt32BE = function(e, t, r) {
        return e = +e, t = t >>> 0, r || re(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
      };
      function yi(e, t, r, n, i) {
        Pi(t, n, i, e, r, 7);
        let o = Number(t & BigInt(4294967295));
        e[r++] = o, o = o >> 8, e[r++] = o, o = o >> 8, e[r++] = o, o = o >> 8, e[r++] = o;
        let s = Number(t >> BigInt(32) & BigInt(4294967295));
        return e[r++] = s, s = s >> 8, e[r++] = s, s = s >> 8, e[r++] = s, s = s >> 8, e[r++] = s, r;
      }
      __name(yi, "yi");
      function wi(e, t, r, n, i) {
        Pi(t, n, i, e, r, 7);
        let o = Number(t & BigInt(4294967295));
        e[r + 7] = o, o = o >> 8, e[r + 6] = o, o = o >> 8, e[r + 5] = o, o = o >> 8, e[r + 4] = o;
        let s = Number(t >> BigInt(32) & BigInt(4294967295));
        return e[r + 3] = s, s = s >> 8, e[r + 2] = s, s = s >> 8, e[r + 1] = s, s = s >> 8, e[r] = s, r + 8;
      }
      __name(wi, "wi");
      T.prototype.writeBigUInt64LE = Ie(function(e, t = 0) {
        return yi(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      T.prototype.writeBigUInt64BE = Ie(function(e, t = 0) {
        return wi(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      T.prototype.writeIntLE = function(e, t, r, n) {
        if (e = +e, t = t >>> 0, !n) {
          let a = Math.pow(2, 8 * r - 1);
          re(this, e, t, r, a - 1, -a);
        }
        let i = 0, o = 1, s = 0;
        for (this[t] = e & 255; ++i < r && (o *= 256); ) e < 0 && s === 0 && this[t + i - 1] !== 0 && (s = 1), this[t + i] = (e / o >> 0) - s & 255;
        return t + r;
      };
      T.prototype.writeIntBE = function(e, t, r, n) {
        if (e = +e, t = t >>> 0, !n) {
          let a = Math.pow(2, 8 * r - 1);
          re(this, e, t, r, a - 1, -a);
        }
        let i = r - 1, o = 1, s = 0;
        for (this[t + i] = e & 255; --i >= 0 && (o *= 256); ) e < 0 && s === 0 && this[t + i + 1] !== 0 && (s = 1), this[t + i] = (e / o >> 0) - s & 255;
        return t + r;
      };
      T.prototype.writeInt8 = function(e, t, r) {
        return e = +e, t = t >>> 0, r || re(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = e & 255, t + 1;
      };
      T.prototype.writeInt16LE = function(e, t, r) {
        return e = +e, t = t >>> 0, r || re(this, e, t, 2, 32767, -32768), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
      };
      T.prototype.writeInt16BE = function(e, t, r) {
        return e = +e, t = t >>> 0, r || re(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
      };
      T.prototype.writeInt32LE = function(e, t, r) {
        return e = +e, t = t >>> 0, r || re(this, e, t, 4, 2147483647, -2147483648), this[t] = e & 255, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4;
      };
      T.prototype.writeInt32BE = function(e, t, r) {
        return e = +e, t = t >>> 0, r || re(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
      };
      T.prototype.writeBigInt64LE = Ie(function(e, t = 0) {
        return yi(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      T.prototype.writeBigInt64BE = Ie(function(e, t = 0) {
        return wi(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function Ei(e, t, r, n, i, o) {
        if (r + n > e.length) throw new RangeError("Index out of range");
        if (r < 0) throw new RangeError("Index out of range");
      }
      __name(Ei, "Ei");
      function bi(e, t, r, n, i) {
        return t = +t, r = r >>> 0, i || Ei(e, t, r, 4, 34028234663852886e22, -34028234663852886e22), Ke.write(e, t, r, n, 23, 4), r + 4;
      }
      __name(bi, "bi");
      T.prototype.writeFloatLE = function(e, t, r) {
        return bi(this, e, t, true, r);
      };
      T.prototype.writeFloatBE = function(e, t, r) {
        return bi(this, e, t, false, r);
      };
      function xi(e, t, r, n, i) {
        return t = +t, r = r >>> 0, i || Ei(e, t, r, 8, 17976931348623157e292, -17976931348623157e292), Ke.write(e, t, r, n, 52, 8), r + 8;
      }
      __name(xi, "xi");
      T.prototype.writeDoubleLE = function(e, t, r) {
        return xi(this, e, t, true, r);
      };
      T.prototype.writeDoubleBE = function(e, t, r) {
        return xi(this, e, t, false, r);
      };
      T.prototype.copy = function(e, t, r, n) {
        if (!T.isBuffer(e)) throw new TypeError("argument should be a Buffer");
        if (r || (r = 0), !n && n !== 0 && (n = this.length), t >= e.length && (t = e.length), t || (t = 0), n > 0 && n < r && (n = r), n === r || e.length === 0 || this.length === 0) return 0;
        if (t < 0) throw new RangeError("targetStart out of bounds");
        if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
        if (n < 0) throw new RangeError("sourceEnd out of bounds");
        n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
        let i = n - r;
        return this === e && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, r, n) : Uint8Array.prototype.set.call(e, this.subarray(r, n), t), i;
      };
      T.prototype.fill = function(e, t, r, n) {
        if (typeof e == "string") {
          if (typeof t == "string" ? (n = t, t = 0, r = this.length) : typeof r == "string" && (n = r, r = this.length), n !== void 0 && typeof n != "string") throw new TypeError("encoding must be a string");
          if (typeof n == "string" && !T.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
          if (e.length === 1) {
            let o = e.charCodeAt(0);
            (n === "utf8" && o < 128 || n === "latin1") && (e = o);
          }
        } else typeof e == "number" ? e = e & 255 : typeof e == "boolean" && (e = Number(e));
        if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
        if (r <= t) return this;
        t = t >>> 0, r = r === void 0 ? this.length : r >>> 0, e || (e = 0);
        let i;
        if (typeof e == "number") for (i = t; i < r; ++i) this[i] = e;
        else {
          let o = T.isBuffer(e) ? e : T.from(e, n), s = o.length;
          if (s === 0) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
          for (i = 0; i < r - t; ++i) this[i + t] = o[i % s];
        }
        return this;
      };
      var We = {};
      function an(e, t, r) {
        We[e] = class extends r {
          constructor() {
            super(), Object.defineProperty(this, "message", { value: t.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${e}]`, this.stack, delete this.name;
          }
          get code() {
            return e;
          }
          set code(n) {
            Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: n, writable: true });
          }
          toString() {
            return `${this.name} [${e}]: ${this.message}`;
          }
        };
      }
      __name(an, "an");
      an("ERR_BUFFER_OUT_OF_BOUNDS", function(e) {
        return e ? `${e} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
      }, RangeError);
      an("ERR_INVALID_ARG_TYPE", function(e, t) {
        return `The "${e}" argument must be of type number. Received type ${typeof t}`;
      }, TypeError);
      an("ERR_OUT_OF_RANGE", function(e, t, r) {
        let n = `The value of "${e}" is out of range.`, i = r;
        return Number.isInteger(r) && Math.abs(r) > 2 ** 32 ? i = ui(String(r)) : typeof r == "bigint" && (i = String(r), (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (i = ui(i)), i += "n"), n += ` It must be ${t}. Received ${i}`, n;
      }, RangeError);
      function ui(e) {
        let t = "", r = e.length, n = e[0] === "-" ? 1 : 0;
        for (; r >= n + 4; r -= 3) t = `_${e.slice(r - 3, r)}${t}`;
        return `${e.slice(0, r)}${t}`;
      }
      __name(ui, "ui");
      function Ua(e, t, r) {
        ze(t, "offset"), (e[t] === void 0 || e[t + r] === void 0) && Tt(t, e.length - (r + 1));
      }
      __name(Ua, "Ua");
      function Pi(e, t, r, n, i, o) {
        if (e > r || e < t) {
          let s = typeof t == "bigint" ? "n" : "", a;
          throw o > 3 ? t === 0 || t === BigInt(0) ? a = `>= 0${s} and < 2${s} ** ${(o + 1) * 8}${s}` : a = `>= -(2${s} ** ${(o + 1) * 8 - 1}${s}) and < 2 ** ${(o + 1) * 8 - 1}${s}` : a = `>= ${t}${s} and <= ${r}${s}`, new We.ERR_OUT_OF_RANGE("value", a, e);
        }
        Ua(n, i, o);
      }
      __name(Pi, "Pi");
      function ze(e, t) {
        if (typeof e != "number") throw new We.ERR_INVALID_ARG_TYPE(t, "number", e);
      }
      __name(ze, "ze");
      function Tt(e, t, r) {
        throw Math.floor(e) !== e ? (ze(e, r), new We.ERR_OUT_OF_RANGE(r || "offset", "an integer", e)) : t < 0 ? new We.ERR_BUFFER_OUT_OF_BOUNDS() : new We.ERR_OUT_OF_RANGE(r || "offset", `>= ${r ? 1 : 0} and <= ${t}`, e);
      }
      __name(Tt, "Tt");
      var $a = /[^+/0-9A-Za-z-_]/g;
      function Va(e) {
        if (e = e.split("=")[0], e = e.trim().replace($a, ""), e.length < 2) return "";
        for (; e.length % 4 !== 0; ) e = e + "=";
        return e;
      }
      __name(Va, "Va");
      function nn(e, t) {
        t = t || 1 / 0;
        let r, n = e.length, i = null, o = [];
        for (let s = 0; s < n; ++s) {
          if (r = e.charCodeAt(s), r > 55295 && r < 57344) {
            if (!i) {
              if (r > 56319) {
                (t -= 3) > -1 && o.push(239, 191, 189);
                continue;
              } else if (s + 1 === n) {
                (t -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              i = r;
              continue;
            }
            if (r < 56320) {
              (t -= 3) > -1 && o.push(239, 191, 189), i = r;
              continue;
            }
            r = (i - 55296 << 10 | r - 56320) + 65536;
          } else i && (t -= 3) > -1 && o.push(239, 191, 189);
          if (i = null, r < 128) {
            if ((t -= 1) < 0) break;
            o.push(r);
          } else if (r < 2048) {
            if ((t -= 2) < 0) break;
            o.push(r >> 6 | 192, r & 63 | 128);
          } else if (r < 65536) {
            if ((t -= 3) < 0) break;
            o.push(r >> 12 | 224, r >> 6 & 63 | 128, r & 63 | 128);
          } else if (r < 1114112) {
            if ((t -= 4) < 0) break;
            o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, r & 63 | 128);
          } else throw new Error("Invalid code point");
        }
        return o;
      }
      __name(nn, "nn");
      function ja(e) {
        let t = [];
        for (let r = 0; r < e.length; ++r) t.push(e.charCodeAt(r) & 255);
        return t;
      }
      __name(ja, "ja");
      function Ja(e, t) {
        let r, n, i, o = [];
        for (let s = 0; s < e.length && !((t -= 2) < 0); ++s) r = e.charCodeAt(s), n = r >> 8, i = r % 256, o.push(i), o.push(n);
        return o;
      }
      __name(Ja, "Ja");
      function vi(e) {
        return tn.toByteArray(Va(e));
      }
      __name(vi, "vi");
      function mr(e, t, r, n) {
        let i;
        for (i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i) t[i + r] = e[i];
        return i;
      }
      __name(mr, "mr");
      function de(e, t) {
        return e instanceof t || e != null && e.constructor != null && e.constructor.name != null && e.constructor.name === t.name;
      }
      __name(de, "de");
      function ln(e) {
        return e !== e;
      }
      __name(ln, "ln");
      var Ga = function() {
        let e = "0123456789abcdef", t = new Array(256);
        for (let r = 0; r < 16; ++r) {
          let n = r * 16;
          for (let i = 0; i < 16; ++i) t[n + i] = e[r] + e[i];
        }
        return t;
      }();
      function Ie(e) {
        return typeof BigInt > "u" ? Qa : e;
      }
      __name(Ie, "Ie");
      function Qa() {
        throw new Error("BigInt not supported");
      }
      __name(Qa, "Qa");
    });
    var w;
    var f = Se(() => {
      "use strict";
      w = qe(Ti());
    });
    function Ha() {
      return false;
    }
    __name(Ha, "Ha");
    var Wa;
    var Ka;
    var Si;
    var Ii = Se(() => {
      "use strict";
      f();
      c2();
      p();
      d();
      m();
      Wa = {}, Ka = { existsSync: Ha, promises: Wa }, Si = Ka;
    });
    function tl(...e) {
      return e.join("/");
    }
    __name(tl, "tl");
    function rl(...e) {
      return e.join("/");
    }
    __name(rl, "rl");
    var ji;
    var nl;
    var il;
    var At;
    var Ji = Se(() => {
      "use strict";
      f();
      c2();
      p();
      d();
      m();
      ji = "/", nl = { sep: ji }, il = { resolve: tl, posix: nl, join: rl, sep: ji }, At = il;
    });
    var yr;
    var Qi = Se(() => {
      "use strict";
      f();
      c2();
      p();
      d();
      m();
      yr = class {
        static {
          __name(this, "yr");
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
    var Wi = Le((hm, Hi) => {
      "use strict";
      f();
      c2();
      p();
      d();
      m();
      Hi.exports = (e, t = 1, r) => {
        if (r = { indent: " ", includeEmptyLines: false, ...r }, typeof e != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e}\``);
        if (typeof t != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t}\``);
        if (typeof r.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
        if (t === 0) return e;
        let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return e.replace(n, r.indent.repeat(t));
      };
    });
    var Yi = Le((Sm, zi) => {
      "use strict";
      f();
      c2();
      p();
      d();
      m();
      zi.exports = ({ onlyFirst: e = false } = {}) => {
        let t = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
        return new RegExp(t, e ? void 0 : "g");
      };
    });
    var Xi = Le((Nm, Zi) => {
      "use strict";
      f();
      c2();
      p();
      d();
      m();
      var cl = Yi();
      Zi.exports = (e) => typeof e == "string" ? e.replace(cl(), "") : e;
    });
    var Tn = Le((Ih, yo) => {
      "use strict";
      f();
      c2();
      p();
      d();
      m();
      yo.exports = /* @__PURE__ */ function() {
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
          var a = 0, l, u, g, h, v, S, A, R, M, F, q, D, I = [];
          for (l = 0; l < i; l++) I.push(l + 1), I.push(t.charCodeAt(s + l));
          for (var ae = I.length - 1; a < o - 3; ) for (M = r.charCodeAt(s + (u = a)), F = r.charCodeAt(s + (g = a + 1)), q = r.charCodeAt(s + (h = a + 2)), D = r.charCodeAt(s + (v = a + 3)), S = a += 4, l = 0; l < ae; l += 2) A = I[l], R = I[l + 1], u = e(A, u, g, M, R), g = e(u, g, h, F, R), h = e(g, h, v, q, R), S = e(h, v, S, D, R), I[l] = S, v = h, h = g, g = u, u = A;
          for (; a < o; ) for (M = r.charCodeAt(s + (u = a)), S = ++a, l = 0; l < ae; l += 2) A = I[l], I[l] = S = e(A, u, S, M, I[l + 1]), u = A;
          return S;
        };
      }();
    });
    var Go = Le((Tb, Xu) => {
      Xu.exports = { name: "@prisma/engines-version", version: "5.22.0-44.605197351a3c8bdd595af2d2a9bc3025bca48ea2", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "605197351a3c8bdd595af2d2a9bc3025bca48ea2" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.34", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
    });
    var Qo = Le(() => {
      "use strict";
      f();
      c2();
      p();
      d();
      m();
    });
    var rp = {};
    pr(rp, { Debug: /* @__PURE__ */ __name(() => mn, "Debug"), Decimal: /* @__PURE__ */ __name(() => fe, "Decimal"), Extensions: /* @__PURE__ */ __name(() => un, "Extensions"), MetricsClient: /* @__PURE__ */ __name(() => ft, "MetricsClient"), NotFoundError: /* @__PURE__ */ __name(() => ve, "NotFoundError"), PrismaClientInitializationError: /* @__PURE__ */ __name(() => G, "PrismaClientInitializationError"), PrismaClientKnownRequestError: /* @__PURE__ */ __name(() => W, "PrismaClientKnownRequestError"), PrismaClientRustPanicError: /* @__PURE__ */ __name(() => Te, "PrismaClientRustPanicError"), PrismaClientUnknownRequestError: /* @__PURE__ */ __name(() => ne, "PrismaClientUnknownRequestError"), PrismaClientValidationError: /* @__PURE__ */ __name(() => K, "PrismaClientValidationError"), Public: /* @__PURE__ */ __name(() => cn, "Public"), Sql: /* @__PURE__ */ __name(() => oe, "Sql"), defineDmmfProperty: /* @__PURE__ */ __name(() => Vo, "defineDmmfProperty"), deserializeJsonResponse: /* @__PURE__ */ __name(() => rt, "deserializeJsonResponse"), dmmfToRuntimeDataModel: /* @__PURE__ */ __name(() => $o, "dmmfToRuntimeDataModel"), empty: /* @__PURE__ */ __name(() => Wo, "empty"), getPrismaClient: /* @__PURE__ */ __name(() => pa, "getPrismaClient"), getRuntime: /* @__PURE__ */ __name(() => Gr, "getRuntime"), join: /* @__PURE__ */ __name(() => Ho, "join"), makeStrictEnum: /* @__PURE__ */ __name(() => da, "makeStrictEnum"), makeTypedQueryFactory: /* @__PURE__ */ __name(() => jo, "makeTypedQueryFactory"), objectEnumValues: /* @__PURE__ */ __name(() => Dr, "objectEnumValues"), raw: /* @__PURE__ */ __name(() => _n, "raw"), serializeJsonQuery: /* @__PURE__ */ __name(() => qr, "serializeJsonQuery"), skip: /* @__PURE__ */ __name(() => Lr, "skip"), sqltag: /* @__PURE__ */ __name(() => Ln, "sqltag"), warnEnvConflicts: /* @__PURE__ */ __name(() => void 0, "warnEnvConflicts"), warnOnce: /* @__PURE__ */ __name(() => Ot, "warnOnce") });
    module.exports = Ea(rp);
    f();
    c2();
    p();
    d();
    m();
    var un = {};
    pr(un, { defineExtension: /* @__PURE__ */ __name(() => Ci, "defineExtension"), getExtensionContext: /* @__PURE__ */ __name(() => Ai, "getExtensionContext") });
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    function Ci(e) {
      return typeof e == "function" ? e : (t) => t.$extends(e);
    }
    __name(Ci, "Ci");
    f();
    c2();
    p();
    d();
    m();
    function Ai(e) {
      return e;
    }
    __name(Ai, "Ai");
    var cn = {};
    pr(cn, { validator: /* @__PURE__ */ __name(() => Ri, "validator") });
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    function Ri(...e) {
      return (t) => t;
    }
    __name(Ri, "Ri");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var pn;
    var Oi;
    var ki;
    var Di;
    var Mi = true;
    typeof y < "u" && ({ FORCE_COLOR: pn, NODE_DISABLE_COLORS: Oi, NO_COLOR: ki, TERM: Di } = y.env || {}, Mi = y.stdout && y.stdout.isTTY);
    var za = { enabled: !Oi && ki == null && Di !== "dumb" && (pn != null && pn !== "0" || Mi) };
    function V(e, t) {
      let r = new RegExp(`\\x1b\\[${t}m`, "g"), n = `\x1B[${e}m`, i = `\x1B[${t}m`;
      return function(o) {
        return !za.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
      };
    }
    __name(V, "V");
    var Xp = V(0, 0);
    var fr = V(1, 22);
    var gr = V(2, 22);
    var ed = V(3, 23);
    var Ni = V(4, 24);
    var td = V(7, 27);
    var rd = V(8, 28);
    var nd = V(9, 29);
    var id = V(30, 39);
    var Ze = V(31, 39);
    var Fi = V(32, 39);
    var _i = V(33, 39);
    var Li = V(34, 39);
    var od = V(35, 39);
    var qi = V(36, 39);
    var sd = V(37, 39);
    var Bi = V(90, 39);
    var ad = V(90, 39);
    var ld = V(40, 49);
    var ud = V(41, 49);
    var cd = V(42, 49);
    var pd = V(43, 49);
    var dd = V(44, 49);
    var md = V(45, 49);
    var fd = V(46, 49);
    var gd = V(47, 49);
    f();
    c2();
    p();
    d();
    m();
    var Ya = 100;
    var Ui = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var hr = [];
    var $i = Date.now();
    var Za = 0;
    var dn = typeof y < "u" ? y.env : {};
    globalThis.DEBUG ??= dn.DEBUG ?? "";
    globalThis.DEBUG_COLORS ??= dn.DEBUG_COLORS ? dn.DEBUG_COLORS === "true" : true;
    var Ct = { enable(e) {
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
    function Xa(e) {
      let t = { color: Ui[Za++ % Ui.length], enabled: Ct.enabled(e), namespace: e, log: Ct.log, extend: /* @__PURE__ */ __name(() => {
      }, "extend") }, r = /* @__PURE__ */ __name((...n) => {
        let { enabled: i, namespace: o, color: s, log: a } = t;
        if (n.length !== 0 && hr.push([o, ...n]), hr.length > Ya && hr.shift(), Ct.enabled(o) || i) {
          let l = n.map((g) => typeof g == "string" ? g : el(g)), u = `+${Date.now() - $i}ms`;
          $i = Date.now(), a(o, ...l, u);
        }
      }, "r");
      return new Proxy(r, { get: /* @__PURE__ */ __name((n, i) => t[i], "get"), set: /* @__PURE__ */ __name((n, i, o) => t[i] = o, "set") });
    }
    __name(Xa, "Xa");
    var mn = new Proxy(Xa, { get: /* @__PURE__ */ __name((e, t) => Ct[t], "get"), set: /* @__PURE__ */ __name((e, t, r) => Ct[t] = r, "set") });
    function el(e, t = 2) {
      let r = /* @__PURE__ */ new Set();
      return JSON.stringify(e, (n, i) => {
        if (typeof i == "object" && i !== null) {
          if (r.has(i)) return "[Circular *]";
          r.add(i);
        } else if (typeof i == "bigint") return i.toString();
        return i;
      }, t);
    }
    __name(el, "el");
    function Vi() {
      hr.length = 0;
    }
    __name(Vi, "Vi");
    var ee = mn;
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var Gi = "library";
    function Rt(e) {
      let t = ol();
      return t || (e?.config.engineType === "library" ? "library" : e?.config.engineType === "binary" ? "binary" : Gi);
    }
    __name(Rt, "Rt");
    function ol() {
      let e = y.env.PRISMA_CLIENT_ENGINE_TYPE;
      return e === "library" ? "library" : e === "binary" ? "binary" : void 0;
    }
    __name(ol, "ol");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var Ue;
    ((t) => {
      let e;
      ((I) => (I.findUnique = "findUnique", I.findUniqueOrThrow = "findUniqueOrThrow", I.findFirst = "findFirst", I.findFirstOrThrow = "findFirstOrThrow", I.findMany = "findMany", I.create = "create", I.createMany = "createMany", I.createManyAndReturn = "createManyAndReturn", I.update = "update", I.updateMany = "updateMany", I.upsert = "upsert", I.delete = "delete", I.deleteMany = "deleteMany", I.groupBy = "groupBy", I.count = "count", I.aggregate = "aggregate", I.findRaw = "findRaw", I.aggregateRaw = "aggregateRaw"))(e = t.ModelAction ||= {});
    })(Ue ||= {});
    var It = {};
    pr(It, { error: /* @__PURE__ */ __name(() => ll, "error"), info: /* @__PURE__ */ __name(() => al, "info"), log: /* @__PURE__ */ __name(() => sl, "log"), query: /* @__PURE__ */ __name(() => ul, "query"), should: /* @__PURE__ */ __name(() => Ki, "should"), tags: /* @__PURE__ */ __name(() => St, "tags"), warn: /* @__PURE__ */ __name(() => fn, "warn") });
    f();
    c2();
    p();
    d();
    m();
    var St = { error: Ze("prisma:error"), warn: _i("prisma:warn"), info: qi("prisma:info"), query: Li("prisma:query") };
    var Ki = { warn: /* @__PURE__ */ __name(() => !y.env.PRISMA_DISABLE_WARNINGS, "warn") };
    function sl(...e) {
      console.log(...e);
    }
    __name(sl, "sl");
    function fn(e, ...t) {
      Ki.warn() && console.warn(`${St.warn} ${e}`, ...t);
    }
    __name(fn, "fn");
    function al(e, ...t) {
      console.info(`${St.info} ${e}`, ...t);
    }
    __name(al, "al");
    function ll(e, ...t) {
      console.error(`${St.error} ${e}`, ...t);
    }
    __name(ll, "ll");
    function ul(e, ...t) {
      console.log(`${St.query} ${e}`, ...t);
    }
    __name(ul, "ul");
    f();
    c2();
    p();
    d();
    m();
    function Pe(e, t) {
      throw new Error(t);
    }
    __name(Pe, "Pe");
    f();
    c2();
    p();
    d();
    m();
    function gn(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }
    __name(gn, "gn");
    f();
    c2();
    p();
    d();
    m();
    var hn = /* @__PURE__ */ __name((e, t) => e.reduce((r, n) => (r[t(n)] = n, r), {}), "hn");
    f();
    c2();
    p();
    d();
    m();
    function Xe(e, t) {
      let r = {};
      for (let n of Object.keys(e)) r[n] = t(e[n], n);
      return r;
    }
    __name(Xe, "Xe");
    f();
    c2();
    p();
    d();
    m();
    function yn(e, t) {
      if (e.length === 0) return;
      let r = e[0];
      for (let n = 1; n < e.length; n++) t(r, e[n]) < 0 && (r = e[n]);
      return r;
    }
    __name(yn, "yn");
    f();
    c2();
    p();
    d();
    m();
    function N(e, t) {
      Object.defineProperty(e, "name", { value: t, configurable: true });
    }
    __name(N, "N");
    f();
    c2();
    p();
    d();
    m();
    var eo = /* @__PURE__ */ new Set();
    var Ot = /* @__PURE__ */ __name((e, t, ...r) => {
      eo.has(e) || (eo.add(e), fn(t, ...r));
    }, "Ot");
    f();
    c2();
    p();
    d();
    m();
    var W = class extends Error {
      static {
        __name(this, "W");
      }
      constructor(t, { code: r, clientVersion: n, meta: i, batchRequestIdx: o }) {
        super(t), this.name = "PrismaClientKnownRequestError", this.code = r, this.clientVersion = n, this.meta = i, Object.defineProperty(this, "batchRequestIdx", { value: o, enumerable: false, writable: true });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
      }
    };
    N(W, "PrismaClientKnownRequestError");
    var ve = class extends W {
      static {
        __name(this, "ve");
      }
      constructor(t, r) {
        super(t, { code: "P2025", clientVersion: r }), this.name = "NotFoundError";
      }
    };
    N(ve, "NotFoundError");
    f();
    c2();
    p();
    d();
    m();
    var G = class e extends Error {
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
    N(G, "PrismaClientInitializationError");
    f();
    c2();
    p();
    d();
    m();
    var Te = class extends Error {
      static {
        __name(this, "Te");
      }
      constructor(t, r) {
        super(t), this.name = "PrismaClientRustPanicError", this.clientVersion = r;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
      }
    };
    N(Te, "PrismaClientRustPanicError");
    f();
    c2();
    p();
    d();
    m();
    var ne = class extends Error {
      static {
        __name(this, "ne");
      }
      constructor(t, { clientVersion: r, batchRequestIdx: n }) {
        super(t), this.name = "PrismaClientUnknownRequestError", this.clientVersion = r, Object.defineProperty(this, "batchRequestIdx", { value: n, writable: true, enumerable: false });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
      }
    };
    N(ne, "PrismaClientUnknownRequestError");
    f();
    c2();
    p();
    d();
    m();
    var K = class extends Error {
      static {
        __name(this, "K");
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
    N(K, "PrismaClientValidationError");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var et = 9e15;
    var Me = 1e9;
    var wn = "0123456789abcdef";
    var Er = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
    var br = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
    var En = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -et, maxE: et, crypto: false };
    var oo;
    var Ce;
    var _ = true;
    var Pr = "[DecimalError] ";
    var De = Pr + "Invalid argument: ";
    var so = Pr + "Precision limit exceeded";
    var ao = Pr + "crypto unavailable";
    var lo = "[object Decimal]";
    var X = Math.floor;
    var Q = Math.pow;
    var pl = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
    var dl = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
    var ml = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
    var uo = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
    var pe = 1e7;
    var k = 7;
    var fl = 9007199254740991;
    var gl = Er.length - 1;
    var bn = br.length - 1;
    var C = { toStringTag: lo };
    C.absoluteValue = C.abs = function() {
      var e = new this.constructor(this);
      return e.s < 0 && (e.s = 1), O(e);
    };
    C.ceil = function() {
      return O(new this.constructor(this), this.e + 1, 2);
    };
    C.clampedTo = C.clamp = function(e, t) {
      var r, n = this, i = n.constructor;
      if (e = new i(e), t = new i(t), !e.s || !t.s) return new i(NaN);
      if (e.gt(t)) throw Error(De + t);
      return r = n.cmp(e), r < 0 ? e : n.cmp(t) > 0 ? t : new i(n);
    };
    C.comparedTo = C.cmp = function(e) {
      var t, r, n, i, o = this, s = o.d, a = (e = new o.constructor(e)).d, l = o.s, u = e.s;
      if (!s || !a) return !l || !u ? NaN : l !== u ? l : s === a ? 0 : !s ^ l < 0 ? 1 : -1;
      if (!s[0] || !a[0]) return s[0] ? l : a[0] ? -u : 0;
      if (l !== u) return l;
      if (o.e !== e.e) return o.e > e.e ^ l < 0 ? 1 : -1;
      for (n = s.length, i = a.length, t = 0, r = n < i ? n : i; t < r; ++t) if (s[t] !== a[t]) return s[t] > a[t] ^ l < 0 ? 1 : -1;
      return n === i ? 0 : n > i ^ l < 0 ? 1 : -1;
    };
    C.cosine = C.cos = function() {
      var e, t, r = this, n = r.constructor;
      return r.d ? r.d[0] ? (e = n.precision, t = n.rounding, n.precision = e + Math.max(r.e, r.sd()) + k, n.rounding = 1, r = hl(n, go(n, r)), n.precision = e, n.rounding = t, O(Ce == 2 || Ce == 3 ? r.neg() : r, e, t, true)) : new n(1) : new n(NaN);
    };
    C.cubeRoot = C.cbrt = function() {
      var e, t, r, n, i, o, s, a, l, u, g = this, h = g.constructor;
      if (!g.isFinite() || g.isZero()) return new h(g);
      for (_ = false, o = g.s * Q(g.s * g, 1 / 3), !o || Math.abs(o) == 1 / 0 ? (r = Y(g.d), e = g.e, (o = (e - r.length + 1) % 3) && (r += o == 1 || o == -2 ? "0" : "00"), o = Q(r, 1 / 3), e = X((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), o == 1 / 0 ? r = "5e" + e : (r = o.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + e), n = new h(r), n.s = g.s) : n = new h(o.toString()), s = (e = h.precision) + 3; ; ) if (a = n, l = a.times(a).times(a), u = l.plus(g), n = U(u.plus(g).times(a), u.plus(l), s + 2, 1), Y(a.d).slice(0, s) === (r = Y(n.d)).slice(0, s)) if (r = r.slice(s - 3, s + 1), r == "9999" || !i && r == "4999") {
        if (!i && (O(a, e + 1, 0), a.times(a).times(a).eq(g))) {
          n = a;
          break;
        }
        s += 4, i = 1;
      } else {
        (!+r || !+r.slice(1) && r.charAt(0) == "5") && (O(n, e + 1, 1), t = !n.times(n).times(n).eq(g));
        break;
      }
      return _ = true, O(n, e, h.rounding, t);
    };
    C.decimalPlaces = C.dp = function() {
      var e, t = this.d, r = NaN;
      if (t) {
        if (e = t.length - 1, r = (e - X(this.e / k)) * k, e = t[e], e) for (; e % 10 == 0; e /= 10) r--;
        r < 0 && (r = 0);
      }
      return r;
    };
    C.dividedBy = C.div = function(e) {
      return U(this, new this.constructor(e));
    };
    C.dividedToIntegerBy = C.divToInt = function(e) {
      var t = this, r = t.constructor;
      return O(U(t, new r(e), 0, 1, 1), r.precision, r.rounding);
    };
    C.equals = C.eq = function(e) {
      return this.cmp(e) === 0;
    };
    C.floor = function() {
      return O(new this.constructor(this), this.e + 1, 3);
    };
    C.greaterThan = C.gt = function(e) {
      return this.cmp(e) > 0;
    };
    C.greaterThanOrEqualTo = C.gte = function(e) {
      var t = this.cmp(e);
      return t == 1 || t === 0;
    };
    C.hyperbolicCosine = C.cosh = function() {
      var e, t, r, n, i, o = this, s = o.constructor, a = new s(1);
      if (!o.isFinite()) return new s(o.s ? 1 / 0 : NaN);
      if (o.isZero()) return a;
      r = s.precision, n = s.rounding, s.precision = r + Math.max(o.e, o.sd()) + 4, s.rounding = 1, i = o.d.length, i < 32 ? (e = Math.ceil(i / 3), t = (1 / Tr(4, e)).toString()) : (e = 16, t = "2.3283064365386962890625e-10"), o = tt(s, 1, o.times(t), new s(1), true);
      for (var l, u = e, g = new s(8); u--; ) l = o.times(o), o = a.minus(l.times(g.minus(l.times(g))));
      return O(o, s.precision = r, s.rounding = n, true);
    };
    C.hyperbolicSine = C.sinh = function() {
      var e, t, r, n, i = this, o = i.constructor;
      if (!i.isFinite() || i.isZero()) return new o(i);
      if (t = o.precision, r = o.rounding, o.precision = t + Math.max(i.e, i.sd()) + 4, o.rounding = 1, n = i.d.length, n < 3) i = tt(o, 2, i, i, true);
      else {
        e = 1.4 * Math.sqrt(n), e = e > 16 ? 16 : e | 0, i = i.times(1 / Tr(5, e)), i = tt(o, 2, i, i, true);
        for (var s, a = new o(5), l = new o(16), u = new o(20); e--; ) s = i.times(i), i = i.times(a.plus(s.times(l.times(s).plus(u))));
      }
      return o.precision = t, o.rounding = r, O(i, t, r, true);
    };
    C.hyperbolicTangent = C.tanh = function() {
      var e, t, r = this, n = r.constructor;
      return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 7, n.rounding = 1, U(r.sinh(), r.cosh(), n.precision = e, n.rounding = t)) : new n(r.s);
    };
    C.inverseCosine = C.acos = function() {
      var e, t = this, r = t.constructor, n = t.abs().cmp(1), i = r.precision, o = r.rounding;
      return n !== -1 ? n === 0 ? t.isNeg() ? ce(r, i, o) : new r(0) : new r(NaN) : t.isZero() ? ce(r, i + 4, o).times(0.5) : (r.precision = i + 6, r.rounding = 1, t = t.asin(), e = ce(r, i + 4, o).times(0.5), r.precision = i, r.rounding = o, e.minus(t));
    };
    C.inverseHyperbolicCosine = C.acosh = function() {
      var e, t, r = this, n = r.constructor;
      return r.lte(1) ? new n(r.eq(1) ? 0 : NaN) : r.isFinite() ? (e = n.precision, t = n.rounding, n.precision = e + Math.max(Math.abs(r.e), r.sd()) + 4, n.rounding = 1, _ = false, r = r.times(r).minus(1).sqrt().plus(r), _ = true, n.precision = e, n.rounding = t, r.ln()) : new n(r);
    };
    C.inverseHyperbolicSine = C.asinh = function() {
      var e, t, r = this, n = r.constructor;
      return !r.isFinite() || r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 2 * Math.max(Math.abs(r.e), r.sd()) + 6, n.rounding = 1, _ = false, r = r.times(r).plus(1).sqrt().plus(r), _ = true, n.precision = e, n.rounding = t, r.ln());
    };
    C.inverseHyperbolicTangent = C.atanh = function() {
      var e, t, r, n, i = this, o = i.constructor;
      return i.isFinite() ? i.e >= 0 ? new o(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN) : (e = o.precision, t = o.rounding, n = i.sd(), Math.max(n, e) < 2 * -i.e - 1 ? O(new o(i), e, t, true) : (o.precision = r = n - i.e, i = U(i.plus(1), new o(1).minus(i), r + e, 1), o.precision = e + 4, o.rounding = 1, i = i.ln(), o.precision = e, o.rounding = t, i.times(0.5))) : new o(NaN);
    };
    C.inverseSine = C.asin = function() {
      var e, t, r, n, i = this, o = i.constructor;
      return i.isZero() ? new o(i) : (t = i.abs().cmp(1), r = o.precision, n = o.rounding, t !== -1 ? t === 0 ? (e = ce(o, r + 4, n).times(0.5), e.s = i.s, e) : new o(NaN) : (o.precision = r + 6, o.rounding = 1, i = i.div(new o(1).minus(i.times(i)).sqrt().plus(1)).atan(), o.precision = r, o.rounding = n, i.times(2)));
    };
    C.inverseTangent = C.atan = function() {
      var e, t, r, n, i, o, s, a, l, u = this, g = u.constructor, h = g.precision, v = g.rounding;
      if (u.isFinite()) {
        if (u.isZero()) return new g(u);
        if (u.abs().eq(1) && h + 4 <= bn) return s = ce(g, h + 4, v).times(0.25), s.s = u.s, s;
      } else {
        if (!u.s) return new g(NaN);
        if (h + 4 <= bn) return s = ce(g, h + 4, v).times(0.5), s.s = u.s, s;
      }
      for (g.precision = a = h + 10, g.rounding = 1, r = Math.min(28, a / k + 2 | 0), e = r; e; --e) u = u.div(u.times(u).plus(1).sqrt().plus(1));
      for (_ = false, t = Math.ceil(a / k), n = 1, l = u.times(u), s = new g(u), i = u; e !== -1; ) if (i = i.times(l), o = s.minus(i.div(n += 2)), i = i.times(l), s = o.plus(i.div(n += 2)), s.d[t] !== void 0) for (e = t; s.d[e] === o.d[e] && e--; ) ;
      return r && (s = s.times(2 << r - 1)), _ = true, O(s, g.precision = h, g.rounding = v, true);
    };
    C.isFinite = function() {
      return !!this.d;
    };
    C.isInteger = C.isInt = function() {
      return !!this.d && X(this.e / k) > this.d.length - 2;
    };
    C.isNaN = function() {
      return !this.s;
    };
    C.isNegative = C.isNeg = function() {
      return this.s < 0;
    };
    C.isPositive = C.isPos = function() {
      return this.s > 0;
    };
    C.isZero = function() {
      return !!this.d && this.d[0] === 0;
    };
    C.lessThan = C.lt = function(e) {
      return this.cmp(e) < 0;
    };
    C.lessThanOrEqualTo = C.lte = function(e) {
      return this.cmp(e) < 1;
    };
    C.logarithm = C.log = function(e) {
      var t, r, n, i, o, s, a, l, u = this, g = u.constructor, h = g.precision, v = g.rounding, S = 5;
      if (e == null) e = new g(10), t = true;
      else {
        if (e = new g(e), r = e.d, e.s < 0 || !r || !r[0] || e.eq(1)) return new g(NaN);
        t = e.eq(10);
      }
      if (r = u.d, u.s < 0 || !r || !r[0] || u.eq(1)) return new g(r && !r[0] ? -1 / 0 : u.s != 1 ? NaN : r ? 0 : 1 / 0);
      if (t) if (r.length > 1) o = true;
      else {
        for (i = r[0]; i % 10 === 0; ) i /= 10;
        o = i !== 1;
      }
      if (_ = false, a = h + S, s = ke(u, a), n = t ? xr(g, a + 10) : ke(e, a), l = U(s, n, a, 1), kt(l.d, i = h, v)) do
        if (a += 10, s = ke(u, a), n = t ? xr(g, a + 10) : ke(e, a), l = U(s, n, a, 1), !o) {
          +Y(l.d).slice(i + 1, i + 15) + 1 == 1e14 && (l = O(l, h + 1, 0));
          break;
        }
      while (kt(l.d, i += 10, v));
      return _ = true, O(l, h, v);
    };
    C.minus = C.sub = function(e) {
      var t, r, n, i, o, s, a, l, u, g, h, v, S = this, A = S.constructor;
      if (e = new A(e), !S.d || !e.d) return !S.s || !e.s ? e = new A(NaN) : S.d ? e.s = -e.s : e = new A(e.d || S.s !== e.s ? S : NaN), e;
      if (S.s != e.s) return e.s = -e.s, S.plus(e);
      if (u = S.d, v = e.d, a = A.precision, l = A.rounding, !u[0] || !v[0]) {
        if (v[0]) e.s = -e.s;
        else if (u[0]) e = new A(S);
        else return new A(l === 3 ? -0 : 0);
        return _ ? O(e, a, l) : e;
      }
      if (r = X(e.e / k), g = X(S.e / k), u = u.slice(), o = g - r, o) {
        for (h = o < 0, h ? (t = u, o = -o, s = v.length) : (t = v, r = g, s = u.length), n = Math.max(Math.ceil(a / k), s) + 2, o > n && (o = n, t.length = 1), t.reverse(), n = o; n--; ) t.push(0);
        t.reverse();
      } else {
        for (n = u.length, s = v.length, h = n < s, h && (s = n), n = 0; n < s; n++) if (u[n] != v[n]) {
          h = u[n] < v[n];
          break;
        }
        o = 0;
      }
      for (h && (t = u, u = v, v = t, e.s = -e.s), s = u.length, n = v.length - s; n > 0; --n) u[s++] = 0;
      for (n = v.length; n > o; ) {
        if (u[--n] < v[n]) {
          for (i = n; i && u[--i] === 0; ) u[i] = pe - 1;
          --u[i], u[n] += pe;
        }
        u[n] -= v[n];
      }
      for (; u[--s] === 0; ) u.pop();
      for (; u[0] === 0; u.shift()) --r;
      return u[0] ? (e.d = u, e.e = vr(u, r), _ ? O(e, a, l) : e) : new A(l === 3 ? -0 : 0);
    };
    C.modulo = C.mod = function(e) {
      var t, r = this, n = r.constructor;
      return e = new n(e), !r.d || !e.s || e.d && !e.d[0] ? new n(NaN) : !e.d || r.d && !r.d[0] ? O(new n(r), n.precision, n.rounding) : (_ = false, n.modulo == 9 ? (t = U(r, e.abs(), 0, 3, 1), t.s *= e.s) : t = U(r, e, 0, n.modulo, 1), t = t.times(e), _ = true, r.minus(t));
    };
    C.naturalExponential = C.exp = function() {
      return xn(this);
    };
    C.naturalLogarithm = C.ln = function() {
      return ke(this);
    };
    C.negated = C.neg = function() {
      var e = new this.constructor(this);
      return e.s = -e.s, O(e);
    };
    C.plus = C.add = function(e) {
      var t, r, n, i, o, s, a, l, u, g, h = this, v = h.constructor;
      if (e = new v(e), !h.d || !e.d) return !h.s || !e.s ? e = new v(NaN) : h.d || (e = new v(e.d || h.s === e.s ? h : NaN)), e;
      if (h.s != e.s) return e.s = -e.s, h.minus(e);
      if (u = h.d, g = e.d, a = v.precision, l = v.rounding, !u[0] || !g[0]) return g[0] || (e = new v(h)), _ ? O(e, a, l) : e;
      if (o = X(h.e / k), n = X(e.e / k), u = u.slice(), i = o - n, i) {
        for (i < 0 ? (r = u, i = -i, s = g.length) : (r = g, n = o, s = u.length), o = Math.ceil(a / k), s = o > s ? o + 1 : s + 1, i > s && (i = s, r.length = 1), r.reverse(); i--; ) r.push(0);
        r.reverse();
      }
      for (s = u.length, i = g.length, s - i < 0 && (i = s, r = g, g = u, u = r), t = 0; i; ) t = (u[--i] = u[i] + g[i] + t) / pe | 0, u[i] %= pe;
      for (t && (u.unshift(t), ++n), s = u.length; u[--s] == 0; ) u.pop();
      return e.d = u, e.e = vr(u, n), _ ? O(e, a, l) : e;
    };
    C.precision = C.sd = function(e) {
      var t, r = this;
      if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(De + e);
      return r.d ? (t = co(r.d), e && r.e + 1 > t && (t = r.e + 1)) : t = NaN, t;
    };
    C.round = function() {
      var e = this, t = e.constructor;
      return O(new t(e), e.e + 1, t.rounding);
    };
    C.sine = C.sin = function() {
      var e, t, r = this, n = r.constructor;
      return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + Math.max(r.e, r.sd()) + k, n.rounding = 1, r = wl(n, go(n, r)), n.precision = e, n.rounding = t, O(Ce > 2 ? r.neg() : r, e, t, true)) : new n(NaN);
    };
    C.squareRoot = C.sqrt = function() {
      var e, t, r, n, i, o, s = this, a = s.d, l = s.e, u = s.s, g = s.constructor;
      if (u !== 1 || !a || !a[0]) return new g(!u || u < 0 && (!a || a[0]) ? NaN : a ? s : 1 / 0);
      for (_ = false, u = Math.sqrt(+s), u == 0 || u == 1 / 0 ? (t = Y(a), (t.length + l) % 2 == 0 && (t += "0"), u = Math.sqrt(t), l = X((l + 1) / 2) - (l < 0 || l % 2), u == 1 / 0 ? t = "5e" + l : (t = u.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + l), n = new g(t)) : n = new g(u.toString()), r = (l = g.precision) + 3; ; ) if (o = n, n = o.plus(U(s, o, r + 2, 1)).times(0.5), Y(o.d).slice(0, r) === (t = Y(n.d)).slice(0, r)) if (t = t.slice(r - 3, r + 1), t == "9999" || !i && t == "4999") {
        if (!i && (O(o, l + 1, 0), o.times(o).eq(s))) {
          n = o;
          break;
        }
        r += 4, i = 1;
      } else {
        (!+t || !+t.slice(1) && t.charAt(0) == "5") && (O(n, l + 1, 1), e = !n.times(n).eq(s));
        break;
      }
      return _ = true, O(n, l, g.rounding, e);
    };
    C.tangent = C.tan = function() {
      var e, t, r = this, n = r.constructor;
      return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 10, n.rounding = 1, r = r.sin(), r.s = 1, r = U(r, new n(1).minus(r.times(r)).sqrt(), e + 10, 0), n.precision = e, n.rounding = t, O(Ce == 2 || Ce == 4 ? r.neg() : r, e, t, true)) : new n(NaN);
    };
    C.times = C.mul = function(e) {
      var t, r, n, i, o, s, a, l, u, g = this, h = g.constructor, v = g.d, S = (e = new h(e)).d;
      if (e.s *= g.s, !v || !v[0] || !S || !S[0]) return new h(!e.s || v && !v[0] && !S || S && !S[0] && !v ? NaN : !v || !S ? e.s / 0 : e.s * 0);
      for (r = X(g.e / k) + X(e.e / k), l = v.length, u = S.length, l < u && (o = v, v = S, S = o, s = l, l = u, u = s), o = [], s = l + u, n = s; n--; ) o.push(0);
      for (n = u; --n >= 0; ) {
        for (t = 0, i = l + n; i > n; ) a = o[i] + S[n] * v[i - n - 1] + t, o[i--] = a % pe | 0, t = a / pe | 0;
        o[i] = (o[i] + t) % pe | 0;
      }
      for (; !o[--s]; ) o.pop();
      return t ? ++r : o.shift(), e.d = o, e.e = vr(o, r), _ ? O(e, h.precision, h.rounding) : e;
    };
    C.toBinary = function(e, t) {
      return vn(this, 2, e, t);
    };
    C.toDecimalPlaces = C.toDP = function(e, t) {
      var r = this, n = r.constructor;
      return r = new n(r), e === void 0 ? r : (ie(e, 0, Me), t === void 0 ? t = n.rounding : ie(t, 0, 8), O(r, e + r.e + 1, t));
    };
    C.toExponential = function(e, t) {
      var r, n = this, i = n.constructor;
      return e === void 0 ? r = me(n, true) : (ie(e, 0, Me), t === void 0 ? t = i.rounding : ie(t, 0, 8), n = O(new i(n), e + 1, t), r = me(n, true, e + 1)), n.isNeg() && !n.isZero() ? "-" + r : r;
    };
    C.toFixed = function(e, t) {
      var r, n, i = this, o = i.constructor;
      return e === void 0 ? r = me(i) : (ie(e, 0, Me), t === void 0 ? t = o.rounding : ie(t, 0, 8), n = O(new o(i), e + i.e + 1, t), r = me(n, false, e + n.e + 1)), i.isNeg() && !i.isZero() ? "-" + r : r;
    };
    C.toFraction = function(e) {
      var t, r, n, i, o, s, a, l, u, g, h, v, S = this, A = S.d, R = S.constructor;
      if (!A) return new R(S);
      if (u = r = new R(1), n = l = new R(0), t = new R(n), o = t.e = co(A) - S.e - 1, s = o % k, t.d[0] = Q(10, s < 0 ? k + s : s), e == null) e = o > 0 ? t : u;
      else {
        if (a = new R(e), !a.isInt() || a.lt(u)) throw Error(De + a);
        e = a.gt(t) ? o > 0 ? t : u : a;
      }
      for (_ = false, a = new R(Y(A)), g = R.precision, R.precision = o = A.length * k * 2; h = U(a, t, 0, 1, 1), i = r.plus(h.times(n)), i.cmp(e) != 1; ) r = n, n = i, i = u, u = l.plus(h.times(i)), l = i, i = t, t = a.minus(h.times(i)), a = i;
      return i = U(e.minus(r), n, 0, 1, 1), l = l.plus(i.times(u)), r = r.plus(i.times(n)), l.s = u.s = S.s, v = U(u, n, o, 1).minus(S).abs().cmp(U(l, r, o, 1).minus(S).abs()) < 1 ? [u, n] : [l, r], R.precision = g, _ = true, v;
    };
    C.toHexadecimal = C.toHex = function(e, t) {
      return vn(this, 16, e, t);
    };
    C.toNearest = function(e, t) {
      var r = this, n = r.constructor;
      if (r = new n(r), e == null) {
        if (!r.d) return r;
        e = new n(1), t = n.rounding;
      } else {
        if (e = new n(e), t === void 0 ? t = n.rounding : ie(t, 0, 8), !r.d) return e.s ? r : e;
        if (!e.d) return e.s && (e.s = r.s), e;
      }
      return e.d[0] ? (_ = false, r = U(r, e, 0, t, 1).times(e), _ = true, O(r)) : (e.s = r.s, r = e), r;
    };
    C.toNumber = function() {
      return +this;
    };
    C.toOctal = function(e, t) {
      return vn(this, 8, e, t);
    };
    C.toPower = C.pow = function(e) {
      var t, r, n, i, o, s, a = this, l = a.constructor, u = +(e = new l(e));
      if (!a.d || !e.d || !a.d[0] || !e.d[0]) return new l(Q(+a, u));
      if (a = new l(a), a.eq(1)) return a;
      if (n = l.precision, o = l.rounding, e.eq(1)) return O(a, n, o);
      if (t = X(e.e / k), t >= e.d.length - 1 && (r = u < 0 ? -u : u) <= fl) return i = po(l, a, r, n), e.s < 0 ? new l(1).div(i) : O(i, n, o);
      if (s = a.s, s < 0) {
        if (t < e.d.length - 1) return new l(NaN);
        if (e.d[t] & 1 || (s = 1), a.e == 0 && a.d[0] == 1 && a.d.length == 1) return a.s = s, a;
      }
      return r = Q(+a, u), t = r == 0 || !isFinite(r) ? X(u * (Math.log("0." + Y(a.d)) / Math.LN10 + a.e + 1)) : new l(r + "").e, t > l.maxE + 1 || t < l.minE - 1 ? new l(t > 0 ? s / 0 : 0) : (_ = false, l.rounding = a.s = 1, r = Math.min(12, (t + "").length), i = xn(e.times(ke(a, n + r)), n), i.d && (i = O(i, n + 5, 1), kt(i.d, n, o) && (t = n + 10, i = O(xn(e.times(ke(a, t + r)), t), t + 5, 1), +Y(i.d).slice(n + 1, n + 15) + 1 == 1e14 && (i = O(i, n + 1, 0)))), i.s = s, _ = true, l.rounding = o, O(i, n, o));
    };
    C.toPrecision = function(e, t) {
      var r, n = this, i = n.constructor;
      return e === void 0 ? r = me(n, n.e <= i.toExpNeg || n.e >= i.toExpPos) : (ie(e, 1, Me), t === void 0 ? t = i.rounding : ie(t, 0, 8), n = O(new i(n), e, t), r = me(n, e <= n.e || n.e <= i.toExpNeg, e)), n.isNeg() && !n.isZero() ? "-" + r : r;
    };
    C.toSignificantDigits = C.toSD = function(e, t) {
      var r = this, n = r.constructor;
      return e === void 0 ? (e = n.precision, t = n.rounding) : (ie(e, 1, Me), t === void 0 ? t = n.rounding : ie(t, 0, 8)), O(new n(r), e, t);
    };
    C.toString = function() {
      var e = this, t = e.constructor, r = me(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
      return e.isNeg() && !e.isZero() ? "-" + r : r;
    };
    C.truncated = C.trunc = function() {
      return O(new this.constructor(this), this.e + 1, 1);
    };
    C.valueOf = C.toJSON = function() {
      var e = this, t = e.constructor, r = me(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
      return e.isNeg() ? "-" + r : r;
    };
    function Y(e) {
      var t, r, n, i = e.length - 1, o = "", s = e[0];
      if (i > 0) {
        for (o += s, t = 1; t < i; t++) n = e[t] + "", r = k - n.length, r && (o += Oe(r)), o += n;
        s = e[t], n = s + "", r = k - n.length, r && (o += Oe(r));
      } else if (s === 0) return "0";
      for (; s % 10 === 0; ) s /= 10;
      return o + s;
    }
    __name(Y, "Y");
    function ie(e, t, r) {
      if (e !== ~~e || e < t || e > r) throw Error(De + e);
    }
    __name(ie, "ie");
    function kt(e, t, r, n) {
      var i, o, s, a;
      for (o = e[0]; o >= 10; o /= 10) --t;
      return --t < 0 ? (t += k, i = 0) : (i = Math.ceil((t + 1) / k), t %= k), o = Q(10, k - t), a = e[i] % o | 0, n == null ? t < 3 ? (t == 0 ? a = a / 100 | 0 : t == 1 && (a = a / 10 | 0), s = r < 4 && a == 99999 || r > 3 && a == 49999 || a == 5e4 || a == 0) : s = (r < 4 && a + 1 == o || r > 3 && a + 1 == o / 2) && (e[i + 1] / o / 100 | 0) == Q(10, t - 2) - 1 || (a == o / 2 || a == 0) && (e[i + 1] / o / 100 | 0) == 0 : t < 4 ? (t == 0 ? a = a / 1e3 | 0 : t == 1 ? a = a / 100 | 0 : t == 2 && (a = a / 10 | 0), s = (n || r < 4) && a == 9999 || !n && r > 3 && a == 4999) : s = ((n || r < 4) && a + 1 == o || !n && r > 3 && a + 1 == o / 2) && (e[i + 1] / o / 1e3 | 0) == Q(10, t - 3) - 1, s;
    }
    __name(kt, "kt");
    function wr(e, t, r) {
      for (var n, i = [0], o, s = 0, a = e.length; s < a; ) {
        for (o = i.length; o--; ) i[o] *= t;
        for (i[0] += wn.indexOf(e.charAt(s++)), n = 0; n < i.length; n++) i[n] > r - 1 && (i[n + 1] === void 0 && (i[n + 1] = 0), i[n + 1] += i[n] / r | 0, i[n] %= r);
      }
      return i.reverse();
    }
    __name(wr, "wr");
    function hl(e, t) {
      var r, n, i;
      if (t.isZero()) return t;
      n = t.d.length, n < 32 ? (r = Math.ceil(n / 3), i = (1 / Tr(4, r)).toString()) : (r = 16, i = "2.3283064365386962890625e-10"), e.precision += r, t = tt(e, 1, t.times(i), new e(1));
      for (var o = r; o--; ) {
        var s = t.times(t);
        t = s.times(s).minus(s).times(8).plus(1);
      }
      return e.precision -= r, t;
    }
    __name(hl, "hl");
    var U = /* @__PURE__ */ function() {
      function e(n, i, o) {
        var s, a = 0, l = n.length;
        for (n = n.slice(); l--; ) s = n[l] * i + a, n[l] = s % o | 0, a = s / o | 0;
        return a && n.unshift(a), n;
      }
      __name(e, "e");
      function t(n, i, o, s) {
        var a, l;
        if (o != s) l = o > s ? 1 : -1;
        else for (a = l = 0; a < o; a++) if (n[a] != i[a]) {
          l = n[a] > i[a] ? 1 : -1;
          break;
        }
        return l;
      }
      __name(t, "t");
      function r(n, i, o, s) {
        for (var a = 0; o--; ) n[o] -= a, a = n[o] < i[o] ? 1 : 0, n[o] = a * s + n[o] - i[o];
        for (; !n[0] && n.length > 1; ) n.shift();
      }
      __name(r, "r");
      return function(n, i, o, s, a, l) {
        var u, g, h, v, S, A, R, M, F, q, D, I, ae, J, Zr, ar, vt, Xr, ue, lr, ur = n.constructor, en = n.s == i.s ? 1 : -1, Z = n.d, $2 = i.d;
        if (!Z || !Z[0] || !$2 || !$2[0]) return new ur(!n.s || !i.s || (Z ? $2 && Z[0] == $2[0] : !$2) ? NaN : Z && Z[0] == 0 || !$2 ? en * 0 : en / 0);
        for (l ? (S = 1, g = n.e - i.e) : (l = pe, S = k, g = X(n.e / S) - X(i.e / S)), ue = $2.length, vt = Z.length, F = new ur(en), q = F.d = [], h = 0; $2[h] == (Z[h] || 0); h++) ;
        if ($2[h] > (Z[h] || 0) && g--, o == null ? (J = o = ur.precision, s = ur.rounding) : a ? J = o + (n.e - i.e) + 1 : J = o, J < 0) q.push(1), A = true;
        else {
          if (J = J / S + 2 | 0, h = 0, ue == 1) {
            for (v = 0, $2 = $2[0], J++; (h < vt || v) && J--; h++) Zr = v * l + (Z[h] || 0), q[h] = Zr / $2 | 0, v = Zr % $2 | 0;
            A = v || h < vt;
          } else {
            for (v = l / ($2[0] + 1) | 0, v > 1 && ($2 = e($2, v, l), Z = e(Z, v, l), ue = $2.length, vt = Z.length), ar = ue, D = Z.slice(0, ue), I = D.length; I < ue; ) D[I++] = 0;
            lr = $2.slice(), lr.unshift(0), Xr = $2[0], $2[1] >= l / 2 && ++Xr;
            do
              v = 0, u = t($2, D, ue, I), u < 0 ? (ae = D[0], ue != I && (ae = ae * l + (D[1] || 0)), v = ae / Xr | 0, v > 1 ? (v >= l && (v = l - 1), R = e($2, v, l), M = R.length, I = D.length, u = t(R, D, M, I), u == 1 && (v--, r(R, ue < M ? lr : $2, M, l))) : (v == 0 && (u = v = 1), R = $2.slice()), M = R.length, M < I && R.unshift(0), r(D, R, I, l), u == -1 && (I = D.length, u = t($2, D, ue, I), u < 1 && (v++, r(D, ue < I ? lr : $2, I, l))), I = D.length) : u === 0 && (v++, D = [0]), q[h++] = v, u && D[0] ? D[I++] = Z[ar] || 0 : (D = [Z[ar]], I = 1);
            while ((ar++ < vt || D[0] !== void 0) && J--);
            A = D[0] !== void 0;
          }
          q[0] || q.shift();
        }
        if (S == 1) F.e = g, oo = A;
        else {
          for (h = 1, v = q[0]; v >= 10; v /= 10) h++;
          F.e = h + g * S - 1, O(F, a ? o + F.e + 1 : o, s, A);
        }
        return F;
      };
    }();
    function O(e, t, r, n) {
      var i, o, s, a, l, u, g, h, v, S = e.constructor;
      e: if (t != null) {
        if (h = e.d, !h) return e;
        for (i = 1, a = h[0]; a >= 10; a /= 10) i++;
        if (o = t - i, o < 0) o += k, s = t, g = h[v = 0], l = g / Q(10, i - s - 1) % 10 | 0;
        else if (v = Math.ceil((o + 1) / k), a = h.length, v >= a) if (n) {
          for (; a++ <= v; ) h.push(0);
          g = l = 0, i = 1, o %= k, s = o - k + 1;
        } else break e;
        else {
          for (g = a = h[v], i = 1; a >= 10; a /= 10) i++;
          o %= k, s = o - k + i, l = s < 0 ? 0 : g / Q(10, i - s - 1) % 10 | 0;
        }
        if (n = n || t < 0 || h[v + 1] !== void 0 || (s < 0 ? g : g % Q(10, i - s - 1)), u = r < 4 ? (l || n) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : l > 5 || l == 5 && (r == 4 || n || r == 6 && (o > 0 ? s > 0 ? g / Q(10, i - s) : 0 : h[v - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7)), t < 1 || !h[0]) return h.length = 0, u ? (t -= e.e + 1, h[0] = Q(10, (k - t % k) % k), e.e = -t || 0) : h[0] = e.e = 0, e;
        if (o == 0 ? (h.length = v, a = 1, v--) : (h.length = v + 1, a = Q(10, k - o), h[v] = s > 0 ? (g / Q(10, i - s) % Q(10, s) | 0) * a : 0), u) for (; ; ) if (v == 0) {
          for (o = 1, s = h[0]; s >= 10; s /= 10) o++;
          for (s = h[0] += a, a = 1; s >= 10; s /= 10) a++;
          o != a && (e.e++, h[0] == pe && (h[0] = 1));
          break;
        } else {
          if (h[v] += a, h[v] != pe) break;
          h[v--] = 0, a = 1;
        }
        for (o = h.length; h[--o] === 0; ) h.pop();
      }
      return _ && (e.e > S.maxE ? (e.d = null, e.e = NaN) : e.e < S.minE && (e.e = 0, e.d = [0])), e;
    }
    __name(O, "O");
    function me(e, t, r) {
      if (!e.isFinite()) return fo(e);
      var n, i = e.e, o = Y(e.d), s = o.length;
      return t ? (r && (n = r - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + Oe(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (e.e < 0 ? "e" : "e+") + e.e) : i < 0 ? (o = "0." + Oe(-i - 1) + o, r && (n = r - s) > 0 && (o += Oe(n))) : i >= s ? (o += Oe(i + 1 - s), r && (n = r - i - 1) > 0 && (o = o + "." + Oe(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), r && (n = r - s) > 0 && (i + 1 === s && (o += "."), o += Oe(n))), o;
    }
    __name(me, "me");
    function vr(e, t) {
      var r = e[0];
      for (t *= k; r >= 10; r /= 10) t++;
      return t;
    }
    __name(vr, "vr");
    function xr(e, t, r) {
      if (t > gl) throw _ = true, r && (e.precision = r), Error(so);
      return O(new e(Er), t, 1, true);
    }
    __name(xr, "xr");
    function ce(e, t, r) {
      if (t > bn) throw Error(so);
      return O(new e(br), t, r, true);
    }
    __name(ce, "ce");
    function co(e) {
      var t = e.length - 1, r = t * k + 1;
      if (t = e[t], t) {
        for (; t % 10 == 0; t /= 10) r--;
        for (t = e[0]; t >= 10; t /= 10) r++;
      }
      return r;
    }
    __name(co, "co");
    function Oe(e) {
      for (var t = ""; e--; ) t += "0";
      return t;
    }
    __name(Oe, "Oe");
    function po(e, t, r, n) {
      var i, o = new e(1), s = Math.ceil(n / k + 4);
      for (_ = false; ; ) {
        if (r % 2 && (o = o.times(t), no(o.d, s) && (i = true)), r = X(r / 2), r === 0) {
          r = o.d.length - 1, i && o.d[r] === 0 && ++o.d[r];
          break;
        }
        t = t.times(t), no(t.d, s);
      }
      return _ = true, o;
    }
    __name(po, "po");
    function ro(e) {
      return e.d[e.d.length - 1] & 1;
    }
    __name(ro, "ro");
    function mo(e, t, r) {
      for (var n, i = new e(t[0]), o = 0; ++o < t.length; ) if (n = new e(t[o]), n.s) i[r](n) && (i = n);
      else {
        i = n;
        break;
      }
      return i;
    }
    __name(mo, "mo");
    function xn(e, t) {
      var r, n, i, o, s, a, l, u = 0, g = 0, h = 0, v = e.constructor, S = v.rounding, A = v.precision;
      if (!e.d || !e.d[0] || e.e > 17) return new v(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
      for (t == null ? (_ = false, l = A) : l = t, a = new v(0.03125); e.e > -2; ) e = e.times(a), h += 5;
      for (n = Math.log(Q(2, h)) / Math.LN10 * 2 + 5 | 0, l += n, r = o = s = new v(1), v.precision = l; ; ) {
        if (o = O(o.times(e), l, 1), r = r.times(++g), a = s.plus(U(o, r, l, 1)), Y(a.d).slice(0, l) === Y(s.d).slice(0, l)) {
          for (i = h; i--; ) s = O(s.times(s), l, 1);
          if (t == null) if (u < 3 && kt(s.d, l - n, S, u)) v.precision = l += 10, r = o = a = new v(1), g = 0, u++;
          else return O(s, v.precision = A, S, _ = true);
          else return v.precision = A, s;
        }
        s = a;
      }
    }
    __name(xn, "xn");
    function ke(e, t) {
      var r, n, i, o, s, a, l, u, g, h, v, S = 1, A = 10, R = e, M = R.d, F = R.constructor, q = F.rounding, D = F.precision;
      if (R.s < 0 || !M || !M[0] || !R.e && M[0] == 1 && M.length == 1) return new F(M && !M[0] ? -1 / 0 : R.s != 1 ? NaN : M ? 0 : R);
      if (t == null ? (_ = false, g = D) : g = t, F.precision = g += A, r = Y(M), n = r.charAt(0), Math.abs(o = R.e) < 15e14) {
        for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; ) R = R.times(e), r = Y(R.d), n = r.charAt(0), S++;
        o = R.e, n > 1 ? (R = new F("0." + r), o++) : R = new F(n + "." + r.slice(1));
      } else return u = xr(F, g + 2, D).times(o + ""), R = ke(new F(n + "." + r.slice(1)), g - A).plus(u), F.precision = D, t == null ? O(R, D, q, _ = true) : R;
      for (h = R, l = s = R = U(R.minus(1), R.plus(1), g, 1), v = O(R.times(R), g, 1), i = 3; ; ) {
        if (s = O(s.times(v), g, 1), u = l.plus(U(s, new F(i), g, 1)), Y(u.d).slice(0, g) === Y(l.d).slice(0, g)) if (l = l.times(2), o !== 0 && (l = l.plus(xr(F, g + 2, D).times(o + ""))), l = U(l, new F(S), g, 1), t == null) if (kt(l.d, g - A, q, a)) F.precision = g += A, u = s = R = U(h.minus(1), h.plus(1), g, 1), v = O(R.times(R), g, 1), i = a = 1;
        else return O(l, F.precision = D, q, _ = true);
        else return F.precision = D, l;
        l = u, i += 2;
      }
    }
    __name(ke, "ke");
    function fo(e) {
      return String(e.s * e.s / 0);
    }
    __name(fo, "fo");
    function Pn(e, t) {
      var r, n, i;
      for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; n++) ;
      for (i = t.length; t.charCodeAt(i - 1) === 48; --i) ;
      if (t = t.slice(n, i), t) {
        if (i -= n, e.e = r = r - n - 1, e.d = [], n = (r + 1) % k, r < 0 && (n += k), n < i) {
          for (n && e.d.push(+t.slice(0, n)), i -= k; n < i; ) e.d.push(+t.slice(n, n += k));
          t = t.slice(n), n = k - t.length;
        } else n -= i;
        for (; n--; ) t += "0";
        e.d.push(+t), _ && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
      } else e.e = 0, e.d = [0];
      return e;
    }
    __name(Pn, "Pn");
    function yl(e, t) {
      var r, n, i, o, s, a, l, u, g;
      if (t.indexOf("_") > -1) {
        if (t = t.replace(/(\d)_(?=\d)/g, "$1"), uo.test(t)) return Pn(e, t);
      } else if (t === "Infinity" || t === "NaN") return +t || (e.s = NaN), e.e = NaN, e.d = null, e;
      if (dl.test(t)) r = 16, t = t.toLowerCase();
      else if (pl.test(t)) r = 2;
      else if (ml.test(t)) r = 8;
      else throw Error(De + t);
      for (o = t.search(/p/i), o > 0 ? (l = +t.slice(o + 1), t = t.substring(2, o)) : t = t.slice(2), o = t.indexOf("."), s = o >= 0, n = e.constructor, s && (t = t.replace(".", ""), a = t.length, o = a - o, i = po(n, new n(r), o, o * 2)), u = wr(t, r, pe), g = u.length - 1, o = g; u[o] === 0; --o) u.pop();
      return o < 0 ? new n(e.s * 0) : (e.e = vr(u, g), e.d = u, _ = false, s && (e = U(e, i, a * 4)), l && (e = e.times(Math.abs(l) < 54 ? Q(2, l) : $e.pow(2, l))), _ = true, e);
    }
    __name(yl, "yl");
    function wl(e, t) {
      var r, n = t.d.length;
      if (n < 3) return t.isZero() ? t : tt(e, 2, t, t);
      r = 1.4 * Math.sqrt(n), r = r > 16 ? 16 : r | 0, t = t.times(1 / Tr(5, r)), t = tt(e, 2, t, t);
      for (var i, o = new e(5), s = new e(16), a = new e(20); r--; ) i = t.times(t), t = t.times(o.plus(i.times(s.times(i).minus(a))));
      return t;
    }
    __name(wl, "wl");
    function tt(e, t, r, n, i) {
      var o, s, a, l, u = 1, g = e.precision, h = Math.ceil(g / k);
      for (_ = false, l = r.times(r), a = new e(n); ; ) {
        if (s = U(a.times(l), new e(t++ * t++), g, 1), a = i ? n.plus(s) : n.minus(s), n = U(s.times(l), new e(t++ * t++), g, 1), s = a.plus(n), s.d[h] !== void 0) {
          for (o = h; s.d[o] === a.d[o] && o--; ) ;
          if (o == -1) break;
        }
        o = a, a = n, n = s, s = o, u++;
      }
      return _ = true, s.d.length = h + 1, s;
    }
    __name(tt, "tt");
    function Tr(e, t) {
      for (var r = e; --t; ) r *= e;
      return r;
    }
    __name(Tr, "Tr");
    function go(e, t) {
      var r, n = t.s < 0, i = ce(e, e.precision, 1), o = i.times(0.5);
      if (t = t.abs(), t.lte(o)) return Ce = n ? 4 : 1, t;
      if (r = t.divToInt(i), r.isZero()) Ce = n ? 3 : 2;
      else {
        if (t = t.minus(r.times(i)), t.lte(o)) return Ce = ro(r) ? n ? 2 : 3 : n ? 4 : 1, t;
        Ce = ro(r) ? n ? 1 : 4 : n ? 3 : 2;
      }
      return t.minus(i).abs();
    }
    __name(go, "go");
    function vn(e, t, r, n) {
      var i, o, s, a, l, u, g, h, v, S = e.constructor, A = r !== void 0;
      if (A ? (ie(r, 1, Me), n === void 0 ? n = S.rounding : ie(n, 0, 8)) : (r = S.precision, n = S.rounding), !e.isFinite()) g = fo(e);
      else {
        for (g = me(e), s = g.indexOf("."), A ? (i = 2, t == 16 ? r = r * 4 - 3 : t == 8 && (r = r * 3 - 2)) : i = t, s >= 0 && (g = g.replace(".", ""), v = new S(1), v.e = g.length - s, v.d = wr(me(v), 10, i), v.e = v.d.length), h = wr(g, 10, i), o = l = h.length; h[--l] == 0; ) h.pop();
        if (!h[0]) g = A ? "0p+0" : "0";
        else {
          if (s < 0 ? o-- : (e = new S(e), e.d = h, e.e = o, e = U(e, v, r, n, 0, i), h = e.d, o = e.e, u = oo), s = h[r], a = i / 2, u = u || h[r + 1] !== void 0, u = n < 4 ? (s !== void 0 || u) && (n === 0 || n === (e.s < 0 ? 3 : 2)) : s > a || s === a && (n === 4 || u || n === 6 && h[r - 1] & 1 || n === (e.s < 0 ? 8 : 7)), h.length = r, u) for (; ++h[--r] > i - 1; ) h[r] = 0, r || (++o, h.unshift(1));
          for (l = h.length; !h[l - 1]; --l) ;
          for (s = 0, g = ""; s < l; s++) g += wn.charAt(h[s]);
          if (A) {
            if (l > 1) if (t == 16 || t == 8) {
              for (s = t == 16 ? 4 : 3, --l; l % s; l++) g += "0";
              for (h = wr(g, i, t), l = h.length; !h[l - 1]; --l) ;
              for (s = 1, g = "1."; s < l; s++) g += wn.charAt(h[s]);
            } else g = g.charAt(0) + "." + g.slice(1);
            g = g + (o < 0 ? "p" : "p+") + o;
          } else if (o < 0) {
            for (; ++o; ) g = "0" + g;
            g = "0." + g;
          } else if (++o > l) for (o -= l; o--; ) g += "0";
          else o < l && (g = g.slice(0, o) + "." + g.slice(o));
        }
        g = (t == 16 ? "0x" : t == 2 ? "0b" : t == 8 ? "0o" : "") + g;
      }
      return e.s < 0 ? "-" + g : g;
    }
    __name(vn, "vn");
    function no(e, t) {
      if (e.length > t) return e.length = t, true;
    }
    __name(no, "no");
    function El(e) {
      return new this(e).abs();
    }
    __name(El, "El");
    function bl(e) {
      return new this(e).acos();
    }
    __name(bl, "bl");
    function xl(e) {
      return new this(e).acosh();
    }
    __name(xl, "xl");
    function Pl(e, t) {
      return new this(e).plus(t);
    }
    __name(Pl, "Pl");
    function vl(e) {
      return new this(e).asin();
    }
    __name(vl, "vl");
    function Tl(e) {
      return new this(e).asinh();
    }
    __name(Tl, "Tl");
    function Cl(e) {
      return new this(e).atan();
    }
    __name(Cl, "Cl");
    function Al(e) {
      return new this(e).atanh();
    }
    __name(Al, "Al");
    function Rl(e, t) {
      e = new this(e), t = new this(t);
      var r, n = this.precision, i = this.rounding, o = n + 4;
      return !e.s || !t.s ? r = new this(NaN) : !e.d && !t.d ? (r = ce(this, o, 1).times(t.s > 0 ? 0.25 : 0.75), r.s = e.s) : !t.d || e.isZero() ? (r = t.s < 0 ? ce(this, n, i) : new this(0), r.s = e.s) : !e.d || t.isZero() ? (r = ce(this, o, 1).times(0.5), r.s = e.s) : t.s < 0 ? (this.precision = o, this.rounding = 1, r = this.atan(U(e, t, o, 1)), t = ce(this, o, 1), this.precision = n, this.rounding = i, r = e.s < 0 ? r.minus(t) : r.plus(t)) : r = this.atan(U(e, t, o, 1)), r;
    }
    __name(Rl, "Rl");
    function Sl(e) {
      return new this(e).cbrt();
    }
    __name(Sl, "Sl");
    function Il(e) {
      return O(e = new this(e), e.e + 1, 2);
    }
    __name(Il, "Il");
    function Ol(e, t, r) {
      return new this(e).clamp(t, r);
    }
    __name(Ol, "Ol");
    function kl(e) {
      if (!e || typeof e != "object") throw Error(Pr + "Object expected");
      var t, r, n, i = e.defaults === true, o = ["precision", 1, Me, "rounding", 0, 8, "toExpNeg", -et, 0, "toExpPos", 0, et, "maxE", 0, et, "minE", -et, 0, "modulo", 0, 9];
      for (t = 0; t < o.length; t += 3) if (r = o[t], i && (this[r] = En[r]), (n = e[r]) !== void 0) if (X(n) === n && n >= o[t + 1] && n <= o[t + 2]) this[r] = n;
      else throw Error(De + r + ": " + n);
      if (r = "crypto", i && (this[r] = En[r]), (n = e[r]) !== void 0) if (n === true || n === false || n === 0 || n === 1) if (n) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[r] = true;
      else throw Error(ao);
      else this[r] = false;
      else throw Error(De + r + ": " + n);
      return this;
    }
    __name(kl, "kl");
    function Dl(e) {
      return new this(e).cos();
    }
    __name(Dl, "Dl");
    function Ml(e) {
      return new this(e).cosh();
    }
    __name(Ml, "Ml");
    function ho(e) {
      var t, r, n;
      function i(o) {
        var s, a, l, u = this;
        if (!(u instanceof i)) return new i(o);
        if (u.constructor = i, io(o)) {
          u.s = o.s, _ ? !o.d || o.e > i.maxE ? (u.e = NaN, u.d = null) : o.e < i.minE ? (u.e = 0, u.d = [0]) : (u.e = o.e, u.d = o.d.slice()) : (u.e = o.e, u.d = o.d ? o.d.slice() : o.d);
          return;
        }
        if (l = typeof o, l === "number") {
          if (o === 0) {
            u.s = 1 / o < 0 ? -1 : 1, u.e = 0, u.d = [0];
            return;
          }
          if (o < 0 ? (o = -o, u.s = -1) : u.s = 1, o === ~~o && o < 1e7) {
            for (s = 0, a = o; a >= 10; a /= 10) s++;
            _ ? s > i.maxE ? (u.e = NaN, u.d = null) : s < i.minE ? (u.e = 0, u.d = [0]) : (u.e = s, u.d = [o]) : (u.e = s, u.d = [o]);
            return;
          } else if (o * 0 !== 0) {
            o || (u.s = NaN), u.e = NaN, u.d = null;
            return;
          }
          return Pn(u, o.toString());
        } else if (l !== "string") throw Error(De + o);
        return (a = o.charCodeAt(0)) === 45 ? (o = o.slice(1), u.s = -1) : (a === 43 && (o = o.slice(1)), u.s = 1), uo.test(o) ? Pn(u, o) : yl(u, o);
      }
      __name(i, "i");
      if (i.prototype = C, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.EUCLID = 9, i.config = i.set = kl, i.clone = ho, i.isDecimal = io, i.abs = El, i.acos = bl, i.acosh = xl, i.add = Pl, i.asin = vl, i.asinh = Tl, i.atan = Cl, i.atanh = Al, i.atan2 = Rl, i.cbrt = Sl, i.ceil = Il, i.clamp = Ol, i.cos = Dl, i.cosh = Ml, i.div = Nl, i.exp = Fl, i.floor = _l, i.hypot = Ll, i.ln = ql, i.log = Bl, i.log10 = $l, i.log2 = Ul, i.max = Vl, i.min = jl, i.mod = Jl, i.mul = Gl, i.pow = Ql, i.random = Hl, i.round = Wl, i.sign = Kl, i.sin = zl, i.sinh = Yl, i.sqrt = Zl, i.sub = Xl, i.sum = eu, i.tan = tu, i.tanh = ru, i.trunc = nu, e === void 0 && (e = {}), e && e.defaults !== true) for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
      return i.config(e), i;
    }
    __name(ho, "ho");
    function Nl(e, t) {
      return new this(e).div(t);
    }
    __name(Nl, "Nl");
    function Fl(e) {
      return new this(e).exp();
    }
    __name(Fl, "Fl");
    function _l(e) {
      return O(e = new this(e), e.e + 1, 3);
    }
    __name(_l, "_l");
    function Ll() {
      var e, t, r = new this(0);
      for (_ = false, e = 0; e < arguments.length; ) if (t = new this(arguments[e++]), t.d) r.d && (r = r.plus(t.times(t)));
      else {
        if (t.s) return _ = true, new this(1 / 0);
        r = t;
      }
      return _ = true, r.sqrt();
    }
    __name(Ll, "Ll");
    function io(e) {
      return e instanceof $e || e && e.toStringTag === lo || false;
    }
    __name(io, "io");
    function ql(e) {
      return new this(e).ln();
    }
    __name(ql, "ql");
    function Bl(e, t) {
      return new this(e).log(t);
    }
    __name(Bl, "Bl");
    function Ul(e) {
      return new this(e).log(2);
    }
    __name(Ul, "Ul");
    function $l(e) {
      return new this(e).log(10);
    }
    __name($l, "$l");
    function Vl() {
      return mo(this, arguments, "lt");
    }
    __name(Vl, "Vl");
    function jl() {
      return mo(this, arguments, "gt");
    }
    __name(jl, "jl");
    function Jl(e, t) {
      return new this(e).mod(t);
    }
    __name(Jl, "Jl");
    function Gl(e, t) {
      return new this(e).mul(t);
    }
    __name(Gl, "Gl");
    function Ql(e, t) {
      return new this(e).pow(t);
    }
    __name(Ql, "Ql");
    function Hl(e) {
      var t, r, n, i, o = 0, s = new this(1), a = [];
      if (e === void 0 ? e = this.precision : ie(e, 1, Me), n = Math.ceil(e / k), this.crypto) if (crypto.getRandomValues) for (t = crypto.getRandomValues(new Uint32Array(n)); o < n; ) i = t[o], i >= 429e7 ? t[o] = crypto.getRandomValues(new Uint32Array(1))[0] : a[o++] = i % 1e7;
      else if (crypto.randomBytes) {
        for (t = crypto.randomBytes(n *= 4); o < n; ) i = t[o] + (t[o + 1] << 8) + (t[o + 2] << 16) + ((t[o + 3] & 127) << 24), i >= 214e7 ? crypto.randomBytes(4).copy(t, o) : (a.push(i % 1e7), o += 4);
        o = n / 4;
      } else throw Error(ao);
      else for (; o < n; ) a[o++] = Math.random() * 1e7 | 0;
      for (n = a[--o], e %= k, n && e && (i = Q(10, k - e), a[o] = (n / i | 0) * i); a[o] === 0; o--) a.pop();
      if (o < 0) r = 0, a = [0];
      else {
        for (r = -1; a[0] === 0; r -= k) a.shift();
        for (n = 1, i = a[0]; i >= 10; i /= 10) n++;
        n < k && (r -= k - n);
      }
      return s.e = r, s.d = a, s;
    }
    __name(Hl, "Hl");
    function Wl(e) {
      return O(e = new this(e), e.e + 1, this.rounding);
    }
    __name(Wl, "Wl");
    function Kl(e) {
      return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
    }
    __name(Kl, "Kl");
    function zl(e) {
      return new this(e).sin();
    }
    __name(zl, "zl");
    function Yl(e) {
      return new this(e).sinh();
    }
    __name(Yl, "Yl");
    function Zl(e) {
      return new this(e).sqrt();
    }
    __name(Zl, "Zl");
    function Xl(e, t) {
      return new this(e).sub(t);
    }
    __name(Xl, "Xl");
    function eu() {
      var e = 0, t = arguments, r = new this(t[e]);
      for (_ = false; r.s && ++e < t.length; ) r = r.plus(t[e]);
      return _ = true, O(r, this.precision, this.rounding);
    }
    __name(eu, "eu");
    function tu(e) {
      return new this(e).tan();
    }
    __name(tu, "tu");
    function ru(e) {
      return new this(e).tanh();
    }
    __name(ru, "ru");
    function nu(e) {
      return O(e = new this(e), e.e + 1, 1);
    }
    __name(nu, "nu");
    C[Symbol.for("nodejs.util.inspect.custom")] = C.toString;
    C[Symbol.toStringTag] = "Decimal";
    var $e = C.constructor = ho(En);
    Er = new $e(Er);
    br = new $e(br);
    var fe = $e;
    function rt(e) {
      return e === null ? e : Array.isArray(e) ? e.map(rt) : typeof e == "object" ? iu(e) ? ou(e) : Xe(e, rt) : e;
    }
    __name(rt, "rt");
    function iu(e) {
      return e !== null && typeof e == "object" && typeof e.$type == "string";
    }
    __name(iu, "iu");
    function ou({ $type: e, value: t }) {
      switch (e) {
        case "BigInt":
          return BigInt(t);
        case "Bytes":
          return w.Buffer.from(t, "base64");
        case "DateTime":
          return new Date(t);
        case "Decimal":
          return new fe(t);
        case "Json":
          return JSON.parse(t);
        default:
          Pe(t, "Unknown tagged value");
      }
    }
    __name(ou, "ou");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    function nt(e) {
      return e.substring(0, 1).toLowerCase() + e.substring(1);
    }
    __name(nt, "nt");
    f();
    c2();
    p();
    d();
    m();
    function it(e) {
      return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
    }
    __name(it, "it");
    function Cr(e) {
      return e.toString() !== "Invalid Date";
    }
    __name(Cr, "Cr");
    f();
    c2();
    p();
    d();
    m();
    function ot(e) {
      return $e.isDecimal(e) ? true : e !== null && typeof e == "object" && typeof e.s == "number" && typeof e.e == "number" && typeof e.toFixed == "function" && Array.isArray(e.d);
    }
    __name(ot, "ot");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var su = qe(Wi());
    var au = { red: Ze, gray: Bi, dim: gr, bold: fr, underline: Ni, highlightSource: /* @__PURE__ */ __name((e) => e.highlight(), "highlightSource") };
    var lu = { red: /* @__PURE__ */ __name((e) => e, "red"), gray: /* @__PURE__ */ __name((e) => e, "gray"), dim: /* @__PURE__ */ __name((e) => e, "dim"), bold: /* @__PURE__ */ __name((e) => e, "bold"), underline: /* @__PURE__ */ __name((e) => e, "underline"), highlightSource: /* @__PURE__ */ __name((e) => e, "highlightSource") };
    function uu({ message: e, originalMethod: t, isPanic: r, callArguments: n }) {
      return { functionName: `prisma.${t}()`, message: e, isPanic: r ?? false, callArguments: n };
    }
    __name(uu, "uu");
    function cu({ functionName: e, location: t, message: r, isPanic: n, contextLines: i, callArguments: o }, s) {
      let a = [""], l = t ? " in" : ":";
      if (n ? (a.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)), a.push(s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${l}`))) : a.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${l}`)), t && a.push(s.underline(pu(t))), i) {
        a.push("");
        let u = [i.toString()];
        o && (u.push(o), u.push(s.dim(")"))), a.push(u.join("")), o && a.push("");
      } else a.push(""), o && a.push(o), a.push("");
      return a.push(r), a.join(`
`);
    }
    __name(cu, "cu");
    function pu(e) {
      let t = [e.fileName];
      return e.lineNumber && t.push(String(e.lineNumber)), e.columnNumber && t.push(String(e.columnNumber)), t.join(":");
    }
    __name(pu, "pu");
    function st(e) {
      let t = e.showColors ? au : lu, r;
      return typeof $getTemplateParameters < "u" ? r = $getTemplateParameters(e, t) : r = uu(e), cu(r, t);
    }
    __name(st, "st");
    f();
    c2();
    p();
    d();
    m();
    var vo = qe(Tn());
    f();
    c2();
    p();
    d();
    m();
    function bo(e, t, r) {
      let n = xo(e), i = du(n), o = fu(i);
      o ? Ar(o, t, r) : t.addErrorMessage(() => "Unknown error");
    }
    __name(bo, "bo");
    function xo(e) {
      return e.errors.flatMap((t) => t.kind === "Union" ? xo(t) : [t]);
    }
    __name(xo, "xo");
    function du(e) {
      let t = /* @__PURE__ */ new Map(), r = [];
      for (let n of e) {
        if (n.kind !== "InvalidArgumentType") {
          r.push(n);
          continue;
        }
        let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = t.get(i);
        o ? t.set(i, { ...n, argument: { ...n.argument, typeNames: mu(o.argument.typeNames, n.argument.typeNames) } }) : t.set(i, n);
      }
      return r.push(...t.values()), r;
    }
    __name(du, "du");
    function mu(e, t) {
      return [...new Set(e.concat(t))];
    }
    __name(mu, "mu");
    function fu(e) {
      return yn(e, (t, r) => {
        let n = wo(t), i = wo(r);
        return n !== i ? n - i : Eo(t) - Eo(r);
      });
    }
    __name(fu, "fu");
    function wo(e) {
      let t = 0;
      return Array.isArray(e.selectionPath) && (t += e.selectionPath.length), Array.isArray(e.argumentPath) && (t += e.argumentPath.length), t;
    }
    __name(wo, "wo");
    function Eo(e) {
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
    __name(Eo, "Eo");
    f();
    c2();
    p();
    d();
    m();
    var le = class {
      static {
        __name(this, "le");
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
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var at = class {
      static {
        __name(this, "at");
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
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var Rr = class {
      static {
        __name(this, "Rr");
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
    f();
    c2();
    p();
    d();
    m();
    var Sr = /* @__PURE__ */ __name((e) => e, "Sr");
    var Ir = { bold: Sr, red: Sr, green: Sr, dim: Sr, enabled: false };
    var Po = { bold: fr, red: Ze, green: Fi, dim: gr, enabled: true };
    var lt = { write(e) {
      e.writeLine(",");
    } };
    f();
    c2();
    p();
    d();
    m();
    var ge = class {
      static {
        __name(this, "ge");
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
    f();
    c2();
    p();
    d();
    m();
    var Ne = class {
      static {
        __name(this, "Ne");
      }
      constructor() {
        this.hasError = false;
      }
      markAsError() {
        return this.hasError = true, this;
      }
    };
    var ut = class extends Ne {
      static {
        __name(this, "ut");
      }
      constructor() {
        super(...arguments);
        this.items = [];
      }
      addItem(r) {
        return this.items.push(new Rr(r)), this;
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
        let n = new ge("[]");
        this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
      }
      writeWithItems(r) {
        let { colors: n } = r.context;
        r.writeLine("[").withIndent(() => r.writeJoined(lt, this.items).newLine()).write("]"), this.hasError && r.afterNextNewline(() => {
          r.writeLine(n.red("~".repeat(this.getPrintWidth())));
        });
      }
      asObject() {
      }
    };
    var ct = class e extends Ne {
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
          let l;
          if (s.value instanceof e ? l = s.value.getField(a) : s.value instanceof ut && (l = s.value.getField(Number(a))), !l) return;
          s = l;
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
        let n = new ge("{}");
        this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
      }
      writeWithContents(r, n) {
        r.writeLine("{").withIndent(() => {
          r.writeJoined(lt, [...n, ...this.suggestions]).newLine();
        }), r.write("}"), this.hasError && r.afterNextNewline(() => {
          r.writeLine(r.context.colors.red("~".repeat(this.getPrintWidth())));
        });
      }
    };
    f();
    c2();
    p();
    d();
    m();
    var z = class extends Ne {
      static {
        __name(this, "z");
      }
      constructor(r) {
        super();
        this.text = r;
      }
      getPrintWidth() {
        return this.text.length;
      }
      write(r) {
        let n = new ge(this.text);
        this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
      }
      asObject() {
      }
    };
    f();
    c2();
    p();
    d();
    m();
    var Dt = class {
      static {
        __name(this, "Dt");
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
          t.writeJoined(lt, this.fields).newLine();
        }).write(r("}")).addMarginSymbol(r("+"));
      }
    };
    function Ar(e, t, r) {
      switch (e.kind) {
        case "MutuallyExclusiveFields":
          hu(e, t);
          break;
        case "IncludeOnScalar":
          yu(e, t);
          break;
        case "EmptySelection":
          wu(e, t, r);
          break;
        case "UnknownSelectionField":
          Pu(e, t);
          break;
        case "InvalidSelectionValue":
          vu(e, t);
          break;
        case "UnknownArgument":
          Tu(e, t);
          break;
        case "UnknownInputField":
          Cu(e, t);
          break;
        case "RequiredArgumentMissing":
          Au(e, t);
          break;
        case "InvalidArgumentType":
          Ru(e, t);
          break;
        case "InvalidArgumentValue":
          Su(e, t);
          break;
        case "ValueTooLarge":
          Iu(e, t);
          break;
        case "SomeFieldsMissing":
          Ou(e, t);
          break;
        case "TooManyFieldsGiven":
          ku(e, t);
          break;
        case "Union":
          bo(e, t, r);
          break;
        default:
          throw new Error("not implemented: " + e.kind);
      }
    }
    __name(Ar, "Ar");
    function hu(e, t) {
      let r = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      r && (r.getField(e.firstField)?.markAsError(), r.getField(e.secondField)?.markAsError()), t.addErrorMessage((n) => `Please ${n.bold("either")} use ${n.green(`\`${e.firstField}\``)} or ${n.green(`\`${e.secondField}\``)}, but ${n.red("not both")} at the same time.`);
    }
    __name(hu, "hu");
    function yu(e, t) {
      let [r, n] = Mt(e.selectionPath), i = e.outputType, o = t.arguments.getDeepSelectionParent(r)?.value;
      if (o && (o.getField(n)?.markAsError(), i)) for (let s of i.fields) s.isRelation && o.addSuggestion(new le(s.name, "true"));
      t.addErrorMessage((s) => {
        let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
        return i ? a += ` on model ${s.bold(i.name)}. ${Nt(s)}` : a += ".", a += `
Note that ${s.bold("include")} statements only accept relation fields.`, a;
      });
    }
    __name(yu, "yu");
    function wu(e, t, r) {
      let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (n) {
        let i = n.getField("omit")?.value.asObject();
        if (i) {
          Eu(e, t, i);
          return;
        }
        if (n.hasField("select")) {
          bu(e, t);
          return;
        }
      }
      if (r?.[nt(e.outputType.name)]) {
        xu(e, t);
        return;
      }
      t.addErrorMessage(() => `Unknown field at "${e.selectionPath.join(".")} selection"`);
    }
    __name(wu, "wu");
    function Eu(e, t, r) {
      r.removeAllFields();
      for (let n of e.outputType.fields) r.addSuggestion(new le(n.name, "false"));
      t.addErrorMessage((n) => `The ${n.red("omit")} statement includes every field of the model ${n.bold(e.outputType.name)}. At least one field must be included in the result`);
    }
    __name(Eu, "Eu");
    function bu(e, t) {
      let r = e.outputType, n = t.arguments.getDeepSelectionParent(e.selectionPath)?.value, i = n?.isEmpty() ?? false;
      n && (n.removeAllFields(), Ao(n, r)), t.addErrorMessage((o) => i ? `The ${o.red("`select`")} statement for type ${o.bold(r.name)} must not be empty. ${Nt(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(r.name)} needs ${o.bold("at least one truthy value")}.`);
    }
    __name(bu, "bu");
    function xu(e, t) {
      let r = new Dt();
      for (let i of e.outputType.fields) i.isRelation || r.addField(i.name, "false");
      let n = new le("omit", r).makeRequired();
      if (e.selectionPath.length === 0) t.arguments.addSuggestion(n);
      else {
        let [i, o] = Mt(e.selectionPath), a = t.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o);
        if (a) {
          let l = a?.value.asObject() ?? new ct();
          l.addSuggestion(n), a.value = l;
        }
      }
      t.addErrorMessage((i) => `The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(e.outputType.name)}. At least one field must be included in the result`);
    }
    __name(xu, "xu");
    function Pu(e, t) {
      let r = Ro(e.selectionPath, t);
      if (r.parentKind !== "unknown") {
        r.field.markAsError();
        let n = r.parent;
        switch (r.parentKind) {
          case "select":
            Ao(n, e.outputType);
            break;
          case "include":
            Du(n, e.outputType);
            break;
          case "omit":
            Mu(n, e.outputType);
            break;
        }
      }
      t.addErrorMessage((n) => {
        let i = [`Unknown field ${n.red(`\`${r.fieldName}\``)}`];
        return r.parentKind !== "unknown" && i.push(`for ${n.bold(r.parentKind)} statement`), i.push(`on model ${n.bold(`\`${e.outputType.name}\``)}.`), i.push(Nt(n)), i.join(" ");
      });
    }
    __name(Pu, "Pu");
    function vu(e, t) {
      let r = Ro(e.selectionPath, t);
      r.parentKind !== "unknown" && r.field.value.markAsError(), t.addErrorMessage((n) => `Invalid value for selection field \`${n.red(r.fieldName)}\`: ${e.underlyingError}`);
    }
    __name(vu, "vu");
    function Tu(e, t) {
      let r = e.argumentPath[0], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && (n.getField(r)?.markAsError(), Nu(n, e.arguments)), t.addErrorMessage((i) => To(i, r, e.arguments.map((o) => o.name)));
    }
    __name(Tu, "Tu");
    function Cu(e, t) {
      let [r, n] = Mt(e.argumentPath), i = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (i) {
        i.getDeepField(e.argumentPath)?.markAsError();
        let o = i.getDeepFieldValue(r)?.asObject();
        o && So(o, e.inputType);
      }
      t.addErrorMessage((o) => To(o, n, e.inputType.fields.map((s) => s.name)));
    }
    __name(Cu, "Cu");
    function To(e, t, r) {
      let n = [`Unknown argument \`${e.red(t)}\`.`], i = _u(t, r);
      return i && n.push(`Did you mean \`${e.green(i)}\`?`), r.length > 0 && n.push(Nt(e)), n.join(" ");
    }
    __name(To, "To");
    function Au(e, t) {
      let r;
      t.addErrorMessage((l) => r?.value instanceof z && r.value.text === "null" ? `Argument \`${l.green(o)}\` must not be ${l.red("null")}.` : `Argument \`${l.green(o)}\` is missing.`);
      let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (!n) return;
      let [i, o] = Mt(e.argumentPath), s = new Dt(), a = n.getDeepFieldValue(i)?.asObject();
      if (a) if (r = a.getField(o), r && a.removeField(o), e.inputTypes.length === 1 && e.inputTypes[0].kind === "object") {
        for (let l of e.inputTypes[0].fields) s.addField(l.name, l.typeNames.join(" | "));
        a.addSuggestion(new le(o, s).makeRequired());
      } else {
        let l = e.inputTypes.map(Co).join(" | ");
        a.addSuggestion(new le(o, l).makeRequired());
      }
    }
    __name(Au, "Au");
    function Co(e) {
      return e.kind === "list" ? `${Co(e.elementType)}[]` : e.name;
    }
    __name(Co, "Co");
    function Ru(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && n.getDeepFieldValue(e.argumentPath)?.markAsError(), t.addErrorMessage((i) => {
        let o = Or("or", e.argument.typeNames.map((s) => i.green(s)));
        return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(e.inferredType)}.`;
      });
    }
    __name(Ru, "Ru");
    function Su(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && n.getDeepFieldValue(e.argumentPath)?.markAsError(), t.addErrorMessage((i) => {
        let o = [`Invalid value for argument \`${i.bold(r)}\``];
        if (e.underlyingError && o.push(`: ${e.underlyingError}`), o.push("."), e.argument.typeNames.length > 0) {
          let s = Or("or", e.argument.typeNames.map((a) => i.green(a)));
          o.push(` Expected ${s}.`);
        }
        return o.join("");
      });
    }
    __name(Su, "Su");
    function Iu(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(), i;
      if (n) {
        let s = n.getDeepField(e.argumentPath)?.value;
        s?.markAsError(), s instanceof z && (i = s.text);
      }
      t.addErrorMessage((o) => {
        let s = ["Unable to fit value"];
        return i && s.push(o.red(i)), s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``), s.join(" ");
      });
    }
    __name(Iu, "Iu");
    function Ou(e, t) {
      let r = e.argumentPath[e.argumentPath.length - 1], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (n) {
        let i = n.getDeepFieldValue(e.argumentPath)?.asObject();
        i && So(i, e.inputType);
      }
      t.addErrorMessage((i) => {
        let o = [`Argument \`${i.bold(r)}\` of type ${i.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 ? e.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${Or("or", e.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`), o.push(Nt(i)), o.join(" ");
      });
    }
    __name(Ou, "Ou");
    function ku(e, t) {
      let r = e.argumentPath[e.argumentPath.length - 1], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(), i = [];
      if (n) {
        let o = n.getDeepFieldValue(e.argumentPath)?.asObject();
        o && (o.markAsError(), i = Object.keys(o.getFields()));
      }
      t.addErrorMessage((o) => {
        let s = [`Argument \`${o.bold(r)}\` of type ${o.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 && e.constraints.maxFieldCount == 1 ? s.push(`${o.green("exactly one")} argument,`) : e.constraints.maxFieldCount == 1 ? s.push(`${o.green("at most one")} argument,`) : s.push(`${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`), s.push(`but you provided ${Or("and", i.map((a) => o.red(a)))}. Please choose`), e.constraints.maxFieldCount === 1 ? s.push("one.") : s.push(`${e.constraints.maxFieldCount}.`), s.join(" ");
      });
    }
    __name(ku, "ku");
    function Ao(e, t) {
      for (let r of t.fields) e.hasField(r.name) || e.addSuggestion(new le(r.name, "true"));
    }
    __name(Ao, "Ao");
    function Du(e, t) {
      for (let r of t.fields) r.isRelation && !e.hasField(r.name) && e.addSuggestion(new le(r.name, "true"));
    }
    __name(Du, "Du");
    function Mu(e, t) {
      for (let r of t.fields) !e.hasField(r.name) && !r.isRelation && e.addSuggestion(new le(r.name, "true"));
    }
    __name(Mu, "Mu");
    function Nu(e, t) {
      for (let r of t) e.hasField(r.name) || e.addSuggestion(new le(r.name, r.typeNames.join(" | ")));
    }
    __name(Nu, "Nu");
    function Ro(e, t) {
      let [r, n] = Mt(e), i = t.arguments.getDeepSubSelectionValue(r)?.asObject();
      if (!i) return { parentKind: "unknown", fieldName: n };
      let o = i.getFieldValue("select")?.asObject(), s = i.getFieldValue("include")?.asObject(), a = i.getFieldValue("omit")?.asObject(), l = o?.getField(n);
      return o && l ? { parentKind: "select", parent: o, field: l, fieldName: n } : (l = s?.getField(n), s && l ? { parentKind: "include", field: l, parent: s, fieldName: n } : (l = a?.getField(n), a && l ? { parentKind: "omit", field: l, parent: a, fieldName: n } : { parentKind: "unknown", fieldName: n }));
    }
    __name(Ro, "Ro");
    function So(e, t) {
      if (t.kind === "object") for (let r of t.fields) e.hasField(r.name) || e.addSuggestion(new le(r.name, r.typeNames.join(" | ")));
    }
    __name(So, "So");
    function Mt(e) {
      let t = [...e], r = t.pop();
      if (!r) throw new Error("unexpected empty path");
      return [t, r];
    }
    __name(Mt, "Mt");
    function Nt({ green: e, enabled: t }) {
      return "Available options are " + (t ? `listed in ${e("green")}` : "marked with ?") + ".";
    }
    __name(Nt, "Nt");
    function Or(e, t) {
      if (t.length === 1) return t[0];
      let r = [...t], n = r.pop();
      return `${r.join(", ")} ${e} ${n}`;
    }
    __name(Or, "Or");
    var Fu = 3;
    function _u(e, t) {
      let r = 1 / 0, n;
      for (let i of t) {
        let o = (0, vo.default)(e, i);
        o > Fu || o < r && (r = o, n = i);
      }
      return n;
    }
    __name(_u, "_u");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    function Io(e) {
      return e.substring(0, 1).toLowerCase() + e.substring(1);
    }
    __name(Io, "Io");
    f();
    c2();
    p();
    d();
    m();
    var Ft = class {
      static {
        __name(this, "Ft");
      }
      constructor(t, r, n, i, o) {
        this.modelName = t, this.name = r, this.typeName = n, this.isList = i, this.isEnum = o;
      }
      _toGraphQLInputType() {
        let t = this.isList ? "List" : "", r = this.isEnum ? "Enum" : "";
        return `${t}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
      }
    };
    function pt(e) {
      return e instanceof Ft;
    }
    __name(pt, "pt");
    f();
    c2();
    p();
    d();
    m();
    var kr = Symbol();
    var Cn = /* @__PURE__ */ new WeakMap();
    var Ae = class {
      static {
        __name(this, "Ae");
      }
      constructor(t) {
        t === kr ? Cn.set(this, `Prisma.${this._getName()}`) : Cn.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
      }
      _getName() {
        return this.constructor.name;
      }
      toString() {
        return Cn.get(this);
      }
    };
    var _t = class extends Ae {
      static {
        __name(this, "_t");
      }
      _getNamespace() {
        return "NullTypes";
      }
    };
    var Lt = class extends _t {
      static {
        __name(this, "Lt");
      }
    };
    An(Lt, "DbNull");
    var qt = class extends _t {
      static {
        __name(this, "qt");
      }
    };
    An(qt, "JsonNull");
    var Bt = class extends _t {
      static {
        __name(this, "Bt");
      }
    };
    An(Bt, "AnyNull");
    var Dr = { classes: { DbNull: Lt, JsonNull: qt, AnyNull: Bt }, instances: { DbNull: new Lt(kr), JsonNull: new qt(kr), AnyNull: new Bt(kr) } };
    function An(e, t) {
      Object.defineProperty(e, "name", { value: t, configurable: true });
    }
    __name(An, "An");
    f();
    c2();
    p();
    d();
    m();
    var Oo = ": ";
    var Mr = class {
      static {
        __name(this, "Mr");
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
        return this.name.length + this.value.getPrintWidth() + Oo.length;
      }
      write(t) {
        let r = new ge(this.name);
        this.hasError && r.underline().setColor(t.context.colors.red), t.write(r).write(Oo).write(this.value);
      }
    };
    var Rn = class {
      static {
        __name(this, "Rn");
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
    function dt(e) {
      return new Rn(ko(e));
    }
    __name(dt, "dt");
    function ko(e) {
      let t = new ct();
      for (let [r, n] of Object.entries(e)) {
        let i = new Mr(r, Do(n));
        t.addField(i);
      }
      return t;
    }
    __name(ko, "ko");
    function Do(e) {
      if (typeof e == "string") return new z(JSON.stringify(e));
      if (typeof e == "number" || typeof e == "boolean") return new z(String(e));
      if (typeof e == "bigint") return new z(`${e}n`);
      if (e === null) return new z("null");
      if (e === void 0) return new z("undefined");
      if (ot(e)) return new z(`new Prisma.Decimal("${e.toFixed()}")`);
      if (e instanceof Uint8Array) return w.Buffer.isBuffer(e) ? new z(`Buffer.alloc(${e.byteLength})`) : new z(`new Uint8Array(${e.byteLength})`);
      if (e instanceof Date) {
        let t = Cr(e) ? e.toISOString() : "Invalid Date";
        return new z(`new Date("${t}")`);
      }
      return e instanceof Ae ? new z(`Prisma.${e._getName()}`) : pt(e) ? new z(`prisma.${Io(e.modelName)}.$fields.${e.name}`) : Array.isArray(e) ? Lu(e) : typeof e == "object" ? ko(e) : new z(Object.prototype.toString.call(e));
    }
    __name(Do, "Do");
    function Lu(e) {
      let t = new ut();
      for (let r of e) t.addItem(Do(r));
      return t;
    }
    __name(Lu, "Lu");
    function Nr(e, t) {
      let r = t === "pretty" ? Po : Ir, n = e.renderAllMessages(r), i = new at(0, { colors: r }).write(e).toString();
      return { message: n, args: i };
    }
    __name(Nr, "Nr");
    function Fr({ args: e, errors: t, errorFormat: r, callsite: n, originalMethod: i, clientVersion: o, globalOmit: s }) {
      let a = dt(e);
      for (let h of t) Ar(h, a, s);
      let { message: l, args: u } = Nr(a, r), g = st({ message: l, callsite: n, originalMethod: i, showColors: r === "pretty", callArguments: u });
      throw new K(g, { clientVersion: o });
    }
    __name(Fr, "Fr");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var he = class {
      static {
        __name(this, "he");
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
    f();
    c2();
    p();
    d();
    m();
    function Ut(e) {
      let t;
      return { get() {
        return t || (t = { value: e() }), t.value;
      } };
    }
    __name(Ut, "Ut");
    f();
    c2();
    p();
    d();
    m();
    function ye(e) {
      return e.replace(/^./, (t) => t.toLowerCase());
    }
    __name(ye, "ye");
    f();
    c2();
    p();
    d();
    m();
    function No(e, t, r) {
      let n = ye(r);
      return !t.result || !(t.result.$allModels || t.result[n]) ? e : qu({ ...e, ...Mo(t.name, e, t.result.$allModels), ...Mo(t.name, e, t.result[n]) });
    }
    __name(No, "No");
    function qu(e) {
      let t = new he(), r = /* @__PURE__ */ __name((n, i) => t.getOrCreate(n, () => i.has(n) ? [n] : (i.add(n), e[n] ? e[n].needs.flatMap((o) => r(o, i)) : [n])), "r");
      return Xe(e, (n) => ({ ...n, needs: r(n.name, /* @__PURE__ */ new Set()) }));
    }
    __name(qu, "qu");
    function Mo(e, t, r) {
      return r ? Xe(r, ({ needs: n, compute: i }, o) => ({ name: o, needs: n ? Object.keys(n).filter((s) => n[s]) : [], compute: Bu(t, o, i) })) : {};
    }
    __name(Mo, "Mo");
    function Bu(e, t, r) {
      let n = e?.[t]?.compute;
      return n ? (i) => r({ ...i, [t]: n(i) }) : r;
    }
    __name(Bu, "Bu");
    function Fo(e, t) {
      if (!t) return e;
      let r = { ...e };
      for (let n of Object.values(t)) if (e[n.name]) for (let i of n.needs) r[i] = true;
      return r;
    }
    __name(Fo, "Fo");
    function _o(e, t) {
      if (!t) return e;
      let r = { ...e };
      for (let n of Object.values(t)) if (!e[n.name]) for (let i of n.needs) delete r[i];
      return r;
    }
    __name(_o, "_o");
    var _r = class {
      static {
        __name(this, "_r");
      }
      constructor(t, r) {
        this.extension = t;
        this.previous = r;
        this.computedFieldsCache = new he();
        this.modelExtensionsCache = new he();
        this.queryCallbacksCache = new he();
        this.clientExtensions = Ut(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
        this.batchCallbacks = Ut(() => {
          let t2 = this.previous?.getAllBatchQueryCallbacks() ?? [], r2 = this.extension.query?.$__internalBatch;
          return r2 ? t2.concat(r2) : t2;
        });
      }
      getAllComputedFields(t) {
        return this.computedFieldsCache.getOrCreate(t, () => No(this.previous?.getAllComputedFields(t), this.extension, t));
      }
      getAllClientExtensions() {
        return this.clientExtensions.get();
      }
      getAllModelExtensions(t) {
        return this.modelExtensionsCache.getOrCreate(t, () => {
          let r = ye(t);
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
    var mt = class e {
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
        return new e(new _r(t));
      }
      isEmpty() {
        return this.head === void 0;
      }
      append(t) {
        return new e(new _r(t, this.head));
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
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var Lo = Symbol();
    var $t = class {
      static {
        __name(this, "$t");
      }
      constructor(t) {
        if (t !== Lo) throw new Error("Skip instance can not be constructed directly");
      }
      ifUndefined(t) {
        return t === void 0 ? Lr : t;
      }
    };
    var Lr = new $t(Lo);
    function we(e) {
      return e instanceof $t;
    }
    __name(we, "we");
    var Uu = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" };
    var qo = "explicitly `undefined` values are not allowed";
    function qr({ modelName: e, action: t, args: r, runtimeDataModel: n, extensions: i = mt.empty(), callsite: o, clientMethod: s, errorFormat: a, clientVersion: l, previewFeatures: u, globalOmit: g }) {
      let h = new Sn({ runtimeDataModel: n, modelName: e, action: t, rootArgs: r, callsite: o, extensions: i, selectionPath: [], argumentPath: [], originalMethod: s, errorFormat: a, clientVersion: l, previewFeatures: u, globalOmit: g });
      return { modelName: e, action: Uu[t], query: Vt(r, h) };
    }
    __name(qr, "qr");
    function Vt({ select: e, include: t, ...r } = {}, n) {
      let i;
      return n.isPreviewFeatureOn("omitApi") && (i = r.omit, delete r.omit), { arguments: Uo(r, n), selection: $u(e, t, i, n) };
    }
    __name(Vt, "Vt");
    function $u(e, t, r, n) {
      return e ? (t ? n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: n.getSelectionPath() }) : r && n.isPreviewFeatureOn("omitApi") && n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: n.getSelectionPath() }), Gu(e, n)) : Vu(n, t, r);
    }
    __name($u, "$u");
    function Vu(e, t, r) {
      let n = {};
      return e.modelOrType && !e.isRawAction() && (n.$composites = true, n.$scalars = true), t && ju(n, t, e), e.isPreviewFeatureOn("omitApi") && Ju(n, r, e), n;
    }
    __name(Vu, "Vu");
    function ju(e, t, r) {
      for (let [n, i] of Object.entries(t)) {
        if (we(i)) continue;
        let o = r.nestSelection(n);
        if (In(i, o), i === false || i === void 0) {
          e[n] = false;
          continue;
        }
        let s = r.findField(n);
        if (s && s.kind !== "object" && r.throwValidationError({ kind: "IncludeOnScalar", selectionPath: r.getSelectionPath().concat(n), outputType: r.getOutputTypeDescription() }), s) {
          e[n] = Vt(i === true ? {} : i, o);
          continue;
        }
        if (i === true) {
          e[n] = true;
          continue;
        }
        e[n] = Vt(i, o);
      }
    }
    __name(ju, "ju");
    function Ju(e, t, r) {
      let n = r.getComputedFields(), i = { ...r.getGlobalOmit(), ...t }, o = _o(i, n);
      for (let [s, a] of Object.entries(o)) {
        if (we(a)) continue;
        In(a, r.nestSelection(s));
        let l = r.findField(s);
        n?.[s] && !l || (e[s] = !a);
      }
    }
    __name(Ju, "Ju");
    function Gu(e, t) {
      let r = {}, n = t.getComputedFields(), i = Fo(e, n);
      for (let [o, s] of Object.entries(i)) {
        if (we(s)) continue;
        let a = t.nestSelection(o);
        In(s, a);
        let l = t.findField(o);
        if (!(n?.[o] && !l)) {
          if (s === false || s === void 0 || we(s)) {
            r[o] = false;
            continue;
          }
          if (s === true) {
            l?.kind === "object" ? r[o] = Vt({}, a) : r[o] = true;
            continue;
          }
          r[o] = Vt(s, a);
        }
      }
      return r;
    }
    __name(Gu, "Gu");
    function Bo(e, t) {
      if (e === null) return null;
      if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") return e;
      if (typeof e == "bigint") return { $type: "BigInt", value: String(e) };
      if (it(e)) {
        if (Cr(e)) return { $type: "DateTime", value: e.toISOString() };
        t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
      }
      if (pt(e)) return { $type: "FieldRef", value: { _ref: e.name, _container: e.modelName } };
      if (Array.isArray(e)) return Qu(e, t);
      if (ArrayBuffer.isView(e)) return { $type: "Bytes", value: w.Buffer.from(e).toString("base64") };
      if (Hu(e)) return e.values;
      if (ot(e)) return { $type: "Decimal", value: e.toFixed() };
      if (e instanceof Ae) {
        if (e !== Dr.instances[e._getName()]) throw new Error("Invalid ObjectEnumValue");
        return { $type: "Enum", value: e._getName() };
      }
      if (Wu(e)) return e.toJSON();
      if (typeof e == "object") return Uo(e, t);
      t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(e)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
    }
    __name(Bo, "Bo");
    function Uo(e, t) {
      if (e.$type) return { $type: "Raw", value: e };
      let r = {};
      for (let n in e) {
        let i = e[n], o = t.nestArgument(n);
        we(i) || (i !== void 0 ? r[n] = Bo(i, o) : t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: o.getArgumentPath(), selectionPath: t.getSelectionPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: qo }));
      }
      return r;
    }
    __name(Uo, "Uo");
    function Qu(e, t) {
      let r = [];
      for (let n = 0; n < e.length; n++) {
        let i = t.nestArgument(String(n)), o = e[n];
        if (o === void 0 || we(o)) {
          let s = o === void 0 ? "undefined" : "Prisma.skip";
          t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: i.getSelectionPath(), argumentPath: i.getArgumentPath(), argument: { name: `${t.getArgumentName()}[${n}]`, typeNames: [] }, underlyingError: `Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values` });
        }
        r.push(Bo(o, i));
      }
      return r;
    }
    __name(Qu, "Qu");
    function Hu(e) {
      return typeof e == "object" && e !== null && e.__prismaRawParameters__ === true;
    }
    __name(Hu, "Hu");
    function Wu(e) {
      return typeof e == "object" && e !== null && typeof e.toJSON == "function";
    }
    __name(Wu, "Wu");
    function In(e, t) {
      e === void 0 && t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: t.getSelectionPath(), underlyingError: qo });
    }
    __name(In, "In");
    var Sn = class e {
      static {
        __name(this, "e");
      }
      constructor(t) {
        this.params = t;
        this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
      }
      throwValidationError(t) {
        Fr({ errors: [t], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
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
        return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[nt(this.params.modelName)] ?? {} : {};
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
            Pe(this.params.action, "Unknown action");
        }
      }
      nestArgument(t) {
        return new e({ ...this.params, argumentPath: this.params.argumentPath.concat(t) });
      }
    };
    f();
    c2();
    p();
    d();
    m();
    var ft = class {
      static {
        __name(this, "ft");
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
    f();
    c2();
    p();
    d();
    m();
    function $o(e) {
      return { models: On(e.models), enums: On(e.enums), types: On(e.types) };
    }
    __name($o, "$o");
    function On(e) {
      let t = {};
      for (let { name: r, ...n } of e) t[r] = n;
      return t;
    }
    __name(On, "On");
    function Vo(e, t) {
      let r = Ut(() => Ku(t));
      Object.defineProperty(e, "dmmf", { get: /* @__PURE__ */ __name(() => r.get(), "get") });
    }
    __name(Vo, "Vo");
    function Ku(e) {
      return { datamodel: { models: kn(e.models), enums: kn(e.enums), types: kn(e.types) } };
    }
    __name(Ku, "Ku");
    function kn(e) {
      return Object.entries(e).map(([t, r]) => ({ name: t, ...r }));
    }
    __name(kn, "kn");
    f();
    c2();
    p();
    d();
    m();
    var Dn = /* @__PURE__ */ new WeakMap();
    var Br = "$$PrismaTypedSql";
    var Mn = class {
      static {
        __name(this, "Mn");
      }
      constructor(t, r) {
        Dn.set(this, { sql: t, values: r }), Object.defineProperty(this, Br, { value: Br });
      }
      get sql() {
        return Dn.get(this).sql;
      }
      get values() {
        return Dn.get(this).values;
      }
    };
    function jo(e) {
      return (...t) => new Mn(e, t);
    }
    __name(jo, "jo");
    function Jo(e) {
      return e != null && e[Br] === Br;
    }
    __name(Jo, "Jo");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    function jt(e) {
      return { ok: false, error: e, map() {
        return jt(e);
      }, flatMap() {
        return jt(e);
      } };
    }
    __name(jt, "jt");
    var Nn = class {
      static {
        __name(this, "Nn");
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
    var Fn = /* @__PURE__ */ __name((e) => {
      let t = new Nn(), r = Ee(t, e.transactionContext.bind(e)), n = { adapterName: e.adapterName, errorRegistry: t, queryRaw: Ee(t, e.queryRaw.bind(e)), executeRaw: Ee(t, e.executeRaw.bind(e)), provider: e.provider, transactionContext: /* @__PURE__ */ __name(async (...i) => (await r(...i)).map((s) => zu(t, s)), "transactionContext") };
      return e.getConnectionInfo && (n.getConnectionInfo = Zu(t, e.getConnectionInfo.bind(e))), n;
    }, "Fn");
    var zu = /* @__PURE__ */ __name((e, t) => {
      let r = Ee(e, t.startTransaction.bind(t));
      return { adapterName: t.adapterName, provider: t.provider, queryRaw: Ee(e, t.queryRaw.bind(t)), executeRaw: Ee(e, t.executeRaw.bind(t)), startTransaction: /* @__PURE__ */ __name(async (...n) => (await r(...n)).map((o) => Yu(e, o)), "startTransaction") };
    }, "zu");
    var Yu = /* @__PURE__ */ __name((e, t) => ({ adapterName: t.adapterName, provider: t.provider, options: t.options, queryRaw: Ee(e, t.queryRaw.bind(t)), executeRaw: Ee(e, t.executeRaw.bind(t)), commit: Ee(e, t.commit.bind(t)), rollback: Ee(e, t.rollback.bind(t)) }), "Yu");
    function Ee(e, t) {
      return async (...r) => {
        try {
          return await t(...r);
        } catch (n) {
          let i = e.registerNewError(n);
          return jt({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(Ee, "Ee");
    function Zu(e, t) {
      return (...r) => {
        try {
          return t(...r);
        } catch (n) {
          let i = e.registerNewError(n);
          return jt({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(Zu, "Zu");
    var ca = qe(Go());
    var iD = qe(Qo());
    Qi();
    Ii();
    Ji();
    f();
    c2();
    p();
    d();
    m();
    var oe = class e {
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
            let l = 0;
            for (; l < s.values.length; ) this.values[o++] = s.values[l++], this.strings[o] = s.strings[l];
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
    function Ho(e, t = ",", r = "", n = "") {
      if (e.length === 0) throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
      return new oe([r, ...Array(e.length - 1).fill(t), n], e);
    }
    __name(Ho, "Ho");
    function _n(e) {
      return new oe([e], []);
    }
    __name(_n, "_n");
    var Wo = _n("");
    function Ln(e, ...t) {
      return new oe(e, t);
    }
    __name(Ln, "Ln");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    function Jt(e) {
      return { getKeys() {
        return Object.keys(e);
      }, getPropertyValue(t) {
        return e[t];
      } };
    }
    __name(Jt, "Jt");
    f();
    c2();
    p();
    d();
    m();
    function te(e, t) {
      return { getKeys() {
        return [e];
      }, getPropertyValue() {
        return t();
      } };
    }
    __name(te, "te");
    f();
    c2();
    p();
    d();
    m();
    function Ve(e) {
      let t = new he();
      return { getKeys() {
        return e.getKeys();
      }, getPropertyValue(r) {
        return t.getOrCreate(r, () => e.getPropertyValue(r));
      }, getPropertyDescriptor(r) {
        return e.getPropertyDescriptor?.(r);
      } };
    }
    __name(Ve, "Ve");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var Ur = { enumerable: true, configurable: true, writable: true };
    function $r(e) {
      let t = new Set(e);
      return { getOwnPropertyDescriptor: /* @__PURE__ */ __name(() => Ur, "getOwnPropertyDescriptor"), has: /* @__PURE__ */ __name((r, n) => t.has(n), "has"), set: /* @__PURE__ */ __name((r, n, i) => t.add(n) && Reflect.set(r, n, i), "set"), ownKeys: /* @__PURE__ */ __name(() => [...t], "ownKeys") };
    }
    __name($r, "$r");
    var Ko = Symbol.for("nodejs.util.inspect.custom");
    function be(e, t) {
      let r = ec(t), n = /* @__PURE__ */ new Set(), i = new Proxy(e, { get(o, s) {
        if (n.has(s)) return o[s];
        let a = r.get(s);
        return a ? a.getPropertyValue(s) : o[s];
      }, has(o, s) {
        if (n.has(s)) return true;
        let a = r.get(s);
        return a ? a.has?.(s) ?? true : Reflect.has(o, s);
      }, ownKeys(o) {
        let s = zo(Reflect.ownKeys(o), r), a = zo(Array.from(r.keys()), r);
        return [.../* @__PURE__ */ new Set([...s, ...a, ...n])];
      }, set(o, s, a) {
        return r.get(s)?.getPropertyDescriptor?.(s)?.writable === false ? false : (n.add(s), Reflect.set(o, s, a));
      }, getOwnPropertyDescriptor(o, s) {
        let a = Reflect.getOwnPropertyDescriptor(o, s);
        if (a && !a.configurable) return a;
        let l = r.get(s);
        return l ? l.getPropertyDescriptor ? { ...Ur, ...l?.getPropertyDescriptor(s) } : Ur : a;
      }, defineProperty(o, s, a) {
        return n.add(s), Reflect.defineProperty(o, s, a);
      } });
      return i[Ko] = function() {
        let o = { ...this };
        return delete o[Ko], o;
      }, i;
    }
    __name(be, "be");
    function ec(e) {
      let t = /* @__PURE__ */ new Map();
      for (let r of e) {
        let n = r.getKeys();
        for (let i of n) t.set(i, r);
      }
      return t;
    }
    __name(ec, "ec");
    function zo(e, t) {
      return e.filter((r) => t.get(r)?.has?.(r) ?? true);
    }
    __name(zo, "zo");
    f();
    c2();
    p();
    d();
    m();
    function gt(e) {
      return { getKeys() {
        return e;
      }, has() {
        return false;
      }, getPropertyValue() {
      } };
    }
    __name(gt, "gt");
    f();
    c2();
    p();
    d();
    m();
    function Vr(e, t) {
      return { batch: e, transaction: t?.kind === "batch" ? { isolationLevel: t.options.isolationLevel } : void 0 };
    }
    __name(Vr, "Vr");
    f();
    c2();
    p();
    d();
    m();
    function Yo(e) {
      if (e === void 0) return "";
      let t = dt(e);
      return new at(0, { colors: Ir }).write(t).toString();
    }
    __name(Yo, "Yo");
    f();
    c2();
    p();
    d();
    m();
    var tc = "P2037";
    function Gt({ error: e, user_facing_error: t }, r, n) {
      return t.error_code ? new W(rc(t, n), { code: t.error_code, clientVersion: r, meta: t.meta, batchRequestIdx: t.batch_request_idx }) : new ne(e, { clientVersion: r, batchRequestIdx: t.batch_request_idx });
    }
    __name(Gt, "Gt");
    function rc(e, t) {
      let r = e.message;
      return (t === "postgresql" || t === "postgres" || t === "mysql") && e.error_code === tc && (r += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), r;
    }
    __name(rc, "rc");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var qn = class {
      static {
        __name(this, "qn");
      }
      getLocation() {
        return null;
      }
    };
    function Fe(e) {
      return typeof $EnabledCallSite == "function" && e !== "minimal" ? new $EnabledCallSite() : new qn();
    }
    __name(Fe, "Fe");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var Zo = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
    function ht(e = {}) {
      let t = ic(e);
      return Object.entries(t).reduce((n, [i, o]) => (Zo[i] !== void 0 ? n.select[i] = { select: o } : n[i] = o, n), { select: {} });
    }
    __name(ht, "ht");
    function ic(e = {}) {
      return typeof e._count == "boolean" ? { ...e, _count: { _all: e._count } } : e;
    }
    __name(ic, "ic");
    function jr(e = {}) {
      return (t) => (typeof e._count == "boolean" && (t._count = t._count._all), t);
    }
    __name(jr, "jr");
    function Xo(e, t) {
      let r = jr(e);
      return t({ action: "aggregate", unpacker: r, argsMapper: ht })(e);
    }
    __name(Xo, "Xo");
    f();
    c2();
    p();
    d();
    m();
    function oc(e = {}) {
      let { select: t, ...r } = e;
      return typeof t == "object" ? ht({ ...r, _count: t }) : ht({ ...r, _count: { _all: true } });
    }
    __name(oc, "oc");
    function sc(e = {}) {
      return typeof e.select == "object" ? (t) => jr(e)(t)._count : (t) => jr(e)(t)._count._all;
    }
    __name(sc, "sc");
    function es(e, t) {
      return t({ action: "count", unpacker: sc(e), argsMapper: oc })(e);
    }
    __name(es, "es");
    f();
    c2();
    p();
    d();
    m();
    function ac(e = {}) {
      let t = ht(e);
      if (Array.isArray(t.by)) for (let r of t.by) typeof r == "string" && (t.select[r] = true);
      else typeof t.by == "string" && (t.select[t.by] = true);
      return t;
    }
    __name(ac, "ac");
    function lc(e = {}) {
      return (t) => (typeof e?._count == "boolean" && t.forEach((r) => {
        r._count = r._count._all;
      }), t);
    }
    __name(lc, "lc");
    function ts(e, t) {
      return t({ action: "groupBy", unpacker: lc(e), argsMapper: ac })(e);
    }
    __name(ts, "ts");
    function rs(e, t, r) {
      if (t === "aggregate") return (n) => Xo(n, r);
      if (t === "count") return (n) => es(n, r);
      if (t === "groupBy") return (n) => ts(n, r);
    }
    __name(rs, "rs");
    f();
    c2();
    p();
    d();
    m();
    function ns(e, t) {
      let r = t.fields.filter((i) => !i.relationName), n = hn(r, (i) => i.name);
      return new Proxy({}, { get(i, o) {
        if (o in i || typeof o == "symbol") return i[o];
        let s = n[o];
        if (s) return new Ft(e, o, s.type, s.isList, s.kind === "enum");
      }, ...$r(Object.keys(n)) });
    }
    __name(ns, "ns");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var is = /* @__PURE__ */ __name((e) => Array.isArray(e) ? e : e.split("."), "is");
    var Bn = /* @__PURE__ */ __name((e, t) => is(t).reduce((r, n) => r && r[n], e), "Bn");
    var os = /* @__PURE__ */ __name((e, t, r) => is(t).reduceRight((n, i, o, s) => Object.assign({}, Bn(e, s.slice(0, o)), { [i]: n }), r), "os");
    function uc(e, t) {
      return e === void 0 || t === void 0 ? [] : [...t, "select", e];
    }
    __name(uc, "uc");
    function cc(e, t, r) {
      return t === void 0 ? e ?? {} : os(t, r, e || true);
    }
    __name(cc, "cc");
    function Un(e, t, r, n, i, o) {
      let a = e._runtimeDataModel.models[t].fields.reduce((l, u) => ({ ...l, [u.name]: u }), {});
      return (l) => {
        let u = Fe(e._errorFormat), g = uc(n, i), h = cc(l, o, g), v = r({ dataPath: g, callsite: u })(h), S = pc(e, t);
        return new Proxy(v, { get(A, R) {
          if (!S.includes(R)) return A[R];
          let F = [a[R].type, r, R], q = [g, h];
          return Un(e, ...F, ...q);
        }, ...$r([...S, ...Object.getOwnPropertyNames(v)]) });
      };
    }
    __name(Un, "Un");
    function pc(e, t) {
      return e._runtimeDataModel.models[t].fields.filter((r) => r.kind === "object").map((r) => r.name);
    }
    __name(pc, "pc");
    f();
    c2();
    p();
    d();
    m();
    function ss(e, t, r, n) {
      return e === Ue.ModelAction.findFirstOrThrow || e === Ue.ModelAction.findUniqueOrThrow ? dc(t, r, n) : n;
    }
    __name(ss, "ss");
    function dc(e, t, r) {
      return async (n) => {
        if ("rejectOnNotFound" in n.args) {
          let o = st({ originalMethod: n.clientMethod, callsite: n.callsite, message: "'rejectOnNotFound' option is not supported" });
          throw new K(o, { clientVersion: t });
        }
        return await r(n).catch((o) => {
          throw o instanceof W && o.code === "P2025" ? new ve(`No ${e} found`, t) : o;
        });
      };
    }
    __name(dc, "dc");
    var mc = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"];
    var fc = ["aggregate", "count", "groupBy"];
    function $n(e, t) {
      let r = e._extensions.getAllModelExtensions(t) ?? {}, n = [gc(e, t), yc(e, t), Jt(r), te("name", () => t), te("$name", () => t), te("$parent", () => e._appliedParent)];
      return be({}, n);
    }
    __name($n, "$n");
    function gc(e, t) {
      let r = ye(t), n = Object.keys(Ue.ModelAction).concat("count");
      return { getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = i, s = /* @__PURE__ */ __name((l) => e._request(l), "s");
        s = ss(o, t, e._clientVersion, s);
        let a = /* @__PURE__ */ __name((l) => (u) => {
          let g = Fe(e._errorFormat);
          return e._createPrismaPromise((h) => {
            let v = { args: u, dataPath: [], action: o, model: t, clientMethod: `${r}.${i}`, jsModelName: r, transaction: h, callsite: g };
            return s({ ...v, ...l });
          });
        }, "a");
        return mc.includes(o) ? Un(e, t, a) : hc(i) ? rs(e, i, a) : a({});
      } };
    }
    __name(gc, "gc");
    function hc(e) {
      return fc.includes(e);
    }
    __name(hc, "hc");
    function yc(e, t) {
      return Ve(te("fields", () => {
        let r = e._runtimeDataModel.models[t];
        return ns(t, r);
      }));
    }
    __name(yc, "yc");
    f();
    c2();
    p();
    d();
    m();
    function as(e) {
      return e.replace(/^./, (t) => t.toUpperCase());
    }
    __name(as, "as");
    var Vn = Symbol();
    function Qt(e) {
      let t = [wc(e), te(Vn, () => e), te("$parent", () => e._appliedParent)], r = e._extensions.getAllClientExtensions();
      return r && t.push(Jt(r)), be(e, t);
    }
    __name(Qt, "Qt");
    function wc(e) {
      let t = Object.keys(e._runtimeDataModel.models), r = t.map(ye), n = [...new Set(t.concat(r))];
      return Ve({ getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = as(i);
        if (e._runtimeDataModel.models[o] !== void 0) return $n(e, o);
        if (e._runtimeDataModel.models[i] !== void 0) return $n(e, i);
      }, getPropertyDescriptor(i) {
        if (!r.includes(i)) return { enumerable: false };
      } });
    }
    __name(wc, "wc");
    function ls(e) {
      return e[Vn] ? e[Vn] : e;
    }
    __name(ls, "ls");
    function us(e) {
      if (typeof e == "function") return e(this);
      if (e.client?.__AccelerateEngine) {
        let r = e.client.__AccelerateEngine;
        this._originalClient._engine = new r(this._originalClient._accelerateEngineConfig);
      }
      let t = Object.create(this._originalClient, { _extensions: { value: this._extensions.append(e) }, _appliedParent: { value: this, configurable: true }, $use: { value: void 0 }, $on: { value: void 0 } });
      return Qt(t);
    }
    __name(us, "us");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    function cs({ result: e, modelName: t, select: r, omit: n, extensions: i }) {
      let o = i.getAllComputedFields(t);
      if (!o) return e;
      let s = [], a = [];
      for (let l of Object.values(o)) {
        if (n) {
          if (n[l.name]) continue;
          let u = l.needs.filter((g) => n[g]);
          u.length > 0 && a.push(gt(u));
        } else if (r) {
          if (!r[l.name]) continue;
          let u = l.needs.filter((g) => !r[g]);
          u.length > 0 && a.push(gt(u));
        }
        Ec(e, l.needs) && s.push(bc(l, be(e, s)));
      }
      return s.length > 0 || a.length > 0 ? be(e, [...s, ...a]) : e;
    }
    __name(cs, "cs");
    function Ec(e, t) {
      return t.every((r) => gn(e, r));
    }
    __name(Ec, "Ec");
    function bc(e, t) {
      return Ve(te(e.name, () => e.compute(t)));
    }
    __name(bc, "bc");
    f();
    c2();
    p();
    d();
    m();
    function Jr({ visitor: e, result: t, args: r, runtimeDataModel: n, modelName: i }) {
      if (Array.isArray(t)) {
        for (let s = 0; s < t.length; s++) t[s] = Jr({ result: t[s], args: r, modelName: i, runtimeDataModel: n, visitor: e });
        return t;
      }
      let o = e(t, i, r) ?? t;
      return r.include && ps({ includeOrSelect: r.include, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), r.select && ps({ includeOrSelect: r.select, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), o;
    }
    __name(Jr, "Jr");
    function ps({ includeOrSelect: e, result: t, parentModelName: r, runtimeDataModel: n, visitor: i }) {
      for (let [o, s] of Object.entries(e)) {
        if (!s || t[o] == null || we(s)) continue;
        let l = n.models[r].fields.find((g) => g.name === o);
        if (!l || l.kind !== "object" || !l.relationName) continue;
        let u = typeof s == "object" ? s : {};
        t[o] = Jr({ visitor: i, result: t[o], args: u, modelName: l.type, runtimeDataModel: n });
      }
    }
    __name(ps, "ps");
    function ds({ result: e, modelName: t, args: r, extensions: n, runtimeDataModel: i, globalOmit: o }) {
      return n.isEmpty() || e == null || typeof e != "object" || !i.models[t] ? e : Jr({ result: e, args: r ?? {}, modelName: t, runtimeDataModel: i, visitor: /* @__PURE__ */ __name((a, l, u) => {
        let g = ye(l);
        return cs({ result: a, modelName: g, select: u.select, omit: u.select ? void 0 : { ...o?.[g], ...u.omit }, extensions: n });
      }, "visitor") });
    }
    __name(ds, "ds");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    function ms(e) {
      if (e instanceof oe) return xc(e);
      if (Array.isArray(e)) {
        let r = [e[0]];
        for (let n = 1; n < e.length; n++) r[n] = Ht(e[n]);
        return r;
      }
      let t = {};
      for (let r in e) t[r] = Ht(e[r]);
      return t;
    }
    __name(ms, "ms");
    function xc(e) {
      return new oe(e.strings, e.values);
    }
    __name(xc, "xc");
    function Ht(e) {
      if (typeof e != "object" || e == null || e instanceof Ae || pt(e)) return e;
      if (ot(e)) return new fe(e.toFixed());
      if (it(e)) return /* @__PURE__ */ new Date(+e);
      if (ArrayBuffer.isView(e)) return e.slice(0);
      if (Array.isArray(e)) {
        let t = e.length, r;
        for (r = Array(t); t--; ) r[t] = Ht(e[t]);
        return r;
      }
      if (typeof e == "object") {
        let t = {};
        for (let r in e) r === "__proto__" ? Object.defineProperty(t, r, { value: Ht(e[r]), configurable: true, enumerable: true, writable: true }) : t[r] = Ht(e[r]);
        return t;
      }
      Pe(e, "Unknown value");
    }
    __name(Ht, "Ht");
    function gs(e, t, r, n = 0) {
      return e._createPrismaPromise((i) => {
        let o = t.customDataProxyFetch;
        return "transaction" in t && i !== void 0 && (t.transaction?.kind === "batch" && t.transaction.lock.then(), t.transaction = i), n === r.length ? e._executeRequest(t) : r[n]({ model: t.model, operation: t.model ? t.action : t.clientMethod, args: ms(t.args ?? {}), __internalParams: t, query: /* @__PURE__ */ __name((s, a = t) => {
          let l = a.customDataProxyFetch;
          return a.customDataProxyFetch = Es(o, l), a.args = s, gs(e, a, r, n + 1);
        }, "query") });
      });
    }
    __name(gs, "gs");
    function hs(e, t) {
      let { jsModelName: r, action: n, clientMethod: i } = t, o = r ? n : i;
      if (e._extensions.isEmpty()) return e._executeRequest(t);
      let s = e._extensions.getAllQueryCallbacks(r ?? "$none", o);
      return gs(e, t, s);
    }
    __name(hs, "hs");
    function ys(e) {
      return (t) => {
        let r = { requests: t }, n = t[0].extensions.getAllBatchQueryCallbacks();
        return n.length ? ws(r, n, 0, e) : e(r);
      };
    }
    __name(ys, "ys");
    function ws(e, t, r, n) {
      if (r === t.length) return n(e);
      let i = e.customDataProxyFetch, o = e.requests[0].transaction;
      return t[r]({ args: { queries: e.requests.map((s) => ({ model: s.modelName, operation: s.action, args: s.args })), transaction: o ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 } : void 0 }, __internalParams: e, query(s, a = e) {
        let l = a.customDataProxyFetch;
        return a.customDataProxyFetch = Es(i, l), ws(a, t, r + 1, n);
      } });
    }
    __name(ws, "ws");
    var fs = /* @__PURE__ */ __name((e) => e, "fs");
    function Es(e = fs, t = fs) {
      return (r) => e(t(r));
    }
    __name(Es, "Es");
    f();
    c2();
    p();
    d();
    m();
    var bs = ee("prisma:client");
    var xs = { Vercel: "vercel", "Netlify CI": "netlify" };
    function Ps({ postinstall: e, ciName: t, clientVersion: r }) {
      if (bs("checkPlatformCaching:postinstall", e), bs("checkPlatformCaching:ciName", t), e === true && t && t in xs) {
        let n = `Prisma has detected that this project was built on ${t}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${xs[t]}-build`;
        throw console.error(n), new G(n, r);
      }
    }
    __name(Ps, "Ps");
    f();
    c2();
    p();
    d();
    m();
    function vs(e, t) {
      return e ? e.datasources ? e.datasources : e.datasourceUrl ? { [t[0]]: { url: e.datasourceUrl } } : {} : {};
    }
    __name(vs, "vs");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var Pc = "Cloudflare-Workers";
    var vc = "node";
    function Ts() {
      return typeof Netlify == "object" ? "netlify" : typeof EdgeRuntime == "string" ? "edge-light" : globalThis.navigator?.userAgent === Pc ? "workerd" : globalThis.Deno ? "deno" : globalThis.__lagon__ ? "lagon" : globalThis.process?.release?.name === vc ? "node" : globalThis.Bun ? "bun" : globalThis.fastly ? "fastly" : "unknown";
    }
    __name(Ts, "Ts");
    var Tc = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
    function Gr() {
      let e = Ts();
      return { id: e, prettyName: Tc[e] || e, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e) };
    }
    __name(Gr, "Gr");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    function yt({ inlineDatasources: e, overrideDatasources: t, env: r, clientVersion: n }) {
      let i, o = Object.keys(e)[0], s = e[o]?.url, a = t[o]?.url;
      if (o === void 0 ? i = void 0 : a ? i = a : s?.value ? i = s.value : s?.fromEnvVar && (i = r[s.fromEnvVar]), s?.fromEnvVar !== void 0 && i === void 0) throw Gr().id === "workerd" ? new G(`error: Environment variable not found: ${s.fromEnvVar}.

In Cloudflare module Workers, environment variables are available only in the Worker's \`env\` parameter of \`fetch\`.
To solve this, provide the connection string directly: https://pris.ly/d/cloudflare-datasource-url`, n) : new G(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
      if (i === void 0) throw new G("error: Missing URL environment variable, value, or override.", n);
      return i;
    }
    __name(yt, "yt");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var Qr = class extends Error {
      static {
        __name(this, "Qr");
      }
      constructor(t, r) {
        super(t), this.clientVersion = r.clientVersion, this.cause = r.cause;
      }
      get [Symbol.toStringTag]() {
        return this.name;
      }
    };
    var se = class extends Qr {
      static {
        __name(this, "se");
      }
      constructor(t, r) {
        super(t, r), this.isRetryable = r.isRetryable ?? true;
      }
    };
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    function L(e, t) {
      return { ...e, isRetryable: t };
    }
    __name(L, "L");
    var wt = class extends se {
      static {
        __name(this, "wt");
      }
      constructor(r) {
        super("This request must be retried", L(r, true));
        this.name = "ForcedRetryError";
        this.code = "P5001";
      }
    };
    N(wt, "ForcedRetryError");
    f();
    c2();
    p();
    d();
    m();
    var je = class extends se {
      static {
        __name(this, "je");
      }
      constructor(r, n) {
        super(r, L(n, false));
        this.name = "InvalidDatasourceError";
        this.code = "P6001";
      }
    };
    N(je, "InvalidDatasourceError");
    f();
    c2();
    p();
    d();
    m();
    var Je = class extends se {
      static {
        __name(this, "Je");
      }
      constructor(r, n) {
        super(r, L(n, false));
        this.name = "NotImplementedYetError";
        this.code = "P5004";
      }
    };
    N(Je, "NotImplementedYetError");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var j = class extends se {
      static {
        __name(this, "j");
      }
      constructor(t, r) {
        super(t, r), this.response = r.response;
        let n = this.response.headers.get("prisma-request-id");
        if (n) {
          let i = `(The request id was: ${n})`;
          this.message = this.message + " " + i;
        }
      }
    };
    var Ge = class extends j {
      static {
        __name(this, "Ge");
      }
      constructor(r) {
        super("Schema needs to be uploaded", L(r, true));
        this.name = "SchemaMissingError";
        this.code = "P5005";
      }
    };
    N(Ge, "SchemaMissingError");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var jn = "This request could not be understood by the server";
    var Wt = class extends j {
      static {
        __name(this, "Wt");
      }
      constructor(r, n, i) {
        super(n || jn, L(r, false));
        this.name = "BadRequestError";
        this.code = "P5000";
        i && (this.code = i);
      }
    };
    N(Wt, "BadRequestError");
    f();
    c2();
    p();
    d();
    m();
    var Kt = class extends j {
      static {
        __name(this, "Kt");
      }
      constructor(r, n) {
        super("Engine not started: healthcheck timeout", L(r, true));
        this.name = "HealthcheckTimeoutError";
        this.code = "P5013";
        this.logs = n;
      }
    };
    N(Kt, "HealthcheckTimeoutError");
    f();
    c2();
    p();
    d();
    m();
    var zt = class extends j {
      static {
        __name(this, "zt");
      }
      constructor(r, n, i) {
        super(n, L(r, true));
        this.name = "EngineStartupError";
        this.code = "P5014";
        this.logs = i;
      }
    };
    N(zt, "EngineStartupError");
    f();
    c2();
    p();
    d();
    m();
    var Yt = class extends j {
      static {
        __name(this, "Yt");
      }
      constructor(r) {
        super("Engine version is not supported", L(r, false));
        this.name = "EngineVersionNotSupportedError";
        this.code = "P5012";
      }
    };
    N(Yt, "EngineVersionNotSupportedError");
    f();
    c2();
    p();
    d();
    m();
    var Jn = "Request timed out";
    var Zt = class extends j {
      static {
        __name(this, "Zt");
      }
      constructor(r, n = Jn) {
        super(n, L(r, false));
        this.name = "GatewayTimeoutError";
        this.code = "P5009";
      }
    };
    N(Zt, "GatewayTimeoutError");
    f();
    c2();
    p();
    d();
    m();
    var Cc = "Interactive transaction error";
    var Xt = class extends j {
      static {
        __name(this, "Xt");
      }
      constructor(r, n = Cc) {
        super(n, L(r, false));
        this.name = "InteractiveTransactionError";
        this.code = "P5015";
      }
    };
    N(Xt, "InteractiveTransactionError");
    f();
    c2();
    p();
    d();
    m();
    var Ac = "Request parameters are invalid";
    var er = class extends j {
      static {
        __name(this, "er");
      }
      constructor(r, n = Ac) {
        super(n, L(r, false));
        this.name = "InvalidRequestError";
        this.code = "P5011";
      }
    };
    N(er, "InvalidRequestError");
    f();
    c2();
    p();
    d();
    m();
    var Gn = "Requested resource does not exist";
    var tr = class extends j {
      static {
        __name(this, "tr");
      }
      constructor(r, n = Gn) {
        super(n, L(r, false));
        this.name = "NotFoundError";
        this.code = "P5003";
      }
    };
    N(tr, "NotFoundError");
    f();
    c2();
    p();
    d();
    m();
    var Qn = "Unknown server error";
    var Et = class extends j {
      static {
        __name(this, "Et");
      }
      constructor(r, n, i) {
        super(n || Qn, L(r, true));
        this.name = "ServerError";
        this.code = "P5006";
        this.logs = i;
      }
    };
    N(Et, "ServerError");
    f();
    c2();
    p();
    d();
    m();
    var Hn = "Unauthorized, check your connection string";
    var rr = class extends j {
      static {
        __name(this, "rr");
      }
      constructor(r, n = Hn) {
        super(n, L(r, false));
        this.name = "UnauthorizedError";
        this.code = "P5007";
      }
    };
    N(rr, "UnauthorizedError");
    f();
    c2();
    p();
    d();
    m();
    var Wn = "Usage exceeded, retry again later";
    var nr = class extends j {
      static {
        __name(this, "nr");
      }
      constructor(r, n = Wn) {
        super(n, L(r, true));
        this.name = "UsageExceededError";
        this.code = "P5008";
      }
    };
    N(nr, "UsageExceededError");
    async function Rc(e) {
      let t;
      try {
        t = await e.text();
      } catch {
        return { type: "EmptyError" };
      }
      try {
        let r = JSON.parse(t);
        if (typeof r == "string") switch (r) {
          case "InternalDataProxyError":
            return { type: "DataProxyError", body: r };
          default:
            return { type: "UnknownTextError", body: r };
        }
        if (typeof r == "object" && r !== null) {
          if ("is_panic" in r && "message" in r && "error_code" in r) return { type: "QueryEngineError", body: r };
          if ("EngineNotStarted" in r || "InteractiveTransactionMisrouted" in r || "InvalidRequestError" in r) {
            let n = Object.values(r)[0].reason;
            return typeof n == "string" && !["SchemaMissing", "EngineVersionNotSupported"].includes(n) ? { type: "UnknownJsonError", body: r } : { type: "DataProxyError", body: r };
          }
        }
        return { type: "UnknownJsonError", body: r };
      } catch {
        return t === "" ? { type: "EmptyError" } : { type: "UnknownTextError", body: t };
      }
    }
    __name(Rc, "Rc");
    async function ir(e, t) {
      if (e.ok) return;
      let r = { clientVersion: t, response: e }, n = await Rc(e);
      if (n.type === "QueryEngineError") throw new W(n.body.message, { code: n.body.error_code, clientVersion: t });
      if (n.type === "DataProxyError") {
        if (n.body === "InternalDataProxyError") throw new Et(r, "Internal Data Proxy error");
        if ("EngineNotStarted" in n.body) {
          if (n.body.EngineNotStarted.reason === "SchemaMissing") return new Ge(r);
          if (n.body.EngineNotStarted.reason === "EngineVersionNotSupported") throw new Yt(r);
          if ("EngineStartupError" in n.body.EngineNotStarted.reason) {
            let { msg: i, logs: o } = n.body.EngineNotStarted.reason.EngineStartupError;
            throw new zt(r, i, o);
          }
          if ("KnownEngineStartupError" in n.body.EngineNotStarted.reason) {
            let { msg: i, error_code: o } = n.body.EngineNotStarted.reason.KnownEngineStartupError;
            throw new G(i, t, o);
          }
          if ("HealthcheckTimeout" in n.body.EngineNotStarted.reason) {
            let { logs: i } = n.body.EngineNotStarted.reason.HealthcheckTimeout;
            throw new Kt(r, i);
          }
        }
        if ("InteractiveTransactionMisrouted" in n.body) {
          let i = { IDParseError: "Could not parse interactive transaction ID", NoQueryEngineFoundError: "Could not find Query Engine for the specified host and transaction ID", TransactionStartError: "Could not start interactive transaction" };
          throw new Xt(r, i[n.body.InteractiveTransactionMisrouted.reason]);
        }
        if ("InvalidRequestError" in n.body) throw new er(r, n.body.InvalidRequestError.reason);
      }
      if (e.status === 401 || e.status === 403) throw new rr(r, bt(Hn, n));
      if (e.status === 404) return new tr(r, bt(Gn, n));
      if (e.status === 429) throw new nr(r, bt(Wn, n));
      if (e.status === 504) throw new Zt(r, bt(Jn, n));
      if (e.status >= 500) throw new Et(r, bt(Qn, n));
      if (e.status >= 400) throw new Wt(r, bt(jn, n));
    }
    __name(ir, "ir");
    function bt(e, t) {
      return t.type === "EmptyError" ? e : `${e}: ${JSON.stringify(t)}`;
    }
    __name(bt, "bt");
    f();
    c2();
    p();
    d();
    m();
    function Cs(e) {
      let t = Math.pow(2, e) * 50, r = Math.ceil(Math.random() * t) - Math.ceil(t / 2), n = t + r;
      return new Promise((i) => setTimeout(() => i(n), n));
    }
    __name(Cs, "Cs");
    f();
    c2();
    p();
    d();
    m();
    var Re = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    function As(e) {
      let t = new TextEncoder().encode(e), r = "", n = t.byteLength, i = n % 3, o = n - i, s, a, l, u, g;
      for (let h = 0; h < o; h = h + 3) g = t[h] << 16 | t[h + 1] << 8 | t[h + 2], s = (g & 16515072) >> 18, a = (g & 258048) >> 12, l = (g & 4032) >> 6, u = g & 63, r += Re[s] + Re[a] + Re[l] + Re[u];
      return i == 1 ? (g = t[o], s = (g & 252) >> 2, a = (g & 3) << 4, r += Re[s] + Re[a] + "==") : i == 2 && (g = t[o] << 8 | t[o + 1], s = (g & 64512) >> 10, a = (g & 1008) >> 4, l = (g & 15) << 2, r += Re[s] + Re[a] + Re[l] + "="), r;
    }
    __name(As, "As");
    f();
    c2();
    p();
    d();
    m();
    function Rs(e) {
      if (!!e.generator?.previewFeatures.some((r) => r.toLowerCase().includes("metrics"))) throw new G("The `metrics` preview feature is not yet available with Accelerate.\nPlease remove `metrics` from the `previewFeatures` in your schema.\n\nMore information about Accelerate: https://pris.ly/d/accelerate", e.clientVersion);
    }
    __name(Rs, "Rs");
    f();
    c2();
    p();
    d();
    m();
    function Sc(e) {
      return e[0] * 1e3 + e[1] / 1e6;
    }
    __name(Sc, "Sc");
    function Ss(e) {
      return new Date(Sc(e));
    }
    __name(Ss, "Ss");
    f();
    c2();
    p();
    d();
    m();
    var Is = { "@prisma/debug": "workspace:*", "@prisma/engines-version": "5.22.0-44.605197351a3c8bdd595af2d2a9bc3025bca48ea2", "@prisma/fetch-engine": "workspace:*", "@prisma/get-platform": "workspace:*" };
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var or = class extends se {
      static {
        __name(this, "or");
      }
      constructor(r, n) {
        super(`Cannot fetch data from service:
${r}`, L(n, true));
        this.name = "RequestError";
        this.code = "P5010";
      }
    };
    N(or, "RequestError");
    async function Qe(e, t, r = (n) => n) {
      let n = t.clientVersion;
      try {
        return typeof fetch == "function" ? await r(fetch)(e, t) : await r(Kn)(e, t);
      } catch (i) {
        let o = i.message ?? "Unknown error";
        throw new or(o, { clientVersion: n });
      }
    }
    __name(Qe, "Qe");
    function Oc(e) {
      return { ...e.headers, "Content-Type": "application/json" };
    }
    __name(Oc, "Oc");
    function kc(e) {
      return { method: e.method, headers: Oc(e) };
    }
    __name(kc, "kc");
    function Dc(e, t) {
      return { text: /* @__PURE__ */ __name(() => Promise.resolve(w.Buffer.concat(e).toString()), "text"), json: /* @__PURE__ */ __name(() => Promise.resolve().then(() => JSON.parse(w.Buffer.concat(e).toString())), "json"), ok: t.statusCode >= 200 && t.statusCode <= 299, status: t.statusCode, url: t.url, headers: new zn(t.headers) };
    }
    __name(Dc, "Dc");
    async function Kn(e, t = {}) {
      let r = Mc("https"), n = kc(t), i = [], { origin: o } = new URL(e);
      return new Promise((s, a) => {
        let l = r.request(e, n, (u) => {
          let { statusCode: g, headers: { location: h } } = u;
          g >= 301 && g <= 399 && h && (h.startsWith("http") === false ? s(Kn(`${o}${h}`, t)) : s(Kn(h, t))), u.on("data", (v) => i.push(v)), u.on("end", () => s(Dc(i, u))), u.on("error", a);
        });
        l.on("error", a), l.end(t.body ?? "");
      });
    }
    __name(Kn, "Kn");
    var Mc = typeof __require < "u" ? __require : () => {
    };
    var zn = class {
      static {
        __name(this, "zn");
      }
      constructor(t = {}) {
        this.headers = /* @__PURE__ */ new Map();
        for (let [r, n] of Object.entries(t)) if (typeof n == "string") this.headers.set(r, n);
        else if (Array.isArray(n)) for (let i of n) this.headers.set(r, i);
      }
      append(t, r) {
        this.headers.set(t, r);
      }
      delete(t) {
        this.headers.delete(t);
      }
      get(t) {
        return this.headers.get(t) ?? null;
      }
      has(t) {
        return this.headers.has(t);
      }
      set(t, r) {
        this.headers.set(t, r);
      }
      forEach(t, r) {
        for (let [n, i] of this.headers) t.call(r, i, n, this);
      }
    };
    var Nc = /^[1-9][0-9]*\.[0-9]+\.[0-9]+$/;
    var Os = ee("prisma:client:dataproxyEngine");
    async function Fc(e, t) {
      let r = Is["@prisma/engines-version"], n = t.clientVersion ?? "unknown";
      if (y.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION) return y.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION;
      if (e.includes("accelerate") && n !== "0.0.0" && n !== "in-memory") return n;
      let [i, o] = n?.split("-") ?? [];
      if (o === void 0 && Nc.test(i)) return i;
      if (o !== void 0 || n === "0.0.0" || n === "in-memory") {
        if (e.startsWith("localhost") || e.startsWith("127.0.0.1")) return "0.0.0";
        let [s] = r.split("-") ?? [], [a, l, u] = s.split("."), g = _c(`<=${a}.${l}.${u}`), h = await Qe(g, { clientVersion: n });
        if (!h.ok) throw new Error(`Failed to fetch stable Prisma version, unpkg.com status ${h.status} ${h.statusText}, response body: ${await h.text() || "<empty body>"}`);
        let v = await h.text();
        Os("length of body fetched from unpkg.com", v.length);
        let S;
        try {
          S = JSON.parse(v);
        } catch (A) {
          throw console.error("JSON.parse error: body fetched from unpkg.com: ", v), A;
        }
        return S.version;
      }
      throw new Je("Only `major.minor.patch` versions are supported by Accelerate.", { clientVersion: n });
    }
    __name(Fc, "Fc");
    async function ks(e, t) {
      let r = await Fc(e, t);
      return Os("version", r), r;
    }
    __name(ks, "ks");
    function _c(e) {
      return encodeURI(`https://unpkg.com/prisma@${e}/package.json`);
    }
    __name(_c, "_c");
    var Ds = 3;
    var Yn = ee("prisma:client:dataproxyEngine");
    var Zn = class {
      static {
        __name(this, "Zn");
      }
      constructor({ apiKey: t, tracingHelper: r, logLevel: n, logQueries: i, engineHash: o }) {
        this.apiKey = t, this.tracingHelper = r, this.logLevel = n, this.logQueries = i, this.engineHash = o;
      }
      build({ traceparent: t, interactiveTransaction: r } = {}) {
        let n = { Authorization: `Bearer ${this.apiKey}`, "Prisma-Engine-Hash": this.engineHash };
        this.tracingHelper.isEnabled() && (n.traceparent = t ?? this.tracingHelper.getTraceParent()), r && (n["X-transaction-id"] = r.id);
        let i = this.buildCaptureSettings();
        return i.length > 0 && (n["X-capture-telemetry"] = i.join(", ")), n;
      }
      buildCaptureSettings() {
        let t = [];
        return this.tracingHelper.isEnabled() && t.push("tracing"), this.logLevel && t.push(this.logLevel), this.logQueries && t.push("query"), t;
      }
    };
    var sr = class {
      static {
        __name(this, "sr");
      }
      constructor(t) {
        this.name = "DataProxyEngine";
        Rs(t), this.config = t, this.env = { ...t.env, ...typeof y < "u" ? y.env : {} }, this.inlineSchema = As(t.inlineSchema), this.inlineDatasources = t.inlineDatasources, this.inlineSchemaHash = t.inlineSchemaHash, this.clientVersion = t.clientVersion, this.engineHash = t.engineVersion, this.logEmitter = t.logEmitter, this.tracingHelper = t.tracingHelper;
      }
      apiKey() {
        return this.headerBuilder.apiKey;
      }
      version() {
        return this.engineHash;
      }
      async start() {
        this.startPromise !== void 0 && await this.startPromise, this.startPromise = (async () => {
          let [t, r] = this.extractHostAndApiKey();
          this.host = t, this.headerBuilder = new Zn({ apiKey: r, tracingHelper: this.tracingHelper, logLevel: this.config.logLevel, logQueries: this.config.logQueries, engineHash: this.engineHash }), this.remoteClientVersion = await ks(t, this.config), Yn("host", this.host);
        })(), await this.startPromise;
      }
      async stop() {
      }
      propagateResponseExtensions(t) {
        t?.logs?.length && t.logs.forEach((r) => {
          switch (r.level) {
            case "debug":
            case "error":
            case "trace":
            case "warn":
            case "info":
              break;
            case "query": {
              let n = typeof r.attributes.query == "string" ? r.attributes.query : "";
              if (!this.tracingHelper.isEnabled()) {
                let [i] = n.split("/* traceparent");
                n = i;
              }
              this.logEmitter.emit("query", { query: n, timestamp: Ss(r.timestamp), duration: Number(r.attributes.duration_ms), params: r.attributes.params, target: r.attributes.target });
            }
          }
        }), t?.traces?.length && this.tracingHelper.createEngineSpan({ span: true, spans: t.traces });
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the remote query engine');
      }
      async url(t) {
        return await this.start(), `https://${this.host}/${this.remoteClientVersion}/${this.inlineSchemaHash}/${t}`;
      }
      async uploadSchema() {
        let t = { name: "schemaUpload", internal: true };
        return this.tracingHelper.runInChildSpan(t, async () => {
          let r = await Qe(await this.url("schema"), { method: "PUT", headers: this.headerBuilder.build(), body: this.inlineSchema, clientVersion: this.clientVersion });
          r.ok || Yn("schema response status", r.status);
          let n = await ir(r, this.clientVersion);
          if (n) throw this.logEmitter.emit("warn", { message: `Error while uploading schema: ${n.message}`, timestamp: /* @__PURE__ */ new Date(), target: "" }), n;
          this.logEmitter.emit("info", { message: `Schema (re)uploaded (hash: ${this.inlineSchemaHash})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
        });
      }
      request(t, { traceparent: r, interactiveTransaction: n, customDataProxyFetch: i }) {
        return this.requestInternal({ body: t, traceparent: r, interactiveTransaction: n, customDataProxyFetch: i });
      }
      async requestBatch(t, { traceparent: r, transaction: n, customDataProxyFetch: i }) {
        let o = n?.kind === "itx" ? n.options : void 0, s = Vr(t, n), { batchResult: a, elapsed: l } = await this.requestInternal({ body: s, customDataProxyFetch: i, interactiveTransaction: o, traceparent: r });
        return a.map((u) => "errors" in u && u.errors.length > 0 ? Gt(u.errors[0], this.clientVersion, this.config.activeProvider) : { data: u, elapsed: l });
      }
      requestInternal({ body: t, traceparent: r, customDataProxyFetch: n, interactiveTransaction: i }) {
        return this.withRetry({ actionGerund: "querying", callback: /* @__PURE__ */ __name(async ({ logHttpCall: o }) => {
          let s = i ? `${i.payload.endpoint}/graphql` : await this.url("graphql");
          o(s);
          let a = await Qe(s, { method: "POST", headers: this.headerBuilder.build({ traceparent: r, interactiveTransaction: i }), body: JSON.stringify(t), clientVersion: this.clientVersion }, n);
          a.ok || Yn("graphql response status", a.status), await this.handleError(await ir(a, this.clientVersion));
          let l = await a.json(), u = l.extensions;
          if (u && this.propagateResponseExtensions(u), l.errors) throw l.errors.length === 1 ? Gt(l.errors[0], this.config.clientVersion, this.config.activeProvider) : new ne(l.errors, { clientVersion: this.config.clientVersion });
          return l;
        }, "callback") });
      }
      async transaction(t, r, n) {
        let i = { start: "starting", commit: "committing", rollback: "rolling back" };
        return this.withRetry({ actionGerund: `${i[t]} transaction`, callback: /* @__PURE__ */ __name(async ({ logHttpCall: o }) => {
          if (t === "start") {
            let s = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel }), a = await this.url("transaction/start");
            o(a);
            let l = await Qe(a, { method: "POST", headers: this.headerBuilder.build({ traceparent: r.traceparent }), body: s, clientVersion: this.clientVersion });
            await this.handleError(await ir(l, this.clientVersion));
            let u = await l.json(), g = u.extensions;
            g && this.propagateResponseExtensions(g);
            let h = u.id, v = u["data-proxy"].endpoint;
            return { id: h, payload: { endpoint: v } };
          } else {
            let s = `${n.payload.endpoint}/${t}`;
            o(s);
            let a = await Qe(s, { method: "POST", headers: this.headerBuilder.build({ traceparent: r.traceparent }), clientVersion: this.clientVersion });
            await this.handleError(await ir(a, this.clientVersion));
            let u = (await a.json()).extensions;
            u && this.propagateResponseExtensions(u);
            return;
          }
        }, "callback") });
      }
      extractHostAndApiKey() {
        let t = { clientVersion: this.clientVersion }, r = Object.keys(this.inlineDatasources)[0], n = yt({ inlineDatasources: this.inlineDatasources, overrideDatasources: this.config.overrideDatasources, clientVersion: this.clientVersion, env: this.env }), i;
        try {
          i = new URL(n);
        } catch {
          throw new je(`Error validating datasource \`${r}\`: the URL must start with the protocol \`prisma://\``, t);
        }
        let { protocol: o, host: s, searchParams: a } = i;
        if (o !== "prisma:" && o !== "prisma+postgres:") throw new je(`Error validating datasource \`${r}\`: the URL must start with the protocol \`prisma://\``, t);
        let l = a.get("api_key");
        if (l === null || l.length < 1) throw new je(`Error validating datasource \`${r}\`: the URL must contain a valid API key`, t);
        return [s, l];
      }
      metrics() {
        throw new Je("Metrics are not yet supported for Accelerate", { clientVersion: this.clientVersion });
      }
      async withRetry(t) {
        for (let r = 0; ; r++) {
          let n = /* @__PURE__ */ __name((i) => {
            this.logEmitter.emit("info", { message: `Calling ${i} (n=${r})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          }, "n");
          try {
            return await t.callback({ logHttpCall: n });
          } catch (i) {
            if (!(i instanceof se) || !i.isRetryable) throw i;
            if (r >= Ds) throw i instanceof wt ? i.cause : i;
            this.logEmitter.emit("warn", { message: `Attempt ${r + 1}/${Ds} failed for ${t.actionGerund}: ${i.message ?? "(unknown)"}`, timestamp: /* @__PURE__ */ new Date(), target: "" });
            let o = await Cs(r);
            this.logEmitter.emit("warn", { message: `Retrying after ${o}ms`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          }
        }
      }
      async handleError(t) {
        if (t instanceof Ge) throw await this.uploadSchema(), new wt({ clientVersion: this.clientVersion, cause: t });
        if (t) throw t;
      }
      applyPendingMigrations() {
        throw new Error("Method not implemented.");
      }
    };
    function Ms({ copyEngine: e = true }, t) {
      let r;
      try {
        r = yt({ inlineDatasources: t.inlineDatasources, overrideDatasources: t.overrideDatasources, env: { ...t.env, ...y.env }, clientVersion: t.clientVersion });
      } catch {
      }
      let n = !!(r?.startsWith("prisma://") || r?.startsWith("prisma+postgres://"));
      e && n && Ot("recommend--no-engine", "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)");
      let i = Rt(t.generator), o = n || !e, s = !!t.adapter, a = i === "library", l = i === "binary";
      if (o && s || s) {
        let u;
        throw u = ["Prisma Client was configured to use the `adapter` option but it was imported via its `/edge` endpoint.", "Please either remove the `/edge` endpoint or remove the `adapter` from the Prisma Client constructor."], new K(u.join(`
`), { clientVersion: t.clientVersion });
      }
      if (o) return new sr(t);
      throw new K("Invalid client engine type, please use `library` or `binary`", { clientVersion: t.clientVersion });
    }
    __name(Ms, "Ms");
    f();
    c2();
    p();
    d();
    m();
    function Hr({ generator: e }) {
      return e?.previewFeatures ?? [];
    }
    __name(Hr, "Hr");
    f();
    c2();
    p();
    d();
    m();
    var Ns = /* @__PURE__ */ __name((e) => ({ command: e }), "Ns");
    f();
    c2();
    p();
    d();
    m();
    f();
    c2();
    p();
    d();
    m();
    var Fs = /* @__PURE__ */ __name((e) => e.strings.reduce((t, r, n) => `${t}@P${n}${r}`), "Fs");
    f();
    c2();
    p();
    d();
    m();
    function xt(e) {
      try {
        return _s(e, "fast");
      } catch {
        return _s(e, "slow");
      }
    }
    __name(xt, "xt");
    function _s(e, t) {
      return JSON.stringify(e.map((r) => qs(r, t)));
    }
    __name(_s, "_s");
    function qs(e, t) {
      return Array.isArray(e) ? e.map((r) => qs(r, t)) : typeof e == "bigint" ? { prisma__type: "bigint", prisma__value: e.toString() } : it(e) ? { prisma__type: "date", prisma__value: e.toJSON() } : fe.isDecimal(e) ? { prisma__type: "decimal", prisma__value: e.toJSON() } : w.Buffer.isBuffer(e) ? { prisma__type: "bytes", prisma__value: e.toString("base64") } : Lc(e) || ArrayBuffer.isView(e) ? { prisma__type: "bytes", prisma__value: w.Buffer.from(e).toString("base64") } : typeof e == "object" && t === "slow" ? Bs(e) : e;
    }
    __name(qs, "qs");
    function Lc(e) {
      return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer ? true : typeof e == "object" && e !== null ? e[Symbol.toStringTag] === "ArrayBuffer" || e[Symbol.toStringTag] === "SharedArrayBuffer" : false;
    }
    __name(Lc, "Lc");
    function Bs(e) {
      if (typeof e != "object" || e === null) return e;
      if (typeof e.toJSON == "function") return e.toJSON();
      if (Array.isArray(e)) return e.map(Ls);
      let t = {};
      for (let r of Object.keys(e)) t[r] = Ls(e[r]);
      return t;
    }
    __name(Bs, "Bs");
    function Ls(e) {
      return typeof e == "bigint" ? e.toString() : Bs(e);
    }
    __name(Ls, "Ls");
    f();
    c2();
    p();
    d();
    m();
    var qc = ["$connect", "$disconnect", "$on", "$transaction", "$use", "$extends"];
    var Us = qc;
    var Bc = /^(\s*alter\s)/i;
    var $s = ee("prisma:client");
    function Xn(e, t, r, n) {
      if (!(e !== "postgresql" && e !== "cockroachdb") && r.length > 0 && Bc.exec(t)) throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
    }
    __name(Xn, "Xn");
    var ei = /* @__PURE__ */ __name(({ clientMethod: e, activeProvider: t }) => (r) => {
      let n = "", i;
      if (Jo(r)) n = r.sql, i = { values: xt(r.values), __prismaRawParameters__: true };
      else if (Array.isArray(r)) {
        let [o, ...s] = r;
        n = o, i = { values: xt(s || []), __prismaRawParameters__: true };
      } else switch (t) {
        case "sqlite":
        case "mysql": {
          n = r.sql, i = { values: xt(r.values), __prismaRawParameters__: true };
          break;
        }
        case "cockroachdb":
        case "postgresql":
        case "postgres": {
          n = r.text, i = { values: xt(r.values), __prismaRawParameters__: true };
          break;
        }
        case "sqlserver": {
          n = Fs(r), i = { values: xt(r.values), __prismaRawParameters__: true };
          break;
        }
        default:
          throw new Error(`The ${t} provider does not support ${e}`);
      }
      return i?.values ? $s(`prisma.${e}(${n}, ${i.values})`) : $s(`prisma.${e}(${n})`), { query: n, parameters: i };
    }, "ei");
    var Vs = { requestArgsToMiddlewareArgs(e) {
      return [e.strings, ...e.values];
    }, middlewareArgsToRequestArgs(e) {
      let [t, ...r] = e;
      return new oe(t, r);
    } };
    var js = { requestArgsToMiddlewareArgs(e) {
      return [e];
    }, middlewareArgsToRequestArgs(e) {
      return e[0];
    } };
    f();
    c2();
    p();
    d();
    m();
    function ti(e) {
      return function(r) {
        let n, i = /* @__PURE__ */ __name((o = e) => {
          try {
            return o === void 0 || o?.kind === "itx" ? n ??= Js(r(o)) : Js(r(o));
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
    __name(ti, "ti");
    function Js(e) {
      return typeof e.then == "function" ? e : Promise.resolve(e);
    }
    __name(Js, "Js");
    f();
    c2();
    p();
    d();
    m();
    var Gs = { isEnabled() {
      return false;
    }, getTraceParent() {
      return "00-10-10-00";
    }, async createEngineSpan() {
    }, getActiveContext() {
    }, runInChildSpan(e, t) {
      return t();
    } };
    var ri = class {
      static {
        __name(this, "ri");
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
        return globalThis.PRISMA_INSTRUMENTATION?.helper ?? Gs;
      }
    };
    function Qs(e) {
      return e.includes("tracing") ? new ri() : Gs;
    }
    __name(Qs, "Qs");
    f();
    c2();
    p();
    d();
    m();
    function Hs(e, t = () => {
    }) {
      let r, n = new Promise((i) => r = i);
      return { then(i) {
        return --e === 0 && r(t()), i?.(n);
      } };
    }
    __name(Hs, "Hs");
    f();
    c2();
    p();
    d();
    m();
    function Ws(e) {
      return typeof e == "string" ? e : e.reduce((t, r) => {
        let n = typeof r == "string" ? r : r.level;
        return n === "query" ? t : t && (r === "info" || t === "info") ? "info" : n;
      }, void 0);
    }
    __name(Ws, "Ws");
    f();
    c2();
    p();
    d();
    m();
    var Wr = class {
      static {
        __name(this, "Wr");
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
    f();
    c2();
    p();
    d();
    m();
    var Ys = qe(Xi());
    f();
    c2();
    p();
    d();
    m();
    function Kr(e) {
      return typeof e.batchRequestIdx == "number";
    }
    __name(Kr, "Kr");
    f();
    c2();
    p();
    d();
    m();
    function Ks(e) {
      if (e.action !== "findUnique" && e.action !== "findUniqueOrThrow") return;
      let t = [];
      return e.modelName && t.push(e.modelName), e.query.arguments && t.push(ni(e.query.arguments)), t.push(ni(e.query.selection)), t.join("");
    }
    __name(Ks, "Ks");
    function ni(e) {
      return `(${Object.keys(e).sort().map((r) => {
        let n = e[r];
        return typeof n == "object" && n !== null ? `(${r} ${ni(n)})` : r;
      }).join(" ")})`;
    }
    __name(ni, "ni");
    f();
    c2();
    p();
    d();
    m();
    var Uc = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateOne: true, upsertOne: true };
    function ii(e) {
      return Uc[e];
    }
    __name(ii, "ii");
    f();
    c2();
    p();
    d();
    m();
    var zr = class {
      static {
        __name(this, "zr");
      }
      constructor(t) {
        this.options = t;
        this.tickActive = false;
        this.batches = {};
      }
      request(t) {
        let r = this.options.batchBy(t);
        return r ? (this.batches[r] || (this.batches[r] = [], this.tickActive || (this.tickActive = true, y.nextTick(() => {
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
    f();
    c2();
    p();
    d();
    m();
    function He(e, t) {
      if (t === null) return t;
      switch (e) {
        case "bigint":
          return BigInt(t);
        case "bytes":
          return w.Buffer.from(t, "base64");
        case "decimal":
          return new fe(t);
        case "datetime":
        case "date":
          return new Date(t);
        case "time":
          return /* @__PURE__ */ new Date(`1970-01-01T${t}Z`);
        case "bigint-array":
          return t.map((r) => He("bigint", r));
        case "bytes-array":
          return t.map((r) => He("bytes", r));
        case "decimal-array":
          return t.map((r) => He("decimal", r));
        case "datetime-array":
          return t.map((r) => He("datetime", r));
        case "date-array":
          return t.map((r) => He("date", r));
        case "time-array":
          return t.map((r) => He("time", r));
        default:
          return t;
      }
    }
    __name(He, "He");
    function zs(e) {
      let t = [], r = $c(e);
      for (let n = 0; n < e.rows.length; n++) {
        let i = e.rows[n], o = { ...r };
        for (let s = 0; s < i.length; s++) o[e.columns[s]] = He(e.types[s], i[s]);
        t.push(o);
      }
      return t;
    }
    __name(zs, "zs");
    function $c(e) {
      let t = {};
      for (let r = 0; r < e.columns.length; r++) t[e.columns[r]] = null;
      return t;
    }
    __name($c, "$c");
    var Vc = ee("prisma:client:request_handler");
    var Yr = class {
      static {
        __name(this, "Yr");
      }
      constructor(t, r) {
        this.logEmitter = r, this.client = t, this.dataloader = new zr({ batchLoader: ys(async ({ requests: n, customDataProxyFetch: i }) => {
          let { transaction: o, otelParentCtx: s } = n[0], a = n.map((h) => h.protocolQuery), l = this.client._tracingHelper.getTraceParent(s), u = n.some((h) => ii(h.protocolQuery.action));
          return (await this.client._engine.requestBatch(a, { traceparent: l, transaction: jc(o), containsWrite: u, customDataProxyFetch: i })).map((h, v) => {
            if (h instanceof Error) return h;
            try {
              return this.mapQueryEngineResult(n[v], h);
            } catch (S) {
              return S;
            }
          });
        }), singleLoader: /* @__PURE__ */ __name(async (n) => {
          let i = n.transaction?.kind === "itx" ? Zs(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: i, isWrite: ii(n.protocolQuery.action), customDataProxyFetch: n.customDataProxyFetch });
          return this.mapQueryEngineResult(n, o);
        }, "singleLoader"), batchBy: /* @__PURE__ */ __name((n) => n.transaction?.id ? `transaction-${n.transaction.id}` : Ks(n.protocolQuery), "batchBy"), batchOrder(n, i) {
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
        return y.env.PRISMA_CLIENT_GET_TIME ? { data: s, elapsed: o } : s;
      }
      handleAndLogRequestError(t) {
        try {
          this.handleRequestError(t);
        } catch (r) {
          throw this.logEmitter && this.logEmitter.emit("error", { message: r.message, target: t.clientMethod, timestamp: /* @__PURE__ */ new Date() }), r;
        }
      }
      handleRequestError({ error: t, clientMethod: r, callsite: n, transaction: i, args: o, modelName: s, globalOmit: a }) {
        if (Vc(t), Jc(t, i) || t instanceof ve) throw t;
        if (t instanceof W && Gc(t)) {
          let u = Xs(t.meta);
          Fr({ args: o, errors: [u], callsite: n, errorFormat: this.client._errorFormat, originalMethod: r, clientVersion: this.client._clientVersion, globalOmit: a });
        }
        let l = t.message;
        if (n && (l = st({ callsite: n, originalMethod: r, isPanic: t.isPanic, showColors: this.client._errorFormat === "pretty", message: l })), l = this.sanitizeMessage(l), t.code) {
          let u = s ? { modelName: s, ...t.meta } : t.meta;
          throw new W(l, { code: t.code, clientVersion: this.client._clientVersion, meta: u, batchRequestIdx: t.batchRequestIdx });
        } else {
          if (t.isPanic) throw new Te(l, this.client._clientVersion);
          if (t instanceof ne) throw new ne(l, { clientVersion: this.client._clientVersion, batchRequestIdx: t.batchRequestIdx });
          if (t instanceof G) throw new G(l, this.client._clientVersion);
          if (t instanceof Te) throw new Te(l, this.client._clientVersion);
        }
        throw t.clientVersion = this.client._clientVersion, t;
      }
      sanitizeMessage(t) {
        return this.client._errorFormat && this.client._errorFormat !== "pretty" ? (0, Ys.default)(t) : t;
      }
      unpack(t, r, n) {
        if (!t || (t.data && (t = t.data), !t)) return t;
        let i = Object.keys(t)[0], o = Object.values(t)[0], s = r.filter((u) => u !== "select" && u !== "include"), a = Bn(o, s), l = i === "queryRaw" ? zs(a) : rt(a);
        return n ? n(l) : l;
      }
      get [Symbol.toStringTag]() {
        return "RequestHandler";
      }
    };
    function jc(e) {
      if (e) {
        if (e.kind === "batch") return { kind: "batch", options: { isolationLevel: e.isolationLevel } };
        if (e.kind === "itx") return { kind: "itx", options: Zs(e) };
        Pe(e, "Unknown transaction kind");
      }
    }
    __name(jc, "jc");
    function Zs(e) {
      return { id: e.id, payload: e.payload };
    }
    __name(Zs, "Zs");
    function Jc(e, t) {
      return Kr(e) && t?.kind === "batch" && e.batchRequestIdx !== t.index;
    }
    __name(Jc, "Jc");
    function Gc(e) {
      return e.code === "P2009" || e.code === "P2012";
    }
    __name(Gc, "Gc");
    function Xs(e) {
      if (e.kind === "Union") return { kind: "Union", errors: e.errors.map(Xs) };
      if (Array.isArray(e.selectionPath)) {
        let [, ...t] = e.selectionPath;
        return { ...e, selectionPath: t };
      }
      return e;
    }
    __name(Xs, "Xs");
    f();
    c2();
    p();
    d();
    m();
    var ea = "5.22.0";
    var ta = ea;
    f();
    c2();
    p();
    d();
    m();
    var sa = qe(Tn());
    f();
    c2();
    p();
    d();
    m();
    var B = class extends Error {
      static {
        __name(this, "B");
      }
      constructor(t) {
        super(t + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientConstructorValidationError";
      }
    };
    N(B, "PrismaClientConstructorValidationError");
    var ra = ["datasources", "datasourceUrl", "errorFormat", "adapter", "log", "transactionOptions", "omit", "__internal"];
    var na = ["pretty", "colorless", "minimal"];
    var ia = ["info", "query", "warn", "error"];
    var Hc = { datasources: /* @__PURE__ */ __name((e, { datasourceNames: t }) => {
      if (e) {
        if (typeof e != "object" || Array.isArray(e)) throw new B(`Invalid value ${JSON.stringify(e)} for "datasources" provided to PrismaClient constructor`);
        for (let [r, n] of Object.entries(e)) {
          if (!t.includes(r)) {
            let i = Pt(r, t) || ` Available datasources: ${t.join(", ")}`;
            throw new B(`Unknown datasource ${r} provided to PrismaClient constructor.${i}`);
          }
          if (typeof n != "object" || Array.isArray(n)) throw new B(`Invalid value ${JSON.stringify(e)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (n && typeof n == "object") for (let [i, o] of Object.entries(n)) {
            if (i !== "url") throw new B(`Invalid value ${JSON.stringify(e)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            if (typeof o != "string") throw new B(`Invalid value ${JSON.stringify(o)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          }
        }
      }
    }, "datasources"), adapter: /* @__PURE__ */ __name((e, t) => {
      if (e === null) return;
      if (e === void 0) throw new B('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
      if (!Hr(t).includes("driverAdapters")) throw new B('"adapter" property can only be provided to PrismaClient constructor when "driverAdapters" preview feature is enabled.');
      if (Rt() === "binary") throw new B('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
    }, "adapter"), datasourceUrl: /* @__PURE__ */ __name((e) => {
      if (typeof e < "u" && typeof e != "string") throw new B(`Invalid value ${JSON.stringify(e)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
    }, "datasourceUrl"), errorFormat: /* @__PURE__ */ __name((e) => {
      if (e) {
        if (typeof e != "string") throw new B(`Invalid value ${JSON.stringify(e)} for "errorFormat" provided to PrismaClient constructor.`);
        if (!na.includes(e)) {
          let t = Pt(e, na);
          throw new B(`Invalid errorFormat ${e} provided to PrismaClient constructor.${t}`);
        }
      }
    }, "errorFormat"), log: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      if (!Array.isArray(e)) throw new B(`Invalid value ${JSON.stringify(e)} for "log" provided to PrismaClient constructor.`);
      function t(r) {
        if (typeof r == "string" && !ia.includes(r)) {
          let n = Pt(r, ia);
          throw new B(`Invalid log level "${r}" provided to PrismaClient constructor.${n}`);
        }
      }
      __name(t, "t");
      for (let r of e) {
        t(r);
        let n = { level: t, emit: /* @__PURE__ */ __name((i) => {
          let o = ["stdout", "event"];
          if (!o.includes(i)) {
            let s = Pt(i, o);
            throw new B(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`);
          }
        }, "emit") };
        if (r && typeof r == "object") for (let [i, o] of Object.entries(r)) if (n[i]) n[i](o);
        else throw new B(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
      }
    }, "log"), transactionOptions: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      let t = e.maxWait;
      if (t != null && t <= 0) throw new B(`Invalid value ${t} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
      let r = e.timeout;
      if (r != null && r <= 0) throw new B(`Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
    }, "transactionOptions"), omit: /* @__PURE__ */ __name((e, t) => {
      if (typeof e != "object") throw new B('"omit" option is expected to be an object.');
      if (e === null) throw new B('"omit" option can not be `null`');
      let r = [];
      for (let [n, i] of Object.entries(e)) {
        let o = Kc(n, t.runtimeDataModel);
        if (!o) {
          r.push({ kind: "UnknownModel", modelKey: n });
          continue;
        }
        for (let [s, a] of Object.entries(i)) {
          let l = o.fields.find((u) => u.name === s);
          if (!l) {
            r.push({ kind: "UnknownField", modelKey: n, fieldName: s });
            continue;
          }
          if (l.relationName) {
            r.push({ kind: "RelationInOmit", modelKey: n, fieldName: s });
            continue;
          }
          typeof a != "boolean" && r.push({ kind: "InvalidFieldValue", modelKey: n, fieldName: s });
        }
      }
      if (r.length > 0) throw new B(zc(e, r));
    }, "omit"), __internal: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      let t = ["debug", "engine", "configOverride"];
      if (typeof e != "object") throw new B(`Invalid value ${JSON.stringify(e)} for "__internal" to PrismaClient constructor`);
      for (let [r] of Object.entries(e)) if (!t.includes(r)) {
        let n = Pt(r, t);
        throw new B(`Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`);
      }
    }, "__internal") };
    function aa(e, t) {
      for (let [r, n] of Object.entries(e)) {
        if (!ra.includes(r)) {
          let i = Pt(r, ra);
          throw new B(`Unknown property ${r} provided to PrismaClient constructor.${i}`);
        }
        Hc[r](n, t);
      }
      if (e.datasourceUrl && e.datasources) throw new B('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
    }
    __name(aa, "aa");
    function Pt(e, t) {
      if (t.length === 0 || typeof e != "string") return "";
      let r = Wc(e, t);
      return r ? ` Did you mean "${r}"?` : "";
    }
    __name(Pt, "Pt");
    function Wc(e, t) {
      if (t.length === 0) return null;
      let r = t.map((i) => ({ value: i, distance: (0, sa.default)(e, i) }));
      r.sort((i, o) => i.distance < o.distance ? -1 : 1);
      let n = r[0];
      return n.distance < 3 ? n.value : null;
    }
    __name(Wc, "Wc");
    function Kc(e, t) {
      return oa(t.models, e) ?? oa(t.types, e);
    }
    __name(Kc, "Kc");
    function oa(e, t) {
      let r = Object.keys(e).find((n) => nt(n) === t);
      if (r) return e[r];
    }
    __name(oa, "oa");
    function zc(e, t) {
      let r = dt(e);
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
      let { message: n, args: i } = Nr(r, "colorless");
      return `Error validating "omit" option:

${i}

${n}`;
    }
    __name(zc, "zc");
    f();
    c2();
    p();
    d();
    m();
    function la(e) {
      return e.length === 0 ? Promise.resolve([]) : new Promise((t, r) => {
        let n = new Array(e.length), i = null, o = false, s = 0, a = /* @__PURE__ */ __name(() => {
          o || (s++, s === e.length && (o = true, i ? r(i) : t(n)));
        }, "a"), l = /* @__PURE__ */ __name((u) => {
          o || (o = true, r(u));
        }, "l");
        for (let u = 0; u < e.length; u++) e[u].then((g) => {
          n[u] = g, a();
        }, (g) => {
          if (!Kr(g)) {
            l(g);
            return;
          }
          g.batchRequestIdx === u ? l(g) : (i || (i = g), a());
        });
      });
    }
    __name(la, "la");
    var _e = ee("prisma:client");
    typeof globalThis == "object" && (globalThis.NODE_CLIENT = true);
    var Yc = { requestArgsToMiddlewareArgs: /* @__PURE__ */ __name((e) => e, "requestArgsToMiddlewareArgs"), middlewareArgsToRequestArgs: /* @__PURE__ */ __name((e) => e, "middlewareArgsToRequestArgs") };
    var Zc = Symbol.for("prisma.client.transaction.id");
    var Xc = { id: 0, nextId() {
      return ++this.id;
    } };
    function pa(e) {
      class t {
        static {
          __name(this, "t");
        }
        constructor(n) {
          this._originalClient = this;
          this._middlewares = new Wr();
          this._createPrismaPromise = ti();
          this.$extends = us;
          e = n?.__internal?.configOverride?.(e) ?? e, Ps(e), n && aa(n, e);
          let i = new yr().on("error", () => {
          });
          this._extensions = mt.empty(), this._previewFeatures = Hr(e), this._clientVersion = e.clientVersion ?? ta, this._activeProvider = e.activeProvider, this._globalOmit = n?.omit, this._tracingHelper = Qs(this._previewFeatures);
          let o = { rootEnvPath: e.relativeEnvPaths.rootEnvPath && At.resolve(e.dirname, e.relativeEnvPaths.rootEnvPath), schemaEnvPath: e.relativeEnvPaths.schemaEnvPath && At.resolve(e.dirname, e.relativeEnvPaths.schemaEnvPath) }, s;
          if (n?.adapter) {
            s = Fn(n.adapter);
            let l = e.activeProvider === "postgresql" ? "postgres" : e.activeProvider;
            if (s.provider !== l) throw new G(`The Driver Adapter \`${s.adapterName}\`, based on \`${s.provider}\`, is not compatible with the provider \`${l}\` specified in the Prisma schema.`, this._clientVersion);
            if (n.datasources || n.datasourceUrl !== void 0) throw new G("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.", this._clientVersion);
          }
          let a = e.injectableEdgeEnv?.();
          try {
            let l = n ?? {}, u = l.__internal ?? {}, g = u.debug === true;
            g && ee.enable("prisma:client");
            let h = At.resolve(e.dirname, e.relativePath);
            Si.existsSync(h) || (h = e.dirname), _e("dirname", e.dirname), _e("relativePath", e.relativePath), _e("cwd", h);
            let v = u.engine || {};
            if (l.errorFormat ? this._errorFormat = l.errorFormat : y.env.NODE_ENV === "production" ? this._errorFormat = "minimal" : y.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = e.runtimeDataModel, this._engineConfig = { cwd: h, dirname: e.dirname, enableDebugLogs: g, allowTriggerPanic: v.allowTriggerPanic, datamodelPath: At.join(e.dirname, e.filename ?? "schema.prisma"), prismaPath: v.binaryPath ?? void 0, engineEndpoint: v.endpoint, generator: e.generator, showColors: this._errorFormat === "pretty", logLevel: l.log && Ws(l.log), logQueries: l.log && !!(typeof l.log == "string" ? l.log === "query" : l.log.find((S) => typeof S == "string" ? S === "query" : S.level === "query")), env: a?.parsed ?? {}, flags: [], engineWasm: e.engineWasm, clientVersion: e.clientVersion, engineVersion: e.engineVersion, previewFeatures: this._previewFeatures, activeProvider: e.activeProvider, inlineSchema: e.inlineSchema, overrideDatasources: vs(l, e.datasourceNames), inlineDatasources: e.inlineDatasources, inlineSchemaHash: e.inlineSchemaHash, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: l.transactionOptions?.maxWait ?? 2e3, timeout: l.transactionOptions?.timeout ?? 5e3, isolationLevel: l.transactionOptions?.isolationLevel }, logEmitter: i, isBundled: e.isBundled, adapter: s }, this._accelerateEngineConfig = { ...this._engineConfig, accelerateUtils: { resolveDatasourceUrl: yt, getBatchRequestPayload: Vr, prismaGraphQLToJSError: Gt, PrismaClientUnknownRequestError: ne, PrismaClientInitializationError: G, PrismaClientKnownRequestError: W, debug: ee("prisma:client:accelerateEngine"), engineVersion: ca.version, clientVersion: e.clientVersion } }, _e("clientVersion", e.clientVersion), this._engine = Ms(e, this._engineConfig), this._requestHandler = new Yr(this, i), l.log) for (let S of l.log) {
              let A = typeof S == "string" ? S : S.emit === "stdout" ? S.level : null;
              A && this.$on(A, (R) => {
                It.log(`${It.tags[A] ?? ""}`, R.message || R.query);
              });
            }
            this._metrics = new ft(this._engine);
          } catch (l) {
            throw l.clientVersion = this._clientVersion, l;
          }
          return this._appliedParent = Qt(this);
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
            Vi();
          }
        }
        $executeRawInternal(n, i, o, s) {
          let a = this._activeProvider;
          return this._request({ action: "executeRaw", args: o, transaction: n, clientMethod: i, argsMapper: ei({ clientMethod: i, activeProvider: a }), callsite: Fe(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $executeRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) {
              let [s, a] = ua(n, i);
              return Xn(this._activeProvider, s.text, s.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s, a);
            }
            throw new K("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
          });
        }
        $executeRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => (Xn(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])));
        }
        $runCommandRaw(n) {
          if (e.activeProvider !== "mongodb") throw new K(`The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
          return this._createPrismaPromise((i) => this._request({ args: n, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: Ns, callsite: Fe(this._errorFormat), transaction: i }));
        }
        async $queryRawInternal(n, i, o, s) {
          let a = this._activeProvider;
          return this._request({ action: "queryRaw", args: o, transaction: n, clientMethod: i, argsMapper: ei({ clientMethod: i, activeProvider: a }), callsite: Fe(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $queryRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) return this.$queryRawInternal(o, "$queryRaw", ...ua(n, i));
            throw new K("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
          });
        }
        $queryRawTyped(n) {
          return this._createPrismaPromise((i) => {
            if (!this._hasPreviewFlag("typedSql")) throw new K("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
            return this.$queryRawInternal(i, "$queryRawTyped", n);
          });
        }
        $queryRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i]));
        }
        _transactionWithArray({ promises: n, options: i }) {
          let o = Xc.nextId(), s = Hs(n.length), a = n.map((l, u) => {
            if (l?.[Symbol.toStringTag] !== "PrismaPromise") throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
            let g = i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, h = { kind: "batch", id: o, index: u, isolationLevel: g, lock: s };
            return l.requestTransaction?.(h) ?? l;
          });
          return la(a);
        }
        async _transactionWithCallback({ callback: n, options: i }) {
          let o = { traceparent: this._tracingHelper.getTraceParent() }, s = { maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel }, a = await this._engine.transaction("start", o, s), l;
          try {
            let u = { kind: "itx", ...a };
            l = await n(this._createItxClient(u)), await this._engine.transaction("commit", o, a);
          } catch (u) {
            throw await this._engine.transaction("rollback", o, a).catch(() => {
            }), u;
          }
          return l;
        }
        _createItxClient(n) {
          return Qt(be(ls(this), [te("_appliedParent", () => this._appliedParent._createItxClient(n)), te("_createPrismaPromise", () => ti(n)), te(Zc, () => n.id), gt(Us)]));
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
          let i = n.middlewareArgsMapper ?? Yc, o = { args: i.requestArgsToMiddlewareArgs(n.args), dataPath: n.dataPath, runInTransaction: !!n.transaction, action: n.action, model: n.model }, s = { middleware: { name: "middleware", middleware: true, attributes: { method: "$use" }, active: false }, operation: { name: "operation", attributes: { method: o.action, model: o.model, name: o.model ? `${o.model}.${o.action}` : o.action } } }, a = -1, l = /* @__PURE__ */ __name(async (u) => {
            let g = this._middlewares.get(++a);
            if (g) return this._tracingHelper.runInChildSpan(s.middleware, (M) => g(u, (F) => (M?.end(), l(F))));
            let { runInTransaction: h, args: v, ...S } = u, A = { ...n, ...S };
            v && (A.args = i.middlewareArgsToRequestArgs(v)), n.transaction !== void 0 && h === false && delete A.transaction;
            let R = await hs(this, A);
            return A.model ? ds({ result: R, modelName: A.model, args: A.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit }) : R;
          }, "l");
          return this._tracingHelper.runInChildSpan(s.operation, () => l(o));
        }
        async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s, action: a, model: l, argsMapper: u, transaction: g, unpacker: h, otelParentCtx: v, customDataProxyFetch: S }) {
          try {
            n = u ? u(n) : n;
            let A = { name: "serialize" }, R = this._tracingHelper.runInChildSpan(A, () => qr({ modelName: l, runtimeDataModel: this._runtimeDataModel, action: a, args: n, clientMethod: i, callsite: s, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
            return ee.enabled("prisma:client") && (_e("Prisma Client call:"), _e(`prisma.${i}(${Yo(n)})`), _e("Generated request:"), _e(JSON.stringify(R, null, 2) + `
`)), g?.kind === "batch" && await g.lock, this._requestHandler.request({ protocolQuery: R, modelName: l, action: a, clientMethod: i, dataPath: o, callsite: s, args: n, extensions: this._extensions, transaction: g, unpacker: h, otelParentCtx: v, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: S });
          } catch (A) {
            throw A.clientVersion = this._clientVersion, A;
          }
        }
        get $metrics() {
          if (!this._hasPreviewFlag("metrics")) throw new K("`metrics` preview feature must be enabled in order to access metrics API", { clientVersion: this._clientVersion });
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
    __name(pa, "pa");
    function ua(e, t) {
      return ep(e) ? [new oe(e, t), Vs] : [e, js];
    }
    __name(ua, "ua");
    function ep(e) {
      return Array.isArray(e) && Array.isArray(e.raw);
    }
    __name(ep, "ep");
    f();
    c2();
    p();
    d();
    m();
    var tp = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
    function da(e) {
      return new Proxy(e, { get(t, r) {
        if (r in t) return t[r];
        if (!tp.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
      } });
    }
    __name(da, "da");
    f();
    c2();
    p();
    d();
    m();
  }
});

// node_modules/.prisma/client/edge.js
var require_edge2 = __commonJS({
  "node_modules/.prisma/client/edge.js"(exports) {
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
    } = require_edge();
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
    config.runtimeDataModel = JSON.parse('{"models":{"User":{"dbName":"users","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"username","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"password","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"role","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"USER","isGenerated":false,"isUpdatedAt":false},{"name":"avatarUrl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"phone","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"isActive","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"baziData","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"BaziData","relationName":"BaziDataToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"orders","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Order","relationName":"OrderToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"master","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Master","relationName":"MasterToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"Chat","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Chat","relationName":"ChatToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"BaziData":{"dbName":"bazi_data","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"inputData","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"resultData","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"analysis","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"BaziDataToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Order":{"dbName":"orders","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"amount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"PENDING","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"metadata","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"OrderToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Master":{"dbName":"masters","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"price","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"rating","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"available","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"MasterToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"Chat","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Chat","relationName":"ChatToMaster","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Chat":{"dbName":"chats","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"masterId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"messages","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"active","isGenerated":false,"isUpdatedAt":false},{"name":"lastMessage","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"isRead","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"ChatToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"master","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Master","relationName":"ChatToMaster","relationFromFields":["masterId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{},"types":{}}');
    defineDmmfProperty2(exports.Prisma, config.runtimeDataModel);
    config.engineWasm = void 0;
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

// node_modules/@prisma/client/edge.js
var require_edge3 = __commonJS({
  "node_modules/@prisma/client/edge.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    module.exports = {
      // https://github.com/prisma/prisma/pull/12907
      ...require_edge2()
    };
  }
});

// .wrangler/tmp/bundle-Ad5A9R/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();

// .wrangler/tmp/bundle-Ad5A9R/middleware-insertion-facade.js
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
var import_edge = __toESM(require_edge3());
var prisma;
function getPrismaClient2(env) {
  if (!prisma) {
    const adapter = new PrismaD1(env.DB);
    prisma = new import_edge.PrismaClient({
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

// .wrangler/tmp/bundle-Ad5A9R/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-Ad5A9R/middleware-loader.entry.ts
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
