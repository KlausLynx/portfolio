import { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import '../index.css'
import { MyFigure } from './MyheroImage'
import Navbar from '../Layouts/Navbar'
import CV from '../assets/Okechukwu-Vitus (4).pdf'

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

export default function Hero({showCaseDom}) {
    const [introDone, setIntroDone] = useState(false)

    const navRef = useRef(null)
    const creativeRef = useRef(null)
    const introGroupRef = useRef(null)
    const textRef = useRef(null)

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

        gsap.set(group, { x: startX, y: startY })

        const proxy = { p: 0 }

        gsap.delayedCall(0.4, () => {
            gsap.to(proxy, {
                p: 1,
                duration: 2.2,
                ease: 'power2.inOut',
                onUpdate: () => {
                    gsap.set(group, { x: startX * (1 - proxy.p), y: startY * (1 - proxy.p) })
                    text.innerHTML = LINES.map((line) => scrambledLine(line, proxy.p)).join('<br/>')
                },
                onComplete: () => {
                    gsap.set(group, { x: 0, y: 0 })
                    setIntroDone(true)
                },
            })
        })
    }, [])

    useGSAP(() => {
        if (!introDone) return

        gsap.timeline()
            .to(navRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
            .to(creativeRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    }, [introDone])

    const distance = window.innerHeight
    const [scroll, setScroll] = useState(0)
    const wrapperRef = useRef(null)
    const [pos, setPos] = useState({ left: 0, top: 0 })
    const [isscroll, setIsScroll] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const rect = wrapperRef.current?.getBoundingClientRect()
            if (rect) setPos({ left: rect.left, top: rect.top })

            setScroll(Math.min(window.scrollY / window.innerHeight, 1))
            const started = window.scrollY > 0
            const projectDom = showCaseDom.current?.getBoundingClientRect().top
            console.log('ProjectShowCase top position:', projectDom)
            if(projectDom > 0 && started) {
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

    const margin = 20
    const vw = document.documentElement.clientWidth
    const vh = document.documentElement.clientHeight
    const maxW = vw - margin * 2
    const maxH = vh - margin * 2

    return (
        <div className='m-8 text-sm'>
            <section className='flex flex-col gap-10 ' style={{ paddingBottom: distance }}>
                <div
                    ref={navRef}
                    className='flex justify-between items-center opacity-0 -translate-y-4'
                >
                    <header className='flex justify-between items-center gap-5'>
                        <h1 className="text-base md:text-4xl lg:text-5xl">LynxCode</h1>
                        <a
                            href={CV}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group relative inline-block overflow-hidden border-2 border-accent px-6 py-2 rounded-md text-center cursor-pointer md:text-xl lg:text-2xl'
                            >
                            <span className='absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100'></span>
                            <span className='relative transition-colors duration-300 group-hover:text-white'>See CV</span>
                        </a>
                    </header>

                    <div><Navbar/></div>
                </div>

                <div className='flex flex-col flex-1 justify-center gap-20'>
                    <div ref={introGroupRef} className="flex items-center justify-center">
                        <span className="bg-transparent inline-block border-8 border-(--accent-color) border-r-transparent border-t-transparent border-b-transparent rounded-full h-48 w-8 -mr-50 md:w-48 md:-mr-20"/>

                        <p ref={textRef} className="text-center text-sm sm:text-base md:text-xl lg:text-2xl">
                            Loading
                        </p>

                        <span className="bg-transparent inline-block border-8 border-(--accent-color) border-l-transparent border-t-transparent border-b-transparent rounded-full h-48 w-8 -ml-50 md:w-48 md:-ml-20"/>
                    </div>

                    <div
                        ref={creativeRef}
                        className='flex flex-col flex-1 justify-center md:flex-row items-center gap-6 md:justify-center opacity-0'
                    >
                        <p className='font-black italic text-7xl lg:text-9xl'>Creative</p>

                        <div ref={wrapperRef} className="shrink-0 flex items-center justify-center" style={{ width: 200, height: 200 }}>
                            <div
                                className='flex items-center justify-center'
                                style={{
                                    position: isscroll ? 'fixed' : 'static',
                                    left: pos.left + ((vw - maxW) / 2 - pos.left) * scroll,
                                    top: pos.top + ((vh - maxH) / 2 - pos.top) * scroll,
                                    width: 200 + (maxW - 200) * scroll,
                                    height: 200 + (maxH - 200) * scroll,
                                }}
                            >
                                <MyFigure />
                            </div>
                        </div>

                        <p className="font-black italic text-7xl lg:text-9xl">Dev</p>
                    </div>
                </div>
            </section>
        </div>
    )
}