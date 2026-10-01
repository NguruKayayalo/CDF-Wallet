
import React, { useState } from 'react';
import { Copy, Check, Terminal, ExternalLink, Coins, Wallet, LineChart, Globe, Github, QrCode } from 'lucide-react';
import CryptoTerminal from './CryptoTerminal';

const Technical: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const tokenAddress = "0x18e173fdeb700568a08d1d7049309ae322d27777"; 

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="technical" className="py-20 bg-slate-950 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Terminal & Intro */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Spécifications Techniques</h2>
              <p className="text-slate-400 mb-6">
                Le Franc Congolais (CDF) repose sur une infrastructure robuste et transparente. Surveillez l'état du réseau en temps réel via notre terminal dédié.
              </p>
            </div>

            {/* The New Terminal Component */}
            <CryptoTerminal />

            <div className="grid grid-cols-2 gap-4 mt-6">
               <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-500 font-mono">BEP-20</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Standard</div>
               </div>
               <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-500 font-mono">BSC</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Network</div>
               </div>
            </div>
          </div>

          {/* Right Column: Links & Contract Address */}
          <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 shadow-2xl h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
              <Terminal className="w-5 h-5 text-blue-500" />
              <span className="text-slate-300 font-mono text-sm">Contract Details</span>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Token Address
                </label>
                <div className="group relative flex items-center bg-slate-950 rounded-lg p-3 border border-slate-800 hover:border-blue-500 transition-colors">
                  <code className="text-sm text-blue-400 font-mono truncate flex-1">
                    {tokenAddress}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(tokenAddress)}
                    className="ml-2 p-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copier"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => setShowQr(!showQr)}
                    className={`ml-1 p-2 rounded-md transition-colors ${showQr ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                    title="Afficher QR Code"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>

                {/* QR Code Display */}
                {showQr && (
                  <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center animate-fade-in shadow-2xl backdrop-blur-xl">
                    <img 
                      src="/img/qr-code.png" 
                      alt="Franc Congolais QR Code" 
                      className="w-40 h-40 object-contain rounded-xl shadow-lg border border-white/5"
                    />
                    <p className="text-white text-xs font-black mt-4 text-center uppercase tracking-[0.2em] opacity-80">Scanner pour accéder</p>
                  </div>
                )}
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <a 
                  href="https://franccongolais.github.io/fc.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-medium border border-blue-400/40 transition-colors text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-950/40"
                >
                  <Globe className="w-4 h-4 text-blue-300" /> Site Officiel GitHub Pages
                </a>

                <a 
                  href={`https://four.meme/token/${tokenAddress}?code=SZDG2N7YXATJ`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium border border-blue-500 transition-colors text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                >
                  <Coins className="w-4 h-4" /> Acheter sur Four.meme
                </a>

                <a 
                  href={`https://dex.coinmarketcap.com/fr/token/bsc/${tokenAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium border border-indigo-500 transition-colors text-center flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20"
                >
                  <LineChart className="w-4 h-4" /> Suivre sur CoinMarketCap
                </a>

                <a 
                  href="https://www.kucoin.com/fr/web3/swap?inputCurrency=2&outputCurrency=6898177"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#24ae8f] hover:bg-[#1e9278] text-white rounded-lg font-medium transition-colors text-center flex items-center justify-center gap-2 shadow-lg shadow-teal-900/20"
                >
                  <Globe className="w-4 h-4" /> KuCoin Web3
                </a>
                
                <a 
                  href="https://github.com/FrancCongolais/fc.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium border border-slate-600 transition-colors text-center flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
                >
                  <Github className="w-4 h-4" /> Code Source (GitHub)
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a 
                    href={`https://bscscan.com/token/${tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium border border-slate-700 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> BscScan
                  </a>
                  <a 
                    href={`https://web3.binance.com/fr/token/bsc/${tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 bg-[#F0B90B] hover:bg-[#d4a40a] text-black rounded-lg font-medium transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <Wallet className="w-4 h-4" /> Binance Web3
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Technical;
