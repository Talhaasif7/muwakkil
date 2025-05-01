
import React, { useState, useEffect } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  RefreshCcw, 
  Copy, 
  Bookmark, 
  Check, 
  BookmarkCheck 
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { HoverButton } from "@/components/ui/hover-button";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MessageActionsProps {
  onBookmark?: () => void;
  onCopy?: () => void;
  onRegenerateResponse?: () => void;
  onFeedback?: (type: 'positive' | 'negative') => void;
  content: string;
  isBookmarked?: boolean;
}

const MessageActions: React.FC<MessageActionsProps> = ({
  onBookmark,
  onCopy,
  onRegenerateResponse,
  onFeedback,
  content,
  isBookmarked = false
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { toast } = useToast();
  
  // Update the bookmarked state when the isBookmarked prop changes
  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    if (onCopy) onCopy();
    
    toast({
      title: "Copied",
      description: "Content copied to clipboard",
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    if (onBookmark) onBookmark();
  };

  const handleLike = () => {
    // Toggle like state
    const newLikedState = !liked;
    setLiked(newLikedState);
    
    // If disliked and now liking, remove dislike
    if (disliked && newLikedState) {
      setDisliked(false);
    }
    
    // Call the feedback handler if provided
    if (onFeedback) onFeedback('positive');
  };

  const handleDislike = () => {
    // Toggle dislike state
    const newDislikedState = !disliked;
    setDisliked(newDislikedState);
    
    // If liked and now disliking, remove like
    if (liked && newDislikedState) {
      setLiked(false);
    }
    
    // Call the feedback handler if provided
    if (onFeedback) onFeedback('negative');
  };

  // Create custom thumbs up icon that looks filled when active
  const ThumbsUpIcon = () => {
    return liked ? (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
        <path 
          d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" 
          fill="currentColor" 
          stroke="currentColor" 
        />
      </svg>
    ) : (
      <ThumbsUp size={16} strokeWidth={1.5} />
    );
  };

  // Create custom thumbs down icon that looks filled when active
  const ThumbsDownIcon = () => {
    return disliked ? (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
        <path 
          d="M17 2H20C20.5304 2 21.0391 2.21071 21.4142 2.58579C21.7893 2.96086 22 3.46957 22 4V11C22 11.5304 21.7893 12.0391 21.4142 12.4142C21.0391 12.7893 20.5304 13 20 13H17M10 15V19C10 19.7956 10.3161 20.5587 10.8787 21.1213C11.4413 21.6839 12.2044 22 13 22L17 13V2H5.72C5.23768 1.99448 4.76965 2.16359 4.40209 2.47599C4.03452 2.78839 3.79217 3.22309 3.72 3.7L2.34 12.7C2.29649 12.9866 2.31583 13.2793 2.39666 13.5577C2.4775 13.8362 2.61788 14.0937 2.80812 14.3125C2.99836 14.5313 3.23395 14.7061 3.49843 14.8248C3.76291 14.9435 4.05008 15.0033 4.34 15H10Z" 
          fill="currentColor"
          stroke="currentColor"
        />
      </svg>
    ) : (
      <ThumbsDown size={16} strokeWidth={1.5} />
    );
  };

  return (
    <div className="mt-4 flex items-center space-x-2 text-gray-500 dark:text-gray-400">
      <TooltipProvider delayDuration={0}>
        {/* Copy button - Removed border and reduced size */}
        <Tooltip>
          <TooltipTrigger asChild>
            <HoverButton
              variant="ghost"
              size="icon"
              className="relative w-8 h-8 p-0 disabled:opacity-100"
              onClick={handleCopy}
              aria-label={isCopied ? "Copied" : "Copy to clipboard"}
              disabled={isCopied}
            >
              {isCopied ? (
                <Check className="stroke-emerald-500 absolute inset-0 m-auto" size={16} strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Copy className="absolute inset-0 m-auto" size={16} strokeWidth={1.5} aria-hidden="true" />
              )}
            </HoverButton>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">Copy message</TooltipContent>
        </Tooltip>

        {/* Like button - Removed border */}
        <Tooltip>
          <TooltipTrigger asChild>
            <HoverButton
              variant="ghost"
              size="icon"
              className={cn("p-0 w-8 h-8", liked && "text-muwakkil-purple dark:text-primary")}
              onClick={handleLike}
              aria-label={liked ? "Remove like" : "Like"}
            >
              <ThumbsUpIcon />
            </HoverButton>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">
            {liked ? "Remove like" : "Like response"}
          </TooltipContent>
        </Tooltip>

        {/* Dislike button - Removed border */}
        <Tooltip>
          <TooltipTrigger asChild>
            <HoverButton
              variant="ghost"
              size="icon"
              className={cn("p-0 w-8 h-8", disliked && "text-muwakkil-purple dark:text-primary")}
              onClick={handleDislike}
              aria-label={disliked ? "Remove dislike" : "Dislike"}
            >
              <ThumbsDownIcon />
            </HoverButton>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">
            {disliked ? "Remove dislike" : "Dislike response"}
          </TooltipContent>
        </Tooltip>

        {/* Regenerate button - Removed border */}
        <Tooltip>
          <TooltipTrigger asChild>
            <HoverButton
              variant="ghost"
              size="icon"
              className="p-0 w-8 h-8"
              onClick={() => onRegenerateResponse && onRegenerateResponse()}
              aria-label="Regenerate"
            >
              <RefreshCcw size={16} strokeWidth={1.5} />
            </HoverButton>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">Regenerate response</TooltipContent>
        </Tooltip>

        {/* Bookmark button - Removed border */}
        <Tooltip>
          <TooltipTrigger asChild>
            <HoverButton
              variant="ghost"
              size="icon"
              className="p-0 w-8 h-8"
              onClick={handleBookmark}
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
            >
              {bookmarked ? (
                <BookmarkCheck size={16} strokeWidth={1.5} className="text-muwakkil-purple dark:text-primary" />
              ) : (
                <Bookmark size={16} strokeWidth={1.5} />
              )}
            </HoverButton>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">
            {bookmarked ? "Remove bookmark" : "Bookmark this response"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default MessageActions;
