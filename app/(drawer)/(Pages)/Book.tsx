import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View, Pressable, Linking, ActivityIndicator } from 'react-native';
import { supabaseClient } from '~/utils/supabase';
import { AlarmClock, DollarSign, SquareArrowOutUpRight } from 'lucide-react-native';
import Background from '~/components/Background';
import { GenreIcons } from '../../../components/GenresIcons';
import MyImage1 from '../../../components/Reusebales/MyImage';
import TextAccordion from '../../../components/Pages/[id]/TextAccordion';
import { memo, useCallback, useEffect } from 'react';
import FadeIn from '~/components/Animations/FadeIn';
import TelegramButton from './../../../components/Pages/[id]/TelegramButton';
import { useQueryGetBook } from '~/HelperFunctions/Queries/GetBook';
import tw from 'twrnc';
import { useIsAuth, useIsAuthType, useModalVisible, useModalVisibleType } from '~/store/store';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';
import { useQueryClient } from '@tanstack/react-query';

const BookPage = () => {
  const isAuth = useIsAuth((state: useIsAuthType) => state.isAuth);
  const setModalVisible = useModalVisible((state: useModalVisibleType) => state.setModalVisible);
  const { id }: { id: string } = useLocalSearchParams();
  const queryClient = useQueryClient();
  //Navigation
  const router = useRouter();
  const simpleNav = useCallback(() => {
    router.push('/Books');
  }, [router]);
  // Main Query
  const { data: bookData, refetch, status, isLoading } = useQueryGetBook(+id);
  // Open Book Link
  const handleOpenBookLink = useCallback(() => {
    if (!isAuth) {
      setModalVisible(true);
    } else {
      Linking.openURL(bookData?.book_links[0]?.book_link ?? '');
    }
  }, [bookData?.book_links, isAuth, setModalVisible]);
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
  // Add to History
  useEffect(() => {
    const seenBefore = bookData?.user_book_history.length !== 0;
    const addToHistory = async () => {
      if (bookData) {
        await supabaseClient.from('user_book_history').insert({ book_id: bookData?.id });
        queryClient.invalidateQueries({ queryKey: ['CourseBookHistory'] });
      }
    };
    !seenBefore && addToHistory();
  }, [bookData, queryClient]);

  return (
    <>
      <Background>
        <LoadingAnimation show={isLoading}></LoadingAnimation>
        {bookData && id && status === 'success' && (
          <FadeIn>
            <View className="mx-auto w-full max-w-[1000px] flex-1 flex-col items-center justify-start ">
              <Text className="mt-4 font-Kufi text-2xl font-semibold">{bookData.title}</Text>
              {/**Image and Completion Container */}
              <View className="flex-col  items-center justify-center">
                <MyImage1
                  className="m-2 mt-4 self-center overflow-hidden rounded-md shadow-md shadow-neutral-300"
                  source={{ uri: bookData.image }}
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
              {/** Telegram Button */}
              <TelegramButton
                telegramLink={bookData.book_links[0]?.telegram_link ?? null}></TelegramButton>
              <TextAccordion
                shortDescription={bookData.short_description ?? ''}
                LongDescription={bookData.long_description ?? ''}></TextAccordion>
              <View className="h-fit w-full items-center justify-center bg-slate-300 py-4">
                <Pressable
                  onPress={handleOpenBookLink}
                  className=" size-fit self-center rounded-xl bg-[#BE1E2D] px-10 py-2">
                  <Text className="font-Kufi text-xl font-bold text-neutral-50">رابط التحميل</Text>
                </Pressable>
                <Pressable onPress={simpleNav} className="my-4 flex-row items-center gap-2">
                  <Text className="font-Kufi font-semibold text-neutral-700">
                    تصفح المزيد من الكتب
                  </Text>
                  <SquareArrowOutUpRight size={18} color={tw.color('blue-600')} strokeWidth={3} />
                </Pressable>
              </View>
            </View>
          </FadeIn>
        )}
      </Background>
    </>
  );
};

export default memo(BookPage);
