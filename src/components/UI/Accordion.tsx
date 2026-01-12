
interface AccordionProps {

}

export function Accordion ({...props}: AccordionProps) {
  const faqs = [
    { q: "What is SSR?", a: "Server-Side Rendering allows you to render your components to HTML on the server." },
    { q: "Can I animate height: auto?", a: "Not directly, but you can animate a Grid fraction (0fr to 1fr) for a smooth effect." },
    { q: "How does it close on re-click?", a: "An invisible 'close' label appears over the question when it is open." },
    { q: "Is this pure CSS?", a: "Yes. It uses the native behavior of radio button groups." },
    { q: "What is the secret?", a: "The 'reset' radio button with ID 'faq-reset' handles the closing logic." }
  ];

  return (
<div className="max-w-xl mx-auto p-4 font-sans" {...props}>
      <style>{`
        /* 1. Logic to show answer */
        .faq-input:checked ~ .faq-content {
          grid-template-rows: 1fr;
        }

        /* 2. Logic to rotate icon */
        .faq-input:checked ~ .question-container span {
          transform: rotate(45deg);
        }

        /* 3. THE TRICK: Show the 'Close' label only when the radio is checked */
        .close-label { display: none; }
        .faq-input:checked ~ .close-label {
          display: block;
          position: absolute;
          inset: 0;
          z-index: 10;
        }
      `}</style>

      {/* The Hidden Reset Button */}
      <input type="radio" name="accordion" id="faq-reset" className="hidden" />

      {faqs.map((item, index) => (
        <div key={index} className="relative border-b border-gray-200">
          
          {/* The Radio Input */}
          <input 
            type="radio" 
            name="accordion" 
            id={`faq-${index}`} 
            className="faq-input hidden" 
          />

          {/* The 'Close' Label (Invisible overlay that appears when open) */}
          <label htmlFor="faq-reset" className="close-label cursor-pointer" title="Close"></label>
          
          {/* The 'Open' Label (The visible question) */}
          <label 
            htmlFor={`faq-${index}`} 
            className="question-container flex justify-between items-center py-3 cursor-pointer text-gray-800"
          >
            {item.q}
            <span className="text-2xl transition-transform duration-300 ease-in-out text-gray-400">+</span>
          </label>

          {/* Animated Answer Section */}
          <div className="faq-content grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out overflow-hidden">
            <div className="min-h-0">
              <p className="pb-5 text-gray-600 leading-relaxed">
                {item.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};