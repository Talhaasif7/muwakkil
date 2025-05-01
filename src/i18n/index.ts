
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en.json';
import arTranslation from './locales/ar.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      ar: {
        translation: arTranslation
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;

// Helper function to set language and document direction
export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
  
  // Set the direction based on language
  const dir = language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = language;

  // Also add a class to use in CSS
  if (language === 'ar') {
    document.documentElement.classList.add('rtl');
  } else {
    document.documentElement.classList.remove('rtl');
  }
};
