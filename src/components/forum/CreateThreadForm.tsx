"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "./RichTextEditor";
import { useToast } from "@/hooks/use-toast";
import type { Category } from "@/lib/types";

// Placeholder categories
const mockCategories: Category[] = [
  { id: '1', name: 'General Discussion', slug: 'general-discussion', description: '', threadCount: 0, postCount: 0 },
  { id: '2', name: 'Living with a Pacemaker', slug: 'living-with-pacemaker', description: '', threadCount: 0, postCount: 0 },
  { id: '3', name: 'Technical Questions', slug: 'technical-questions', description: '', threadCount: 0, postCount: 0 },
  { id: '4', name: 'Support for Family & Friends', slug: 'family-friends-support', description: '', threadCount: 0, postCount: 0 },
];


const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters.").max(150, "Title must be at most 150 characters."),
  categoryId: z.string().min(1, "Please select a category."),
  content: z.string().min(10, "Content must be at least 10 characters."),
});

export function CreateThreadForm() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const defaultCategoryId = searchParams.get("category") 
    ? mockCategories.find(cat => cat.slug === searchParams.get("category"))?.id || "" 
    : "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      categoryId: defaultCategoryId,
      content: "",
    },
  });

  // Update default categoryId if searchParam changes and form hasn't been touched
  useEffect(() => {
    if (isClient && !form.formState.isDirty) {
        const categorySlugFromQuery = searchParams.get("category");
        const categoryFromQuery = mockCategories.find(cat => cat.slug === categorySlugFromQuery);
        if (categoryFromQuery) {
            form.setValue("categoryId", categoryFromQuery.id);
        }
    }
  }, [searchParams, form, isClient]);


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("New thread values:", values);
    toast({
      title: "Thread Creation Attempted",
      description: "This is a demo. Thread creation is not implemented.",
      variant: "default",
    });
    // Simulate successful submission and redirect
    // In a real app, you'd get the new thread ID and redirect to it.
    // router.push(`/threads/new-thread-slug`);
    form.reset({ categoryId: values.categoryId, title: "", content: "" }); // Keep category selected
  }

  if (!isClient) {
    return <div>Loading form...</div>; // Or a skeleton loader
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Thread Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a descriptive title for your discussion" {...field} className="text-base"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-base">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Your Post</FormLabel>
              <FormControl>
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Share your thoughts, experiences, or questions..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" size="lg">Create Thread</Button>
        </div>
      </form>
    </Form>
  );
}
