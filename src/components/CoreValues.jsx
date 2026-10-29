import { FaUsers, FaUniversalAccess, FaGaugeHigh, FaMobileScreenButton, FaCode, FaHandshake } from "react-icons/fa6"

const values = [
    {
        icon: FaUsers,
        title: "Users first",
        text: "Every decision starts with the person using the product.",
    },
    {
        icon: FaUniversalAccess,
        title: "Accessibility",
        text: "Building interfaces that work for everyone, whatever their abilities.",
    },
    {
        icon: FaGaugeHigh,
        title: "Performance",
        text: "Fast load times and smooth interactions, because speed is part of the experience.",
    },
    {
        icon: FaMobileScreenButton,
        title: "Responsiveness",
        text: "Layouts that look and work great on any screen size.",
    },
    {
        icon: FaCode,
        title: "Clean, readable code",
        text: "Code that is simple to understand, maintain, and build on.",
    },
    {
        icon: FaHandshake,
        title: "Collaboration, adaptability",
        text: "Working well with others and adjusting quickly as things change.",
    },
]

export const CoreValue = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div className="md:sticky md:top-6 space-y-4 text-center md:text-left">
                    <span className="text-sm font-semibold tracking-wider uppercase text-primary">
                        My Philosophy
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                        Core Values <br className="hidden md:inline" /> that Define Me
                    </h2>
                    <p className="text-gray-400 max-w-md mx-auto md:mx-0 text-base sm:text-lg">
                        These foundational principles guide my development process, ensuring high-quality, impactful digital solutions.
                    </p>
                </div>

                {/* Right Side */}
                <div className="relative pl-6 md:pl-8 before:absolute before:left-0 before:top-4 before:bottom-4 before:w-0.5 before:bg-white/20">
                    <div className="flex flex-col gap-6">
                        {values.map(({ icon: Icon, title, text }) => (
                            <div 
                                key={title} 
                                className="relative group transition-all duration-300 hover:-translate-y-0.5"
                            >
                                {/* Horizontal timeline connector indicator */}
                                <div className="absolute -left-6 md:-left-8 top-1/2 -translate-y-1/2 w-6 md:w-8 h-0.5 bg-white/20 group-hover:bg-primary transition-colors duration-300" />
                                
                                {/* Vertical tree node circle indicator */}
                                <div className="absolute -left-[27px] md:-left-[35px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white/40 group-hover:bg-primary group-hover:scale-125 transition-all duration-300" />

                                {/* Value Card Box */}
                                <div className="border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/50 backdrop-blur-sm rounded-lg p-4 sm:p-5 flex items-start gap-4 shadow-sm transition-all duration-300">
                                    <div className="p-2.5 rounded-md bg-white/5 text-primary shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
                                        <Icon size={24} className="sm:size-[28px]" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-base sm:text-lg text-white">
                                            {title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                                            {text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
