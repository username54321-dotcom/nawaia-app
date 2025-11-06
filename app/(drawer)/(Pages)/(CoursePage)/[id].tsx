import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';
import { AlarmClock, DollarSign } from 'lucide-react-native';
import FadeIn from './../../../../components/Animations/FadeIn';
import Background from '~/components/Background';
import { GenreIcons } from './../../../../components/GenresIcons';
import MyImage1 from '../../../../components/Reusebales/MyImage';
import IdContent from './../../../../components/Pages/[id]/Content';
import TextAccordion from './../../../../components/Pages/[id]/TextAccordion';
import { useIsAuth } from '~/store/store';
import { memo, useEffect, useRef } from 'react';

const CoursePage = () => {
  const isMounted = useRef(false);
  const { isAuth } = useIsAuth();
  const { id } = useLocalSearchParams();
  // Course Query
  const { data: courseData, refetch } = useQuery({
    queryKey: ['Course Data', id],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('courses')
        .select(
          'id,title, image, short_description, price,long_description, duration,genre,chapters(id, position,name,lessons(id,name,position,links(link),notes(*),video_progress(*)))'
        )
        .eq('id', id)
        .single();
      error && console.log(error);
      console.log(data);
      return data;
    },
  });
  // Refetch when Auth Changes
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    !isMounted.current ? (isMounted.current = true) : refetch();
  }, [isAuth, refetch]);
  //Realtime
  useEffect(() => {
    const a = supabaseClient
      .channel('courses')
      .on('postgres_changes', { table: 'courses', schema: 'public', event: '*' }, () => refetch())
      .subscribe();
    const b = supabaseClient
      .channel('chapters')
      .on('postgres_changes', { table: 'chapters', schema: 'public', event: '*' }, () => refetch())
      .subscribe();
    const c = supabaseClient
      .channel('lessons')
      .on('postgres_changes', { table: 'lessons', schema: 'public', event: '*' }, () => refetch())
      .subscribe();
    const d = supabaseClient
      .channel('links')
      .on('postgres_changes', { table: 'links', schema: 'public', event: '*' }, () => refetch())
      .subscribe();
    const e = supabaseClient
      .channel('notes')
      .on('postgres_changes', { table: 'notes', schema: 'public', event: '*' }, () => refetch())
      .subscribe();

    return () => {
      supabaseClient.removeChannel(a);
      supabaseClient.removeChannel(b);
      supabaseClient.removeChannel(c);
      supabaseClient.removeChannel(d);
      supabaseClient.removeChannel(e);
    };
  }, [refetch]);
  return (
    <>
      <Background>
        {courseData && (
          <FadeIn>
            <View
              aria-label="Main Course Card"
              className="mx-auto w-full max-w-[1000px] flex-1 flex-col items-center justify-start ">
              <Text className="mt-4 font-Kufi text-2xl font-semibold">{courseData.title}</Text>

              <MyImage1
                aria-label="Course Image"
                className="m-2 mt-4 self-center overflow-hidden rounded-md shadow-md shadow-neutral-300"
                source={{ uri: courseData.image }}
                style={{ aspectRatio: 1, width: 350, maxWidth: 600 }}></MyImage1>

              <View
                aria-label="Course Tags"
                className="m-2 flex  flex-row-reverse items-center justify-center transition-all duration-200">
                <View className="ml-2 size-fit flex-row-reverse items-center justify-center rounded-xl border-[1px] border-slate-400 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-slate-200 ">
                  <DollarSign size={18} color={'#404040'} />
                  <Text className=" mr-1 translate-y-[2px] font-Kufi text-xs font-semibold text-neutral-600 ">
                    {courseData.price} ر.س
                  </Text>
                </View>
                <View className="ml-2 size-fit flex-row-reverse items-center justify-center rounded-xl  border-[1px] border-slate-400 px-4 py-2  transition-all duration-200 hover:scale-105 hover:bg-slate-200   ">
                  <AlarmClock size={18} color={'#404040'} />
                  <Text className=" mr-2 translate-y-[2px] font-Kufi text-xs font-semibold text-neutral-600 ">
                    {courseData.duration}
                  </Text>
                </View>
                <View className="ml-2 size-fit flex-row-reverse items-center justify-center  rounded-xl border-[1px]   border-slate-400 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-slate-200 ">
                  {GenreIcons[courseData.genre]}

                  <Text className=" mr-2 translate-y-[2px] font-Kufi text-xs font-semibold text-neutral-600  ">
                    {courseData.genre}
                  </Text>
                </View>
              </View>
              <TextAccordion
                shortDescription={courseData.short_description}
                LongDescription={courseData.long_description}></TextAccordion>

              <IdContent
                refetch={refetch}
                courseId={courseData.id}
                chaptersData={courseData.chapters}></IdContent>
            </View>
          </FadeIn>
        )}
      </Background>
    </>
  );
};

export default memo(CoursePage);
