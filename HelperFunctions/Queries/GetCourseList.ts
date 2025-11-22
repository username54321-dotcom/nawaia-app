import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';

export function useQueryGetCourseList() {
  return useQuery({
    queryKey: ['Public Courses List'],

    queryFn: async () => {
      const { data } = await supabaseClient
        .from('courses')
        .select(
          '*,user_favourites(is_favourite),chapters(lessons(lesson_completed(is_completed)))'
        );
      return data;
    },
    staleTime: Infinity,
  });
}
