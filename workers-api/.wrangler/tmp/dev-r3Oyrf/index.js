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

// .wrangler/tmp/bundle-OiAAjT/checked-fetch.js
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
  ".wrangler/tmp/bundle-OiAAjT/checked-fetch.js"() {
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

// node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/.prisma/client/edge.js
var require_edge = __commonJS({
  "node_modules/.prisma/client/edge.js"(exports, module) {
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
    var default_index_exports = {};
    __export(default_index_exports, {
      Prisma: /* @__PURE__ */ __name(() => Prisma, "Prisma"),
      PrismaClient: /* @__PURE__ */ __name(() => PrismaClient2, "PrismaClient"),
      default: /* @__PURE__ */ __name(() => default_index_default, "default")
    });
    module.exports = __toCommonJS(default_index_exports);
    var prisma2 = {
      enginesVersion: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
    };
    var version = "5.22.0";
    var clientVersion = version;
    var PrismaClient2 = class {
      static {
        __name(this, "PrismaClient");
      }
      constructor() {
        throw new Error('@prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.');
      }
    };
    function defineExtension(ext) {
      if (typeof ext === "function") {
        return ext;
      }
      return (client) => client.$extends(ext);
    }
    __name(defineExtension, "defineExtension");
    function getExtensionContext(that) {
      return that;
    }
    __name(getExtensionContext, "getExtensionContext");
    var Prisma = {
      defineExtension,
      getExtensionContext,
      prismaVersion: { client: clientVersion, engine: prisma2.enginesVersion }
    };
    var default_index_default = { Prisma };
  }
});

// node_modules/@prisma/client/edge.js
var require_edge2 = __commonJS({
  "node_modules/@prisma/client/edge.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    module.exports = {
      // https://github.com/prisma/prisma/pull/12907
      ...require_edge()
    };
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
      Debug: /* @__PURE__ */ __name(() => Debug2, "Debug"),
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
    var Debug2 = new Proxy(debugCreate, {
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
    var src_default2 = Debug2;
  }
});

// .wrangler/tmp/bundle-OiAAjT/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();

// .wrangler/tmp/bundle-OiAAjT/middleware-insertion-facade.js
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
    const { bodyCache, raw: raw2 } = this;
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
    return bodyCache[key] = raw2[key]();
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
var raw = /* @__PURE__ */ __name((value, callbacks) => {
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
    return raw(await resStr, callbacks);
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

// src/routes/auth.ts
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

// src/lib/db.ts
init_checked_fetch();
init_modules_watch_stub();
var import_edge = __toESM(require_edge2());

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
var prisma;
function getPrismaClient(env) {
  if (!prisma) {
    if (env.DATABASE_URL) {
      prisma = new import_edge.PrismaClient({
        datasources: {
          db: {
            url: env.DATABASE_URL
          }
        }
      });
    } else if (env.DB) {
      const adapter = new PrismaD1(env.DB);
      prisma = new import_edge.PrismaClient({ adapter });
    } else {
      throw new Error("Database configuration missing");
    }
  }
  return prisma;
}
__name(getPrismaClient, "getPrismaClient");

// src/routes/auth.ts
var authRoutes = new Hono2();
authRoutes.post("/register", async (c2) => {
  try {
    const { email, username, password } = await c2.req.json();
    if (!email || !username || !password) {
      return c2.json({ error: "Missing required fields" }, 400);
    }
    const prisma2 = getPrismaClient(c2.env);
    const existingUser = await prisma2.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      return c2.json({ error: "User already exists" }, 409);
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma2.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role: "USER"
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true
      }
    });
    const payload = {
      userId: user.id,
      email: user.email,
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
    const { email, password } = await c2.req.json();
    if (!email || !password) {
      return c2.json({ error: "Missing email or password" }, 400);
    }
    const prisma2 = getPrismaClient(c2.env);
    const user = await prisma2.user.findUnique({
      where: { email }
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
      email: user.email,
      role: user.role
    };
    const token = await generateJWT(payload, c2.env.JWT_SECRET);
    return c2.json({
      user: {
        id: user.id,
        email: user.email,
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
    const prisma2 = getPrismaClient(c2.env);
    const user = await prisma2.user.findUnique({
      where: { id: payload.userId }
    });
    if (!user) {
      return c2.json({ error: "User not found" }, 404);
    }
    const newPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };
    const newToken = await generateJWT(newPayload, c2.env.JWT_SECRET);
    return c2.json({
      user: {
        id: user.id,
        email: user.email,
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
    const prisma2 = getPrismaClient(c2.env);
    const user = await prisma2.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
    const prisma2 = getPrismaClient(c2.env);
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
  const prisma2 = getPrismaClient(env);
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
    const prisma2 = getPrismaClient(c2.env);
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

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
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

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
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

// .wrangler/tmp/bundle-OiAAjT/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
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

// .wrangler/tmp/bundle-OiAAjT/middleware-loader.entry.ts
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
