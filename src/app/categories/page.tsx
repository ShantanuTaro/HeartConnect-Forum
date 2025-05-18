import { CategoryCard } from '@/components/forum/CategoryCard';
import type { Category } from '@/lib/types';
import { MessageCircle, Users, Activity, HeartPulse } from 'lucide-react';

// Placeholder data, same as homepage for now
const categories: Category[] = [
  { id: '1', name: 'General Discussion', description: 'Talk about anything related to pacemakers and heart health.', slug: 'general-discussion', threadCount: 120, postCount: 1500, icon: MessageCircle },
  { id: '2', name: 'Living with a Pacemaker', description: 'Share experiences and tips for daily life.', slug: 'living-with-pacemaker', threadCount: 85, postCount: 980, icon: HeartPulse },
  { id: '3', name: 'Technical Questions', description: 'Ask about pacemaker technology and functions.', slug: 'technical-questions', threadCount: 45, postCount: 300, icon: Activity },
  { id: '4', name: 'Support for Family & Friends', description: 'A place for loved ones to connect and share.', slug: 'family-friends-support', threadCount: 60, postCount: 750, icon: Users },
];

export default function CategoriesPage() {
  return (
    <div className="space-y-8">
      <header className="py-8 text-center bg-card rounded-lg shadow">
        <h1 className="text-4xl font-bold text-primary">Forum Categories</h1>
        <p className="mt-2 text-muted-foreground">Explore various topics and discussions within our community.</p>
      </header>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
