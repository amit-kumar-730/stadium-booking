import React from 'react';
import { motion } from 'framer-motion';
import { Zap, MapPin, CreditCard, ShieldCheck } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
  >
    <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
      <Icon className="text-primary group-hover:text-white" size={32} />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </motion.div>
);

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Get real-time availability and confirm your booking instantly without any wait time."
    },
    {
      icon: MapPin,
      title: "Multiple Sports",
      description: "From Cricket Nets to Football Turfs, choose from a wide range of premium sports facilities."
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Easy and highly secure payment options tailored for a seamless checkout experience."
    }
  ];

  return (
    <section id="features" className="py-24 bg-transparent scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Why Book With Us?</h2>
          <p className="text-xl text-slate-600">Experience world-class facilities and seamless booking process.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} delay={i * 0.2} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
