var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// assets/js/libs/router/fetch.ts
async function fetchPage(url, containerSelector, signal) {
  const response = await fetch(url, { signal });
  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const container = doc.querySelector(containerSelector);
  if (!container) {
    throw new Error("New container not found in fetched page");
  }
  return {
    container,
    title: doc.title
  };
}
var init_fetch = __esm({
  "assets/js/libs/router/fetch.ts"() {
  }
});

// assets/js/libs/router/head.ts
function updateHead(title) {
  document.title = title;
}
var init_head = __esm({
  "assets/js/libs/router/head.ts"() {
  }
});

// assets/js/libs/router/transition.ts
async function runTransition(current, next) {
  current.classList.add("leave");
  await wait(300);
  current.replaceWith(next);
  next.classList.add("enter");
  await wait(300);
  next.classList.remove("enter");
}
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var init_transition = __esm({
  "assets/js/libs/router/transition.ts"() {
  }
});

// assets/js/libs/router/index.ts
var Router;
var init_router = __esm({
  "assets/js/libs/router/index.ts"() {
    init_fetch();
    init_head();
    init_transition();
    Router = class {
      constructor(options) {
        this.options = options;
        const el = document.querySelector(options.container);
        if (!el) {
          throw new Error(`Container "${options.container}" not found`);
        }
        this.container = el;
        this.bindEvents();
      }
      container;
      abortController = null;
      navigating = false;
      bindEvents() {
        document.addEventListener("click", this.onClick);
        window.addEventListener("popstate", this.onPopState);
      }
      onClick = (e) => {
        const link = e.target.closest("a");
        if (!link) return;
        if (link.target === "_blank") return;
        if (link.origin !== location.origin) return;
        e.preventDefault();
        this.navigate(link.href);
      };
      onPopState = () => {
        this.navigate(location.href, { replace: true });
      };
      async navigate(url, options = {}) {
        if (this.navigating) return;
        if (url === location.href) return;
        this.navigating = true;
        try {
          if (this.abortController) {
            this.abortController.abort();
          }
          this.abortController = new AbortController();
          const next = await fetchPage(
            url,
            this.options.container,
            this.abortController.signal
          );
          await runTransition(this.container, next.container);
          updateHead(next.title);
          if (!options.replace) {
            history.pushState({}, "", url);
          }
          this.container = document.querySelector(
            this.options.container
          );
        } catch (err) {
          console.error("Navigation error:", err);
          window.location.href = url;
        } finally {
          this.navigating = false;
        }
      }
    };
  }
});

// assets/js/modules/navigation/index.ts
function initRouter() {
  const router = new Router({ container: ".container" });
}
var init_navigation = __esm({
  "assets/js/modules/navigation/index.ts"() {
    init_router();
  }
});

// assets/js/main.ts
var require_main = __commonJS({
  "assets/js/main.ts"() {
    init_navigation();
    function onDOMContentLoaded() {
      initRouter();
    }
    document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
  }
});
export default require_main();
