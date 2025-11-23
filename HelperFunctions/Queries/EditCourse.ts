import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';

export function useQueryEditCourse(id: number) {
  return useQuery({
    queryKey: ['edit course', id],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from('courses')
        .select('*,telegram_links(*), chapters(*, lessons(*, links(*)))')
        .eq('id', +id)
        .single();
      return data;
    },
    staleTime: Infinity,
  });
}
