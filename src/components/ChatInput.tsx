import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isTyping }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = () => {
    if (message.trim() && !isTyping) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <div className="relative">
      <textarea
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isTyping ? "Wait for AI to respond..." : "Ask about news topics..."}
        disabled={isTyping}
        className={`
          w-full px-4 py-3 pr-12
          bg-gray-700 text-gray-100 placeholder-gray-500
          rounded-md resize-none
          border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
          transition-all duration-200
          ${isTyping ? 'opacity-70 cursor-not-allowed' : 'opacity-100'}
        `}
        style={{ minHeight: '48px', maxHeight: '120px' }}
      />
      
      <button
        onClick={handleSendMessage}
        disabled={!message.trim() || isTyping}
        className={`
          absolute right-3 bottom-3
          w-8 h-8 rounded-full
          flex items-center justify-center
          transition-colors duration-200
          ${
            !message.trim() || isTyping
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-500'
          }
        `}
      >
        <Send size={16} />
      </button>
    </div>
  );
};

export default ChatInput;