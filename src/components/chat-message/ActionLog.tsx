
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ActionLogStep {
  text: string;
  source?: string;
  document?: string;
}

interface ActionLogProps {
  steps: ActionLogStep[];
}

const ActionLog: React.FC<ActionLogProps> = ({ steps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  
  if (steps.length === 0) return null;
  
  return (
    <div className="flex-shrink-0 w-full">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="rounded-md bg-muted dark:bg-accent border w-full"
      >
        <CollapsibleTrigger asChild>
          <button className="flex items-center space-x-2 py-1 px-3 text-sm text-gray-600 dark:text-muted-foreground rounded hover:bg-gray-100 dark:hover:bg-muted w-full">
            <span>{t('chat.actionLog')}</span>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="w-full">
          <ScrollArea className="h-[200px] w-full pr-4">
            <div className="p-3 border-t w-full">
              {steps.map((step, index) => (
                <div key={index} className="mb-3 last:mb-0 pr-2">
                  <div className="flex items-start mb-1">
                    {step.document ? (
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                    )}
                    <p className="text-sm break-normal dark:text-foreground">{step.text}</p>
                  </div>
                  
                  {step.source && (
                    <div className="ml-7 text-xs text-gray-500 dark:text-gray-400 break-words">
                      {step.source}
                    </div>
                  )}
                  
                  {step.document && (
                    <div className="ml-7 text-xs text-muwakkil-purple dark:text-primary cursor-pointer break-words">
                      {step.document}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ActionLog;
