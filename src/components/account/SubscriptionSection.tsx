
import React from 'react';

const SubscriptionSection: React.FC = () => {
  return (
    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium mb-4 dark:text-white">Your Plan</h3>
      
      <div className="flex items-center justify-between p-4 bg-muwakkil-light rounded-md dark:bg-muwakkil-purple/10">
        <div>
          <span className="font-medium dark:text-white">Free Trial</span>
          <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">7 days left in your trial</p>
        </div>
        <button className="px-4 py-2 bg-muwakkil-purple text-white rounded-md hover:bg-purple-600">
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
};

export default SubscriptionSection;
