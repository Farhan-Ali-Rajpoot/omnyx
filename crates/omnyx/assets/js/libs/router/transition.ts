export async function runTransition(
  current: HTMLElement,
  next: HTMLElement
) {
  current.classList.add("leave")

  await wait(300)

  current.replaceWith(next)

  next.classList.add("enter")

  await wait(300)

  next.classList.remove("enter")
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
