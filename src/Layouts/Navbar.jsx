import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { navRoutes } from "../Path/navPath";

const Navbar = () => {
    const [hoveredId, setHoveredId] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Lock page scroll while the mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMenuOpen]);

    // Close menu if the screen grows to desktop size
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const close = (e) => e.matches && setIsMenuOpen(false);
        mq.addEventListener("change", close);
        return () => mq.removeEventListener("change", close);
    }, []);

    return (
        <>
            {/* Mobile hamburger */}
            <button
                onClick={() => setIsMenuOpen((o) => !o)}
                className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 relative z-50 focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
            >
                <span className={`h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
                <span className={`h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-10">
                {navRoutes.map(({ id, path, name }) => (
                    <div
                        key={id}
                        className="relative flex items-center justify-center py-2 px-1"
                        onMouseEnter={() => setHoveredId(id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <span className={`pointer-events-none absolute left-0 inline-block border-2 border-current border-r-transparent border-t-transparent border-b-transparent rounded-full h-10 w-10 transition-all duration-300 ease-out text-[var(--accent-color,#FF5C00)]
                            ${hoveredId === id ? "-translate-x-[40%] opacity-100" : "translate-x-0 opacity-0"}`} />
                        <a href={path} className="inline-block uppercase text-sm font-semibold tracking-widest opacity-80 hover:opacity-100 transition-opacity duration-200">
                            {name}
                        </a>
                        <span className={`pointer-events-none absolute right-0 inline-block border-2 border-current border-l-transparent border-t-transparent border-b-transparent rounded-full h-10 w-10 transition-all duration-300 ease-out text-[var(--accent-color,#FF5C00)]
                            ${hoveredId === id ? "translate-x-[40%] opacity-100" : "translate-x-0 opacity-0"}`} />
                    </div>
                ))}
            </nav>

            {/* Mobile drawer, rendered on <body> so transforms/blur above can't break `fixed` */}
            {createPortal(
                <div
                    className={`fixed inset-0 z-40 md:hidden bg-[#0e0e10]/95 backdrop-blur-md flex flex-col items-center justify-center transition-opacity duration-300
                    ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                >
                    <nav className="flex flex-col items-center gap-8">
                        {navRoutes.map(({ id, path, name }) => (
                            <a
                                key={id}
                                href={path}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-2xl font-bold uppercase tracking-widest text-white hover:text-[var(--accent-color,#FF5C00)] transition-colors duration-200"
                            >
                                {name}
                            </a>
                        ))}
                    </nav>
                </div>,
                document.body
            )}
        </>
    );
};

export default Navbar;