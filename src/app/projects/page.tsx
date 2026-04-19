import Image from "next/image";

export default function Projects() {
  const projectsData = [
    { title: "Individual Plants", src: "/images/hero_background.png", aspect: "aspect-[4/3]" },
    { title: "Pipe Coating", src: "/images/services_hero.png", aspect: "aspect-video" },
    { title: "Pipe Bending", src: "/images/about_hero.png", aspect: "aspect-[3/2]" },
    { title: "Structural Steels And Fabrication", src: "/images/excavator_smoke.png", aspect: "aspect-video" },
    { title: "Load Testing", src: "/images/hero_background.png", aspect: "aspect-square" },
    { title: "Welders Qualification", src: "/images/services_hero.png", aspect: "aspect-video" },
    { title: "Plant Turnaround And Refinery", src: "/images/about_hero.png", aspect: "aspect-square" },
    { title: "Cranes", src: "/images/excavator_smoke.png", aspect: "aspect-[3/4]" },
    { title: "Conveyor Systems", src: "/images/hero_background.png", aspect: "aspect-video" },
    { title: "Elevators", src: "/images/services_hero.png", aspect: "aspect-square" },
    { title: "Scaffolding", src: "/images/about_hero.png", aspect: "aspect-[4/5]" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. PROJECTS HERO SECTION */}
      <section className="relative w-full h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/hero_background.png" 
            alt="Projects background" 
            fill 
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 text-center pt-20">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold uppercase tracking-widest drop-shadow-lg">
            Our Projects
          </h1>
        </div>
      </section>

      {/* 2. OUR PROJECTS HEADER */}
      <section className="pt-24 pb-12 bg-white relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col mb-12">
            <h2 className="text-5xl font-bold mb-6 flex items-baseline gap-3 relative inline-block">
              <span className="text-7xl font-extrabold text-[#00A3E0]">Our</span> 
              <span className="text-[#0b1f3a]">Projects</span>
            </h2>
            <div className="flex justify-between items-start lg:items-center w-full">
              <p className="text-gray-500 text-sm leading-relaxed max-w-5xl">
                We take pride in showcasing a collection of our successfully executed projects, each exemplifying our commitment to delivering precision and excellence.
                Our expertise spans across diverse sectors including plant turnarounds, equipment up-grades, and testing procedures for cranes. 
                Noteworthy achievements include <span className="font-bold text-[#0b1f3a]">projects</span> and the meticulous <span className="font-bold text-[#0b1f3a]">handling of valves</span>. 
                These undertakings stand as a testament to our ongoing dedication to achieving the highest standards.
              </p>
              <div className="hidden lg:flex w-8 h-8 rounded-full bg-[#00A3E0] items-center justify-center text-white cursor-pointer hover:bg-[#0b1f3a] transition-colors shrink-0 ml-4">
                ↑
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MASONRY GALLERY OVERVIEW */}
      <section className="pb-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          
          <div className="columns-1 md:columns-2 gap-8 space-y-12">
            {projectsData.map((project, idx) => (
              <div key={idx} className="break-inside-avoid shadow-lg rounded-xl overflow-hidden shadow-gray-200/50 bg-white">
                <div className={`relative w-full ${project.aspect} bg-gray-100 overflow-hidden group`}>
                  <Image 
                    src={project.src} 
                    alt={project.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-[#00A3E0]/0 group-hover:bg-[#00A3E0]/20 transition-colors duration-300"></div>
                </div>
                <div className="p-4 py-5 border-t border-gray-100 relative">
                  {/* Subtle right chevron icon */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                  <h3 className="text-[#0b1f3a] font-bold text-sm tracking-wide">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
