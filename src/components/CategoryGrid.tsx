'use client';

import React from 'react';
import { 
  Cpu, 
  Factory, 
  Leaf, 
  Zap, 
  Smartphone, 
  Car, 
  Home, 
  Recycle,
  Shirt,
  Package,
  Utensils,
  Palette
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Category } from '@/types';

interface CategoryGridProps {
  categories: Category[];
  onCategorySelect?: (category: Category) => void;
}

const iconMap = {
  'cpu': Cpu,
  'factory': Factory,
  'leaf': Leaf,
  'zap': Zap,
  'smartphone': Smartphone,
  'car': Car,
  'home': Home,
  'recycle': Recycle,
  'shirt': Shirt,
  'package': Package,
  'utensils': Utensils,
  'palette': Palette
};

const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  categories, 
  onCategorySelect 
}) => {
  const handleCategoryClick = (category: Category) => {
    onCategorySelect?.(category);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => {
        const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Factory;
        
        return (
          <Card
            key={category._id}
            className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-0 shadow-sm"
            onClick={() => handleCategoryClick(category)}
          >
            <CardContent className="p-6 text-center">
              <div 
                className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: `${category.color}20` }}
              >
                <IconComponent 
                  className="w-6 h-6 transition-colors group-hover:scale-110"
                  style={{ color: category.color }}
                />
              </div>
              
              <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {category.description}
              </p>
              
              <Badge variant="secondary" className="text-xs">
                {category.ideaCount} ideas
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CategoryGrid;