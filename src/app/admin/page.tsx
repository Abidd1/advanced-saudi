'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { UploadCloud, CheckCircle2, QrCode as QRIcon, Download, Loader2, Trash2, Search, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'qr'|'upload'|'manage'>('qr');
  const [createdId, setCreatedId] = useState<string>('');
  
  // Upload State
  const [idToUpload, setIdToUpload] = useState('');
  const [frontImage, setFrontImage] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{type: 'success'|'error', msg: string} | null>(null);

  // Manage State
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (activeTab === 'manage') {
      fetchCertificates();
    }
  }, [activeTab]);

  const fetchCertificates = async () => {
    setIsFetching(true);
    try {
      const res = await fetch('/api/certificates');
      const data = await res.json();
      if (data.success) {
        setCertificates(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch certificates");
    } finally {
      setIsFetching(false);
    }
  };

  const handleDeleteCert = async (id: string) => {
    if (!confirm(`Are you sure you want to delete certificate ${id}?`)) return;

    try {
      const res = await fetch(`/api/certificates?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCertificates(prev => prev.filter(c => c.id !== id));
      } else {
        alert("Failed to delete certificate");
      }
    } catch (err) {
      alert("Error deleting certificate");
    }
  };

  const handleGenerateId = () => {
    const shortId = 'JD' + Math.floor(100000 + Math.random() * 900000) + '-' + Math.floor(100 + Math.random() * 900);
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
      reader.onerror = error => reject(error);
    });
  };

  const handleFileDrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      setFrontImage(base64);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idToUpload || !frontImage) {
      setUploadStatus({ type: 'error', msg: 'Please provide ID and the certificate image.' });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: idToUpload, 
          frontImgBase64: frontImage
        })
      });

      const data = await res.json();
      if (res.ok) {
        setUploadStatus({ type: 'success', msg: `Certificate ${idToUpload} successfully published in database!` });
        setFrontImage('');
        setIdToUpload('');
      } else {
        setUploadStatus({ type: 'error', msg: data.error || 'Upload failed' });
      }
    } catch (err) {
      setUploadStatus({ type: 'error', msg: 'System error during upload' });
    } finally {
      setIsUploading(false);
    }
  };

  const currentHost = typeof window !== 'undefined' ? window.location.origin : 'https://advanced-saudi.com';

  const filteredCerts = certificates.filter(c => c.id.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      
      {/* Admin Header */}
      <div className="bg-[#0b1f3a] text-white py-6 shadow-xl relative z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="bg-[#00A3E0] p-2 rounded-lg">
                <Settings className="text-white" size={24} />
             </div>
             <div>
                <h1 className="text-2xl font-black tracking-tight">Admin Portal</h1>
                <p className="text-xs text-[#00A3E0] font-bold uppercase tracking-[0.2em]">Management Console</p>
             </div>
          </div>
          <button 
            onClick={() => { document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"; window.location.href="/admin/login"; }} 
            className="text-sm font-bold bg-white/10 hover:bg-white/20 transition px-6 py-2.5 rounded-full border border-white/20 backdrop-blur-md"
          >
            Logout session
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-10 flex flex-col md:flex-row gap-8 items-start">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-72 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden shrink-0">
          <button 
            onClick={() => setActiveTab('qr')}
            className={`flex items-center gap-3 p-5 text-left transition-all font-bold ${activeTab === 'qr' ? 'bg-[#00A3E0] text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <QRIcon size={20} /> QR Generator
          </button>
          <button 
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-3 p-5 text-left transition-all font-bold ${activeTab === 'upload' ? 'bg-[#00A3E0] text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <UploadCloud size={20} /> Publish Certificate
          </button>
          <button 
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-3 p-5 text-left transition-all font-bold ${activeTab === 'manage' ? 'bg-[#00A3E0] text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Settings size={20} /> Manage Database
          </button>
        </div>

        {/* Action Panel */}
        <div className="flex-1 w-full">

          {/* QR TAB */}
          {activeTab === 'qr' && (
            <div className="bg-white rounded-2xl shadow-sm p-8 w-full border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
               <h2 className="text-2xl font-black text-[#0b1f3a] mb-8 flex items-center gap-3">
                 <div className="w-2 h-8 bg-[#00A3E0] rounded-full"></div>
                 QR Code Generator
               </h2>
               
               <div className="flex flex-col xl:flex-row gap-12 items-start">
                 <div className="flex-1 w-full space-y-6">
                   <p className="text-gray-500 leading-relaxed font-medium">
                     Generate a high-resolution QR code for new certificate physical copies. This code links to our official verification portal.
                   </p>
                   <div className="space-y-2">
                     <label className="block text-sm font-black text-gray-700 uppercase tracking-widest">Target Unique ID</label>
                     <div className="flex shadow-sm rounded-xl overflow-hidden border-2 border-gray-100 focus-within:border-[#00A3E0] transition-colors">
                        <input 
                          type="text" 
                          value={createdId}
                          onChange={(e) => setCreatedId(e.target.value)}
                          placeholder="e.g., JD2405696"
                          className="flex-1 p-4 focus:outline-none uppercase font-mono font-bold text-lg"
                        />
                        <button onClick={handleGenerateId} className="bg-gray-900 text-white px-6 font-bold hover:bg-black transition text-sm">
                          AUTO-GEN
                        </button>
                     </div>
                   </div>
                 </div>

                 {createdId && (
                   <div className="p-8 border border-gray-100 rounded-3xl shrink-0 flex flex-col items-center bg-gray-50/50 shadow-inner w-full max-w-sm">
                      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                        <QRCodeSVG 
                          id="qrCodeEl"
                          value={`${currentHost}/certificates?id=${createdId}`} 
                          size={200} 
                          level="Q"
                        />
                      </div>
                      <p className="text-sm text-gray-400 mt-6 mb-8 font-mono font-bold tracking-widest">{createdId}</p>
                      
                      <button onClick={handleDownloadQR} className="flex items-center justify-center gap-3 bg-[#00A3E0] hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all w-full shadow-lg shadow-blue-200">
                        <Download size={20} /> Download PNG Asset
                      </button>
                   </div>
                 )}
               </div>
            </div>
          )}

          {/* UPLOAD TAB */}
          {activeTab === 'upload' && (
            <div className="bg-white rounded-2xl shadow-sm p-8 w-full border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
               <h2 className="text-2xl font-black text-[#0b1f3a] mb-8 flex items-center gap-3">
                 <div className="w-2 h-8 bg-[#00A3E0] rounded-full"></div>
                 Publish Certificate
               </h2>
               
               {uploadStatus && (
                 <div className={`p-5 rounded-xl mb-8 flex items-center gap-4 font-bold animate-in zoom-in-95 ${uploadStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                   {uploadStatus.type === 'success' ? <CheckCircle2 size={24} /> : null}
                   {uploadStatus.msg}
                 </div>
               )}

               <form onSubmit={handleSubmit} className="space-y-8">
                 <div className="space-y-2">
                   <label className="block text-sm font-black text-gray-700 uppercase tracking-widest">Map to Unique ID</label>
                   <input 
                      type="text" 
                      value={idToUpload}
                      onChange={(e) => setIdToUpload(e.target.value)}
                      required
                      placeholder="JDXXXXXX..."
                      className="w-full max-w-md border-2 border-gray-100 rounded-xl p-4 focus:outline-none focus:border-[#00A3E0] uppercase font-mono font-bold text-lg transition-colors"
                   />
                 </div>

                 <div className="grid grid-cols-1 gap-8">
                   <div className="space-y-4">
                     <label className="block text-sm font-black text-gray-700 uppercase tracking-widest">Certificate Image (Single File)</label>
                     <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-8 bg-gray-50 flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-[#00A3E0] transition-all h-80 cursor-pointer group">
                        <input type="file" accept="image/*" onChange={(e) => handleFileDrop(e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        {frontImage ? (
                          <div className="flex flex-col items-center text-green-600">
                            <CheckCircle2 className="mb-3" size={48} />
                            <span className="text-lg font-black">Image Ready</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center text-gray-400 group-hover:text-[#00A3E0] transition-colors">
                             <UploadCloud size={64} className="mb-3" />
                             <span className="text-sm font-bold">Upload Digital Copy</span>
                             <p className="text-[10px] mt-2 opacity-50 font-bold uppercase tracking-widest text-center">Contains both front & back in single document</p>
                          </div>
                        )}
                     </div>
                   </div>
                 </div>

                 <button 
                   type="submit" 
                   disabled={isUploading}
                   className="bg-[#0b1f3a] text-white px-8 py-5 rounded-2xl font-black text-xl w-full flex justify-center items-center gap-4 hover:bg-[#00A3E0] transition-all shadow-xl shadow-blue-900/10 disabled:opacity-50"
                 >
                   {isUploading ? <><Loader2 className="animate-spin" /> Synchronizing with Cloudinary...</> : 'Publish to Official Registry'}
                 </button>
               </form>
            </div>
          )}

          {/* MANAGE TAB */}
          {activeTab === 'manage' && (
            <div className="bg-white rounded-2xl shadow-sm p-8 w-full border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-gray-50 pb-8">
                   <h2 className="text-2xl font-black text-[#0b1f3a] flex items-center gap-3">
                     <div className="w-2 h-8 bg-[#00A3E0] rounded-full"></div>
                     Manage Registry
                   </h2>
                   
                   <div className="relative w-full md:w-80">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search registry ID..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-full py-3 pl-12 pr-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/20"
                      />
                   </div>
                </div>

                {isFetching ? (
                   <div className="py-20 flex flex-col items-center gap-4 text-gray-400">
                      <Loader2 className="animate-spin" size={48} />
                      <p className="font-bold uppercase tracking-widest text-xs">Accessing Secure Records...</p>
                   </div>
                ) : (
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                            <th className="pb-4 pl-4">Certificate ID</th>
                            <th className="pb-4">Published Date</th>
                            <th className="pb-4 text-right pr-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {filteredCerts.map((cert) => (
                            <tr key={cert.id} className="group hover:bg-gray-50/50 transition-colors">
                              <td className="py-5 pl-4">
                                <span className="font-mono font-black text-[#0b1f3a] text-lg uppercase">{cert.id}</span>
                              </td>
                              <td className="py-5">
                                <span className="text-sm font-bold text-gray-500">{new Date(cert.createdAt).toLocaleDateString()}</span>
                              </td>
                              <td className="py-5 text-right pr-4">
                                <button 
                                  onClick={() => handleDeleteCert(cert.id)}
                                  className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2.5 rounded-xl transition-all"
                                  title="Revoke Certificate"
                                >
                                  <Trash2 size={20} />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {filteredCerts.length === 0 && (
                            <tr>
                              <td colSpan={3} className="py-20 text-center text-gray-400 font-bold italic">No records found matching criteria</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                   </div>
                )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
