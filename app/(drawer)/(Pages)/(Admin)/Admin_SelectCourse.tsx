import { View, Text, Pressable } from 'react-native';
import { memo, useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';
import Background from '~/components/Background';
import FadeIn from '~/components/Animations/FadeIn';
import AdminPublishButton from '../../../../components/Pages/AdminPage/AdminPublishButton';
import { Plus, Trash2 } from 'lucide-react-native';
import { addDummyCourse } from '~/HelperFunctions/Add_Dummy_Course';
import { useFocusEffect, useRouter } from 'expo-router';
import MyImage from '~/components/Reusebales/MyImage';
import useAdminOnly from '~/HelperFunctions/Hooks/AdminOnly';
import { useQueryGetCourseList } from '~/HelperFunctions/Queries/GetCourseList';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';

const Admin_SelectCourse = () => {
  const router = useRouter();

  useAdminOnly();

  //Main Query
  const { data: courseList, refetch, isLoading } = useQueryGetCourseList();

  //Delete a Course
  const handleDelete = useCallback(async (id: number) => {
    await supabaseClient.from('courses').delete().eq('id', id);
  }, []);

  //Prevent Double Adding Courses
  const [cantAdd, setCantAdd] = useState(false);

  // Add a Dummy Course
  const handleAddDummyCourse = useCallback(async () => {
    setCantAdd(true);
    await addDummyCourse();
    refetch();
    setCantAdd(false);
  }, [refetch]);

  //Navigate to edit page
  const handleEditCourse = useCallback(
    (id: number) => {
      router.navigate({ pathname: '/Admin_EditCourse', params: { id: id } });
    },
    [router]
  );

  // RealTime
  useFocusEffect(() => {
    const channel = supabaseClient.channel('realtime select course');
    channel
      .on('postgres_changes', { event: '*', table: 'courses', schema: 'public' }, () => refetch())
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  });

  return (
    <Background>
      <LoadingAnimation show={isLoading}></LoadingAnimation>
      <FadeIn>
        <Text className="m-4 mx-auto font-Kufi  text-3xl">تعديل الدورات</Text>
        {courseList && (
          <View className="flex-1 flex-row flex-wrap items-center justify-center">
            {courseList
              .sort((a, b) => a.id - b.id)
              .map((itemCourse, index) => {
                return (
                  <View key={index}>
                    <FadeIn>
                      <View className="   m-4 size-fit max-w-fit flex-col items-center   justify-start rounded-2xl bg-neutral-200 shadow-md shadow-slate-400">
                        <MyImage
                          className="m-2 rounded-b-md rounded-t-2xl  shadow-md shadow-neutral-300"
                          source={{ uri: itemCourse.cover_image }}
                          style={{ aspectRatio: 1, width: 350, height: 350 }}></MyImage>

                        <View className=" w-full  shrink-0">
                          <Text className="m-2 mr-4 self-end font-Kufi  text-2xl font-bold text-slate-700">
                            {itemCourse.title}
                          </Text>
                          <Text className="  mb-4 mt-1 line-clamp-2 h-12 max-w-[345px] self-end pl-2 pr-[12px] text-right  font-Kufi text-sm font-semibold text-slate-500 ">
                            {itemCourse.short_description}
                          </Text>
                          {/** Delete Edit Publish Container */}
                          <View className="size-fit w-full flex-row items-center justify-between ">
                            {/**Delete Button */}

                            <Pressable
                              onLongPress={() => handleDelete(itemCourse.id)}
                              delayLongPress={7000}
                              className="m-2 size-fit rounded-md bg-red-500 p-2 transition-all duration-1000  active:scale-150 ">
                              <Trash2 color={'white'} />
                            </Pressable>
                            {/**Edit Course */}
                            <Pressable
                              onPress={() => handleEditCourse(itemCourse.id)}
                              className="items-center justify-center rounded-md bg-blue-500">
                              <Text className="px-6 py-2 text-xl font-semibold text-white">
                                Edit
                              </Text>
                            </Pressable>
                            {/**Publish Button */}
                            <AdminPublishButton
                              id={itemCourse.id}
                              isPublished={itemCourse.is_published}
                              table="courses"></AdminPublishButton>
                          </View>
                        </View>
                      </View>
                    </FadeIn>
                  </View>
                );
              })}
            {/**Add a new course */}
            <Pressable
              disabled={cantAdd}
              onPress={handleAddDummyCourse}
              className={`m-4 size-24 items-center justify-center rounded-full bg-blue-500 ${cantAdd && 'bg-red-500'}`}>
              <Plus size={50} color={'white'} />
            </Pressable>
          </View>
        )}
      </FadeIn>
    </Background>
  );
};

export default memo(Admin_SelectCourse);
