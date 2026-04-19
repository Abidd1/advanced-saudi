import { Send, Phone } from 'lucide-react';

export default function NewsletterStrip() {
  return (
    <div className="bg-[#0b1f3a] border-b border-white/10 w-full py-6">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand/Logo inline block */}
          <div className="flex items-center gap-2">
            <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10L90 80H10L50 10Z" stroke="#00A3E0" strokeWidth="6" strokeLinejoin="round"/>
              <path d="M50 30L75 70H25L50 30Z" fill="white"/>
            </svg>
            <span className="text-white font-bold tracking-wider text-xl">Advanced</span>
          </div>

          {/* Newsletter Input */}
          <div className="relative flex-1 max-w-lg w-full">
            <input 
              type="email" 
              placeholder="Enter your e-mail here" 
              className="w-full bg-[#163259] text-white placeholder-gray-400 rounded-full py-3 px-6 pr-14 focus:outline-none focus:ring-2 focus:ring-[#00A3E0]"
            />
            <button className="absolute right-2 top-2 bottom-2 rounded-full bg-white text-[#00A3E0] w-10 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Send size={16} />
            </button>
          </div>

          {/* Main Phone */}
          <div className="flex items-center gap-3 text-white font-bold text-lg">
            <div className="w-10 h-10 rounded-full bg-[#163259] flex items-center justify-center">
              <Phone className="text-[#00A3E0]" size={18} />
            </div>
            <span>+966 13 8327055</span>
          </div>

        </div>
      </div>
    </div>
  );
}
