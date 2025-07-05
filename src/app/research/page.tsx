import { Metadata } from 'next';
import { BarChart3, TrendingUp, Users, Globe, Download, Calendar, Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/common/HeroSection';
import StatsSection from '@/components/common/StatsSection';

export const metadata: Metadata = {
  title: 'Impact Research - ProblemDriven',
  description: 'Research insights and data on problem-solving impact and effectiveness',
};

const researchStats = [
  {
    icon: Users,
    title: 'Active Problem Solvers',
    value: '125,000+',
    change: '+23%',
    period: 'vs last quarter'
  },
  {
    icon: Globe,
    title: 'Problems Addressed',
    value: '45,000+',
    change: '+18%',
    period: 'this year'
  },
  {
    icon: TrendingUp,
    title: 'Success Rate',
    value: '87%',
    change: '+5%',
    period: 'improvement'
  },
  {
    icon: BarChart3,
    title: 'Impact Score',
    value: '9.2/10',
    change: '+0.8',
    period: 'average rating'
  }
];

const researchReports = [
  {
    id: 1,
    title: 'Global Problem-Solving Trends 2024',
    description: 'Comprehensive analysis of emerging challenges and innovative solutions across different sectors and regions.',
    category: 'Annual Report',
    publishDate: '2024-01-15',
    downloadCount: '12,500+',
    pages: 156,
    featured: true,
    tags: ['Global Trends', 'Innovation', 'Sustainability']
  },
  {
    id: 2,
    title: 'AI-Assisted Problem Solving: Effectiveness Study',
    description: 'Research on the impact of artificial intelligence tools in enhancing problem-solving capabilities and outcomes.',
    category: 'Research Study',
    publishDate: '2023-11-20',
    downloadCount: '8,200+',
    pages: 89,
    featured: true,
    tags: ['AI', 'Technology', 'Effectiveness']
  },
  {
    id: 3,
    title: 'Community-Driven Solutions: Impact Assessment',
    description: 'Analysis of community-led initiatives and their effectiveness in addressing local and global challenges.',
    category: 'Impact Study',
    publishDate: '2023-09-10',
    downloadCount: '6,800+',
    pages: 124,
    featured: true,
    tags: ['Community', 'Social Impact', 'Collaboration']
  }
];

const caseStudies = [
  {
    id: 1,
    title: 'Reducing Urban Food Waste by 40%',
    organization: 'City of Barcelona',
    sector: 'Urban Planning',
    impact: '40% reduction in food waste',
    timeline: '18 months',
    description: 'How Barcelona implemented a comprehensive food waste reduction program using community engagement and technology.'
  },
  {
    id: 2,
    title: 'Clean Water Access for 50,000 People',
    organization: 'WaterTech Solutions',
    sector: 'Water & Sanitation',
    impact: '50,000 people gained access',
    timeline: '24 months',
    description: 'Innovative water purification technology deployment in rural communities across three countries.'
  },
  {
    id: 3,
    title: 'Digital Education Gap Closure',
    organization: 'EduBridge Initiative',
    sector: 'Education',
    impact: '85% improvement in digital literacy',
    timeline: '12 months',
    description: 'Comprehensive digital education program that bridged the technology gap in underserved communities.'
  }
];

const upcomingResearch = [
  {
    title: 'Climate Solutions Effectiveness Report 2024',
    expectedDate: 'Q2 2024',
    description: 'Comprehensive analysis of climate change solutions and their real-world impact.'
  },
  {
    title: 'Mental Health Innovation Study',
    expectedDate: 'Q3 2024',
    description: 'Research on innovative approaches to mental health challenges in the digital age.'
  },
  {
    title: 'Sustainable Business Models Research',
    expectedDate: 'Q4 2024',
    description: 'Study on sustainable business practices and their long-term viability.'
  }
];

export default function ResearchPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <HeroSection
          title="Impact Research"
          description="Data-driven insights into problem-solving effectiveness, global trends, and the real-world impact of innovative solutions."
          gradient="from-blue-600 to-purple-600"
        />

        {/* Stats Section */}
        <StatsSection
          stats={researchStats.map(stat => ({
            ...stat,
            changeType: 'positive' as const
          }))}
          className="-mt-8"
        />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="reports" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports">Research Reports</TabsTrigger>
            <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Research</TabsTrigger>
          </TabsList>

          {/* Research Reports Tab */}
          <TabsContent value="reports" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Reports</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                In-depth analysis and insights from our research team and partner organizations
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {researchReports.map((report) => (
                <Card key={report.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{report.category}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="h-4 w-4 mr-1" />
                        {report.downloadCount}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {report.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(report.publishDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          {report.pages} pages
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Case Studies Tab */}
          <TabsContent value="case-studies" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real-world examples of effective problem-solving and measurable impact
              </p>
            </div>

            <div className="space-y-6">
              {caseStudies.map((study) => (
                <Card key={study.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-3">
                          <Badge variant="outline">{study.sector}</Badge>
                          <span className="text-sm text-gray-500">{study.organization}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {study.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{study.description}</p>
                        <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                          Read Full Case Study →
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-500 mb-1">Impact</div>
                          <div className="font-semibold text-gray-900">{study.impact}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-500 mb-1">Timeline</div>
                          <div className="font-semibold text-gray-900">{study.timeline}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Upcoming Research Tab */}
          <TabsContent value="upcoming" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Research</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stay informed about our upcoming research initiatives and publications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingResearch.map((research, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">Coming Soon</Badge>
                      <span className="text-sm text-gray-500">{research.expectedDate}</span>
                    </div>
                    <CardTitle className="text-lg">{research.title}</CardTitle>
                    <CardDescription>{research.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Get Notified
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Stay Updated on Our Research
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Subscribe to our research newsletter to receive the latest insights, 
                  reports, and case studies directly in your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </PageLayout>
  );
}