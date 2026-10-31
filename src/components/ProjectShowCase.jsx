import { useEffect, forwardRef, useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projects from '../data/project.json';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const imageMap = import.meta.glob('../assets/*.png', { eager: true, import: 'default' });

/* ---------- Images: sharp one in front, taller + narrower blurred one behind ---------- */
function ImageSlideshow({ images = [], title }) {
    const boxRef = useRef(null);

    useEffect(() => {
        const box = boxRef.current;
        const slides = box?.querySelectorAll('.slide');
        if (!slides || slides.length === 0) return;

        const mm = gsap.matchMedia();

        mm.add(
            {
                small: '(max-width: 767px)',
                large: '(min-width: 768px)',
                reduce: '(prefers-reduced-motion: reduce)',
            },
            (context) => {
                const { small, reduce } = context.conditions;

                if (slides.length === 1) {
                    gsap.set(slides[0], { opacity: 1 });
                    return;
                }

                // "Reduce motion" is on (common on Windows): simple fade only, no blur or scale
                if (reduce) {
                    gsap.set(slides, { opacity: 0 });
                    gsap.set(slides[0], { opacity: 1 });
                    const fade = gsap.timeline({ repeat: -1 });
                    slides.forEach((_, i) => {
                        fade.to(slides[i], { opacity: 0, duration: 0.3, ease: 'none' }, '+=3')
                            .to(slides[(i + 1) % slides.length], { opacity: 1, duration: 0.3, ease: 'none' }, '<');
                    });
                    return;
                }

                // Smaller blur on phones (blur is heavy for mobile GPUs)
                const BACK = {
                    filter: `blur(${small ? 6 : 14}px)`,
                    scaleX: small ? 0.92 : 0.88,
                    scaleY: small ? 1.08 : 1.12,
                };
                const FRONT = { filter: 'blur(0px)', scaleX: 1, scaleY: 1 };

                const n = slides.length;
                gsap.set(slides, { opacity: 0, zIndex: 0, transformOrigin: 'center bottom', ...BACK });
                gsap.set(slides[0], { opacity: 1, zIndex: 3, ...FRONT });
                gsap.set(slides[1], { opacity: 1, zIndex: 2 });

                const tl = gsap.timeline({ repeat: -1 });

                slides.forEach((_, i) => {
                    const cur = slides[i];
                    const nxt = slides[(i + 1) % n];
                    const after = slides[(i + 2) % n];

                    tl.set(cur, { zIndex: 3 })
                        .set(nxt, { zIndex: 2 })
                        .to(cur, { opacity: 0, duration: 0.3, ease: 'none' }, '+=1')
                        .to(nxt, { ...FRONT, duration: 0.3, ease: 'none' }, '<')
                        .set(after, { zIndex: 1, opacity: 0, ...BACK })
                        .to(after, { opacity: 1, duration: 0.2 });
                });

                // Only run the slideshow while it's on screen (saves battery on phones)
                // (IntersectionObserver, because ScrollTrigger measures wrong inside sticky cards)
                const io = new IntersectionObserver(
                    ([entry]) => (entry.isIntersecting ? tl.play() : tl.pause()),
                    { threshold: 0.05 }
                );
                io.observe(box);
                return () => io.disconnect();
            },
            box
        );

        return () => mm.revert();
    }, [images]);

    return (
        <div
            ref={boxRef}
            className="relative w-full h-[200px] sm:h-[280px] lg:h-[320px]"
            style={{ clipPath: 'inset(-200px -50px 0px -50px)' }}
        >
            {images.map((src, i) => (
                <img
                    key={src}
                    src={imageMap[src] || src}
                    alt={`${title} screenshot ${i + 1}`}
                    decoding="async"
                    draggable={false}
                    className={`slide absolute inset-0 w-full h-full object-cover rounded-xl border border-white/5 shadow-md ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}
        </div>
    );
}

/* ---------- One project card ---------- */
function ProjectContainer({ project, index, total }) {
    const [copied, setCopied] = useState(false);
    const progress = (index + 1) / total;
    const RADIUS = 54;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    const offset = CIRCUMFERENCE * (1 - progress);

    const copyText = async (text) => {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return;
        }
        // Fallback for non-secure contexts
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (!ok) throw new Error('execCommand copy failed');
    };

    const handleCopy = async (password) => {
        if (!password) return;
        try {
            await copyText(String(password));
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    };

    const isShopify = project.stack?.includes('SHOPIFY');

    return (
        <div
            // Mobile/tablet: height grows with content. Desktop (lg+): fixed 700px sticky card.
            className="project-card w-full h-auto lg:h-[700px] lg:sticky lg:top-[-20vh] rounded-[24px] md:rounded-[32px] overflow-hidden text-white origin-top flex items-center justify-center shadow-xl py-6 lg:py-4 will-change-transform"
            style={{ background: project.bg || '#0e0e10' }}
        >
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 items-center gap-8 lg:gap-12 p-5 sm:p-8 lg:px-12 max-w-7xl mx-auto">

                {/* Left Side: Project details & links */}
                <div className="flex flex-col lg:col-span-2 justify-between gap-6 sm:gap-8 h-full py-2">

                    {/* Progress Indicator Circle */}
                    <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center flex-shrink-0">
                        <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90 w-full h-full">
                            <circle cx="60" cy="60" r={RADIUS} className="fill-none stroke-2 stroke-white/10" />
                            <circle
                                cx={60}
                                cy={60}
                                r={RADIUS}
                                strokeDasharray={CIRCUMFERENCE}
                                strokeDashoffset={offset}
                                className="stroke-2 stroke-white fill-none [stroke-linecap:round] transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
                            />
                        </svg>
                        <div className="text-center font-bold text-xs sm:text-base md:text-lg tracking-wider text-white/90">
                            <span>{String(index + 1).padStart(2, '0')}</span>
                            <span className="text-white/40 mx-0.5">/</span>
                            <span className="text-white/50">{String(total).padStart(2, '0')}</span>
                        </div>
                    </div>

                    {/* Typography Block */}
                    <div className="flex flex-col gap-3 sm:gap-4 my-auto">
                        <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-white leading-tight break-words">
                            {project.title}
                        </h2>
                        <div className="text-white/80 font-medium text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
                            <p>{project.description}</p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col gap-3 pt-2">
                        {isShopify && (
                            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-accent/50 uppercase animate-pulse motion-reduce:animate-none">
                                * Please copy the password before visiting the site
                            </span>
                        )}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                            {isShopify && (
                                <button
                                    onClick={() => handleCopy(project.password)}
                                    className="inline-flex items-center justify-center font-bold tracking-wider text-xs sm:text-sm border border-dashed border-white/40 hover:border-white active:border-white bg-white/10 px-5 sm:px-6 py-3 rounded-full cursor-pointer transition-all duration-300 min-w-[110px]"
                                >
                                    {copied ? 'COPIED!' : 'COPY PASSWORD'}
                                </button>
                            )}
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 font-bold tracking-wider text-xs sm:text-sm border border-white/20 hover:border-white active:border-white bg-white/5 hover:bg-white active:bg-white text-white hover:text-black active:text-black px-5 sm:px-6 py-3 rounded-full transition-all duration-300"
                            >
                                <span>VISIT SITE</span>
                                <FaArrowUpRightFromSquare className="text-xs" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Side: Meta tags and images */}
                <div className="flex flex-col lg:col-span-1 gap-4 sm:gap-6 items-center justify-center w-full h-full py-2">

                    <div className="flex flex-col w-full text-xs sm:text-sm font-semibold tracking-widest text-white/60 uppercase">
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

                    <div className="w-full rounded-2xl bg-black/10 px-3 sm:px-4 py-6 sm:py-8">
                        <ImageSlideshow images={project.images} title={project.title} />
                    </div>
                </div>

            </div>
        </div>
    );
}

/* ---------- Wrapper: stacks cards + shrinks the previous one ---------- */
export const ProjectShowCase = forwardRef((_, showCaseRef) => {
    const innerRef = useRef(null);

    // keep the forwarded ref working AND use our own
    const setRefs = (el) => {
        innerRef.current = el;
        if (typeof showCaseRef === 'function') showCaseRef(el);
        else if (showCaseRef) showCaseRef.current = el;
    };

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        mm.add(
            {
                desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
                mobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
            },
            (context) => {
                const { desktop } = context.conditions;
                const cards = gsap.utils.toArray('.project-card', innerRef.current);

                if (desktop) {
                    // Desktop: previous card shrinks as the next one slides over it
                    cards.forEach((card, i) => {
                        if (i === cards.length - 1) return;

                        gsap.to(card, {
                            scale: 0.8,
                            transformOrigin: 'center top',
                            ease: 'none',
                            scrollTrigger: {
                                trigger: cards[i + 1],
                                start: 'top bottom',
                                end: 'top top',
                                scrub: 0.5,
                                invalidateOnRefresh: true,
                            },
                        });
                    });
                } else {
                    // Phone / tablet: no sticky stacking, so a light fade-up as each card enters
                    cards.forEach((card) => {
                        gsap.from(card, {
                            y: 40,
                            opacity: 0,
                            duration: 0.7,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 88%',
                                once: true,
                            },
                        });
                    });
                }
            },
            innerRef
        );

        // Re-measure once images/fonts finish loading so trigger positions are correct
        const onLoad = () => ScrollTrigger.refresh();
        if (document.readyState === 'complete') onLoad();
        else window.addEventListener('load', onLoad);

        return () => {
            window.removeEventListener('load', onLoad);
            mm.revert();
        };
    }, []);

    return (
        <div id="projects" className="flex flex-col gap-4 lg:gap-0 p-2 sm:p-4" ref={setRefs}>
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