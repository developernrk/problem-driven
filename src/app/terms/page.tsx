import { Metadata } from 'next';
import { FileText, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/common/HeroSection';
import ContactSection from '@/components/common/ContactSection';

export const metadata: Metadata = {
  title: 'Terms of Service - ProblemDriven',
  description: 'Terms and conditions for using ProblemDriven platform and services',
};

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <HeroSection
          title="Terms of Service"
          description="Please read these terms carefully before using our platform and services."
          icon={FileText}
          gradient="from-gray-700 to-gray-900"
          lastUpdated="January 1, 2024"
        />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Agreement */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                These Terms of Service ("Terms") govern your use of the ProblemDriven platform 
                and services ("Service") operated by ProblemDriven Inc. ("us", "we", or "our").
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. 
                If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </CardContent>
          </Card>

          {/* Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold">Account Creation</h3>
              <p>To access certain features of our Service, you must create an account. You agree to:</p>
              <ul>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>

              <h3 className="text-lg font-semibold">Account Eligibility</h3>
              <p>You must be at least 13 years old to create an account. If you are under 18, you represent that you have your parent or guardian's permission to use the Service.</p>
            </CardContent>
          </Card>

          {/* Acceptable Use */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Acceptable Use Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold">Permitted Uses</h3>
              <p>You may use our Service to:</p>
              <ul>
                <li>Access and browse problem-solving content</li>
                <li>Submit problems and solutions</li>
                <li>Collaborate with other users</li>
                <li>Participate in community discussions</li>
                <li>Use our tools and features as intended</li>
              </ul>

              <h3 className="text-lg font-semibold">Prohibited Activities</h3>
              <p>You agree not to:</p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Post harmful, offensive, or inappropriate content</li>
                <li>Spam, harass, or abuse other users</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated tools to access the Service</li>
                <li>Interfere with the proper functioning of the Service</li>
                <li>Impersonate others or provide false information</li>
              </ul>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">User Content</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold">Your Content</h3>
              <p>
                You retain ownership of any content you submit to our Service ("User Content"). 
                By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free 
                license to use, reproduce, modify, and distribute your content in connection with 
                our Service.
              </p>

              <h3 className="text-lg font-semibold">Content Standards</h3>
              <p>All User Content must:</p>
              <ul>
                <li>Be accurate and not misleading</li>
                <li>Comply with applicable laws</li>
                <li>Respect others' rights and privacy</li>
                <li>Be relevant to problem-solving and innovation</li>
                <li>Not contain malicious code or viruses</li>
              </ul>

              <h3 className="text-lg font-semibold">Content Moderation</h3>
              <p>
                We reserve the right to review, modify, or remove User Content that violates 
                these Terms or our community guidelines.
              </p>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold">Our Rights</h3>
              <p>
                The Service and its original content, features, and functionality are owned by 
                ProblemDriven and are protected by international copyright, trademark, patent, 
                trade secret, and other intellectual property laws.
              </p>

              <h3 className="text-lg font-semibold">Limited License</h3>
              <p>
                We grant you a limited, non-exclusive, non-transferable license to access and 
                use the Service for your personal or business purposes, subject to these Terms.
              </p>

              <h3 className="text-lg font-semibold">Trademark Policy</h3>
              <p>
                ProblemDriven and related marks are trademarks of ProblemDriven Inc. 
                You may not use our trademarks without our prior written consent.
              </p>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also 
                governs your use of the Service, to understand our practices regarding the 
                collection and use of your personal information.
              </p>
            </CardContent>
          </Card>

          {/* Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Payments and Subscriptions</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold">Paid Services</h3>
              <p>
                Some features of our Service may require payment. You agree to pay all fees 
                associated with your use of paid features.
              </p>

              <h3 className="text-lg font-semibold">Billing</h3>
              <ul>
                <li>Fees are charged in advance on a recurring basis</li>
                <li>All fees are non-refundable unless otherwise stated</li>
                <li>We may change our fees with 30 days' notice</li>
                <li>You are responsible for all taxes and fees</li>
              </ul>

              <h3 className="text-lg font-semibold">Cancellation</h3>
              <p>
                You may cancel your subscription at any time. Cancellation will take effect 
                at the end of your current billing period.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, 
                FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p>
                We do not warrant that the Service will be uninterrupted, secure, or error-free, 
                or that any defects will be corrected.
              </p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, PROBLEMDRIVEN SHALL NOT BE LIABLE FOR 
                ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING 
                BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL.
              </p>
              <p>
                OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATING TO THE SERVICE 
                SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Termination</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We may terminate or suspend your account and access to the Service immediately, 
                without prior notice, if you breach these Terms.
              </p>
              <p>
                You may terminate your account at any time by contacting us or using the 
                account deletion feature in your settings.
              </p>
              <p>
                Upon termination, your right to use the Service will cease immediately, and 
                we may delete your account and data.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of 
                the State of California, without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising from these Terms or your use of the Service shall be 
                resolved in the courts of San Francisco County, California.
              </p>
            </CardContent>
          </Card>

          {/* Changes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We reserve the right to modify these Terms at any time. We will notify you of 
                any changes by posting the new Terms on this page and updating the "Last updated" date.
              </p>
              <p>
                Your continued use of the Service after any changes constitutes acceptance of 
                the new Terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <ContactSection
            contactInfo={{
              email: 'legal@problemdriven.com',
              phone: '+1 (555) 123-4567',
              address: '123 Innovation Street, San Francisco, CA 94105'
            }}
            description="If you have any questions about these Terms of Service, please contact us:"
          />
        </div>
        </div>
      </div>
    </PageLayout>
  );
}