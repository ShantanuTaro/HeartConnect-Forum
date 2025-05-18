"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Heading2, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea'; // Fallback

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
};

// Helper to sanitize HTML (very basic)
const sanitizeHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.innerHTML;
};

export function RichTextEditor({ value, onChange, placeholder, minHeight = '200px' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value, isClient]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(sanitizeHtml(editorRef.current.innerHTML));
    }
  };

  const execCommand = (command: string, valueArg?: string) => {
    if (isClient) {
      document.execCommand(command, false, valueArg);
      editorRef.current?.focus();
      handleInput(); // Update state after command
    }
  };

  if (!isClient) {
    // Fallback to Textarea during SSR or if client-side enhancements fail
    return (
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ minHeight }}
        className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
      />
    );
  }

  return (
    <div className="border rounded-md shadow-sm">
      <div className="flex items-center space-x-1 p-2 border-b bg-muted/50 rounded-t-md">
        <Button variant="ghost" size="icon" onClick={() => execCommand('bold')} title="Bold (Ctrl+B)">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => execCommand('italic')} title="Italic (Ctrl+I)">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => execCommand('underline')} title="Underline (Ctrl+U)">
          <Underline className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => execCommand('insertUnorderedList')} title="Bullet List">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => execCommand('insertOrderedList')} title="Numbered List">
          <ListOrdered className="h-4 w-4" />
        </Button>
         <Button variant="ghost" size="icon" onClick={() => execCommand('formatBlock', '<h2>')} title="Heading 2">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => execCommand('formatBlock', '<blockquote>')} title="Quote">
          <Quote className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        data-placeholder={placeholder}
        style={{ minHeight }}
        className={cn(
          "w-full p-3 prose prose-sm max-w-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded-b-md",
          !value && "before:content-[attr(data-placeholder)] before:text-muted-foreground before:absolute"
        )}
        role="textbox"
        aria-multiline="true"
      />
    </div>
  );
}
