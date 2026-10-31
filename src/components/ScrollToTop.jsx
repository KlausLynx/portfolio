import { FaChevronUp } from "react-icons/fa6";

const handleScroll = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
};

export const ScrollTop = () => {
    return (
        <button 
            onClick={handleScroll}
            className="fixed z-50 flex items-center justify-center 
                /* Positioning & Spacing per device */
                bottom-4 right-4 p-2.5
                cursor-pointer
                xs:bottom-6 xs:right-6 xs:p-3
                md:bottom-8 md:right-8 md:p-3.5 
                /* Visual Styling */
                bg-neutral-900 text-white rounded-full shadow-xl 
                border border-neutral-800 group
                /* Interactive states */
                hover:bg-neutral-800 active:scale-95 transition-all duration-200"
                aria-label="Scroll to top"
        >
            <FaChevronUp 
                className="/* Icon size scaling across devices */
                    w-4 h-4 
                    xs:w-5 xs:h-5 
                    md:w-6 md:h-6
                    /* Hover micro-interaction */
                    transform transition-transform duration-200 group-hover:-translate-y-0.5" 
            />
        </button>
    );
};
