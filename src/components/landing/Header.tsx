
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import LanguageSwitch from '../LanguageSwitch';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo />
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/login" className="text-gray-700 hover:text-muwakkil-purple dark:text-gray-300 dark:hover:text-muwakkil-purple">
              {t('common.login')}
            </Link>
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
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
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
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
