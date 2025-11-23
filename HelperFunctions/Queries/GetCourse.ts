import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';

export function useQueryGetCourse(id: number) {
  return useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      if (id) {
        const { data, error } = await supabaseClient
          .from('courses')
          .select(
            '*,telegram_links(*),user_course_history(*),chapters(*,lessons(*,links(*),notes(*),video_progress(*),lesson_completed(*)))'
          )
          .eq('id', +id)
          .single();
        return data;
      }
      return null;
    },
    enabled: !!id,
    staleTime: Infinity,
  });
}
