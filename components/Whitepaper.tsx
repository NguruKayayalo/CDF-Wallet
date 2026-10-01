import React, { useState } from 'react';
import { FileText, Download, ArrowRight, ShieldCheck, Cpu, Lock, X, BookOpen, CheckCircle, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Whitepaper: React.FC = () => {
  const [showReader, setShowReader] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      title: "1. Résumé Exécutif & Vision Nationale",
      content: `Le Franc Congolais (CDF) est une initiative blockchain souveraine reposant sur le réseau Binance Smart Chain (BEP-20). 
Son objectif fondamental est d'établir un pont solide entre l'économie réelle de la République Démocratique du Congo (RDC) et l'écosystème financier mondial décentralisé (DeFi).
Avec une devise nationale physique sujette à la volatilité et une population largement non-bancarisée mais très connectée au téléphone mobile, le Franc Congolais CDF apporte une solution concrète d'inclusion financière, de transparence et d'accès aux paiements numériques sans frontières.
Objectif stratégique majeur : consolidation d'une parité cible de 1 CDF ≥ 0.1 USDT.`
    },
    {
      title: "2. Architecture Blockchain & Smart Contracts",
      content: `• Réseau : Binance Smart Chain (BSC - BEP-20)
• Standard : BEP-20 avec modèle Proxy Upgradeable OpenZeppelin
• Adresse officielle du contrat : 0x18e173fdeb700568a08d1d7049309ae322d27777
• Approvisionnement Total : 1,000,000,000 CDF (1 Milliard de jetons fixes, aucun mint caché)
• Sécurité : Protection contre les attaques de réentrance, dépassement d'entiers (SafeMath natif Solidity 0.8+) et compatibilité multi-signature pour l'administration.`
    },
    {
      title: "3. Tokenomics & Redistribution Dynamique",
      content: `La politique économique du Franc Congolais est conçue pour récompenser les détenteurs et alimenter durablement les projets de développement :
• 40% Liquidité Initiale (PancakeSwap & DEX)
• 20% Développement de l'Écosystème & Audits de Sécurité
• 15% Récompenses Communautaires & Airdrops nationaux
• 10% Équipe (Verrouillage avec calendrier d'acquisition / Vesting)
• 10% Réserve pour Projets Nationaux & Microfinance
• 5% Déflation (Brûlages programmés périodiques)
Taxe dynamique sur transactions (2-5%) réinvestie : 40% Liquidité, 30% Développement, 20% Écosystème, 10% Burn.`
    },
    {
      title: "4. Gouvernance Citoyenne (CDF DAO)",
      content: `La gouvernance décentralisée permet à chaque détenteur de jetons CDF de voter sur les propositions d'allocation des fonds de réserve :
• 1 CDF possédé = 1 droit de vote au sein du DAO
• Seuil de validation par super-majorité à 66.7%
• Priorités de financement : micro-crédits pour les femmes entrepreneures de Kinshasa, bourses technologiques pour étudiants au Kivu, et plateformes agro-tech dans les provinces.`
    }
  ];

  const handleDownload = () => {
    const content = `=====================================================
LIVRE BLANC OFFICIEL - FRANC CONGOLAIS (CDF)
Symbole : CDF | Réseau : Binance Smart Chain (BEP-20)
Adresse Contrat : 0x18e173fdeb700568a08d1d7049309ae322d27777
Devise : Justice - Paix - Travail
Site Officiel : https://franccongolais.github.io/fc.github.io/
=====================================================

${chapters.map(ch => `${ch.title}\n\n${ch.content}\n\n`).join('-----------------------------------------------------\n\n')}

Copyright (c) ${new Date().getFullYear()} Franc Congolais. Tous droits réservés.`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Livre-Blanc-Franc-Congolais-CDF.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="whitepaper" className="py-24 relative bg-slate-900 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-800 to-transparent opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl border border-slate-700 p-8 md:p-16 shadow-2xl flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-white/80 text-xs font-serif uppercase tracking-widest">
              <FileText className="w-3 h-3" /> Documentation Technique
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              Livre Blanc Officiel <br/>
              <span className="text-blue-400 text-3xl md:text-4xl">Version 2.0 (Mise à jour)</span>
            </h2>
            
            <p className="text-slate-300 text-lg leading-relaxed max-w-xl font-serif">
              Plongez dans les détails techniques, économiques et stratégiques du Franc Congolais. Découvrez comment nous utilisons la Binance Smart Chain pour sécuriser l'avenir financier de la RDC.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleDownload}
                className="px-8 py-4 bg-white text-slate-900 hover:bg-blue-50 font-bold rounded-xl shadow-lg flex items-center gap-3 transition-all hover:-translate-y-1 group font-serif uppercase tracking-wider text-xs"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform text-blue-600" />
                Télécharger le Livre Blanc
              </button>
              <button 
                onClick={() => setShowReader(true)}
                className="px-8 py-4 bg-transparent border border-slate-500 text-white hover:bg-white/10 font-bold rounded-xl flex items-center gap-3 transition-all font-serif uppercase tracking-wider text-xs"
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                Lire en ligne <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="relative bg-slate-800 rounded-2xl p-8 border border-slate-600 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-3 -left-3 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-slate-900 font-bold shadow-lg z-20">
                CDF
              </div>
              
              <div className="space-y-6">
                <div className="h-2 w-20 bg-blue-500 rounded mb-8"></div>
                <h3 className="text-2xl font-serif font-bold text-white">Table des Matières</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-300">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    <span>Architecture & Sécurité BSC</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <Cpu className="w-5 h-5 text-blue-400" />
                    <span>Smart Contract Upgradeable</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <Lock className="w-5 h-5 text-blue-400" />
                    <span>Mécanisme Anti-Inflation & DAO</span>
                  </li>
                </ul>
                <div className="pt-6 mt-6 border-t border-slate-700 flex justify-between items-center text-xs text-slate-500 font-mono">
                  <span>SHA-256: 7a9c...2f1b</span>
                  <span>4 Chapitres Clés</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {showReader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-serif font-bold text-lg">Livre Blanc Officiel</h3>
                    <p className="text-xs text-slate-400 font-mono">Franc Congolais (CDF) • BEP-20</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReader(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Chapters Nav */}
              <div className="flex overflow-x-auto border-b border-slate-800 p-2 gap-2 bg-slate-950/30 scrollbar-none">
                {chapters.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveChapter(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all ${
                      activeChapter === idx
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Chapitre {idx + 1}
                  </button>
                ))}
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto flex-1 space-y-6 text-slate-300 font-serif leading-relaxed">
                <h4 className="text-xl font-bold text-white font-serif border-b border-slate-800 pb-3">
                  {chapters[activeChapter].title}
                </h4>
                <div className="whitespace-pre-line text-sm md:text-base text-slate-300">
                  {chapters[activeChapter].content}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-800 bg-slate-950/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-green-400 font-mono">
                  <CheckCircle className="w-4 h-4" />
                  Smart Contract Vérifié sur BscScan
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Télécharger
                  </button>
                  <button
                    onClick={() => setShowReader(false)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Whitepaper;