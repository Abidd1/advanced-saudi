import Image from "next/image";
import { PenTool, Target, Layers, DollarSign, ArrowUpFromLine, Truck, Anchor } from "lucide-react";

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. SERVICES HERO SECTION */}
      <section className="relative w-full h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/services_hero.png" 
            alt="Services background" 
            fill 
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 text-center pt-20">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold uppercase tracking-widest drop-shadow-lg">
            Our Services
          </h1>
        </div>
      </section>

      {/* 2. OUR SERVICES OVERVIEW */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-5xl font-bold mb-8 flex items-baseline gap-3">
                <span className="text-7xl font-extrabold text-[#00A3E0]">Our</span> 
                <span className="text-[#0b1f3a]">Services</span>
              </h2>
              <div className="text-gray-600 text-sm leading-relaxed space-y-6 mb-8 pr-0 lg:pr-12">
                <p>
                  Advanced Inspection is a member of international organizations like Lifting Equipment Engineers Association (LEEA) and British Standard Institution (BSI) to expand its position as the preferred service provider in the Middle East region for the delivery of international industrial inspection services.
                </p>
              </div>
              <button className="bg-[#00A3E0] hover:bg-[#008CBE] transition-colors text-white rounded font-bold px-8 py-3 text-sm mt-4">
                CONTACT US
              </button>
            </div>
            
            <div className="flex-1 relative">
              <div className="absolute top-10 -right-6 w-32 h-32 opacity-10 bg-[radial-gradient(#00A3E0_2px,transparent_2px)] [background-size:16px_16px]"></div>
              <div className="relative h-[450px] w-full max-w-sm mx-auto shadow-2xl shadow-gray-300/50 rounded-lg overflow-hidden border-8 border-white">
                <Image 
                  src="/images/excavator_smoke.png" 
                  alt="Excavator at work" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-[#00A3E0] flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-[#0b1f3a] transition-colors">
                ↑
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES BAND */}
      <section className="py-24 bg-[#0b1f3a] text-center pb-28">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="text-2xl font-extrabold text-white mb-2 tracking-wider">Our Services</h2>
          <div className="w-12 h-0.5 bg-[#00A3E0] mx-auto mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Meticulous Planning", icon: PenTool },
              { title: "Completion On Time", icon: Target },
              { title: "Perfect Execution", icon: Layers },
              { title: "Affordable Prices", icon: DollarSign }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#122a4b] hover:bg-[#183965] border border-white/5 transition-colors p-10 py-16 flex flex-col items-center justify-center text-center rounded group cursor-pointer"
              >
                <div className="relative mb-6">
                  {/* Subtle decorative circle behind icon */}
                  <div className="absolute inset-0 bg-[#00A3E0]/10 rounded-full scale-[2.5] blur-md mix-blend-screen group-hover:scale-[3] transition-transform"></div>
                  <item.icon className="relative z-10 text-[#00A3E0] group-hover:text-white transition-colors duration-300" size={40} strokeWidth={1} />
                </div>
                <h3 className="text-white font-semibold text-sm max-w-[120px]">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR SPECIALIZATION LIST */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <h2 className="text-2xl font-extrabold text-[#0b1f3a] mb-6 uppercase tracking-wider">Our Specialization</h2>
          <p className="text-gray-600 text-sm max-w-3xl mx-auto mb-16 leading-relaxed">
            Advanced Inspection Services Est. (AIS) is your partner in the business of Third Party Inspection (TPI) and Verification of lifting and earth moving equipment together with training and certification of personnel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
            
            {/* Card 1: MEWPs */}
            <div className="bg-white shadow-xl shadow-gray-100 rounded-b-xl overflow-hidden group border border-gray-50 flex flex-col items-center">
              <div className="h-64 w-full bg-gray-200 relative overflow-hidden">
                <Image src="/images/services_hero.png" alt="MEWPs" fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
              </div>
              <div className="p-8 pb-10 w-full relative pt-12 text-center h-full flex flex-col items-center">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white w-20 h-20 shadow-lg text-[#00A3E0] flex items-center justify-center rounded-xl rotate-45">
                  <div className="-rotate-45"><ArrowUpFromLine size={32} strokeWidth={1.5} /></div>
                </div>
                <h3 className="text-lg font-bold text-[#0b1f3a] mb-4">MEWP's</h3>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[250px]">
                  Third Party inspection and load test for MEWP's i.e Scissor Lift, Spider Lift, Articulated Boom Lift, Telescopic Boom Lift, Aerial Lifts.
                </p>
              </div>
            </div>

            {/* Card 2: Prime Movers */}
            <div className="bg-white shadow-xl shadow-gray-100 rounded-b-xl overflow-hidden group border border-gray-50 flex flex-col items-center">
              <div className="h-64 w-full bg-gray-200 relative overflow-hidden">
                <Image src="/images/hero_background.png" alt="Prime Mover" fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
              </div>
              <div className="p-8 pb-10 w-full relative pt-12 text-center h-full flex flex-col items-center">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white w-20 h-20 shadow-lg text-[#00A3E0] flex items-center justify-center rounded-xl rotate-45">
                  <div className="-rotate-45"><Truck size={32} strokeWidth={1.5} /></div>
                </div>
                <h3 className="text-lg font-bold text-[#0b1f3a] mb-4 text-balance">Prime Mover/ Trailer / Tanker</h3>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[250px]">
                  Third Party inspection and functional test for Prime Mover, Trailer and tankers.
                </p>
              </div>
            </div>

            {/* Card 3: Winches */}
            <div className="bg-white shadow-xl shadow-gray-100 rounded-b-xl overflow-hidden group border border-gray-50 flex flex-col items-center">
              <div className="h-64 w-full bg-gray-200 relative overflow-hidden">
                <Image src="/images/excavator_smoke.png" alt="Winches" fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
              </div>
              <div className="p-8 pb-10 w-full relative pt-12 text-center h-full flex flex-col items-center">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white w-20 h-20 shadow-lg text-[#00A3E0] flex items-center justify-center rounded-xl rotate-45">
                  <div className="-rotate-45"><Anchor size={32} strokeWidth={1.5} /></div>
                </div>
                <h3 className="text-lg font-bold text-[#0b1f3a] mb-4">Winches</h3>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[250px]">
                  Third Party inspection and load/pull Test of Winch.
                </p>
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
            <div className="w-2 h-2 rounded-full border-2 border-gray-400 bg-transparent mt-0.5"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
