
import React, { useState } from 'react';
import { Calculator, TrendingUp, PartyPopper, ArrowRight } from 'lucide-react';

const ProfitSimulation: React.FC = () => {
  const [investment, setInvestment] = useState<string>('10');
  const currentPrice = 0.0000047163;
  const targetPrice = 0.1;

  const calculateValues = () => {
    const investNum = parseFloat(investment) || 0;
    const tokens = investNum / currentPrice;
    const futureValue = tokens * targetPrice;
    const profit = futureValue - investNum;
    const multiplier = futureValue / (investNum || 1);

    return {
      tokens: tokens.toLocaleString('fr-FR', { maximumFractionDigits: 0 }),
      futureValue: futureValue.toLocaleString('fr-FR', { style: 'currency', currency: 'USD' }),
      profit: profit.toLocaleString('fr-FR', { style: 'currency', currency: 'USD' }),
      multiplier: Math.floor(multiplier).toLocaleString('fr-FR')
    };
  };

  const { tokens, futureValue, profit, multiplier } = calculateValues();

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-y border-slate-800 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-xs font-serif uppercase tracking-widest mb-4">
            <TrendingUp className="w-3 h-3" /> Vision du Futur
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
            Imaginez la Joie...
          </h2>
          <p className="text-slate-400 text-lg font-serif italic">
            "Acheter aujourd'hui à <span className="text-blue-400 font-mono">0.0000047163$</span> et revendre à <span className="text-yellow-400 font-bold">0.1$</span>."
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 md:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wide">
                  Votre Investissement Aujourd'hui (USD)
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={investment}
                    onChange={(e) => setInvestment(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 text-white text-2xl font-bold py-4 px-4 pl-10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors font-mono"
                    placeholder="10"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xl">$</span>
                </div>
              </div>

              <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                <p className="text-slate-400 text-sm mb-1">Vous obtenez :</p>
                <p className="text-2xl font-serif font-bold text-blue-400">{tokens} CDF</p>
              </div>
            </div>

            {/* Result Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-xl blur-sm -z-10"></div>
              <div className="bg-slate-900 border border-yellow-500/30 rounded-xl p-6 space-y-4 text-center md:text-left">
                
                <div className="flex items-center justify-between md:justify-start gap-4 mb-2">
                  <span className="text-slate-300 text-sm uppercase tracking-wider font-bold">Valeur Future (0.1$)</span>
                  <PartyPopper className="w-5 h-5 text-yellow-400 animate-bounce" />
                </div>
                
                <p className="text-4xl md:text-5xl font-bold text-white tracking-tight font-mono text-gradient-gold">
                  {futureValue}
                </p>
                
                <div className="h-px w-full bg-slate-800 my-4"></div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-slate-500 text-xs uppercase">Profit Net</p>
                    <p className="text-green-400 font-bold text-xl font-mono">{profit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-xs uppercase">Multiplicateur</p>
                    <p className="text-yellow-500 font-bold text-xl font-mono">x{multiplier}</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
          
          <div className="mt-8 text-center">
            <a href="#technical" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-serif italic text-sm">
              Ne laissez pas passer cette chance <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfitSimulation;
