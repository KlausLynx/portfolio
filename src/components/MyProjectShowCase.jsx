"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectShowcase.css";

gsap.registerPlugin(ScrollTrigger);

// ---- Replace with your real project data ----
const PROJECTS = [
  {
    category: "ECOMMERCE WEBSITE",
    stack: ["NEXTJS", "SHOPIFY STOREFRONT API", "GSAP"],
    bg: "radial-gradient(circle at 30% 35%, #22C55E 0%, #0D0F0E 70%)",
    title: "Modevelle",
    description:
      "A demo e-commerce website for women's fashion, featuring product listings, cart functionality, and user authentication. Built using Next.js and the Shopify Storefront API.",
    url: "#",
    images: [
      "/projects/modevelle-1.png",
      "/projects/modevelle-2.png",
      "/projects/modevelle-3.png",
    ],
  },
  {
    category: "BOOKING WEBSITE",
    stack: ["NEXTJS", "SUPERBASE", "GSAP"],
    bg: "radial-gradient(circle at 30% 35%, #8B5E3C 0%, #0D0F0E 70%)",
    title: "The Shear Room",
    description:
      "A demo booking website for a unisex salon brand, including service and pricing displays, an end-to-end booking workflow, and user authentication. Built with Next.js and Supabase.",
    url: "#",
    images: [
      "/projects/shearroom-1.png",
      "/projects/shearroom-2.png",
      "/projects/shearroom-3.png",
    ],
  },
  {
    category: "PORTFOLIO WEBSITE",
    stack: ["NEXTJS", "GSAP", "TAILWIND"],
    bg: "radial-gradient(circle at 30% 35%, #1E293B 0%, #0D0F0E 70%)",
    title: "Project Three",
    description: "Swap this description for your third project.",
    url: "#",
    images: [
      "/projects/project3-1.png",
      "/projects/project3-2.png",
      "/projects/project3-3.png",
    ],
  },
  {
    category: "SAAS DASHBOARD",
    stack: ["REACT", "NODE", "POSTGRES"],
    bg: "radial-gradient(circle at 30% 35%, #C22F2F 0%, #0D0F0E 70%)",
    title: "Project Four",
    description: "Swap this description for your fourth project.",
    url: "#",
    images: [
      "/projects/project4-1.png",
      "/projects/project4-2.png",
      "/projects/project4-3.png",
    ],
  },
];

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ProjectCard({ project, index, total, setSectionRef }) {
  const imageWrapRefs = useRef([]);
  const activeImg = useRef(0);
  const intervalRef = useRef(null);
  const localRef = useRef(null);

  // progress ring: how much of the circle is filled for this project's position
  const progress = (index + 1) / total;
  const offset = CIRCUMFERENCE * (1 - progress);

  useEffect(() => {
    const imgs = imageWrapRefs.current;

    gsap.set(imgs, { opacity: 0, scale: 0.9, y: 30, rotate: 4, zIndex: 0 });
    gsap.set(imgs[0], { opacity: 1, scale: 1, y: 0, rotate: 0, zIndex: 2 });

    const advance = () => {
      const imgs = imageWrapRefs.current;
      const current = activeImg.current;
      const next = (current + 1) % imgs.length;

      gsap.set(imgs[next], { zIndex: 3 });
      gsap.fromTo(
        imgs[next],
        { opacity: 0, scale: 0.9, y: 30, rotate: 4 },
        { opacity: 1, scale: 1, y: 0, rotate: 0, duration: 0.7, ease: "power3.out" }
      );
      gsap.to(imgs[current], {
        opacity: 0,
        scale: 1.05,
        y: -25,
        rotate: -4,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => gsap.set(imgs[current], { zIndex: 0 }),
      });

      activeImg.current = next;
    };

    // only auto-cycle while this project's card is mostly in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          intervalRef.current = setInterval(advance, 2200);
        } else {
          clearInterval(intervalRef.current);
        }
      },
      { threshold: 0.6 }
    );
    if (localRef.current) observer.observe(localRef.current);

    return () => {
      clearInterval(intervalRef.current);
      observer.disconnect();
    };
  }, [project]);

  return (
    <div
      ref={(el) => {
        localRef.current = el;
        setSectionRef(el);
      }}
      className="stackCard"
      style={{ background: project.bg }}
    >
      <div className="stackCard__inner">
        {/* LEFT */}
        <div className="stackCard__left">
          <div className="stackCard__badge">
            <svg viewBox="0 0 120 120" className="stackCard__ring">
              <circle cx="60" cy="60" r={RADIUS} className="stackCard__ringTrack" />
              <circle
                cx="60"
                cy="60"
                r={RADIUS}
                className="stackCard__ringFill"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={offset}
              />
            </svg>
            <div className="stackCard__badgeText">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="stackCard__badgeTotal">
                &nbsp;|&nbsp;{String(total).padStart(2, "0")}
              </span>
            </div>
          </div>

          <h2 className="stackCard__title">{project.title}</h2>
          <p className="stackCard__desc">{project.description}</p>
          <a href={project.url} className="stackCard__link">
            ( VISIT SITE ↗ )
          </a>
        </div>

        {/* RIGHT */}
        <div className="stackCard__right">
          <div className="stackCard__meta">
            <span className="stackCard__category">{project.category}</span>
            <span className="stackCard__stack">{project.stack.join("  ·  ")}</span>
          </div>

          <div className="stackCard__stage">
            {project.images.map((src, i) => (
              <div
                key={src}
                ref={(el) => (imageWrapRefs.current[i] = el)}
                className="stackCard__image"
              >
                <img src={src} alt={`${project.title} screenshot ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = sectionRefs.current;

      sections.forEach((section, i) => {
        // pin each project full-screen while the next one scrolls up over it
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });

        // as the NEXT section arrives, this one steps back (scales down / dims)
        const next = sections[i + 1];
        if (next) {
          gsap.to(section, {
            scale: 0.92,
            y: -40,
            filter: "brightness(0.55)",
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="stackWrapper">
      {PROJECTS.map((project, i) => (
        <ProjectCard
          key={project.title}
          project={project}
          index={i}
          total={PROJECTS.length}
          setSectionRef={(el) => (sectionRefs.current[i] = el)}
        />
      ))}
    </div>
  );
}