import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { Check } from 'lucide-react';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: number;
  features: PlanFeature[];
  popular?: boolean;
}

export const Premium: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans: Plan[] = [
    {
      name: 'Basic',
      price: billingCycle === 'monthly' ? 4.99 : 49.99,
      features: [
        { name: 'Ad-free experience', included: true },
        { name: 'Premium badge', included: true },
        { name: 'Higher upload limits', included: false },
        { name: 'Custom themes', included: false },
      ],
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? 9.99 : 99.99,
      popular: true,
      features: [
        { name: 'Ad-free experience', included: true },
        { name: 'Premium badge', included: true },
        { name: 'Higher upload limits', included: true },
        { name: 'Custom themes', included: true },
      ],
    },
    {
      name: 'Ultimate',
      price: billingCycle === 'monthly' ? 19.99 : 199.99,
      features: [
        { name: 'Ad-free experience', included: true },
        { name: 'Premium badge', included: true },
        { name: 'Higher upload limits', included: true },
        { name: 'Custom themes', included: true },
      ],
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-2">Nexa Premium</h1>
        <p className="text-gray-400 mb-8">Unlock exclusive features and support the platform</p>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              billingCycle === 'monthly'
                ? 'bg-nexa-600 text-white'
                : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              billingCycle === 'yearly'
                ? 'bg-nexa-600 text-white'
                : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
            }`}
          >
            Yearly (Save 17%)
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-lg border transition ${
                plan.popular
                  ? 'bg-nexa-600/20 border-nexa-500 shadow-lg shadow-nexa-500/20'
                  : 'bg-dark-800 border-dark-700 hover:border-nexa-500'
              }`}
            >
              {plan.popular && (
                <div className="px-6 py-2 bg-nexa-600 text-white text-center font-bold text-sm">
                  Most Popular
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                </div>

                <Button fullWidth className="mb-6">
                  Subscribe Now
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Check
                        size={18}
                        className={feature.included ? 'text-green-500' : 'text-gray-600'}
                      />
                      <span className={feature.included ? 'text-white' : 'text-gray-500'}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
