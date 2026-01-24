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
import DropDown from '../../../../components/Reusebales/DropDown';
import { useState } from 'react';
import { tierList } from '~/data/tierList';
import { GetUserRow } from '~/HelperFunctions/Queries/GetUser';
import { Tables } from '~/utils/database.types';
import { Check } from 'lucide-react-native';
import { useMutation } from '@tanstack/react-query';

const Admin_EditUser = () => {
  useAdminOnly();
  const userId = useLocalSearchParams()?.userId as string;
  const { data, refetch } = ListPurchaseCourses(userId as string);
  const purCourseIds = data?.map((i) => i.course_id?.id);
  const { data: courseList } = useQueryGetCourseList();
  const isPortrait = useIsPortrait();
  const [selectedTier, setSelectedTier] = useState<null | Tables<'profiles'>['tier']>(null);

  // Toggle course access mutation
  const { mutate: toggleCourseAccess } = useMutation({
    mutationKey: ['toggleCourseAccess', userId],
    mutationFn: async (courseId: number) => {
      if (purCourseIds?.includes(courseId)) {
        const { error } = await supabaseClient
          .from('courses_purchase')
          .delete()
          .eq('user_id', userId)
          .eq('course_id', courseId);
        if (error) throw error;
      } else {
        const { error } = await supabaseClient
          .from('courses_purchase')
          .upsert(
            { course_id: courseId, user_id: userId as string },
            { onConflict: 'user_id, course_id' }
          );
        if (error) throw error;
      }
    },
    onSuccess: () => refetch(),
  });
  const { data: userRow } = GetUserRow(userId);
  const { data: tierUpdated, mutate: updateTier } = useMutation({
    mutationKey: ['updateTier'],
    mutationFn: async () => {
      const { data } = await supabaseClient
        .from('profiles')
        .update({ tier: selectedTier })
        .eq('user_id', userId)
        .select()
        .single();
      data && setSelectedTier(null);
      return data;
    },
  });

  return (
    <Background>
      <View className="rootContainer">
        <View className="items-center">
          <DropDown
            inintialValue={userRow?.tier}
            setState={setSelectedTier}
            data={tierList}></DropDown>
          {selectedTier !== null && (
            <>
              <FadeIn>
                <Pressable
                  onPress={() => updateTier()}
                  className="defaultPressable mb-4 border-red-500 px-4 py-2 ">
                  <Text selectable={false} className="defaultText">
                    تحديث مستوي الأشتراك
                  </Text>
                </Pressable>
              </FadeIn>
            </>
          )}
          {tierUpdated && selectedTier === null && (
            <FadeIn>
              <View className=" mx-auto size-fit rounded-full bg-emerald-500 p-1">
                <Check size={25} color={'white'} />
              </View>
              <Text className="font-لاشسث mb-8 mt-4 self-center text-center font-Kufi text-base text-neutral-800">
                تم تغيير مستوي الأشتراك بنجاح !
              </Text>
            </FadeIn>
          )}
        </View>
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
                    onPress={() => toggleCourseAccess(Number(item.course_id?.id))}
                    className="defaultPressable m-2">
                    <Text
                      selectable={false}
                      className="mx-auto mb-4 font-Kufi text-2xl font-bold text-colorMain underline underline-offset-4">
                      {item.course_id?.id}
                    </Text>
                    <Text selectable={false} className="font-Kufi text-colorMain">
                      أسم الدورة : {item.course_id?.title}
                    </Text>
                    <Text selectable={false} className="font-Kufi text-colorMain">
                      سعر الدورة : {item.course_id?.price}
                    </Text>
                    <Text selectable={false} className="font-Kufi text-colorMain">
                      تاريخ الأذن : {item.created_at}
                    </Text>
                    <Text selectable={false} className="font-Kufi text-colorMain">
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
                  onPress={() => toggleCourseAccess(item.id)}
                  className={`defaultPressable m-2  ${purCourseIds?.includes(item.id) ? 'bg-green-300' : null} `}>
                  <Text
                    selectable={false}
                    className="mx-auto text-xl font-bold text-neutral-800 underline underline-offset-4">
                    {item.id}
                  </Text>
                  <Text selectable={false} className="  text-right font-Kufi">
                    أسم الدورة : {item.title}
                  </Text>
                  <Text selectable={false} className="  text-right font-Kufi">
                    سعر الدورة : {item.price}
                  </Text>
                  <Text selectable={false} className="  text-right font-Kufi">
                    {' '}
                    حالة النشر : {item.is_published.toString()}
                  </Text>
                  <Text selectable={false} className="  text-right font-Kufi">
                    نوع الأشتراك : {item.tier}
                  </Text>
                </Pressable>
              </>
            )}></FlashList>
        </View>
      </View>
    </Background>
  );
};

export default Admin_EditUser;
