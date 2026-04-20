'use client';

import Image from "next/image";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Printer, CheckCircle, ShieldCheck } from "lucide-react";

function CertificateSearchContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';
  
  const [searchedId, setSearchedId] = useState(initialId);
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<{ id: string, frontUrl: string, backUrl: string, date: string } | null>(null);
  const [error, setError] = useState('');

  const performSearch = useCallback(async (id: string) => {
    if (!id) return;

    setIsSearching(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/certificates?id=${id}`);
      const payload = await res.json();
      
      if (res.ok && payload.success) {
         setResult({
           id: payload.data.id,
           frontUrl: payload.data.frontImgUrl,
           backUrl: payload.data.backImgUrl,
           date: payload.data.createdAt
         });
      } else {
         setError(payload.error || "Certificate not found.");
      }
    } catch (err) {
      setError("Network error bridging to database verification.");
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchedId);
  };

  useEffect(() => {
    if (initialId) {
      setSearchedId(initialId);
      performSearch(initialId);
    }
  }, [initialId, performSearch]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-[70vh] bg-gray-50 pb-24">
      {/* 1. CERTIFICATES HERO SECTION */}
      <section className="relative w-full h-[350px] flex items-center justify-center bg-[#0b1f3a] overflow-hidden print:hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/services_hero.png" 
            alt="Certificates background" 
            fill 
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-2xl animate-in fade-in slide-in-from-top-8 duration-700">
            Registry <span className="text-[#00A3E0]">Verification</span>
          </h1>
          <p className="text-blue-200 mt-4 font-bold uppercase tracking-[0.4em] text-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">Official Database Portal</p>
        </div>
      </section>

      {/* 2. SEARCH SECTION */}
      <section className="py-16 bg-transparent relative z-20 -mt-20 print:hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-4xl bg-white relative p-8 md:p-12 shadow-2xl shadow-blue-900/10 rounded-3xl block mx-auto border border-gray-100 animate-in zoom-in-95 duration-500">
            <h2 className="text-xs text-gray-400 font-bold mb-6 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#00A3E0]" />
              Secure Authentication Protocol
            </h2>
            
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="w-full relative group">
                <input 
                  type="text" 
                  value={searchedId}
                  onChange={(e) => setSearchedId(e.target.value)}
                  placeholder="Enter Unique Certificate ID (e.g. JD2405696)" 
                  className="w-full border-2 border-gray-100 rounded-2xl p-5 text-gray-700 focus:outline-none focus:border-[#00A3E0] uppercase font-mono font-bold text-xl transition-all bg-gray-50/50"
                />
              </div>
              
              <div className="flex justify-center w-full">
                <button type="submit" disabled={isSearching} className="bg-[#0b1f3a] hover:bg-[#00A3E0] transition-all text-white font-black py-5 px-16 rounded-2xl shadow-xl shadow-blue-900/20 text-lg flex items-center gap-3 disabled:opacity-50">
                  {isSearching ? <Loader2 className="animate-spin" size={24} /> : null} 
                  VERIFY RECORD
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* 3. SEARCH RESULTS */}
      <section className="container mx-auto px-4 md:px-8 max-w-5xl mt-12">
        {error && (
          <div className="bg-red-50 text-red-600 p-8 rounded-2xl text-center font-black border-2 border-red-100 uppercase tracking-widest shadow-lg animate-in shake-200 duration-500">
            <div className="text-4xl mb-2">×</div>
            {error}
          </div>
        )}

        {result && (
          <div id="printable-area" className="flex flex-col items-center gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-forwards">
             <div className="w-full bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A3E0] opacity-5 -rotate-45 translate-x-16 -translate-y-16"></div>
                
                <div className="space-y-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-green-600 font-black uppercase tracking-tighter">
                    <CheckCircle size={24} /> 
                    Verified Authentic Document
                  </div>
                  <h2 className="text-4xl font-black text-[#0b1f3a] uppercase font-mono">{result.id}</h2>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Registered on: {new Date(result.date).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-4 print:hidden">
                   <button onClick={handlePrint} className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md">
                      <Printer size={18} /> Print Record
                   </button>
                </div>
             </div>
             
             <div className="w-full flex flex-col gap-10">
                <div className="flex flex-col items-center gap-4">
                  <span className="text-xs font-black text-gray-300 uppercase tracking-[0.5em]">Primary Authentication Face</span>
                  <div className="w-full max-w-4xl bg-white p-4 rounded-[2rem] shadow-2xl border border-gray-100">
                    <img src={result.frontUrl} alt="Front Certificate" className="w-full rounded-[1.5rem] object-contain" />
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-4 border-t border-dashed border-gray-200 pt-16">
                  <span className="text-xs font-black text-gray-300 uppercase tracking-[0.5em]">Secondary Authentication Face</span>
                  <div className="w-full max-w-4xl bg-white p-4 rounded-[2rem] shadow-2xl border border-gray-100">
                    <img src={result.backUrl} alt="Back Certificate" className="w-full rounded-[1.5rem] object-contain" />
                  </div>
                </div>
             </div>

             <div className="bg-[#0b1f3a] text-white p-6 rounded-2xl w-full text-center mt-10 print:mt-20">
                <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-60 mb-2">Advanced Inspection Identification System</p>
                <p className="text-[10px] font-medium opacity-40">This is an electronically generated verification page referencing our master database. Authentic certificates must match the data presented here.</p>
             </div>
          </div>
        )}
      </section>

      {/* Print Specific Styles */}
      <style jsx global>{`
        @media print {
          .print\\:hidden { display: none !important; }
          body { background: white !important; }
          #printable-area { gap: 40px !important; margin: 0 !important; width: 100% !important; }
          img { break-inside: avoid; }
        }
      `}</style>
    </div>
  );
}

export default function Certificates() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="animate-spin text-[#00A3E0]" size={48} />
      </div>
    }>
      <CertificateSearchContent />
    </Suspense>
  );
}
