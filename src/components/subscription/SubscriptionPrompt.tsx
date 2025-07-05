'use client';

import { useState } from 'react';
import {
    Grab,
  Globe,
  Check,
  Target,
  Users,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SubscriptionPromptProps {
  isOpen: boolean;
  onClose: () => void;
  viewsUsed: number;
  totalFreeViews: number;
}

const premiumFeatures = [
  {
    icon: Grab,
    title: 'Unlimited Problem Solutions',
    description: 'Access all 10,000+ problem-solution pairs across all categories'
  },
  {
    icon: Target,
    title: 'AI-Powered Problem Analysis',
    description: 'Get impact analysis, feasibility scores, and implementation roadmaps'
  },
  {
    icon: Users,
    title: 'Solution Expert Network',
    description: '24/7 access to problem-solving experts and implementation consultants'
  },
  {
    icon: Globe,
    title: 'Global Impact Solutions',
    description: 'Solutions tailored for 15+ regions with local impact insights'
  }
];

const plans = [
  {
    name: 'Monthly',
    price: '$9.99',
    period: '/month',
    popular: false,
    savings: null
  },
  {
    name: 'Yearly',
    price: '$79.99',
    period: '/year',
    popular: true,
    savings: 'Save 33%'
  }
];

export default function SubscriptionPrompt({
  isOpen,
  onClose,
  viewsUsed,
  totalFreeViews
}: SubscriptionPromptProps) {
  const [selectedPlan, setSelectedPlan] = useState('Yearly');

  const handleSubscribe = (planName: string) => {
    // Here you would integrate with your payment processor
    console.log(`Subscribing to ${planName} plan`);
    // For now, just close the modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2 text-2xl">
              <Target className="h-6 w-6 text-teal-500" />
              <span>Unlock Premium Solutions</span>
            </DialogTitle>
            {/*<Button variant="ghost" size="sm" onClick={onClose}>*/}
            {/*  <X className="h-4 w-4" />*/}
            {/*</Button>*/}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="hidden bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Free Solution Views Used</span>
              <span className="text-sm text-gray-600">
                {viewsUsed} / {totalFreeViews}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(viewsUsed / totalFreeViews) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">
              You've reached your free viewing limit. Upgrade to continue solving problems!
            </p>
          </div>

          {/* Features Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-4">What you'll get with Premium:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {premiumFeatures.map((feature, index) => {
                const Icon = feature.icon;

return (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="bg-teal-100 dark:bg-teal-900 p-2 rounded-lg">
                      <Icon className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{feature.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing Plans */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">Choose Your Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative cursor-pointer transition-all duration-200 ${
                    selectedPlan === plan.name
                      ? 'ring-2 ring-teal-500 shadow-lg'
                      : 'hover:shadow-md'
                  } ${plan.popular ? 'border-teal-500' : ''}`}
                  onClick={() => setSelectedPlan(plan.name)}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-teal-600">
                      Most Popular
                    </Badge>
                  )}

                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-600 text-sm">{plan.period}</span>
                    </div>
                    {plan.savings && (
                      <Badge variant="secondary" className="mt-2">
                        {plan.savings}
                      </Badge>
                    )}
                  </CardHeader>

                  <CardContent className="pt-2">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Unlimited solution access</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>AI problem analysis</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Expert consultation</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Global impact insights</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              className="flex-1"
              size="lg"
              onClick={() => handleSubscribe(selectedPlan)}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <Target className="h-4 w-4 mr-2" />
              Upgrade to Premium
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onClose}
              className="flex-1 sm:flex-none"
            >
              Maybe Later
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="text-center text-xs text-gray-600 space-y-1">
            <p>✓ Cancel anytime • ✓ 30-day money-back guarantee</p>
            <p>✓ Secure payment • ✓ Join 10,000+ problem solvers</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
