'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-100">
        
        <div className="flex flex-col items-center mb-8 border-b pb-6">
          <div className="flex items-center gap-2 mb-2">
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10L90 80H10L50 10Z" stroke="#00A3E0" strokeWidth="6" strokeLinejoin="round"/>
              <path d="M50 30L75 70H25L50 30Z" fill="#00A3E0"/>
            </svg>
            <span className="text-xl font-extrabold text-[#0b1f3a] uppercase tracking-wider">Advanced</span>
          </div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Admin Portal</h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm font-medium border border-red-200 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0]"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#0b1f3a] hover:bg-[#00A3E0] transition-colors text-white font-bold py-3 px-4 rounded mt-2"
          >
            Authenticate Session
          </button>
        </form>

      </div>
    </div>
  );
}
