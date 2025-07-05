import mongoose, { Schema, Document } from 'mongoose';
import { Category as CategoryType } from '@/types';

interface CategoryDocument extends Omit<CategoryType, '_id'>, Document {}

const CategorySchema = new Schema<CategoryDocument>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  ideaCount: { type: Number, default: 0 },
  language: { type: String, default: 'en' }
}, {
  timestamps: true
});

// Indexes
CategorySchema.index({ isActive: 1, language: 1 });
CategorySchema.index({ ideaCount: -1 });

export default mongoose.models.Category || mongoose.model<CategoryDocument>('Category', CategorySchema);