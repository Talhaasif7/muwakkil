
import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import LanguageSwitch from './LanguageSwitch';

interface PageHeaderProps {
  title?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-background dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 flex justify-between items-center py-3">
        {title && (
          <h1 className="text-xl font-medium text-foreground dark:text-foreground">
            {title}
          </h1>
        )}
        <div className={`flex items-center gap-2 ${!title ? 'ml-auto' : ''}`}>
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

export default PageHeader;
