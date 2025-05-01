
import React from 'react';

interface PromptSuggestionProps {
  title: string;
  icon: React.ReactNode;
  examples: string[];
  onSelect: (example: string) => void;
}

const PromptSuggestion: React.FC<PromptSuggestionProps> = ({
  title,
  icon,
  examples,
  onSelect
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-4 text-foreground dark:text-foreground">{title}</h3>
      <div className="w-full space-y-2">
        {examples.map((example, i) => (
          <button
            key={i}
            onClick={() => onSelect(example)}
            className="w-full p-4 text-left border border-border rounded-md bg-background dark:bg-sidebar-accent text-foreground dark:text-foreground hover:bg-muted dark:hover:bg-sidebar-border transition-colors"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestion;
