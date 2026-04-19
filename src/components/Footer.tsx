import Link from 'next/link';
import { Send, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b1f3a] text-white pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wide">Contact Us</h3>
            <div className="flex items-start gap-3 mb-4 text-sm text-gray-300">
              <MapPin className="text-[#00A3E0] mt-1 shrink-0" size={18} />
              <p>5th Floor - Dr. Sheikh Ar Aid Building - Prince Mohammed Bin Fahd Road<br /><br />Dammam - Saudi Arabia</p>
            </div>
            <div className="flex items-center gap-3 mb-6 text-sm text-gray-300">
              <Mail className="text-[#00A3E0] shrink-0" size={18} />
              <a href="mailto:info@advanced-saudi.com" className="hover:text-white transition-colors">info@advanced-saudi.com</a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00A3E0] transition-colors text-xs font-bold">FB</a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00A3E0] transition-colors text-xs font-bold">TW</a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00A3E0] transition-colors text-xs font-bold">IG</a>
            </div>
          </div>

          {/* Contact Numbers */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wide">Contact Numbers</h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <Phone className="text-[#00A3E0] shrink-0" size={16} />
                <span>Head Office: +966 13 8327055</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-[#00A3E0] shrink-0" size={16} />
                <span>Head Office: +966 13 8323485</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-[#00A3E0] shrink-0" size={16} />
                <span>Dammam: +966 50 2231649</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-[#00A3E0] shrink-0" size={16} />
                <span>Riyadh: +966 58 6749383</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-[#00A3E0] shrink-0" size={16} />
                <span>Jeddah: +966 56 6480456</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wide">Services</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#00A3E0]">▸</span> About Company</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#00A3E0]">▸</span> Services</Link></li>
              <li><Link href="/specialization" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#00A3E0]">▸</span> Specialization</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#00A3E0]">▸</span> Latest News</Link></li>
              <li><Link href="/certificates" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#00A3E0]">▸</span> Certificates</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#00A3E0]">▸</span> Contact Us</Link></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wide">Opening Hours</h3>
            <div className="flex justify-between items-center text-sm text-gray-300 py-2 border-b border-white/10">
              <span>Sat - Thu :</span>
              <span>8:00 - 17:00</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-300 py-2 border-b border-white/10">
              <span>Friday :</span>
              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded font-bold">Closed</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
