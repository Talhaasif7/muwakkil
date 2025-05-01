
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface AddKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, text: string | null, file: File | null) => void;
}

const AddKnowledgeModal: React.FC<AddKnowledgeModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [knowledgeText, setKnowledgeText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [knowledgeName, setKnowledgeName] = useState('');

  const handleAddKnowledge = () => {
    onAdd(knowledgeName, knowledgeText || null, selectedFile);
    resetForm();
  };

  const resetForm = () => {
    setKnowledgeText('');
    setSelectedFile(null);
    setKnowledgeName('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      // Use file name as default item name if no custom name is provided
      if (!knowledgeName) {
        setKnowledgeName(e.target.files[0].name);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Add Knowledge</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name (Optional)</label>
            <input
              type="text"
              value={knowledgeName}
              onChange={(e) => setKnowledgeName(e.target.value)}
              placeholder="Enter a name for this knowledge item"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-muwakkil-purple dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <Tabs defaultValue="text" className="mb-4">
            <TabsList className="mb-2 w-full">
              <TabsTrigger value="text" className="flex-1">Add Text</TabsTrigger>
              <TabsTrigger value="file" className="flex-1">Upload File</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text">
              <textarea 
                value={knowledgeText} 
                onChange={e => setKnowledgeText(e.target.value)} 
                className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-muwakkil-purple dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                placeholder="Add text content..."
              ></textarea>
            </TabsContent>
            
            <TabsContent value="file">
              <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                   onClick={() => document.getElementById('file-upload')?.click()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 text-gray-500 dark:text-gray-400">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedFile ? selectedFile.name : "Click to select a file"}
                </span>
                <input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange} 
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => {
                onClose();
                resetForm();
              }} 
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddKnowledge} 
              className="px-4 py-2 bg-muwakkil-purple text-white rounded-md hover:bg-purple-600" 
              disabled={(!selectedFile && !knowledgeText.trim())}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddKnowledgeModal;
