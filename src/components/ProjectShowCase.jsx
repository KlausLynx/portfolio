import { useEffect } from 'react';
import projects from '../data/project.json'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'; 
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const progress = 0.25
const offset = CIRCUMFERENCE * (1 - progress);
console.log(projects)

function ProjectContainer({project, total}) {
    useEffect(()=> {
        console.log({project, total})
    }, [])
    return (
        <div className="h-screen w-full rounded-[28px] overflow-hidden bg-[#0e0e10] text-white origin-top will-change-[transform,filter]" style={{background: project.bg}}>
            <div className="h-full grid grid-cols-3 items-stretch gap-15 p-15 max-w-350 mx-auto">
                {/* Left */}
                <div className="flex flex-col col-span-2 flex-1 justify-between gap-5">
                    <div className="relative w-32 h-32">
                        <svg viewBox="0 0 120 120" className="absolute inset-0 rotate-90 ">
                            <circle cx="60" cy="60" r={RADIUS} className="fill-none stroke-[1.5] stroke-[#ffffff26]" />
                            <circle 
                                cx={60} 
                                cy={60} 
                                r={RADIUS}
                                strokeDasharray={CIRCUMFERENCE} 
                                strokeDashoffset={offset}
                                className="stroke-[1.5] stroke-[#fff] fill-none [stroke-linecap:round]
                                [transition:stroke-dashoffset_0.6s_ease]
                                " 
                            />
                        </svg>
                        <div>
                            <span></span>
                            <span>&nbsp;</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h2 className='text-amber-950 font-medium text-6xl'>{project.title}</h2>
                        <div className='text-color-950 font-medium text-lg max-w-137.5'>
                            <p>{project.description}</p>
                        </div>
                    </div>

                    <a href={project.url} target="_blank" rel="noopener noreferrer" className='text-color-950 font-bold'>
                        (   <span className='px-4 inline-flex items-center gap-2 hover:underline'>
                                <span>VISIT SITE</span>
                                <FaArrowUpRightFromSquare />
                            </span>
                        )
                    </a>
                </div>

                {/* Right */}
                <div className="flex flex-col flex-1 gap-5 items-center justify-center w-full overflow-hidden">
                    <div className='flex flex-col w-full'>
                        <span className='mb-3'>{project.category}</span>
                        <span className='h-1 border-t' ></span>
                        <span className='mb-3'>{project.stack}</span>
                        <span className='h-1 border-t' ></span>
                    </div>
                    <div className='flex flex-1 flex-col gap-5 items-center justify-center w-full overflow-hidden'>
                        {
                            project.images?.map((src, i) => (
                                <div key={src} className=''>
                                    <img src={src} alt={`${project.title} screenshot ${i + 1}`} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ProjectShowCase = () => {
    return (
        <div className="h-full m-4">
            {
                projects.map((project, index) => (
                    <ProjectContainer key={project.title} project={project} index={index} total={projects.length} />
                ))
            }
        </div>
    )
}