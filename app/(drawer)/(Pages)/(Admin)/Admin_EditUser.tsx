import { useLocalSearchParams } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import Background from '~/components/Background';
import { ListPurchaseCourses } from '~/HelperFunctions/Queries/ListPurchasedCourses';
import { FlashList } from '@shopify/flash-list';
import { useQueryGetCourseList } from '~/HelperFunctions/Queries/GetCourseList';
import { useIsPortrait } from '~/utils/Hooks';
import { supabaseClient } from '~/utils/supabase';

const Admin_EditUser = () => {
  const userId = useLocalSearchParams()?.userId as string;
  const { data, refetch } = ListPurchaseCourses(userId as string);
  const purCourseIds = data?.map((i) => i.course_id?.id);
  console.log(purCourseIds);
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
      <Text>{userId}</Text>
      <View className="mx-auto mt-6  w-full rounded-md border-[1px] lg:w-2/3 xl:w-1/2">
        <FlashList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <View className="bg-green-300 p-4">
                <Text className="font-Kufi">أسم الدورة : "{item.course_id?.title}"</Text>
                <Text className="font-Kufi">سعر الدورة : {item.course_id?.price}</Text>
                <Text className="font-Kufi">تاريخ الأذن : {item.created_at}</Text>
                <Text className="font-Kufi"> نوع الأشتراك : {item.course_id?.course_tier}</Text>
              </View>
            </>
          )}></FlashList>
      </View>
      {/** All Courses */}
      <FlashList
        data={courseList}
        numColumns={isPortrait ? 2 : 3}
        renderItem={({ item }) => (
          <>
            <Pressable
              onPress={() => handleAddCourse(item.id)}
              className={`mx-auto mt-6 w-[90%]   rounded-md border-[1px] p-4 ${purCourseIds?.includes(item.id) ? 'bg-green-500' : null} `}>
              <Text className="  text-right font-Kufi">{item.title}</Text>
              <Text className="  text-right font-Kufi">{item.price}</Text>
              <Text className="  text-right font-Kufi">{item.published}</Text>
              <Text className="  text-right font-Kufi">{item.course_tier}</Text>
            </Pressable>
          </>
        )}></FlashList>
    </Background>
  );
};

export default Admin_EditUser;
