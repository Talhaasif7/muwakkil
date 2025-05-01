
import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '@/components/ui/button';
import LanguageSwitch from '../LanguageSwitch';
import { useTranslation } from 'react-i18next';

interface ChatHeaderProps {
  title: string;
  timestamp?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, timestamp }) => {
  if (!title) return null;
  
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-background dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 flex justify-between items-center py-3">
        <div>
          <h1 className="text-xl font-medium text-foreground dark:text-foreground">
            {title === "New Chat" ? t('common.newChat') : title}
          </h1>
          {timestamp && <p className="text-sm text-gray-500 dark:text-gray-400">{timestamp}</p>}
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
