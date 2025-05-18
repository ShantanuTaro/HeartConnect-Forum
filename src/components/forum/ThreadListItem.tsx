import type { Thread } from '@/lib/types';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Eye, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type ThreadListItemProps = {
  thread: Thread;
};

export function ThreadListItem({ thread }: ThreadListItemProps) {
  const timeAgo = (dateString: string | undefined) => {
    if (!dateString) return '';
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };
  
  return (
    <div className="flex items-start space-x-4 p-4 border-b hover:bg-secondary/50 transition-colors duration-150 rounded-lg">
      <Avatar>
        <AvatarImage src={thread.author.avatarUrl || `https://placehold.co/40x40.png?text=${thread.author.username.charAt(0)}`} alt={thread.author.username} data-ai-hint="avatar person" />
        <AvatarFallback>{thread.author.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">
          <Link href={`/threads/${thread.slug}`} className="hover:text-primary transition-colors">
            {thread.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">
          Started by <span className="font-medium text-foreground">{thread.author.username}</span> in <Link href={`/categories/${thread.categoryId}`} className="text-primary hover:underline">{thread.categoryName}</Link>
        </p>
        <div className="mt-1 flex items-center space-x-4 text-xs text-muted-foreground">
          <span className="flex items-center">
            <MessageSquare className="mr-1 h-3 w-3" /> {thread.replyCount} replies
          </span>
          <span className="flex items-center">
            <Eye className="mr-1 h-3 w-3" /> {thread.viewCount} views
          </span>
          <span className="flex items-center">
            <Clock className="mr-1 h-3 w-3" /> Created {timeAgo(thread.createdAt)}
          </span>
          {thread.lastReplyAt && (
             <span className="hidden sm:flex items-center">
              <Clock className="mr-1 h-3 w-3" /> Last reply {timeAgo(thread.lastReplyAt)}
            </span>
          )}
        </div>
      </div>
      {thread.lastReplyAt && (
        <div className="hidden md:flex flex-col items-end text-xs text-muted-foreground min-w-[120px]">
          <span>Last reply</span>
          <span>{timeAgo(thread.lastReplyAt)}</span>
        </div>
      )}
    </div>
  );
}
