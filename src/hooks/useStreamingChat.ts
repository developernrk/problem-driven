'use client';

import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface StreamingChatHook {
  isStreaming: boolean;
  sendStreamingMessage: (threadId: string, content: string) => Promise<{
    userMessage: ChatMessage;
    aiMessage: ChatMessage;
    thread: any;
  } | null>;
  cancelStream: () => void;
}

export function useStreamingChat(
  onUserMessage: (message: ChatMessage) => void,
  onAIMessageStart: (messageId: string, timestamp: string) => void,
  onAIMessageChunk: (messageId: string, chunk: string, fullContent: string) => void,
  onAIMessageComplete: (message: ChatMessage, thread: any) => void,
  onError: (error: string) => void
): StreamingChatHook {
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentController, setCurrentController] = useState<AbortController | null>(null);

  const cancelStream = useCallback(() => {
    if (currentController) {
      currentController.abort();
      setCurrentController(null);
      setIsStreaming(false);
    }
  }, [currentController]);

  const sendStreamingMessage = useCallback(async (
    threadId: string, 
    content: string
  ): Promise<{
    userMessage: ChatMessage;
    aiMessage: ChatMessage;
    thread: any;
  } | null> => {
    if (isStreaming) {
      toast.error('Please wait for the current message to complete');
      
return null;
    }

    const controller = new AbortController();
    setCurrentController(controller);
    setIsStreaming(true);

    try {
      const response = await fetch(`/api/chat/threads/${threadId}/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No reader available');
      }

      const decoder = new TextDecoder();
      let userMessage: ChatMessage | null = null;
      let aiMessage: ChatMessage | null = null;
      let threadData: any = null;

      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              
              if (data === '[DONE]') {
                setIsStreaming(false);
                setCurrentController(null);
                break;
              }

              try {
                const parsed = JSON.parse(data);

                switch (parsed.type) {
                  case 'user_message':
                    userMessage = {
                      ...parsed.message,
                      timestamp: new Date(parsed.message.timestamp)
                    };
                    onUserMessage(userMessage);
                    break;

                  case 'ai_message_start':
                    onAIMessageStart(parsed.messageId, parsed.timestamp);
                    break;

                  case 'ai_message_chunk':
                    onAIMessageChunk(parsed.messageId, parsed.content, parsed.fullContent);
                    break;

                  case 'ai_message_complete':
                    aiMessage = {
                      ...parsed.message,
                      timestamp: new Date(parsed.message.timestamp)
                    };
                    threadData = parsed.thread;
                    onAIMessageComplete(aiMessage, threadData);
                    break;
                }
              } catch (parseError) {
                console.error('Error parsing SSE data:', parseError);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }

      if (userMessage && aiMessage && threadData) {
        return {
          userMessage,
          aiMessage,
          thread: threadData
        };
      }

      return null;

    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Stream cancelled by user');
        
return null;
      }
      
      console.error('Error in streaming chat:', error);
      onError('Failed to send message. Please try again.');
      
return null;
    } finally {
      setIsStreaming(false);
      setCurrentController(null);
    }
  }, [isStreaming, onUserMessage, onAIMessageStart, onAIMessageChunk, onAIMessageComplete, onError]);

  return {
    isStreaming,
    sendStreamingMessage,
    cancelStream
  };
}