"use client";

import type { Post } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquareReply, ShieldAlert, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import React, { useEffect, useState } from 'react'; // For client-side date formatting

type PostItemProps = {
  post: Post;
  isThreadCreatorPost?: boolean;
};

export function PostItem({ post, isThreadCreatorPost = false }: PostItemProps) {
  const { toast } = useToast();
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    try {
      setTimeAgo(formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }));
    } catch (error) {
      console.error("Error formatting date:", error);
      setTimeAgo("Invalid date");
    }
  }, [post.createdAt]);

  const handleReport = () => {
    toast({
      title: "Report Submitted",
      description: "Thank you for your report. Our moderation team will review this post.",
    });
  };
  
  const handleEdit = () => {
     toast({ title: "Edit Post", description: "Edit functionality not yet implemented."});
  }

  const handleDelete = () => {
     toast({ title: "Delete Post", description: "Delete functionality not yet implemented."});
  }

  return (
    <div className={`flex space-x-4 p-4 ${isThreadCreatorPost ? 'bg-card' : 'bg-card'} border rounded-lg shadow-sm`}>
      <Avatar className="mt-1 h-10 w-10">
        <AvatarImage src={post.author.avatarUrl || `https://placehold.co/40x40.png?text=${post.author.username.charAt(0)}`} alt={post.author.username} data-ai-hint="avatar person" />
        <AvatarFallback>{post.author.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-primary">{post.author.username}</span>
            <span className="ml-2 text-xs text-muted-foreground">
              {isThreadCreatorPost && "(Thread Starter)"} • Posted {timeAgo}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit2 className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleReport}>
                <ShieldAlert className="mr-2 h-4 w-4" /> Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Ensure prose styles apply for rich text content */}
        <div
          className="mt-2 prose prose-sm max-w-none text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="mt-4 flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <ThumbsUp className="mr-1 h-4 w-4" /> Like ({post.reactions?.like || 0})
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <MessageSquareReply className="mr-1 h-4 w-4" /> Reply
          </Button>
        </div>
      </div>
    </div>
  );
}
