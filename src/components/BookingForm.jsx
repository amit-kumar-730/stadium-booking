import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, AlertCircle, Calendar, Trophy, MapPin, User, LogIn, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BookingForm = ({ selectedStadium, stadiums, onAuthRequired }) => {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    stadiumId: selectedStadium?.id || '',
    date: '',
    startTime: '09:00',
    endTime: '10:00',
    numPlayers: 1,
    paymentMethod: 'UPI'
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error 
  const [errorMessage, setErrorMessage] = useState('');
  const [bookingResult, setBookingResult] = useState(null);

  useEffect(() => {
    if (selectedStadium) {
      setFormData(prev => ({ ...prev, stadiumId: selectedStadium.id }));
    }
  }, [selectedStadium]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const selected = stadiums.find(s => s.id === formData.stadiumId);
      const response = await axios.post('http://localhost:5000/api/bookings', {
        ...formData,
        userId: user.id,
        sport: selected?.sport || 'General'
      });

      setBookingResult(response.data.booking);
      setStatus('success');
      setFormData({ stadiumId: '', date: '', startTime: '09:00', endTime: '10:00', numPlayers: 1, paymentMethod: 'UPI' });
      setTimeout(() => setStatus('idle'), 8000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.response?.data?.error || 'Something went wrong.');
    }
  };

  const targetStadium = stadiums.find(s => s.id === formData.stadiumId);

  return (
    <section id="booking" className="py-32 bg-transparent relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* Booking Summary/Info */}
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-6xl font-black text-slate-900 leading-[0.9] tracking-tight">
                  Seamless <br />
                  <span className="text-primary italic underline underline-offset-[12px] decoration-8">Reservations</span>.
                </h2>
                <p className="text-xl text-slate-500 font-medium max-w-md leading-relaxed">
                  Real-time slot tracking and automated payment verification for India's top arenas.
                </p>
              </div>

              {targetStadium ? (
                <div className="space-y-6">
                  <div className="p-10 bg-white rounded-[3rem] shadow-premium border border-slate-100 flex flex-col md:flex-row gap-8">
                    <img src={targetStadium.image} className="w-full md:w-32 h-40 md:h-32 rounded-3xl object-cover shadow-premium" alt="" />
                    <div className="flex-1 space-y-4">
                      <div>
                        <h4 className="font-black text-2xl text-slate-900">{targetStadium.name}</h4>
                        <p className="text-xs font-black text-primary uppercase tracking-[0.2em]">{targetStadium.area} • {targetStadium.city}</p>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pricing</p>
                          <p className="text-xl font-black text-slate-900">₹{targetStadium.price}<span className="text-xs text-slate-400 font-bold">/hr</span></p>
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            <p className="text-xs font-black text-emerald-600 uppercase">Available</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                     {Object.entries(targetStadium.facilities).map(([key, val]) => (
                       val && <span key={key} className="text-[10px] font-black uppercase tracking-[0.2em] bg-white text-slate-600 border border-slate-100 px-4 py-2 rounded-2xl shadow-sm">{key.replace(/([A-Z])/g, ' $1')}</span>
                     ))}
                  </div>
                </div>
              ) : (
                <div className="p-16 bg-white rounded-[3rem] border-4 border-dashed border-slate-200 text-center space-y-6">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto shadow-premium text-slate-200">
                    <Trophy size={48} />
                  </div>
                  <div>
                    <p className="text-slate-900 font-black uppercase tracking-widest text-sm">Waiting for Selection</p>
                    <p className="text-xs text-slate-400 font-bold mt-1">Please pick an arena from the marketplace</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3.5rem] p-8 md:p-14 shadow-float border border-slate-100 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Selected Venue</label>
                  <div className="relative">
                    <select
                      required
                      name="stadiumId"
                      value={formData.stadiumId}
                      onChange={handleChange}
                      className="w-full pl-6 pr-12 py-4.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 font-bold appearance-none"
                    >
                      <option value="">Choose an Arena</option>
                      {stadiums.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.sport})</option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                      <ChevronRight className="rotate-90" size={20} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Date</label>
                    <input
                      required
                      type="date"
                      name="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-6 py-4.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Squad Size</label>
                    <input
                      required
                      type="number"
                      min="1"
                      name="numPlayers"
                      value={formData.numPlayers}
                      onChange={handleChange}
                      className="w-full px-6 py-4.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Check-in</label>
                    <input
                      required
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="w-full px-6 py-4.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Check-out</label>
                    <input
                      required
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      className="w-full px-6 py-4.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Payment Strategy</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['UPI', 'Card', 'Banking', 'Cash'].map(method => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({...formData, paymentMethod: method})}
                        className={`py-3.5 rounded-xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${formData.paymentMethod === method ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6">
                {isAuthenticated ? (
                  <button
                    disabled={status === 'loading'}
                    type="submit"
                    className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-sm uppercase tracking-[0.3em] shadow-float shadow-slate-900/10 hover:bg-slate-800 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      'Request Booking'
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onAuthRequired}
                    className="w-full py-5 rounded-2xl bg-white text-slate-900 border-2 border-slate-100 font-black text-sm uppercase tracking-[0.2em] shadow-premium hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                  >
                    <LogIn size={20} />
                    Sign In to Book
                  </button>
                )}
              </div>
            </form>

            <AnimatePresence>
              {status === 'success' && bookingResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 p-10 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 space-y-6"
                >
                  <div className="flex items-center gap-4 text-emerald-600">
                    <CheckCircle className="shrink-0" size={32} />
                    <div>
                      <h4 className="font-black text-xl uppercase tracking-tighter">Slot Secured</h4>
                      <p className="text-sm font-bold opacity-70">Payment {bookingResult.paymentStatus}</p>
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-emerald-200/30">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-emerald-800/60 font-bold uppercase tracking-widest text-[10px]">Reference ID</span>
                      <span className="text-emerald-900 font-black">{bookingResult.id}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-emerald-800/60 font-bold uppercase tracking-widest text-[10px]">TXN Tracking</span>
                      <span className="text-emerald-900 font-mono font-bold text-[10px] truncate max-w-[150px]">{bookingResult.transactionId || 'N/A'}</span>
                    </div>
                  </div>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-4 text-red-600 font-bold text-sm"
                >
                  <AlertCircle className="shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
