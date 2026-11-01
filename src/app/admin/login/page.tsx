'use client';

import { useState } from 'react';
import { ShieldCheck, Loader2, Eye, EyeOff, Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        // Hard navigate so the browser immediately picks up the new HttpOnly cookie
        window.location.href = '/admin';
      } else {
        setError(data?.message || 'Login failed. Please check your credentials.');
      }
    } catch {
      setError('Network connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50/80 p-4">
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl shadow-blue-950/10 w-full max-w-md border border-gray-100">
        
        <div className="flex flex-col items-center mb-8 border-b border-gray-100 pb-6 text-center">
          <div className="flex items-center gap-2 mb-3">
            <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10L90 80H10L50 10Z" stroke="#00A3E0" strokeWidth="6" strokeLinejoin="round"/>
              <path d="M50 30L75 70H25L50 30Z" fill="#00A3E0"/>
            </svg>
            <span className="text-2xl font-black text-[#0b1f3a] uppercase tracking-wider">Advanced</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#00A3E0]/10 text-[#00A3E0] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest">
            <ShieldCheck size={14} /> Admin Verification Portal
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-2xl mb-6 text-sm font-semibold border border-red-200/80 text-center flex items-center justify-center gap-2">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-2">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Enter admin username"
                className="w-full border-2 border-gray-100 focus:border-[#00A3E0] rounded-xl p-3.5 pl-11 text-gray-900 font-medium text-sm transition-all focus:outline-none bg-gray-50/50 focus:bg-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                placeholder="••••••••••••"
                className="w-full border-2 border-gray-100 focus:border-[#00A3E0] rounded-xl p-3.5 pl-11 pr-11 text-gray-900 font-medium text-sm transition-all focus:outline-none bg-gray-50/50 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#0b1f3a] hover:bg-[#00A3E0] transition-all text-white font-black py-4 px-4 rounded-xl mt-4 shadow-lg shadow-blue-950/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : null}
            <span>{isLoading ? 'Authenticating...' : 'Authenticate Session'}</span>
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400 font-medium">Authorized inspection administrators only. All sessions are logged.</p>
        </div>

      </div>
    </div>
  );
}
