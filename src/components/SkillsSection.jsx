import { useState, useRef, useEffect, forwardRef } from 'react';
import skills from '../data/skills.json'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from '@gsap/react';
import { iconMap } from '../data/icon'

gsap.registerPlugin(ScrollTrigger, useGSAP)
export const SkillsSection = forwardRef ((_, showCase) => {
    const containerRef = useRef(null);
    const [activeCategory, setActiveCatgory] = useState()
    const [activeItems, setActiveItems] = useState([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const getCategoryColor = (activeCategory) => {
        switch(activeCategory) {
            case "Core Capabilities":
                return "blue"
            case "Finance & Trading":
                return "#FF5C00"
            case "Tech Stack":
                return "#674f"
            case "Currently Learning - Tech":
                return "#8F00FF"
            case "Currently Learning - Finance":
                return "#32CD32"
            default:
                return "orange"
        }
    }

    const categoryColor = getCategoryColor(activeCategory)
    const skillCategories = skills.filter(skill => !skill.category.includes('Currently Learning'));
    const learningCategories = skills.filter(skill => skill.category.includes('Currently Learning'));
    const [learningChoice, setLearningChoice] = useState(learningCategories[0].category)

    useEffect(()=> {
        console.log(learningChoice)
    }, [learningChoice])

    const dropItems = (id, items) => {
        setActiveCatgory(id)
        setActiveItems(items)

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const container = containerRef.current
                if (!container) return

                const els = Array.from(container.querySelectorAll('.fall-item'))
                gsap.killTweensOf(els)

                const padding = 16
                const baseGap = 10
                const usableWidth = container.clientWidth - padding * 2
                const floorY = container.clientHeight - padding // bottom line of the box

                // STEP 1: split items into rows (bottom row first)
                const rows = []
                let row = { items: [], width: 0, height: 0 }

                els.forEach((el) => {
                    const w = el.offsetWidth
                    const h = el.offsetHeight
                    const needed = row.items.length === 0 ? w : row.width + baseGap + w

                    if (needed > usableWidth && row.items.length > 0) {
                        rows.push(row)
                        row = { items: [], width: 0, height: 0 }
                    }
                    row.width = row.items.length === 0 ? w : row.width + baseGap + w
                    row.height = Math.max(row.height, h)
                    row.items.push({ el, w, h })
                })
                if (row.items.length) rows.push(row)

                // STEP 2: give each item an x/y landing spot
                let rowBottom = floorY
                let order = 0

                rows.forEach((r, rowIndex) => {
                    const isLastRow = rowIndex === rows.length - 1
                    const totalItemsWidth = r.items.reduce((sum, it) => sum + it.w, 0)
                    const count = r.items.length

                    // full rows: spread items to touch both sides
                    // last (top) row: keep normal gap and centre it
                    let gap = baseGap
                    let startX = padding
                    if (!isLastRow && count > 1) {
                        gap = (usableWidth - totalItemsWidth) / (count - 1)
                    } else {
                        const rowWidth = totalItemsWidth + gap * (count - 1)
                        startX = padding + (usableWidth - rowWidth) / 2
                    }

                    const targetY = rowBottom - r.height
                    let x = startX

                    r.items.forEach((it) => {
                        gsap.fromTo(
                            it.el,
                            {
                                x: x + (Math.random() * 30 - 15),
                                y: -300,
                                rotate: Math.random() * 30 - 15,
                                opacity: 0
                            },
                            {
                                x: x,
                                y: targetY + (r.height - it.h), // sit on the row's floor
                                rotate: Math.random() * 8 - 4,
                                opacity: 1,
                                duration: 1.2 + Math.random() * 0.4,
                                delay: order * 0.08,
                                ease: 'bounce.out'
                            }
                        )
                        x += it.w + gap
                        order++
                    })

                    rowBottom = targetY - baseGap // next row sits on top of this one
                })
            })
        })
    }

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 70%',
            once: false,
            onEnter: () => dropItems(skillCategories[0].category, skillCategories[0].items)
        })
    }, {scope: containerRef})

    const handleLearningItems = (chosenCategory) => {
        setLearningChoice(chosenCategory.category)
        setIsDropdownOpen(false)
        dropItems(chosenCategory.category, chosenCategory.items)
    }

    return (
        <div>
            <div className='border-b-4 border-b-yellow-950 rounded-b-2xl h-87.5 pt-5 lg:pt-10 relative overflow-x-hidden' ref={containerRef}>
                <div ref={showCase} className='grid md:flex justify-center mx-auto w-2/3 gap-3 md:text-xl'>
                    {skillCategories.map( skillCat => (
                        <button className='text-base md:text-xl cursor-pointer' key={skillCat.category} onClick={() => dropItems(skillCat.category, skillCat.items)}>{skillCat.category}</button>
                    ))}

                    <div className='relative'>
                        <button
                            className='cursor-pointer text-base md:text-xl'
                            onClick={() => setIsDropdownOpen(prev => !prev)}
                        >
                            {learningChoice} ▾
                        </button>

                        {isDropdownOpen && (
                            <div className='absolute top-full left-0 bg-white text-black rounded shadow-md z-10 min-w-max'>
                                {learningCategories.map(cat => (
                                    <div
                                        className='px-3 py-2 cursor-pointer hover:bg-gray-100 text-center'
                                        key={cat.category}
                                        onClick={() => handleLearningItems(cat)}
                                    >
                                        {cat.category}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className='mx-auto'>
                    {activeItems.map((item, index) => (
                        <div
                            className='absolute top-0 left-0 whitespace-nowrap text-2xl fall-item rounded-4xl p-2 flex items-center gap-2'
                            style={{backgroundColor: categoryColor, opacity: 0}}
                            key={index + 1}
                        >
                            {iconMap[item]}
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
})