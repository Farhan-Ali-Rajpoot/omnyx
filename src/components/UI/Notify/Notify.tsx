let notifyTimeout: number | null = null;

export type NotifyType = | "success" | "error" | "warning" | "info" | "settings" | "announcement"| "external";
export type NotifyButtonIconType = "tick" | "retry" | "warning" | "info" | "fix" | "announcement" | "none";
export type NotificationPosition = | "top-left"| "top-center"| "top-right"| "bottom-left"| "bottom-center"| "bottom-right";
export type NotifyButtonType = { text: string; href: string, icon?: NotifyButtonIconType, callback?: never} | 
                               { text: string; href?: never, icon?: NotifyButtonIconType, callback: () => void, };

interface NotifyOptions {
  type?: NotifyType;
  title: string;
  message: string;
  button?: NotifyButtonType;
  position?: NotificationPosition;
  duration?: number | null;
}


export const Notify = ({
  type = "info",
  title,
  message,
  button,
  position = "top-right",
  duration = 4000,
}: NotifyOptions) => {
  const card = document.getElementById("notify-card");
  const titleEl = document.getElementById("notify-title");
  const msgEl = document.getElementById("notify-message");
  const btnEl = document.getElementById("notify-button");
  const btnTextEl = btnEl?.childNodes[0] as HTMLElement;

  if (!card || !titleEl || !msgEl || !btnEl || !btnTextEl) return;

  // Cancel previous auto-close timer
  if (notifyTimeout) {
    clearTimeout(notifyTimeout);
    notifyTimeout = null;
  }

  // Fill basic content
  titleEl.textContent = title;
  msgEl.textContent = message;

  // Set type + position
  card.dataset.type = type;
  card.dataset.position = position;

  if (button) {
    // Show button
    btnEl.setAttribute("data-open", "");

    // Text
    btnTextEl.textContent = button.text;

    // Remove previous icon entirely
    delete btnEl.dataset.icon;

    // Set icon only if provided
    if (button.icon) {
      btnEl.dataset.icon = button.icon;
    }

    // Reset listener
    btnEl.onclick = null;

    // Behavior: choose exactly one
    if (button.href) {
      btnEl.onclick = () =>
        window.open(button.href!, "_blank", "noopener,noreferrer");
    } else if (button.callback) {
      btnEl.onclick = button.callback;
    }

  } else {
    // Hide button completely
    btnEl.removeAttribute("data-open");
    delete btnEl.dataset.icon;
    btnEl.onclick = null;
  }

  card.setAttribute("data-open", "");

  if (duration !== null) {
    notifyTimeout = window.setTimeout(() => {
      card.removeAttribute("data-open");
    }, duration);
  }
};
