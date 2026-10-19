

export const  NavHover = () => {
    return(
        <div className="flex items-center justify-center">
            <span className="bg-transparent inline-block border-4 border-[var(--accent-color)] border-r-transparent border-t-transparent border-b-transparent rounded-full h-[5rem] w-[5rem] -mr-5"/>
            
            <span className="bg-transparent inline-block border-4 border-[var(--accent-color)] border-l-transparent border-t-transparent border-b-transparent rounded-full h-[5rem] w-[5rem] -ml-5"/>
        </div>
    )   
}