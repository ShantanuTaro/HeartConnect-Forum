"use client";

import Link from 'next/link';
import { Heart, UserCircle, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig, mainNav } from '@/constants/site';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import * as React from 'react'; // Import React for useState and useEffect

export function Navbar() {
  const pathname = usePathname();
  // Placeholder for authentication state
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    // In a real app, you would check auth status here, e.g., from a context or cookie
    // For demo purposes, let's toggle auth status after a delay
    const timer = setTimeout(() => setIsAuthenticated(Math.random() > 0.5), 2000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">{siteConfig.name}</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          {isClient ? ( // Render auth buttons only on client after hydration
            isAuthenticated ? (
              <Link href="/profile">
                <Button variant="ghost" size="icon" aria-label="Profile">
                  <UserCircle className="h-6 w-6" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                  </Button>
                </Link>
              </>
            )
          ) : (
            <>
              <Button variant="ghost" disabled>
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
              <Button disabled>
                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
