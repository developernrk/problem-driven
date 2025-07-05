import { Metadata } from 'next';
import { BookOpen, Clock, User, ArrowRight, Search, Filter, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/common/HeroSection';

export const metadata: Metadata = {
  title: 'Solution Guides - ProblemDriven',
  description: 'Comprehensive guides and tutorials for effective problem-solving methodologies',
};

const guideCategories = [
  { name: 'All Guides', count: 47, active: true },
  { name: 'Problem Analysis', count: 12, active: false },
  { name: 'Solution Design', count: 15, active: false },
  { name: 'Implementation', count: 10, active: false },
  { name: 'Impact Measurement', count: 8, active: false },
  { name: 'Team Collaboration', count: 6, active: false }
];

const featuredGuides = [
  {
    id: 1,
    title: 'The Complete Problem-Solving Framework',
    description: 'A comprehensive guide to systematic problem identification, analysis, and solution development.',
    category: 'Problem Analysis',
    readTime: '15 min read',
    author: 'Dr. Sarah Chen',
    rating: 4.9,
    image: '/api/placeholder/400/200',
    featured: true
  },
  {
    id: 2,
    title: 'Design Thinking for Social Impact',
    description: 'Learn how to apply design thinking principles to create solutions for social challenges.',
    category: 'Solution Design',
    readTime: '12 min read',
    author: 'Marcus Johnson',
    rating: 4.8,
    image: '/api/placeholder/400/200',
    featured: true
  },
  {
    id: 3,
    title: 'Measuring Solution Effectiveness',
    description: 'Essential metrics and methodologies for evaluating the impact of your solutions.',
    category: 'Impact Measurement',
    readTime: '10 min read',
    author: 'Elena Rodriguez',
    rating: 4.7,
    image: '/api/placeholder/400/200',
    featured: true
  }
];

const allGuides = [
  {
    id: 4,
    title: 'Root Cause Analysis Techniques',
    description: 'Master the art of identifying underlying causes behind complex problems.',
    category: 'Problem Analysis',
    readTime: '8 min read',
    author: 'David Kim',
    rating: 4.6,
    difficulty: 'Intermediate'
  },
  {
    id: 5,
    title: 'Stakeholder Mapping and Engagement',
    description: 'Build effective relationships with all parties involved in problem-solving.',
    category: 'Team Collaboration',
    readTime: '6 min read',
    author: 'Lisa Thompson',
    rating: 4.5,
    difficulty: 'Beginner'
  },
  {
    id: 6,
    title: 'Rapid Prototyping for Solutions',
    description: 'Quick and effective methods to test your solution ideas before full implementation.',
    category: 'Implementation',
    readTime: '11 min read',
    author: 'Alex Rivera',
    rating: 4.8,
    difficulty: 'Advanced'
  },
  {
    id: 7,
    title: 'Data-Driven Problem Identification',
    description: 'Use analytics and data science to uncover hidden problems and opportunities.',
    category: 'Problem Analysis',
    readTime: '14 min read',
    author: 'Dr. Michael Zhang',
    rating: 4.7,
    difficulty: 'Advanced'
  },
  {
    id: 8,
    title: 'Community-Centered Solution Design',
    description: 'Involve communities in creating solutions that truly address their needs.',
    category: 'Solution Design',
    readTime: '9 min read',
    author: 'Priya Patel',
    rating: 4.6,
    difficulty: 'Intermediate'
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-100 text-green-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function GuidesPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <HeroSection
          title="Solution Guides"
          description="Master the art of problem-solving with our comprehensive guides, tutorials, and best practices from industry experts."
          gradient="from-teal-600 to-blue-600"
        >
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search guides, topics, or authors..."
              className="pl-10 pr-4 py-3 w-full bg-white/10 border-white/20 text-white !placeholder-white/70 focus:bg-white/20"
            />
          </div>
        </HeroSection>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Categories</h3>
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <nav className="space-y-2">
                {guideCategories.map((category) => (
                  <button
                    key={category.name}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      category.active
                        ? 'bg-teal-50 text-teal-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <span className="text-xs text-gray-400">{category.count}</span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Featured Guides */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredGuides.map((guide) => (
                  <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-teal-600" />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{guide.category}</Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          {guide.rating}
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {guide.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {guide.readTime}
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        Read Guide
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* All Guides */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">All Guides</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                    <option>Most Popular</option>
                    <option>Newest</option>
                    <option>Rating</option>
                    <option>Reading Time</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {allGuides.map((guide) => (
                  <Card key={guide.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge variant="outline">{guide.category}</Badge>
                            <Badge className={getDifficultyColor(guide.difficulty)}>
                              {guide.difficulty}
                            </Badge>
                            <div className="flex items-center text-sm text-gray-500">
                              <Star className="h-3 w-3 text-yellow-400 mr-1" />
                              {guide.rating}
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {guide.title}
                          </h3>
                          <p className="text-gray-600 mb-3">{guide.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <User className="h-4 w-4 mr-1" />
                            <span className="mr-4">{guide.author}</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{guide.readTime}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-4">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Guides
                </Button>
              </div>
            </section>
          </main>
        </div>
        </div>
      </div>
    </PageLayout>
  );
}
