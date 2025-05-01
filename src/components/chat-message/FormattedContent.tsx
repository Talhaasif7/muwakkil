
import React from 'react';

interface FormattedContentProps {
  content: string;
}

const FormattedContent: React.FC<FormattedContentProps> = ({ content }) => {
  // Formatting message content with links and lists
  const formattedContent = content.split('\n').map((line, i) => {
    if (line.startsWith('•') || line.startsWith('*')) {
      return <li key={i} className="ml-6 list-disc text-foreground dark:text-foreground">{line.substring(1).trim()}</li>;
    } else if (line.match(/^\d+\.\s/)) {
      return <li key={i} className="ml-6 list-decimal text-foreground dark:text-foreground">{line.substring(line.indexOf('.') + 1).trim()}</li>;
    } else if (line.trim().startsWith('DIFC')) {
      return <a key={i} href="#" className="text-muwakkil-purple dark:text-primary underline">{line}</a>;
    } else {
      return <p key={i} className={`${line.trim() === '' ? 'h-4' : ''} text-foreground dark:text-foreground`}>{line}</p>;
    }
  });

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert text-foreground dark:text-foreground">
      {formattedContent}
    </div>
  );
};

export default FormattedContent;
