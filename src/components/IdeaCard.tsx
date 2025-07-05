'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Share2, Eye, TrendingUp, Leaf, Zap, Bookmark } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Idea } from '@/types';

interface IdeaCardProps {
  idea: Idea;
  onLike?: (idea: Idea) => void;
  onShare?: (idea: Idea) => void;
  onClick?: (idea: Idea) => void;
  isSaved?: boolean;
  onSaveToggle?: (idea: Idea, isSaved: boolean) => void;
}

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800 border-green-200',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Hard: 'bg-red-100 text-red-800 border-red-200'
};

const potentialColors = {
  Low: 'bg-gray-100 text-gray-800 border-gray-200',
  Medium: 'bg-blue-100 text-blue-800 border-blue-200',
  High: 'bg-purple-100 text-purple-800 border-purple-200'
};

const IdeaCard: React.FC<IdeaCardProps> = ({
  idea,
  onLike,
  onShare,
  onClick,
  isSaved = false,
  onSaveToggle
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(idea.likes);
  const [saved, setSaved] = useState(isSaved);
  const [savingInProgress, setSavingInProgress] = useState(false);
  const router = useRouter();

  // Update saved state when prop changes
  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isLiked) {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);

      try {
        const response = await fetch('/api/ideas/like', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ideaId: idea._id })
        });

        if (!response.ok) {
          // Revert on error
          setIsLiked(false);
          setLikeCount(prev => prev - 1);
        }
      } catch (error) {
        // Revert on error
        setIsLiked(false);
        setLikeCount(prev => prev - 1);
      }
    }

    onLike?.(idea);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(idea);
  };

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savingInProgress) return;

    setSavingInProgress(true);
    const newSavedState = !saved;
    setSaved(newSavedState);

    try {
      const response = await fetch('/api/user/save-idea', {
        method: newSavedState ? 'POST' : 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ideaId: idea._id })
      });

      if (!response.ok) {
        // Revert on error
        setSaved(!newSavedState);
      } else {
        // Notify parent component
        onSaveToggle?.(idea, newSavedState);
      }
    } catch (error) {
      // Revert on error
      setSaved(!newSavedState);
    } finally {
      setSavingInProgress(false);
    }
  };

  const handleCardClick = async () => {
    // Record the view first if onClick handler is provided
    if (onClick) {
      await onClick(idea);
    }

    // Navigate to the detailed view
    router.push(`/idea/${idea._id}`);
  };

  return (
    <Card
      className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-0 shadow-sm"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {idea.title}
          </h3>
          <Badge
            variant="outline"
            className={`shrink-0 ${difficultyColors[idea.difficulty]}`}
          >
            {idea.difficulty}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
          {idea.shortDescription}
        </p>
      </CardHeader>

      <CardContent className="py-3">
        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {idea.features.slice(0, 3).map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-md text-xs"
            >
              {feature.icon === 'leaf' && <Leaf className="w-3 h-3 text-green-600" />}
              {feature.icon === 'zap' && <Zap className="w-3 h-3 text-yellow-600" />}
              {feature.icon === 'trending-up' && <TrendingUp className="w-3 h-3 text-blue-600" />}
              <span className="text-gray-700">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {idea.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {idea.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{idea.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Investment & Market Potential */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Investment: {idea.investmentRange}</span>
          <Badge
            variant="outline"
            className={`text-xs ${potentialColors[idea.marketPotential]}`}
          >
            {idea.marketPotential} Potential
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-gray-50/50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{idea.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{likeCount}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveToggle}
              disabled={savingInProgress}
              className={`p-2 h-8 w-8 ${saved ? 'text-blue-500' : ''}`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`p-2 h-8 w-8 ${isLiked ? 'text-red-500' : ''}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="p-2 h-8 w-8"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default IdeaCard;
