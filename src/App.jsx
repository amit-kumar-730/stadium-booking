import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import StadiumCard from './components/StadiumCard';
import BookingForm from './components/BookingForm';
import AuthModal from './components/AuthModal';

const App = () => {
  const [stadiums, setStadiums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStadiums = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/stadiums');
        setStadiums(response.data);
      } catch (err) {
        console.error("Failed to fetch stadiums", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStadiums();
  }, []);

  const handleSelectStadium = (stadium) => {
    setSelectedStadium(stadium);
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const filteredStadiums = stadiums.filter(stad => {
    const search = searchTerm.toLowerCase().trim();
    if (!search) return true;
    
    return (
      stad.name?.toLowerCase().includes(search) ||
      stad.city?.toLowerCase().includes(search) ||
      stad.sport?.toLowerCase().includes(search)
    );
  });

  return (
    <AuthProvider>
      <div className="relative min-h-screen antialiased text-slate-900 overflow-x-hidden">
        {/* Global Professional Background */}
        <div className="fixed inset-0 -z-30 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2500&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-[0.12] grayscale-[0.3]"
            alt=""
          />
          <div className="absolute inset-0 bg-slate-50/70" />
        </div>
        <Navbar onAuthOpen={openAuth} onSearch={setSearchTerm} />
        
        <main>
          <Hero onBook={() => document.getElementById('stadiums')?.scrollIntoView({ behavior: 'smooth' })} />
          
          {/* Stadium Listings Section */}
          <section id="stadiums" className="py-32 relative overflow-hidden scroll-mt-24">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-1 bg-primary rounded-full" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Marketplace</p>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.9] max-w-3xl">
                  Discover India's <br />
                  <span className="text-primary italic">Premier</span> Arenas.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {isLoading ? (
                  Array(4).fill(0).map((_, i) => (
                    <div key={i} className="h-96 bg-slate-100 rounded-[2.5rem] animate-pulse" />
                  ))
                ) : filteredStadiums.length > 0 ? (
                  filteredStadiums.map(stad => (
                    <StadiumCard 
                      key={stad.id} 
                      stadium={stad} 
                      onSelect={handleSelectStadium} 
                    />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <p className="text-2xl font-black text-slate-400">
                      {searchTerm ? "No arenas found matching your search." : "No stadiums available at the moment."}
                    </p>
                  </div>
                )}
              </div>

            </div>
          </section>

          <Features />
          
          <BookingForm 
            selectedStadium={selectedStadium} 
            stadiums={stadiums} 
            onAuthRequired={() => openAuth('login')}
          />
        </main>
        
        <footer className="bg-slate-900 py-20 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="space-y-6">
                <span className="text-3xl font-black text-white tracking-tighter uppercase">ArenaReserve</span>
                <p className="text-slate-400 leading-relaxed font-medium">
                  Revolutionizing sports venue booking with real-time analytics and seamless user experience.
                </p>
              </div>
              <div>
                <h4 className="font-black uppercase text-xs tracking-widest mb-8 text-primary">Company</h4>
                <ul className="space-y-4 text-slate-400 font-bold">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Partnerships</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black uppercase text-xs tracking-widest mb-8 text-primary">Support</h4>
                <ul className="space-y-4 text-slate-400 font-bold">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Safety Rules</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black uppercase text-xs tracking-widest mb-8 text-primary">Newsletter</h4>
                <p className="text-slate-400 mb-6 font-medium text-sm">Get notified about new arenas and seasonal discounts.</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Email" className="bg-slate-800 border-none rounded-xl px-4 py-3 flex-1 text-sm focus:ring-2 focus:ring-primary whitespace-nowrap" />
                  <button className="bg-primary px-4 py-3 rounded-xl font-bold text-xs uppercase">Join</button>
                </div>
              </div>
            </div>
            <div className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm font-bold uppercase tracking-widest">
              © 2026 ArenaReserve. All Rights Reserved.
            </div>
          </div>
        </footer>

        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
          initialMode={authMode} 
        />
      </div>
    </AuthProvider>
  );
};

export default App;
