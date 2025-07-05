import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Stat {
  icon: LucideIcon;
  title: string;
  value: string;
  change?: string;
  period?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

interface StatsSectionProps {
  stats: Stat[];
  title?: string;
  description?: string;
  className?: string;
}

export default function StatsSection({
  stats,
  title,
  description,
  className = ''
}: StatsSectionProps) {
  const getChangeColor = (changeType?: string) => {
    switch (changeType) {
      case 'positive':
        return 'text-green-700 bg-green-100';
      case 'negative':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-blue-700 bg-blue-100';
    }
  };

  return (
    <section className={`py-12 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {(title || description) && (
          <div className="text-center mb-8">
            {title && (
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            )}
            {description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
return (
              <Card key={index} className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                    {stat.change && (
                      <Badge 
                        variant="secondary" 
                        className={getChangeColor(stat.changeType)}
                      >
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    {stat.period && (
                      <p className="text-xs text-gray-500">{stat.period}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}