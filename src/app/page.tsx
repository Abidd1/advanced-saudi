import Image from "next/image";
import Link from "next/link";
import { Phone, CheckCircle2, Factory, Package, Truck, Drill, Briefcase, Zap, Building2, Beaker } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[600px] flex items-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/hero_background.png" 
            alt="Construction workers inspecting" 
            fill 
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl pt-24">
          <div className="max-w-2xl">
            <h2 className="text-[#00A3E0] font-bold text-lg mb-2">We're Expert In</h2>
            <h1 className="text-white text-5xl md:text-6xl font-extrabold leading-tight mb-8">
              Industrial Inspection And Services Across The Middle East
            </h1>
            <div className="bg-[#00A3E0] hover:bg-[#008CBE] transition-colors w-max text-white rounded font-bold px-6 py-3 cursor-pointer">
              CONTACT US ▸
            </div>
          </div>
          
          {/* Pagination and Arrow */}
          <div className="absolute bottom-10 flex justify-between w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-7xl">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
              <div className="w-3 h-3 rounded-full border-2 border-white bg-transparent flex items-center justify-center p-[2px]">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#00A3E0] flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-[#00A3E0] transition-colors duration-300">
              ↑
            </div>
          </div>
        </div>
      </section>

      {/* 2. WELCOME SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-12 mb-16">
            <div className="flex-1">
              <h2 className="text-4xl font-extrabold text-[#0b1f3a] leading-tight">Welcome to the <br/>Advanced Inspection Est.</h2>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#0b1f3a] mb-4 border-l-4 border-[#00A3E0] pl-4">Where we build your visions</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Advanced Inspection aims to expand its position as the preferred service provider in the Middle East region for the delivery of international industrial Inspection and Industrial services in construction, oil & Gas and Fabrication industry.
              </p>
            </div>
          </div>

          {/* CALL US TODAY Strip */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-bold text-[#0b1f3a] mb-6 uppercase tracking-wider">CALL US TODAY</h4>
            <div className="flex flex-wrap justify-center gap-4 md:gap-10 w-full max-w-4xl bg-white shadow-xl rounded-lg py-6 px-4 md:px-10 border border-gray-100">
              <div className="flex items-center gap-2">
                <Phone className="text-[#00A3E0]" size={18} />
                <span className="font-bold text-sm text-[#0b1f3a]">Dammam: +966 50 2231643</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-[#00A3E0]" size={18} />
                <span className="font-bold text-sm text-[#0b1f3a]">Riyadh: +966 58 6749383</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-[#00A3E0]" size={18} />
                <span className="font-bold text-sm text-[#0b1f3a]">Jeddah: +966 56 6480456</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GET YOUR FREE CONSULTATION */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="max-w-xl">
              <h2 className="text-3xl font-extrabold text-[#0b1f3a] mb-6">Get Your Free Consultation</h2>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                Advanced Inspection is your partner in the business of Examination and Verification of Lifting Equipment and training personnel to use it safely and resides to achieve the highest standards of quality and safety.
              </p>
              <div className="bg-[#00A3E0] hover:bg-[#008CBE] transition-colors w-max text-white rounded font-bold px-6 py-3 cursor-pointer">
                CONTACT US
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="bg-white p-8 rounded-lg shadow-xl shadow-gray-200/50 flex flex-col items-center justify-center w-40 h-40 border-t-4 border-[#00A3E0]">
                <span className="text-xs font-bold text-gray-400 mb-2 uppercase">Clients</span>
                <span className="text-5xl font-black text-[#0b1f3a]">500</span>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-xl shadow-gray-200/50 flex flex-col items-center justify-center w-40 h-40 border-t-4 border-gray-200">
                <span className="text-xs font-bold text-gray-400 mb-2 uppercase">Projects</span>
                <span className="text-5xl font-black text-[#0b1f3a]">400</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR SPECIALIZATION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <h2 className="text-3xl font-extrabold text-[#0b1f3a] mb-6 uppercase tracking-wider">Our Specialization</h2>
          <p className="text-gray-600 text-sm max-w-3xl mx-auto mb-16 leading-relaxed">
            Advanced Inspection is your partner in the business of Third Party Inspection (TPI) and Verification of lifting and earth moving equipment together with training and certification of personnel.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
            {/* Card 1 */}
            <div className="bg-white shadow-xl shadow-gray-100 rounded-b-xl overflow-hidden group">
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                 <Image src="/images/excavator_smoke.png" alt="Earth Moving" fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
              </div>
              <div className="p-8 relative pt-12">
                <div className="absolute -top-10 left-8 bg-white w-20 h-20 shadow-lg text-[#00A3E0] flex items-center justify-center rounded-xl rotate-45 group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="-rotate-45"><Factory size={32} strokeWidth={1.5} /></div>
                </div>
                <h3 className="text-xl font-bold text-[#0b1f3a] mb-8">Earth Moving Machinery</h3>
                <div className="flex justify-between items-end">
                  <span className="text-5xl font-black text-gray-100">02</span>
                  <Link href="/services" className="text-xs font-bold text-gray-500 hover:text-[#00A3E0] tracking-widest uppercase">READ MORE</Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-xl shadow-gray-100 rounded-b-xl overflow-hidden group">
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                 <Image src="/images/hero_background.png" alt="Material Handling" fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
              </div>
              <div className="p-8 relative pt-12">
                <div className="absolute -top-10 left-8 bg-white w-20 h-20 shadow-lg text-[#00A3E0] flex items-center justify-center rounded-xl rotate-45 group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="-rotate-45"><Package size={32} strokeWidth={1.5} /></div>
                </div>
                <h3 className="text-xl font-bold text-[#0b1f3a] mb-8">Material Handling Equipment</h3>
                <div className="flex justify-between items-end">
                  <span className="text-5xl font-black text-gray-100">03</span>
                  <Link href="/services" className="text-xs font-bold text-gray-500 hover:text-[#00A3E0] tracking-widest uppercase">READ MORE</Link>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-xl shadow-gray-100 rounded-b-xl overflow-hidden group">
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                 <Image src="/images/services_hero.png" alt="MEWPs" fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
              </div>
              <div className="p-8 relative pt-12">
                <div className="absolute -top-10 left-8 bg-white w-20 h-20 shadow-lg text-[#00A3E0] flex items-center justify-center rounded-xl rotate-45 group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="-rotate-45"><Truck size={32} strokeWidth={1.5} /></div>
                </div>
                <h3 className="text-xl font-bold text-[#0b1f3a] mb-8">MEWP's</h3>
                <div className="flex justify-between items-end">
                  <span className="text-5xl font-black text-gray-100">04</span>
                  <Link href="/services" className="text-xs font-bold text-gray-500 hover:text-[#00A3E0] tracking-widest uppercase">READ MORE</Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Simple Dots */}
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-[#00A3E0] bg-transparent flex items-center justify-center p-[2px]">
              <div className="w-1.5 h-1.5 bg-[#00A3E0] rounded-full"></div>
            </div>
            <div className="w-2 h-2 rounded-full border-2 border-gray-400 bg-transparent mt-0.5"></div>
            <div className="w-2 h-2 rounded-full border-2 border-gray-400 bg-transparent mt-0.5"></div>
            <div className="w-2 h-2 rounded-full border-2 border-gray-400 bg-transparent mt-0.5"></div>
          </div>
        </div>
      </section>

      {/* 5. OUR PROJECTS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <h2 className="text-3xl font-extrabold text-[#0b1f3a] mb-12 uppercase tracking-wider">Our Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
            {/* Proj 1 */}
            <div className="bg-white shadow-xl shadow-gray-100 rounded-b-xl overflow-hidden group">
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                <Image src="/images/services_hero.png" alt="Pipe Coating" fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
              </div>
              <div className="p-8 pb-10 relative pt-12 flex justify-center text-center">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white w-16 h-16 shadow-lg text-[#00A3E0] flex items-center justify-center rounded-xl rotate-45">
                  <div className="-rotate-45"><Drill size={28} strokeWidth={1.5} /></div>
                </div>
                <h3 className="text-xl font-bold text-[#0b1f3a]">Pipe Coating</h3>
              </div>
            </div>

            {/* Proj 2 */}
            <div className="bg-white shadow-xl shadow-gray-100 rounded-b-xl overflow-hidden group">
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                <Image src="/images/hero_background.png" alt="Structural Steels And Fabrication" fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
              </div>
              <div className="p-8 pb-10 relative pt-12 flex justify-center text-center">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white w-16 h-16 shadow-lg text-[#00A3E0] flex items-center justify-center rounded-xl rotate-45">
                  <div className="-rotate-45"><Zap size={28} strokeWidth={1.5} /></div>
                </div>
                <h3 className="text-xl font-bold text-[#0b1f3a]">Structural Steels And Fabrication</h3>
              </div>
            </div>

            {/* Proj 3 */}
            <div className="bg-white shadow-xl shadow-gray-100 rounded-b-xl overflow-hidden group">
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                <Image src="/images/about_hero.png" alt="Scaffolding" fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
              </div>
              <div className="p-8 pb-10 relative pt-12 flex justify-center text-center">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white w-16 h-16 shadow-lg text-[#00A3E0] flex items-center justify-center rounded-xl rotate-45">
                  <div className="-rotate-45"><Building2 size={28} strokeWidth={1.5} /></div>
                </div>
                <h3 className="text-xl font-bold text-[#0b1f3a]">Scaffolding</h3>
              </div>
            </div>
          </div>
          
           {/* Simple Dots */}
           <div className="flex justify-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-[#00A3E0] bg-transparent flex items-center justify-center p-[2px]">
              <div className="w-1.5 h-1.5 bg-[#00A3E0] rounded-full"></div>
            </div>
            <div className="w-2 h-2 rounded-full border-2 border-gray-400 bg-transparent mt-0.5"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
