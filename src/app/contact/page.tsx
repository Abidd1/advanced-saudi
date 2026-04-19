import Image from "next/image";
import { MapPin, PhoneCall, Mail, Send } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. CONTACT US HERO SECTION */}
      <section className="relative w-full h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/services_hero.png" 
            alt="Contact Us background" 
            fill 
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 text-center pt-20">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold uppercase tracking-widest drop-shadow-lg">
            Contact Us
          </h1>
        </div>
      </section>

      {/* 2. CONTACT FORM AND INFO BLOCK */}
      <section className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row shadow-2xl shadow-gray-200/50 rounded-lg overflow-hidden max-w-5xl mx-auto">
            
            {/* Left Sidebar (Dark Blue) */}
            <div className="w-full lg:w-1/3 bg-[#0b1f3a] p-10 py-14 text-white flex flex-col gap-10 relative overflow-hidden">
              {/* Subtle map pattern background */}
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="bg-[#00A3E0] p-3 rounded shrink-0">
                    <MapPin strokeWidth={1.5} size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Location</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      5th Floor Dr. Shakh Ar Ard Building Prince Mohammed Bin Fahd Road Dammam, Saudi Arabia
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="bg-[#00A3E0] p-3 rounded shrink-0">
                    <PhoneCall strokeWidth={1.5} size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Make A Call</h3>
                    <div className="text-sm text-gray-300 space-y-2">
                       <p><span className="font-semibold text-white block mb-0.5">Dammam</span>+966 13 8327055</p>
                       <p><span className="font-semibold text-white block mb-0.5">Jeddah</span>+966 56 6489466</p>
                       <p><span className="font-semibold text-white block mb-0.5">Riyadh</span>+966 59 6749383</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="bg-[#00A3E0] p-3 rounded shrink-0">
                    <Mail strokeWidth={1.5} size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Send A Mail</h3>
                    <p className="text-sm text-gray-300">
                      info@advanced-saudi.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card (White) */}
            <div className="w-full lg:w-2/3 bg-white p-10 md:p-14">
              <h2 className="text-3xl font-extrabold text-[#0b1f3a] mb-10">Let's Talk About Your Idea</h2>
              
              <form className="flex flex-col gap-6">
                <div className="w-full">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="w-full border-b border-gray-200 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#00A3E0] transition-colors"
                  />
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <input 
                    type="email" 
                    placeholder="Email*" 
                    required
                    className="w-full border-b border-gray-200 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#00A3E0] transition-colors"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone" 
                    className="w-full border-b border-gray-200 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#00A3E0] transition-colors"
                  />
                </div>
                
                <div className="w-full">
                  <textarea 
                    placeholder="Tell Us About Project *" 
                    required
                    rows={4}
                    className="w-full border-b border-gray-200 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#00A3E0] transition-colors resize-none"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="bg-[#00A3E0] hover:bg-[#008CBE] transition-colors text-white font-bold py-3 px-8 rounded flex items-center justify-center gap-2 w-max text-sm tracking-wide mt-4"
                >
                  SEND MESSAGE <Send size={16} strokeWidth={2} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MAP SECTION */}
      <section className="w-full h-[400px] relative bg-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114324.96585145785!2d50.04696010531562!3d26.435777174301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49e6231bdc54eb%3A0xc6cb5aabda6441dd!2sDammam%20Saudi%20Arabia!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae" 
          className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
      </section>

    </div>
  );
}
