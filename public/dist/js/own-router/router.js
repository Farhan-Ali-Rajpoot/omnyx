// engine/router/fetch.ts
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

// engine/router/head.ts
function updateHead(title) {
  document.title = title;
}

// engine/router/transition.ts
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

// engine/router/index.ts
var Router = class {
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
export {
  Router
};
