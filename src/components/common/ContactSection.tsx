import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

interface ContactSectionProps {
  title?: string;
  description?: string;
  contactInfo?: ContactInfo;
  customContent?: React.ReactNode;
}

const defaultContactInfo: ContactInfo = {
  email: 'hello@problemdriven.com',
  phone: '+1 (555) 123-4567',
  address: '123 Innovation Street, San Francisco, CA 94105'
};

export default function ContactSection({
  title = 'Contact Us',
  description = 'If you have any questions, please contact us:',
  contactInfo = defaultContactInfo,
  customContent
}: ContactSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {description && (
          <p className="text-gray-600 mb-6">
            {description}
          </p>
        )}
        
        {customContent || (
          <div className="space-y-4">
            {contactInfo.email && (
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <span>{contactInfo.email}</span>
              </div>
            )}
            {contactInfo.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <span>{contactInfo.phone}</span>
              </div>
            )}
            {contactInfo.address && (
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>{contactInfo.address}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}