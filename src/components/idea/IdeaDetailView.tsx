'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Bookmark, 
  Eye, 
  TrendingUp, 
  Leaf, 
  Zap,
  DollarSign,
  Users,
  Clock,
  Target,
  Lightbulb,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/layout/Navigation';
import { Idea } from '@/types';

interface IdeaDetailViewProps {
  idea: Idea;
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

const IdeaDetailView: React.FC<IdeaDetailViewProps> = ({ idea }) => {
  const router = useRouter();
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(idea.likes);
  const [viewCount, setViewCount] = useState(idea.views);
  const [loading, setLoading] = useState(false);
  const [viewRecorded, setViewRecorded] = useState(false);

  useEffect(() => {
    // Record the view when component mounts
    if (user && !viewRecorded) {
      recordView();
    }
  }, [user, viewRecorded]);

  const recordView = async () => {
    if (!user || viewRecorded) return;

    try {
      const response = await fetch('/api/user/view-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ideaId: idea._id })
      });

      if (response.ok) {
        setViewRecorded(true);
        setViewCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error recording view:', error);
    }
  };

  const handleLike = async () => {
    if (!user || loading) return;

    setLoading(true);
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);

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
        setIsLiked(!newLikedState);
        setLikeCount(prev => newLikedState ? prev - 1 : prev + 1);
      }
    } catch (error) {
      // Revert on error
      setIsLiked(!newLikedState);
      setLikeCount(prev => newLikedState ? prev - 1 : prev + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || loading) return;

    setLoading(true);
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);

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
        setIsSaved(!newSavedState);
      }
    } catch (error) {
      // Revert on error
      setIsSaved(!newSavedState);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: idea.title,
          text: idea.shortDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'leaf':
        return <Leaf className="w-4 h-4 text-green-600" />;
      case 'zap':
        return <Zap className="w-4 h-4 text-yellow-600" />;
      case 'trending-up':
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
      default:
        return <Lightbulb className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                    {idea.title}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {idea.shortDescription}
                  </p>
                </div>
                <Badge 
                  variant="outline" 
                  className={`shrink-0 ${difficultyColors[idea.difficulty]}`}
                >
                  {idea.difficulty}
                </Badge>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{viewCount} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{likeCount} likes</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={`${potentialColors[idea.marketPotential]}`}
                >
                  {idea.marketPotential} Potential
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={loading}
                className={`flex items-center space-x-2 ${isSaved ? 'text-blue-600 border-blue-600' : ''}`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleLike}
                disabled={loading}
                className={`flex items-center space-x-2 ${isLiked ? 'text-red-600 border-red-600' : ''}`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="flex items-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Key Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {idea.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      {getFeatureIcon(feature.icon)}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {feature.label}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Categories & Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {idea.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Investment Range</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {idea.investmentRange}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Target Audience</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {idea.targetAudience}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Timeline</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {idea.timeline}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {idea.detailedDescription}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <span>Problem Statement</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    {idea.problemStatement}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Solution Approach</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    {idea.solutionApproach}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="implementation" className="space-y-6">
            {/* Implementation Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Implementation Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {idea.implementationSteps?.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                          {step.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {step.description}
                        </p>
                        {step.duration && (
                          <Badge variant="outline" className="mt-2">
                            {step.duration}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )) || (
                    <p className="text-gray-500 dark:text-gray-400">
                      Implementation steps will be detailed based on the specific requirements and scope of the project.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Required Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Required Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Technical Skills</h4>
                    <div className="space-y-2">
                      {idea.requiredSkills?.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{skill}</span>
                        </div>
                      )) || (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Skills requirements depend on implementation approach
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Resources Needed</h4>
                    <div className="space-y-2">
                      {idea.requiredResources?.map((resource, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{resource}</span>
                        </div>
                      )) || (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Resource requirements will be determined during planning phase
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            {/* Market Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Market Opportunity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Market Size</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {idea.marketSize || "Market size analysis would depend on specific target segments and geographical focus."}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Competitive Landscape</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {idea.competitiveAnalysis || "Competitive analysis would involve researching existing solutions and identifying differentiation opportunities."}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Revenue Potential</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {idea.revenuePotential || "Revenue potential would be determined through market validation and business model development."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {idea.risks?.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-red-900 dark:text-red-100">{risk.type}</h5>
                        <p className="text-sm text-red-700 dark:text-red-300">{risk.description}</p>
                        <Badge variant="outline" className="mt-1">
                          {risk.severity} Risk
                        </Badge>
                      </div>
                    </div>
                  )) || (
                    <p className="text-gray-500 dark:text-gray-400">
                      Risk assessment would be conducted during the planning phase to identify potential challenges and mitigation strategies.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IdeaDetailView;