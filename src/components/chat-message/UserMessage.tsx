import React from 'react';
interface UserMessageProps {
  content: string;
}
const UserMessage: React.FC<UserMessageProps> = ({
  content
}) => {
  return <div className="bg-transparent py-[8px]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-end">
          <div className="bg-muwakkil-light dark:bg-sidebar-accent rounded-2xl rounded-tr-none px-6 py-4 max-w-[80%] text-foreground dark:text-foreground">
            <p className="text-foreground dark:text-foreground">{content}</p>
          </div>
        </div>
      </div>
    </div>;
};
export default UserMessage;