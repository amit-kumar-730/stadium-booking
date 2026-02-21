import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn, UserPlus, Mail, Lock, User, Trophy, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/signup';
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
      login(response.data.user);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        className="bg-white w-full max-w-xl rounded-[3rem] shadow-float border border-slate-100 overflow-hidden relative"
      >
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors z-10">
          <X size={32} />
        </button>

        <div className="flex flex-col md:flex-row">
           {/* Visual Side */}
           <div className="hidden md:flex md:w-5/12 bg-slate-50 p-12 flex-col justify-between border-r border-slate-100">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Trophy className="text-white" size={24} />
              </div>
              <div className="space-y-6">
                <h3 className="text-4xl font-black text-slate-900 leading-tight">
                  Unlock <br />
                  <span className="text-primary italic">Elite</span> <br />
                  Arenas.
                </h3>
                <p className="text-sm font-bold text-slate-400 leading-relaxed uppercase tracking-wider">Join thousands of professional sportsmen across India.</p>
              </div>
           </div>

           {/* Form Side */}
           <div className="flex-1 p-8 md:p-14">
              <div className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <div className="h-1.5 w-12 bg-primary mt-3 rounded-full" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        required
                        type="text"
                        placeholder="Full Name"
                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary transition-all font-bold text-slate-900"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                {mode === 'signup' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact No</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 font-black">+91</span>
                      <input 
                        required
                        type="tel"
                        placeholder="Mobile"
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary transition-all font-bold text-slate-900"
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      required
                      type="email"
                      placeholder="Gmail Address"
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary transition-all font-bold text-slate-900"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Pass</label>
                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      required
                      type="password"
                      placeholder="Password"
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary transition-all font-bold text-slate-900"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 text-xs font-black text-center uppercase tracking-widest">{error}</p>}

                <div className="pt-4 space-y-6">
                  <button 
                    disabled={loading}
                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-float shadow-slate-900/10 hover:bg-primary transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin mx-auto" /> : (mode === 'login' ? 'Authenticate' : 'Register Now')}
                  </button>
                  
                  <div className="text-center">
                    <button 
                      type="button"
                      onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                      className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-[0.2em] transition-colors"
                    >
                      {mode === 'login' ? "New around here? Create Account" : "Registered? Back to Login"}
                    </button>
                  </div>
                </div>
              </form>
           </div>
        </div>
      </motion.div>
    </div>
  );
};


export default AuthModal;
