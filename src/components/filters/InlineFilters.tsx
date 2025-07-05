'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SlidersHorizontal,
  X,
  Filter,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  Target,
  Zap,
  RotateCcw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export interface FilterOptions {
  categories: string[];
  difficulty: string;
  investmentRange: [number, number];
  marketPotential: string;
  sustainabilityRating: string;
  tags: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  dateRange: string;
  minLikes: number;
  minViews: number;
  language: string;
}

interface InlineFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onReset: () => void;
  totalResults: number;
}

const CATEGORIES = [
  'Manufacturing',
  'Technology',
  'Healthcare',
  'Education',
  'Environment',
  'Agriculture',
  'Transportation',
  'Energy',
  'Food & Beverage',
  'Retail',
  'Finance',
  'Construction',
  'Textiles',
  'Automotive',
  'Electronics'
];

const DIFFICULTY_LEVELS = [
  { value: 'all', label: 'All Levels' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' }
];

const MARKET_POTENTIAL = [
  { value: 'all', label: 'All Levels' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'likes', label: 'Popularity' },
  { value: 'views', label: 'Views' },
  { value: 'title', label: 'Title (A-Z)' },
  { value: 'difficulty', label: 'Difficulty' },
  { value: 'investmentRange', label: 'Investment' }
];

const DATE_RANGES = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'year', label: 'This Year' }
];

const POPULAR_TAGS = [
  'AI/ML', 'IoT', 'Automation', 'Sustainability', 'Innovation',
  'Cost-Effective', 'Scalable', 'Eco-Friendly', 'Digital Transformation',
  'Supply Chain', 'Quality Control', 'Efficiency', 'Safety'
];

export default function InlineFilters({
  filters,
  onFiltersChange,
  onReset,
  totalResults
}: InlineFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customTag, setCustomTag] = useState('');

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    handleFilterChange('categories', newCategories);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    handleFilterChange('tags', newTags);
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !filters.tags.includes(customTag.trim())) {
      handleTagToggle(customTag.trim());
      setCustomTag('');
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.difficulty !== 'all') count++;
    if (filters.investmentRange[0] > 0 || filters.investmentRange[1] < 1000000) count++;
    if (filters.marketPotential !== 'all') count++;
    if (filters.sustainabilityRating !== 'all') count++;
    if (filters.tags.length > 0) count++;
    if (filters.dateRange !== 'all') count++;
    if (filters.minLikes > 0) count++;
    if (filters.minViews > 0) count++;
    
return count;
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filters
            </h3>
          </div>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary" className="text-sm">
              {getActiveFiltersCount()} active
            </Badge>
          )}
          {totalResults > 0 && (
            <Badge variant="outline" className="text-sm">
              {totalResults.toLocaleString()} results
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Advanced
            {showAdvanced ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </Button>
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="text-red-600 hover:text-red-700"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Quick Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Categories Quick Select */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Categories</Label>
          <div className="flex flex-wrap gap-1">
            {CATEGORIES.slice(0, 6).map((category) => (
              <Badge
                key={category}
                variant={filters.categories.includes(category) ? "default" : "outline"}
                className="cursor-pointer text-xs hover:bg-primary/80"
                onClick={() => handleCategoryToggle(category)}
              >
                {category}
                {filters.categories.includes(category) && (
                  <X className="h-3 w-3 ml-1" />
                )}
              </Badge>
            ))}
            {CATEGORIES.length > 6 && (
              <Badge variant="outline" className="text-xs">
                +{CATEGORIES.length - 6} more
              </Badge>
            )}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Difficulty</Label>
          <Select
            value={filters.difficulty}
            onValueChange={(value) => handleFilterChange('difficulty', value)}
          >
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTY_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Sort By</Label>
          <div className="flex gap-2">
            <Select
              value={filters.sortBy}
              onValueChange={(value) => handleFilterChange('sortBy', value)}
            >
              <SelectTrigger className="h-9 flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
              className="h-9 px-3"
            >
              {filters.sortOrder === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>

        {/* Date Range */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Date Range</Label>
          <Select
            value={filters.dateRange}
            onValueChange={(value) => handleFilterChange('dateRange', value)}
          >
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DATE_RANGES.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Advanced Filters */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <CollapsibleContent className="space-y-6">
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* All Categories */}
            <div>
              <Label className="text-sm font-medium mb-3 block flex items-center">
                <Target className="h-4 w-4 mr-2" />
                All Categories
              </Label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {CATEGORIES.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                    />
                    <Label 
                      htmlFor={`category-${category}`}
                      className="text-sm cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Range */}
            <div>
              <Label className="text-sm font-medium mb-3 block flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Investment Range
              </Label>
              <div className="space-y-4">
                <Slider
                  value={filters.investmentRange}
                  onValueChange={(value) => handleFilterChange('investmentRange', value as [number, number])}
                  max={1000000}
                  min={0}
                  step={10000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${filters.investmentRange[0].toLocaleString()}</span>
                  <span>${filters.investmentRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Market Potential */}
            <div>
              <Label className="text-sm font-medium mb-3 block flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Market Potential
              </Label>
              <RadioGroup
                value={filters.marketPotential}
                onValueChange={(value) => handleFilterChange('marketPotential', value)}
                className="space-y-2"
              >
                {MARKET_POTENTIAL.map((level) => (
                  <div key={level.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={level.value} id={`market-${level.value}`} />
                    <Label htmlFor={`market-${level.value}`} className="text-sm">
                      {level.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Tags */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Popular Tags</Label>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {POPULAR_TAGS.map((tag) => (
                    <Badge
                      key={tag}
                      variant={filters.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer text-xs hover:bg-primary/80"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                      {filters.tags.includes(tag) && (
                        <X className="h-3 w-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add custom tag..."
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCustomTag()}
                    className="flex-1 h-8 text-sm"
                  />
                  <Button size="sm" onClick={handleAddCustomTag} className="h-8">
                    Add
                  </Button>
                </div>
              </div>
            </div>

            {/* Engagement Filters */}
            <div>
              <Label className="text-sm font-medium mb-3 block flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Minimum Engagement
              </Label>
              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-gray-500">Likes: {filters.minLikes}</Label>
                  <Slider
                    value={[filters.minLikes]}
                    onValueChange={(value) => handleFilterChange('minLikes', value[0])}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Views: {filters.minViews}</Label>
                  <Slider
                    value={[filters.minViews]}
                    onValueChange={(value) => handleFilterChange('minViews', value[0])}
                    max={1000}
                    min={0}
                    step={50}
                    className="w-full mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}