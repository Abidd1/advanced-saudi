'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'SERVICES', href: '/services' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'CERTIFICATES', href: '/certificates' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'CONTACT US', href: '/contact' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full pt-6">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex justify-between items-center bg-transparent">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center gap-1 z-50">
            <div className="text-white">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10L90 80H10L50 10Z" stroke="white" strokeWidth="6" strokeLinejoin="round"/>
                <path d="M50 30L75 70H25L50 30Z" fill="#00A3E0"/>
              </svg>
            </div>
            <span className="text-white text-xs font-semibold tracking-wider">Advanced</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  pathname === link.href ? 'text-[#00A3E0]' : 'text-white hover:text-[#00A3E0]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`fixed inset-0 bg-[#0b1f3a] z-40 flex flex-col items-center justify-center transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className={`text-xl font-bold py-4 transition-colors ${
              pathname === link.href ? 'text-[#00A3E0]' : 'text-white hover:text-[#00A3E0]'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
}
