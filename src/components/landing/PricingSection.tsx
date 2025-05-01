
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type PricingPlanProps = {
  name: string;
  description: string;
  price: React.ReactNode;
  features: string[];
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
  ctaVariant?: 'primary' | 'secondary';
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

const PricingPlan: React.FC<PricingPlanProps> = ({ 
  name, 
  description, 
  price, 
  features, 
  ctaText, 
  ctaLink, 
  popular = false, 
  ctaVariant = 'secondary' 
}) => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      variants={cardVariants}
      className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm ${popular ? 'border-2 border-muwakkil-purple shadow-lg relative' : 'border border-gray-100 dark:border-gray-700'}`}
      whileHover={{ 
        y: -10,
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      }}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-muwakkil-purple text-white px-4 py-1 rounded-full text-sm">
          {t('pricing.mostPopular')}
        </div>
      )}
      <h3 className="text-xl font-bold mb-2 dark:text-white">{name}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <div className="mb-6">
        {price}
      </div>
      <motion.ul 
        className="space-y-3 mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
      >
        {features.map((feature, index) => (
          <motion.li 
            key={index} 
            variants={listItemVariants}
            className="flex items-center text-gray-600 dark:text-gray-300"
          >
            <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </motion.li>
        ))}
      </motion.ul>
      <Link 
        to={ctaLink} 
        className={`block text-center rounded-xl px-8 py-2 h-11 ${
          ctaVariant === 'primary' 
            ? 'bg-muwakkil-purple hover:bg-purple-600 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white'
        } font-medium transition-all duration-300`}
      >
        {ctaText}
      </Link>
    </motion.div>
  );
};

const PricingSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="pricing" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-16 dark:text-white"
        >
          {t('pricing.title')}
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <PricingPlan 
            name={t('pricing.starter.name')}
            description={t('pricing.starter.description')}
            price={<span className="text-4xl font-bold dark:text-white">{t('pricing.starter.price')}</span>}
            features={[
              t('pricing.starter.feature1'),
              t('pricing.starter.feature2'),
              t('pricing.starter.feature3')
            ]}
            ctaText={t('pricing.starter.ctaText')}
            ctaLink="/signup"
          />
          
          <PricingPlan 
            name={t('pricing.professional.name')}
            description={t('pricing.professional.description')}
            price={(
              <>
                <span className="text-4xl font-bold dark:text-white">{t('pricing.professional.price')}</span>
                <span className="text-gray-500 dark:text-gray-400">{t('pricing.professional.period')}</span>
              </>
            )}
            features={[
              t('pricing.professional.feature1'),
              t('pricing.professional.feature2'),
              t('pricing.professional.feature3'),
              t('pricing.professional.feature4')
            ]}
            ctaText={t('pricing.professional.ctaText')}
            ctaLink="/signup"
            popular={true}
            ctaVariant="primary"
          />
          
          <PricingPlan 
            name={t('pricing.enterprise.name')}
            description={t('pricing.enterprise.description')}
            price={<span className="text-4xl font-bold dark:text-white">{t('pricing.enterprise.price')}</span>}
            features={[
              t('pricing.enterprise.feature1'),
              t('pricing.enterprise.feature2'),
              t('pricing.enterprise.feature3'),
              t('pricing.enterprise.feature4')
            ]}
            ctaText={t('pricing.enterprise.ctaText')}
            ctaLink="/contact"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
