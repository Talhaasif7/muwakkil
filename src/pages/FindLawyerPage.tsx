
import React from 'react';
import PageHeader from '@/components/PageHeader';

const FindLawyerPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <PageHeader title="Find a Lawyer" />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <span className="px-3 py-1 text-[#855ECB] border border-[#855ECB] rounded-md text-sm">Pro</span>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-10 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muwakkil-light flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            
            <h2 className="text-xl font-medium mb-2">Connect with Legal Experts</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              This feature is available exclusively for Pro users. Upgrade to access our network of vetted legal professionals in UAE.
            </p>
            
            <button className="px-6 py-3 bg-[#855ECB] text-white rounded-md hover:bg-purple-600">
              Upgrade to Pro
            </button>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
              <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <h3 className="font-medium mb-2">Expert Consultation</h3>
                <p className="text-sm text-gray-600">Get one-on-one consultation with specialized UAE lawyers</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <h3 className="font-medium mb-2">Document Review</h3>
                <p className="text-sm text-gray-600">Professional review of your legal documents</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <h3 className="font-medium mb-2">Legal Representation</h3>
                <p className="text-sm text-gray-600">Connect with lawyers for in-person representation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindLawyerPage;
