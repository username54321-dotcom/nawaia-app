import { useLocalSearchParams } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import Background from '~/components/Background';
import { ListPurchaseCourses } from '~/HelperFunctions/Queries/ListPurchasedCourses';
import { FlashList } from '@shopify/flash-list';
import { useQueryGetCourseList } from '~/HelperFunctions/Queries/GetCourseList';
import { useIsPortrait } from '~/utils/Hooks';
import { supabaseClient } from '~/utils/supabase';
import FadeIn from '~/components/Animations/FadeIn';

const Admin_EditUser = () => {
  const userId = useLocalSearchParams()?.userId as string;
  const { data, refetch } = ListPurchaseCourses(userId as string);
  const purCourseIds = data?.map((i) => i.course_id?.id);
  const { data: courseList } = useQueryGetCourseList();
  const isPortrait = useIsPortrait();
  const handleAddCourse = async (courseId: number) => {
    if (purCourseIds?.includes(courseId)) {
      const { data, error } = await supabaseClient
        .from('courses_purchase')
        .delete()
        .eq('user_id', userId)
        .eq('course_id', courseId);
      !error && refetch();
      return;
    }
    const { data, error } = await supabaseClient
      .from('courses_purchase')
      .upsert(
        { course_id: courseId, user_id: userId as string },
        { onConflict: 'user_id, course_id' }
      );
    if (!error) refetch();
  };

  return (
    <Background>
      <Text className=" mx-auto mt-10 font-Kufi text-3xl font-bold text-neutral-800">
        الأذونات الممنوحة
      </Text>
      {/** Already Have Access to */}
      <View className=" w-perc90 mx-auto py-6 lg:w-2/3 xl:w-1/2">
        <FlashList
          data={data}
          numColumns={isPortrait ? 2 : 3}
          // Empty Courses To Access
          ListEmptyComponent={
            <>
              <FadeIn>
                <View className="border-thin border-colorThin bg-highlighted mx-auto size-fit rounded-lg p-6">
                  <Text className="text-colorMain font-Kufi text-lg font-semibold">
                    هذا الحساب لا يملك اي أذونات
                  </Text>
                </View>
              </FadeIn>
            </>
          }
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <FadeIn>
                <Pressable
                  onPress={() => handleAddCourse(Number(item.course_id?.id))}
                  className="bg-card-bg border-thin border-colorThin mx-2 my-4 rounded-xl px-4 py-6  transition-all duration-300 hover:scale-105">
                  <Text className="text-colorMain mx-auto mb-4 font-Kufi text-2xl font-bold underline underline-offset-4">
                    {item.course_id?.id}
                  </Text>
                  <Text className="text-colorMain font-Kufi">
                    أسم الدورة : "{item.course_id?.title}"
                  </Text>
                  <Text className="text-colorMain font-Kufi">
                    سعر الدورة : {item.course_id?.price}
                  </Text>
                  <Text className="text-colorMain font-Kufi">تاريخ الأذن : {item.created_at}</Text>
                  <Text className="text-colorMain font-Kufi">
                    {' '}
                    نوع الأشتراك : {item.course_id?.course_tier}
                  </Text>
                </Pressable>
              </FadeIn>
            </>
          )}></FlashList>
      </View>

      {/** Separator */}
      <View className="border-thin mx-auto  w-[90%]"></View>

      <Text className="mx-auto my-10 font-Kufi text-3xl font-bold text-neutral-800">
        الأذونات المتاحة
      </Text>
      {/** All Courses */}
      <FlashList
        data={courseList?.sort((x, y) => y.id - x.id)}
        numColumns={isPortrait ? 2 : 3}
        renderItem={({ item }) => (
          <>
            <Pressable
              onPress={() => handleAddCourse(item.id)}
              className={`border-thin border-colorThin mx-auto mt-6 w-[90%]   rounded-md p-4 transition-all duration-300 hover:scale-105 ${purCourseIds?.includes(item.id) ? 'bg-green-300' : null} `}>
              <Text className="mx-auto text-xl font-bold text-neutral-800 underline underline-offset-4">
                {item.id}
              </Text>
              <Text className="  text-right font-Kufi">أسم الدورة : {item.title}</Text>
              <Text className="  text-right font-Kufi">سعر الدورة : {item.price}</Text>
              <Text className="  text-right font-Kufi">
                {' '}
                حالة النشر : {item.published.toString()}
              </Text>
              <Text className="  text-right font-Kufi">نوع الأشتراك : {item.course_tier}</Text>
            </Pressable>
          </>
        )}></FlashList>
    </Background>
  );
};

export default Admin_EditUser;
