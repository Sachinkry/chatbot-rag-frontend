import React from 'react';
import { Message, MessageType } from '../types/types';
import { formatMessageTime } from '../utils/dateUtils';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.type === MessageType.BOT;
  
  return (
    <div 
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-fadeIn`}
      style={{ animationDelay: '0.2s' }}
    >
      <div 
        className={`
          max-w-[80%] md:max-w-[70%] 
          rounded-xl p-4 
          ${isBot 
            ? 'bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700' 
            : 'bg-indigo-600 text-white rounded-tr-none'}
        `}
      >
        <div className="flex items-center mb-2 gap-2">
          <div className={`
            w-6 h-6 rounded-full flex items-center justify-center
            ${isBot ? 'bg-gray-700' : 'bg-indigo-500'}
          `}>
            {isBot ? <Bot size={12} /> : <User size={12} />}
          </div>
          <div className="text-sm font-medium">
            {isBot ? 'NewsChat AI' : 'You'}
          </div>
          <div className="text-xs opacity-70 ml-auto">
            {formatMessageTime(message.timestamp)}
          </div>
        </div>
        
        <div className="mt-1 leading-relaxed">
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;