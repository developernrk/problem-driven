'use client';

import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
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
  SlidersHorizontal,
  X,
  Filter,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  Target,
  Zap,
  RotateCcw
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

interface AdvancedFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onReset: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
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
  { value: 'easy', label: 'Easy', description: 'Low complexity, quick to implement' },
  { value: 'medium', label: 'Medium', description: 'Moderate complexity, some expertise needed' },
  { value: 'hard', label: 'Hard', description: 'High complexity, significant expertise required' }
];

const MARKET_POTENTIAL = [
  { value: 'low', label: 'Low', description: 'Niche market, limited growth' },
  { value: 'medium', label: 'Medium', description: 'Growing market, good potential' },
  { value: 'high', label: 'High', description: 'Large market, high growth potential' }
];

const SUSTAINABILITY_RATINGS = [
  { value: 'low', label: 'Low', description: 'Limited environmental impact' },
  { value: 'medium', label: 'Medium', description: 'Moderate environmental benefits' },
  { value: 'high', label: 'High', description: 'High environmental impact' }
];

const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'likes', label: 'Popularity (Likes)' },
  { value: 'views', label: 'Views' },
  { value: 'title', label: 'Title (A-Z)' },
  { value: 'difficulty', label: 'Difficulty' },
  { value: 'investmentRange', label: 'Investment Required' }
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

export default function AdvancedFilters({
  filters,
  onFiltersChange,
  onReset,
  isOpen,
  onOpenChange
}: AdvancedFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
  const [customTag, setCustomTag] = useState('');

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter(c => c !== category)
      : [...localFilters.categories, category];
    handleFilterChange('categories', newCategories);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = localFilters.tags.includes(tag)
      ? localFilters.tags.filter(t => t !== tag)
      : [...localFilters.tags, tag];
    handleFilterChange('tags', newTags);
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !localFilters.tags.includes(customTag.trim())) {
      handleTagToggle(customTag.trim());
      setCustomTag('');
    }
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onOpenChange(false);
  };

  const handleResetFilters = () => {
    onReset();
    onOpenChange(false);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters.categories.length > 0) count++;
    if (localFilters.difficulty !== 'all') count++;
    if (localFilters.investmentRange[0] > 0 || localFilters.investmentRange[1] < 1000000) count++;
    if (localFilters.marketPotential !== 'all') count++;
    if (localFilters.sustainabilityRating !== 'all') count++;
    if (localFilters.tags.length > 0) count++;
    if (localFilters.dateRange !== 'all') count++;
    if (localFilters.minLikes > 0) count++;
    if (localFilters.minViews > 0) count++;
    
return count;
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Advanced Filters</span>
          <span className="sm:hidden">Filters</span>
          {getActiveFiltersCount() > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {getActiveFiltersCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Advanced Filters
          </SheetTitle>
          <SheetDescription>
            Refine your search to find the perfect business ideas
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Categories */}
          <div>
            <Label className="text-base font-semibold flex items-center mb-3">
              <Target className="h-4 w-4 mr-2" />
              Categories
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={localFilters.categories.includes(category)}
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

          <Separator />

          {/* Difficulty Level */}
          <div>
            <Label className="text-base font-semibold flex items-center mb-3">
              <Zap className="h-4 w-4 mr-2" />
              Difficulty Level
            </Label>
            <RadioGroup
              value={localFilters.difficulty}
              onValueChange={(value) => handleFilterChange('difficulty', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="difficulty-all" />
                <Label htmlFor="difficulty-all">All Levels</Label>
              </div>
              {DIFFICULTY_LEVELS.map((level) => (
                <div key={level.value} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={level.value} id={`difficulty-${level.value}`} />
                    <Label htmlFor={`difficulty-${level.value}`} className="font-medium">
                      {level.label}
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">{level.description}</p>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Investment Range */}
          <div>
            <Label className="text-base font-semibold flex items-center mb-3">
              <DollarSign className="h-4 w-4 mr-2" />
              Investment Range
            </Label>
            <div className="space-y-4">
              <Slider
                value={localFilters.investmentRange}
                onValueChange={(value) => handleFilterChange('investmentRange', value as [number, number])}
                max={1000000}
                min={0}
                step={10000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>${localFilters.investmentRange[0].toLocaleString()}</span>
                <span>${localFilters.investmentRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Market Potential */}
          <div>
            <Label className="text-base font-semibold flex items-center mb-3">
              <TrendingUp className="h-4 w-4 mr-2" />
              Market Potential
            </Label>
            <RadioGroup
              value={localFilters.marketPotential}
              onValueChange={(value) => handleFilterChange('marketPotential', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="market-all" />
                <Label htmlFor="market-all">All Levels</Label>
              </div>
              {MARKET_POTENTIAL.map((level) => (
                <div key={level.value} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={level.value} id={`market-${level.value}`} />
                    <Label htmlFor={`market-${level.value}`} className="font-medium">
                      {level.label}
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">{level.description}</p>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Tags */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Popular Tags</Label>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {POPULAR_TAGS.map((tag) => (
                  <Badge
                    key={tag}
                    variant={localFilters.tags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                    {localFilters.tags.includes(tag) && (
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
                  className="flex-1"
                />
                <Button size="sm" onClick={handleAddCustomTag}>
                  Add
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Sort Options */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Sort By</Label>
            <div className="flex space-x-2">
              <Select
                value={localFilters.sortBy}
                onValueChange={(value) => handleFilterChange('sortBy', value)}
              >
                <SelectTrigger className="flex-1">
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
              <Select
                value={localFilters.sortOrder}
                onValueChange={(value) => handleFilterChange('sortOrder', value as 'asc' | 'desc')}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">↓ Desc</SelectItem>
                  <SelectItem value="asc">↑ Asc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Date Range */}
          <div>
            <Label className="text-base font-semibold flex items-center mb-3">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Label>
            <Select
              value={localFilters.dateRange}
              onValueChange={(value) => handleFilterChange('dateRange', value)}
            >
              <SelectTrigger>
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

          <Separator />

          {/* Engagement Filters */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold flex items-center mb-3">
                <Users className="h-4 w-4 mr-2" />
                Minimum Engagement
              </Label>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Minimum Likes: {localFilters.minLikes}</Label>
                  <Slider
                    value={[localFilters.minLikes]}
                    onValueChange={(value) => handleFilterChange('minLikes', value[0])}
                    max={1000}
                    min={0}
                    step={10}
                    className="w-full mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm">Minimum Views: {localFilters.minViews}</Label>
                  <Slider
                    value={[localFilters.minViews]}
                    onValueChange={(value) => handleFilterChange('minViews', value[0])}
                    max={10000}
                    min={0}
                    step={100}
                    className="w-full mt-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-8 pt-4 border-t">
          <Button onClick={handleResetFilters} variant="outline" className="flex-1">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleApplyFilters} className="flex-1">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}