import { Metadata } from 'next';
import { Calendar, Clock, User, Tag, ArrowRight, Search, TrendingUp, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/common/HeroSection';

export const metadata: Metadata = {
  title: 'Blogs - ProblemDriven',
  description: 'Insights, tips, and thought leadership on problem-solving and innovation',
};

const blogCategories = [
  { name: 'All Posts', count: 89, active: true },
  { name: 'Problem Analysis', count: 23, active: false },
  { name: 'Innovation', count: 18, active: false },
  { name: 'Case Studies', count: 15, active: false },
  { name: 'Technology', count: 12, active: false },
  { name: 'Leadership', count: 11, active: false },
  { name: 'Methodology', count: 10, active: false }
];

const featuredPost = {
  id: 1,
  title: 'The Future of AI-Assisted Problem Solving: Trends and Predictions for 2024',
  excerpt: 'Explore how artificial intelligence is revolutionizing the way we approach complex problems and what this means for the future of innovation.',
  content: 'As we advance into 2024, the intersection of artificial intelligence and problem-solving continues to evolve at an unprecedented pace...',
  author: {
    name: 'Dr. Sarah Chen',
    avatar: '/api/placeholder/40/40',
    bio: 'AI Research Director at ProblemDriven'
  },
  category: 'Technology',
  publishDate: '2024-01-20',
  readTime: '12 min read',
  tags: ['AI', 'Innovation', 'Future Trends', 'Technology'],
  featured: true,
  image: '/api/placeholder/800/400'
};

const recentPosts = [
  {
    id: 2,
    title: 'Building Resilient Communities Through Collaborative Problem-Solving',
    excerpt: 'Learn how communities can work together to address challenges and build long-term resilience.',
    author: {
      name: 'Marcus Johnson',
      avatar: '/api/placeholder/40/40'
    },
    category: 'Leadership',
    publishDate: '2024-01-18',
    readTime: '8 min read',
    tags: ['Community', 'Collaboration', 'Resilience']
  },
  {
    id: 3,
    title: '5 Common Mistakes in Problem Definition (And How to Avoid Them)',
    excerpt: 'Discover the most frequent errors people make when defining problems and practical strategies to overcome them.',
    author: {
      name: 'Elena Rodriguez',
      avatar: '/api/placeholder/40/40'
    },
    category: 'Methodology',
    publishDate: '2024-01-15',
    readTime: '6 min read',
    tags: ['Problem Definition', 'Best Practices', 'Methodology']
  },
  {
    id: 4,
    title: 'From Idea to Impact: A Step-by-Step Guide to Solution Implementation',
    excerpt: 'A comprehensive guide to turning your innovative ideas into real-world solutions that create lasting impact.',
    author: {
      name: 'David Kim',
      avatar: '/api/placeholder/40/40'
    },
    category: 'Innovation',
    publishDate: '2024-01-12',
    readTime: '10 min read',
    tags: ['Implementation', 'Innovation', 'Impact']
  },
  {
    id: 5,
    title: 'The Psychology of Problem-Solving: Understanding Cognitive Biases',
    excerpt: 'Explore how our minds work when solving problems and learn to overcome common cognitive biases.',
    author: {
      name: 'Dr. Lisa Wong',
      avatar: '/api/placeholder/40/40'
    },
    category: 'Problem Analysis',
    publishDate: '2024-01-10',
    readTime: '9 min read',
    tags: ['Psychology', 'Cognitive Bias', 'Problem Analysis']
  }
];

const allPosts = [
  {
    id: 6,
    title: 'Design Thinking vs. Systems Thinking: When to Use Each Approach',
    excerpt: 'Compare two powerful problem-solving methodologies and learn when to apply each one.',
    author: {
      name: 'Alex Rivera',
      avatar: '/api/placeholder/40/40'
    },
    category: 'Methodology',
    publishDate: '2024-01-08',
    readTime: '7 min read',
    tags: ['Design Thinking', 'Systems Thinking', 'Methodology']
  },
  {
    id: 7,
    title: 'Measuring Social Impact: Metrics That Matter',
    excerpt: 'Learn how to effectively measure and communicate the social impact of your problem-solving initiatives.',
    author: {
      name: 'Priya Patel',
      avatar: '/api/placeholder/40/40'
    },
    category: 'Case Studies',
    publishDate: '2024-01-05',
    readTime: '11 min read',
    tags: ['Social Impact', 'Metrics', 'Measurement']
  },
  {
    id: 8,
    title: 'The Role of Empathy in Effective Problem-Solving',
    excerpt: 'Discover why empathy is crucial for understanding problems deeply and creating meaningful solutions.',
    author: {
      name: 'Fatima Al-Zahra',
      avatar: '/api/placeholder/40/40'
    },
    category: 'Leadership',
    publishDate: '2024-01-03',
    readTime: '5 min read',
    tags: ['Empathy', 'Leadership', 'Human-Centered Design']
  },
  {
    id: 9,
    title: 'Blockchain for Social Good: Real-World Applications',
    excerpt: 'Explore how blockchain technology is being used to solve social and environmental problems.',
    author: {
      name: 'James Okoye',
      avatar: '/api/placeholder/40/40'
    },
    category: 'Technology',
    publishDate: '2024-01-01',
    readTime: '13 min read',
    tags: ['Blockchain', 'Social Good', 'Technology']
  }
];

const trendingTags = [
  'AI & Machine Learning',
  'Sustainability',
  'Social Innovation',
  'Design Thinking',
  'Data Science',
  'Community Building',
  'Digital Transformation',
  'Impact Measurement'
];

export default function BlogPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <HeroSection
          title="Blogs"
          description="Insights, methodologies, and thought leadership on problem-solving, innovation, and creating meaningful impact in the world."
          gradient="from-indigo-600 to-purple-600"
        >
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search articles, topics, or authors..."
              className="pl-10 pr-4 py-3 w-full bg-white/10 border-white/20 text-white placeholder-white/70 focus:bg-white/20"
            />
          </div>
        </HeroSection>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1">
            {/* Featured Post */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <TrendingUp className="h-5 w-5 text-indigo-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
              </div>

              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-indigo-600" />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <Badge variant="secondary">{featuredPost.category}</Badge>
                    <div className="flex flex-wrap gap-2">
                      {featuredPost.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={featuredPost.author.avatar} alt={featuredPost.author.name} />
                        <AvatarFallback>{featuredPost.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{featuredPost.author.name}</p>
                        <p className="text-sm text-gray-500">{featuredPost.author.bio}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(featuredPost.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                      Read Full Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Recent Posts */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{post.category}</Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.publishDate).toLocaleDateString()}
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback className="text-xs">{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">{post.author.name}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* All Posts */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">All Articles</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                    <option>Most Commented</option>
                    <option>Reading Time</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {allPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <Badge variant="outline">{post.category}</Badge>
                            <div className="flex flex-wrap gap-1">
                              {post.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium text-gray-900">
                                {post.author.name}
                              </span>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(post.publishDate).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {post.readTime}
                              </div>
                            </div>
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
                  Load More Articles
                </Button>
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0 space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  {blogCategories.map((category) => (
                    <button
                      key={category.name}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        category.active
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
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
              </CardContent>
            </Card>

            {/* Trending Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Trending Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-indigo-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get the latest articles and insights delivered to your inbox weekly.
                </p>
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white"
                  />
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
        </div>
      </div>
    </PageLayout>
  );
}
