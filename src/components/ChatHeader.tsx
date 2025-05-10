import React from 'react';
import { Newspaper } from 'lucide-react';
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
          <h1 className="font-semibold text-lg text-white">NewsChat AI</h1>
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