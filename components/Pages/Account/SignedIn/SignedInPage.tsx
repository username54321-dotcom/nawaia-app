import Background from '~/components/Background';
import CourseCard from '~/components/Reusebales/CourseCard';
import { supabaseClient } from '~/utils/supabase';
import {
  Text,
  View,
  Pressable,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react-native';
import { useQueryCourseBookHistory } from '~/HelperFunctions/Queries/GetCourseAndBookHistory';
import BookCard from '~/components/Reusebales/BookCard';
import { useQueryClient } from '@tanstack/react-query';

const SignedInPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  // Main Query
  const { data, refetch, isLoading } = useQueryCourseBookHistory();

  // Realtime
  useEffect(() => {
    const channel = supabaseClient.channel('course_history');
    channel
      .on('postgres_changes', { event: '*', table: 'courses_user_history', schema: 'public' }, () =>
        refetch()
      )
      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [refetch]);

  const scrollref = useRef<ScrollView>(null); // Horizontal ScrollView REF
  const [cardWidth, setCardWidth] = useState(0); // Single Card
  const scrollProgress = useRef(0); // Where is the User
  const { width: screenWidth } = useWindowDimensions();
  // Update Card Width Measurement
  const handleSetCardWidth = useCallback(
    (width: number) => {
      if (width > 0) {
        const newCardWidth = width / (data?.length ?? 0.001);
        setCardWidth(newCardWidth);
      }
    },
    [data?.length]
  );
  // Handle Go Backward
  const goBackward = useCallback(() => {
    scrollref.current?.scrollTo({
      x: Math.floor((scrollProgress.current + cardWidth / 2) / cardWidth - 1) * cardWidth,
    });
  }, [cardWidth]);

  // Handle Go Forward
  const goForward = useCallback(() => {
    scrollref.current?.scrollTo({
      x: Math.floor((scrollProgress.current + cardWidth / 2) / cardWidth + 1) * cardWidth,
    });
  }, [cardWidth]);

  // Handle SignOut
  const handleSignOut = useCallback(async () => {
    await supabaseClient.auth.signOut();
    router.replace('/');
    queryClient.invalidateQueries();
  }, [router, queryClient]);
  return (
    <Background>
      <LoadingAnimation show={isLoading}></LoadingAnimation>
      {data && (
        <>
          {/**My Courses Title */}
          <View className="flex-col">
            <Text className="test-neutral-700 mx-6 mb-0 mt-8 self-end font-Kufi text-3xl font-semibold">
              زرت سابقا
              <View className="w-full self-center border-t-2"></View>
            </Text>
          </View>
          {/** Courses History List */}
          <View className="  justify-center">
            {screenWidth < cardWidth * data.length && (
              <>
                {/** Inline Go Forward */}
                <TouchableOpacity
                  className=" absolute right-0 z-10 mr-2 rounded-full border-[1px] bg-slate-300 p-2 transition-all duration-200 hover:scale-110 landscape:hidden "
                  onPress={goForward}>
                  <ArrowBigRight color={'#be1e2d'} strokeWidth={2} size={30} />
                </TouchableOpacity>
                {/**Inline Go Backward */}
                <TouchableOpacity
                  className=" absolute left-0 z-10 ml-2 rounded-full border-[1px] bg-slate-300 p-2 transition-all duration-200 hover:scale-110 landscape:hidden"
                  onPress={goBackward}>
                  <ArrowBigLeft color={'#be1e2d'} strokeWidth={2} size={30} />
                </TouchableOpacity>
              </>
            )}

            <ScrollView
              snapToInterval={cardWidth}
              decelerationRate="fast"
              snapToAlignment="center"
              disableIntervalMomentum={true}
              className=" snap-x snap-mandatory"
              onContentSizeChange={(width) => {
                handleSetCardWidth(width);
              }}
              onScroll={(e) => (scrollProgress.current = e.nativeEvent.contentOffset.x)}
              scrollEventThrottle={200}
              ref={scrollref}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {data?.map((item, index) => (
                <View className="m-2 snap-center snap-always" key={index}>
                  {'course_id' in item && item.course_id && (
                    <CourseCard courseItem={item.courses}></CourseCard>
                  )}
                  {'book_id' in item && item.book_id && (
                    <BookCard bookItem={item.books} key={item.id}></BookCard>
                  )}
                </View>
              ))}
            </ScrollView>
            {/** Crousal Controls */}
            {screenWidth < cardWidth * data.length && (
              // Main Container
              <View className=" flex-row gap-4 self-center rounded-full bg-slate-300 p-2 transition-all duration-200 hover:scale-105 portrait:hidden">
                {/** Go Backward */}
                <TouchableOpacity
                  className=" rounded-full transition-all duration-200 hover:scale-110"
                  onPress={goBackward}>
                  <ArrowBigLeft color={'#be1e2d'} strokeWidth={2} size={30} />
                </TouchableOpacity>
                {/** Go Forward */}

                <TouchableOpacity
                  className=" rounded-full transition-all duration-200 hover:scale-110 "
                  onPress={goForward}>
                  <ArrowBigRight color={'#be1e2d'} strokeWidth={2} size={30} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          {/** SignOut Button */}
          <View className="mb-4 mt-2 w-3/5 self-center border-t-2"></View>
          <Pressable
            onPress={handleSignOut}
            className="bg-nawaiaRed size-fit items-center justify-center self-center rounded-md px-6 py-4">
            <Text className="font-Kufi text-base font-semibold text-white">تسجيل الخروج</Text>
          </Pressable>
        </>
      )}
    </Background>
  );
};

export default SignedInPage;
