import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';

export function useQueryGetPublicAssets() {
  return useQuery({
    queryKey: ['public_assets'],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from('public_assets')
        .select('*')
        .eq('id', 1)
        .limit(1)
        .single();
      return data;
    },
    staleTime: Infinity,
  });
}
