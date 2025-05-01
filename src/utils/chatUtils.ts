
import { Message, KnowledgeItem } from '../types/chat';

// Get knowledge items from localStorage
export const getKnowledgeItems = (): KnowledgeItem[] => {
  const storedItems = localStorage.getItem('knowledgeItems');
  return storedItems ? JSON.parse(storedItems) : [];
};

// Analyze user's intent based on previous messages
export const analyzeUserIntent = (newMessage: string, messages: Message[]): string => {
  const userMessages = messages
    .filter(msg => msg.sender === 'user')
    .map(msg => msg.content);
  
  // Add the new message to analyze the full context
  userMessages.push(newMessage);
  
  // Logic to determine user intent based on message history
  let intent = "general";
  
  // Check for follow-up questions
  if (messages.length > 0 && userMessages.length > 1) {
    const prevMessage = userMessages[userMessages.length - 2].toLowerCase();
    const currentMessage = newMessage.toLowerCase();
    
    // Check if user is asking for more details about previous topic
    if (currentMessage.includes("more") || 
        currentMessage.includes("elaborate") ||
        currentMessage.includes("explain") ||
        currentMessage.includes("details")) {
      intent = "follow-up";
    }
    
    // Check if user is asking about specific tax topics
    else if (prevMessage.includes("tax") && currentMessage.includes("rate")) {
      intent = "tax-rate";
    }
    
    // Check if user is asking about documents
    else if (prevMessage.includes("document") || currentMessage.includes("document")) {
      intent = "document";
    }
  }
  
  if (newMessage.toLowerCase().includes("tax")) {
    intent = "tax";
  } else if (newMessage.toLowerCase().includes("document") || newMessage.toLowerCase().includes("file")) {
    intent = "document";
  }
  
  return intent;
};

// Helper function to generate follow-up responses
export const getFollowUpResponse = (message: string, knowledgeItems: KnowledgeItem[]): string => {
  if (message.toLowerCase().includes('tax')) {
    return `Regarding the tax aspects, UAE's corporate tax framework was established in 2022 and implemented in 2023. It features a standard rate of 9% for businesses earning above AED 375,000, with qualifying free zone businesses potentially eligible for 0% rates subject to specific conditions.`;
  } else if (message.toLowerCase().includes('document') || message.toLowerCase().includes('file')) {
    return `Let me provide more insights from ${knowledgeItems.length > 0 ? 'your uploaded documents' : 'the reference documents'}. The key provisions relevant to your inquiry include regulatory frameworks, compliance requirements, and specific provisions applicable to your situation.`;
  } else {
    return `Looking at the broader context of our discussion, I can elaborate further on the relevant aspects. The regulatory framework in UAE provides specific guidelines that would apply to your situation, considering all factors we've discussed.`;
  }
};
