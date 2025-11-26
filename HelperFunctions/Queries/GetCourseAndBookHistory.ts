import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';

export function useQueryCourseBookHistory() {
  return useQuery({
    queryKey: ['course history'],
    queryFn: async () => {
      const { data: courseData } = await supabaseClient
        .from('user_course_history')
        .select('*,courses(*,user_favourites(*)) ');
      const { data: bookData } = await supabaseClient
        .from('user_book_history')
        .select('*,books(*,user_favourites(*)) ');
      return [...(courseData || []), ...(bookData || [])];
    },
    staleTime: Infinity,
  });
}
