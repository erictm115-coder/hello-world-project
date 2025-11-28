import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface GrowthStats {
  current_streak: number;
  longest_streak: number;
  total_books_read: number;
  total_time_minutes: number;
}

export const useGrowthStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<GrowthStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStats();
    } else {
      setStats(null);
      setLoading(false);
    }
  }, [user]);

  const fetchStats = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('growth_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      setStats(data || {
        current_streak: 0,
        longest_streak: 0,
        total_books_read: 0,
        total_time_minutes: 0,
      });
    } catch (error) {
      console.error('Error fetching growth stats:', error);
      setStats({
        current_streak: 0,
        longest_streak: 0,
        total_books_read: 0,
        total_time_minutes: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStreak = async () => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data: existingStreak } = await supabase
        .from('growth_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (existingStreak) {
        const { error } = await supabase
          .from('growth_stats')
          .update({
            current_streak: (existingStreak.current_streak || 0) + 1,
            longest_streak: Math.max((existingStreak.longest_streak || 0), (existingStreak.current_streak || 0) + 1),
          })
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('growth_stats')
          .insert({
            user_id: user.id,
            current_streak: 1,
            longest_streak: 1,
            total_books_read: 0,
            total_time_minutes: 0,
          });

        if (error) throw error;
      }

      fetchStats();
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  return { stats, loading, updateStreak, fetchStats };
};
