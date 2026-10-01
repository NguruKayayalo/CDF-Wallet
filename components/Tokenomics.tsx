import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { Info, Shield, Zap, Flame, Users, Settings } from 'lucide-react';
import { DistributionItem } from '../types';

const data: DistributionItem[] = [
  { name: 'Liquidité Initiale', value: 40, color: '#2563eb', description: 'PancakeSwap & Exchanges' },
  { name: 'Développement', value: 20, color: '#4f46e5', description: 'Écosystème & Sécurité' },
  { name: 'Récompenses', value: 15, color: '#eab308', description: 'Communauté & Airdrops' },
  { name: 'Équipe', value: 10, color: '#10b981', description: 'Vested (Bloqué)' },
  { name: 'Réserve', value: 10, color: '#ef4444', description: 'Projets de la Nation' },
  { name: 'Burn', value: 5, color: '#f97316', description: 'Réduction Programmé' },
];

const Tokenomics: React.FC = () => {
  return (
    <section id="tokenomics" className="py-32 bg-slate-900/50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold tracking-widest uppercase"
          >
            Économie Circulaire
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white font-serif mb-6"
          >
            Structure des <span className="text-gradient-gold">Tokenomics</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto font-serif"
          >
            Une architecture financière robuste conçue pour la stabilité à long terme et la croissance de la valeur patrimoniale.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Chart Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[500px] w-full glass-panel rounded-3xl p-8 relative group"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={110}
                  outerRadius={160}
                  paddingAngle={8}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke="rgba(255,255,255,0.1)" 
                      strokeWidth={1}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    borderColor: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    color: '#f8fafc' 
                  }} 
                  itemStyle={{ color: '#f8fafc' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Info */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <span className="text-slate-500 text-[10px] uppercase tracking-widest block mb-1">Supply Totale</span>
              <span className="text-white text-3xl font-mono font-bold">1B</span>
              <span className="text-blue-500 text-xs block font-bold mt-1">Tokens CDF</span>
            </div>
          </motion.div>

          {/* Details & Features Section */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-950/40 p-8 rounded-3xl border border-white/5 backdrop-blur-md"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">Mécanisme de Taxe</h3>
                  <p className="text-slate-500 text-sm italic">Appliquée dynamiquement (2% - 5%)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <Settings className="w-4 h-4" />, label: 'Liquidité Auto', val: '40%', colorClass: 'text-blue-500' },
                  { icon: <Users className="w-4 h-4" />, label: 'Développement', val: '30%', colorClass: 'text-indigo-500' },
                  { icon: <Zap className="w-4 h-4" />, label: 'Écosystème', val: '20%', colorClass: 'text-yellow-500' },
                  { icon: <Flame className="w-4 h-4" />, label: 'Burn Auto', val: '10%', colorClass: 'text-orange-500' },
                ].map((tax, i) => (
                  <div key={i} className="p-4 bg-slate-900/50 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                       <span className={tax.colorClass}>{tax.icon}</span>
                       <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">{tax.label}</span>
                    </div>
                    <p className="text-2xl font-mono font-bold text-white">{tax.val}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 glass-card rounded-3xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-green-500" />
                  <h4 className="text-lg font-serif font-bold text-white">Garantie de Sécurité</h4>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Pas de "minting" caché. Le contrat est renoncé et les jetons d'équipe sont soumis à un calendrier de libération stricte via un "Smart-Lock" auditable en temps réel.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
