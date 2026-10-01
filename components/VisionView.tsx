import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { analyzeImage } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const VisionView: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setResult('');
    setPrompt('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!selectedImage || isLoading) return;

    setIsLoading(true);
    setResult('');
    try {
      const text = await analyzeImage(selectedImage, prompt);
      setResult(text || "No analysis returned.");
    } catch (error) {
      setResult("Error analyzing image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full p-8 h-full overflow-y-auto glass-panel rounded-3xl border border-white/5 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-full">
        {/* Input Section */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-950/40 rounded-3xl border-2 border-dashed border-white/5 hover:border-blue-500/30 transition-all p-6 flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden group backdrop-blur-sm">
            {selectedImage ? (
              <>
                <img 
                  src={selectedImage} 
                  alt="Preview" 
                  className="w-full h-full object-contain rounded-2xl z-10 shadow-2xl" 
                />
                <button 
                  onClick={handleClear}
                  className="absolute top-4 right-4 bg-red-600 p-2.5 rounded-xl text-white hover:bg-red-500 transition-all z-20 shadow-xl"
                >
                  <X size={20} />
                </button>
              </>
            ) : (
              <div 
                className="text-center cursor-pointer w-full h-full flex flex-col items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-500 border border-blue-500/20">
                  <Upload className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">Analyser un média</h3>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-[0.2em]">JPG, PNG, WebP supportés</p>
              </div>
            )}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="hidden" 
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Directive Optionnelle</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Que souhaitez-vous savoir sur cette image ?"
              className="w-full bg-white/5 text-slate-100 rounded-2xl px-6 py-4 border border-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all h-32 resize-none shadow-inner"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!selectedImage || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-serif font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-2xl shadow-blue-600/20 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Analyse en cours...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                Lancer l'Analyse
              </>
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-white/5 rounded-3xl border border-white/5 p-8 overflow-y-auto min-h-[350px] backdrop-blur-md shadow-2xl">
          {result ? (
            <div className="prose prose-invert max-w-none prose-blue">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                 <div className="bg-blue-600/20 p-2 rounded-lg">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                 </div>
                 <h3 className="text-xl font-serif font-bold text-white m-0">Rapport d'Analyse</h3>
              </div>
              <div className="text-slate-200 leading-relaxed">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-40">
              <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
              <p className="font-serif italic text-center">En attente d'un média pour analyse...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisionView;