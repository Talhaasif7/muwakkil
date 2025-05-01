
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

interface ChatBotButtonProps {
  isAuthenticated?: boolean;
}

const ChatBotButton: React.FC<ChatBotButtonProps> = ({ isAuthenticated = false }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleChatClick = () => {
    if (isAuthenticated) {
      navigate('/app/chat');
    } else {
      toast({
        title: t('common.login'),
        description: "Please sign in to start a chat and save your history",
        action: (
          <Button 
            variant="default" 
            onClick={() => navigate('/login')}
            className="bg-muwakkil-purple hover:bg-muwakkil-purple/90"
          >
            {t('auth.signIn')}
          </Button>
        )
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleChatClick}
        className="rounded-full w-14 h-14 bg-muwakkil-purple hover:bg-muwakkil-purple/90 shadow-lg flex items-center justify-center p-0 text-white"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ChatBotButton;
