export async function fetchPage(
  url: string,
  containerSelector: string,
  signal: AbortSignal
) {
  const response = await fetch(url, { signal })
  const html = await response.text()

  const doc = new DOMParser().parseFromString(html, "text/html")

  const container = doc.querySelector(containerSelector)

  if (!container) {
    throw new Error("New container not found in fetched page")
  }

  return {
    container: container as HTMLElement,
    title: doc.title
  }
}
