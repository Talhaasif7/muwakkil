
import { useState, useEffect } from 'react';
import { useBookmarkStore, Bookmark } from '@/services/bookmarkService';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const bookmarkStore = useBookmarkStore();
  
  // Load bookmarks on component mount
  useEffect(() => {
    const storedBookmarks = bookmarkStore.getBookmarks();
    setBookmarks(storedBookmarks);
  }, [bookmarkStore]);

  // Add a new bookmark
  const addBookmark = (bookmark: Bookmark) => {
    bookmarkStore.addBookmark(bookmark);
    // Update local state
    setBookmarks(bookmarkStore.getBookmarks());
  };

  // Remove a bookmark
  const removeBookmark = (id: string) => {
    bookmarkStore.removeBookmark(id);
    // Update local state
    setBookmarks(bookmarkStore.getBookmarks());
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark
  };
};
