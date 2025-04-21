'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

export default function SnippetsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const snippets = useQuery(api.linkedout.getTextSnippets);
  const addSnippet = useMutation(api.linkedout.addTextSnippet);
  const deleteSnippet = useMutation(api.linkedout.deleteTextSnippet);

  const [isAdding, setIsAdding] = useState(false);
  const [newSnippetName, setNewSnippetName] = useState('');
  const [newSnippetValue, setNewSnippetValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSnippet = async () => {
    if (!newSnippetName.trim() || !newSnippetValue.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      await addSnippet({
        name: newSnippetName.trim(),
        value: newSnippetValue.trim(),
      });
      
      setNewSnippetName('');
      setNewSnippetValue('');
      setIsAdding(false);
      
      toast({
        title: 'Snippet added',
        description: 'Your text snippet has been added successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add snippet',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSnippet = async (id: Id<"textSnippets">) => {
    try {
      await deleteSnippet({ id });
      
      toast({
        title: 'Snippet deleted',
        description: 'Your text snippet has been deleted.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete snippet',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => router.push('/dashboard/linkedout/inbox')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Inbox
        </Button>
        <h1 className="text-2xl font-bold ml-4">Text Snippets</h1>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground mb-4">
          Create and manage text snippets that you can quickly insert into your LinkedIn messages.
        </p>

        {!isAdding ? (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Snippet
          </Button>
        ) : (
          <div className="border border-border rounded-lg p-4">
            <h2 className="text-lg font-medium mb-4">New Snippet</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  value={newSnippetName}
                  onChange={(e) => setNewSnippetName(e.target.value)}
                  placeholder="E.g., Introduction, Thank You, etc."
                  className="w-full max-w-lg"
                />
              </div>
              <div>
                <label htmlFor="value" className="block text-sm font-medium mb-1">
                  Content
                </label>
                <Textarea
                  id="value"
                  value={newSnippetValue}
                  onChange={(e) => setNewSnippetValue(e.target.value)}
                  placeholder="The text content of your snippet..."
                  className="w-full max-w-2xl min-h-[100px]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    setNewSnippetName('');
                    setNewSnippetValue('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddSnippet}
                  disabled={!newSnippetName.trim() || !newSnippetValue.trim() || isSubmitting}
                >
                  {isSubmitting ? 'Adding...' : 'Add Snippet'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border border-border rounded-lg divide-y divide-border max-w-4xl">
        {snippets === undefined ? (
          <div className="p-4 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-foreground mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading snippets...</p>
          </div>
        ) : snippets.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No snippets available. Add your first snippet to get started.</p>
          </div>
        ) : (
          snippets.map((snippet) => (
            <div key={snippet.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{snippet.name}</h3>
                  <p className="mt-1 text-muted-foreground whitespace-pre-line">{snippet.value}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                  onClick={() => handleDeleteSnippet(snippet.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 