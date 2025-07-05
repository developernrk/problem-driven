'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  Trophy,
  Star,
  Eye,
  Heart,
  Bookmark,
  TrendingUp,
  Calendar,
  Award,
  Target,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageLayout from '@/components/layout/PageLayout';
import IdeaCard from '@/components/IdeaCard';
import { Idea, User as UserType } from '@/types';
import SolutionCard from '@/components/ideas/IdeaCard';

export default function DashboardContent() {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [savedIdeas, setSavedIdeas] = useState<Idea[]>([]);
  const [viewHistory, setViewHistory] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      setError(null);
      // Fetch all dashboard data in one call
      const response = await fetch('/api/user/dashboard');
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
        setSavedIdeas(data.savedIdeas || []);
        setViewHistory(data.viewHistory || []);
      } else {
        setError('Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshData = async () => {
    if (!user || loading) return;

    setRefreshing(true);
    await fetchUserData();
  };

  const handleSaveToggle = async (idea: Idea, isSaved: boolean) => {
    // Update local state immediately for better UX
    if (isSaved) {
      setSavedIdeas(prev => [...prev, idea]);
    } else {
      setSavedIdeas(prev => prev.filter(savedIdea => savedIdea._id !== idea._id));
    }

    // Refresh user data to get updated stats
    try {
      const response = await fetch('/api/user/dashboard');
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
        // Only update saved ideas if the local optimistic update was wrong
        if (data.savedIdeas) {
          setSavedIdeas(data.savedIdeas);
        }
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  const handleIdeaView = async (idea: Idea) => {
    try {
      const response = await fetch('/api/user/view-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ideaId: idea._id })
      });

      if (response.ok) {
        const data = await response.json();
        // Update views remaining
        setUserData(prev => prev ? { ...prev, viewsRemaining: data.data.viewsRemaining } : null);

        // Add to view history if not already there
        setViewHistory(prev => {
          const exists = prev.some(viewedIdea => viewedIdea._id === idea._id);
          
return exists ? prev : [idea, ...prev];
        });
      }
    } catch (error) {
      console.error('Error recording idea view:', error);
    }
  };

  const stats = [
    {
      title: 'Brownie Points',
      value: userData?.browniePoints || 0,
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900'
    },
    {
      title: 'Views Remaining',
      value: userData?.viewsRemaining || 0,
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900'
    },
    {
      title: 'Saved Ideas',
      value: savedIdeas.length,
      icon: Bookmark,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900'
    },
    {
      title: 'Ideas Viewed',
      value: viewHistory.length,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900'
    }
  ];

  const achievements = [
    {
      title: 'First Explorer',
      description: 'Viewed your first idea',
      earned: viewHistory.length > 0,
      icon: Star
    },
    {
      title: 'Idea Collector',
      description: 'Saved 5 ideas',
      earned: savedIdeas.length >= 5,
      icon: Bookmark
    },
    {
      title: 'Dedicated Browser',
      description: 'Viewed 10 ideas',
      earned: viewHistory.length >= 10,
      icon: Eye
    },
    {
      title: 'Premium Member',
      description: 'Upgraded to premium',
      earned: userData?.isPremium || false,
      icon: Award
    }
  ];

  if (loading) {
    return (
      <PageLayout>
        <div className="bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      navigationProps={{
        browniePoints: userData?.browniePoints,
        viewsRemaining: userData?.viewsRemaining
      }}
    >
      <div className="bg-gray-50 dark:bg-gray-900">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 text-red-800 dark:text-red-200">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
                <Button
                  onClick={refreshData}
                  variant="outline"
                  size="sm"
                  className="ml-auto"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Welcome Section */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user?.firstName || 'Explorer'}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here's your innovation journey overview
            </p>
          </div>
          <Button
            onClick={refreshData}
            disabled={refreshing}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Progress to Premium */}
        {!userData?.isPremium && (
          <Card className="mb-8 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-900 dark:text-blue-100">
                <Target className="h-5 w-5" />
                <span>Your Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Free Views Used</span>
                    <span>{6 - (userData?.viewsRemaining || 6)} / 6</span>
                  </div>
                  <Progress
                    value={((6 - (userData?.viewsRemaining || 6)) / 6) * 100}
                    className="h-2"
                  />
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {userData?.viewsRemaining || 6} free views remaining.
                  Upgrade to premium for unlimited access!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Achievements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                
return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.earned
                        ? 'border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800'
                        : 'border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        achievement.earned
                          ? 'bg-green-100 dark:bg-green-900'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          achievement.earned
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium text-sm ${
                          achievement.earned
                            ? 'text-green-900 dark:text-green-100'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-xs ${
                          achievement.earned
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-gray-500 dark:text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          ✓
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {(savedIdeas.length > 0 || viewHistory.length > 0) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Show last 5 activities */}
                {[...savedIdeas.slice(0, 3), ...viewHistory.slice(0, 2)]
                  .slice(0, 5)
                  .map((idea, index) => {
                    const isSavedIdea = savedIdeas.some(saved => saved._id === idea._id);
                    
return (
                      <div key={`${idea._id}-${index}`} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className={`p-2 rounded-full ${isSavedIdea ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'}`}>
                          {isSavedIdea ? (
                            <Bookmark className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Eye className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {isSavedIdea ? 'Saved' : 'Viewed'}: {idea.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {idea.shortDescription?.slice(0, 60)}...
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {idea.difficulty}
                        </Badge>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ideas Tabs */}
        <Tabs defaultValue="saved" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="saved" className="flex items-center space-x-2">
              <Bookmark className="h-4 w-4" />
              <span>Saved Ideas ({savedIdeas.length})</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>View History ({viewHistory.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="saved">
            {refreshing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : savedIdeas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedIdeas.map((idea) => (
                  <SolutionCard
                    key={idea._id}
                    idea={idea}
                    isSaved={true}
                    onClick={handleIdeaView}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No saved ideas yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start exploring and save ideas that interest you!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history">
            {refreshing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : viewHistory.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {viewHistory.map((idea) => {
                  const isSaved = savedIdeas.some(savedIdea => savedIdea._id === idea._id);
                  
return (
                    <SolutionCard
                      key={idea._id}
                      idea={idea}
                      isSaved={isSaved}
                      onClick={handleIdeaView}
                    />
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No viewing history
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your viewed ideas will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </PageLayout>
  );
}
