import { appName } from "@/config/meta/app";
import { BoldSVGText } from "../UI/BoldSVGText";

export function Footer() {
  return (
    <>
      <div className="w-full flex flex-col" id="footer">
        <div className="w-full flex items-center justify-center leading-none">
          <BoldSVGText
            label={appName}
            strokeThickness={15}
            className="uppercase leading-none text-[calc(var(--sfu)*19)] bg-red-500"
          />
        </div>
      </div>
    </>
  );
}
