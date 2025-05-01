
import React from 'react';
import { Bell, LogOut, Shield, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const SettingsSection: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSignOut = () => {
    // In a real app, you would call your auth service's logout method here
    toast({
      title: t('sidebar.signedOut'),
      description: t('sidebar.signedOutDesc')
    });

    // Navigate to home page after signing out
    navigate('/');
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium mb-4 dark:text-white">Settings</h3>
      
      <nav>
        <ul className="space-y-1">
          <li>
            <a href="#" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">
              <Bell size={20} className="text-gray-600 mr-3 dark:text-gray-400" />
              <span>Notifications</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">
              <Shield size={20} className="text-gray-600 mr-3 dark:text-gray-400" />
              <span>Privacy & Security</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">
              <Settings size={20} className="text-gray-600 mr-3 dark:text-gray-400" />
              <span>Preferences</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div className="mt-6 flex justify-start">
        <Button 
          onClick={handleSignOut} 
          variant="outline"
          className="flex items-center text-red-600 hover:bg-red-50 border border-red-200 dark:hover:bg-red-900/20 dark:border-red-800"
        >
          <LogOut size={18} className="mr-2" />
          {t('common.signOut')}
        </Button>
      </div>
    </div>
  );
};

export default SettingsSection;
