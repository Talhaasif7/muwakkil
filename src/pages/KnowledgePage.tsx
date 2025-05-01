
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import KnowledgeItem from '@/components/knowledge/KnowledgeItem';
import AddKnowledgeModal from '@/components/knowledge/AddKnowledgeModal';
import EmptyKnowledgeState from '@/components/knowledge/EmptyKnowledgeState';
import { useKnowledgeItems } from '@/hooks/useKnowledgeItems';
import PageHeader from '@/components/PageHeader';

const KnowledgePage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { items, addItem, deleteItem } = useKnowledgeItems();

  const handleAddKnowledge = (name: string, text: string | null, file: File | null) => {
    addItem(name, text, file);
    setShowAddModal(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <PageHeader title="Knowledge" />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          {items.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-500 dark:text-gray-400">Knowledge help Muwakkil understand the context of your question.</p>
                <button 
                  onClick={() => setShowAddModal(true)} 
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Plus size={24} />
                </button>
              </div>

              {/* Knowledge items */}
              <div className="space-y-4">
                {items.map(item => (
                  <KnowledgeItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    filePath={item.filePath}
                    content={item.content}
                    type={item.type}
                    onDelete={deleteItem}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyKnowledgeState onAddClick={() => setShowAddModal(true)} />
          )}
        </div>

        <AddKnowledgeModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddKnowledge}
        />
      </div>
    </div>
  );
};

export default KnowledgePage;
