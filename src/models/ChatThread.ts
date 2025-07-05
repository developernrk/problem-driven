import mongoose, { Schema, Document } from 'mongoose';

export interface IChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface IChatThread extends Document {
  userId: string; // Clerk user ID
  title: string;
  messages: IChatMessage[];
  isActive: boolean;
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ChatMessageSchema = new Schema({
  id: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'assistant'],
    required: true 
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isTyping: { type: Boolean, default: false }
});

const ChatThreadSchema = new Schema<IChatThread>({
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  messages: [ChatMessageSchema],
  isActive: { type: Boolean, default: true },
  lastMessageAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Indexes for better performance
ChatThreadSchema.index({ userId: 1, lastMessageAt: -1 });
ChatThreadSchema.index({ userId: 1, isActive: 1 });

export default mongoose.models.ChatThread || mongoose.model<IChatThread>('ChatThread', ChatThreadSchema);