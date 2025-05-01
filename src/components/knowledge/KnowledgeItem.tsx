
import React from 'react';
import { Trash2, File } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface KnowledgeItemProps {
  id: string;
  name: string;
  filePath?: string;
  content?: string;
  type: 'text' | 'file';
  onDelete: (id: string) => void;
}

const KnowledgeItem: React.FC<KnowledgeItemProps> = ({
  id,
  name,
  filePath,
  content,
  type,
  onDelete
}) => {
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-12 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <span className="dark:text-gray-200 font-medium">{name}</span>
        </div>
        <button onClick={() => onDelete(id)} className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400">
          <Trash2 size={20} />
        </button>
      </div>
      
      {/* Content preview - for text only */}
      {type === 'text' && content && (
        <div className="px-4 pb-4">
          <ScrollArea className="h-40 rounded-md border p-2 bg-gray-50 dark:bg-gray-900">
            <div className="p-2">
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {content}
              </p>
            </div>
          </ScrollArea>
        </div>
      )}
      
      {/* For files, just display the file name without preview */}
      {type === 'file' && filePath && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <File size={16} className="text-gray-500" />
            <span className="text-sm text-gray-500">File uploaded</span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default KnowledgeItem;
