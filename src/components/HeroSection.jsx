import { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import '../index.css'
import { MyFigure } from './MyheroImage'
import Navbar from '../Layouts/Navbar'
import CV from '../assets/Resume.pdf'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const LINES = [
    'HELLO!',
    "I'm Jide-Onyia Okechukwu Vitus, aka Klaus Lynx.",
    'a Shopify/web developer and Economist.',
    'Welcome to my portfolio!',
    ]

    function scrambledLine(line, progress) {
    const lockedCount = Math.floor(progress * line.length)
    let out = ''
    for (let i = 0; i < line.length; i++) {
        if (line[i] === ' ' || i < lockedCount) {
        out += line[i]
        } else {
        out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        }
    }
    return out
    }

    export default function Hero({ showCaseDom }) {
    const [introDone, setIntroDone] = useState(false)
    const navRef = useRef(null)
    const creativeRef = useRef(null)
    const introGroupRef = useRef(null)
    const textRef = useRef(null)
    const wrapperRef = useRef(null)

    const [scroll, setScroll] = useState(0)
    const [pos, setPos] = useState({ left: 0, top: 0 })
    const [isscroll, setIsScroll] = useState(false)
    const [dimensions, setDimensions] = useState({ vw: 1200, vh: 800 })

    // Handles responsive calculations dynamically safely
    useEffect(() => {
        const handleScroll = () => {
        const vw = document.documentElement.clientWidth
        const vh = document.documentElement.clientHeight
        setDimensions({ vw, vh })

        const rect = wrapperRef.current?.getBoundingClientRect()
        if (rect) {
            setPos({ left: rect.left, top: rect.top })
        }
        
        setScroll(Math.min(window.scrollY / window.innerHeight, 1))
        const started = window.scrollY > 0
        const projectDom = showCaseDom.current?.getBoundingClientRect().top

        if (projectDom > 0 && started) {
            setIsScroll(true)
        } else {
            setIsScroll(false)
        }
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleScroll)
        return () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
        }
    }, [showCaseDom])

    // GSAP: Intro Scramble Animation
    useGSAP(() => {
        const group = introGroupRef.current
        const text = textRef.current
        if (!group || !text) {
        setIntroDone(true)
        return
        }

        const rect = group.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const startX = window.innerWidth / 2 - centerX
        const startY = window.innerHeight / 2 - centerY

        gsap.set(group, { x: startX, y: startY, opacity: 0 })

        const proxy = { p: 0 }
        gsap.delayedCall(0.4, () => {
        gsap.to(proxy, {
            p: 1,
            duration: 1,
            ease: 'power2.inOut',
            onUpdate: () => {
            gsap.set(group, { x: startX * (1 - proxy.p), y: startY * (1 - proxy.p), opacity: proxy.p,})
            text.innerHTML = LINES.map((line) => scrambledLine(line, proxy.p)).join('<br/>')
            },
            onComplete: () => {
            gsap.set(group, { x: 0, y: 0 })
            setIntroDone(true)
            },
        })
        })
    }, [])

    // GSAP: Reveal UI Elements
    useGSAP(() => {
        if (!introDone) return
        gsap.timeline()
        .to(navRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .to(creativeRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    }, [introDone])

    const margin = 20
    const maxW = dimensions.vw - margin * 2
    const maxH = dimensions.vh - margin * 2
    const distance = maxH

    return (
            <div className='min-h-screen px-4 md:px-8 py-2 text-sm overflow-x-clip'>
            {/* SECTION WITH FIXED DYNAMIC PADDING */}
            <section className='flex flex-col pt-28 sm:pt-24' style={{ paddingBottom: distance }}>
                
                {/* RESPONSIVE HEADER BAR */}
                <div ref={navRef} className='fixed top-0 inset-x-0 z-50 px-4 md:px-8 pt-2 bg-white/80 dark:bg-zinc-950/80 backdrop-blur flex flex-col gap-4 sm:flex-row justify-between items-center opacity-0 -translate-y-4 border-b border-gray-100 pb-4 dark:border-zinc-800'>
                    <div className='flex justify-between items-center w-full sm:w-auto gap-5'>
                        <h1 className="text-xl md:text-3xl font-bold tracking-wider text-accent">LynxCode</h1>
                        <a 
                            href={CV} 
                            target='_blank' 
                            rel='noopener noreferrer' 
                            className='group relative inline-block overflow-hidden border-2 border-accent px-4 py-1.5 rounded-md text-center cursor-pointer text-sm font-medium md:text-base'
                            >
                            <span className='absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100'></span>
                            <span className='relative transition-colors duration-300 group-hover:text-black'>See CV</span>
                        </a>
                    </div>
                    <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                        <Navbar />
                    </div>
                </div>

                {/* HERO BODY AREA */}
                <div className='flex flex-col flex-1 justify-center gap-16 md:gap-24 mt-12'>
                
                    {/* INTRO TEXT SCRAMBLER OVERLAY / CONTAINER */}
                    <div ref={introGroupRef} className="flex items-center justify-center max-w-2xl mx-auto px-4">
                        <span className="bg-transparent inline-block border-l-4 border-accent h-32 md:h-48 w-2 md:w-8" />
                        <p ref={textRef} className="text-center font-mono leading-relaxed text-xs sm:text-sm md:text-lg lg:text-xl px-4 flex-1">
                        Loading
                        </p>
                        <span className="bg-transparent inline-block border-r-4 border-accent h-32 md:h-48 w-2 md:w-8" />
                    </div>

                    {/* SCROLL TRANSFORMING HERO WORKCASE */}
                    <div 
                        ref={creativeRef} 
                        className='flex flex-col justify-center items-center gap-4 md:flex-row md:gap-8 opacity-0 w-full'
                    >
                        <p className='font-black italic text-5xl sm:text-7xl lg:text-9xl select-none tracking-tighter uppercase'>
                        Creative
                        </p>
                        
                        {/* Morphing Interactive Wrapper */}
                        <div ref={wrapperRef} className="shrink-0 flex items-center justify-center  my-4 md:my-0" style={{ width: 200, height: 150 }}>
                            <div 
                                className='flex items-center justify-center overflow-hidden' 
                                style={{ 
                                position: isscroll ? 'fixed' : 'static', 
                                left: isscroll ? pos.left + ((dimensions.vw - maxW) / 2 - pos.left) * scroll : 'auto', 
                                top: isscroll ? pos.top + ((dimensions.vh - maxH) / 2 - pos.top) * scroll : 'auto', 
                                width: isscroll ? 200 + (maxW - 200) * scroll : 200, 
                                height: isscroll ? 150 + (maxH - 150) * scroll : 150,
                                }}
                            >
                                <MyFigure />
                            </div>
                        </div>
                        <p className="font-black italic text-5xl sm:text-7xl lg:text-9xl select-none tracking-tighter uppercase">
                        Dev
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
