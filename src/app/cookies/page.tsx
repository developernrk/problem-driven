import { Metadata } from 'next';
import { Cookie, Settings, Shield, BarChart3, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/common/HeroSection';
import ContactSection from '@/components/common/ContactSection';

export const metadata: Metadata = {
  title: 'Cookie Policy - ProblemDriven',
  description: 'Learn about how ProblemDriven uses cookies and similar technologies',
};

const cookieTypes = [
  {
    icon: Shield,
    name: 'Essential Cookies',
    description: 'Required for the website to function properly',
    examples: ['Authentication', 'Security', 'Form submissions'],
    canDisable: false,
    enabled: true
  },
  {
    icon: Settings,
    name: 'Functional Cookies',
    description: 'Remember your preferences and settings',
    examples: ['Language preferences', 'Theme settings', 'User interface customizations'],
    canDisable: true,
    enabled: true
  },
  {
    icon: BarChart3,
    name: 'Analytics Cookies',
    description: 'Help us understand how you use our website',
    examples: ['Page views', 'User behavior', 'Performance metrics'],
    canDisable: true,
    enabled: false
  },
  {
    icon: Cookie,
    name: 'Marketing Cookies',
    description: 'Used to deliver relevant advertisements',
    examples: ['Ad targeting', 'Campaign tracking', 'Social media integration'],
    canDisable: true,
    enabled: false
  }
];

export default function CookiesPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <HeroSection
          title="Cookie Policy"
          description="Learn about how we use cookies and similar technologies to improve your experience."
          icon={Cookie}
          gradient="from-orange-500 to-red-500"
          lastUpdated="January 1, 2024"
        />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* What are Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">What are Cookies?</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Cookies are small text files that are stored on your device when you visit a website. 
                They help websites remember information about your visit, such as your preferred 
                language and other settings, which can make your next visit easier and the site 
                more useful to you.
              </p>
              <p>
                We use cookies and similar technologies (such as web beacons, pixels, and local 
                storage) to provide, secure, and improve our services.
              </p>
            </CardContent>
          </Card>

          {/* How We Use Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">How We Use Cookies</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>We use cookies for several purposes:</p>
              <ul>
                <li><strong>Authentication:</strong> To keep you logged in as you navigate our site</li>
                <li><strong>Security:</strong> To protect against fraud and abuse</li>
                <li><strong>Preferences:</strong> To remember your settings and preferences</li>
                <li><strong>Analytics:</strong> To understand how our site is used and improve performance</li>
                <li><strong>Functionality:</strong> To provide enhanced features and personalization</li>
                <li><strong>Marketing:</strong> To deliver relevant content and advertisements</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookie Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Cookie Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                You can control which cookies we use by adjusting the settings below. 
                Note that disabling certain cookies may affect the functionality of our website.
              </p>
              
              <div className="space-y-6">
                {cookieTypes.map((cookieType, index) => {
                  const Icon = cookieType.icon;
                  
return (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-6 w-6 text-orange-500" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{cookieType.name}</h3>
                            <p className="text-sm text-gray-600">{cookieType.description}</p>
                          </div>
                        </div>
                        <Switch 
                          checked={cookieType.enabled}
                          disabled={!cookieType.canDisable}
                        />
                      </div>
                      
                      <div className="ml-9">
                        <p className="text-sm text-gray-500 mb-2">Examples:</p>
                        <div className="flex flex-wrap gap-2">
                          {cookieType.examples.map((example, exampleIndex) => (
                            <span 
                              key={exampleIndex}
                              className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                        {!cookieType.canDisable && (
                          <p className="text-xs text-gray-500 mt-2">
                            These cookies are essential and cannot be disabled.
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex space-x-4 mt-6">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Save Preferences
                </Button>
                <Button variant="outline">
                  Accept All
                </Button>
                <Button variant="outline">
                  Reject All (except essential)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We may allow third-party service providers to place cookies on your device 
                to provide certain services. These third parties have their own privacy 
                policies and cookie practices.
              </p>
              
              <h3 className="text-lg font-semibold">Third-Party Services We Use:</h3>
              <ul>
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>Stripe:</strong> For secure payment processing</li>
                <li><strong>Intercom:</strong> For customer support and communication</li>
                <li><strong>Social Media Platforms:</strong> For social sharing and login features</li>
              </ul>
              
              <p>
                You can learn more about these third parties' cookie practices by visiting 
                their respective privacy policies.
              </p>
            </CardContent>
          </Card>

          {/* Managing Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Managing Cookies in Your Browser</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Most web browsers allow you to control cookies through their settings. 
                You can usually find these settings in the "Options" or "Preferences" menu.
              </p>
              
              <h3 className="text-lg font-semibold">Browser-Specific Instructions:</h3>
              <ul>
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
              </ul>
              
              <p>
                Please note that if you disable cookies, some features of our website may 
                not function properly.
              </p>
            </CardContent>
          </Card>

          {/* Cookie Retention */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Cookie Retention</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>We use both session and persistent cookies:</p>
              
              <h3 className="text-lg font-semibold">Session Cookies</h3>
              <p>
                These cookies are temporary and are deleted when you close your browser. 
                They help us maintain your session as you navigate our site.
              </p>
              
              <h3 className="text-lg font-semibold">Persistent Cookies</h3>
              <p>
                These cookies remain on your device for a set period or until you delete them. 
                They help us remember your preferences for future visits.
              </p>
              
              <p>
                The retention period for persistent cookies varies depending on their purpose, 
                typically ranging from 30 days to 2 years.
              </p>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Updates to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We may update this Cookie Policy from time to time to reflect changes in 
                our practices or for other operational, legal, or regulatory reasons.
              </p>
              <p>
                We will notify you of any material changes by posting the updated policy 
                on our website and updating the "Last updated" date.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <ContactSection
            contactInfo={{
              email: 'privacy@problemdriven.com',
              phone: '+1 (555) 123-4567',
              address: '123 Innovation Street, San Francisco, CA 94105'
            }}
            description="If you have any questions about our use of cookies or this Cookie Policy, please contact us:"
            customContent={
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-orange-500" />
                  <span>privacy@problemdriven.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-orange-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-orange-500" />
                  <span>123 Innovation Street, San Francisco, CA 94105</span>
                </div>
              </div>
            }
          />
        </div>
        </div>
      </div>
    </PageLayout>
  );
}