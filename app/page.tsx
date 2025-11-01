"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sun,
  Moon,
  Menu,
  Loader2,
  FileText,
} from "lucide-react";
import Image from "next/image";

// ==================== PROJECT DATA ====================
const FEATURED_PROJECTS = [
  {
    title: "Listed",
    subtitle: "AI-Powered Task Management",
    year: "2025",
    sector: "Full-Stack",
    responsibility: "Development, UI/UX, Architecture",
    impact: "Serving 1000+ daily users",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Supabase"],
    description:
      "Full stack task management system with intelligent task creation through natural language processing. Features dual task creation methods, suggestion engine, and comprehensive admin panel with advanced analytics.",
    features: [
      "Conversational chat interface",
      "Task management system",
      "Real-time analytics dashboard",
      "NextAuth secure authentication",
      "Scalable Prisma ORM architecture",
    ],
    images: [
      "/assets/listed1.png",
      "/assets/listed2.png",
      "/assets/listed3.png",
      "/assets/listed4.png",
      "/assets/listed5.png",
      "/assets/listed6.png",
      "/assets/listed7.png",
      "/assets/listed8.png",
    ],
    live: "#",
    github: "https://github.com/ziadayman00/listed",
    comingSoon: false,
    inProgress: true,
  },
  {
    title: "Skillify",
    subtitle: "Video Learning Platform",
    year: "2025",
    sector: "Full-Stack",
    responsibility: "Development, UI/UX, Database Design",
    impact: "Premium course platform with lifetime access",
    tech: ["Next.js", "Prisma", "PostgreSQL", "TypeScript"],
    description:
      "A comprehensive video learning platform offering expert-led courses across multiple categories. Features premium HD video quality, downloadable resources, hands-on projects, and shareable certificates. Students can learn at their own pace with lifetime access to all course materials.",
    features: [
      "Video course management system",
      "User authentication and enrollment",
      "Certificate generation and sharing",
      "Course categorization and search",
      "Lifetime access with updates included",
    ],
    images: [
      "/assets/skillify1.png",
      "/assets/skillify2.png",
      "/assets/skillify3.png",
      "/assets/skillify4.png",
      "/assets/skillify5.png",
      "/assets/skillify6.png",
    ],
    live: "https://learning-platform-dbdw.vercel.app",
    github: "https://github.com/ziadayman00/learning-platform",
    comingSoon: false,
    inProgress: true,
  },
];

const WEB_PROJECTS = [
  {
    title: "Svelt",
    subtitle: "Modern Fashion E-commerce",
    year: "2025",
    sector: "E-commerce",
    tech: ["React", "Tailwind CSS"],
    description:
      "High-end fashion store with elegant UI and seamless shopping experience.",
    images: ["/assets/svelt.png"],
    live: "https://svelt-one.vercel.app",
    github: "https://github.com/ziadayman00/svelt",
    comingSoon: false,
  },
  {
    title: "FitRush",
    subtitle: "Fitness Brand Website",
    year: "2025",
    sector: "Health & Fitness",
    tech: ["React", "Tailwind CSS"],
    description:
      "Dynamic fitness website with modern design and responsive layout.",
    images: ["/assets/fitrush.png"],
    live: "https://fit-rush.vercel.app",
    github: "#",
    comingSoon: false,
  },
  {
    title: "Techy",
    subtitle: "Software Company Landing",
    year: "2025",
    sector: "Technology",
    tech: ["React", "Tailwind CSS"],
    description: "Professional landing page showcasing services and solutions.",
    images: ["/assets/techy.png"],
    live: "https://techy-zeta.vercel.app",
    github: "#",
    comingSoon: false,
  },
  {
    title: "Furni",
    subtitle: "Furniture Store Platform",
    year: "2024",
    sector: "E-commerce",
    tech: ["React", "Bootstrap", "CSS"],
    description:
      "Performance-optimized furniture store with smooth navigation.",
    images: ["/assets/furni.png"],
    live: "https://furni-pearl-two.vercel.app",
    github: "https://github.com/ziadayman00/furni",
    comingSoon: false,
  },
  {
    title: "LaslessVPN",
    subtitle: "VPN Service Landing",
    year: "2025",
    sector: "Technology",
    tech: ["React", "Tailwind CSS", "Figma"],
    description: "Modern VPN landing page with clean design.",
    images: ["/assets/LaslessVPN.png"],
    live: "https://lasless-vpn-chi.vercel.app/",
    github: "#",
    comingSoon: false,
  },
  {
    title: "Anti-phishing",
    subtitle: "Security Detection Tool",
    year: "2025",
    sector: "Cybersecurity",
    tech: ["React", "Tailwind CSS", "ML"],
    description:
      "Graduation project for detecting phishing websites using machine learning.",
    images: ["/assets/anti.png"],
    live: "#",
    github: "#",
    comingSoon: true,
  },
];

const EXPERIENCE = [
  {
    company: "AmbientLightFilms",
    role: "Frontend & Next.js Developer",
    period: "07/2025 - Present",
    achievements: [
      "Improved user engagement by 35%",
      "Reduced interaction steps by 50%",
      "Built system for 1000+ daily users",
    ],
    tech: "Next.js, Tailwind CSS, REST APIs",
  },
  {
    company: "IEEE Damietta",
    role: "Graphic Designer",
    period: "2022 - Present",
    achievements: [
      "Designed visuals for team events",
      "Collaborated with design teams",
      "Delivered high-quality graphics",
    ],
    tech: "Figma, Photoshop",
  },
];

const TECH_STACK = [
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Bootstrap",
  "HTML5",
  "CSS3",
  "Git",
  "GitHub",
  "Figma",
  "Photoshop",
  "Prisma",
  "PostgreSQL",
  "Supabase",
  "REST APIs",
];

// ==================== HOOKS ====================
function useKeyboardNavigation(
  isOpen: boolean,
  onClose: () => void,
  onPrev?: () => void,
  onNext?: () => void
) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);
}

function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocked]);
}

// ==================== COMPONENTS ====================
type Project = (typeof FEATURED_PROJECTS)[0] | (typeof WEB_PROJECTS)[0];

interface ImageModalProps {
  project: Project;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onIndexChange: (index: number) => void;
  darkMode: boolean;
}

function ImageModal({
  project,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onIndexChange,
  darkMode,
}: ImageModalProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  useKeyboardNavigation(true, onClose, onPrev, onNext);
  useScrollLock(true);

  const themeClasses = {
    bg: darkMode ? "bg-[#1c1c1c]" : "bg-[#f5f1e8]",
    text: darkMode ? "text-[#f5f1e8]" : "text-[#1c1c1c]",
    accent: darkMode ? "text-[#ff8c42]" : "text-[#c5581f]",
    accentBg: darkMode
      ? "bg-[#ff8c42] text-[#1c1c1c]"
      : "bg-[#c5581f] text-[#f5f1e8]",
    border: darkMode ? "border-[#f5f1e8]" : "border-[#1c1c1c]",
    hoverBg: darkMode
      ? "hover:bg-[#f5f1e8] hover:text-[#1c1c1c]"
      : "hover:bg-[#1c1c1c] hover:text-[#f5f1e8]",
  };

  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setImageLoading(true);
      onPrev();
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < project.images.length - 1) {
      setImageLoading(true);
      onNext();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn"
      style={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className={`relative w-full max-w-6xl ${themeClasses.bg} border-4 ${themeClasses.border} shadow-2xl animate-scaleIn`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute -top-4 -right-4 z-10 ${themeClasses.accentBg} p-3 border-4 ${themeClasses.border} transition-all duration-300 hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-offset-2`}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className={`p-4 md:p-6 border-b-4 ${themeClasses.border}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 id="modal-title" className="text-2xl md:text-3xl font-black mb-1">
                {project.title}
              </h3>
              <p className={`text-base md:text-lg ${themeClasses.accent} font-bold`}>
                {project.subtitle}
              </p>
            </div>
            <div
              className={`${themeClasses.accentBg} px-3 py-1.5 text-sm md:text-base font-black`}
              role="status"
              aria-live="polite"
            >
              {currentIndex + 1} / {project.images.length}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div
          className={`relative min-h-[40vh] max-h-[55vh] flex items-center justify-center p-4 md:p-6 ${
            darkMode ? "bg-black/20" : "bg-black/10"
          }`}
        >
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className={`w-12 h-12 animate-spin ${themeClasses.accent}`} />
            </div>
          )}
          
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={project.images[currentIndex]}
              alt={`${project.title} - Screenshot ${currentIndex + 1}`}
              className={`max-w-full max-h-[50vh] w-auto h-auto object-contain transition-opacity duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImageLoading(false)}
              loading="eager"
            />
          </div>

          {project.images.length > 1 && (
            <>
              <button
                onClick={handlePrevClick}
                disabled={currentIndex === 0}
                className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 ${themeClasses.accentBg} p-2 md:p-3 border-2 ${themeClasses.border} disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 hover:-translate-x-1 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextClick}
                disabled={currentIndex === project.images.length - 1}
                className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 ${themeClasses.accentBg} p-2 md:p-3 border-2 ${themeClasses.border} disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Image Dots */}
          {project.images.length > 1 && (
            <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5" role="tablist">
              {project.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageLoading(true);
                    onIndexChange(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 ${
                    idx === currentIndex
                      ? themeClasses.accentBg + " w-6"
                      : `${darkMode ? "bg-gray-600" : "bg-gray-400"}`
                  }`}
                  role="tab"
                  aria-selected={idx === currentIndex}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`p-4 md:p-6 border-t-4 ${themeClasses.border} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3`}
        >
          <div className="flex flex-wrap gap-2">
            {project.tech?.slice(0, 3).map((tech, j) => (
              <span
                key={j}
                className={`border-2 ${themeClasses.border} px-2 py-1 text-xs font-black`}
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {project.live !== "#" && !project.comingSoon && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 font-black border-2 ${themeClasses.border} px-4 py-2 ${themeClasses.hoverBg} transition-all duration-300 hover:scale-105 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                LIVE <ExternalLink size={16} />
              </a>
            )}
            {project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 font-black ${themeClasses.accentBg} px-4 py-2 border-2 ${themeClasses.border} transition-all duration-300 hover:scale-105 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                CODE <Github size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const themeClasses = {
    bg: darkMode ? "bg-[#1c1c1c]" : "bg-[#f5f1e8]",
    text: darkMode ? "text-[#f5f1e8]" : "text-[#1c1c1c]",
    accent: darkMode ? "text-[#ff8c42]" : "text-[#c5581f]",
    accentBg: darkMode
      ? "bg-[#ff8c42] text-[#1c1c1c]"
      : "bg-[#c5581f] text-[#f5f1e8]",
    border: darkMode ? "border-[#f5f1e8]" : "border-[#1c1c1c]",
    hoverBg: darkMode
      ? "hover:bg-[#f5f1e8] hover:text-[#1c1c1c]"
      : "hover:bg-[#1c1c1c] hover:text-[#f5f1e8]",
  };

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  }, []);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNextImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        Math.min(selectedProject.images.length - 1, prev + 1)
      );
    }
  }, [selectedProject]);

  const handleOpenModal = useCallback((project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  }, []);

  return (
    <div
      className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} transition-colors duration-500`}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${darkMode ? "#2a2a2a" : "#e0d9c8"};
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${darkMode ? "#ff8c42" : "#c5581f"};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? "#ff7a28" : "#b04d1a"};
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* FLOATING NAV CONTROLS */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex items-center gap-4 md:gap-6">
        <a
          href="https://drive.google.com/file/d/11gxwQIABEZ1E3ttQNU_WTih6wULXM8Uk/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 p-2 md:p-2  rounded-full"
          aria-label="View Resume"
        >
          <FileText size={24} className="md:w-7 md:h-7" />
        </a>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="transition-all duration-300 p-2 md:p-2  rounded-full"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <Sun size={24} className="md:w-7 md:h-7" />
          ) : (
            <Moon size={24} className="md:w-7 md:h-7" />
          )}
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col items-center justify-center gap-1.5 transition-all duration-300 p-2 rounded"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`w-6 h-0.5 md:w-7 ${themeClasses.bg === "bg-[#1c1c1c]" ? "bg-[#f5f1e8]" : "bg-[#1c1c1c]"} transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 md:w-7 ${themeClasses.bg === "bg-[#1c1c1c]" ? "bg-[#f5f1e8]" : "bg-[#1c1c1c]"} transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 md:w-7 ${themeClasses.bg === "bg-[#1c1c1c]" ? "bg-[#f5f1e8]" : "bg-[#1c1c1c]"} transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* MENU OVERLAY */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className={`${themeClasses.bg} border-b-2 ${themeClasses.border} animate-slideDown`}>
          <nav className="max-w-7xl mx-auto p-6 md:p-8 mt-16 md:mt-20" role="navigation" aria-label="Main navigation">
            <div className="flex flex-col sm:flex-row sm:justify-center gap-6 md:gap-12">
              {[
                { name: "WORK", href: "#work" },
                { name: "ABOUT", href: "#about" },
                { name: "CONTACT", href: "#contact" },
                {
                  name: "RESUME",
                  href: "https://drive.google.com/file/d/11gxwQIABEZ1E3ttQNU_WTih6wULXM8Uk/view?usp=drive_link",
                  external: true,
                },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  {...(item.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight transition-all duration-300 hover:translate-x-2 ${themeClasses.accent} focus:outline-none focus:ring-2 focus:ring-offset-2`}
                  onClick={() => !item.external && setMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* SPACER - Pushes content down when menu is open */}
      <div
        className={`transition-all duration-500 ${
          menuOpen ? "h-[280px] sm:h-[240px] md:h-[260px]" : "h-0"
        }`}
      />

      {/* IMAGE MODAL */}
      {selectedProject && (
        <ImageModal
          project={selectedProject}
          currentIndex={currentImageIndex}
          onClose={handleCloseModal}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
          onIndexChange={setCurrentImageIndex}
          darkMode={darkMode}
        />
      )}

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 md:pt-0">
        <div className="max-w-7xl w-full">
          <p
            className={`text-xs sm:text-sm font-medium tracking-[0.3em] mb-1 md:mb-6 ${themeClasses.accent}`}
          >
            PORTFOLIO 2025
          </p>
          <h1 className="text-[20vw] sm:text-[18vw] md:text-[14vw] font-black leading-[0.85] mb-4 md:mb-8">
            ZIAD
            <br />
            AYMAN
          </h1>

          <div className="grid md:grid-cols-2 gap-6 md:gap-12 mt-6 md:mt-16">
            <div>
              <p className="text-xs font-black tracking-widest mb-1 md:mb-3 opacity-60">
                FRONTEND DEVELOPMENT
              </p>
              <p className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight">
                React & Next.js
                <br />
                <span className={themeClasses.accent}>Specialist</span>
              </p>
            </div>
            <div className="flex flex-col justify-end mt-4 md:mt-0">
              <p className="text-base sm:text-lg opacity-80 mb-3 md:mb-8">
                Building responsive, high-performance web experiences with
                modern technologies.
              </p>
              <p className="text-xs font-black tracking-widest">
                BASED IN EGYPT • WORKING WORLDWIDE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-10 sm:py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 md:gap-6 mb-6 md:mb-12">
            <div
              className={`${themeClasses.accentBg} px-3 py-1 md:px-4 md:py-2 text-xl md:text-2xl font-black`}
            >
              01
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black">
              HELLO!
            </h2>
          </div>

          <div className="space-y-4 md:space-y-8 text-lg sm:text-xl md:text-2xl leading-relaxed font-medium">
            <p>
              My name is{" "}
              <span className={`${themeClasses.accent} font-black`}>ZIAD AYMAN</span>.
              Frontend Developer with expertise building high-performance web
              applications.
            </p>
            <p>
              Expert in{" "}
              <span className="font-black">
                JavaScript, TypeScript, React, and Next.js
              </span>
              . Creating responsive interfaces with Tailwind CSS and modern
              design tools.
            </p>
            <p>
              Currently at{" "}
              <span className={`${themeClasses.accent} font-black`}>AmbientLightFilms</span>,
              improving engagement by 35% and serving 1000+ daily users.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-8 mt-8 md:mt-16">
            <div>
              <a
                href="mailto:zyadd.aymann@gmail.com"
                className={`inline-block ${themeClasses.accentBg} px-4 py-2 md:px-8 md:py-4 font-black text-sm md:text-lg mb-2 md:mb-3 transition-all duration-300 hover:scale-105 break-all focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                zyadd.aymann@gmail.com
              </a>
              <p className="text-xs md:text-sm font-bold opacity-60">EMAIL</p>
            </div>
            <div>
              <a
                href="https://linkedin.com/in/ziad-ayman-6249122a4"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block ${themeClasses.accentBg} px-4 py-2 md:px-8 md:py-4 font-black text-sm md:text-lg mb-2 md:mb-3 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                @ziad-ayman
              </a>
              <p className="text-xs md:text-sm font-bold opacity-60">
                LINKEDIN
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES BANNER */}
      <section id="work" className={`py-10 sm:py-20 md:py-32 ${themeClasses.accentBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4">
              CAPABILITIES
            </h2>
            <p className="text-lg md:text-2xl font-bold">
              Building digital experiences that perform
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: "RESPONSIVE", desc: "Mobile-first design approach" },
              { title: "PERFORMANCE", desc: "Optimized load times" },
              { title: "SCALABLE", desc: "Future-proof architecture" },
              { title: "ACCESSIBLE", desc: "Inclusive user experiences" },
            ].map((item, i) => (
              <div
                key={i}
                className={`border-4 ${
                  darkMode ? "border-[#1c1c1c]" : "border-[#f5f1e8]"
                } p-6 md:p-8 text-center transition-all duration-300 hover:scale-105`}
              >
                <h3 className="text-2xl md:text-3xl font-black mb-3">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base font-bold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-10 sm:py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-4 md:gap-6 mb-6 md:mb-16">
            <div
              className={`${themeClasses.accentBg} px-3 py-1 md:px-4 md:py-2 text-xl md:text-2xl font-black`}
            >
              02
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black leading-tight">
              FULL-STACK
              <br />
              DEVELOPMENT
            </h2>
          </div>

          {FEATURED_PROJECTS.map((project, i) => (
            <article
              key={i}
              className={`border-2 ${themeClasses.border} mb-6 md:mb-16 transition-all duration-500 hover:shadow-2xl`}
            >
              <div className="grid md:grid-cols-2">
                <div
                  className="relative overflow-hidden cursor-pointer group h-[400px] md:h-[600px]"
                  onClick={() => handleOpenModal(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOpenModal(project);
                    }
                  }}
                  aria-label={`View ${project.title} gallery`}
                >
                  <img
                    src={project.images[0]}
                    alt={`${project.title} - ${project.subtitle}`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />
                  <div
                    className={`absolute top-4 right-4 md:top-6 md:right-6 ${themeClasses.accentBg} px-3 py-1 md:px-4 md:py-2 font-black text-xs md:text-sm`}
                  >
                    {project.images.length} IMAGES
                  </div>
                </div>

                <div
                  className={`p-4 md:p-12 border-t-2 md:border-t-0 md:border-l-2 ${themeClasses.border} md:h-[400px] lg:h-[600px] md:overflow-y-auto custom-scrollbar`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2 md:mb-3">
                    <h3 className="text-3xl md:text-5xl font-black">
                      {project.title}
                    </h3>
                    {project.inProgress && (
                      <div
                        className={`${
                          darkMode ? "bg-[#f5f1e8] text-[#1c1c1c]" : "bg-[#1c1c1c] text-[#f5f1e8]"
                        } px-2 py-1 md:px-3 md:py-1.5 font-black text-[10px] md:text-xs whitespace-nowrap`}
                      >
                        IN PROGRESS
                      </div>
                    )}
                  </div>
                  <p
                    className={`text-xl md:text-2xl ${themeClasses.accent} font-black mb-3 md:mb-8`}
                  >
                    {project.subtitle}
                  </p>

                  <div className="grid grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-8">
                    <div>
                      <p className="text-xs font-black mb-1 md:mb-2 opacity-60">
                        ROLE
                      </p>
                      <p className="text-sm md:text-base font-bold">
                        {project.responsibility}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-black mb-1 md:mb-2 opacity-60">
                        IMPACT
                      </p>
                      <p
                        className={`text-sm md:text-base font-black ${themeClasses.accent}`}
                      >
                        {project.impact}
                      </p>
                    </div>
                  </div>

                  <p className="text-base md:text-lg mb-4 md:mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-4 md:mb-8">
                    <p className="font-black mb-2 md:mb-4 text-xs md:text-sm opacity-60">
                      KEY FEATURES
                    </p>
                    <ul className="space-y-1 md:space-y-2">
                      {project.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2 md:gap-3">
                          <span
                            className={`${themeClasses.accent} font-black text-lg md:text-xl`}
                          >
                            •
                          </span>
                          <span className="text-sm md:text-base font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-8">
                    {project.tech.map((tech, j) => (
                      <span
                        key={j}
                        className={`border-2 ${themeClasses.border} px-3 py-1 md:px-4 md:py-2 text-xs font-black`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 md:gap-4">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className={`flex items-center gap-2 md:gap-3 font-black border-2 ${themeClasses.border} px-4 py-2 md:px-8 md:py-4 ${themeClasses.hoverBg} transition-all duration-300 hover:scale-105 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-offset-2`}
                    >
                      VIEW GALLERY{" "}
                      <ArrowRight size={18} className="md:w-5 md:h-5" />
                    </button>
                    {project.live !== "#" && !project.comingSoon && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 md:gap-3 font-black ${themeClasses.accentBg} px-4 py-2 md:px-8 md:py-4 transition-all duration-300 hover:scale-105 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-offset-2`}
                      >
                        <ExternalLink size={18} className="md:w-5 md:h-5" />{" "}
                        LIVE
                      </a>
                    )}
                    {project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 md:gap-3 font-black border-2 ${themeClasses.border} px-4 py-2 md:px-8 md:py-4 ${themeClasses.hoverBg} transition-all duration-300 hover:scale-105 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-offset-2`}
                      >
                        <Github size={18} className="md:w-5 md:h-5" /> CODE
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* WEB PROJECTS GRID */}
      <section className="py-10 sm:py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-4 md:gap-6 mb-6 md:mb-16">
            <div
              className={`${themeClasses.accentBg} px-3 py-1 md:px-4 md:py-2 text-xl md:text-2xl font-black`}
            >
              03
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black leading-tight">
              REACT
              <br />
              PROJECTS
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {WEB_PROJECTS.map((project, i) => (
              <article
                key={i}
                className={`group border-2 ${themeClasses.border} overflow-hidden transition-all duration-500 hover:shadow-2xl`}
              >
                <div 
                  className="relative aspect-video overflow-hidden cursor-pointer"
                  onClick={() => handleOpenModal(project)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOpenModal(project);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${project.title} gallery`}
                >
                  <img
                    src={project.images[0]}
                    alt={`${project.title} - ${project.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {project.comingSoon && (
                    <div
                      className={`absolute top-3 right-3 md:top-4 md:right-4 ${themeClasses.accentBg} px-2 py-1 md:px-3 md:py-1 font-black text-xs`}
                    >
                      SOON
                    </div>
                  )}
                </div>
                <div className={`p-4 md:p-6 border-t-2 ${themeClasses.border}`}>
                  <h3 className="text-xl md:text-2xl font-black mb-1">
                    {project.title}
                  </h3>
                  <p
                    className={`${themeClasses.accent} font-black text-xs md:text-sm mb-2 md:mb-4`}
                  >
                    {project.subtitle}
                  </p>
                  <p className="text-xs md:text-sm mb-3 md:mb-4 opacity-80">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                    {project.tech.slice(0, 2).map((tech, j) => (
                      <span
                        key={j}
                        className={`border-2 ${themeClasses.border} px-2 py-1 md:px-3 md:py-1 text-xs font-black`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.live !== "#" && !project.comingSoon && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`flex items-center gap-1.5 font-black ${themeClasses.accentBg} px-3 py-1.5 text-xs transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                      >
                        <ExternalLink size={14} /> LIVE
                      </a>
                    )}
                    {project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`flex items-center gap-1.5 font-black border-2 ${themeClasses.border} px-3 py-1.5 text-xs ${themeClasses.hoverBg} transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                      >
                        <Github size={14} /> CODE
                      </a>
                    )}
                    <button
                      onClick={() => handleOpenModal(project)}
                      className={`flex items-center gap-1.5 font-black border-2 ${themeClasses.border} px-3 py-1.5 text-xs ${themeClasses.hoverBg} transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                    >
                      <ArrowRight size={14} /> VIEW
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE & EDUCATION */}
      <section
        className={`py-10 sm:py-20 md:py-32 ${
          darkMode
            ? "bg-[#f5f1e8] text-[#1c1c1c]"
            : "bg-[#1c1c1c] text-[#f5f1e8]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-20">
            <div>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 md:mb-12">
                EDUCATION
              </h2>
              <div className="space-y-6 md:space-y-10">
                <div>
                  <p className="text-xs font-black mb-2 opacity-60">
                    UNIVERSITY
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black mb-2">
                    Damietta University
                  </h3>
                  <p className="text-lg md:text-xl font-bold mb-2">
                    Computer & AI
                  </p>
                  <p className="font-bold">2021 - 2025</p>
                </div>

                <div>
                  <p className="text-xs font-black mb-2 md:mb-4 opacity-60">
                    CORE SKILLS
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {[
                      "API Integration",
                      "State Management",
                      "Component Architecture",
                      "Performance",
                    ].map((skill, i) => (
                      <span
                        key={i}
                        className={`${
                          darkMode
                            ? "bg-[#1c1c1c] text-[#f5f1e8] border-[#f5f1e8]"
                            : "bg-[#f5f1e8] text-[#1c1c1c] border-[#1c1c1c]"
                        } border-2 px-3 py-1 md:px-4 md:py-2 font-black text-xs md:text-sm`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 md:mb-12">
                EXPERIENCE
              </h2>
              <div className="space-y-6 md:space-y-10">
                {EXPERIENCE.map((exp, i) => (
                  <div
                    key={i}
                    className={`border-l-4 ${
                      darkMode ? "border-[#f5f1e8]" : "border-[#1c1c1c]"
                    } pl-4 md:pl-6`}
                  >
                    <h3 className="text-2xl md:text-3xl font-black mb-2">
                      {exp.company}
                    </h3>
                    <p
                      className={`text-lg md:text-xl font-black mb-2 ${
                        darkMode ? "text-[#ff8c42]" : "text-[#c5581f]"
                      }`}
                    >
                      {exp.role}
                    </p>
                    <p className="text-xs md:text-sm font-bold mb-2 md:mb-4 opacity-60">
                      {exp.period}
                    </p>
                    <ul className="space-y-1 md:space-y-2 mb-2 md:mb-4">
                      {exp.achievements.map((achievement, j) => (
                        <li
                          key={j}
                          className="text-sm md:text-base font-medium"
                        >
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs font-black opacity-60">{exp.tech}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 md:mt-16">
                <h3 className="text-3xl md:text-4xl font-black mb-3 md:mb-6">
                  TECH STACK
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {TECH_STACK.map((tech, i) => (
                    <span
                      key={i}
                      className={`${
                        darkMode
                          ? "bg-[#1c1c1c] text-[#f5f1e8] border-[#f5f1e8]"
                          : "bg-[#f5f1e8] text-[#1c1c1c] border-[#1c1c1c]"
                      } border-2 px-3 py-1 md:px-4 md:py-2 text-xs font-black`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`py-10 sm:py-20 md:py-32 ${themeClasses.accentBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-[16vw] sm:text-[14vw] md:text-[10vw] font-black leading-tight mb-6 md:mb-12">
            LET'S WORK
            <br />
            TOGETHER
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-6">
            Available for freelance & full-time opportunities
          </p>
          <p className="text-base sm:text-lg md:text-xl font-black mb-6 md:mb-12">
            EGYPT • REMOTE WORLDWIDE
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4">
            <a
              href="mailto:zyadd.aymann@gmail.com"
              className={`flex items-center justify-center gap-2 md:gap-3 text-base sm:text-lg md:text-xl font-black border-2 ${
                darkMode
                  ? "border-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-[#ff8c42]"
                  : "border-[#f5f1e8] hover:bg-[#f5f1e8] hover:text-[#c5581f]"
              } px-6 py-3 md:px-10 md:py-5 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              <Mail size={24} className="md:w-7 md:h-7" /> EMAIL ME
            </a>
            <a
              href="https://github.com/ziadayman00"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 md:gap-3 text-base sm:text-lg md:text-xl font-black border-2 ${
                darkMode
                  ? "border-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-[#ff8c42]"
                  : "border-[#f5f1e8] hover:bg-[#f5f1e8] hover:text-[#c5581f]"
              } px-6 py-3 md:px-10 md:py-5 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              <Github size={24} className="md:w-7 md:h-7" /> GITHUB
            </a>
            <a
              href="https://linkedin.com/in/ziad-ayman-6249122a4"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 md:gap-3 text-base sm:text-lg md:text-xl font-black border-2 ${
                darkMode
                  ? "border-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-[#ff8c42]"
                  : "border-[#f5f1e8] hover:bg-[#f5f1e8] hover:text-[#c5581f]"
              } px-6 py-3 md:px-10 md:py-5 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              <Linkedin size={24} className="md:w-7 md:h-7" /> LINKEDIN
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-6 md:py-12 px-4 sm:px-6 border-t-2 ${themeClasses.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-8 mb-4 md:mb-8">
            <div>
              <p className="text-2xl md:text-3xl font-black mb-2">ZIAD AYMAN</p>
              <p className="text-sm md:text-base font-bold opacity-70">
                FRONTEND DEVELOPER • REACT & NEXT.JS
              </p>
            </div>
            <div className="flex gap-3 md:gap-4">
              <a
                href="https://github.com/ziadayman00"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 md:p-3 border-2 ${themeClasses.border} ${themeClasses.hoverBg} transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                aria-label="GitHub Profile"
              >
                <Github size={20} className="md:w-6 md:h-6" />
              </a>
              <a
                href="https://linkedin.com/in/ziad-ayman-6249122a4"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 md:p-3 border-2 ${themeClasses.border} ${themeClasses.hoverBg} transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} className="md:w-6 md:h-6" />
              </a>
              <a
                href="mailto:zyadd.aymann@gmail.com"
                className={`p-2 md:p-3 border-2 ${themeClasses.border} ${themeClasses.hoverBg} transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                aria-label="Email Contact"
              >
                <Mail size={20} className="md:w-6 md:h-6" />
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs sm:text-sm font-bold opacity-70">
            <p>© 2025 ZIAD AYMAN. ALL RIGHTS RESERVED.</p>
            <p className="text-xs">MADE WITH REACT • DESIGNED WITH PASSION</p>
          </div>
        </div>
      </footer>
    </div>
  );
}