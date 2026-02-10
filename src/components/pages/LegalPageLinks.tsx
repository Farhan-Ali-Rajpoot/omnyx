import { legalPagesLinks } from "@/config/links/legalPagesLinks";
import { Button } from "../UI/Button";

export function LegalPageLinks({
  active,
}: {
  active?: (typeof legalPagesLinks)[number]["label"];
}) {
  return (
    <div className="sticky top-[calc(var(--sfu)*1.75)] flex flex-col gap-[calc(var(--sfu)*0.25)] w-fit">
      {legalPagesLinks.map((obj, i) => {
        return (
          <Button
            href={obj.href}
            style={{
              WebkitTextStroke: "0.3px currentColor",
              paintOrder: "stroke fill",
              backgroundColor:
                active === obj.key
                  ? "var(--color-bg-contrast)"
                  : "var(--color-bg-surface-emphasis)",
              color:
                active === obj.key
                  ? "var(--color-text-contrast)"
                  : "var(--color-text-base)",
            }}
            className="px-[calc(var(--sfu)*2)] w-full text-center"
          >
            {obj.label}
          </Button>
        );
      })}
    </div>
  );
}
