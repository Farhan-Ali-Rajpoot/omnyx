import Link from 'next/link'
import React from 'react'

const stagger = 20;

const AnimLink = ({
  className = "",
  children,
  href,
  lineColor,
  NoLine,
  noTextStagger = false,
  NoTextAnimation = false,
  ...props
}: {
  className?: string;
  children: string;
  href: string;
  lineColor?: string;
  NoLine?: boolean;
  noTextStagger?: boolean;
  NoTextAnimation?: boolean;
}) => {
  // --- Mode 1: Static Text (No Text Animation) ---
  if (NoTextAnimation) {
    return (
      <Link
        href={href}
        {...props}
        className={`${className} group/l inline-block`}
      >
        <div className="relative w-fit">
          <span className="inline-block">{children}</span>

          {/* Underline animation */}
          {!NoLine && (
            <div
              className={`w-full h-px ${
                lineColor ? lineColor : "dark:bg-neutral-100 bg-neutral-800"
              } absolute bottom-0 left-0 origin-right transition duration-600 ease-steady 
            scale-x-0
            group-hover/l:scale-x-100 group-hover/l:origin-left`}
            />
          )}
        </div>
      </Link>
    );
  }

  // --- Mode 2: Animated Text (Staggered or Simple Slide) ---
  const chars = [...children];
  const isEven = chars.length % 2 === 0;
  const centerIndex = isEven
    ? chars.length / 2 - 0.5
    : Math.floor(chars.length / 2);

  const transitionStyle = "transition-transform duration-600 ease-steady";

  let animatedContent;

  if (noTextStagger) {
    // Mode 2a: Simple Slide
    animatedContent = (
      <>
        <div
          className={`inline-block ${transitionStyle} group-hover/l:-translate-y-full`}
          aria-hidden="true"
        >
          {children}
        </div>
        <div
          className={`absolute top-0 left-0 w-full h-full inline-block ${transitionStyle} translate-y-full group-hover/l:translate-y-0`}
        >
          {children}
        </div>
      </>
    );
  } else {
    // Mode 2b: Staggered Slide
    animatedContent = (
      <>
        <div className="inline-block">
          {chars.map((char, index) => {
            const distanceFromCenter = Math.abs(index - centerIndex);
            const delay = distanceFromCenter * stagger;
            return (
              <span
                key={index}
                className={`inline-block ${transitionStyle} group-hover/l:-translate-y-full`}
                style={{
                  transitionDelay: `${delay}ms`,
                  transform: "translateY(0%)",
                }}
                aria-hidden="true"
              >
                {char}
              </span>
            );
          })}
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          {chars.map((char, index) => {
            const distanceFromCenter = Math.abs(index - centerIndex);
            const delay = distanceFromCenter * stagger;
            return (
              <span
                key={index}
                className={`inline-block ${transitionStyle} group-hover/l:-translate-y-full`}
                style={{
                  transitionDelay: `${delay}ms`,
                  transform: "translateY(100%)",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <Link href={href} {...props} className={`${className} group/l`}>
      <div className={`relative inline-block overflow-hidden`}>
        {animatedContent}

        {/* Underline animation */}
        {!NoLine && (
          <div
            className={`w-full h-px ${
              lineColor ? lineColor : "dark:bg-neutral-100 bg-neutral-800"
            } absolute bottom-0 left-0 origin-right transition duration-600 ease-steady 
            scale-x-0
            group-hover/l:scale-x-100 group-hover/l:origin-left`}
          />
        )}
      </div>
    </Link>
  );
};

export { AnimLink, AnimButton };


const AnimButton = ({ 
  className = '',
  children,
  href,
  lineColor,
  NoLine = true,
  stagger = 13,
}: {
  className?: string
  children: string
  href: string
  lineColor?: string
  NoLine?: boolean
  stagger?: number
}) => {
  return (
    <div 
      className={`inline-block group ${className}`} 
    >
      {/* Scale layer - this one scales the button but not its text */}
      <div className={`relative px-4 py-1.5 bg-white rounded cursor-pointer text-sm font-medium ease-[cubic-bezier(0.785, 0.135, 0.15, 0.86)] transition-transform duration-600 group-hover:scale-[0.93]`}>
        
        {/* Text and animation layer */}
        <Link 
          href={href}
          className="relative inline-flex items-center justify-center w-full h-full overflow-hidden text-black"
        >
          {/* Original text that moves up */}
          <div className="inline-block">
            {[...children].map((char, index) => (
              <span 
                key={`original-${index}`} 
                className="inline-block transition-transform duration-600 group-hover:-translate-y-full ease-[cubic-bezier(0.785, 0.135, 0.15, 0.86)]"
                style={{
                  transitionDelay: `${index * stagger}ms`,
                  transform: 'translateY(0%)',
                }}
                aria-hidden="true"
              >
                {char}
              </span>
            ))}
          </div>

          {/* Clone that moves in from bottom */}
          <div className="absolute top-0 left-0 w-full h-full">
            {[...children].map((char, index) => (
              <span 
                key={`clone-${index}`} 
                className="inline-block transition-transform group-hover:-translate-y-full duration-600 ease-[cubic-bezier(0.785, 0.135, 0.15, 0.86)]"
                style={{
                  transitionDelay: `${index * stagger}ms`,
                  transform: 'translateY(100%)',
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Optional bottom line */}
          {!NoLine && (
            <div 
              className={`w-full h-[1px] ${lineColor || 'bg-neutral-100'} absolute bottom-0 left-0 origin-right transition duration-500 scale-0 group-hover:scale-100 group-hover:origin-left`} 
            />
          )}
        </Link>
      </div>
    </div>
  )
};
