import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { supabaseClient } from '~/utils/supabase';
import { AlarmClock, DollarSign } from 'lucide-react-native';
import Background from '~/components/Background';
import { GenreIcons } from '../../../components/GenresIcons';
import MyImage1 from '../../../components/Reusebales/MyImage';
import TextAccordion from '../../../components/Pages/[id]/TextAccordion';
import { memo } from 'react';
import FadeIn from '~/components/Animations/FadeIn';
import TelegramButton from './../../../components/Pages/[id]/TelegramButton';
import { useQueryGetBook } from '~/HelperFunctions/Queries/GetBook';

const CoursePage = () => {
  const { id }: { id: string } = useLocalSearchParams();
  // Course Query
  const { data: bookData, refetch, status } = useQueryGetBook(+id);

  // Realtime
  useFocusEffect(() => {
    const a = supabaseClient
      .channel('courses')
      .on('postgres_changes', { table: 'books', schema: 'public', event: '*' }, () => refetch())
      .subscribe();
    const b = supabaseClient
      .channel('chapters')
      .on('postgres_changes', { table: 'books', schema: 'public', event: '*' }, () => refetch())
      .subscribe();

    return () => {
      supabaseClient.removeChannel(a);
      supabaseClient.removeChannel(b);
    };
  });

  return (
    <>
      <Background>
        {bookData && id && status === 'success' && (
          <FadeIn>
            <View className="mx-auto w-full max-w-[1000px] flex-1 flex-col items-center justify-start ">
              <Text className="mt-4 font-Kufi text-2xl font-semibold">{bookData.book_name}</Text>
              {/**Image and Completion Container */}
              <View className="flex-col  items-center justify-center">
                <MyImage1
                  className="m-2 mt-4 self-center overflow-hidden rounded-md shadow-md shadow-neutral-300"
                  source={{ uri: bookData.cover_image }}
                  style={{ aspectRatio: 1, width: 350, maxWidth: 600 }}></MyImage1>
              </View>

              <View className="m-2 flex  flex-row-reverse items-center justify-center transition-all duration-200">
                <View className="ml-2 size-fit flex-row-reverse items-center justify-center rounded-xl border-[1px] border-slate-400 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-slate-200 ">
                  <DollarSign size={18} color={'#404040'} />
                  <Text className=" mr-1 translate-y-[2px] font-Kufi text-xs font-semibold text-neutral-600 ">
                    {bookData.price} ر.س
                  </Text>
                </View>
                <View className="ml-2 size-fit flex-row-reverse items-center justify-center rounded-xl  border-[1px] border-slate-400 px-4 py-2  transition-all duration-200 hover:scale-105 hover:bg-slate-200   ">
                  <AlarmClock size={18} color={'#404040'} />
                  <Text className=" mr-2 translate-y-[2px] font-Kufi text-xs font-semibold text-neutral-600 ">
                    {bookData.duration}
                  </Text>
                </View>
                <View className="ml-2 size-fit flex-row-reverse items-center justify-center  rounded-xl border-[1px]   border-slate-400 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-slate-200 ">
                  {/* {GenreIcons[courseData.genre]} */}

                  <Text className=" mr-2 translate-y-[2px] font-Kufi text-xs font-semibold text-neutral-600  ">
                    {bookData.genre}
                  </Text>
                </View>
              </View>
              <TelegramButton telegramLink={bookData.book_links[0].telegram_link}></TelegramButton>
              <TextAccordion
                shortDescription={bookData.short_description ?? ''}
                LongDescription={bookData.long_description ?? ''}></TextAccordion>
            </View>
          </FadeIn>
        )}
      </Background>
    </>
  );
};

export default memo(CoursePage);
