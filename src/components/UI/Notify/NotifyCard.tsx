import {
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaInfo,
  FaCog,
  FaBullhorn,
  FaWrench,
  FaRedo,
  FaExternalLinkAlt,
  FaArrowRight,
} from "react-icons/fa";

export const NotificationCard = () => {
  return (
    <div
      id="notify-card"
      // data-open
      // data-type="warning"
      // data-position="top-right"
      className="
        fixed z-9999 max-w-sm w-full rounded-lg border px-6 py-5
        flex items-start gap-4 select-none backdrop-blur-lg group

        m-4 sm:m-[1.5vw] 3xl:m-6

        opacity-0 pointer-events-none scale-95
        transition-all duration-300

        data-open:opacity-100
        data-open:pointer-events-auto
        data-open:scale-100

        data-[position^=top]:-translate-y-4
        data-open:data-[position^=top]:translate-y-0

        data-[position^=bottom]:translate-y-4
        data-open:data-[position^=bottom]:translate-y-0

        bg-white border-neutral-300 text-neutral-800
        dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100

        data-[type=success]:bg-green-50 data-[type=success]:border-green-300
        data-[type=error]:bg-red-50 data-[type=error]:border-red-300  
        data-[type=warning]:bg-amber-50 data-[type=warning]:border-amber-300
        data-[type=info]:bg-blue-50 data-[type=info]:border-blue-300
        data-[type=settings]:bg-neutral-100 data-[type=settings]:border-neutral-300
        data-[type=announcement]:bg-amber-50 data-[type=announcement]:border-amber-300
        data-[type=external]:bg-purple-50 data-[type=external]:border-purple-300

        dark:data-[type=success]:bg-green-950 dark:data-[type=success]:border-green-800
        dark:data-[type=error]:bg-red-950 dark:data-[type=error]:border-red-800
        dark:data-[type=warning]:bg-amber-950 dark:data-[type=warning]:border-amber-800
        dark:data-[type=info]:bg-blue-950 dark:data-[type=info]:border-blue-800
        dark:data-[type=settings]:bg-neutral-800 dark:data-[type=settings]:border-neutral-600
        dark:data-[type=announcement]:bg-amber-950 dark:data-[type=announcement]:border-amber-800
        dark:data-[type=external]:bg-purple-950 dark:data-[type=external]:border-purple-800

        data-[position=top-left]:top-0 data-[position=top-left]:left-0
        data-[position=top-center]:top-0 data-[position=top-center]:left-1/2 data-[position=top-center]:-translate-x-1/2
        data-[position=top-right]:top-0 data-[position=top-right]:right-0
        data-[position=bottom-left]:bottom-0 data-[position=bottom-left]:left-0
        data-[position=bottom-center]:bottom-0 data-[position=bottom-center]:left-1/2 data-[position=bottom-center]:-translate-x-1/2
        data-[position=bottom-right]:bottom-0 data-[position=bottom-right]:right-0
      "
    >
      {/* Modern Rounded Icon Background */}
      <div className="flex-shrink-0">
        <div className="
          w-10 h-10 rounded-xl flex items-center justify-center
          group-data-[type=success]:bg-green-100 group-data-[type=success]:dark:bg-green-900
          group-data-[type=error]:bg-red-100 group-data-[type=error]:dark:bg-red-900
          group-data-[type=warning]:bg-amber-100 group-data-[type=warning]:dark:bg-amber-900
          group-data-[type=info]:bg-blue-100 group-data-[type=info]:dark:bg-blue-900
          group-data-[type=settings]:bg-neutral-100 group-data-[type=settings]:dark:bg-neutral-900
          group-data-[type=announcement]:bg-amber-100 group-data-[type=announcement]:dark:bg-amber-900
          group-data-[type=external]:bg-purple-100 group-data-[type=external]:dark:bg-purple-900
        ">
          <div className="relative w-5 h-5">
            <FaCheck className="absolute inset-0 w-5 h-5 text-green-600 dark:text-green-400 hidden group-data-[type=success]:block" />
            <FaTimes className="absolute inset-0 w-5 h-5 text-red-600 dark:text-red-400 hidden group-data-[type=error]:block" />
            <FaExclamationTriangle className="absolute inset-0 w-5 h-5 text-yellow-600 dark:text-yellow-400 hidden group-data-[type=warning]:block" />
            <FaInfo className="absolute inset-0 w-5 h-5 text-blue-600 dark:text-blue-400 hidden group-data-[type=info]:block" />
            <FaCog className="absolute inset-0 w-5 h-5 text-neutral-600 dark:text-neutral-400 hidden group-data-[type=settings]:block" />
            <FaBullhorn className="absolute inset-0 w-5 h-5 text-amber-600 dark:text-amber-400 hidden group-data-[type=announcement]:block" />
            <FaExternalLinkAlt className="absolute inset-0 w-5 h-5 text-purple-600 dark:text-purple-400 hidden group-data-[type=external]:block" />
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3
          id="notify-title"
          className="font-bold leading-tight tracking-tight 
          text-xl sm:text-[1.35vw] 3xl:!text-[22px]"
        >
          Visit Our Documentation
        </h3>

        <p
          id="notify-message"
          className="opacity-95 leading-relaxed font-medium mt-2 
          text-base sm:text-[1.05vw] 3xl:!text-[17px]"
        >
          Learn more about our features in the official docs
        </p>

        <button
          id="notify-button"
          data-open
          // data-icon=""
          className="
            group/btn
            hidden data-open:flex mt-4 px-3 py-1.5 rounded-md border cursor-pointer
            transition-colors duration-200 items-center gap-2 sm:gap-[0.6vw] 3xl:!gap-[11.5px]

            text-base sm:text-[1.05vw] 3xl:!text-[17px]
            sm:px-[0.9vw] sm:py-[0.45vw] 3xl:!px-4 3xl:!py-2

            group-data-[type=success]:bg-green-200 group-data-[type=success]:border-green-400 group-data-[type=success]:text-green-900 
            hover:group-data-[type=success]:bg-green-300
            dark:group-data-[type=success]:bg-green-800 dark:group-data-[type=success]:border-green-600 dark:group-data-[type=success]:text-green-100 
            dark:hover:group-data-[type=success]:bg-green-700

            group-data-[type=error]:bg-red-200 group-data-[type=error]:border-red-400 group-data-[type=error]:text-red-900 
            hover:group-data-[type=error]:bg-red-300
            dark:group-data-[type=error]:bg-red-800 dark:group-data-[type=error]:border-red-600 dark:group-data-[type=error]:text-red-100 
            dark:hover:group-data-[type=error]:bg-red-700

            group-data-[type=warning]:bg-amber-200 group-data-[type=warning]:border-amber-400 group-data-[type=warning]:text-amber-900 
            hover:group-data-[type=warning]:bg-amber-300
            dark:group-data-[type=warning]:bg-amber-800 dark:group-data-[type=warning]:border-amber-600 dark:group-data-[type=warning]:text-amber-100 
            dark:hover:group-data-[type=warning]:bg-amber-700

            group-data-[type=info]:bg-neutral-200 group-data-[type=info]:border-neutral-400 group-data-[type=info]:text-neutral-900 
            hover:group-data-[type=info]:bg-neutral-300
            dark:group-data-[type=info]:bg-neutral-700 dark:group-data-[type=info]:border-neutral-500 dark:group-data-[type=info]:text-neutral-100 
            dark:hover:group-data-[type=info]:bg-neutral-600

            group-data-[type=settings]:bg-neutral-200 group-data-[type=settings]:border-neutral-400 group-data-[type=settings]:text-neutral-900 
            hover:group-data-[type=settings]:bg-neutral-300
            dark:group-data-[type=settings]:bg-neutral-700 dark:group-data-[type=settings]:border-neutral-500 dark:group-data-[type=settings]:text-neutral-100 
            dark:hover:group-data-[type=settings]:bg-neutral-600

            group-data-[type=announcement]:bg-amber-200 group-data-[type=announcement]:border-amber-400 group-data-[type=announcement]:text-amber-900 
            hover:group-data-[type=announcement]:bg-amber-300
            dark:group-data-[type=announcement]:bg-amber-800 dark:group-data-[type=announcement]:border-amber-600 dark:group-data-[type=announcement]:text-amber-100 
            dark:hover:group-data-[type=announcement]:bg-amber-700

            group-data-[type=external]:bg-purple-200 group-data-[type=external]:border-purple-400 group-data-[type=external]:text-purple-900 
            hover:group-data-[type=external]:bg-purple-300
            dark:group-data-[type=external]:bg-purple-800 dark:group-data-[type=external]:border-purple-600 dark:group-data-[type=external]:text-purple-100 
            dark:hover:group-data-[type=external]:bg-purple-700
          "
        >
          <span id="notify-button-text" className="sm:text-[1.15vw] 3xl:!text-[22px]">Click me</span>
          
          {/* Button Icons - Different from card icons */}
          <div className="relative w-3 h-3 sm:w-[0.9vw] sm:h-[0.9vw] 3xl:!w-4 3xl:!h-4 hidden group-data-icon/btn:inline">
            <FaCheck className="absolute inset-0 opacity-70 hidden group-data-[icon=tick]/btn:block" />
            <FaRedo className="absolute inset-0 opacity-70 hidden group-data-[icon=retry]/btn:block" />
            <FaExclamationTriangle className="absolute inset-0 opacity-70 hidden group-data-[icon=warning]/btn:block" />
            <FaInfo className="absolute inset-0 opacity-70 hidden group-data-[icon=info]/btn:block" />
            <FaWrench className="absolute inset-0 opacity-70 hidden group-data-[icon=fix]/btn:block" />
            <FaBullhorn className="absolute inset-0 opacity-70 hidden group-data-[icon=announcement]/btn:block" />
            <FaArrowRight className="absolute inset-0 opacity-70 hidden group-data-[icon=external]/btn:block" />
          </div>
        </button>
      </div>

      <button
        id="notify-close"
        data-toggle-target-id='notify-card'
        className="
          group/c
          cursor-pointer absolute top-4 right-4 p-1.5 rounded-lg 
          transition-colors hover:bg-black/10 dark:hover:bg-white/10
          sm:top-[1.2vw] sm:right-[1.2vw] sm:p-[0.45vw] 3xl:!top-5 3xl:!right-5 3xl:!p-2
        "
      >
        <FaTimes className="w-3.5 h-3.5 sm:w-[1.05vw] sm:h-[1.05vw] 3xl:!w-4 3xl:!h-4 opacity-60 group-hover/c:opacity-100 transition-opacity" />
      </button>
    </div>
  );
};