import Image from "next/image";

export default function Gallery() {
  const galleryImages = [
    { src: "/images/hero_background.png", aspect: "aspect-[3/4]" },
    { src: "/images/services_hero.png", aspect: "aspect-[4/5]" },
    { src: "/images/about_hero.png", aspect: "aspect-[2/3]" },
    { src: "/images/excavator_smoke.png", aspect: "aspect-[3/4]" },
    { src: "/images/hero_background.png", aspect: "aspect-[4/3]" },
    { src: "/images/services_hero.png", aspect: "aspect-square" },
    { src: "/images/about_hero.png", aspect: "aspect-[3/5]" },
    { src: "/images/excavator_smoke.png", aspect: "aspect-[4/5]" },
    { src: "/images/hero_background.png", aspect: "aspect-video" },
    { src: "/images/services_hero.png", aspect: "aspect-[4/3]" },
    { src: "/images/about_hero.png", aspect: "aspect-[2/3]" },
    { src: "/images/excavator_smoke.png", aspect: "aspect-[3/4]" },
    { src: "/images/hero_background.png", aspect: "aspect-video" },
    { src: "/images/services_hero.png", aspect: "aspect-square" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. GALLERY HERO SECTION */}
      <section className="relative w-full h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/hero_background.png" 
            alt="Gallery background" 
            fill 
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 text-center pt-20">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold uppercase tracking-widest drop-shadow-lg">
            Gallery
          </h1>
        </div>
      </section>

      {/* 2. OUR GALLERY HEADER */}
      <section className="pt-24 pb-12 bg-white relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col mb-4 max-w-4xl">
              <h2 className="text-5xl font-bold mb-4 flex items-baseline gap-3 relative inline-block">
                <span className="text-7xl font-extrabold text-[#00A3E0]">Our</span> 
                <span className="text-[#0b1f3a]">Gallery</span>
              </h2>
              <p className="text-gray-400 text-xs leading-relaxed max-w-2xl mt-2 uppercase tracking-wide">
                ADVANCED INSPECTION • INDUSTRIAL AND CONSTRUCTION • SAUDI ARABIA
              </p>
            </div>
            
            <div className="hidden lg:flex w-8 h-8 rounded-full bg-[#00A3E0] items-center justify-center text-white shadow-lg cursor-pointer hover:bg-[#0b1f3a] transition-colors shrink-0 mt-6">
              ↑
            </div>
          </div>
        </div>
      </section>

      {/* 3. PURE MASONRY GALLERY */}
      <section className="pb-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="break-inside-avoid">
                <div className={`relative w-full ${img.aspect} bg-gray-100 overflow-hidden group cursor-pointer`}>
                  <Image 
                    src={img.src} 
                    alt={`Gallery Image ${idx + 1}`} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-[#00A3E0]/0 group-hover:bg-[#00A3E0]/20 transition-colors duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
