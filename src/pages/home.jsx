import Hero from '../components/HeroSection'
import { ProjectShowCase } from '../components/ProjectShowCase'
import { SkillsSection } from '../components/SkillsSection'
import { AboutSection } from '../components/aboutSection'
import { CoreValue } from '../components/CoreValues'
import { Footer } from '../Layouts/Footer'
import { useRef } from 'react'
export default function Home () {
    const projectShowCase = useRef(null)
    return (
        <>
            <Hero showCaseDom={projectShowCase}/>
            <ProjectShowCase ref={projectShowCase}/>
            <SkillsSection  />
            <AboutSection/>
            <CoreValue/>
            <Footer/>
        </>
        
    )
}