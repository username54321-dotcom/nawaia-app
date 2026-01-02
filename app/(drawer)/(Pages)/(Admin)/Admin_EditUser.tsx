import { useLocalSearchParams } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import Background from '~/components/Background';
import { ListPurchaseCourses } from '~/HelperFunctions/Queries/ListPurchasedCourses';
import { FlashList } from '@shopify/flash-list';
import { useQueryGetCourseList } from '~/HelperFunctions/Queries/GetCourseList';
import { useIsPortrait } from '~/utils/Hooks';
import { supabaseClient } from '~/utils/supabase';
import FadeIn from '~/components/Animations/FadeIn';
import useAdminOnly from '~/HelperFunctions/Hooks/AdminOnly';
import { Dropdown } from 'react-native-element-dropdown';
import tw from 'twrnc';

const Admin_EditUser = () => {
  useAdminOnly();
  const userId = useLocalSearchParams()?.userId as string;
  const { data, refetch } = ListPurchaseCourses(userId as string);
  const purCourseIds = data?.map((i) => i.course_id?.id);
  const { data: courseList } = useQueryGetCourseList();
  const isPortrait = useIsPortrait();
  const handleAddCourse = async (courseId: number) => {
    if (purCourseIds?.includes(courseId)) {
      const { error } = await supabaseClient
        .from('courses_purchase')
        .delete()
        .eq('user_id', userId)
        .eq('course_id', courseId);
      !error && refetch();
      return;
    }
    const { error } = await supabaseClient
      .from('courses_purchase')
      .upsert(
        { course_id: courseId, user_id: userId as string },
        { onConflict: 'user_id, course_id' }
      );
    if (!error) refetch();
  };
  const data1 = [
    {
      label: 'first',
      value: 10,
    },
  ];
  return (
    <Background>
      <View className="rootContainer">
        <View className="items-center"></View>
        <Text className="headerText mx-auto ">الأذونات الممنوحة</Text>
        {/** Already Have Access to */}
        <View>
          <FlashList
            data={data}
            numColumns={isPortrait ? 2 : 3}
            // Empty Courses To Access
            ListEmptyComponent={
              <>
                <FadeIn>
                  <View className="defaultBorder childContainer mx-auto bg-highlighted px-6">
                    <Text className="titleText">هذا الحساب لا يملك اي أذونات</Text>
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
                    className="defaultPressable m-2">
                    <Text className="mx-auto mb-4 font-Kufi text-2xl font-bold text-colorMain underline underline-offset-4">
                      {item.course_id?.id}
                    </Text>
                    <Text className="font-Kufi text-colorMain">
                      أسم الدورة : {item.course_id?.title}
                    </Text>
                    <Text className="font-Kufi text-colorMain">
                      سعر الدورة : {item.course_id?.price}
                    </Text>
                    <Text className="font-Kufi text-colorMain">
                      تاريخ الأذن : {item.created_at}
                    </Text>
                    <Text className="font-Kufi text-colorMain">
                      نوع الأشتراك : {item.course_id?.tier}
                    </Text>
                  </Pressable>
                </FadeIn>
              </>
            )}></FlashList>
        </View>

        {/** Separator */}
        <View className="defaultSeparator"></View>

        <Text className="headerText mx-auto">الأذونات المتاحة</Text>
        {/** All Courses */}
        <View>
          <FlashList
            data={courseList?.sort((x, y) => y.id - x.id)}
            numColumns={isPortrait ? 2 : 3}
            renderItem={({ item }) => (
              <>
                <Pressable
                  onPress={() => handleAddCourse(item.id)}
                  className={`defaultPressable m-2  ${purCourseIds?.includes(item.id) ? 'bg-green-300' : null} `}>
                  <Text className="mx-auto text-xl font-bold text-neutral-800 underline underline-offset-4">
                    {item.id}
                  </Text>
                  <Text className="  text-right font-Kufi">أسم الدورة : {item.title}</Text>
                  <Text className="  text-right font-Kufi">سعر الدورة : {item.price}</Text>
                  <Text className="  text-right font-Kufi">
                    {' '}
                    حالة النشر : {item.is_published.toString()}
                  </Text>
                  <Text className="  text-right font-Kufi">نوع الأشتراك : {item.tier}</Text>
                </Pressable>
              </>
            )}></FlashList>
        </View>
      </View>
    </Background>
  );
};

export default Admin_EditUser;
