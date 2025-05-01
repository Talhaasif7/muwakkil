
import React from 'react';
import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import PricingSection from '../components/landing/PricingSection';
import Footer from '../components/landing/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <div className="pt-16"> {/* Add padding top to account for fixed header */}
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
