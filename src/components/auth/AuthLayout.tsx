import type React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary">
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
