import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';

export function useQueryGetCourseHistory() {
  return useQuery({
    queryKey: ['course history'],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from('user_course_history')
        .select('*,courses(*,user_favourites(*)) ');
      return data;
    },
    staleTime: Infinity,
  });
}
