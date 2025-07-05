import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/database';
import ChatThread from '@/models/ChatThread';
import { geminiModel } from '@/lib/gemini';

// POST /api/chat/threads/[threadId]/messages - Add a message to thread and get AI response
export async function POST(
  request: NextRequest,
  { params }: { params: { threadId: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content } = await request.json();

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Find the thread
    const thread = await ChatThread.findOne({
      _id: params.threadId,
      userId,
      isActive: true
    });

    if (!thread) {
      return NextResponse.json(
        { error: 'Thread not found' },
        { status: 404 }
      );
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

    // Generate AI response
    try {
      // Build conversation context
      const conversationHistory = thread.messages
        .slice(-10) // Last 10 messages for context
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const prompt = `
        You are an AI assistant for ProblemDriven, a platform focused on manufacturing business ideas and solutions.
        
        Previous conversation:
        ${conversationHistory}
        
        Current user message: ${content}
        
        Please provide a helpful, informative response related to:
        - Manufacturing business ideas
        - Problem-solving strategies
        - Business development advice
        - Industry insights
        - Technical solutions
        
        Keep your response conversational, practical, and actionable. If the user asks about something outside your expertise, politely redirect them to relevant manufacturing or business topics.
      `;

      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      const aiContent = response.text();

      // Add AI response
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: aiContent,
        timestamp: new Date()
      };

      thread.messages.push(aiMessage);
      thread.lastMessageAt = new Date();

      await thread.save();

      return NextResponse.json({
        userMessage,
        aiMessage,
        thread: {
          _id: thread._id,
          title: thread.title,
          messageCount: thread.messages.length
        }
      });

    } catch (aiError) {
      console.error('Error generating AI response:', aiError);
      
      // Save user message even if AI fails
      await thread.save();
      
      // Return fallback AI response
      const fallbackMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment, or feel free to ask about manufacturing business ideas, problem-solving strategies, or business development topics.",
        timestamp: new Date()
      };

      thread.messages.push(fallbackMessage);
      await thread.save();

      return NextResponse.json({
        userMessage,
        aiMessage: fallbackMessage,
        thread: {
          _id: thread._id,
          title: thread.title,
          messageCount: thread.messages.length
        }
      });
    }

  } catch (error) {
    console.error('Error adding message to thread:', error);
    
return NextResponse.json(
      { error: 'Failed to add message to thread' },
      { status: 500 }
    );
  }
}