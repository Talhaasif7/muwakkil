
import React from 'react';
import UserMessage from './chat-message/UserMessage';
import AIMessage from './chat-message/AIMessage';
import { useBookmarkStore } from '../services/bookmarkService';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp?: Date | string;
  };
  actionLogSteps?: Array<{
    text: string;
    source?: string;
    document?: string;
  }>;
  onBookmark?: (messageId: string) => void;
  onCopy?: () => void;
  onRegenerateResponse?: () => void;
  onFeedback?: (type: 'positive' | 'negative') => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  actionLogSteps = [],
  onBookmark,
  onCopy,
  onRegenerateResponse,
  onFeedback,
}) => {
  const { bookmarks, removeBookmark } = useBookmarkStore();
  const isAlreadyBookmarked = bookmarks.some(bookmark => bookmark.id === message.id);
  
  const handleBookmarkToggle = () => {
    if (isAlreadyBookmarked) {
      removeBookmark(message.id);
    } else if (onBookmark) {
      onBookmark(message.id);
    }
  };
  
  if (message.sender === 'user') {
    return <UserMessage content={message.content} />;
  }

  return (
    <AIMessage
      content={message.content}
      actionLogSteps={actionLogSteps}
      onBookmark={handleBookmarkToggle}
      onCopy={onCopy}
      onRegenerateResponse={onRegenerateResponse}
      onFeedback={onFeedback}
      isBookmarked={isAlreadyBookmarked}
    />
  );
};

export default ChatMessage;
