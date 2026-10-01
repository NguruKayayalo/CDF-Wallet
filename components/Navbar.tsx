
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'À Propos', href: '#about' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'Gouvernance', href: '#governance' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Média', href: '#media' },
    { name: 'Whitepaper', href: '#whitepaper' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${
      scrolled 
        ? 'py-3 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
        : 'py-8 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-4 group cursor-pointer select-none">
            <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-slate-900/40 rounded-2xl border border-white/10 p-1.5 shadow-2xl overflow-hidden group-hover:border-blue-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
              <img 
                src="img/logo.png" 
                alt="CDF Logo" 
                className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = '<span class="text-white font-serif font-black text-xl relative z-10">CDF</span>';
                    parent.classList.add('bg-blue-600');
                  }
                }} 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-xl md:text-2xl tracking-tight text-white leading-none">
                Franc<span className="text-blue-500">Congolais</span>
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                <span className="text-[8px] text-slate-500 uppercase tracking-[0.4em] font-bold">Res Publica</span>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative px-5 py-2 text-xs font-bold text-slate-400 hover:text-white transition-all font-serif uppercase tracking-widest group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </a>
              ))}
              <div className="ml-4 w-px h-6 bg-white/10"></div>
              <a 
                href="#technical" 
                className="ml-4 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black font-serif tracking-[0.2em] uppercase rounded-xl shadow-xl shadow-blue-600/20 transition-all hover:shadow-blue-600/40 hover:-translate-y-1 active:scale-95"
              >
                Acquérir CDF
              </a>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu className="h-6 w-6" />
                  </motion.div>
                ) }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute w-full bg-slate-950/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden shadow-2xl"
          >
            <div className="px-6 pt-4 pb-12 space-y-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-4 text-lg font-serif font-bold text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-6 px-4"
              >
                <a 
                  href="#technical"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-10 py-5 bg-blue-600 text-white font-serif font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-blue-600/20"
                >
                  Acquérir CDF
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
