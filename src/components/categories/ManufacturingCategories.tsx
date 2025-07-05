'use client';

import { useState } from 'react';
import {
  Factory,
  Shirt,
  Package,
  Utensils,
  Car,
  Home,
  Smartphone,
  Palette,
  Wrench,
  Zap,
  Leaf,
  Gem
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ManufacturingCategory } from '@/types';

interface ManufacturingCategoriesProps {
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
  showAll?: boolean;
}

const manufacturingCategories: ManufacturingCategory[] = [
  {
    id: 'textiles-clothing',
    name: 'Textiles & Clothing',
    icon: 'Shirt',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    subcategories: ['Apparel', 'Fabrics', 'Accessories', 'Footwear']
  },
  {
    id: 'plastic-products',
    name: 'Plastic Products',
    icon: 'Package',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    subcategories: ['Packaging', 'Containers', 'Toys', 'Household Items']
  },
  {
    id: 'food-beverages',
    name: 'Food & Beverages',
    icon: 'Utensils',
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    subcategories: ['Processed Foods', 'Beverages', 'Snacks', 'Organic Products']
  },
  {
    id: 'automotive-parts',
    name: 'Automotive Parts',
    icon: 'Car',
    color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    subcategories: ['Engine Parts', 'Body Parts', 'Electronics', 'Accessories']
  },
  {
    id: 'home-furniture',
    name: 'Home & Furniture',
    icon: 'Home',
    color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    subcategories: ['Furniture', 'Decor', 'Kitchen Items', 'Storage Solutions']
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'Smartphone',
    color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
    subcategories: ['Consumer Electronics', 'Components', 'Gadgets', 'Smart Devices']
  },
  {
    id: 'cosmetics-beauty',
    name: 'Cosmetics & Beauty',
    icon: 'Palette',
    color: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
    subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances']
  },
  {
    id: 'tools-hardware',
    name: 'Tools & Hardware',
    icon: 'Wrench',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300',
    subcategories: ['Hand Tools', 'Power Tools', 'Hardware', 'Industrial Tools']
  },
  {
    id: 'renewable-energy',
    name: 'Renewable Energy',
    icon: 'Zap',
    color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    subcategories: ['Solar Products', 'Wind Energy', 'Battery Systems', 'Energy Storage']
  },
  {
    id: 'eco-friendly',
    name: 'Eco-Friendly Products',
    icon: 'Leaf',
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
    subcategories: ['Biodegradable', 'Recycled Materials', 'Sustainable', 'Green Tech']
  },
  {
    id: 'luxury-goods',
    name: 'Luxury Goods',
    icon: 'Gem',
    color: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
    subcategories: ['Jewelry', 'Watches', 'Premium Items', 'Collectibles']
  },
  {
    id: 'general-manufacturing',
    name: 'General Manufacturing',
    icon: 'Factory',
    color: 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300',
    subcategories: ['Industrial', 'Custom Products', 'Prototyping', 'Mass Production']
  }
];

const iconMap = {
  Shirt,
  Package,
  Utensils,
  Car,
  Home,
  Smartphone,
  Palette,
  Wrench,
  Zap,
  Leaf,
  Gem,
  Factory
};

export default function ManufacturingCategories({
  onCategorySelect,
  selectedCategory,
  showAll = false
}: ManufacturingCategoriesProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const displayCategories = showAll ? manufacturingCategories : manufacturingCategories.slice(0, 8);

  const handleCategoryClick = (categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId === selectedCategory ? '' : categoryId);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {displayCategories.map((category) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap];
          const isSelected = selectedCategory === category.id;
          const isHovered = hoveredCategory === category.id;

          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
              onClick={() => handleCategoryClick(category.id)}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${category.color} transition-all duration-300 ${
                  isHovered ? 'scale-110' : ''
                }`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="font-medium text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                  {category.name}
                </h3>

                {isHovered && (
                  <div className="space-y-1 animate-in fade-in-0 duration-200">
                    {category.subcategories.slice(0, 2).map((sub, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs px-2 py-0.5"
                      >
                        {sub}
                      </Badge>
                    ))}
                    {category.subcategories.length > 2 && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        +{category.subcategories.length - 2} more
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!showAll && manufacturingCategories.length > 8 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => onCategorySelect?.('show-all')}
            className="px-6"
          >
            View All Categories ({manufacturingCategories.length})
          </Button>
        </div>
      )}
    </div>
  );
}
