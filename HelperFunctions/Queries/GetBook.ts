import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';

export function useQueryGetBook(bookId: number) {
  const query = useQuery({
    queryKey: ['book', bookId],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from('books')
        .select('*,book_links(*)')
        .eq('id', bookId)
        .limit(1)
        .single();
      if (data) {
        return data;
      }
    },
    staleTime: Infinity,
  });
  return query;
}
