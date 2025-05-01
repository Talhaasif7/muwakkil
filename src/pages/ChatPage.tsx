
import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import ChatInput from '../components/ChatInput';
import ChatContainer from '../components/chat/ChatContainer';
import ChatHeader from '../components/chat/ChatHeader';
import ChatPromptSuggestions from '../components/chat/ChatPromptSuggestions';
import { useChat } from '../hooks/useChat';

const ChatPage: React.FC = () => {
  // Use search parameters instead of path parameters
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('id');
  const location = useLocation();
  
  const { 
    messages, 
    loading, 
    handleSendMessage, 
    handleFileUpload, 
    handleBookmark,
    actionLogSteps,
    chatTitle,
    handleFeedback
  } = useChat(chatId);

  // Update the document title when the chat title changes
  useEffect(() => {
    document.title = chatTitle ? `${chatTitle} | Muwakkil` : 'Chat | Muwakkil';
  }, [chatTitle]);

  // Always show prompt suggestions if we have no messages
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col relative h-full">
        <ChatPromptSuggestions onSelectPrompt={handleSendMessage} />
        <ChatInput onSendMessage={handleSendMessage} onFileUpload={handleFileUpload} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col relative h-full">
      {/* Chat title */}
      <ChatHeader 
        title={chatTitle || "New Chat"}
        timestamp={chatId ? "4/23/25 19:20" : ""}
      />
      
      {/* Messages list */}
      <ChatContainer 
        messages={messages} 
        loading={loading} 
        actionLogSteps={actionLogSteps}
        onBookmark={handleBookmark}
        onFeedback={handleFeedback}
      />
      
      {/* Input area */}
      <ChatInput onSendMessage={handleSendMessage} onFileUpload={handleFileUpload} />
    </div>
  );
};

export default ChatPage;
