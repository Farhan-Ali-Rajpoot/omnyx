import MagicScene from "@/components/react-three/scenes/MagicScene";
import { appName } from "@/config/meta/app";

export async function AuthDecorativePanel() {
  return (
    <div
      data-auth-layout-panel
      className="
        group hidden lg:flex w-full min-h-[calc(100vh-calc(var(--sfu)*2))] items-center justify-center relative overflow-hidden
        rounded-[calc(var(--sfu)*0.75)] m-[calc(var(--sfu)*1)] mr-0
      "
    >
      <MagicScene />

      {/* MAIN TEXT */}
      <div
        className="
          absolute inset-0 z-10
          flex flex-col items-center justify-center
        "
      >
        <h1
          className="
            font-bold text-[var(--color-text-action)] text-center
            text-[calc(var(--sfu)*7)]
            mb-[calc(var(--sfu)*0.25)]
          "
        >
          {appName}
        </h1>

        <div
          className="
            text-[var(--color-text-secondary)] text-center
            max-w-[calc(var(--sfu)*32)]
            text-[calc(var(--sfu)*1.2)]
          "
        >
          A focused workspace to manage tools, workflows, and progress — all in one place.
        </div>
      </div>

      {/* CORNER TEXTS WITH PADDING */}
      <div
        className="
          absolute top-0 left-0 z-10
          p-[calc(var(--sfu)*1)]
        "
      >
        <p className="font-mono text-[var(--color-text-secondary)] text-[calc(var(--sfu)*1)]">
          Tools • Workflows • Execution
        </p>
      </div>

      <div
        className="
          absolute top-0 right-0 z-10
          p-[calc(var(--sfu)*1)]
        "
      >
        <p className="font-mono text-[var(--color-text-secondary)] text-[calc(var(--sfu)*1)]">
          Secure Access
        </p>
      </div>

      <div
        className="
          absolute bottom-0 left-0 z-10
          p-[calc(var(--sfu)*1)]
        "
      >
        <p className="font-mono text-[var(--color-text-secondary)] text-[calc(var(--sfu)*0.8)]">
          Built for focused work
        </p>
      </div>

      <div
        className="
          absolute bottom-0 right-0 z-10
          p-[calc(var(--sfu)*1)]
        "
      >
        <p className="font-mono text-[var(--color-text-secondary)] text-[calc(var(--sfu)*0.95)]">
          Scalable by design
        </p>
      </div>
    </div>
  );
}
