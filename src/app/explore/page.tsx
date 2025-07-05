'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Navigation from '@/components/layout/Navigation';

import SolutionCard from '@/components/ideas/IdeaCard';
import SubscriptionPrompt from '@/components/subscription/SubscriptionPrompt';
import InlineFilters, { FilterOptions } from '@/components/filters/InlineFilters';
import AdvancedPagination from '@/components/ui/advanced-pagination';

import Footer from '@/components/layout/Footer';
import { Idea, User as UserType } from '@/types';
import {
  Search,
  Target,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ExplorePage() {
  const { isSignedIn, user } = useUser();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  const router = useRouter();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Advanced filters state
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    difficulty: 'all',
    investmentRange: [0, 1000000],
    marketPotential: 'all',
    sustainabilityRating: 'all',
    tags: [],
    sortBy: 'createdAt',
    sortOrder: 'desc',
    dateRange: 'all',
    minLikes: 0,
    minViews: 0,
    language: 'en'
  });

  useEffect(() => {
    fetchIdeas();
    if (isSignedIn) {
      fetchUserData();
    }
  }, [isSignedIn, selectedCategories, searchQuery, filters, currentPage, itemsPerPage]);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      // Pagination
      params.append('page', currentPage.toString());
      params.append('limit', itemsPerPage.toString());

      // Search
      if (searchQuery) params.append('search', searchQuery);

      // Categories (combine selected categories with filter categories)
      const allCategories = [...new Set([...selectedCategories, ...filters.categories])];
      if (allCategories.length > 0) {
        params.append('categories', allCategories.join(','));
      }

      // Advanced filters
      if (filters.difficulty !== 'all') params.append('difficulty', filters.difficulty);
      if (filters.marketPotential !== 'all') params.append('marketPotential', filters.marketPotential);
      if (filters.sustainabilityRating !== 'all') params.append('sustainabilityRating', filters.sustainabilityRating);
      if (filters.tags.length > 0) params.append('tags', filters.tags.join(','));
      if (filters.dateRange !== 'all') params.append('dateRange', filters.dateRange);
      if (filters.minLikes > 0) params.append('minLikes', filters.minLikes.toString());
      if (filters.minViews > 0) params.append('minViews', filters.minViews.toString());
      if (filters.investmentRange[0] > 0) params.append('minInvestment', filters.investmentRange[0].toString());
      if (filters.investmentRange[1] < 1000000) params.append('maxInvestment', filters.investmentRange[1].toString());

      // Sorting
      params.append('sortBy', filters.sortBy);
      params.append('sortOrder', filters.sortOrder);
      params.append('language', filters.language);

      const response = await fetch(`/api/ideas?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setIdeas(data.ideas || []);
        setTotalItems(data.pagination?.total || 0);
        setTotalPages(data.pagination?.totalPages || 0);
      }
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      console.log("USER DATA ::")
      const response = await fetch('/api/user/profile');
      if (response.ok) {
        const data = await response.json();
        console.log("USER DATA ::",data.user)
        setUserData(data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleResetFilters = () => {
    setFilters({
      categories: [],
      difficulty: 'all',
      investmentRange: [0, 1000000],
      marketPotential: 'all',
      sustainabilityRating: 'all',
      tags: [],
      sortBy: 'createdAt',
      sortOrder: 'desc',
      dateRange: 'all',
      minLikes: 0,
      minViews: 0,
      language: 'en'
    });
    setSelectedCategories([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleIdeaView = async (ideaId: string) => {
    if (!isSignedIn) {
      // Redirect to sign-in for non-authenticated users
      window.location.href = '/sign-in';
      
return;
    }

    // Check if user has reached free limit
    if (!userData?.isPremium && (userData?.viewsRemaining || 0) <= 0) {
      setShowSubscriptionPrompt(true);
      
return;
    }
    router.push(`/idea/${ideaId}`);

    try {
      // Record the view
      await fetch('/api/user/view-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaId })
      });

      // Update local state
      if (userData) {
        setUserData({
          ...userData,
          viewsRemaining: userData.isPremium ? userData.viewsRemaining : userData.viewsRemaining - 1
        });
      }

      setViewCount(prev => prev + 1);

      // Show subscription prompt after 6 views for free users
      if (!userData?.isPremium && viewCount >= 5) {
        setShowSubscriptionPrompt(true);
      }
    } catch (error) {
      console.error('Error recording view:', error);
    }
  };

  const handleIdeaLike = async (ideaId: string) => {
    if (!isSignedIn) {
      window.location.href = '/sign-in';
      
return;
    }

    try {
      await fetch('/api/ideas/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaId })
      });

      // Update local state
      setIdeas(prev => prev.map(idea =>
        idea._id === ideaId
          ? { ...idea, likes: idea.likes + 1 }
          : idea
      ));
    } catch (error) {
      console.error('Error liking idea:', error);
    }
  };

  const handleIdeaSave = async (ideaId: string) => {
    if (!isSignedIn) {
      window.location.href = '/sign-in';
      
return;
    }

    try {
      await fetch('/api/user/save-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaId })
      });
    } catch (error) {
      console.error('Error saving idea:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation
        onSearch={handleSearch}
        browniePoints={userData?.browniePoints}
        viewsRemaining={userData?.viewsRemaining}
        userData={userData ? {
          isPremium: userData.isPremium,
          viewsRemaining: userData.viewsRemaining
        } : null}
        onShowSubscriptionPrompt={() => setShowSubscriptionPrompt(true)}
      />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        <div className="w-full">
          {/* Main Content */}
          <div className="w-full">
            {/* Page Title */}
            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-teal-600" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Explore Ideas
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Discover innovative solutions to real-world problems
              </p>
            </div>

            {/* Inline Filters */}
            <InlineFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onReset={handleResetFilters}
              totalResults={totalItems}
            />

            {/* Ideas Grid - Responsive */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 sm:mb-4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-3 sm:mb-4 w-3/4"></div>
                    <div className="flex space-x-2 mb-3 sm:mb-4">
                      <div className="h-5 sm:h-6 w-12 sm:w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-5 sm:h-6 w-10 sm:w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div className="h-16 sm:h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : ideas.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {ideas.map((idea) => (
                  <SolutionCard
                    key={idea._id}
                    idea={idea}
                    onLike={handleIdeaLike}
                    onSave={handleIdeaSave}
                    onView={handleIdeaView}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 px-4">
                <Search className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No solutions found
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Try adjusting your search or filters to discover more problem solutions
                </p>
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="mt-8">
                <AdvancedPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                  showItemsPerPage={true}
                  showInfo={true}
                  className="border-t pt-6"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subscription Prompt */}
      <SubscriptionPrompt
        isOpen={showSubscriptionPrompt}
        onClose={() => setShowSubscriptionPrompt(false)}
        viewsUsed={6 - (userData?.viewsRemaining || 6)}
        totalFreeViews={6}
      />

      <Footer />
    </div>
  );
}