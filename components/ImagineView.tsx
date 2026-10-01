import React, { useState } from 'react';
import { Download, Loader2, Wand2, AlertCircle, Sparkles } from 'lucide-react';
import { generateImage } from '../services/geminiService';

const ImagineView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const base64Img = await generateImage(prompt);
      setGeneratedImage(base64Img);
    } catch (err: any) {
      setError(err.message || "Failed to generate image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `nebula-generated-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-8 flex flex-col h-full gap-10 glass-panel rounded-3xl border border-white/5 shadow-2xl">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
          Générateur d'Images <span className="text-blue-500">IA</span>
        </h2>
        <div className="flex items-center justify-center gap-2 opacity-50">
          <Sparkles className="w-3 h-3 text-blue-400" />
          <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-400">Powered by Gemini Nano</p>
        </div>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder="Décrivez l'image que vous souhaitez créer..."
          className="flex-1 bg-white/5 text-slate-100 placeholder-slate-600 rounded-2xl px-6 py-4 border border-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all shadow-inner"
        />
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-serif font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-2xl transition-all flex items-center gap-3 whitespace-nowrap shadow-xl shadow-blue-600/20"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
          <span className="hidden sm:inline">Générer</span>
        </button>
      </div>

      <div className="flex-1 bg-slate-950/40 rounded-3xl border-2 border-dashed border-white/5 flex items-center justify-center relative overflow-hidden group min-h-[450px] shadow-inner backdrop-blur-sm">
        {isLoading && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl flex flex-col items-center justify-center z-20">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-6" />
            <p className="text-slate-300 font-serif italic animate-pulse">L'IA dessine votre vision...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center text-red-400 p-4 text-center">
            <AlertCircle className="w-12 h-12 mb-2 opacity-80" />
            <p>{error}</p>
          </div>
        )}

        {generatedImage ? (
          <div className="relative w-full h-full flex items-center justify-center p-4">
             {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img 
              src={generatedImage} 
              className="max-w-full max-h-full rounded-lg shadow-2xl shadow-purple-900/20"
              alt="Generated Output"
            />
            <button
              onClick={handleDownload}
              className="absolute bottom-6 right-6 bg-slate-900/90 text-white p-3 rounded-full hover:bg-purple-600 transition-colors shadow-lg border border-slate-700"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        ) : (
          !isLoading && !error && (
            <div className="text-center text-slate-600">
              <Wand2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>Enter a prompt to start creating</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ImagineView;