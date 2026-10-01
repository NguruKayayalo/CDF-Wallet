
import React, { useState, useEffect } from 'react';
import { ArrowRight, Lock, TrendingUp, ShieldCheck, Target, Star, LineChart, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';

const Hero: React.FC = () => {
  // Casting motion.div to any to resolve TypeScript errors with current framer-motion types configuration
  const MotionDiv = motion.div as any;

  const [prices, setPrices] = useState({
    usdt: '0.0000047163',
    bnb: '0.0000000078',
    change24h: 0
  });
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('En direct');

  const fetchPrices = async (manual: boolean = false) => {
    if (manual) setIsRefreshing(true);
    try {
      const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/0x18e173fdeb700568a08d1d7049309ae322d27777');
      if (response.ok) {
        const data = await response.json();
        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          setPrices({
            usdt: pair.priceUsd || '0.0000047163',
            bnb: pair.priceNative || '0.0000000078',
            change24h: pair.priceChange?.h24 || 0
          });
          setLastUpdated(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }
      }
    } catch {
      // Fallback silently
    } finally {
      setLoading(false);
      if (manual) {
        setTimeout(() => setIsRefreshing(false), 600);
      }
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(() => fetchPrices(false), 30000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Decorative Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] animate-subtle-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-yellow-600/10 rounded-full blur-[120px] animate-subtle-pulse delay-700"></div>
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px] animate-subtle-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          variants={containerVariants as any}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants as any} className="flex flex-col items-center gap-6 mb-10">
             {/* Real-Time Price Badges */}
             <div className="flex flex-wrap justify-center gap-4">
               {/* CDF/USDT Pair */}
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-900/40 border border-blue-500/20 backdrop-blur-xl shadow-2xl rounded-full">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-slate-400 text-[10px] font-sans uppercase tracking-[0.2em] font-bold">CDF / USDT</span>
                  </div>
                  <div className="w-px h-4 bg-slate-700/50"></div>
                  <span className="text-white font-mono font-bold text-sm tracking-wide">
                    ${prices.usdt}
                  </span>
                  {prices.change24h !== 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${prices.change24h >= 0 ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                      {prices.change24h > 0 ? '+' : ''}{prices.change24h}%
                    </span>
                  )}
                </div>

                {/* CDF/BNB Pair */}
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-900/40 border border-yellow-500/20 backdrop-blur-xl shadow-2xl rounded-full">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                    </span>
                    <span className="text-slate-400 text-[10px] font-sans uppercase tracking-[0.2em] font-bold">CDF / BNB</span>
                  </div>
                  <div className="w-px h-4 bg-slate-700/50"></div>
                  <span className="text-yellow-400 font-mono font-bold text-sm tracking-wide">
                    {parseFloat(prices.bnb).toFixed(9)}
                  </span>
                </div>

                {/* Live Refresh Button */}
                <button
                  onClick={() => fetchPrices(true)}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900/50 hover:bg-slate-800/80 border border-white/10 hover:border-blue-500/30 backdrop-blur-xl rounded-full text-slate-300 hover:text-white transition-all text-xs active:scale-95 group"
                  title="Actualiser les cours en direct"
                >
                  <RefreshCcw className={`w-3.5 h-3.5 text-blue-400 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                  <span className="text-[10px] uppercase tracking-wider font-sans font-semibold">
                    {isRefreshing ? 'Mise à jour...' : `MàJ : ${lastUpdated}`}
                  </span>
                </button>
             </div>

            {/* Network Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900/60 border border-slate-800 backdrop-blur-md rounded-full">
              <span className="text-slate-400 text-[9px] font-sans font-bold tracking-[0.3em] uppercase">Binance Smart Chain</span>
            </div>
            
            {/* Objective Badge */}
            <div className="group relative inline-flex items-center gap-5 py-4 px-10 bg-slate-900/60 border border-yellow-500/20 shadow-2xl overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="p-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <Target className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.3em] mb-1 font-sans">Vision Souveraine</span>
                <div className="flex items-baseline gap-3 font-serif">
                  <span className="text-white font-bold text-2xl">1 CDF</span>
                  <span className="text-slate-600 text-sm font-sans">est égal à</span>
                  <span className="text-gradient-gold font-black text-2xl">0.1 USDT</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants as any} className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tighter text-white mb-8 leading-[1.05]">
            L'Avenir du <br className="hidden md:block" />
            <span className="inline-block text-gradient-blue-white bg-300% animate-gradient">
               Congo Numérique
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants as any} className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-slate-400 mb-12 font-serif leading-relaxed px-4">
            <span className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4 block">Justice – Paix – Travail</span>
            Le Franc Congolais (CDF) est le socle de l'indépendance financière technologique de la RDC. 
            Une monnaie bâtie par le peuple, pour le peuple.
          </motion.p>
          
          <motion.div variants={itemVariants as any} className="flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto px-4">
            <a 
              href="#technical" 
              className="group px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-serif font-bold uppercase tracking-widest transition-all shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 flex items-center justify-center gap-3 rounded-xl overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              Contribuer au Projet
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#whitepaper" 
              className="group px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-serif font-bold uppercase tracking-widest transition-all border border-white/10 hover:border-white/30 flex items-center justify-center gap-3 rounded-xl backdrop-blur-md"
            >
              <ShieldCheck className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" /> 
              Explorer le Livre Blanc
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-16"
        >
          {[
            {
              icon: <ShieldCheck className="w-8 h-8" />,
              title: "Sécurité & Transparence",
              desc: "Technologie BEP-20 avec liquidité verrouillée et audit continu des contrats."
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: "Croissance Durable",
              desc: "Mécanismes de brûlages programmés et taxes redistribuées au développement national."
            },
            {
              icon: <Target className="w-8 h-8" />,
              title: "Inclusion Totale",
              desc: "Faciliter l'accès aux services financiers pour chaque citoyen congolais."
            }
          ].map((item, idx) => (
            <div key={idx} className="group text-left p-8 glass-card rounded-2xl">
              <div className="mb-6 w-14 h-14 flex items-center justify-center bg-blue-500/10 rounded-2xl text-blue-500 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-serif">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
