import type { LucideIcon } from 'lucide-react';

export type User = {
  id: string;
  username: string;
  avatarUrl?: string;
  joinDate: string; // ISO date string
};

export type Category = {
  id: string;
  name: string;
  description: string;
  icon?: LucideIcon; // Optional: Lucide icon component
  threadCount: number;
  postCount: number;
  slug: string;
};

export type Thread = {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  author: User;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  replyCount: number;
  viewCount: number;
  lastReplyAt?: string; // ISO date string
  isPinned?: boolean;
  isLocked?: boolean;
};

export type Post = {
  id:string;
  author: User;
  content: string; // HTML content from rich text editor
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
  threadId: string;
  isModerated?: boolean; // For content moderation indication
  reactions?: Record<string, number>; // e.g. { like: 10, heart: 5 }
};

export type RichTextEditorContent = string; // Could be more complex, e.g., a structured format
