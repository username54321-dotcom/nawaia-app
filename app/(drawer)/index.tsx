import Background from './../../components/Background';
import { Text, View } from 'react-native';
import FadeIn from './../../components/Animations/FadeIn';
import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';
import { RenderHTML } from 'react-native-render-html';

const Home = () => {
  const { data } = useQuery({
    queryKey: ['public_assets'],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from('public_assets')
        .select('home_page')
        .eq('id', 1)
        .limit(1)
        .single();
      return data;
    },
    staleTime: Infinity,
  });
  return (
    <Background>
      <FadeIn>
        <View className="flex-1 flex-col items-center justify-start">
          {data && (
            <>
              <View className="my-4 w-5/6   lg:w-2/3 xl:w-1/2">
                <RenderHTML source={{ html: data.home_page }}></RenderHTML>
              </View>
            </>
          )}
        </View>
      </FadeIn>
    </Background>
  );
};

export default memo(Home);
