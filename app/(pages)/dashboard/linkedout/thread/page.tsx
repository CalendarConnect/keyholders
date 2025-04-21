'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, Suspense } from 'react';
import { ArrowLeft, Wand2, LogOut, Expand, Shrink, Clipboard, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { format, formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useClerk } from '@clerk/nextjs';

// TextSnippet interface
interface TextSnippet {
  id: Id<"textSnippets">;
  name: string;
  value: string;
}

interface Author {
  id?: string;
  name: string;
  linkedinUrl?: string;
  threadUrl?: string;
  avatarUrl?: string;
}

interface Message {
  id: string;
  content: string;
  isFromMe: string;
  lastUpdated: string;
  linkedinProfileURL: string;
  recipientLinkedInFollowerCount: string;
  recipientName: string;
  avatar?: string;
  chatId?: string;
}

// Simple draft generator function
async function generateDraft(
  data: {
    toFullName: string;
    messageToReplyTo: string;
    messageCategory: string;
  },
): Promise<{ draftReply: string }> {
  try {
    // Use a simple template for the draft reply
    const draftReply = `Hi ${data.toFullName},

Thank you for your message! I appreciate you reaching out.

${data.messageCategory === 'love-your-content' 
      ? 'I\'m glad you enjoyed my content. Would you like to discuss any specific aspects of it?'
      : 'I\'d be interested in hearing more about your collaboration proposal.'}

Looking forward to your response!

Best regards`;

    return { draftReply };
  } catch (error) {
    return {
      draftReply: "Sorry, I couldn't generate a draft reply at the moment. Please try again later."
    };
  }
}

function Avatar({ author }: { author: Author }) {
  if (author.avatarUrl) {
    return (
      <img 
        src={author.avatarUrl} 
        alt={author.name}
        className="w-8 h-8 rounded-full"
      />
    );
  }

  const initials = author.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const backgroundColor = stringToColor(author.name);

  return (
    <div 
      className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-primary-foreground'
      )}
      style={{ backgroundColor }}
    >
      {initials}
    </div>
  );
}

function MessageGroup({ message }: { message: Message }) {
  const isUrl = (text: string) => {
    const urlPattern = /https?:\/\/[^\s]+/g;
    return urlPattern.test(text);
  };

  const formatMessage = (content: string) => {
    if (!content) return '';
    
    // Split text into URLs and non-URLs
    const parts = content.split(/(https?:\/\/[^\s]+)/g);
    
    return parts.map((part, index) => {
      if (isUrl(part)) {
        return (
          <a 
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline break-all inline-block"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {part}
          </a>
        );
      }
      return <span key={index} className="break-words">{part}</span>;
    });
  };

  const isMe = message.isFromMe === "true";
  const initial = message.recipientName ? message.recipientName[0]?.toUpperCase() : '?';
  const date = message.lastUpdated ? new Date(message.lastUpdated) : new Date();

  return (
    <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-8 group relative">
      <div className="flex-shrink-0">
        {isMe ? (
          <div className={cn(
            "w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-xl font-medium border-2",
            "bg-primary text-primary-foreground border-primary"
          )}>
            Me
          </div>
        ) : (
          <img 
            src={message.avatar || ''}
            alt={message.recipientName}
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-border object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = `
                <div class="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-xl font-medium border-2 bg-background text-foreground border-border">
                  ${initial}
                </div>
              `;
            }}
          />
        )}
      </div>
      <div className="flex-grow space-y-1 min-w-0 pr-4 sm:pr-20">
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <span className="font-semibold text-base sm:text-lg truncate">
            {isMe ? "You" : message.recipientName || 'Unknown'}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground">
            {format(date, "MMM d, yyyy 'at' h:mm a")}
          </span>
        </div>
        <div className="text-sm sm:text-base text-muted-foreground break-words whitespace-pre-line">
          {formatMessage(message.content || '')}
        </div>
      </div>
    </div>
  );
}

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 65%, 25%)`; // Dark mode friendly
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center py-4">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-foreground"></div>
    </div>
  );
}

function ThreadPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reply, setReply] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { signOut } = useClerk();

  // Get the thread ID from search params
  const threadId = searchParams?.get('id');

  // Fetch thread messages using Convex
  const threadMessages = useQuery(api.linkedout.getThreadById, threadId ? { threadId } : "skip");
  const addMessage = useMutation(api.linkedout.addMessage);

  // Fetch text snippets using Convex
  const textSnippets = useQuery(api.linkedout.getTextSnippets);
  const [isSnippetsOpen, setIsSnippetsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.push('/sign-in');
  };

  useEffect(() => {
    if (threadMessages !== undefined) {
      setIsLoading(false);
    }
  }, [threadMessages]);

  const handleGenerateDraft = async () => {
    setIsGenerating(true);
    try {
      const lastMessage = threadMessages?.[threadMessages.length - 1];
      
      const draftResponse = await generateDraft({
        toFullName: lastMessage?.recipientName || '',
        messageToReplyTo: lastMessage?.content || '',
        messageCategory: 'love-your-content'
      });
      
      setReply(draftResponse.draftReply);
      
      textareaRef.current?.scrollIntoView({ behavior: 'smooth' });
      textareaRef.current?.focus();
      
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async () => {
    if (!reply.trim() || isSending || !threadId) return;
    setIsSending(true);

    try {
      const firstMessage = threadMessages?.[0];
      
      await addMessage({
        content: reply,
        threadId,
        chatId: firstMessage?.chatId,
        recipientName: firstMessage?.recipientName,
        linkedinProfileURL: firstMessage?.linkedinProfileURL,
        isFromMe: true,
      });

      setReply('');
      
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully.",
      });

      // Refresh the page to see the new message
      window.location.reload();

    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleOpenLink = (url: string) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [threadMessages]);

  const handleRefresh = async () => {
    setIsLoading(true);
    window.location.reload();
  };

  // Function to insert snippet at cursor position or append to existing text
  const insertSnippet = (snippetValue: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      
      const newText = 
        reply.substring(0, selectionStart) + 
        snippetValue + 
        reply.substring(selectionEnd);
      
      setReply(newText);
      
      // Focus back on textarea after inserting snippet
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          selectionStart + snippetValue.length,
          selectionStart + snippetValue.length
        );
      }, 0);
    } else {
      // If textarea is not focused, append to the end
      setReply((prev) => {
        // Add a newline if there's already text and it doesn't end with one
        const separator = prev && !prev.endsWith('\n') ? '\n' : '';
        return prev + separator + snippetValue;
      });
    }
    
    // Close the popover after inserting
    setIsSnippetsOpen(false);
  };

  if (!threadId) {
    router.push('/dashboard/linkedout/inbox');
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner />
          <p className="text-muted-foreground">Loading conversation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6">
        <div className="text-destructive p-4 rounded-lg border border-destructive/50">
          {error}
        </div>
      </div>
    );
  }

  if (!threadMessages || threadMessages.length === 0) {
    return (
      <div className="flex-1 p-4 md:p-6">
        <div className="text-muted-foreground p-4 text-center">
          Thread not found
        </div>
      </div>
    );
  }

  const firstMessage = threadMessages[0];

  return (
    <div className="flex-1 p-4 md:p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => router.push('/dashboard/linkedout/inbox')}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Inbox</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
        </Button>
      </div>

      <div className="flex-1 flex flex-col min-h-0 mb-4">
        <div className="border border-border rounded-lg bg-background flex flex-col min-h-0 flex-1">
          {/* Profile header */}
          <div className="flex items-center p-4 border-b border-border">
            <div className="flex items-center gap-4">
              <img 
                src={firstMessage.avatar || ''}
                alt={firstMessage.recipientName}
                className="w-12 h-12 rounded-full border-2 border-border object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `
                    <div class="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-xl font-medium">
                      ${firstMessage.recipientName?.[0]?.toUpperCase()}
                    </div>
                  `;
                }}
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {firstMessage.recipientName || 'Unknown'}
                </h2>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>{firstMessage.recipientLinkedInFollowerCount} followers</span>
                  {firstMessage.linkedinProfileURL && (
                    <Button 
                      variant="link"
                      className="p-0 h-auto font-normal"
                      onClick={() => handleOpenLink(firstMessage.linkedinProfileURL)}
                    >
                      View LinkedIn profile
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Messages container with scroll */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {threadMessages.map((message) => (
                <MessageGroup 
                  key={message.id} 
                  message={message} 
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Reply section */}
        <div className="mt-4 rounded-xl border border-border bg-background p-4">
          <div className="flex flex-col gap-4">
            <div className="relative flex-grow">
              <Textarea
                ref={textareaRef}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write your reply..."
                className={cn(
                  "w-full resize-none p-4 pr-28 text-base transition-all duration-200",
                  isExpanded ? "min-h-[300px]" : "min-h-[100px]"
                )}
                disabled={isSending}
              />
              <div className="absolute top-3 right-3 flex gap-2 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted/50 bg-background"
                >
                  {isExpanded ? (
                    <Shrink className="h-5 w-5" />
                  ) : (
                    <Expand className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleGenerateDraft}
                  disabled={isGenerating}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted/50 bg-background"
                >
                  <Wand2 className="h-5 w-5 text-foreground" />
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Popover open={isSnippetsOpen} onOpenChange={setIsSnippetsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 px-4 text-muted-foreground hover:text-foreground"
                  >
                    <Clipboard className="h-4 w-4" />
                    Text Snippets
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-80 p-0" 
                  align="start"
                  side="top"
                  alignOffset={-50}
                  sideOffset={10}
                >
                  <div className="py-0">
                    <div className="px-4 py-4 border-b flex justify-between items-center">
                      <h3 className="font-medium">Text Snippets</h3>
                    </div>
                    
                    {textSnippets === undefined ? (
                      <div className="p-4 text-center">
                        <LoadingSpinner />
                      </div>
                    ) : textSnippets.length === 0 ? (
                      <div className="min-h-[105px] flex flex-col items-center justify-center gap-2 p-4">
                        <p className="text-sm text-muted-foreground text-center">
                          No text snippets available
                        </p>
                      </div>
                    ) : (
                      <ScrollArea className="min-h-[105px]">
                        <div className="py-1">
                          {textSnippets.map((snippet) => (
                            <button
                              key={snippet.id}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-muted/50 focus:bg-muted/50 focus:outline-none truncate"
                              onClick={() => insertSnippet(snippet.value)}
                            >
                              {snippet.name}
                            </button>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              <Button 
                size="lg"
                className="px-4 gap-2"
                disabled={!reply?.trim() || isSending}
                onClick={handleSend}
              >
                Send
                <svg 
                  viewBox="0 0 24 24" 
                  className="h-5 w-5" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M5 12H19M19 12L13 6M19 12L13 18" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThreadPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-foreground"></div>
          <p className="text-muted-foreground">Loading conversation...</p>
        </div>
      </div>
    }>
      <ThreadPageContent />
    </Suspense>
  );
} 