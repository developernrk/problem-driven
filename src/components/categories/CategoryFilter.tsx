'use client';

import { useState } from 'react';
import {
  Heart,
  Users,
  Building,
  Globe2,
  Briefcase,
  Zap,
  Target,
  TreePine,
  GraduationCap,
  Shield,
  Filter,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  solutionCounts?: Record<string, number>;
}

const problemCategories = [
  { name: 'Social Impact', icon: Heart, color: 'bg-red-100 text-red-800' },
  { name: 'Community Issues', icon: Users, color: 'bg-green-100 text-green-800' },
  { name: 'Urban Solutions', icon: Building, color: 'bg-purple-100 text-purple-800' },
  { name: 'Global Challenges', icon: Globe2, color: 'bg-teal-100 text-teal-800' },
  { name: 'Business Growth', icon: Briefcase, color: 'bg-blue-100 text-blue-800' },
  { name: 'Innovation Gaps', icon: Zap, color: 'bg-orange-100 text-orange-800' },
  { name: 'Environmental', icon: TreePine, color: 'bg-emerald-100 text-emerald-800' },
  { name: 'Education', icon: GraduationCap, color: 'bg-indigo-100 text-indigo-800' },
  { name: 'Healthcare', icon: Shield, color: 'bg-pink-100 text-pink-800' },
  { name: 'General Problem', icon: Target, color: 'bg-gray-100 text-gray-800' }
];

export default function CategoryFilter({
  selectedCategories,
  onCategoryChange,
  solutionCounts = {}
}: CategoryFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCategory = (categoryName: string) => {
    const newCategories = selectedCategories.includes(categoryName)
      ? selectedCategories.filter(cat => cat !== categoryName)
      : [...selectedCategories, categoryName];

    onCategoryChange(newCategories);
  };

  const clearAllFilters = () => {
    onCategoryChange([]);
  };

  const displayCategories = isExpanded ? problemCategories : problemCategories.slice(0, 6);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-teal-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Problem Categories</h3>
        </div>

        {selectedCategories.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Selected Categories */}
      {selectedCategories.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => {
              const categoryData = problemCategories.find(cat => cat.name === category);
              const Icon = categoryData?.icon || Target;

              return (
                <Badge
                  key={category}
                  variant="secondary"
                  className="flex items-center space-x-1 cursor-pointer hover:bg-red-100 hover:text-red-800"
                  onClick={() => toggleCategory(category)}
                >
                  <Icon className="h-3 w-3" />
                  <span className="text-xs">{category}</span>
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              );
            })}
          </div>
          <Separator className="mt-3" />
        </div>
      )}

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
        {displayCategories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategories.includes(category.name);
          const count = solutionCounts[category.name] || 0;

          return (
            <Button
              key={category.name}
              variant={isSelected ? "default" : "ghost"}
              className={`justify-start h-auto p-3 ${
                isSelected
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => toggleCategory(category.name)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/20' : category.color}`}>
                    <Icon className={`h-4 w-4 ${isSelected ? 'text-white' : ''}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{category.name}</div>
                    {count > 0 && (
                      <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                        {count} solutions
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Show More/Less Button */}
      {problemCategories.length > 6 && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-teal-600 hover:text-teal-700"
          >
            {isExpanded ? 'Show Less' : `Show ${problemCategories.length - 6} More`}
          </Button>
        </div>
      )}
    </div>
  );
}
