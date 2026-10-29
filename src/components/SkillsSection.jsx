import { useState, useRef, useEffect, useCallback } from 'react';
import skills from '../data/skills.json';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { iconMap } from '../data/icon';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const SkillsSection = () => {
    const containerRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState("");
    const [activeItems, setActiveItems] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const getCategoryColor = (category) => {
        switch (category) {
        case "Core Capabilities": return "#2563EB";
        case "Finance & Trading": return "#FF5C00"; 
        case "Tech Stack": return "#4B5563"; 
        case "Currently Learning - Tech": return "#8F00FF";
        case "Currently Learning - Finance": return "#32CD32";
        default: return "#EA580C"; 
        }
    };

    const categoryColor = getCategoryColor(activeCategory);
    
    const skillCategories = skills.filter(skill => !skill.category.includes('Currently Learning'));
    const learningCategories = skills.filter(skill => skill.category.includes('Currently Learning'));
    
    const [learningChoice, setLearningChoice] = useState(
        learningCategories.length > 0 ? learningCategories[0].category : "Learning Tracks"
    );

    // Memoized physics layout engine scales smoothly to window widths
    const dropItems = useCallback((id, items) => {
        setActiveCategory(id);
        setActiveItems(items);

        requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const container = containerRef.current;
            if (!container) return;
            
            const els = Array.from(container.querySelectorAll('.fall-item'));
            if (els.length === 0) return;
            
            gsap.killTweensOf(els);
            
            // Dynamic dynamic padding & gaps for mobile viewports
            const isMobile = container.clientWidth < 640;
            const padding = isMobile ? 12 : 20;
            const baseGap = isMobile ? 8 : 12; 
            
            const usableWidth = container.clientWidth - padding * 2;
            const floorY = container.clientHeight - padding;

            const rows = [];
            let row = { items: [], width: 0, height: 0 };

            els.forEach((el) => {
            const w = el.offsetWidth;
            const h = el.offsetHeight;
            const needed = row.items.length === 0 ? w : row.width + baseGap + w;

            if (needed > usableWidth && row.items.length > 0) {
                rows.push(row);
                row = { items: [], width: 0, height: 0 };
            }
            row.width = row.items.length === 0 ? w : row.width + baseGap + w;
            row.height = Math.max(row.height, h);
            row.items.push({ el, w, h });
            });
            if (row.items.length) rows.push(row);

            let rowBottom = floorY;
            let order = 0;

            rows.forEach((r, rowIndex) => {
            const isLastRow = rowIndex === rows.length - 1;
            const totalItemsWidth = r.items.reduce((sum, it) => sum + it.w, 0);
            const count = r.items.length;

            let gap = baseGap;
            let startX = padding;

            if (!isLastRow && count > 1) {
                gap = (usableWidth - totalItemsWidth) / (count - 1);
            } else {
                const rowWidth = totalItemsWidth + gap * (count - 1);
                startX = padding + (usableWidth - rowWidth) / 2;
            }

            const targetY = rowBottom - r.height;
            let x = startX;

            r.items.forEach((it) => {
                gsap.fromTo(
                it.el,
                { 
                    x: x + (Math.random() * 16 - 8), 
                    y: -120, // Prevents elements from sticking behind elements during drop
                    rotate: Math.random() * 16 - 8, 
                    opacity: 0 
                },
                { 
                    x: x, 
                    y: targetY + (r.height - it.h),
                    rotate: Math.random() * 6 - 3, 
                    opacity: 1, 
                    duration: 0.9 + Math.random() * 0.3, 
                    delay: order * 0.04, 
                    ease: 'bounce.out' 
                }
                );
                x += it.w + gap;
                order++;
            });
            rowBottom = targetY - baseGap;
            });
        });
        });
    }, []);

    // Listeners recalculate placement if layout bounds warp (device rotation)
    useEffect(() => {
        const handleResize = () => {
        if (activeCategory && activeItems.length > 0) {
            dropItems(activeCategory, activeItems);
        }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeCategory, activeItems, dropItems]);

    useGSAP(() => {
        if (skillCategories.length > 0) {
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 75%',
            once: false,
            onEnter: () => dropItems(skillCategories[0].category, skillCategories[0].items)
        });
        }
    }, { scope: containerRef, dependencies: [dropItems] });

    const handleLearningItems = (chosenCategory) => {
        setLearningChoice(chosenCategory.category);
        setIsDropdownOpen(false);
        dropItems(chosenCategory.category, chosenCategory.items);
    };

    return (
        <div className='w-full max-w-[1152px] mx-auto px-4 mt-12 md:mt-24 lg:mt-36 select-none'>
        <div 
            className='w-full h-[480px] sm:h-[420px] md:h-[480px] border-b-4 border-accent/30 bg-slate-50/40 dark:bg-zinc-900/20 rounded-3xl pt-5 relative overflow-hidden shadow-inner' 
            ref={containerRef}
        >
            {/* Responsive Category bar cluster */}
            <div className='flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 px-3 max-w-3xl mx-auto relative z-20'>
            {skillCategories.map(skillCat => {
                const isActive = activeCategory === skillCat.category;
                return (
                <button 
                    className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer border ${
                    isActive 
                        ? 'bg-accent  text-black border-accent shadow-sm scale-105' 
                        : 'bg-grey-200 text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-black dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
                    }`}
                    key={skillCat.category} 
                    onClick={() => dropItems(skillCat.category, skillCat.items)}
                >
                    {skillCat.category}
                </button>
                );
            })}

            <div className='relative'>
                <button 
                className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer border flex items-center gap-1 ${
                    learningCategories.some(c => c.category === activeCategory)
                     ? 'bg-accent  text-black border-accent shadow-sm scale-105' 
                        : 'bg-grey-200 text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-black dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
                }`}
                onClick={() => setIsDropdownOpen(prev => !prev)}
                >
                <span>{learningChoice}</span>
                <span className={`text-[9px] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>

                {/* Dropdown Options overlay */}
                {isDropdownOpen && (
                <div className='absolute top-full left-1/2 -translate-x-1/2 mt-1.5 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 rounded-xl shadow-xl border border-gray-100 dark:border-zinc-700 z-30 min-w-[180px] sm:min-w-[220px] overflow-hidden py-1'>
                    {learningCategories.map(cat => (
                    <button
                        className='w-full px-4 py-2 text-left text-xs sm:text-sm transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700/50 cursor-pointer block'
                        key={cat.category}
                        onClick={() => handleLearningItems(cat)}
                    >
                        {cat.category}
                    </button>
                    ))}
                </div>
                )}
            </div>
            </div>

            {/* Physics Simulation Field */}
            <div className='absolute inset-0 pt-28 pointer-events-none'>
            {activeItems.map((item, index) => (
                <div 
                className='absolute top-0 left-0 whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-medium fall-item rounded-full px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-1.5 text-white shadow border border-white/10' 
                style={{ backgroundColor: categoryColor, opacity: 0 }} 
                key={`${item}-${index}`}
                >
                {iconMap[item] && <span className="text-xs sm:text-sm md:text-base">{iconMap[item]}</span>}
                <span>{item}</span>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};
