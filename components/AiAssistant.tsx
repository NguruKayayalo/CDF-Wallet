
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Sparkles, ChevronRight } from 'lucide-react';
import { chatWithGemini } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Bonjour ! Je suis l\'assistant CDF. Je peux répondre à vos questions sur le prix, la roadmap ou comment acheter.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Casting motion.div to any to resolve TypeScript errors with current framer-motion types configuration
  const MotionDiv = motion.div as any;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg = text.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await chatWithGemini(userMsg, history);

    setMessages(prev => [...prev, { role: 'model', text: response || "Erreur de connexion." }]);
    setIsLoading(false);
  };

  const suggestions = [
    "💰 Prix actuel du CDF ?",
    "📈 Comment acheter ?",
    "🗺️ Voir la Roadmap",
    "🛡️ Le projet est-il sûr ?"
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all hover:scale-105 hover:rotate-12 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Bot className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[95vw] max-w-[420px] glass-panel rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col h-[600px] max-h-[85vh] border border-white/10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-6 flex justify-between items-center border-b border-white/5 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600/20 p-2.5 rounded-2xl border border-blue-500/20 text-blue-400">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="font-bold text-white text-base font-serif tracking-wide">Assistant CDF</h3>
                   <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                     <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Système Actif</span>
                   </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-all p-2 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none">
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-xl shadow-blue-600/10' 
                      : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/5 backdrop-blur-sm'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {/* Loading State */}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-3">
                    <div className="flex gap-1">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggestions */}
              {messages.length < 3 && !isLoading && (
                <div className="flex flex-col gap-3 mt-6">
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] ml-1">Questions fréquentes</p>
                   <div className="flex flex-wrap gap-2">
                      {suggestions.map((s, i) => (
                        <button 
                          key={i}
                          onClick={() => handleSend(s)}
                          className="text-xs glass-card text-slate-300 px-4 py-2.5 rounded-full hover:text-white flex items-center gap-2 group border-white/5"
                        >
                          {s}
                          <ChevronRight className="w-3 h-3 text-blue-500 group-hover:translate-x-1 transition-transform" />
                        </button>
                      ))}
                   </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-slate-950/80 backdrop-blur-xl border-t border-white/5">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Tapez un message..."
                  className="w-full bg-white/5 border border-white/10 text-white rounded-2xl pl-5 pr-14 py-4 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-600"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-all shadow-xl shadow-blue-600/20"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-1.5 opacity-30">
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Gemini Intelligence</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAssistant;
