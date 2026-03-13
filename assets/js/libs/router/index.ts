import { fetchPage } from "./fetch"
import { updateHead } from "./head"
import { runTransition } from "./transition"


interface RouterOptions {
  container: string
}

export class Router {
  private container: HTMLElement
  private abortController: AbortController | null = null
  private navigating = false

  constructor(private options: RouterOptions) {
    const el = document.querySelector(options.container)

    if (!el) {
      throw new Error(`Container "${options.container}" not found`)
    }

    this.container = el as HTMLElement
    this.bindEvents()
  }

  private bindEvents() {
    document.addEventListener("click", this.onClick)
    window.addEventListener("popstate", this.onPopState)
  }

  private onClick = (e: MouseEvent) => {
    const link = (e.target as HTMLElement).closest("a")

    if (!link) return
    if (link.target === "_blank") return
    if (link.origin !== location.origin) return

    e.preventDefault()
    this.navigate(link.href)
  }

  private onPopState = () => {
    this.navigate(location.href, { replace: true })
  }

  async navigate(url: string, options: { replace?: boolean } = {}) {
    if (this.navigating) return
    if (url === location.href) return

    this.navigating = true

    try {
      if (this.abortController) {
        this.abortController.abort()
      }

      this.abortController = new AbortController()

      const next = await fetchPage(
        url,
        this.options.container,
        this.abortController.signal
      )

      await runTransition(this.container, next.container)

      updateHead(next.title)

      if (!options.replace) {
        history.pushState({}, "", url)
      }

      this.container = document.querySelector(
        this.options.container
      ) as HTMLElement

    } catch (err) {
      console.error("Navigation error:", err)
      window.location.href = url
    } finally {
      this.navigating = false
    }
  }
}
