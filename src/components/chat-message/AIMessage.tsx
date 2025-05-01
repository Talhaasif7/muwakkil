
import React from 'react';
import ActionLog from './ActionLog';
import FormattedContent from './FormattedContent';
import MessageActions from './MessageActions';

interface ActionLogStep {
  text: string;
  source?: string;
  document?: string;
}

interface AIMessageProps {
  content: string;
  actionLogSteps: ActionLogStep[];
  onBookmark?: () => void;
  onCopy?: () => void;
  onRegenerateResponse?: () => void;
  onFeedback?: (type: 'positive' | 'negative') => void;
  isBookmarked?: boolean;
}

const AIMessage: React.FC<AIMessageProps> = ({
  content,
  actionLogSteps,
  onBookmark,
  onCopy,
  onRegenerateResponse,
  onFeedback,
  isBookmarked = false
}) => {
  return <div className="py-6 bg-transparent">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col w-full">
          {/* Action Log component - keep at the top */}
          {actionLogSteps.length > 0 && <div className="mb-4 w-full">
              <ActionLog steps={actionLogSteps} />
            </div>}
          
          {/* Content now aligned to the left with explicit text coloring */}
          <div className="w-full text-foreground dark:text-foreground">
            <FormattedContent content={content} />
            
            <MessageActions content={content} onBookmark={onBookmark} onCopy={onCopy} onRegenerateResponse={onRegenerateResponse} onFeedback={onFeedback} isBookmarked={isBookmarked} />
          </div>
        </div>
      </div>
    </div>;
};

export default AIMessage;
