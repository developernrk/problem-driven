'use client';

import { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {
  MessageCircle,
  Plus,
  Send,
  Trash2,
  Edit3,
  TrendingUp,
  Eye,
  Heart,
  Sparkles,
  Bot,
  User,
  Clock,
  Hash,
  Menu,
  X,
  Settings,
  MoreVertical,
  Square
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Markdown } from '@/components/ui/markdown';
import { toast } from 'sonner';
import Navigation from '@/components/layout/Navigation';
import { useStreamingChat } from '@/hooks/useStreamingChat';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  isStreaming?: boolean;
}

interface ChatThread {
  _id: string;
  title: string;
  messages: ChatMessage[];
  messageCount: number;
  lastMessage: string;
  lastMessageAt: Date;
  createdAt: Date;
}

interface TrendingIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  stats: {
    views: number;
    likes: number;
  };
  isNew: boolean;
}

export default function ChatPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [currentThread, setCurrentThread] = useState<ChatThread | null>(null);
  const [trendingIdeas, setTrendingIdeas] = useState<TrendingIdea[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [streamingMessages, setStreamingMessages] = useState<Map<string, string>>(new Map());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Streaming chat hook
  const { isStreaming, sendStreamingMessage, cancelStream } = useStreamingChat(
    // onUserMessage
    (userMessage) => {
      setCurrentThread(prev => prev ? {
        ...prev,
        messages: [...prev.messages, userMessage]
      } : null);
    },
    // onAIMessageStart
    (messageId, timestamp) => {
      const aiMessage: ChatMessage = {
        id: messageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(timestamp),
        isStreaming: true
      };
      setCurrentThread(prev => prev ? {
        ...prev,
        messages: [...prev.messages, aiMessage]
      } : null);
    },
    // onAIMessageChunk
    (messageId, chunk, fullContent) => {
      setStreamingMessages(prev => new Map(prev.set(messageId, fullContent)));
      setCurrentThread(prev => {
        if (!prev) return null;
        
return {
          ...prev,
          messages: prev.messages.map(msg => 
            msg.id === messageId 
              ? { ...msg, content: fullContent, isStreaming: true }
              : msg
          )
        };
      });
    },
    // onAIMessageComplete
    (aiMessage, threadData) => {
      setStreamingMessages(prev => {
        const newMap = new Map(prev);
        newMap.delete(aiMessage.id);
        
return newMap;
      });
      
      setCurrentThread(prev => {
        if (!prev) return null;
        
return {
          ...prev,
          messages: prev.messages.map(msg => 
            msg.id === aiMessage.id 
              ? { ...aiMessage, isStreaming: false }
              : msg
          )
        };
      });

      // Update threads list
      setThreads(prev => prev.map(thread =>
        thread._id === threadData._id
          ? { ...thread, messageCount: threadData.messageCount, lastMessageAt: new Date() }
          : thread
      ));
    },
    // onError
    (error) => {
      toast.error(error);
    }
  );

  // Redirect if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isSignedIn, isLoaded, router]);

  // Load threads and trending ideas
  useEffect(() => {
    if (isSignedIn) {
      loadThreads();
      loadTrendingIdeas();
    }
  }, [isSignedIn]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [currentThread?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadThreads = async () => {
    try {
      const response = await fetch('/api/chat/threads');
      if (response.ok) {
        const data = await response.json();
        setThreads(data);

        // Auto-select first thread if available
        if (data.length > 0 && !currentThread) {
          loadThread(data[0]._id);
        }
      }
    } catch (error) {
      console.error('Error loading threads:', error);
      toast.error('Failed to load chat threads');
    }
  };

  const loadTrendingIdeas = async () => {
    try {
      const response = await fetch('/api/chat/trending');
      if (response.ok) {
        const data = await response.json();
        setTrendingIdeas(data);
      }
    } catch (error) {
      console.error('Error loading trending ideas:', error);
    }
  };

  const loadThread = async (threadId: string) => {
    try {
      const response = await fetch(`/api/chat/threads/${threadId}`);
      if (response.ok) {
        const data = await response.json();
        setCurrentThread(data);
      }
    } catch (error) {
      console.error('Error loading thread:', error);
      toast.error('Failed to load chat thread');
    }
  };

  const createNewThread = async () => {
    try {
      const title = `Chat ${new Date().toLocaleDateString()}`;
      const response = await fetch('/api/chat/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });

      if (response.ok) {
        const newThread = await response.json();
        setThreads(prev => [newThread, ...prev]);
        setCurrentThread(newThread);
        toast.success('New chat thread created');
      }
    } catch (error) {
      console.error('Error creating thread:', error);
      toast.error('Failed to create new chat thread');
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !currentThread || isLoading || isStreaming) return;

    const messageContent = message.trim();
    setMessage('');
    setIsLoading(true);

    try {
      await sendStreamingMessage(currentThread._id, messageContent);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteThread = async (threadId: string) => {
    try {
      const response = await fetch(`/api/chat/threads/${threadId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setThreads(prev => prev.filter(thread => thread._id !== threadId));
        if (currentThread?._id === threadId) {
          setCurrentThread(null);
        }
        toast.success('Chat thread deleted');
      }
    } catch (error) {
      console.error('Error deleting thread:', error);
      toast.error('Failed to delete chat thread');
    }
  };

  const formatTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date | string) => {
    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <Navigation />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      <div className="h-[calc(100vh-80px)] flex">
        {/* Left Sidebar - Chat Threads */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-30 w-80 h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col transition-transform duration-300 ease-in-out`}>
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <div className="p-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg mr-3">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                AI Chat
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={createNewThread}
                  size="sm"
                  className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-4">
            {threads.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="p-4 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900/20 dark:to-blue-900/20 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <MessageCircle className="h-10 w-10 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No conversations yet</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Start your first AI conversation to get personalized business insights</p>
                <Button
                  onClick={createNewThread}
                  className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Chat
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {threads.map((thread) => (
                  <Card
                    key={thread._id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] group ${
                      currentThread?._id === thread._id
                        ? 'ring-2 ring-teal-500 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 shadow-lg'
                        : 'bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80'
                    }`}
                    onClick={() => {
                      loadThread(thread._id);
                      setSidebarOpen(false);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate mb-1">
                            {thread.title}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                            {thread.lastMessage}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-3">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatDate(thread.lastMessageAt)}
                              </span>
                              <span className="flex items-center">
                                <Hash className="h-3 w-3 mr-1" />
                                {thread.messageCount}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteThread(thread._id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Center - Chat Messages */}
        <div className="flex-1 flex flex-col min-w-0">
          {currentThread ? (
            <>
              {/* Chat Header */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="lg:hidden"
                      onClick={() => setSidebarOpen(true)}
                    >
                      <Menu className="h-4 w-4" />
                    </Button>
                    <div className="p-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                        {currentThread.title}
                      </h1>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {currentThread.messages.length} messages • AI Assistant
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-6 space-y-6">
                    {currentThread.messages.map((msg, index) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <Avatar className="h-10 w-10 mx-3 shadow-md">
                            {msg.role === 'user' ? (
                              <AvatarImage src={user?.imageUrl} />
                            ) : (
                              <AvatarFallback className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                                <Bot className="h-5 w-5" />
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div
                            className={`rounded-2xl p-4 shadow-lg ${
                              msg.role === 'user'
                                ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                                : 'bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50'
                            }`}
                          >
                            {msg.role === 'user' ? (
                              <p className="text-sm whitespace-pre-wrap leading-relaxed text-white">{msg.content}</p>
                            ) : (
                              <Markdown 
                                content={msg.content} 
                                streaming={msg.isStreaming}
                                className="text-sm"
                              />
                            )}
                            <div className="flex items-center justify-between mt-2">
                              <p className={`text-xs ${
                                msg.role === 'user' ? 'text-teal-100' : 'text-gray-500 dark:text-gray-400'
                              }`}>
                                {formatTime(msg.timestamp)}
                              </p>
                              {msg.role === 'assistant' && msg.isStreaming && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={cancelStream}
                                  className="h-6 px-2 text-xs hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20"
                                >
                                  <Square className="h-3 w-3 mr-1" />
                                  Stop
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}



                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </div>

              {/* Message Input */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 p-4">
                <form onSubmit={sendMessage} className="flex space-x-3">
                  <div className="flex-1 relative">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask me anything about business ideas, manufacturing, or problem-solving..."
                      disabled={isLoading || isStreaming}
                      className="pr-12 bg-white/80 dark:bg-gray-900/80 border-gray-200/50 dark:border-gray-700/50 focus:ring-2 focus:ring-teal-500 focus:border-transparent rounded-xl"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading || isStreaming || !message.trim()}
                    className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg rounded-xl px-6"
                  >
                    <>
                        { (isLoading || isStreaming) ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                    </>
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <div className="p-6 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900/20 dark:to-blue-900/20 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <MessageCircle className="h-12 w-12 text-teal-600 dark:text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Welcome to AI Chat
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Get personalized business insights, manufacturing advice, and problem-solving strategies from our AI assistant.
                </p>
                <Button
                  onClick={createNewThread}
                  className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Start New Conversation
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Trending Ideas */}
        <div className="hidden xl:flex w-80 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-700/50 flex-col">
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg mr-3">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              Trending Ideas
            </h2>
          </div>

          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-3">
              {trendingIdeas.map((idea) => (
                <Card key={idea.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 flex-1">
                        {idea.title}
                      </h3>
                      {idea.isNew && (
                        <Badge className="ml-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          New
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-3 leading-relaxed">
                      {idea.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-800">
                        {idea.category}
                      </Badge>
                      <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {idea.stats.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {idea.stats.likes}
                        </span>
                      </div>
                    </div>

                   <>
                       {idea.tags.length > 0 ? (
                           <div className="flex flex-wrap gap-1">
                               {idea.tags.map((tag, index) => (
                                   <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                       {tag}
                                   </Badge>
                               ))}
                           </div>
                       ) : null}
                   </>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
    </div>
    </div>
  )
}

