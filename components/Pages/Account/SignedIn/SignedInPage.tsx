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
import { useEffect, useRef, useState } from 'react';
import { useQueryGetCourseHistory } from '~/HelperFunctions/Queries/GetCourseHistory';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react-native';

const SignedInPage = () => {
  const router = useRouter();
  // Main Query
  const { data, refetch, isLoading } = useQueryGetCourseHistory();

  // Realtime
  useEffect(() => {
    const channel = supabaseClient.channel('course_history');
    channel
      .on('postgres_changes', { event: '*', table: 'user_course_history', schema: 'public' }, () =>
        refetch()
      )
      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [refetch]);

  const scrollref = useRef<ScrollView>(null);
  const cardWidth = useRef(0);
  const scrollProgress = useRef(0);
  const [scrollContentsWidth, setScrollContentsWidth] = useState(0);
  const { width: screenWidth } = useWindowDimensions();
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
            <ScrollView
              onContentSizeChange={(w) => {
                setScrollContentsWidth(w);
              }}
              onScroll={(e) => (scrollProgress.current = e.nativeEvent.contentOffset.x)}
              scrollEventThrottle={200}
              ref={scrollref}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {data
                ?.sort((a, b) => b.id - a.id)
                .map((item_course, index) => (
                  <View
                    onLayout={(dimensions) =>
                      cardWidth.current === 0 &&
                      (cardWidth.current = dimensions.nativeEvent.layout.width)
                    }
                    key={index}>
                    <CourseCard
                      is_favourite={item_course.courses.user_favourites[0]?.is_favourite}
                      key={index}
                      courseItem={item_course.courses}></CourseCard>
                  </View>
                ))}
            </ScrollView>
            {/** Crousal Controls */}
            {screenWidth < scrollContentsWidth && (
              // Main Container
              <View className=" flex-row gap-4 self-center rounded-full bg-slate-300 p-2 transition-all duration-200 hover:scale-105">
                {/** Go Backward */}
                <TouchableOpacity
                  className=" rounded-full transition-all duration-200 hover:scale-110"
                  onPress={() => {
                    scrollref.current?.scrollTo({
                      x:
                        Math.floor((scrollProgress.current + 200) / cardWidth.current - 1) *
                        cardWidth.current,
                    });
                  }}>
                  <ArrowBigLeft color={'#be1e2d'} strokeWidth={2} size={30} />
                </TouchableOpacity>
                {/** Go Forward */}

                <TouchableOpacity
                  className=" rounded-full transition-all duration-200 hover:scale-110 "
                  onPress={() => {
                    scrollref.current?.scrollTo({
                      x:
                        Math.floor((scrollProgress.current + 200) / cardWidth.current + 1) *
                        cardWidth.current,
                    });
                  }}>
                  <ArrowBigRight color={'#be1e2d'} strokeWidth={2} size={30} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          {/** SignOut Button */}
          <View className="mb-4 mt-2 w-3/5 self-center border-t-2"></View>
          <Pressable
            onPress={async () => {
              await supabaseClient.auth.signOut();
              router.replace('/');
            }}
            className="size-fit items-center justify-center self-center rounded-md bg-red-500 px-6 py-4">
            <Text className="font-Kufi text-base font-semibold text-white">تسجيل الخروج</Text>
          </Pressable>
        </>
      )}
    </Background>
  );
};

export default SignedInPage;
