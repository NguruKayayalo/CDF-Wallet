
import React from 'react';
import { RoadmapPhase } from '../types';
import { CheckCircle2, Circle, Clock, Rocket, Smartphone, Users, Globe, Shield } from 'lucide-react';

const phases: RoadmapPhase[] = [
  {
    phase: 1,
    title: 'Déploiement Technique',
    status: 'completed',
    items: ['Création du Token', 'Contrat Proxy Upgradeable', 'Configuration IPFS', 'Setup PancakeSwap Pairs']
  },
  {
    phase: 2,
    title: 'Listing & Liquidité',
    status: 'in-progress',
    items: ['Ajout Liquidité (CDF/USDT)', 'Vérification BscScan', 'Listing CoinGecko/CMC', 'Marketing Initial']
  },
  {
    phase: 3,
    title: 'Expansion Communautaire',
    status: 'planned',
    items: ['Grand Airdrop National', 'Partenariats Influenceurs', 'Intégration Trust Wallet', 'Campagnes Média']
  },
  {
    phase: 4,
    title: 'Écosystème CDF',
    status: 'planned',
    items: ['Lancement Application Mobile', 'CDF Wallet (iOS/Android)', 'Staking & Farming', 'API Paiement']
  },
  {
    phase: 5,
    title: 'Adoption Réelle',
    status: 'planned',
    items: ['Partenariats Microfinance', 'Paiement Mobile Money', 'E-commerce Local', 'Éducation Crypto']
  },
  {
    phase: 6,
    title: 'Maturité & DAO',
    status: 'planned',
    items: ['Gouvernance Décentralisée', 'Burn Massif', 'Audit Tier-1', 'Expansion Internationale']
  }
];

const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-24 bg-slate-950 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-900/50 to-transparent hidden lg:block"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Feuille de Route</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 via-yellow-400 to-red-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Une stratégie claire et ambitieuse pour établir le Franc Congolais comme pilier de l'économie numérique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {phases.map((phase, index) => (
            <div 
              key={phase.phase} 
              className={`group relative flex flex-col p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-2 ${
                phase.status === 'in-progress' 
                  ? 'bg-slate-900/80 border-blue-500/50 shadow-[0_0_30px_rgba(37,99,235,0.15)]' 
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              {/* Phase Number Badge */}
              <div className={`absolute -top-4 left-8 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm z-20 transition-colors border ${
                 phase.status === 'completed' 
                 ? 'bg-green-900/20 border-green-500/30 text-green-400' 
                 : phase.status === 'in-progress' 
                 ? 'bg-blue-900/20 border-blue-500/30 text-blue-400'
                 : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}>
                Phase 0{phase.phase}
              </div>

              <div className="flex items-start justify-between mb-6 mt-2">
                <div className={`p-3 rounded-xl ${
                  phase.status === 'in-progress' ? 'bg-blue-600/20 text-blue-400' : 
                  phase.status === 'completed' ? 'bg-green-600/20 text-green-400' :
                  'bg-slate-800/50 text-slate-500'
                }`}>
                  {index === 0 && <Rocket className="w-6 h-6" />}
                  {index === 1 && <Globe className="w-6 h-6" />}
                  {index === 2 && <Users className="w-6 h-6" />}
                  {index === 3 && <Smartphone className="w-6 h-6" />}
                  {index === 4 && <Globe className="w-6 h-6" />}
                  {index === 5 && <Shield className="w-6 h-6" />}
                </div>

                <div className="flex items-center gap-2">
                  {phase.status === 'in-progress' && (
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                  )}
                  {phase.status === 'completed' && (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                  <span className={`text-xs font-bold uppercase ${
                    phase.status === 'in-progress' ? 'text-blue-400' : 
                    phase.status === 'completed' ? 'text-green-500' : 'text-slate-600'
                  }`}>
                    {phase.status === 'in-progress' ? 'En cours' : phase.status === 'completed' ? 'Terminé' : 'À venir'}
                  </span>
                </div>
              </div>
              
              <h3 className={`text-xl font-bold mb-6 ${
                phase.status === 'in-progress' ? 'text-white' : 
                phase.status === 'completed' ? 'text-slate-200 line-through decoration-slate-600 decoration-2' : 
                'text-slate-200'
              }`}>
                {phase.title}
              </h3>
              
              <div className="space-y-4 flex-grow">
                {phase.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 group/item">
                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                      phase.status === 'in-progress' ? 'bg-blue-500' : 
                      phase.status === 'completed' ? 'bg-green-500' :
                      'bg-slate-700 group-hover/item:bg-slate-500'
                    }`}></div>
                    <span className={`text-sm transition-colors leading-relaxed ${
                      phase.status === 'completed' ? 'text-slate-500' : 'text-slate-400 group-hover:text-slate-300'
                    }`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {phase.status === 'in-progress' && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none border border-blue-500/20"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
