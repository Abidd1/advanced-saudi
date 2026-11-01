'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  UploadCloud, 
  CheckCircle2, 
  QrCode as QRIcon, 
  Download, 
  Loader2, 
  Trash2, 
  Search, 
  Settings, 
  Eye, 
  ExternalLink, 
  LogOut, 
  X, 
  Copy,
  AlertCircle
} from 'lucide-react';

interface CertificateItem {
  id: string;
  frontImgUrl: string;
  backImgUrl: string | null;
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'qr' | 'upload' | 'manage'>('manage');
  const [createdId, setCreatedId] = useState<string>('');
  
  // Upload State
  const [idToUpload, setIdToUpload] = useState('');
  const [frontImage, setFrontImage] = useState<string>('');
  const [frontFileName, setFrontFileName] = useState<string>('');
  const [backImage, setBackImage] = useState<string>('');
  const [backFileName, setBackFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Manage State
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Preview Modal State
  const [previewCert, setPreviewCert] = useState<CertificateItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (activeTab === 'manage') {
      fetchCertificates();
    }
  }, [activeTab]);

  const fetchCertificates = async () => {
    setIsFetching(true);
    try {
      const res = await fetch('/api/certificates');
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      const data = await res.json();
      if (data.success) {
        setCertificates(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch certificates:', err);
    } finally {
      setIsFetching(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      window.location.href = '/admin/login';
    }
  };

  const handleDeleteCert = async (id: string) => {
    if (!confirm(`Are you sure you want to permanently delete certificate "${id}" from the database?`)) return;

    try {
      const res = await fetch(`/api/certificates?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setCertificates((prev) => prev.filter((c) => c.id !== id));
        if (previewCert?.id === id) setPreviewCert(null);
      } else {
        alert(data?.error || 'Failed to delete certificate');
      }
    } catch {
      alert('Network error while deleting certificate');
    }
  };

  const handleGenerateId = () => {
    const shortId = 'JD' + Math.floor(100000 + Math.random() * 900000);
    setCreatedId(shortId);
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('qrCodeEl');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `QR_${createdId}.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileDrop = async (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 15 * 1024 * 1024) {
        alert('File is too large. Please select an image under 15MB.');
        return;
      }
      const base64 = await fileToBase64(file);
      if (side === 'front') {
        setFrontImage(base64);
        setFrontFileName(file.name);
      } else {
        setBackImage(base64);
        setBackFileName(file.name);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = idToUpload.trim().toUpperCase();

    if (!cleanId || !frontImage || !backImage) {
      setUploadStatus({ type: 'error', msg: 'Please provide certificate ID and both Front and Back images.' });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: cleanId, 
          frontImgBase64: frontImage, 
          backImgBase64: backImage 
        })
      });

      const data = await res.json();
      if (res.ok && data?.success) {
        setUploadStatus({ 
          type: 'success', 
          msg: `Certificate ${cleanId} successfully registered in database and synced to Cloudinary!` 
        });
        setFrontImage('');
        setFrontFileName('');
        setBackImage('');
        setBackFileName('');
        setIdToUpload('');
        fetchCertificates();
      } else {
        setUploadStatus({ type: 'error', msg: data.error || 'Upload failed' });
      }
    } catch {
      setUploadStatus({ type: 'error', msg: 'System error during upload. Please check connection.' });
    } finally {
      setIsUploading(false);
    }
  };

  const currentHost = typeof window !== 'undefined' ? window.location.origin : 'https://advanced-saudi.com';
  const filteredCerts = certificates.filter((c) => c.id.toLowerCase().includes(searchQuery.toLowerCase().trim()));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      
      {/* Admin Header */}
      <div className="bg-[#0b1f3a] text-white py-6 shadow-xl relative z-40 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="bg-[#00A3E0] p-2.5 rounded-xl shadow-md">
                <Settings className="text-white" size={24} />
             </div>
             <div>
                <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                  Admin Portal
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">Active</span>
                </h1>
                <p className="text-xs text-[#00A3E0] font-bold uppercase tracking-[0.2em]">Certificate Registry Management</p>
             </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 text-sm font-bold bg-white/10 hover:bg-red-500/20 hover:text-red-300 hover:border-red-400/30 transition-all px-5 py-2.5 rounded-xl border border-white/20 backdrop-blur-md cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout session</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-8 flex flex-col md:flex-row gap-8 items-start">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden shrink-0">
          <button 
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-3 p-4.5 text-left transition-all font-bold text-sm cursor-pointer ${activeTab === 'manage' ? 'bg-[#00A3E0] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Settings size={18} /> Manage Registry ({certificates.length})
          </button>
          <button 
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-3 p-4.5 text-left transition-all font-bold text-sm cursor-pointer ${activeTab === 'upload' ? 'bg-[#00A3E0] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <UploadCloud size={18} /> Publish Certificate
          </button>
          <button 
            onClick={() => setActiveTab('qr')}
            className={`flex items-center gap-3 p-4.5 text-left transition-all font-bold text-sm cursor-pointer ${activeTab === 'qr' ? 'bg-[#00A3E0] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <QRIcon size={18} /> QR Generator
          </button>
        </div>

        {/* Action Panel */}
        <div className="flex-1 w-full">

          {/* MANAGE REGISTRY TAB */}
          {activeTab === 'manage' && (
            <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 w-full border border-gray-100 animate-in fade-in duration-300">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                   <div>
                     <h2 className="text-2xl font-black text-[#0b1f3a] flex items-center gap-3">
                       <div className="w-2.5 h-7 bg-[#00A3E0] rounded-full"></div>
                       Certificate Registry
                     </h2>
                     <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1 ml-5">
                       {certificates.length} Total Registered Documents
                     </p>
                   </div>
                   
                   <div className="relative w-full md:w-80">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search by ID (e.g. JD123456)..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-11 pr-5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/30 focus:border-[#00A3E0]"
                      />
                   </div>
                </div>

                {isFetching ? (
                   <div className="py-20 flex flex-col items-center gap-4 text-gray-400">
                      <Loader2 className="animate-spin text-[#00A3E0]" size={40} />
                      <p className="font-bold uppercase tracking-widest text-xs">Loading Secure Registry...</p>
                   </div>
                ) : (
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 bg-gray-50/50">
                            <th className="py-4 pl-4 rounded-l-xl">Certificate ID</th>
                            <th className="py-4">Images Status</th>
                            <th className="py-4">Issue Date</th>
                            <th className="py-4 text-right pr-4 rounded-r-xl">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {filteredCerts.map((cert) => (
                            <tr key={cert.id} className="group hover:bg-blue-50/20 transition-colors">
                              <td className="py-5 pl-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-lg bg-[#00A3E0]/10 text-[#00A3E0] flex items-center justify-center font-bold text-xs">
                                    ID
                                  </div>
                                  <div>
                                    <span className="font-mono font-black text-[#0b1f3a] text-base uppercase block">
                                      {cert.id}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-5">
                                <div className="flex items-center gap-2">
                                  {cert.backImgUrl ? (
                                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                                      Front &amp; Back Ready
                                    </span>
                                  ) : (
                                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                                      Front Only
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-5">
                                <span className="text-xs font-semibold text-gray-500">
                                  {new Date(cert.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                </span>
                              </td>
                              <td className="py-5 text-right pr-4">
                                <div className="flex items-center justify-end gap-2">
                                  {/* Preview Modal Button */}
                                  <button 
                                    onClick={() => setPreviewCert(cert)}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#00A3E0]/10 text-[#00A3E0] hover:bg-[#00A3E0] hover:text-white px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                                    title="Quick Preview"
                                  >
                                    <Eye size={14} /> Preview
                                  </button>
                                  
                                  {/* Public View Link */}
                                  <a 
                                    href={`/certificates?id=${encodeURIComponent(cert.id)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-all"
                                    title="Open Public Verification Link"
                                  >
                                    <ExternalLink size={14} /> Public View
                                  </a>

                                  {/* Delete Certificate */}
                                  <button 
                                    onClick={() => handleDeleteCert(cert.id)}
                                    className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all cursor-pointer"
                                    title="Revoke Certificate"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {filteredCerts.length === 0 && (
                            <tr>
                              <td colSpan={4} className="py-16 text-center text-gray-400 font-bold">
                                {searchQuery ? `No certificate records match "${searchQuery}"` : 'No certificates published yet.'}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                   </div>
                )}
            </div>
          )}

          {/* PUBLISH CERTIFICATE TAB */}
          {activeTab === 'upload' && (
            <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 w-full border border-gray-100 animate-in fade-in duration-300">
               <h2 className="text-2xl font-black text-[#0b1f3a] mb-6 flex items-center gap-3">
                 <div className="w-2.5 h-7 bg-[#00A3E0] rounded-full"></div>
                 Publish Certificate Document
               </h2>
               
               {uploadStatus && (
                 <div className={`p-4.5 rounded-2xl mb-6 flex items-center gap-3 font-bold text-sm ${uploadStatus.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                   {uploadStatus.type === 'success' ? <CheckCircle2 size={20} className="text-emerald-600 shrink-0" /> : <AlertCircle size={20} className="text-red-600 shrink-0" />}
                   <span>{uploadStatus.msg}</span>
                 </div>
               )}

               <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                   <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-2">
                     Certificate Unique ID
                   </label>
                   <input 
                      type="text" 
                      value={idToUpload}
                      onChange={(e) => setIdToUpload(e.target.value)}
                      required
                      placeholder="e.g. JD2405696"
                      className="w-full max-w-md border-2 border-gray-200 rounded-xl p-3.5 focus:outline-none focus:border-[#00A3E0] uppercase font-mono font-bold text-base transition-colors bg-gray-50/50 focus:bg-white"
                   />
                   <p className="text-xs text-gray-400 mt-1.5 font-medium">Unique identifier matching the physical inspection card.</p>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   {/* Front Image Uploader */}
                   <div className="space-y-2">
                     <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">
                       Certificate Front Side
                     </label>
                     <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-4 bg-gray-50/60 flex flex-col items-center justify-center min-h-[220px] transition-all overflow-hidden group">
                        {frontImage ? (
                          <div className="w-full flex flex-col items-center gap-2">
                            <div className="relative w-full h-44 rounded-xl overflow-hidden border border-gray-200 bg-white">
                              <img src={frontImage} alt="Front Preview" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex items-center justify-between w-full px-2">
                              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 truncate max-w-[200px]">
                                <CheckCircle2 size={14} /> {frontFileName || 'Front Image Ready'}
                              </span>
                              <button 
                                type="button" 
                                onClick={() => { setFrontImage(''); setFrontFileName(''); }}
                                className="text-xs font-bold text-red-500 hover:text-red-700 cursor-pointer"
                              >
                                Replace
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleFileDrop(e, 'front')} 
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                            />
                            <div className="flex flex-col items-center text-gray-400 group-hover:text-[#00A3E0] transition-colors">
                               <UploadCloud size={40} className="mb-2 text-[#00A3E0]" />
                               <span className="text-sm font-bold text-gray-700">Select Front Image</span>
                               <span className="text-xs text-gray-400 mt-1">PNG, JPG or WebP (max 15MB)</span>
                            </div>
                          </>
                        )}
                     </div>
                   </div>

                   {/* Back Image Uploader */}
                   <div className="space-y-2">
                     <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">
                       Certificate Back Side
                     </label>
                     <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-4 bg-gray-50/60 flex flex-col items-center justify-center min-h-[220px] transition-all overflow-hidden group">
                        {backImage ? (
                          <div className="w-full flex flex-col items-center gap-2">
                            <div className="relative w-full h-44 rounded-xl overflow-hidden border border-gray-200 bg-white">
                              <img src={backImage} alt="Back Preview" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex items-center justify-between w-full px-2">
                              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 truncate max-w-[200px]">
                                <CheckCircle2 size={14} /> {backFileName || 'Back Image Ready'}
                              </span>
                              <button 
                                type="button" 
                                onClick={() => { setBackImage(''); setBackFileName(''); }}
                                className="text-xs font-bold text-red-500 hover:text-red-700 cursor-pointer"
                              >
                                Replace
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleFileDrop(e, 'back')} 
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                            />
                            <div className="flex flex-col items-center text-gray-400 group-hover:text-[#00A3E0] transition-colors">
                               <UploadCloud size={40} className="mb-2 text-[#00A3E0]" />
                               <span className="text-sm font-bold text-gray-700">Select Back Image</span>
                               <span className="text-xs text-gray-400 mt-1">PNG, JPG or WebP (max 15MB)</span>
                            </div>
                          </>
                        )}
                     </div>
                   </div>
                 </div>

                 <button 
                   type="submit" 
                   disabled={isUploading}
                   className="bg-[#0b1f3a] text-white px-8 py-4 rounded-xl font-bold text-base w-full flex justify-center items-center gap-3 hover:bg-[#00A3E0] transition-all shadow-lg shadow-blue-950/10 disabled:opacity-50 cursor-pointer"
                 >
                   {isUploading ? (
                     <>
                       <Loader2 className="animate-spin" size={20} />
                       <span>Uploading and Syncing to Database...</span>
                     </>
                   ) : (
                     'Publish to Official Registry'
                   )}
                 </button>
               </form>
            </div>
          )}

          {/* QR TAB */}
          {activeTab === 'qr' && (
            <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 w-full border border-gray-100 animate-in fade-in duration-300">
               <h2 className="text-2xl font-black text-[#0b1f3a] mb-6 flex items-center gap-3">
                 <div className="w-2.5 h-7 bg-[#00A3E0] rounded-full"></div>
                 QR Code Generator
               </h2>
               
               <div className="flex flex-col lg:flex-row gap-10 items-start">
                 <div className="flex-1 w-full space-y-5">
                   <p className="text-gray-600 leading-relaxed text-sm">
                     Generate a high-density QR code linking directly to the official certificate verification page. Inspectors and clients scanning this code will be taken immediately to the verified document view.
                   </p>
                   <div className="space-y-2">
                     <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">Target Unique ID</label>
                     <div className="flex shadow-sm rounded-xl overflow-hidden border-2 border-gray-200 focus-within:border-[#00A3E0] transition-colors">
                        <input 
                          type="text" 
                          value={createdId}
                          onChange={(e) => setCreatedId(e.target.value.toUpperCase())}
                          placeholder="e.g. JD2405696"
                          className="flex-1 p-3.5 focus:outline-none uppercase font-mono font-bold text-base"
                        />
                        <button 
                          onClick={handleGenerateId} 
                          type="button"
                          className="bg-gray-900 text-white px-5 font-bold hover:bg-black transition text-xs tracking-wider cursor-pointer"
                        >
                          AUTO-GEN
                        </button>
                     </div>
                   </div>

                   {createdId && (
                     <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-xs font-mono text-gray-600 break-all">
                       <span className="font-bold text-[#00A3E0] block mb-1">Encoded URL:</span>
                       {`${currentHost}/certificates?id=${createdId}`}
                     </div>
                   )}
                 </div>

                 {createdId && (
                   <div className="p-6 border border-gray-100 rounded-3xl shrink-0 flex flex-col items-center bg-gray-50/80 shadow-sm w-full max-w-sm">
                      <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
                        <QRCodeSVG 
                          id="qrCodeEl"
                          value={`${currentHost}/certificates?id=${encodeURIComponent(createdId)}`} 
                          size={200} 
                          level="Q"
                        />
                      </div>
                      <p className="text-sm text-gray-700 mt-4 mb-6 font-mono font-black tracking-widest">{createdId}</p>
                      
                      <button 
                        onClick={handleDownloadQR} 
                        className="flex items-center justify-center gap-2 bg-[#00A3E0] hover:bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold transition-all w-full shadow-md text-sm cursor-pointer"
                      >
                        <Download size={18} /> Download High-Res PNG
                      </button>
                   </div>
                 )}
               </div>
            </div>
          )}

        </div>
      </div>

      {/* QUICK PREVIEW MODAL */}
      {previewCert && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewCert(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase">
                    Verified in Registry
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">
                    {new Date(previewCert.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#0b1f3a] font-mono uppercase">{previewCert.id}</h3>
              </div>
              <button 
                onClick={() => setPreviewCert(null)}
                className="text-gray-400 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <span className="text-xs font-black text-gray-400 uppercase tracking-wider block">Front Face</span>
                <div className="border border-gray-200 rounded-2xl p-2 bg-gray-50 flex items-center justify-center min-h-[260px]">
                  <img src={previewCert.frontImgUrl} alt="Front Face" className="max-h-72 object-contain rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-black text-gray-400 uppercase tracking-wider block">Back Face</span>
                <div className="border border-gray-200 rounded-2xl p-2 bg-gray-50 flex items-center justify-center min-h-[260px]">
                  {previewCert.backImgUrl ? (
                    <img src={previewCert.backImgUrl} alt="Back Face" className="max-h-72 object-contain rounded-xl" />
                  ) : (
                    <span className="text-xs text-gray-400 font-semibold italic">No back image uploaded</span>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
              <a 
                href={`/certificates?id=${encodeURIComponent(previewCert.id)}`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#0b1f3a] hover:bg-[#00A3E0] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md"
              >
                <ExternalLink size={16} /> Open Public Verification Page
              </a>
              <button 
                onClick={() => handleDeleteCert(previewCert.id)}
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors cursor-pointer"
              >
                <Trash2 size={16} /> Delete Certificate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
