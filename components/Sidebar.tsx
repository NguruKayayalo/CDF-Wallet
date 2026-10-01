import React from 'react';
import { MessageSquare, Eye, Image as ImageIcon, Sparkles } from 'lucide-react';
import { AppMode } from '../types';

interface SidebarProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentMode, setMode }) => {
  const navItems = [
    { mode: AppMode.Chat, icon: MessageSquare, label: 'Chat' },
    { mode: AppMode.Vision, icon: Eye, label: 'Vision' },
    { mode: AppMode.Imagine, icon: ImageIcon, label: 'Imagine' },
  ];

  return (
    <div className="w-20 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shrink-0">
          <Sparkles className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 hidden md:block">
          Nebula
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = currentMode === item.mode;
          return (
            <button
              key={item.mode}
              onClick={() => setMode(item.mode)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/10' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-100'}`} />
              <span className="font-medium hidden md:block">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="text-xs text-slate-500 text-center md:text-left px-2">
          <p className="hidden md:block">Powered by Gemini 2.5</p>
          <p className="md:hidden">v2.5</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;