export const AboutSection = () => {
    return (
        <div>
            <div className="container mx-auto mt-10 ps-5 md:ps-10 border-l-3 border-l-accent rounded-l-2xl py-2">
                <div className="min-w-xs md:w-6/12 md:text-3xl whitespace-break-spaces flex flex-col gap-3 p-2">
                    <span>Let’s build and ship something remarkable.</span>
                    <span className="inline-block">Open to agency collaborations,</span>
                    <span>freelance work, and fully remote full-time opportunities.</span>
                </div>

                <div className="mt-3">
                    <button className="bg-accent py-2 px-3 rounded-2xl animate-pulse"><a href="" target="_blank ">Let's Work Together</a></button>
                </div>
            </div>
            
        </div>
    )
}