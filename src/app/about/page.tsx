import Image from "next/image";
import { PenTool, Lightbulb, Ruler, HeadphonesIcon } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. ABOUT US HERO SECTION */}
      <section className="relative w-full h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/about_hero.png" 
            alt="About us background with hard hat" 
            fill 
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 text-center pt-20">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold uppercase tracking-widest drop-shadow-lg">
            About Us
          </h1>
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-5xl font-bold mb-8 flex items-baseline gap-3">
                <span className="text-7xl font-extrabold text-[#00A3E0]">Our</span> 
                <span className="text-[#0b1f3a]">Story</span>
              </h2>
              <div className="text-gray-600 text-sm leading-relaxed space-y-6 mb-8 pl-4 border-l-2 border-gray-100">
                <p>
                  Advanced Inspection has been established to maintain the highly potential of the inspection requirements in Kingdom of Saudi Arabia. As a result of this demand, Advanced Inspection has employed a broadly qualified range of staff from several countries. Also, the Advanced Inspection has established itself as an important player in the Industrial Inspection field.
                </p>
                <div className="border-l-4 border-[#00A3E0] pl-6 py-2 bg-gray-50/50">
                  <p>
                    Advanced Inspection is firmly committed to its presence in the area and during the period of stabilization in the economy in the recent years, the complement of technical & qualified staff has in fact been increased. Assignments are under taken both within Saudi Arabia & overseas, especially neighbouring countries including Bahrain, UAE, Kuwait and Qatar.
                  </p>
                </div>
              </div>
              <h3 className="text-xs font-bold text-[#00A3E0] tracking-widest uppercase mb-6">ADVANCED INSPECTION EST.</h3>
              <button className="bg-[#00A3E0] hover:bg-[#008CBE] transition-colors text-white rounded font-bold px-8 py-3 text-sm">
                CONTACT US
              </button>
            </div>
            
            <div className="flex-1 relative">
              {/* Added a subtle decorative dots pattern behind image */}
              <div className="absolute -top-6 -right-6 w-32 h-32 opacity-10 bg-[radial-gradient(#00A3E0_2px,transparent_2px)] [background-size:16px_16px]"></div>
              <div className="relative h-[500px] w-full max-w-md mx-auto shadow-2xl shadow-gray-300/50 rounded-lg overflow-hidden border-8 border-white">
                <Image 
                  src="/images/excavator_smoke.png" 
                  alt="Excavator at work" 
                  fill 
                  className="object-cover"
                />
              </div>
              {/* Up arrow decorative */}
              <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-[#00A3E0] flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-[#0b1f3a] transition-colors">
                ↑
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW WE WORK */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <h2 className="text-2xl font-extrabold text-[#0b1f3a] mb-12 uppercase tracking-wider">How We Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Professional Specialist", icon: PenTool, num: "01" },
              { title: "Brilliant Ideas", icon: Lightbulb, num: "02" },
              { title: "Precise Builders", icon: Ruler, num: "03" },
              { title: "24/7 Assistance", icon: HeadphonesIcon, num: "04" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-10 py-14 flex flex-col items-center justify-center shadow-lg shadow-gray-100/50 text-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute -bottom-4 right-2 text-7xl font-black text-gray-50 group-hover:text-gray-100 transition-colors select-none z-0">
                  {item.num}
                </div>
                <div className="relative z-10 mb-6 text-[#00A3E0]">
                  <item.icon size={48} strokeWidth={1} />
                </div>
                <h3 className="relative z-10 text-lg font-bold text-[#0b1f3a] max-w-[150px]">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT WE OFFER */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Tabs */}
            <div className="w-full lg:w-1/4">
              <ul className="flex flex-col">
                <li className="border-b border-gray-100 py-4">
                  <span className="text-[#00A3E0] font-bold text-sm flex items-center gap-2 cursor-pointer">
                    ▸ What we Offer
                  </span>
                </li>
                <li className="border-b border-gray-100 py-4">
                  <span className="text-[#0b1f3a] font-bold text-sm flex items-center gap-2 cursor-pointer hover:text-[#00A3E0] transition-colors">
                    ▸ We Understand Requirements
                  </span>
                </li>
                <li className="border-b border-gray-100 py-4">
                  <span className="text-[#0b1f3a] font-bold text-sm flex items-center gap-2 cursor-pointer hover:text-[#00A3E0] transition-colors">
                    ▸ We Work Precisely
                  </span>
                </li>
                <li className="border-b border-gray-100 py-4">
                  <span className="text-[#0b1f3a] font-bold text-sm flex items-center gap-2 cursor-pointer hover:text-[#00A3E0] transition-colors">
                    ▸ We Deliver Best Output
                  </span>
                </li>
              </ul>
            </div>
            
            {/* Tab Content */}
            <div className="w-full lg:w-3/4 flex flex-col md:flex-row gap-8 pl-0 lg:pl-10 border-l border-gray-100">
              <div className="flex-1">
                <h2 className="text-3xl font-extrabold text-[#0b1f3a] mb-6">What We Offer</h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Advanced Inspection is a member of international organizations like Lifting Equipment Engineers Association (LEEA) and British Standard Institution (BSI) to expand its position as the preferred service provider in the Middle East region for the delivery of international industrial inspection services.
                </p>
              </div>
              <div className="w-full md:w-64 h-48 relative shadow-lg shadow-gray-200/50 rounded-lg overflow-hidden shrink-0">
                <Image 
                  src="/images/hero_background.png" 
                  alt="What we offer" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR PARTNERS */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-bold text-[#0b1f3a] mb-4 uppercase tracking-wider">Our Partners</h2>
            <p className="text-gray-500 text-xs leading-relaxed">
              Forming two comfort invited. Yet she income effect edward. Entire desire way design few. Mrs sentiments led solicitude estimating friendship fat. Meant those event.
            </p>
          </div>
          
          <div className="w-full md:w-2/3 flex flex-wrap justify-between gap-6">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="bg-gray-200 w-36 h-20 flex items-center justify-center text-gray-400 text-xs shadow-sm rounded">
                150 x 80
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
