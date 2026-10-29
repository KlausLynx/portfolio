import { useEffect, forwardRef, useState } from 'react';
import projects from '../data/project.json';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'; 

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const progress = 0.25;
const offset = CIRCUMFERENCE * (1 - progress);

function ProjectContainer({ project, index, total }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (password) => {
        if (!password) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    useEffect(() => {
        console.log({ project, total });
    }, [project, total]);

    const shopifyProject = project.stack?.find(item => item === 'SHOPIFY');
    
    useEffect(() => {
        console.log(shopifyProject);
    }, [shopifyProject]);

    return (
        <div
            id='projects'
            className="min-h-screen w-full rounded-[24px] md:rounded-[32px] overflow-hidden text-white origin-top will-change-[transform,filter] flex items-center justify-center mb-8 lg:mb-16 last:mb-0 shadow-xl py-8 lg:py-16" 
            style={{ background: project.bg || '#0e0e10' }}
        >
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 items-center gap-8 lg:gap-12 p-6 sm:p-10 lg:p-16 max-w-7xl mx-auto">
                
                {/* Left Side: Project details & links */}
                <div className="flex flex-col lg:col-span-2 justify-between gap-8 h-full min-h-[350px] lg:min-h-0 py-2">
                    
                    {/* Progress Indicator Circle */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center flex-shrink-0">
                        <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90 w-full h-full">
                            <circle cx="60" cy="60" r={RADIUS} className="fill-none stroke-2 stroke-white/10" />
                            <circle 
                                cx={60} 
                                cy={60} 
                                r={RADIUS}
                                strokeDasharray={CIRCUMFERENCE} 
                                strokeDashoffset={offset}
                                className="stroke-2 stroke-white fill-none [stroke-linecap:round] transition-[stroke-dashoffset] duration-700 ease-out" 
                            />
                        </svg>
                        <div className="text-center font-bold text-sm sm:text-base md:text-lg tracking-wider text-white/90">
                            <span>{String(index + 1).padStart(2, '0')}</span>
                            <span className="text-white/40 mx-0.5">/</span>
                            <span className="text-white/50">{String(total).padStart(2, '0')}</span>
                        </div>
                    </div>

                    {/* Typography Block */}
                    <div className='flex flex-col gap-4 my-auto'>
                        <h2 className='font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-tight break-words'>
                            {project.title}
                        </h2>
                        <div className='text-white/80 font-medium text-base sm:text-lg max-w-xl leading-relaxed'>
                            <p>{project.description}</p>
                        </div>
                    </div>

                    {/* CTA External Anchor Link / Action container */}
                    <div className="flex flex-col gap-3 pt-2">
                        {shopifyProject && (
                            <span className="text-xs font-semibold tracking-wider text-accent/50 uppercase animate-pulse">
                                * Please copy the password before visiting the site
                            </span>
                        )}
                        <div className="flex flex-wrap items-center gap-4">
                            {shopifyProject && (
                                <button 
                                    onClick={() => handleCopy(project.password)}
                                    className="inline-flex items-center justify-center font-bold tracking-wider text-sm border border-dashed border-white/40 hover:border-white bg-white/10 px-6 py-3 rounded-full cursor-pointer transition-all duration-300 min-w-[110px]"
                                >
                                    {copied ? 'COPIED!' : 'COPY PASSWORD'}
                                </button>
                            )}
                            <a 
                                href={project.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className='inline-flex items-center gap-2.5 font-bold tracking-wider text-sm border border-white/20 hover:border-white bg-white/5 hover:bg-white text-white hover:text-black px-6 py-3 rounded-full transition-all duration-300'
                            >
                                <span>VISIT SITE</span>
                                <FaArrowUpRightFromSquare className="text-xs" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Right Side: Meta tags and media screenshot elements */}
                <div className="flex flex-col lg:col-span-1 gap-6 items-center justify-center w-full h-full py-2">
                    
                    {/* Meta tags stack */}
                    <div className='flex flex-col w-full text-xs sm:text-sm font-semibold tracking-widest text-white/60 uppercase'>
                        <div className="flex justify-between items-center py-3 border-b border-white/10 gap-4">
                            <span>Category</span>
                            <span className="text-white font-medium normal-case tracking-normal text-right">{project.category}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-white/10 gap-4">
                            <span>Stack</span>
                            <span className="text-white font-medium normal-case tracking-normal text-right">
                                {Array.isArray(project.stack) ? project.stack.join(', ') : project.stack}
                            </span>
                        </div>
                    </div>

                    {/* Images Canvas Container */}
                    <div className='flex flex-col gap-4 items-center justify-center w-full overflow-hidden rounded-2xl bg-black/10 p-3 min-h-[220px] lg:h-full lg:min-h-0'>
                        {project.images?.slice(0, 2).map((src, i) => (
                            <div key={src} className='w-full h-full min-h-[140px] overflow-hidden rounded-xl border border-white/5 hover:scale-[1.02] transition-transform duration-300 shadow-md'>
                                <img 
                                    src={src} 
                                    alt={`${project.title} screenshot ${i + 1}`} 
                                    className="w-full h-full object-cover max-h-[200px] lg:max-h-none"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export const ProjectShowCase = forwardRef((_, showCaseRef) => {
    return (
        <div className="space-y-6 md:space-y-12 p-2 sm:p-4" ref={showCaseRef}>
            {projects.map((project, index) => (
                <ProjectContainer 
                    key={project.title} 
                    project={project} 
                    index={index} 
                    total={projects.length} 
                />
            ))}
        </div>
    );
});

ProjectShowCase.displayName = 'ProjectShowCase';