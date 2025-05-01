
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Bookmark {
  id: string;
  title: string;
  date: string;
  content: string;
  documentPath?: string;
  documentName?: string;
  source?: string;  // Added the source property as optional
}

interface BookmarkState {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  getBookmarks: () => Bookmark[];
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (bookmark) => {
        const currentBookmarks = get().bookmarks;
        // Check if bookmark with the same ID already exists
        const exists = currentBookmarks.some(bm => bm.id === bookmark.id);
        if (!exists) {
          set({ bookmarks: [...currentBookmarks, bookmark] });
        }
      },
      removeBookmark: (id) => {
        set({ bookmarks: get().bookmarks.filter(bookmark => bookmark.id !== id) });
      },
      getBookmarks: () => get().bookmarks
    }),
    {
      name: 'bookmarks-storage',
    }
  )
);
