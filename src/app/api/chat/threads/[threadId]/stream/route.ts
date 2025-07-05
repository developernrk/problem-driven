import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/database';
import ChatThread from '@/models/ChatThread';
import { geminiModel } from '@/lib/gemini';

// POST /api/chat/threads/[threadId]/stream - Stream AI response
export async function POST(
  request: NextRequest,
  { params }: { params: { threadId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { content } = await request.json();

    if (!content || content.trim().length === 0) {
      return new Response('Message content is required', { status: 400 });
    }

    await connectDB();

    // Find the thread
    const thread = await ChatThread.findOne({
      _id: params.threadId,
      userId,
      isActive: true
    });

    if (!thread) {
      return new Response('Thread not found', { status: 404 });
    }

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: content.trim(),
      timestamp: new Date()
    };

    thread.messages.push(userMessage);
    thread.lastMessageAt = new Date();

    // Create a readable stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send user message first
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              type: 'user_message',
              message: userMessage
            })}\n\n`)
          );

          // Build conversation context
          const conversationHistory = thread.messages
            .slice(-10) // Last 10 messages for context
            .map(msg => `${msg.role}: ${msg.content}`)
            .join('\n');

          const prompt = `
            You’re an AI assistant for ProblemDriven — a platform that shares smart, real-world business ideas based on actual problems people face, especially in manufacturing and operations.

            Here’s the conversation so far:
            ${conversationHistory}

            Now the user says:
            ${content}

            Your job is to respond in a clear, friendly, and casual tone — just like how two people would talk while brainstorming ideas. Keep your replies:

            - Focused on business ideas, especially manufacturing-based
            - Helpful with problem-solving approaches or suggestions
            - Practical if it’s about business development or scaling
            - Insightful if they ask about industry or trends
            - Technical if needed, but don’t overcomplicate

            If the answer doesn’t need to be long, keep it short and snappy. If the question goes off-topic, gently guide the user back to something relevant.

            Use markdown where it helps — like lists, bold points, or short headers — to keep things clean and readable.
          `;

          // Generate streaming AI response
          const result = await geminiModel.generateContentStream(prompt);

          let aiContent = '';
          const aiMessageId = (Date.now() + 1).toString();

          // Send AI message start
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              type: 'ai_message_start',
              messageId: aiMessageId,
              timestamp: new Date().toISOString()
            })}\n\n`)
          );

          // Stream the response
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            aiContent += chunkText;

            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({
                type: 'ai_message_chunk',
                messageId: aiMessageId,
                content: chunkText,
                fullContent: aiContent
              })}\n\n`)
            );
          }

          // Add AI message to thread
          const aiMessage = {
            id: aiMessageId,
            role: 'assistant' as const,
            content: aiContent,
            timestamp: new Date()
          };

          thread.messages.push(aiMessage);
          thread.lastMessageAt = new Date();
          await thread.save();

          // Send completion
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              type: 'ai_message_complete',
              messageId: aiMessageId,
              message: aiMessage,
              thread: {
                _id: thread._id,
                title: thread.title,
                messageCount: thread.messages.length
              }
            })}\n\n`)
          );

          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();

        } catch (error) {
          console.error('Error in streaming:', error);

          // Save user message even if AI fails
          await thread.save();

          // Send error response
          const fallbackMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant' as const,
            content: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment, or feel free to ask about manufacturing business ideas, problem-solving strategies, or business development topics.",
            timestamp: new Date()
          };

          thread.messages.push(fallbackMessage);
          await thread.save();

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              type: 'ai_message_complete',
              messageId: fallbackMessage.id,
              message: fallbackMessage,
              thread: {
                _id: thread._id,
                title: thread.title,
                messageCount: thread.messages.length
              }
            })}\n\n`)
          );

          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in streaming endpoint:', error);
    
return new Response('Internal Server Error', { status: 500 });
  }
}
