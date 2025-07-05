'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Share2,
  Eye,
  Star,
  TrendingUp,
  DollarSign,
  Target,
  Clock,
  Bookmark,
  BookmarkCheck,
  Users,
  Building,
  Globe2,
  Briefcase,
  Zap,
  CheckCircle,
  AlertCircle,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Mail
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Idea } from '@/types';

interface SolutionCardProps {
  idea: Idea; // Will be renamed to solution in future refactor
  onLike?: (solutionId: string) => void;
  onSave?: (solutionId: string) => void;
  onView?: (solutionId: string) => void;
  isSaved?: boolean;
  isLiked?: boolean;
}

const implementationColors = {
  Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
};

const impactColors = {
  Low: 'text-gray-600',
  Medium: 'text-teal-600',
  High: 'text-green-600'
};

const problemCategoryIcons = {
  'Social Impact': Heart,
  'Business Growth': Briefcase,
  'Community Issues': Users,
  'Urban Solutions': Building,
  'Global Challenges': Globe2,
  'Innovation Gaps': Zap,
  'General Problem': Target
};

const socialPlatforms = [
  { name: 'Facebook', icon: Facebook, color: 'text-blue-600', shareUrl: (url: string, title: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { name: 'Twitter', icon: Twitter, color: 'text-sky-500', shareUrl: (url: string, title: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
  { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', shareUrl: (url: string, title: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  { name: 'WhatsApp', icon: MessageCircle, color: 'text-green-600', shareUrl: (url: string, title: string) => `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}` },
  { name: 'Email', icon: Mail, color: 'text-gray-600', shareUrl: (url: string, title: string) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}` }
];

export default function SolutionCard({
  idea,
  onLike,
  onSave,
  onView,
  isSaved = false,
  isLiked = false
}: SolutionCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const [likes, setLikes] = useState(idea.likes);
  const [shares, setShares] = useState(idea.shares || 0);

  const CategoryIcon = problemCategoryIcons[idea.category as keyof typeof problemCategoryIcons] || Target;

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click

    try {
      setLiked(!liked);
      setLikes(prev => liked ? prev - 1 : prev + 1);

      if (onLike) {
        await onLike(idea._id);
      }

      toast.success(liked ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      // Revert on error
      setLiked(liked);
      setLikes(idea.likes);
      toast.error('Failed to update favorite status');
    }
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click

    try {
      setSaved(!saved);

      if (onSave) {
        await onSave(idea._id);
      }

      toast.success(saved ? 'Removed from saved solutions' : 'Solution saved for later');
    } catch (error) {
      setSaved(saved);
      toast.error('Failed to save solution');
    }
  };

  const handleShare = async (platform?: string) => {
    const url = `${window.location.origin}/idea/${idea._id}`;

    try {
      if (platform) {
        const socialPlatform = socialPlatforms.find(p => p.name === platform);
        if (socialPlatform) {
          window.open(socialPlatform.shareUrl(url, idea.title), '_blank', 'width=600,height=400');
          setShares(prev => prev + 1);
          toast.success(`Shared on ${platform}!`);
        }
      } else if (navigator.share) {
        await navigator.share({
          title: idea.title,
          text: idea.shortDescription,
          url: url
        });
        setShares(prev => prev + 1);
      } else {
        await navigator.clipboard.writeText(
          `${idea.title}\n${idea.shortDescription}\n${url}`
        );
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to share solution');
    }
  };

  const handleView = async () => {
    // Record the view first
    if (onView) {
      await onView(idea._id);
    }
  };

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col"
      onClick={handleView}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-teal-600 transition-colors">
              {idea.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {idea.shortDescription}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {saved ? (
              <BookmarkCheck className="h-4 w-4 text-teal-600" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <Badge variant="secondary" className="text-xs flex items-center gap-1">
            <CategoryIcon className="h-3 w-3" />
            {idea.category}
          </Badge>
          <Badge
            variant="outline"
            className={`text-xs ${implementationColors[idea.difficulty]}`}
          >
            {idea.difficulty} Implementation
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        {/* Solution Features */}
        {idea.features && idea.features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Solution Highlights</h4>
            <div className="grid grid-cols-2 gap-2">
              {idea.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs">
                  <CheckCircle className="w-3 h-3 text-teal-500 flex-shrink-0" />
                  <span className="truncate">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Impact Metrics */}
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="flex items-center space-x-1">
            <DollarSign className="h-3 w-3 text-green-600" />
            <span className="truncate">{idea.investmentRange}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className={`h-3 w-3 ${impactColors[idea.marketPotential]}`} />
            <span>{idea.marketPotential} Impact</span>
          </div>
          <div className="flex items-center space-x-1">
            <AlertCircle className="h-3 w-3 text-orange-600" />
            <span>{idea.sustainability}</span>
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="pt-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{idea.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{new Date(idea.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className="h-8 px-2"
            >
              <Heart
                className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`}
              />
              <span className="ml-1 text-xs">{likes}</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                >
                  <Share2 className="h-4 w-4" />
                  {shares > 0 && <span className="ml-1 text-xs">{shares}</span>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {socialPlatforms.map((platform) => {
                  const Icon = platform.icon;
                  
return (
                    <DropdownMenuItem
                      key={platform.name}
                      onClick={() => handleShare(platform.name)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className={`h-4 w-4 ${platform.color}`} />
                      Share on {platform.name}
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuItem
                  onClick={() => handleShare()}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Share2 className="h-4 w-4" />
                  Copy Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
