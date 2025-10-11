import { useQuery } from '@tanstack/react-query';
import { Loader, LoaderIcon, Repeat } from 'lucide-react-native';
import { Text, ScrollView, Image, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import LandscapeBanner from '~/components/Banner/LandscapeBanner';
import PortraitBanner from '~/components/Banner/PortraitBanner';
import { useHeight, useIsPortrait, useWidth } from '~/utils/Hooks';
import { supabaseClient } from '~/utils/supabase';
import CoursesFlatlist from './../../components/Home/CoursesFlatlist';

export default function Home() {
  const { data, isSuccess, error } = useQuery({
    queryKey: ['Get Courses'],
    queryFn: async () => {
      const { data } = await supabaseClient.from('courses').select('*');
      return data;
    },
  });

  return (
    <>
      {/* Banner */}
      {useIsPortrait() ? <PortraitBanner /> : <LandscapeBanner />}
      {/* Page */}
      <CoursesFlatlist></CoursesFlatlist>
    </>
  );
}
