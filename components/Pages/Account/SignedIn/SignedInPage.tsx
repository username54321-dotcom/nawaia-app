import { useQuery } from '@tanstack/react-query';
import Background from '~/components/Background';
import CourseCard from '~/components/Reusebales/CourseCard';
import { supabaseClient } from '~/utils/supabase';
import { Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const SignedInPage = () => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['course history'],
    queryFn: async () => {
      const { data } = await supabaseClient.from('user_course_history').select('*,courses(*) ');
      return data;
    },
  });

  return (
    <Background>
      {/**My Courses Title */}
      <View className="flex-col">
        <Text className="test-neutral-700 mx-6 mb-0 mt-8 self-end font-Kufi text-3xl font-semibold">
          دوراتي
          <View className="w-full self-center border-t-2"></View>
        </Text>
      </View>
      {/** Courses History List */}
      <View className="flex-row flex-wrap items-baseline justify-center">
        {data?.map((item_course, index) => (
          <CourseCard key={index} courseItem={item_course.courses}></CourseCard>
        ))}
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
    </Background>
  );
};

export default SignedInPage;
