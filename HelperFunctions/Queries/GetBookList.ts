import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';

export function useQueryGetBookList() {
  return useQuery({
    queryKey: ['Public Book List'],

    queryFn: async () => {
      const { data } = await supabaseClient.from('books').select('*,book_links(*)');

      return data;
    },
    staleTime: Infinity,
  });
}
