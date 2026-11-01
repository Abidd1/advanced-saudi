'use client';

import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Printer, CheckCircle, ShieldCheck, Share2, Copy, ExternalLink, ZoomIn, X } from "lucide-react";

function CertificateVerificationContent() {
  const searchParams = useSearchParams();
  const [searchedId, setSearchedId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<{ id: string; frontUrl: string; backUrl: string | null; date: string } | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  const fetchCertificate = async (id: string) => {
    const cleanId = id.trim();
    if (!cleanId) return;

    setIsSearching(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/certificates?id=${encodeURIComponent(cleanId)}`);
      const payload = await res.json();

      if (res.ok && payload.success && payload.data) {
        setResult({
          id: payload.data.id,
          frontUrl: payload.data.frontImgUrl,
          backUrl: payload.data.backImgUrl,
          date: payload.data.createdAt,
        });
      } else {
        setError(payload.error || 'Certificate not found in database. Please check the ID and try again.');
      }
    } catch {
      setError('Network error bridging to database verification. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Auto-fetch if ID is present in query parameters (e.g. from QR scan or direct link)
  useEffect(() => {
    const queryId = searchParams.get('id');
    if (queryId) {
      setSearchedId(queryId);
      fetchCertificate(queryId);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchedId) return;
    fetchCertificate(searchedId);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (!result) return;
    const url = `${window.location.origin}/certificates?id=${encodeURIComponent(result.id)}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-col min-h-[70vh] bg-gray-50 pb-24">
      {/* 1. CERTIFICATES HERO SECTION */}
      <section className="relative w-full h-[360px] flex items-center justify-center bg-[#0b1f3a] overflow-hidden print:hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/services_hero.png" 
            alt="Certificates background" 
            fill 
            className="object-cover opacity-25"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 bg-[#00A3E0]/20 text-[#00A3E0] px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-4 border border-[#00A3E0]/30">
            <ShieldCheck size={14} /> Official Verification Registry
          </div>
          <h1 className="text-white text-4xl sm:text-6xl font-black uppercase tracking-tight drop-shadow-2xl">
            Registry <span className="text-[#00A3E0]">Verification</span>
          </h1>
          <p className="text-blue-200/80 mt-3 font-semibold uppercase tracking-[0.25em] text-xs sm:text-sm">
            Kingdom of Saudi Arabia • Advanced Inspection Est.
          </p>
        </div>
      </section>

      {/* 2. SEARCH SECTION */}
      <section className="py-8 bg-transparent relative z-20 -mt-20 print:hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="bg-white relative p-6 sm:p-10 shadow-2xl shadow-blue-950/10 rounded-3xl border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
              <div>
                <h2 className="text-xs text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#00A3E0]" />
                  Cryptographic Record Lookup
                </h2>
                <p className="text-sm text-gray-400 mt-1">Enter your certificate serial number or scan the QR code on your card</p>
              </div>
              <div className="text-xs text-gray-400 font-mono bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 self-start sm:self-auto">
                Format: <span className="text-gray-700 font-bold">JD######</span>
              </div>
            </div>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  value={searchedId}
                  onChange={(e) => setSearchedId(e.target.value)}
                  placeholder="Enter Certificate ID (e.g. JD123456)" 
                  className="flex-1 border-2 border-gray-100 focus:border-[#00A3E0] rounded-2xl p-4 sm:p-5 text-gray-900 font-mono font-bold text-lg uppercase transition-all bg-gray-50/60 focus:bg-white focus:outline-none"
                  required
                />
                <button 
                  type="submit" 
                  disabled={isSearching} 
                  className="bg-[#0b1f3a] hover:bg-[#00A3E0] transition-all text-white font-black py-4 sm:py-5 px-10 rounded-2xl shadow-xl shadow-blue-900/10 text-base flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer"
                >
                  {isSearching ? <Loader2 className="animate-spin" size={20} /> : <ShieldCheck size={20} />} 
                  VERIFY RECORD
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* 3. SEARCH RESULTS / PREVIEW */}
      <section className="container mx-auto px-4 md:px-8 max-w-5xl mt-8">
        {/* Loading State */}
        {isSearching && (
          <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-4 text-center">
            <Loader2 className="animate-spin text-[#00A3E0]" size={40} />
            <div>
              <p className="font-bold text-gray-800 text-lg">Querying Official Database...</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Cross-referencing cryptographic certificate ID</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!isSearching && error && (
          <div className="bg-red-50 text-red-700 p-8 rounded-3xl text-center border-2 border-red-100 shadow-sm">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-black">
              !
            </div>
            <h3 className="font-black text-xl mb-1">Verification Unsuccessful</h3>
            <p className="text-sm font-medium text-red-600/90 max-w-md mx-auto">{error}</p>
          </div>
        )}

        {/* Success / Certificate Preview State */}
        {!isSearching && result && (
          <div id="printable-area" className="flex flex-col items-center gap-10">
            {/* Header Card */}
            <div className="w-full bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-lg flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#00A3E0] opacity-5 -rotate-45 translate-x-16 -translate-y-16"></div>
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  <CheckCircle size={16} className="text-green-600" /> 
                  Verified Authentic Document
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-[#0b1f3a] font-mono tracking-tight uppercase">
                  {result.id}
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wider">
                  Issue & Registration Record: {new Date(result.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-3 print:hidden w-full lg:w-auto">
                <button 
                  onClick={handleCopyLink} 
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer"
                  title="Copy direct verification link"
                >
                  {copied ? <CheckCircle size={16} className="text-green-600" /> : <Copy size={16} />}
                  <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                </button>
                <button 
                  onClick={handlePrint} 
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#0b1f3a] hover:bg-black text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md cursor-pointer"
                >
                  <Printer size={16} /> Print Document
                </button>
              </div>
            </div>
            
            {/* Certificate Preview Displays */}
            <div className="w-full flex flex-col gap-10">
              {/* Front Preview */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center justify-between w-full max-w-4xl px-2">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">
                    Primary Authentication Face (Front)
                  </span>
                  <button 
                    onClick={() => setActiveModalImage(result.frontUrl)}
                    className="print:hidden text-xs text-[#00A3E0] hover:text-[#0b1f3a] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <ZoomIn size={14} /> Fullscreen Inspect
                  </button>
                </div>
                <div className="w-full max-w-4xl bg-white p-3 sm:p-5 rounded-3xl shadow-xl border border-gray-100 group relative">
                  <img 
                    src={result.frontUrl} 
                    alt={`Front Face of Certificate ${result.id}`} 
                    className="w-full rounded-2xl object-contain max-h-[700px] cursor-pointer" 
                    onClick={() => setActiveModalImage(result.frontUrl)}
                  />
                </div>
              </div>
              
              {/* Back Preview — only shown when a back image exists */}
              {result.backUrl && (
                <div className="flex flex-col items-center gap-3 border-t border-dashed border-gray-200 pt-10">
                  <div className="flex items-center justify-between w-full max-w-4xl px-2">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">
                      Secondary Authentication Face (Back)
                    </span>
                    <button 
                      onClick={() => setActiveModalImage(result.backUrl)}
                      className="print:hidden text-xs text-[#00A3E0] hover:text-[#0b1f3a] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <ZoomIn size={14} /> Fullscreen Inspect
                    </button>
                  </div>
                  <div className="w-full max-w-4xl bg-white p-3 sm:p-5 rounded-3xl shadow-xl border border-gray-100 group relative">
                    <img 
                      src={result.backUrl} 
                      alt={`Back Face of Certificate ${result.id}`} 
                      className="w-full rounded-2xl object-contain max-h-[700px] cursor-pointer" 
                      onClick={() => setActiveModalImage(result.backUrl!)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Verification Footer Banner */}
            <div className="bg-[#0b1f3a] text-white p-6 sm:p-8 rounded-3xl w-full text-center mt-6 print:mt-16">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00A3E0] mb-2">
                Advanced Inspection Identification & Verification System
              </p>
              <p className="text-xs font-medium text-gray-300 max-w-2xl mx-auto leading-relaxed">
                This document verification confirms the certificate was officially issued and recorded in the database of Advanced Inspection Est., Dammam, Kingdom of Saudi Arabia.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Lightbox Modal for Inspection */}
      {activeModalImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 print:hidden animate-in fade-in duration-200"
          onClick={() => setActiveModalImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setActiveModalImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-red-400 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
            <img 
              src={activeModalImage} 
              alt="High-resolution certificate preview" 
              className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl" 
            />
          </div>
        </div>
      )}

      {/* Print Specific Styles */}
      <style jsx global>{`
        @media print {
          .print\\:hidden { display: none !important; }
          body { background: white !important; }
          #printable-area { gap: 30px !important; margin: 0 !important; width: 100% !important; }
          img { break-inside: avoid; }
        }
      `}</style>
    </div>
  );
}

export default function Certificates() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-[#00A3E0]" size={40} />
      </div>
    }>
      <CertificateVerificationContent />
    </Suspense>
  );
}
