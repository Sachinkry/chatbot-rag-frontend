import React, { useRef, useEffect } from 'react';
import useChatSession from '../hooks/useChatSession';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import { MessageType } from '../types/types';
import { RotateCcw } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const { messages, isTyping, addMessage, resetSession, sessionId } = useChatSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message: string) => {
    if (message.trim() === '') return;
    addMessage(message, MessageType.USER);
  };

  return (
    <div className="w-full max-w-3xl h-[90vh] bg-gray-900 rounded-xl overflow-hidden shadow-2xl flex flex-col border border-gray-800">
      <ChatHeader sessionId={sessionId} />
      
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-400 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs">AI</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-gray-800 border-t border-gray-700 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <button 
            onClick={resetSession}
            className="flex items-center space-x-1 text-xs text-gray-400 hover:text-teal-400 transition-colors duration-200"
          >
            <RotateCcw size={12} />
            <span>Reset Session</span>
          </button>
          <div className="text-xs text-gray-500">
            {isTyping ? 'AI is typing...' : 'Ask me about news topics'}
          </div>
        </div>
        
        <ChatInput onSendMessage={handleSendMessage} isTyping={isTyping} />
      </div>
    </div>
  );
};

export default ChatInterface;