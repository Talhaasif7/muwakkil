
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return <footer className="bg-gray-800 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <img src="/lovable-uploads/806d53db-5eca-4dde-8bc0-159233621293.png" alt="Muwakkil Logo" className="h-8 w-auto bg-white rounded-md p-1" />
            <span className="ml-2 font-bold text-lg text-slate-50">Muwakkil</span>
          </div>
          <p className="text-gray-400">
            {t('landing.footer.description')}
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-4 text-slate-50">{t('landing.footer.about')}</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">{t('landing.footer.about')}</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">{t('landing.footer.careers')}</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">{t('landing.footer.blog')}</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">{t('landing.footer.contact')}</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg mb-4 font-medium text-slate-50">{t('landing.footer.resources')}</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">{t('landing.footer.knowledgeBase')}</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">{t('landing.footer.templates')}</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">{t('landing.footer.faq')}</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">{t('landing.footer.support')}</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-4 text-slate-50">{t('landing.footer.legal')}</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">{t('landing.footer.terms')}</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">{t('landing.footer.privacy')}</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">{t('landing.footer.disclaimer')}</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">{t('landing.footer.cookie')}</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p className="text-slate-50">&copy; 2025 Muwakkil. {t('landing.footer.rights')}</p>
      </div>
    </footer>;
};
export default Footer;
