import { useState, useEffect, useCallback } from 'react';
import { Message, MessageType } from '../types/types';

// Define the return type for the hook
interface ChatSession {
  messages: Message[];
  isTyping: boolean;
  addMessage: (content: string, type: MessageType) => void;
  resetSession: () => void;
  sessionId: string;
  error: string | null;
}

// Generate a random session ID for the user
const generateSessionId = () => `session_${Math.random().toString(36).substring(2, 15)}`;

export default function useChatSession(): ChatSession {
  const [sessionId, setSessionId] = useState<string>(() => {
    const savedId = localStorage.getItem('chatSessionId');
    return savedId || generateSessionId();
  });
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your news assistant. Ask me about any recent news or topics you're interested in.",
      type: MessageType.BOT,
      timestamp: new Date().toISOString(),
    },
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch chat history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/history?session_id=${sessionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chat history');
        }
        const data = await response.json();
        const historyMessages = data.messages || [];
        if (historyMessages.length > 0) {
          setMessages(historyMessages);
        }
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to load chat history. Please try again.');
      }
    };

    fetchHistory();
    localStorage.setItem('chatSessionId', sessionId);
  }, [sessionId]);

  const addMessage = useCallback(async (content: string, type: MessageType) => {
    if (type !== MessageType.USER) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message: content }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        type: MessageType.BOT,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
      setMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id));
    } finally {
      setIsTyping(false);
    }
  }, [sessionId]);

  const resetSession = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset session');
      }

      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      setMessages([
        {
          id: '1',
          content: "Hello! I'm your news assistant. Ask me about any recent news or topics you're interested in.",
          type: MessageType.BOT,
          timestamp: new Date().toISOString(),
        },
      ]);
      setError(null);
    } catch (err) {
      console.error('Error resetting session:', err);
      setError('Failed to reset session. Please try again.');
    }
  }, [sessionId]);

  return {
    messages,
    isTyping,
    addMessage,
    resetSession,
    sessionId,
    error,
  };
}