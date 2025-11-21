import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';

export function useQueryGetCourseList() {
  return useQuery({
    queryKey: ['Public Courses List'],

    queryFn: async () => {
      console.log('fetched');
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
