import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: LucideIcon;
  badge?: {
    text: string;
    icon?: LucideIcon;
  };
  gradient?: string;
  children?: ReactNode;
  lastUpdated?: string;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  icon: Icon,
  badge,
  gradient = 'from-blue-600 to-indigo-600',
  children,
  lastUpdated
}: HeroSectionProps) {
  return (
    <section className={`bg-gradient-to-r ${gradient} py-16 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto text-center">
        {badge && (
          <div className="flex justify-center mb-6">
            <Badge className="bg-white/10 text-white border-white/20 px-4 py-2">
              <>
                  {badge.icon && <badge.icon className="h-4 w-4 mr-2" />}
                  {badge.text}
              </>
            </Badge>
          </div>
        )}

        {Icon && (
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 rounded-full p-4">
              <Icon className="h-16 w-16 text-white" />
            </div>
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {title}
        </h1>

        {subtitle && (
          <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-4">
            {subtitle}
          </h2>
        )}

        {description && (
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            {description}
          </p>
        )}

        {lastUpdated && (
            <p className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 bg-white/20 text-white border-white/30">
                Effective since {lastUpdated}
            </p>
        )}

        {children}
      </div>
    </section>
  );
}
