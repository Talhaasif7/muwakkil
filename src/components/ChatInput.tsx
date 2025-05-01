
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Paperclip, Send, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload: (files: File[]) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onFileUpload }) => {
  const [message, setMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const MAX_FILES = 10;
  
  // Auto-resize logic for the textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Set the height to match content (with max of 500px handled by CSS)
    textarea.style.height = `${Math.min(textarea.scrollHeight, 500)}px`;
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If there are files selected, upload them
    if (selectedFiles.length > 0) {
      onFileUpload(selectedFiles);
      setSelectedFiles([]);
    }
    
    // If there's a message, send it
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      // Reset height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      // Check if adding new files would exceed the maximum
      if (selectedFiles.length + newFiles.length > MAX_FILES) {
        toast({
          title: "Maximum Files Limit",
          description: `You can upload a maximum of ${MAX_FILES} files at once.`,
          variant: "destructive"
        });
        return;
      }
      
      setSelectedFiles(prev => [...prev, ...newFiles]);
      
      // Clear the input value so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-background dark:bg-background fixed bottom-0 left-64 right-0 z-10">
      <div className="flex items-start bg-muted dark:bg-accent rounded-md max-w-4xl mx-auto relative">
        {/* File upload button */}
        <label htmlFor="file-upload" className="p-3 hover:bg-gray-100 dark:hover:bg-muted rounded-l-md cursor-pointer self-end">
          <Paperclip size={20} className="text-gray-500 dark:text-gray-400" />
          <input
            id="file-upload"
            type="file"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        
        {/* Text input area */}
        <div className="flex-1 flex flex-col py-3 px-4">
          {/* Show selected files if any */}
          {selectedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center bg-white dark:bg-gray-700 rounded px-3 py-1 text-sm">
                  <div className="flex-1 truncate max-w-[200px]">
                    {file.name}
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeSelectedFile(index)}
                    className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything..."
            className="bg-transparent border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[40px] overflow-y-auto p-0"
            style={{ maxHeight: '500px' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>
        
        {/* Send button */}
        <div className="flex items-center self-end">
          <button 
            type="submit"
            className="p-3 ml-1 text-purple-600 dark:text-primary hover:bg-gray-100 dark:hover:bg-muted rounded-r-md"
          >
            {(selectedFiles.length > 0 || message.trim()) ? <Send size={20} /> : null}
          </button>
        </div>
      </div>
      
      {/* File count indicator */}
      {selectedFiles.length > 0 && (
        <div className="max-w-4xl mx-auto mt-1 text-xs text-gray-500">
          {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected (max {MAX_FILES})
        </div>
      )}
    </form>
  );
};

export default ChatInput;
