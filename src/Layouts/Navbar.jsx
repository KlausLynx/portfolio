import { useState } from "react";
import { navRoutes } from "../Path/navPath";

const Navbar = () => {
    const [hoveredId, setHoveredId] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full bg-transparent select-none z-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                
                {/* Desktop Navigation Links (Hidden on Mobile) */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-10">
                    {navRoutes.map(({ id, path, name }) => (
                        <div
                            key={id}
                            className="relative flex items-center justify-center py-2 px-1"
                            onMouseEnter={() => setHoveredId(id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Left circle — slides in from left */}
                            <span 
                                className={`pointer-events-none absolute left-0 bg-transparent inline-block border-2 border-current border-r-transparent border-t-transparent border-b-transparent rounded-full h-10 w-10 transition-all duration-300 ease-out text-[var(--accent-color,#FF5C00)]
                                ${hoveredId === id ? '-translate-x-[40%] opacity-100' : 'translate-x-0 opacity-0'}`}
                            />

                            <a 
                                href={path} 
                                className="inline-block uppercase text-sm font-semibold tracking-widest text-white/80 hover:text-white transition-colors duration-200"
                            >
                                {name}
                            </a>

                            {/* Right circle — slides in from right */}
                            <span 
                                className={`pointer-events-none absolute right-0 bg-transparent inline-block border-2 border-current border-l-transparent border-t-transparent border-b-transparent rounded-full h-10 w-10 transition-all duration-300 ease-out text-[var(--accent-color,#FF5C00)]
                                ${hoveredId === id ? 'translate-x-[40%] opacity-100' : 'translate-x-0 opacity-0'}`}
                            />
                        </div>
                    ))}
                </nav>

                {/* Mobile Hamburger Toggle Button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 relative text-white focus:outline-none cursor-pointer"
                    aria-label="Toggle menu"
                >
                    <span className={`h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                    <span className={`h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Mobile Navigation Full-screen Backdrop Drawer */}
            <div 
                className={`fixed inset-0 bg-[#0e0e10]/95 backdrop-blur-md md:hidden transition-all duration-300 flex flex-col items-center justify-center z-40 gap-8
                ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <nav className="flex flex-col items-center gap-6">
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
            </div>
        </header>
    );
};

export default Navbar;