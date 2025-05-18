import { CategoryCard } from '@/components/forum/CategoryCard';
import type { Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Activity, MessageCircle, HeartPulse, Users } from 'lucide-react'; // Added Users import
import Image from 'next/image';

// Placeholder data
const categories: Category[] = [
  { id: '1', name: 'General Discussion', description: 'Talk about anything related to pacemakers and heart health.', slug: 'general-discussion', threadCount: 120, postCount: 1500, icon: MessageCircle },
  { id: '2', name: 'Living with a Pacemaker', description: 'Share experiences and tips for daily life.', slug: 'living-with-pacemaker', threadCount: 85, postCount: 980, icon: HeartPulse },
  { id: '3', name: 'Technical Questions', description: 'Ask about pacemaker technology and functions.', slug: 'technical-questions', threadCount: 45, postCount: 300, icon: Activity },
  { id: '4', name: 'Support for Family & Friends', description: 'A place for loved ones to connect and share.', slug: 'family-friends-support', threadCount: 60, postCount: 750, icon: Users },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-card rounded-lg shadow-md">
        <div className="container mx-auto px-4">
          <Image 
            src="https://placehold.co/1200x400.png" 
            alt="Community banner" 
            width={1200} 
            height={400} 
            className="rounded-lg mb-8 mx-auto"
            data-ai-hint="community health" 
          />
          <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
            Welcome to HeartConnect Forum
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A supportive community for pacemaker patients, their families, and friends. Share experiences, ask questions, and find support.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/threads/create">
              <Button size="lg">
                <PlusCircle className="mr-2 h-5 w-5" /> Start a Discussion
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline">
                Explore Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">Forum Categories</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
      
      <section className="py-10 bg-card rounded-lg shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-muted-foreground mb-6">
            Create an account to participate in discussions, share your story, and connect with others.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/signup">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Sign Up Now</Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
