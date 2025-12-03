import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';

export function useQueryCourseBookHistory() {
  return useQuery({
    queryKey: ['CourseBookHistory'],
    queryFn: async () => {
      const { data: courseData } = await supabaseClient
        .from('user_course_history')
        .select('*,courses(*,user_favourites(*)) ');
      const { data: bookData } = await supabaseClient
        .from('user_book_history')
        .select('*,books(*,user_favourites(*)) ');
      const returnData = [...(courseData || []), ...(bookData || [])].sort((a, b) => {
        let aDate = new Date(a.created_at).getTime();
        let bDate = new Date(b.created_at).getTime();
        return bDate - aDate;
      });
      return returnData;
    },
    staleTime: Infinity,
  });
}
