import React from 'react';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import { BookOpen, Bookmark, User, Scale, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NavItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  badge?: string;
}

interface ChatItem {
  id: string;
  title: string;
  path: string;
}

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const currentChatId = searchParams.get('id');
  const isOnChatPage = location.pathname === '/app/chat';

  // Main navigation items
  const navItems: NavItem[] = [
    {
      name: t('sidebar.knowledge'),
      icon: <BookOpen size={20} />,
      path: '/app/knowledge'
    },
    {
      name: t('sidebar.bookmarks'),
      icon: <Bookmark size={20} />,
      path: '/app/bookmarks'
    },
    {
      name: t('sidebar.account'),
      icon: <User size={20} />,
      path: '/app/account'
    },
    {
      name: t('sidebar.findLawyer'),
      icon: <Scale size={20} />,
      path: '/app/find-lawyer',
      badge: t('sidebar.pro')
    }
  ];

  // Sample previous chat items
  const recentChats: ChatItem[] = [
    {
      id: '1',
      title: 'File a NDA for all free zon...',
      path: '/app/chat?id=1'
    },
    {
      id: '2',
      title: 'Filing tax in UAE',
      path: '/app/chat?id=2'
    },
    {
      id: '3',
      title: 'Generate TODO list for st...',
      path: '/app/chat?id=3'
    }
  ];

  // Check if the current path is a chat with a specific ID
  const isActiveChatPath = (path: string) => {
    return location.pathname === '/app/chat' && searchParams.get('id') === path.split('=')[1];
  };

  const handleNewChat = () => {
    // Clear any existing chat ID by navigating to /app/chat without params
    navigate('/app/chat');
    toast({
      title: t('sidebar.newChatStarted'),
      description: t('sidebar.newChatStartedDesc')
    });
  };

  return (
    <div className="w-64 h-screen border-r border-gray-200 bg-white flex flex-col dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
      <div className="p-4">
        <Logo />
      </div>
      
      <nav className="flex-1 px-4 pt-4">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.name}>
              <Link 
                to={item.path} 
                className={`flex items-center px-2 py-2 rounded-md text-sm ${
                  location.pathname === item.path 
                    ? 'text-[#855ECB] bg-muwakkil-light font-medium dark:bg-gray-700 dark:text-muwakkil-purple' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
                {item.badge && (
                  <span className="ml-auto px-2 py-0.5 text-xs text-[#855ECB] rounded border border-[#855ECB]">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
          {recentChats.map(chat => (
            <Link 
              key={chat.id} 
              to={chat.path} 
              className={`flex items-center mb-2 px-2 py-2 rounded-md text-sm ${
                isActiveChatPath(chat.path) 
                  ? 'text-[#855ECB] bg-muwakkil-light font-medium dark:bg-gray-700 dark:text-muwakkil-purple' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <MessageSquare size={18} className="mr-3" />
              <span className="truncate">{chat.title}</span>
            </Link>
          ))}
        </div>
      </nav>
      
      <div className="p-4 space-y-3">
        <button 
          onClick={handleNewChat} 
          className="w-full flex items-center justify-center px-4 bg-[#855ECB] hover:bg-[#7346b5] text-white rounded-md transition-colors py-[8px] dark:bg-muwakkil-purple dark:hover:bg-muwakkil-purple/80"
        >
          <span className="mr-2 text-slate-50">+</span>
          {t('sidebar.newChat')}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
