import { HTMLAttributes } from "react";

interface MenuButtonProps extends HTMLAttributes<HTMLDivElement>  {
  className?: string,
}

export function MenuButton({className = "", ...props}: MenuButtonProps) {
  return (
    <div
      {...props}
      data-toggle-target-id="navbar"
      className={`${className} group cursor-pointer flex items-center gap-2.5 sm:gap-[0.75vw] 3xl:!gap-[14.4px] rounded-sm py-2 px-3 pr-4 hover:bg-neutral-700/40
       transition-all duration-600 group-open:gap-0.5 3xl:group-open:!gap-[9.6px]`}
    >
      {/* Hamburger icon - reduced DOM nodes */}
      <div className="flex flex-col gap-1.5 sm:gap-[0.3vw] 3xl:!gap-[5.76px]">
        <div className="h-px w-5 sm:w-[1.5vw] 3xl:!w-[28.8px] bg-neutral-100 rounded-full transition-transform duration-600 ease-steady 
        group-open:translate-y-[0.21rem] 
         group-open:scale-x-70 group-open:rotate-45 origin-center
         sm:group-open:translate-y-[0.2vw]
         3xl:group-open:!translate-y-[3.84px]
         " />
        <div className="h-px w-5 sm:w-[1.5vw] 3xl:!w-[28.8px] bg-neutral-100 rounded-full transition-transform duration-600 ease-steady 
        group-open:-translate-y-[0.19rem] 
        group-open:scale-x-70 group-open:-rotate-45 origin-center
        sm:group-open:-translate-y-[0.2vw]
        3xl:group-open:!-translate-y-[3.84px]
        " />
      </div>

      {/* Sliding text - optimized transforms */}
      <div className="relative overflow-hidden sm:text-[1.25vw] 3xl:!text-[24px] text-neutral-100 h-6 sm:h-[1.75vw] 3xl:!h-[33.6px] leading-tight ">
        <p className="transition-transform duration-600 ease-steady group-open:-translate-y-6 sm:group-open:-translate-y-[1.75vw] 
        3xl:group-open:-translate-y-[33.6px]">
          Menu
        </p>
        <p className="absolute inset-0 transition-transform duration-600 ease-steady translate-y-6 sm:translate-y-[1.75vw] 3xl:translate-y-[33.6px] 
        group-open:translate-y-0">
          Close
        </p>
      </div>
    </div>
  );
}