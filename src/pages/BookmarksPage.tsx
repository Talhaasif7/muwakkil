
import React from 'react';
import PageHeader from '@/components/PageHeader';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const BookmarksPage: React.FC = () => {
  const { bookmarks, removeBookmark } = useBookmarks();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleRemoveBookmark = (id: string) => {
    removeBookmark(id);
    toast({
      title: t('bookmarks.removed'),
      description: t('bookmarks.removedDesc'),
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <PageHeader title={t('bookmarks.title', 'Bookmarks')} />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          {bookmarks.length > 0 ? (
            <div className="space-y-4">
              {bookmarks.map((bookmark) => (
                <div 
                  key={bookmark.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{bookmark.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{bookmark.date}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveBookmark(bookmark.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-100 dark:border-gray-700">
                    <p className="text-gray-800 dark:text-gray-200">{bookmark.content}</p>
                  </div>
                  {bookmark.source && (
                    <div className="mt-2 flex">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        {bookmark.source}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t('bookmarks.empty', 'No bookmarks yet')}</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                {t('bookmarks.emptyDesc', 'Bookmark important information from your chats to access them quickly later.')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarksPage;
