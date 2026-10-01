import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ChatMessage, MessageRole } from '../types';
import { sendMessageStream } from '../services/geminiService';
import { GenerateContentResponse } from '@google/genai';

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.User,
      text: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Placeholder for AI response
    const aiMsgId = (Date.now() + 1).toString();
    const aiMsgPlaceholder: ChatMessage = {
      id: aiMsgId,
      role: MessageRole.Model,
      text: '',
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, aiMsgPlaceholder]);

    try {
      const stream = await sendMessageStream(userMsg.text);
      let fullText = '';
      
      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        const text = c.text || '';
        fullText += text;
        
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === aiMsgId ? { ...msg, text: fullText } : msg
          )
        );
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === aiMsgId ? { ...msg, text: "Sorry, I encountered an error.", isError: true } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/5">
      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-40">
            <div className="bg-slate-900/50 p-6 rounded-full border border-white/5 mb-8 animate-subtle-pulse">
              <Bot className="w-16 h-16 text-blue-500" />
            </div>
            <p className="font-serif italic text-lg">Comment puis-je vous aider aujourd'hui ?</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id}
            className={`flex gap-5 ${msg.role === MessageRole.User ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-lg
              ${msg.role === MessageRole.User ? 'bg-blue-600' : 'bg-slate-900'}`}>
              {msg.role === MessageRole.User ? <User size={20} className="text-white" /> : <Bot size={20} className="text-blue-400" />}
            </div>
            
            <div className={`flex flex-col max-w-[85%] ${msg.role === MessageRole.User ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl px-6 py-4 text-sm leading-relaxed shadow-xl backdrop-blur-md
                ${msg.role === MessageRole.User 
                  ? 'bg-blue-600 text-white rounded-tr-sm shadow-blue-600/10' 
                  : 'bg-white/5 text-slate-100 rounded-tl-sm border border-white/5'
                } ${msg.isError ? 'bg-red-900/20 border-red-800 text-red-200' : ''}`}
              >
                {msg.role === MessageRole.Model ? (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
              <span className="text-[10px] text-slate-500 mt-2 px-2 font-bold uppercase tracking-widest opacity-60">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-slate-950/80 border-t border-white/5 backdrop-blur-2xl">
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Écrivez votre message..."
            className="w-full bg-white/5 text-slate-100 placeholder-slate-600 rounded-2xl px-5 py-4 pr-16 
                     focus:outline-none focus:ring-4 focus:ring-blue-500/10 border border-white/10 focus:border-blue-500/50 transition-all resize-none h-[64px] scrollbar-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-3 p-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 
                     text-white rounded-xl transition-all shadow-xl shadow-blue-600/20 disabled:shadow-none"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;