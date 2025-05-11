import React from 'react';
import { Info, Newspaper } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

interface ChatHeaderProps {
  sessionId: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ sessionId }) => {
  return (
    <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <Newspaper size={20} className="text-white" />
        </div>
        <div>
        <div className="flex items-center space-x-2 relative group">
  <h1 className="font-semibold text-lg text-white">NewsChat AI</h1>
  <Info className="w-4 h-4 text-gray-400 cursor-pointer" />

  {/* Tooltip */}
  <div className="absolute top-6 left-0 z-50 hidden group-hover:block bg-black text-white text-xs rounded-lg p-2 w-[300px] shadow-lg">
    Try asking:
    <ul className="list-disc list-inside mt-1 space-y-1">
      <li>Pahalgam Attack</li>
      <li>What is Operation Sindoor?</li>
      <li>US & china trade deals</li>
      <li>Trump </li>
      <li>New Pope Leo & AI</li>
      <li>Why pope chose Leo XIV name?</li>
      <li>Bhool Chuk Maaf movie</li>
      <li>Drones amid India Pak escalation</li>
      <li>May 10 ceasefire violation?</li>
    </ul>
  </div>
</div>
          <p className="text-xs text-gray-400">News & information assistant</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-xs text-gray-500 hidden sm:block">
          Session: {sessionId.substring(0, 8)}...
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default ChatHeader;