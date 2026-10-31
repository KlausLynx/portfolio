import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaNodeJs,
    FaLaptopCode, FaMobileAlt, FaPalette, FaCode, FaPuzzlePiece, FaBolt,
    FaHandshake, FaGraduationCap, FaExchangeAlt, FaChartLine, FaChartPie,
    FaCoins, FaPiggyBank, FaGlobe, FaGithub, FaGitlab, FaGitAlt, FaPhp, FaGhost, FaPaw
} from "react-icons/fa";

import {
    SiTypescript, SiTailwindcss, SiExpress, SiMongodb,
    SiShopify, SiFigma, SiVercel, SiNetlify, SiNextdotjs,  SiSupabase, SiRedux,
} from "react-icons/si";

export const iconMap = {
    // Core Capabilities
    "Frontend Development": <FaLaptopCode />,
    "Responsive & Mobile-First Design": <FaMobileAlt />,
    "UI Development": <FaPalette />,
    "Write Code": <FaCode />,
    "No Code": <FaPuzzlePiece />,
    "Less Code": <FaBolt />,
    "Collaboration": <FaHandshake />,

    // Finance & Trading
    "BSc Ed, Economics Education": <FaGraduationCap />,
    "Forex Trader": <FaExchangeAlt />,
    "Stock Trader": <FaChartLine />,
    "Financial Analysis": <FaChartPie />,
    "Economics": <FaCoins />,

    // Tech Stack
    "HTML5": <FaHtml5 color="#E34F26" />,
    "CSS3": <FaCss3Alt color="#1572B6" />,
    "JAVASCRIPT": <FaJs color="#F7DF1E" />,
    "REACT": <FaReact color="#61DAFB" />,
    "Typescript": <SiTypescript color="#3178C6" />,
    "TAILWIND CSS": <SiTailwindcss color="#06B6D4" />,
    "BOOTSTRAP 5": <FaBootstrap color="#7952B3" />,
    "PHP": <FaPhp color="#777BB4" />,
    "Next.js": <SiNextdotjs />,
    "Liquid": <SiShopify color="#7AB55C" />,
    "Supabase": <SiSupabase color="#3FCF8E" />,
    "Jotai": <FaGhost color="#A78BFA" />,
    "Zustand": <FaPaw color="#C2410C" />,
    "Redux": <SiRedux color="#764ABC" />,
    "Git": <FaGitAlt color="#F05032" />,
    "Github": <FaGithub />,
    "GitLab": <FaGitlab color="#FC6D26" />,
    "Vercel": <SiVercel />,
    "Netlify": <SiNetlify color="#00C7B7" />,

    // Currently Learning
    "Node.js": <FaNodeJs color="#5FA04E" />,
    "Expressjs": <SiExpress />,
    "MongoDB": <SiMongodb color="#47A248" />,
    "Wealth Management": <FaPiggyBank />,

    // Services
    "Shopify Store Development": <SiShopify color="#7AB55C" />,
    "Custom Website Development": <FaGlobe />,
    "UI Implementation from Design": <SiFigma color="#F24E1E" />,
};