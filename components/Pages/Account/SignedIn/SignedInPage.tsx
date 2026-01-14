import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  Pressable,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react-native';
import Background from '~/components/Background';
import CourseCard from '~/components/Reusebales/CourseCard';
import BookCard from '~/components/Reusebales/BookCard';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';
import { useQueryCourseBookHistory } from '~/HelperFunctions/Queries/GetCourseAndBookHistory';
import { supabaseClient } from '~/utils/supabase';

// Constants
const ARROW_COLOR = '#be1e2d';
const ARROW_SIZE = 30;
const ARROW_STROKE_WIDTH = 2;
const SCROLL_EVENT_THROTTLE = 200;
const MIN_DIVISOR = 0.001; // Prevent division by zero

const SignedInPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, refetch, isLoading } = useQueryCourseBookHistory();

  // Scroll state management
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollPosition = useRef(0);
  const [cardWidth, setCardWidth] = useState(0);
  const { width: screenWidth } = useWindowDimensions();

  // Subscribe to realtime updates for course history
  useEffect(() => {
    const channel = supabaseClient.channel('course_history');
    
    channel
      .on('postgres_changes', { 
        event: '*', 
        table: 'courses_user_history', 
        schema: 'public' 
      }, () => refetch())
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [refetch]);

  // Calculate individual card width based on total content width
  const handleSetCardWidth = useCallback(
    (totalWidth: number) => {
      if (totalWidth > 0) {
        const itemCount = data?.length ?? MIN_DIVISOR;
        setCardWidth(totalWidth / itemCount);
      }
    },
    [data?.length]
  );

  // Navigate to previous card
  const goBackward = useCallback(() => {
    const currentIndex = Math.floor((scrollPosition.current + cardWidth / 2) / cardWidth);
    const targetPosition = (currentIndex - 1) * cardWidth;
    scrollViewRef.current?.scrollTo({ x: targetPosition });
  }, [cardWidth]);

  // Navigate to next card
  const goForward = useCallback(() => {
    const currentIndex = Math.floor((scrollPosition.current + cardWidth / 2) / cardWidth);
    const targetPosition = (currentIndex + 1) * cardWidth;
    scrollViewRef.current?.scrollTo({ x: targetPosition });
  }, [cardWidth]);

  // Handle user sign out
  const handleSignOut = useCallback(async () => {
    await supabaseClient.auth.signOut();
    queryClient.invalidateQueries();
    router.replace('/');
  }, [router, queryClient]);

  // Check if carousel navigation should be shown
  const totalContentWidth = cardWidth * (data?.length ?? 0);
  const shouldShowNavigation = screenWidth < totalContentWidth;

  return (
    <Background>
      <LoadingAnimation show={isLoading} />

      {data && (
        <>
          {/* Page Title */}
          <View className="flex-col">
            <Text className="test-neutral-700 mx-6 mb-0 mt-8 self-end font-Kufi text-3xl font-semibold">
              زرت سابقا
              <View className="w-full self-center border-t-2" />
            </Text>
          </View>

          {/* Course/Book History Carousel */}
          <View className="justify-center">
            {/* Inline Navigation - Visible on Portrait */}
            {shouldShowNavigation && (
              <>
                {/* Forward Button (Right) */}
                <TouchableOpacity
                  className="absolute right-0 z-10 mr-2 rounded-full border-[1px] bg-slate-300 p-2 transition-all duration-200 hover:scale-110 landscape:hidden"
                  onPress={goForward}>
                  <ArrowBigRight 
                    color={ARROW_COLOR} 
                    strokeWidth={ARROW_STROKE_WIDTH} 
                    size={ARROW_SIZE} 
                  />
                </TouchableOpacity>

                {/* Backward Button (Left) */}
                <TouchableOpacity
                  className="absolute left-0 z-10 ml-2 rounded-full border-[1px] bg-slate-300 p-2 transition-all duration-200 hover:scale-110 landscape:hidden"
                  onPress={goBackward}>
                  <ArrowBigLeft 
                    color={ARROW_COLOR} 
                    strokeWidth={ARROW_STROKE_WIDTH} 
                    size={ARROW_SIZE} 
                  />
                </TouchableOpacity>
              </>
            )}

            {/* Horizontal Scroll View */}
            <ScrollView
              ref={scrollViewRef}
              horizontal
              snapToInterval={cardWidth}
              snapToAlignment="center"
              decelerationRate="fast"
              disableIntervalMomentum
              showsHorizontalScrollIndicator={false}
              className="snap-x snap-mandatory"
              onContentSizeChange={handleSetCardWidth}
              onScroll={(e) => (scrollPosition.current = e.nativeEvent.contentOffset.x)}
              scrollEventThrottle={SCROLL_EVENT_THROTTLE}>
              {data.map((item, index) => (
                <View className="m-2 snap-center snap-always" key={index}>
                  {'course_id' in item && item.course_id && (
                    <CourseCard courseItem={item.courses} />
                  )}
                  {'book_id' in item && item.book_id && (
                    <BookCard bookItem={item.books} key={item.id} />
                  )}
                </View>
              ))}
            </ScrollView>

            {/* Carousel Controls - Visible on Landscape */}
            {shouldShowNavigation && (
              <View className="flex-row gap-4 self-center rounded-full bg-slate-300 p-2 transition-all duration-200 hover:scale-105 portrait:hidden">
                {/* Backward Button */}
                <TouchableOpacity
                  className="rounded-full transition-all duration-200 hover:scale-110"
                  onPress={goBackward}>
                  <ArrowBigLeft 
                    color={ARROW_COLOR} 
                    strokeWidth={ARROW_STROKE_WIDTH} 
                    size={ARROW_SIZE} 
                  />
                </TouchableOpacity>

                {/* Forward Button */}
                <TouchableOpacity
                  className="rounded-full transition-all duration-200 hover:scale-110"
                  onPress={goForward}>
                  <ArrowBigRight 
                    color={ARROW_COLOR} 
                    strokeWidth={ARROW_STROKE_WIDTH} 
                    size={ARROW_SIZE} 
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Sign Out Section */}
          <View className="mb-4 mt-2 w-3/5 self-center border-t-2" />
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
