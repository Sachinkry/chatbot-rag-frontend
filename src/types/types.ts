export enum MessageType {
  USER = 'user',
  BOT = 'bot',
}

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: string;
}