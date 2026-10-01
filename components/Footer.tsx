
import React from 'react';
import { Twitter, Mail, MessageCircle, ExternalLink, Coins, Github, Send, LineChart, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">Franc Congolais (CDF)</h3>
            <p className="text-slate-400 max-w-sm mb-6">
              La première cryptomonnaie symbolisant la valeur nationale, la stabilité économique et la transformation numérique en RDC.
            </p>
            <div className="flex space-x-4">
              <a href="https://franccongolais.github.io/fc.github.io/" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-lg hover:bg-blue-500 hover:text-white text-slate-400 transition-colors" title="Site Officiel (GitHub Pages)">
                <Globe className="w-5 h-5" />
              </a>
              <a href="https://t.me/+UZUNcqtBESgxM2Zk" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-lg hover:bg-blue-400 hover:text-white text-slate-400 transition-colors">
                <Send className="w-5 h-5" />
              </a>
              <a href="https://x.com/franc_Congo_" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-lg hover:bg-blue-600 hover:text-white text-slate-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://chat.whatsapp.com/BF4PnVTYJp1Lpnzm9IatSq" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-lg hover:bg-green-500 hover:text-white text-slate-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://github.com/FrancCongolais/fc.github.io" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-lg hover:bg-slate-700 hover:text-white text-slate-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:franc.congolais.fc@gmail.com" className="p-2 bg-slate-900 rounded-lg hover:bg-red-500 hover:text-white text-slate-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-slate-400 hover:text-blue-400 transition-colors">Accueil</a></li>
              <li><a href="#about" className="text-slate-400 hover:text-blue-400 transition-colors">À Propos</a></li>
              <li><a href="#tokenomics" className="text-slate-400 hover:text-blue-400 transition-colors">Tokenomics</a></li>
              <li><a href="#governance" className="text-slate-400 hover:text-blue-400 transition-colors">Gouvernance DAO</a></li>
              <li><a href="#roadmap" className="text-slate-400 hover:text-blue-400 transition-colors">Roadmap</a></li>
              <li><a href="#media" className="text-slate-400 hover:text-blue-400 transition-colors">Médiathèque</a></li>
              <li><a href="#whitepaper" className="text-slate-400 hover:text-blue-400 transition-colors">Livre Blanc</a></li>
              <li><a href="#technical" className="text-slate-400 hover:text-blue-400 transition-colors">Spécifications</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 font-serif">Scanner</h4>
            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl w-fit backdrop-blur-xl group hover:border-blue-500/50 transition-all duration-500">
               <img 
                 src="/img/qr-code.png" 
                 alt="QR Code Officiel" 
                 className="w-24 h-24 object-contain rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
               />
               <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mt-2 text-center opacity-60">Accès Rapide</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} Franc Congolais. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <span className="text-slate-600 text-sm">Justice</span>
             <span className="text-slate-600 text-sm">•</span>
             <span className="text-slate-600 text-sm">Paix</span>
             <span className="text-slate-600 text-sm">•</span>
             <span className="text-slate-600 text-sm">Travail</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
