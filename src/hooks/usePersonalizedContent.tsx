import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const usePersonalizedContent = () => {
  const { user } = useAuth();
  const [preferredTopics, setPreferredTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPreferredTopics();
    } else {
      setPreferredTopics([]);
      setLoading(false);
    }
  }, [user]);

  const fetchPreferredTopics = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('preferred_topics')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      setPreferredTopics(data?.preferred_topics || []);
    } catch (error) {
      console.error('Error fetching preferred topics:', error);
      setPreferredTopics([]);
    } finally {
      setLoading(false);
    }
  };

  return { preferredTopics, loading, fetchPreferredTopics };
};
