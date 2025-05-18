import type { Category } from '@/lib/types';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, Tag } from 'lucide-react'; // Example icons

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = category.icon || Tag;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <IconComponent className="h-10 w-10 text-primary" />
        <div>
          <CardTitle className="text-xl">
            <Link href={`/categories/${category.slug}`} className="hover:underline">
              {category.name}
            </Link>
          </CardTitle>
          <CardDescription>{category.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-4">
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MessageSquare className="mr-1 h-4 w-4" />
            <span>{category.threadCount} threads</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            <span>{category.postCount} posts</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/categories/${category.slug}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Category
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
