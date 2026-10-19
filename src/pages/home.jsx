import Hero from '../components/HeroSection'
import { ProjectShowCase } from '../components/ProjectShowCase'
// import { default as ProjectShowCase } from '../components/MyProjectShowCase'
import { SkillsSection } from '../components/SkillsSection'
import { AboutSection } from '../components/aboutSection'
import { useRef } from 'react'
export default function Home () {
    const projectShowCase = useRef(null)
    return (
        <>
            <Hero showCaseDom={projectShowCase}/>
            <ProjectShowCase/>
            <SkillsSection ref={projectShowCase} />
            <AboutSection/>
        </>
        
    )
}