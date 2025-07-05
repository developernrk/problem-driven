import mongoose, { Schema, Document } from 'mongoose';
import { User as UserType } from '@/types';

interface UserDocument extends Omit<UserType, 'clerkId'>, Document {
  clerkId: string;
}

const RewardSchema = new Schema({
  id: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['points', 'badge', 'discount', 'feature'],
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  value: { type: Number, required: true },
  earnedAt: { type: Date, default: Date.now },
  isRedeemed: { type: Boolean, default: false }
});

const UserSchema = new Schema<UserDocument>({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  browniePoints: { type: Number, default: 0 },
  viewsRemaining: { type: Number, default: 6 }, // Free views limit
  isPremium: { type: Boolean, default: false },
  savedIdeas: [{ type: Schema.Types.ObjectId, ref: 'Idea' }],
  viewHistory: [{ type: Schema.Types.ObjectId, ref: 'Idea' }],
  likedIdeas: [{ type: Schema.Types.ObjectId, ref: 'Idea' }],
  sharedIdeas: [{ type: Schema.Types.ObjectId, ref: 'Idea' }],
  rewards: [RewardSchema],
  subscriptionTier: { 
    type: String, 
    enum: ['free', 'basic', 'premium'],
    default: 'free'
  },
  subscriptionExpiry: { type: Date }
}, {
  timestamps: true
});

// Indexes
UserSchema.index({ clerkId: 1 });
UserSchema.index({ email: 1 });

export default mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);