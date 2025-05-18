import { ThreadListItem } from '@/components/forum/ThreadListItem';
import type { Thread, User, Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Rss } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Placeholder data
const mockUser: User = { id: 'user1', username: 'JohnDoe', avatarUrl: 'https://placehold.co/40x40.png?text=JD', joinDate: '2023-01-01T00:00:00Z' };
const mockUser2: User = { id: 'user2', username: 'JaneSmith', avatarUrl: 'https://placehold.co/40x40.png?text=JS', joinDate: '2023-02-15T00:00:00Z' };

const mockCategories: Record<string, Category> = {
  'general-discussion': { id: '1', name: 'General Discussion', description: 'Talk about anything related to pacemakers and heart health.', slug: 'general-discussion', threadCount: 120, postCount: 1500 },
  'living-with-pacemaker': { id: '2', name: 'Living with a Pacemaker', description: 'Share experiences and tips for daily life.', slug: 'living-with-pacemaker', threadCount: 85, postCount: 980 },
};

const mockThreads: Thread[] = [
  { id: 'thread1', title: 'My first week with a pacemaker', slug: 'my-first-week-pacemaker', categoryId: '1', categoryName: 'General Discussion', author: mockUser, createdAt: '2024-07-27T10:00:00Z', updatedAt: '2024-07-27T10:00:00Z', replyCount: 15, viewCount: 250, lastReplyAt: '2024-07-28T14:30:00Z' },
  { id: 'thread2', title: 'Best exercises for pacemaker patients?', slug: 'best-exercises-pacemaker', categoryId: '2', categoryName: 'Living with a Pacemaker', author: mockUser2, createdAt: '2024-07-26T15:20:00Z', updatedAt: '2024-07-26T15:20:00Z', replyCount: 8, viewCount: 180, lastReplyAt: '2024-07-28T09:10:00Z', isPinned: true },
  { id: 'thread3', title: 'Understanding pacemaker battery life', slug: 'pacemaker-battery-life', categoryId: '1', categoryName: 'General Discussion', author: mockUser, createdAt: '2024-07-25T08:00:00Z', updatedAt: '2024-07-25T08:00:00Z', replyCount: 22, viewCount: 350, lastReplyAt: '2024-07-27T18:45:00Z' },
];

type CategoryPageProps = {
  params: { slug: string };
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const category = mockCategories[slug] || { name: "Unknown Category", description: "Category not found.", slug: "unknown" };
  const threadsInCategory = mockThreads.filter(thread => thread.categoryName.toLowerCase().replace(/\s+/g, '-') === slug);

  return (
    <div className="space-y-6">
      <header className="py-8 bg-card rounded-lg shadow">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary">{category.name}</h1>
              <p className="mt-2 text-muted-foreground">{category.description}</p>
            </div>
            <div className="flex space-x-2">
              <Link href={`/threads/create?category=${slug}`}>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Thread
                </Button>
              </Link>
              <Button variant="outline">
                <Rss className="mr-2 h-4 w-4" /> Subscribe
              </Button>
            </div>
          </div>
        </div>
      </header>

      {threadsInCategory.length > 0 ? (
        <div className="space-y-4">
          {threadsInCategory.map((thread) => (
            <ThreadListItem key={thread.id} thread={thread} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card rounded-lg shadow">
          <p className="text-xl text-muted-foreground">No threads found in this category yet.</p>
          <Link href={`/threads/create?category=${slug}`} className="mt-4 inline-block">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Be the first to create one!
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

// Basic generateStaticParams for Next.js to know possible category slugs
export async function generateStaticParams() {
  return Object.keys(mockCategories).map(slug => ({ slug }));
}
