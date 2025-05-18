import { PostItem } from '@/components/forum/PostItem';
import { ReplyForm } from '@/components/forum/ReplyForm';
import type { Thread, Post, User } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MessageSquare, Clock, Edit2, Trash2, ShieldAlert, Bookmark, Share2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns'; // For more control over date formatting

// Placeholder data
const mockUser: User = { id: 'user1', username: 'JohnDoe', avatarUrl: 'https://placehold.co/40x40.png?text=JD', joinDate: '2023-01-01T00:00:00Z' };
const mockUser2: User = { id: 'user2', username: 'JaneSmith', avatarUrl: 'https://placehold.co/40x40.png?text=JS', joinDate: '2023-02-15T00:00:00Z' };

const mockThreads: Record<string, Thread & { initialPostContent: string }> = {
  'my-first-week-pacemaker': { 
    id: 'thread1', 
    title: 'My first week with a pacemaker: A rollercoaster of emotions and experiences', 
    slug: 'my-first-week-pacemaker',
    categoryId: '1', 
    categoryName: 'General Discussion', 
    author: mockUser, 
    createdAt: '2024-07-27T10:00:00Z', 
    updatedAt: '2024-07-27T10:00:00Z', 
    replyCount: 2, 
    viewCount: 250, 
    lastReplyAt: '2024-07-28T14:30:00Z',
    initialPostContent: "<p>Hello everyone, I just got my pacemaker a week ago and wanted to share my experience. It's been quite an adjustment, both physically and mentally. The first few days were tough with soreness and anxiety, but I'm starting to feel a bit better. Has anyone else felt this way? Any tips for managing the initial recovery period?</p><p>I'm particularly interested in hearing about:</p><ul><li>Sleeping positions</li><li>Dealing with the 'pacemaker awareness' feeling</li><li>When you started feeling 'normal' again</li></ul><p>Thanks for listening!</p>"
  },
};

const mockPosts: Post[] = [
  { id: 'post1', author: mockUser2, content: '<p>Hi John, welcome to the club! I totally remember feeling that way. The soreness gets better day by day. For sleeping, I found propping myself up with a few pillows helped. The "awareness" feeling fades over time too. Hang in there!</p>', createdAt: '2024-07-27T11:30:00Z', threadId: 'thread1', reactions: { like: 5 } },
  { id: 'post2', author: mockUser, content: '<p>Thanks, Jane! That\'s really reassuring to hear. I\'ll try the pillow trick tonight. Did you find any specific exercises helpful early on, or just rest?</p>', createdAt: '2024-07-27T12:15:00Z', threadId: 'thread1', reactions: { like: 2 } },
];

type ThreadPageProps = {
  params: { slug: string };
};

export default function ThreadPage({ params }: ThreadPageProps) {
  const { slug } = params;
  const thread = mockThreads[slug];

  if (!thread) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-semibold">Thread not found</h1>
        <p className="text-muted-foreground">The thread you are looking for does not exist or has been moved.</p>
        <Link href="/" className="mt-4 inline-block">
          <Button>Go to Homepage</Button>
        </Link>
      </div>
    );
  }
  
  const initialPost: Post = {
    id: 'initialPost',
    author: thread.author,
    content: thread.initialPostContent,
    createdAt: thread.createdAt,
    threadId: thread.id,
  };
  const replies = mockPosts.filter(post => post.threadId === thread.id);

  return (
    <div className="space-y-8">
      <header className="bg-card p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 mb-2">
          <Link href={`/categories/${thread.categoryName.toLowerCase().replace(/\s+/g, '-')}`}>
            <Badge variant="secondary">{thread.categoryName}</Badge>
          </Link>
          {thread.isPinned && <Badge variant="outline" className="bg-accent text-accent-foreground">Pinned</Badge>}
          {thread.isLocked && <Badge variant="destructive">Locked</Badge>}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">{thread.title}</h1>
        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={thread.author.avatarUrl || `https://placehold.co/24x24.png?text=${thread.author.username.charAt(0)}`} alt={thread.author.username} data-ai-hint="avatar person"/>
              <AvatarFallback>{thread.author.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span>By <span className="font-medium text-foreground">{thread.author.username}</span></span>
          </div>
          <span className="flex items-center"><Clock className="mr-1 h-4 w-4" /> Created: {format(new Date(thread.createdAt), "MMM d, yyyy 'at' h:mm a")}</span>
          <span className="flex items-center"><Eye className="mr-1 h-4 w-4" /> {thread.viewCount} views</span>
          <span className="flex items-center"><MessageSquare className="mr-1 h-4 w-4" /> {thread.replyCount} replies</span>
        </div>
        <div className="mt-4 flex space-x-2">
            <Button variant="outline" size="sm"><Bookmark className="mr-1 h-4 w-4"/> Bookmark</Button>
            <Button variant="outline" size="sm"><Share2 className="mr-1 h-4 w-4"/> Share</Button>
            {/* Placeholder for Thread-specific actions like Edit/Delete if user is author/admin */}
        </div>
      </header>

      <div className="space-y-6">
        <PostItem post={initialPost} isThreadCreatorPost={true} />
        {replies.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>

      {!thread.isLocked && <ReplyForm threadId={thread.id} />}
      {thread.isLocked && (
        <div className="text-center py-6 bg-muted/50 rounded-lg">
            <p className="font-semibold text-muted-foreground">This thread is locked. No new replies can be posted.</p>
        </div>
      )}
    </div>
  );
}

// Basic generateStaticParams for Next.js to know possible thread slugs
export async function generateStaticParams() {
  return Object.keys(mockThreads).map(slug => ({ slug }));
}
