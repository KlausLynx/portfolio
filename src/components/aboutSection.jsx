export const AboutSection = () => {
    return (
        <section id="about" className="py-16 sm:py-24 px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
                <div className="border-l-4 border-accent rounded-2xl pl-6 md:pl-10 space-y-6">
                    
                    <span className="text-sm font-semibold tracking-wider uppercase text-accent/80 block">
                        About Me
                    </span>

                    <div className="max-w-2xl text-lg sm:text-xl md:text-2xl font-medium text-gray-300 leading-relaxed md:leading-relaxed">
                        <p>
                            I blend design, strategy, and logic to create seamless websites. With over three years of experience, I’ve built stable, intelligent products for startups and economic sectors. Today, I continue to improve my skills as I am ever ready to adapt and learn as a creative developer. 
                        </p>
                    </div>

                    <div className="pt-2">
                        <a 
                            href="#contact" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block bg-accent hover:bg-accent/90 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-accent/20 animate-pulse"
                        >
                            Let's Work Together
                        </a>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}