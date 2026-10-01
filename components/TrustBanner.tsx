
import React from 'react';
import { ShieldCheck, Users, Globe } from 'lucide-react';

const TrustBanner: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-900 border-y border-blue-800/30 py-12 relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          {/* Slogan Section */}
          <div className="flex-1">
             <div className="inline-flex items-center gap-2 text-yellow-400 font-serif font-bold tracking-widest uppercase text-xs md:text-sm mb-3 justify-center md:justify-start">
                <ShieldCheck className="w-5 h-5" />
                <span className="drop-shadow-md">Notre Philosophie</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight tracking-tight">
               La confiance d'abord. <br/>
               <span className="text-blue-400">Trading ensuite.</span>
             </h2>
          </div>

          {/* Divider (Hidden on mobile) */}
          <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-slate-500 to-transparent opacity-50"></div>

          {/* Statistic/Quote Section */}
          <div className="flex-1 flex flex-col md:flex-row items-center md:items-start gap-6 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm transform transition-transform hover:scale-[1.02]">
             <div className="p-4 bg-blue-600 rounded-full shadow-lg shadow-blue-900/50 flex-shrink-0">
                <Globe className="w-8 h-8 text-white" />
             </div>
             <div>
                <p className="text-white text-xl font-serif font-medium leading-snug italic">
                  "1 détenteur de cryptos sur 10 dans le monde est un utilisateur de franc congolais CDF"
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-3 text-slate-400 text-sm">
                   <Users className="w-4 h-4" />
                   <span className="uppercase tracking-wide text-xs font-bold text-blue-400">Vision Globale</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
