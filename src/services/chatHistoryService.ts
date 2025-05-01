
import { v4 as uuidv4 } from 'uuid';
import { Message, ChatHistory } from '../types/chat';

export const loadChatHistory = (): ChatHistory[] => {
  const storedHistory = localStorage.getItem('chatHistory');
  return storedHistory ? JSON.parse(storedHistory) : [];
};

export const loadSpecificChat = (chatId: string): Message[] => {
  const storedHistory = localStorage.getItem('chatHistory');
  if (storedHistory) {
    const history = JSON.parse(storedHistory) as ChatHistory[];
    const currentChat = history.find(chat => chat.id === chatId);
    if (currentChat && currentChat.messages) {
      return currentChat.messages;
    }
  }
  return [];
};

export const saveChatHistory = (
  messages: Message[], 
  chatId: string | null, 
  existingHistory: ChatHistory[]
): ChatHistory[] => {
  if (messages.length === 0) return existingHistory;
  
  const currentChatId = chatId || uuidv4();
  const updatedHistory = [...existingHistory];
  
  const existingChatIndex = updatedHistory.findIndex(chat => chat.id === currentChatId);
  
  if (existingChatIndex >= 0) {
    updatedHistory[existingChatIndex].messages = messages;
  } else {
    updatedHistory.push({
      id: currentChatId,
      messages: messages,
      title: "New Chat"
    });
  }
  
  localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
  return updatedHistory;
};
