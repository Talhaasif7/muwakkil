
import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../i18n';
import { Button } from '@/components/ui/button';

const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    changeLanguage(newLanguage);
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage} 
      className="font-medium"
    >
      {currentLanguage === 'ar' ? 'English' : 'العربية'}
    </Button>
  );
};

export default LanguageSwitch;
