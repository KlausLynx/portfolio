import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

// The characters we flicker through before a letter "locks in"
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

// The final lines, kept separate so each one wraps on its own on small screens
const LINES = [
    'HELLO!',
    "I'm Jide-Onyia Okechukwu Vitus, aka Lynx.",
    'a Shopify/web developer and Economist.',
    'Welcome to my portfolio!',
]

// Given how "locked in" a line is (0 to 1), build its current scrambled version
function scrambledLine(line, progress) {
    const lockedCount = Math.floor(progress * line.length)
    let out = ''
    for (let i = 0; i < line.length; i++) {
        if (line[i] === ' ' || i < lockedCount) {
            out += line[i] // spaces, or letters already locked in, stay as-is
        } else {
            out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        }
    }
    return out
}

// groupRef = the outer container holding BOTH brackets and this text.
// We move that whole container as one block, so nothing can drift apart.
export default function LoadingIntro({ onDone, groupRef }) {
    const textRef = useRef(null)

    useGSAP(() => {
        const group = groupRef?.current
        const text = textRef.current
        if (!group) return

        // Where the whole group (brackets + text) naturally sits on the page
        const rect = group.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // How far that natural spot is from dead-center of the screen
        const startX = window.innerWidth / 2 - centerX
        const startY = window.innerHeight / 2 - centerY

        // Pull the WHOLE group (brackets included) to screen-center to start
        gsap.set(group, { x: startX, y: startY })

        // One shared "progress" value drives the slide AND the scramble,
        // so text and brackets are always in the exact same place together.
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
                    onDone?.()
                },
            })
        })
    }, { scope: textRef })

    return (
        <p
            ref={textRef}
            className="text-center text-sm sm:text-base md:text-xl lg:text-2xl"
        >
            Loading
        </p>
    )
}