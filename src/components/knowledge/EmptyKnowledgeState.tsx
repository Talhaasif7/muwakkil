
import React from 'react';
import { Plus } from 'lucide-react';

interface EmptyKnowledgeStateProps {
  onAddClick: () => void;
}

const EmptyKnowledgeState: React.FC<EmptyKnowledgeStateProps> = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="mb-4 text-gray-500 dark:text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </div>
      <h2 className="text-xl font-medium mb-2">No Knowledge Items Yet</h2>
      <p className="text-gray-500 dark:text-gray-400 text-center mb-6">Add documents to help Muwakkil understand your context better</p>
      <button onClick={onAddClick} className="flex items-center px-4 py-2 bg-muwakkil-purple text-white rounded-md hover:bg-purple-600">
        <Plus size={18} className="mr-2" />
        <span className="text-slate-50">Add Knowledge</span>
      </button>
    </div>
  );
};

export default EmptyKnowledgeState;
