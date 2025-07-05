'use client';

import React from 'react';
import { X, Crown, Check, Zap, Heart, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  viewsRemaining: number;
  onUpgrade: () => void;
}

const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  viewsRemaining,
  onUpgrade
}) => {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      title: 'Unlimited Idea Access',
      description: 'Browse all 10,000+ manufacturing ideas without limits'
    },
    {
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: 'Save Favorite Ideas',
      description: 'Create your personal collection of promising business ideas'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
      title: 'AI-Powered Recommendations',
      description: 'Get personalized idea suggestions based on your interests'
    },
    {
      icon: <Crown className="w-5 h-5 text-purple-500" />,
      title: 'Premium Support',
      description: 'Priority customer support and exclusive content'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              Unlock Your Innovation Potential
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Status */}
          <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-lg mb-2">
              You've reached your free view limit!
            </h3>
            <p className="text-muted-foreground">
              You have <Badge variant="secondary">{viewsRemaining} views remaining</Badge> out of your 6 free daily views.
            </p>
          </div>

          {/* Pricing Card */}
          <Card className="border-2 border-primary shadow-lg">
            <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                <Crown className="w-6 h-6 text-yellow-500" />
                Premium Access
              </CardTitle>
              <div className="text-3xl font-bold text-primary">
                $19<span className="text-lg text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">
                Everything you need to discover your next big idea
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4 pt-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {feature.icon}
                      <h4 className="font-semibold">{feature.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={onUpgrade}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Premium
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              size="lg"
            >
              Maybe Later
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="text-center text-sm text-muted-foreground">
            <p>✓ Cancel anytime • ✓ 30-day money-back guarantee • ✓ Secure payment</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaywallModal;