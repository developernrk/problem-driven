import { Metadata } from 'next';
import { Shield, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/common/HeroSection';
import ContactSection from '@/components/common/ContactSection';

export const metadata: Metadata = {
  title: 'Privacy Policy - ProblemDriven',
  description: 'Learn how ProblemDriven collects, uses, and protects your personal information',
};

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <HeroSection
          title="Privacy Policy"
          description="Your privacy is important to us. This policy explains how we collect, use, and protect your personal information."
          icon={Shield}
          gradient="from-blue-600 to-indigo-600"
          lastUpdated="January 1, 2024"
        />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Overview</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                ProblemDriven ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you visit our website and use our services.
              </p>
              <p>
                By using our services, you consent to the collection and use of information 
                in accordance with this policy.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <p>We may collect personal information that you provide directly to us, including:</p>
              <ul>
                <li>Name and contact information (email address, phone number)</li>
                <li>Account credentials (username, password)</li>
                <li>Profile information and preferences</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Communications with us (support requests, feedback)</li>
              </ul>

              <h3 className="text-lg font-semibold">Usage Information</h3>
              <p>We automatically collect certain information about your use of our services:</p>
              <ul>
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage patterns (pages visited, time spent, features used)</li>
                <li>Log data (access times, error logs)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>We use the information we collect for various purposes, including:</p>
              <ul>
                <li>Providing and maintaining our services</li>
                <li>Processing transactions and managing your account</li>
                <li>Personalizing your experience and content</li>
                <li>Communicating with you about our services</li>
                <li>Sending marketing communications (with your consent)</li>
                <li>Analyzing usage patterns to improve our services</li>
                <li>Detecting and preventing fraud or abuse</li>
                <li>Complying with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>We do not sell, trade, or rent your personal information. We may share your information in the following circumstances:</p>
              
              <h3 className="text-lg font-semibold">Service Providers</h3>
              <p>We may share information with third-party service providers who assist us in operating our platform, such as:</p>
              <ul>
                <li>Cloud hosting and storage providers</li>
                <li>Payment processors</li>
                <li>Analytics services</li>
                <li>Customer support tools</li>
              </ul>

              <h3 className="text-lg font-semibold">Legal Requirements</h3>
              <p>We may disclose information if required by law or in response to:</p>
              <ul>
                <li>Legal process or government requests</li>
                <li>Protection of our rights and property</li>
                <li>Safety of our users or the public</li>
                <li>Investigation of potential violations of our terms</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Data Security</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>We implement appropriate technical and organizational measures to protect your personal information:</p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
              <p>
                However, no method of transmission over the internet or electronic storage 
                is 100% secure. While we strive to protect your information, we cannot 
                guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>You have certain rights regarding your personal information:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Limit how we process your information</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided below.
              </p>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>We use cookies and similar technologies to:</p>
              <ul>
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and advertisements</li>
                <li>Improve our services and user experience</li>
              </ul>
              <p>
                You can control cookies through your browser settings. However, disabling 
                cookies may affect the functionality of our services.
              </p>
            </CardContent>
          </Card>

          {/* International Transfers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Your information may be transferred to and processed in countries other than 
                your country of residence. We ensure appropriate safeguards are in place to 
                protect your information in accordance with applicable data protection laws.
              </p>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Our services are not intended for children under 13 years of age. We do not 
                knowingly collect personal information from children under 13. If we become 
                aware that we have collected personal information from a child under 13, we 
                will take steps to delete such information.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of 
                any changes by posting the new policy on this page and updating the "Last 
                updated" date. We encourage you to review this policy periodically.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <ContactSection
            contactInfo={{
              email: 'privacy@problemdriven.com',
              phone: '+1 (555) 123-4567',
              address: '123 Innovation Street, San Francisco, CA 94105'
            }}
            description="If you have any questions about this Privacy Policy or our data practices, please contact us:"
          />
        </div>
        </div>
      </div>
    </PageLayout>
  );
}