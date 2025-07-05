import { Metadata } from 'next';
import { Shield, Users, Lock, FileText, Download, Trash2, Edit, Eye, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/common/HeroSection';

export const metadata: Metadata = {
  title: 'GDPR Compliance - ProblemDriven',
  description: 'Information about GDPR compliance and your data protection rights',
};

const gdprRights = [
  {
    icon: Eye,
    title: 'Right to Access',
    description: 'You have the right to know what personal data we hold about you and how we use it.',
    action: 'Request Data Copy'
  },
  {
    icon: Edit,
    title: 'Right to Rectification',
    description: 'You can ask us to correct any inaccurate or incomplete personal data.',
    action: 'Update Information'
  },
  {
    icon: Trash2,
    title: 'Right to Erasure',
    description: 'You can request that we delete your personal data under certain circumstances.',
    action: 'Delete Account'
  },
  {
    icon: Lock,
    title: 'Right to Restrict Processing',
    description: 'You can ask us to limit how we use your personal data in specific situations.',
    action: 'Restrict Processing'
  },
  {
    icon: Download,
    title: 'Right to Data Portability',
    description: 'You can request a copy of your data in a machine-readable format.',
    action: 'Export Data'
  },
  {
    icon: Shield,
    title: 'Right to Object',
    description: 'You can object to certain types of processing, including direct marketing.',
    action: 'Manage Preferences'
  }
];

const legalBases = [
  {
    title: 'Consent',
    description: 'When you have given clear consent for us to process your personal data for specific purposes.',
    examples: ['Newsletter subscriptions', 'Marketing communications', 'Optional features']
  },
  {
    title: 'Contract',
    description: 'When processing is necessary for the performance of a contract with you.',
    examples: ['Account creation', 'Service delivery', 'Payment processing']
  },
  {
    title: 'Legal Obligation',
    description: 'When we need to process your data to comply with legal requirements.',
    examples: ['Tax records', 'Regulatory compliance', 'Legal proceedings']
  },
  {
    title: 'Legitimate Interest',
    description: 'When we have a legitimate business interest that doesn\'t override your rights.',
    examples: ['Security monitoring', 'Service improvement', 'Fraud prevention']
  }
];

export default function GDPRPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <HeroSection
          title="GDPR Compliance"
          description="Your data protection rights under the General Data Protection Regulation (GDPR)."
          icon={Shield}
          gradient="from-blue-700 to-indigo-800"
          badge={{ text: 'Effective since May 25, 2018' }}
        />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Users className="h-6 w-6 mr-3 text-blue-600" />
                GDPR Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                The General Data Protection Regulation (GDPR) is a comprehensive data protection 
                law that gives individuals in the European Union greater control over their personal data. 
                At ProblemDriven, we are committed to protecting your privacy and ensuring compliance 
                with GDPR requirements.
              </p>
              <p>
                This page explains your rights under GDPR and how we handle your personal data 
                in accordance with these regulations.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your GDPR Rights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gdprRights.map((right, index) => {
                const Icon = right.icon;
                
return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-blue-100 rounded-lg p-2">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg">{right.title}</CardTitle>
                      </div>
                      <CardContent className="p-0">
                        <p className="text-gray-600 mb-4">{right.description}</p>
                        <Button variant="outline" size="sm" className="w-full">
                          {right.action}
                        </Button>
                      </CardContent>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Legal Basis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <FileText className="h-6 w-6 mr-3 text-blue-600" />
                Legal Basis for Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Under GDPR, we must have a legal basis for processing your personal data. 
                Here are the legal bases we rely on:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {legalBases.map((basis, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{basis.title}</h3>
                    <p className="text-gray-600 mb-4">{basis.description}</p>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Examples:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {basis.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Processing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">How We Process Your Data</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold">Data We Collect</h3>
              <ul>
                <li><strong>Identity Data:</strong> Name, username, email address</li>
                <li><strong>Contact Data:</strong> Email address, phone number, address</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
                <li><strong>Usage Data:</strong> How you interact with our services</li>
                <li><strong>Marketing Data:</strong> Your preferences for receiving communications</li>
              </ul>

              <h3 className="text-lg font-semibold">How We Use Your Data</h3>
              <ul>
                <li>Provide and maintain our services</li>
                <li>Process transactions and manage your account</li>
                <li>Communicate with you about our services</li>
                <li>Improve our services and develop new features</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h3 className="text-lg font-semibold">Data Retention</h3>
              <p>
                We retain your personal data only for as long as necessary to fulfill the 
                purposes for which it was collected, comply with legal obligations, or 
                resolve disputes. Specific retention periods vary depending on the type 
                of data and the purpose for processing.
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
                Your personal data may be transferred to and processed in countries outside 
                the European Economic Area (EEA). When we transfer your data internationally, 
                we ensure appropriate safeguards are in place:
              </p>
              <ul>
                <li><strong>Adequacy Decisions:</strong> Transfers to countries deemed adequate by the European Commission</li>
                <li><strong>Standard Contractual Clauses:</strong> EU-approved contracts that provide data protection guarantees</li>
                <li><strong>Binding Corporate Rules:</strong> Internal rules approved by EU data protection authorities</li>
                <li><strong>Certification Schemes:</strong> Transfers under approved certification mechanisms</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Protection Officer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Data Protection Officer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                We have appointed a Data Protection Officer (DPO) to oversee our data 
                protection activities and serve as your point of contact for GDPR-related matters.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Our DPO</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span>dpo@problemdriven.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span>+1 (555) 123-4567 ext. 101</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>Data Protection Officer, 123 Innovation Street, San Francisco, CA 94105</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exercising Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">How to Exercise Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                To exercise any of your GDPR rights, you can:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-sm text-gray-600">Send a request to our DPO</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Account Settings</h3>
                  <p className="text-sm text-gray-600">Manage preferences in your account</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-sm text-gray-600">Speak with our support team</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Response Time:</strong> We will respond to your request within 30 days. 
                  In complex cases, we may extend this period by up to 60 days and will inform you of any delay.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Complaints */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Filing a Complaint</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                If you believe we have not handled your personal data in accordance with GDPR, 
                you have the right to file a complaint with a supervisory authority.
              </p>
              
              <h3 className="text-lg font-semibold">EU Supervisory Authorities</h3>
              <p>
                You can contact the supervisory authority in your EU member state. 
                A list of EU data protection authorities is available on the 
                European Data Protection Board website.
              </p>
              
              <h3 className="text-lg font-semibold">Contact Us First</h3>
              <p>
                We encourage you to contact us first so we can try to resolve any 
                concerns you may have about how we handle your personal data.
              </p>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Updates to GDPR Compliance</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We regularly review and update our GDPR compliance measures to ensure 
                we continue to meet the highest standards of data protection.
              </p>
              <p>
                Any significant changes to how we process your personal data will be 
                communicated to you through our Privacy Policy updates or direct notification.
              </p>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </PageLayout>
  );
}