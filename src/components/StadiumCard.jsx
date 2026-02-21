import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Trophy, ArrowRight, IndianRupee, Users, Car, DoorClosed, Lightbulb, Package, ChevronRight } from 'lucide-react';

const StadiumCard = ({ stadium, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -12 }}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-premium border border-slate-100 group transition-all duration-700 h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden shadow-lg">
        <img 
          src={stadium.image} 
          alt={stadium.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute top-5 right-5 flex flex-col gap-2 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-xl px-5 py-2.5 rounded-2xl shadow-float border border-white/20">
            <p className="text-primary font-black text-sm flex items-center gap-1">
              <IndianRupee size={14} />{stadium.price}<span className="text-[10px] text-slate-400 font-bold ml-0.5">/HR</span>
            </p>
          </div>
          <div className="bg-slate-900/95 backdrop-blur-xl px-5 py-2.5 rounded-2xl shadow-float flex items-center gap-2">
             <Trophy size={14} className="text-primary" />
             <p className="text-white font-black text-[10px] uppercase tracking-[0.2em]">{stadium.sport}</p>
          </div>
        </div>
        
        {/* Facilities Overlay */}
        <div className="absolute bottom-5 left-5 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
          {stadium.facilities?.parking && <div className="p-2.5 bg-white/90 backdrop-blur-md rounded-xl text-slate-700 shadow-premium" title="Parking"><Car size={16} /></div>}
          {stadium.facilities?.changingRoom && <div className="p-2.5 bg-white/90 backdrop-blur-md rounded-xl text-slate-700 shadow-premium" title="Changing Room"><DoorClosed size={16} /></div>}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
           <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1.5">{stadium.area} • {stadium.city}</p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-primary transition-colors duration-300">{stadium.name}</h3>
           </div>
           
           <div className="flex items-center gap-4 py-4 border-y border-slate-100">
             <div className="flex -space-x-3">
               {/* Dynamic Indian-themed Avatars */}
               {[
                 "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=200&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
               ].map((url, i) => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                   <img src={url} alt="Indian User" className="w-full h-full object-cover" />
                 </div>
               ))}
               <div className="w-8 h-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] text-white font-black">
                 +12
               </div>
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recently Booked</p>
           </div>
        </div>

        <div className="pt-8 flex items-center gap-3">
           <button 
             onClick={() => onSelect(stadium)}
             className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-float shadow-slate-900/10 hover:bg-primary hover:shadow-primary/20 transition-all active:scale-95"
           >
             Book Arena
           </button>
           <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-colors cursor-pointer active:scale-90">
              <ChevronRight size={22} />
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StadiumCard;

