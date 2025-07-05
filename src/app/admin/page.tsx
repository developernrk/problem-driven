'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  Users,
  Lightbulb,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Heart,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Idea, Category, User as UserType } from '@/types';

const AdminDashboard: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const [stats, setStats] = useState({
    totalIdeas: 0,
    totalUsers: 0,
    totalViews: 0,
    totalLikes: 0
  });
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn) {
      fetchAdminData();
    }
  }, [isSignedIn]);

  const fetchAdminData = async () => {
    try {
      setIsLoading(true);
      const [statsRes, ideasRes, categoriesRes, usersRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/ideas'),
        fetch('/api/admin/categories'),
        fetch('/api/admin/users')
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      }

      if (ideasRes.ok) {
        const ideasData = await ideasRes.json();
        setIdeas(ideasData.ideas || []);
      }

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData.categories || []);
      }

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.users || []);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteIdea = async (ideaId: string) => {
    if (confirm('Are you sure you want to delete this idea?')) {
      try {
        const response = await fetch(`/api/admin/ideas/${ideaId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setIdeas(prev => prev.filter(idea => idea._id !== ideaId));
        }
      } catch (error) {
        console.error('Error deleting idea:', error);
      }
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch(`/api/admin/categories/${categoryId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setCategories(prev => prev.filter(cat => cat._id !== categoryId));
        }
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Admin Access Required</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Please sign in with admin credentials
              </p>
              <Button asChild>
                <a href="/sign-in">Sign In</a>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // Check if user is admin (you can implement your own logic here)
  const isAdmin = user?.emailAddresses?.[0]?.emailAddress?.includes('nrk') ||
                  user?.publicMetadata?.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You don't have admin privileges
              </p>
              <Button asChild>
                <a href="/">Go Home</a>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage ideas, categories, users, and platform settings.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Ideas
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalIdeas}
                  </p>
                </div>
                <Lightbulb className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalUsers}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Views
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalViews}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Likes
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalLikes}
                  </p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="ideas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ideas">Ideas</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="ideas" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Manage Ideas ({ideas.length})
              </h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Idea
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Likes</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ideas.slice(0, 10).map((idea) => (
                      <TableRow key={idea._id}>
                        <TableCell className="font-medium">
                          {idea.title}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{idea.category}</Badge>
                        </TableCell>
                        <TableCell>{idea.views}</TableCell>
                        <TableCell>{idea.likes}</TableCell>
                        <TableCell>
                          <Badge variant={idea.isActive ? "default" : "secondary"}>
                            {idea.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteIdea(idea._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Manage Categories ({categories.length})
              </h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Category
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Ideas Count</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category._id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            <span>{category.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>{category.ideaCount}</TableCell>
                        <TableCell>
                          <Badge variant={category.isActive ? "default" : "secondary"}>
                            {category.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCategory(category._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Manage Users ({users.length})
              </h2>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Brownie Points</TableHead>
                      <TableHead>Views Remaining</TableHead>
                      <TableHead>Premium</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.slice(0, 10).map((user) => (
                      <TableRow key={user.clerkId}>
                        <TableCell className="font-medium">
                          {user.email}
                        </TableCell>
                        <TableCell>{user.browniePoints}</TableCell>
                        <TableCell>{user.viewsRemaining}</TableCell>
                        <TableCell>
                          <Badge variant={user.isPremium ? "default" : "secondary"}>
                            {user.isPremium ? "Premium" : "Free"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Platform Analytics
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Popular Categories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories
                      .sort((a, b) => b.ideaCount - a.ideaCount)
                      .slice(0, 5)
                      .map((category) => (
                        <div key={category._id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            <span className="text-sm">{category.name}</span>
                          </div>
                          <Badge variant="secondary">{category.ideaCount} ideas</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Top Ideas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ideas
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 5)
                      .map((idea) => (
                        <div key={idea._id} className="flex items-center justify-between">
                          <span className="text-sm truncate flex-1 mr-2">{idea.title}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{idea.views} views</Badge>
                            <Badge variant="outline">{idea.likes} likes</Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
