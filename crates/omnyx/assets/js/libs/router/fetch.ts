
interface TagProp {
  key: String,
  value: String,
}

interface Metadata {
  type: String,
  content: String | null,
  props: Array<TagProp>,
}

interface Response {
  metadata: Array<Metadata>,
}

export async function fetchPage(
  url: string,
  containerSelector: string,
  signal: AbortSignal
) {
  const result = await fetch(url, { 
    signal,
    headers: {
      "X-OMNYX-Request": "true", 
    }
  });
  const res: Response = await result.json();

  const doc = new DOMParser().parseFromString("", "text/html");

  const container = doc.querySelector(containerSelector);

  if (!container) {
    throw new Error("New container not found in fetched page")
  }

  return {
    container: container as HTMLElement,
    title: doc.title
  }
}
