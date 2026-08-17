import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { Star, Check, Zap, Sparkles, Heart, Gift } from 'lucide-react';

export const Premium: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Basic messaging',
        'Create communities',
        'Join up to 50 communities',
        'Standard profile',
        'Basic customization',
        'Community features',
      ],
      recommended: false,
    },
    {
      name: 'Premium+',
      price: billingPeriod === 'monthly' ? '$9.99' : '$99.99',
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'For power users',
      features: [
        'Priority support',
        'Premium badge',
        'Custom status effects',
        'Animated profile banner',
        'Animated avatar',
        '100 GB upload limit',
        'Advanced community features',
        'Custom community themes',
        'Early access to features',
        'Premium only events',
      ],
      recommended: true,
      icon: Star,
    },
    {
      name: 'Elite',
      price: billingPeriod === 'monthly' ? '$19.99' : '$199.99',
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'Ultimate experience',
      features: [
        'Everything in Premium+',
        '24/7 priority support',
        'Custom emoji pack',
        'Profile animation package',
        'Exclusive badges',
        'Unlimited uploads',
        'Ad-free experience',
        'Premium community templates',
        'VIP event access',
        'Direct creator support channel',
        'Custom domain for community',
      ],
      recommended: false,
      icon: Sparkles,
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Nexa Premium</h1>
          <p className="text-gray-400 text-lg">Unlock exclusive features and support the platform</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`font-medium ${
            billingPeriod === 'monthly' ? 'text-white' : 'text-gray-400'
          }`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className="relative w-16 h-8 bg-nexa-600 rounded-full transition"
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                billingPeriod === 'yearly' ? 'translate-x-8' : 'translate-x-1'
              }`}
            ></div>
          </button>
          <span className={`font-medium ${
            billingPeriod === 'yearly' ? 'text-white' : 'text-gray-400'
          }`}>
            Yearly
            <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Save 17%</span>
          </span>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <div
                key={idx}
                className={`rounded-lg border transition relative ${
                  plan.recommended
                    ? 'bg-gradient-to-b from-nexa-600/20 to-nexa-700/10 border-nexa-500 ring-2 ring-nexa-500/30 scale-105'
                    : 'bg-dark-800 border-dark-700 hover:border-dark-600'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-nexa-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      RECOMMENDED
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {Icon && <Icon size={24} className="text-nexa-400" />}
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-1">{plan.period}</span>
                    </div>
                  </div>

                  <Button fullWidth className="mb-6" variant={plan.recommended ? 'primary' : 'secondary'}>
                    {plan.name === 'Free' ? 'Current Plan' : 'Upgrade Now'}
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-2">
                        <Check size={16} className="text-green-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">FAQ</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, you can cancel your subscription at any time. No questions asked.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes! Try Premium+ free for 7 days. No credit card required.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and cryptocurrency.',
              },
              {
                q: 'Do I get a refund if I cancel?',
                a: 'Refunds are available within 30 days of purchase.',
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="bg-dark-800 rounded-lg border border-dark-700 hover:border-dark-600 transition group"
              >
                <summary className="p-4 cursor-pointer font-medium text-white flex items-center justify-between">
                  {faq.q}
                  <span className="group-open:rotate-180 transition">
                    ▼
                  </span>
                </summary>
                <p className="px-4 pb-4 text-gray-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
