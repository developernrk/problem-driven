import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface CTAButton {
  text: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
}

interface CTASectionProps {
  title: string;
  description?: string;
  buttons?: CTAButton[];
  gradient?: string;
  children?: ReactNode;
}

export default function CTASection({
  title,
  description,
  buttons = [],
  gradient = 'from-teal-600 to-blue-600',
  children
}: CTASectionProps) {
  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r ${gradient}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {title}
        </h2>
        
        {description && (
          <p className="text-xl text-white/80 mb-8">
            {description}
          </p>
        )}
        
        {buttons.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant || 'default'}
                size={button.size || 'lg'}
                className={button.className || (
                  button.variant === 'outline' 
                    ? 'border-white text-white hover:bg-white hover:text-gray-900'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                )}
                onClick={button.onClick}
              >
                {button.text}
              </Button>
            ))}
          </div>
        )}
        
        {children}
      </div>
    </section>
  );
}