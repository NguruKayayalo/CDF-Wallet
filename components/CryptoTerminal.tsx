
import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Shield, Wifi, Cpu } from 'lucide-react';

const CryptoTerminal: React.FC = () => {
  const [lines, setLines] = useState<Array<{ text: string; color: string; id: number }>>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const logs = [
    { text: "> Initialisation du protocole Franc Congolais (CDF)...", color: "text-slate-300" },
    { text: "> Chargement des modules de sécurité...", color: "text-blue-400" },
    { text: "> Connexion au Binance Smart Chain (Mainnet)...", color: "text-yellow-400" },
    { text: "[SUCCESS] Nœud BSC connecté (Ping: 24ms)", color: "text-green-400" },
    { text: "> Vérification du contrat Proxy 0x18e...777", color: "text-slate-300" },
    { text: "[INFO] Architecture: OpenZeppelin Upgradeable", color: "text-blue-300" },
    { text: "[INFO] Admin: Sécurisé (Multi-sig compatible)", color: "text-blue-300" },
    { text: "> Scan des vulnérabilités (Reentrancy, Overflow)...", color: "text-yellow-400" },
    { text: "[SECURE] Aucune faille critique détectée.", color: "text-green-400" },
    { text: "> Synchronisation de la Tokenomics...", color: "text-slate-300" },
    { text: ">> Supply Totale: 1,000,000,000 CDF", color: "text-purple-400" },
    { text: ">> Taxe Dynamique: Active (2-5%)", color: "text-purple-400" },
    { text: ">> URL Officielle: https://franccongolais.github.io/fc.github.io/", color: "text-blue-400" },
    { text: "> Système prêt. En attente d'instructions...", color: "text-white font-bold" },
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < logs.length) {
        setLines((prev) => [...prev, { ...logs[currentIndex], id: Date.now() + currentIndex }]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 600); // Vitesse de défilement des lignes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="w-full bg-[#0c0c0c] rounded-xl border border-slate-800 overflow-hidden shadow-2xl font-mono text-sm">
      {/* Terminal Header */}
      <div className="bg-slate-900/80 px-4 py-2 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="ml-3 text-xs text-slate-400 font-bold flex items-center gap-2">
            <TerminalIcon className="w-3 h-3" /> fc_node_status.exe
          </span>
        </div>
        <div className="flex gap-3 text-xs text-slate-500">
           <span className="flex items-center gap-1"><Wifi className="w-3 h-3 text-green-500" /> Online</span>
           <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-blue-500" /> 2.4GHz</span>
           <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-yellow-500" /> Secure</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="h-[300px] p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent space-y-2"
      >
        {lines.map((line) => (
          <div key={line.id} className={`${line.color} break-words`}>
            <span className="opacity-50 mr-2">
              {new Date().toLocaleTimeString('fr-FR', { hour12: false })}:
            </span>
            {line.text}
          </div>
        ))}
        <div className="flex items-center gap-2 text-green-500 animate-pulse">
          <span>root@franc-congolais:~$</span>
          <span className="w-2 h-4 bg-green-500 block"></span>
        </div>
      </div>
    </div>
  );
};

export default CryptoTerminal;
