import { fetchPage } from "./fetch"
import { updateHead } from "./head"
import { runTransition } from "./transition"


interface RouterOptions {
  container: string,
  transitionTimeout?: number,
}

export class OmnyxRouter {
  private containerSelector: string;
  private currentContainer: HTMLElement;
  private abortController: AbortController | null = null;
  private navigating = false;
  private transitionTimeout: number;

  constructor(options: RouterOptions) {
    this.containerSelector = options.container;
    this.transitionTimeout = options.transitionTimeout ?? 300;
    const el = document.querySelector(this.containerSelector);
    if (!el) {
      throw new Error(`Container "${this.containerSelector}" not found`);
    }
    this.currentContainer = el as HTMLElement;
    this.bindEvents();
  }

  private bindEvents() {
    document.addEventListener("click", this.handleClick)
    window.addEventListener("popstate", this.handlePopState)
  }

  private handleClick = (e: MouseEvent): void => {
    const link = (e.target as HTMLElement).closest('a');
    if (!link) return;
    // Skip external links, mailto, tel, download, target="_blank", hash-only
    if (link.target === '_blank') return;
    if (link.origin !== window.location.origin) return;
    if (link.hasAttribute('download')) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    e.preventDefault();
    this.navigate(href);
  };

  private handlePopState = (): void => {
    this.navigate(window.location.href, { replace: true });
  };

  public async navigate(url: string, options: { replace?: boolean } = {}): Promise<void> {
    if (this.navigating) return;
    if (url === window.location.href && !options.replace) return;

    this.navigating = true;

    // Abort any ongoing fetch
    if (this.abortController) {
      this.abortController.abort();
    }
    this.abortController = new AbortController();

    try {
      // Step 1: fetch the new page (server returns full HTML or fragment)
      const { container: newContainer, title } = await this.fetchPage(
        url,
        this.abortController.signal
      );

      // Step 2: run transition animation (if any)
      await this.runTransition(newContainer);

      // Step 3: update document title
      if (title) document.title = title;

      // Step 4: update browser history
      if (!options.replace) {
        history.pushState({}, '', url);
      }

      // Step 5: update current container reference
      this.currentContainer = document.querySelector(this.containerSelector) as HTMLElement;
    } catch (err) {
      // If fetch was aborted, don't fallback (user navigated away)
      if (err instanceof Error && err.name === 'AbortError') return;
      console.error('SPA navigation failed:', err);
      window.location.href = url;
    } finally {
      this.navigating = false;
    }
  }

  private async fetchPage(url: string, signal: AbortSignal): Promise<{ container: HTMLElement; title: string }> {
    // Tell the server we want a full HTML response (or a fragment)
    const res = await fetch(url, {
      signal,
      headers: {
        'X-OMNYX-REQUEST': 'true', // optional: server can return only the container
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    // Parse the HTML
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const newContainer = doc.querySelector(this.containerSelector);
    if (!newContainer) {
      throw new Error(`Container "${this.containerSelector}" not found in fetched document`);
    }

    return {
      container: newContainer as HTMLElement,
      title: doc.title,
    };
  }

  private async runTransition(newContainer: HTMLElement): Promise<void> {
    // Animate out the current container
    this.currentContainer.classList.add('omnyx-leave');
    await this.wait(this.transitionTimeout);

    // Replace the DOM node – this also removes all child scripts/placeholders
    this.currentContainer.replaceWith(newContainer);

    // After insertion, re‑execute all <script> tags inside the new container
    // This is crucial for streaming replacement scripts to work again.
    newContainer.querySelectorAll('script').forEach((oldScript) => {
      const newScript = document.createElement('script');
      // Copy all attributes (src, type, etc.)
      for (let i = 0; i < oldScript.attributes.length; i++) {
        newScript.setAttribute(oldScript.attributes[i].name, oldScript.attributes[i].value);
      }
      // Copy inline code
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

    // Animate in the new container
    newContainer.classList.add('omnyx-enter');
    await this.wait(this.transitionTimeout);
    newContainer.classList.remove('omnyx-enter');
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Cleanup method (call when destroying the router, e.g., in tests)
  public destroy(): void {
    document.removeEventListener('click', this.handleClick);
    window.removeEventListener('popstate', this.handlePopState);
    if (this.abortController) this.abortController.abort();
  }
}


