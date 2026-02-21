import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Menu, X, LogOut, User, LogIn, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onAuthOpen, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-4' : 'py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className={`transition-all duration-500 rounded-2xl md:rounded-3xl ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-premium border border-white/20 px-4 md:px-8 py-3 md:py-4' 
            : 'bg-transparent px-0'
        } flex items-center justify-between`}>
          
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300">
              <Trophy className="text-white" size={24} />
            </div>
            <span className={`text-xl md:text-2xl font-black transition-colors duration-300 ${
              scrolled || isOpen ? 'text-slate-900' : 'text-white'
            }`}>
              Arena<span className="text-amber-400 italic">Reserve</span>
            </span>
          </div>

          {/* Desktop Nav & Search */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative group/search">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                scrolled || isOpen ? 'text-slate-400' : 'text-white/60'
              }`} size={18} />
              <input 
                type="text" 
                placeholder="Search stadiums..." 
                onChange={(e) => onSearch(e.target.value)}
                className={`pl-12 pr-6 py-3 rounded-2xl text-xs font-bold transition-all w-64 focus:w-80 outline-none border ${
                  scrolled || isOpen 
                    ? 'bg-slate-50 border-slate-100 text-slate-900 focus:bg-white focus:border-primary/30' 
                    : 'bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20'
                }`}
              />
            </div>
            <div className="flex items-center gap-10">
              {[
                { label: 'Find Stadiums', link: '#stadiums' },
                { label: 'Features', link: '#features' }
              ].map(item => (
                <a 
                  key={item.label}
                  href={item.link}
                  className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${
                    scrolled || isOpen ? 'text-slate-500 hover:text-primary' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Authenticated</p>
                  <p className={`text-sm font-bold ${
                    scrolled || isOpen ? 'text-slate-900' : 'text-white'
                  }`}>{user.name}</p>
                </div>
                <div className="relative group">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-xl border-2 border-primary/20 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  {/* Minimal Dropdown Simulation */}
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-float border border-slate-100 p-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button 
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold text-sm"
                    >
                      <LogOut size={18} />
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <button 
                  onClick={() => onAuthOpen('login')}
                  className={`px-6 py-3 text-xs font-black uppercase tracking-[0.2em] transition-colors ${
                    scrolled || isOpen ? 'text-slate-900 hover:text-primary' : 'text-white hover:text-primary'
                  }`}
                >
                  Log In
                </button>
                <button 
                  onClick={() => onAuthOpen('signup')}
                  className="px-6 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-[0.15em] shadow-lg shadow-primary/30 hover:bg-primary-hover hover:-translate-y-1 transition-all active:scale-95"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-3 bg-slate-100 rounded-xl text-slate-900"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-[2rem] shadow-float border border-slate-100 p-8 z-50 overflow-hidden"
            >
              <div className="space-y-6">
                {[
                  { label: 'Find Stadiums', link: '#stadiums' },
                  { label: 'Features', link: '#features' }
                ].map(item => (
                  <a 
                    key={item.label}
                    href={item.link}
                    onClick={() => setIsOpen(false)}
                    className="block text-2xl font-black text-slate-900 hover:text-primary transition-colors uppercase tracking-tight"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  {!isAuthenticated ? (
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => { onAuthOpen('login'); setIsOpen(false); }}
                        className="w-full py-4 text-xs font-black uppercase tracking-widest text-slate-900 border-2 border-slate-100 rounded-2xl"
                      >
                        Log In
                      </button>
                      <button 
                        onClick={() => { onAuthOpen('signup'); setIsOpen(false); }}
                        className="w-full py-4 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20"
                      >
                        Join Now
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="w-full py-4 bg-red-50 text-red-500 text-sm font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3"
                    >
                      <LogOut size={24} />
                      Log Out
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
