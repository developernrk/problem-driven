import mongoose, { Schema, Document } from 'mongoose';
import { Idea as IdeaType, IdeaFeature, ImplementationStep, Risk } from '@/types';

interface IdeaDocument extends Omit<IdeaType, '_id'>, Document {}

const IdeaFeatureSchema = new Schema<IdeaFeature>({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String }
});

const SocialShareSchema = new Schema({
  platform: { 
    type: String, 
    enum: ['facebook', 'twitter', 'linkedin', 'whatsapp', 'email'],
    required: true 
  },
  count: { type: Number, default: 0 }
});

const ManufacturingCategorySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
  subcategories: [{ type: String }]
});

const ImplementationStepSchema = new Schema<ImplementationStep>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String }
});

const RiskSchema = new Schema<Risk>({
  type: { type: String, required: true },
  description: { type: String, required: true },
  severity: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    required: true 
  }
});

const IdeaSchema = new Schema<IdeaDocument>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true, maxlength: 200 },
  detailedDescription: { type: String },
  category: { type: String, required: true },
  tags: [{ type: String, trim: true }],
  features: [IdeaFeatureSchema],
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'], 
    required: true 
  },
  investmentRange: { type: String, required: true },
  marketPotential: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    required: true 
  },
  sustainability: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    required: true 
  },
  manufacturingCategory: { type: ManufacturingCategorySchema },
  socialShares: [SocialShareSchema],
  targetAudience: { type: String },
  timeline: { type: String },
  problemStatement: { type: String },
  solutionApproach: { type: String },
  implementationSteps: [ImplementationStepSchema],
  requiredSkills: [{ type: String }],
  requiredResources: [{ type: String }],
  marketSize: { type: String },
  competitiveAnalysis: { type: String },
  revenuePotential: { type: String },
  risks: [RiskSchema],
  isPremium: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  language: { type: String, default: 'en' }
}, {
  timestamps: true
});

// Indexes for better query performance
IdeaSchema.index({ category: 1, isActive: 1 });
IdeaSchema.index({ tags: 1 });
IdeaSchema.index({ likes: -1 });
IdeaSchema.index({ createdAt: -1 });
IdeaSchema.index({ language: 1 });

export default mongoose.models.Idea || mongoose.model<IdeaDocument>('Idea', IdeaSchema);