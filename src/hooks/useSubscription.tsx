import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface SubscriptionStatus {
  hasActiveSubscription: boolean;
  subscriptionType: 'free' | 'trial' | 'pro';
  subscriptionStatus: string;
  loading: boolean;
}

export const useSubscription = (): SubscriptionStatus => {
  const { user } = useAuth();
  const [status, setStatus] = useState<SubscriptionStatus>({
    hasActiveSubscription: true, // Default to true for now
    subscriptionType: 'pro',
    subscriptionStatus: 'active',
    loading: false,
  });

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) {
        setStatus({
          hasActiveSubscription: false,
          subscriptionType: 'free',
          subscriptionStatus: 'inactive',
          loading: false,
        });
        return;
      }

      // For now, grant all authenticated users access
      // You can implement proper subscription checking with Supabase later
      setStatus({
        hasActiveSubscription: true,
        subscriptionType: 'pro',
        subscriptionStatus: 'active',
        loading: false,
      });
    };

    checkSubscription();
  }, [user]);

  return status;
};
