import { useState } from "react";
import { navRoutes } from "../Path/navPath";

const Navbar = () => {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <nav className="flex gap-3 md:gap-8 lg:gap-10">
            { navRoutes.map(({id, path, name}) => (
                <div
                    key={id}
                    className="relative flex items-center justify-center text-base"
                    onMouseEnter={() => setHoveredId(id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    {/* Left circle — slides in from left */}
                    <span className={`pointer-events-none absolute left-0 bg-transparent inline-block border-3 border-[var(--accent-color)] border-r-transparent border-t-transparent border-b-transparent rounded-full h-[3rem] w-[3rem] transition-all duration-500 ease-in-out
                        ${hoveredId === id ? '-translate-x-[20%] sm:-translate-x-[25%] md:-translate-x-[35%] opacity-100' : 'translate-x-0 opacity-0'}`}
                    />

                    <a href={path} className="inline-block uppercase text-xs tracking-wider md:text-base sm:tracking-normal cursor-pointer">
                        {name}
                    </a>

                    {/* Right circle — slides in from right */}
                    <span className={`pointer-events-none absolute right-0 bg-transparent inline-block border-3 border-[var(--accent-color)] border-l-transparent border-t-transparent border-b-transparent rounded-full h-[3rem] w-[3rem] transition-all duration-500 ease-in-out
                        ${hoveredId === id ? 'translate-x-[20%] sm:translate-x-[25%] md:translate-x-[35%] opacity-100' : 'translate-x-0 opacity-0'}`}
                    />
                </div>
            ))}
        </nav>
    );
};

export default Navbar;