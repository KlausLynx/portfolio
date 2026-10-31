import { FaWhatsapp, FaLinkedin, FaDiscord, FaFacebook, FaThreads, FaXTwitter, FaGithub, FaInstagram } from "react-icons/fa6";
import  Logo from '../assets/Klaus Logo.png';


const socials = [
    { name: "WhatsApp", url: "https://wa.me/2347067179435", icon: FaWhatsapp, brandColor: "hover:text-[#25D366]" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/klauslynx/", icon: FaLinkedin, brandColor: "hover:text-[#0077B5]" },
    { name: "Discord", url: "https://discord.com/channels/1292382514698260483/1292382515457298444", icon: FaDiscord, brandColor: "hover:text-[#5865F2]" },
    { name: "Facebook", url: "https://www.facebook.com/Klauslynx", icon: FaFacebook, brandColor: "hover:text-[#1877F2]" },
    { name: "Threads", url: "https://www.threads.com/@klaus.lynx", icon: FaThreads, brandColor: "hover:text-[#FFFFFF]" },
    { name: "X", url: "https://x.com/Klaus_lynx", icon: FaXTwitter, brandColor: "hover:text-[#FFFFFF]" },
    { name: "GitHub", url: "https://github.com/KlausLynx", icon: FaGithub, brandColor: "hover:text-[#24292F]" },
    { name: "Instagram", url: "https://www.instagram.com/klaus.lynx/", icon: FaInstagram, brandColor: "hover:text-[#E1306C]" },
];

export const Footer = () => {
    return (
        <footer className="w-full bg-neutral-950 text-neutral-200 pt-16 pb-8 px-6 md:px-6 lg:px-20 border-t border-neutral-900 tracking-tight font-sans">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-6 mb-16">
            
            {/* Call to Action Section */}
            <div className="flex flex-col items-start gap-5 max-w-md">
            <p className="text-3xl md:text-4xl font-semibold text-neutral-100 leading-tight">
                Let’s build something great together.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-400">
                <a 
                href="mailto:klauslynx69@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center bg-neutral-100 text-neutral-950 font-medium px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-all duration-200 shadow-sm text-sm"
                >
                Mail me
                </a>
                <span>or</span>
                <a 
                href="https://wa.me"
                target="_blank" 
                rel="noopener noreferrer"
                className="relative text-neutral-200 hover:text-white transition-colors duration-200 font-medium group/link py-1"
                >
                Chat on WhatsApp
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover/link:w-full" />
                </a>
            </div>
            <aside className="text-xs uppercase tracking-widest text-accent font-medium mt-1 animate-pulse">
                Let's Connect
            </aside>
            </div>

            {/* Social Links Grid */}
            <div id="contact" className="flex flex-col gap-4 w-full md:w-auto">
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Social Links
                </p>
                <ul className="grid grid-cols-2 gap-x-12 gap-y-3.5 sm:grid-cols-4 md:grid-cols-2">
                    {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                        <li key={social.name}>
                        <a 
                            href={social.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-3 text-neutral-400 hover:text-neutral-100 transition-colors duration-200 group text-sm"
                        >
                            <span className={`text-lg text-neutral-500 transition-colors duration-200 ${social.brandColor}`}>
                            <Icon />
                            </span>
                            {social.name}
                        </a>
                        </li>
                    );
                    })}
                </ul>
            </div>
        </div>

        {/* Name Display Section */}
        <div className="mx-auto border-t border-neutral-900 pt-8 mt-8">
            <p className="text-[6.5vw] xl:text-[80px] leading-none text-center font-black text-text select-none uppercase whitespace-nowrap scale-y-200 tracking-wider xs:text-[8vw]">
                Okechukwu Jide-Onyia
            </p>
            <div className="mx-auto mt-20 flex justify-center"> 
                <img src={Logo} alt="Logo" className="w-75 h-auto object-contain" /> 
            </div> 
        </div>
        </footer>
    );
};
