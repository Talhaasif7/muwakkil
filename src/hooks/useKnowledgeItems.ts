
import { useState, useEffect } from 'react';
import { KnowledgeItem } from '@/types/knowledge';

export const useKnowledgeItems = () => {
  const [items, setItems] = useState<KnowledgeItem[]>([]);

  // Load items from localStorage on hook initialization
  useEffect(() => {
    const storedItems = localStorage.getItem('knowledgeItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('knowledgeItems', JSON.stringify(items));
  }, [items]);

  const addItem = (name: string, text: string | null, file: File | null) => {
    const itemName = name.trim() || `Knowledge ${items.length + 1}`;

    if (file) {
      const newItem: KnowledgeItem = {
        id: Date.now().toString(),
        name: itemName,
        filePath: URL.createObjectURL(file),
        type: 'file'
      };
      setItems([...items, newItem]);
    } else if (text) {
      const newItem: KnowledgeItem = {
        id: Date.now().toString(),
        name: itemName,
        content: text,
        type: 'text'
      };
      setItems([...items, newItem]);
    }
  };

  const deleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  return {
    items,
    addItem,
    deleteItem
  };
};
