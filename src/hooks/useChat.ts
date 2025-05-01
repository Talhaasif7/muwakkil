
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { useBookmarkStore } from '../services/bookmarkService';
import { Message, ActionLogStep } from '../types/chat';
import { analyzeUserIntent } from '../utils/chatUtils';
import { 
  loadChatHistory, 
  loadSpecificChat,
  saveChatHistory 
} from '../services/chatHistoryService';
import { simulateAIResponse } from '../services/messageResponseService';

// Change to export type for TypeScript with isolatedModules
export type { Message, ActionLogStep } from '../types/chat';

export const useChat = (chatId: string | null) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLogSteps, setActionLogSteps] = useState<ActionLogStep[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const { toast } = useToast();
  const { addBookmark, removeBookmark } = useBookmarkStore();
  
  // Load chat history on mount
  useEffect(() => {
    const history = loadChatHistory();
    setChatHistory(history);
    
    // If we have a chatId, try to load this specific chat
    if (chatId) {
      const currentChatMessages = loadSpecificChat(chatId);
      if (currentChatMessages.length > 0) {
        setMessages(currentChatMessages);
      }
    }
  }, [chatId]);
  
  // Save chat history when messages change
  useEffect(() => {
    const updatedHistory = saveChatHistory(messages, chatId, chatHistory);
    setChatHistory(updatedHistory);
  }, [messages]);

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    
    // Analyze user intent based on message history
    const userIntent = analyzeUserIntent(message, messages);
    
    simulateAIResponse(
      message,
      userIntent,
      messages,
      setActionLogSteps,
      setLoading,
      (aiResponse, finalLogs) => {
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
        setLoading(false);
        setActionLogSteps(finalLogs);
      }
    );
  };

  const handleFileUpload = (files: File[]) => {
    if (files.length === 0) return;
    
    const fileNames = files.map(file => file.name).join(", ");
    const fileCountText = files.length === 1 
      ? t('chat.uploadedFile') 
      : t('chat.uploadedFiles', { count: files.length });
    
    const newMessage: Message = {
      id: uuidv4(),
      content: `${fileCountText} ${fileNames}`,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    
    toast({
      title: t('chat.filesUploaded'),
      description: t('chat.filesUploadedDesc', { count: files.length }),
    });
  };

  const handleBookmark = (messageId: string) => {
    // Find the message with the given ID
    const messageToBookmark = messages.find(msg => msg.id === messageId);
    
    if (messageToBookmark) {
      // Format the date for display
      const formattedDate = new Date(messageToBookmark.timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      
      // Add the message to bookmarks
      addBookmark({
        id: messageToBookmark.id,
        title: currentChatTitle,
        date: formattedDate,
        content: messageToBookmark.content
      });
      
      toast({
        title: t('chat.bookmarked'),
        description: t('chat.bookmarkedDesc'),
      });
    }
  };

  const handleFeedback = (type: 'positive' | 'negative') => {
    toast({
      title: t('chat.feedbackReceived'),
      description: t('chat.feedbackReceivedDesc', { type }),
    });
  };

  // Compute the current chat title
  const currentChatTitle = chatId 
    ? "Eligibility check for DIFC's government grants" 
    : t('sidebar.newChat');

  return {
    messages,
    loading,
    handleSendMessage,
    handleFileUpload,
    handleBookmark,
    handleFeedback,
    actionLogSteps,
    chatTitle: currentChatTitle
  };
};

// Import ChatHistory for the effect
import { ChatHistory } from '../types/chat';
