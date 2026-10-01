
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Play, Sparkles, Loader2, Download, AlertCircle, ShieldCheck, Key } from 'lucide-react';

const MarketingVideo: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'checking_key' | 'generating' | 'completed' | 'error'>('idle');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loadingMessages = [
    "Initialisation du moteur de rendu Veo...",
    "Synchronisation avec la Binance Smart Chain...",
    "Génération des textures Azure et Or...",
    "Calcul de la topographie numérique de la RDC...",
    "Gravure du slogan Justice - Paix - Travail...",
    "Finalisation de la vision souveraine..."
  ];

  useEffect(() => {
    let interval: number;
    if (status === 'generating') {
      let i = 0;
      interval = window.setInterval(() => {
        setLoadingMessage(loadingMessages[i % loadingMessages.length]);
        i++;
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleGenerateVideo = async () => {
    try {
      setStatus('checking_key');
      
      // Check for API Key selection (Mandatory for Veo)
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
        // Proceed after dialog (assuming success per instructions)
      }

      setStatus('generating');
      setLoadingMessage(loadingMessages[0]);

      // Initialize AI right before call to use latest key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = "Cinematic 3D animation of a glowing digital map of the Democratic Republic of Congo. Golden particles forming the symbol 'FC' in the center. Futuristic blockchain nodes connecting major cities. Professional financial ticker at the bottom with the text 'Franc Congolais: L'Avenir Numérique'. Colors: Azure Blue and Bright Gold. Justice, Paix, Travail text appearing in elegant serif font.";

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // Polling
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setStatus('completed');
      } else {
        throw new Error("Le lien de téléchargement n'a pas été généré.");
      }

    } catch (error: any) {
      console.error("Video Generation Error:", error);
      if (error.message?.includes("Requested entity was not found")) {
        setErrorMessage("Erreur de clé API. Veuillez resélectionner une clé valide liée à un projet avec facturation activée.");
      } else {
        setErrorMessage("Une erreur est survenue lors de la création de la vidéo. Veuillez réessayer.");
      }
      setStatus('error');
    }
  };

  return (
    <section id="marketing-video" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px]"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-serif uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" /> IA Cinématique
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Générateur de Contenu Marketing
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-serif italic">
            "Créez instantanément une vidéo promotionnelle professionnelle pour propager la vision du Franc Congolais."
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          {status === 'idle' || status === 'error' ? (
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30 animate-pulse">
                <Play className="w-10 h-10 text-blue-500 ml-1" />
              </div>
              
              <div className="max-w-md space-y-4">
                <h3 className="text-2xl font-serif font-bold text-white">Prêt pour la production ?</h3>
                <p className="text-slate-400 text-sm">
                  L'IA va générer un clip de 5 secondes optimisé pour vos réseaux sociaux. 
                  <br />
                  <span className="text-xs text-slate-500 italic mt-2 block">
                    Note : Cette fonctionnalité nécessite une clé API Google Cloud avec facturation activée.
                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-blue-500 ml-1 underline">Documentation Facturation</a>
                  </span>
                </p>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {errorMessage}
                </div>
              )}

              <button
                onClick={handleGenerateVideo}
                className="group px-10 py-5 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-serif font-bold uppercase tracking-widest rounded-sm transition-all shadow-xl hover:shadow-blue-900/40 flex items-center gap-4"
              >
                Générer mon clip Marketing
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          ) : status === 'generating' || status === 'checking_key' ? (
            <div className="flex flex-col items-center py-16 space-y-8">
              <div className="relative">
                <div className="w-32 h-32 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-pulse" />
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-xl font-serif font-bold text-white animate-pulse">{loadingMessage}</p>
                <p className="text-slate-500 text-sm">Cela peut prendre jusqu'à 2 minutes. Ne fermez pas cette page.</p>
              </div>

              <div className="w-full max-w-xs h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-[loading-bar_120s_ease-in-out_infinite]"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-700">
                <video 
                  src={videoUrl || ''} 
                  controls 
                  autoPlay 
                  loop 
                  className="w-full h-full object-contain"
                />
              </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={videoUrl || ''} 
                  download="FC-Marketing-Clip.mp4"
                  className="px-8 py-4 bg-white text-slate-950 font-black font-serif uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-all rounded-2xl shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Télécharger le MP4
                </a>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black font-serif uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white/10 transition-all backdrop-blur-md"
                >
                  Générer une autre version
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] font-serif">
                <ShieldCheck className="w-4 h-4" />
                Généré avec succès par Veo 3.1 AI
              </div>
            </div>
          )}
        </div>

        <div className="mt-24 space-y-12">
          <div className="text-center">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Concepts Marketing Recommandés</h3>
            <p className="text-slate-500 font-serif italic text-sm">Inspirez-vous de ces thèmes pour vos prochaines créations IA.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "L'Aube Numérique", desc: "Un lever de soleil sur le fleuve Congo avec des particules data dorées.", icon: "🌅" },
              { title: "Souveraineté 2026", desc: "Gros plan sur une pièce CDF physique se transformant en flux de code blockchain.", icon: "🛡️" },
              { title: "Justice & Progrès", desc: "La balance de la justice s'équilibrant grâce à la transparence de la BSC.", icon: "⚖️" },
              { title: "Nexus Kinshasa", desc: "Vue aérienne futuriste de Kinshasa avec des hologrammes de transactions CDF.", icon: "📡" },
              { title: "L'Étoile du Congo", desc: "Le drapeau congolais pulsant avec une énergie bleue néon vers le futur.", icon: "🇨🇬" },
              { title: "Alliance Globale", desc: "Des mains connectées à travers le monde par des fils d'or BSC.", icon: "🤝" }
            ].map((concept, i) => (
              <div key={i} className="p-8 glass-card rounded-3xl border border-white/5 group hover:border-blue-500/30 transition-all flex flex-col items-center text-center">
                <div className="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-500">{concept.icon}</div>
                <h4 className="text-lg font-serif font-black text-white mb-2 uppercase tracking-widest">{concept.title}</h4>
                <p className="text-slate-500 text-[10px] font-serif italic leading-relaxed">{concept.desc}</p>
                <div className="mt-4 p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[8px] text-blue-400 font-mono">Prompt IA recommandé disponible</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 bg-blue-600/10 border border-blue-500/20 rounded-[2rem] p-8 md:p-12 text-center">
          <h4 className="text-xl font-serif font-bold text-white mb-4 italic">Conseil d'Expert Marketing</h4>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm font-serif leading-relaxed">
            "Pour une vidéo virale, utilisez des prompts qui mélangent le **patrimoine culturel congolais** avec des **éléments cybernétiques**. L'union du passé et du futur crée l'émotion nécessaire à l'adoption massive."
          </p>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/5 pt-12">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              Souveraineté
            </h4>
            <p className="text-slate-400 text-sm">Des visuels qui incarnent l'indépendance financière de la nation.</p>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Qualité 720p
            </h4>
            <p className="text-slate-400 text-sm">Résolution optimisée pour le partage rapide sur WhatsApp et TikTok.</p>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <Key className="w-4 h-4 text-green-500" />
              Sur Mesure
            </h4>
            <p className="text-slate-400 text-sm">Chaque vidéo est unique, générée selon les principes du projet CDF.</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default MarketingVideo;
