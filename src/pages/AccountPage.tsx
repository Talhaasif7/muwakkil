
import React from 'react';
import ProfileSection from '@/components/account/ProfileSection';
import SubscriptionSection from '@/components/account/SubscriptionSection';
import SettingsSection from '@/components/account/SettingsSection';
import { Profile } from '@/hooks/useProfileState';
import PageHeader from '@/components/PageHeader';

const AccountPage: React.FC = () => {
  const profileData: Profile = {
    name: "Ahmed Al Nakhla",
    email: "ahmed@nakhlatechnologies.com",
    phone: "+971 52 123 4567",
    notifications: {
      email: true,
      push: false
    }
  };
  
  return (
    <div className="flex-1 flex flex-col h-full">
      <PageHeader title="Account" />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            {/* Profile Section */}
            <ProfileSection initialProfile={profileData} />
            
            {/* Subscription Section */}
            <SubscriptionSection />
            
            {/* Settings Links */}
            <SettingsSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
