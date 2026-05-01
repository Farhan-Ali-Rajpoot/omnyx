import { OmnyxRouter } from "../../libs/router";





export function initRouter (): void {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        const router = new OmnyxRouter({ container: '#omnyx-app' });
        // Expose globally for debugging if needed
        (window as any).omnyxRouter = router;
      });
    } else {
      const router = new OmnyxRouter({ container: '#omnyx-app' });
      (window as any).omnyxRouter = router;
    }
}