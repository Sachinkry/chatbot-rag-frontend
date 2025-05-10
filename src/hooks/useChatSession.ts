import { useState, useEffect, useCallback } from 'react';
import { Message, MessageType } from '../types/types';
import { generateBotResponse } from '../utils/botResponses';

// Generate a random session ID for the user
const generateSessionId = () => `session_${Math.random().toString(36).substring(2, 15)}`;

export default function useChatSession() {
  const [sessionId, setSessionId] = useState<string>(() => {
    const savedId = localStorage.getItem('chatSessionId');
    return savedId || generateSessionId();
  });
  
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const savedMessages = localStorage.getItem(`messages_${sessionId}`);
      if (savedMessages) {
        return JSON.parse(savedMessages);
      }
    } catch (error) {
      console.error('Error parsing saved messages', error);
    }
    
    // Default welcome message
    return [
      {
        id: '1',
        content: "Hello! I'm your news assistant. Ask me about any recent news or topics you're interested in.",
        type: MessageType.BOT,
        timestamp: new Date().toISOString(),
      },
    ];
  });
  
  const [isTyping, setIsTyping] = useState(false);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(`messages_${sessionId}`, JSON.stringify(messages));
      localStorage.setItem('chatSessionId', sessionId);
    } catch (error) {
      console.error('Error saving messages', error);
    }
  }, [messages, sessionId]);

  const addMessage = useCallback((content: string, type: MessageType) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    
    // If user message, generate bot response
    if (type === MessageType.USER) {
      setIsTyping(true);
      
      // Simulate typing delay and response generation
      setTimeout(() => {
        generateBotResponse(content).then((response) => {
          const botMessage: Message = {
            id: Date.now().toString(),
            content: response,
            type: MessageType.BOT,
            timestamp: new Date().toISOString(),
          };
          
          setMessages((prev) => [...prev, botMessage]);
          setIsTyping(false);
        });
      }, 1500);
    }
  }, []);

  const resetSession = useCallback(() => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    
    // Clear previous session messages
    localStorage.removeItem(`messages_${sessionId}`);
    
    // Set initial welcome message
    setMessages([
      {
        id: '1',
        content: "Hello! I'm your news assistant. Ask me about any recent news or topics you're interested in.",
        type: MessageType.BOT,
        timestamp: new Date().toISOString(),
      },
    ]);
  }, [sessionId]);

  return {
    messages,
    isTyping,
    addMessage,
    resetSession,
    sessionId,
  };
}