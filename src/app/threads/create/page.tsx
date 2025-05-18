import { CreateThreadForm } from "@/components/forum/CreateThreadForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from 'react';

function CreateThreadFormWrapper() {
  return <CreateThreadForm />;
}


export default function CreateThreadPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-primary">Start a New Discussion</CardTitle>
          <CardDescription>
            Share your thoughts, ask questions, or start a conversation with the community.
            Please be respectful and follow our community guidelines.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading form...</div>}>
            <CreateThreadFormWrapper />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
