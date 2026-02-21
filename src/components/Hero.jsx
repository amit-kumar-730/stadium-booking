import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="relative pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 -z-20">
        <img 
          src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2500&auto=format&fit=crop" 
          className="w-full h-full object-cover"
          alt="Stadium Background"
        />
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-white" />
      </div>

      {/* Decorative Accents */}
      <div className="absolute top-40 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-6 text-center relative group">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 md:space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4 animate-float">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Official Booking Partner</span>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-[0.95] md:leading-[0.92] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              Elevate Your <br />
              <span className="text-amber-400 italic inline-block transform -rotate-1 cursor-default hover:rotate-0 transition-transform duration-500 hover:text-amber-300">Sports</span> Experience.
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 font-bold max-w-2xl mx-auto leading-relaxed pt-2 drop-shadow-lg">
              Book premium arenas in minutes. India's most trusted platform for professional sports bookings.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <a 
              href="#booking"
              className="w-full sm:w-auto px-10 py-5 bg-primary text-white text-lg font-black rounded-2xl shadow-float shadow-primary/20 hover:bg-primary-hover hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              Book Now
              <ArrowRight size={24} />
            </a>
            <a 
              href="#stadiums"
              className="w-full sm:w-auto px-10 py-5 bg-white/10 text-white text-lg font-black rounded-2xl backdrop-blur-md border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              Explore
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
