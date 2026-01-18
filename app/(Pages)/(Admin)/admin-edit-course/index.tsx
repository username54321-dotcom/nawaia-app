import Background from '~/components/Background';
import { supabaseClient } from '~/utils/supabase';
import { Text, View, TouchableOpacity } from 'react-native';
import AdminUpdateField from '../_components/AdminUpdateField';
import AdminPublishButton from '../_components/AdminPublishButton';
import { useLocalSearchParams } from 'expo-router';
import { memo, useCallback, useState } from 'react';
import FadeIn from '~/components/Animations/FadeIn';
import { Trash2 } from 'lucide-react-native';
import MyAccordion from '~/components/Reusebales/MyAccordion';
import useAdminOnly from '~/HelperFunctions/Hooks/AdminOnly';
import { useQueryEditCourse } from '~/HelperFunctions/Queries/EditCourse';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';
import DropDown from './../../../../components/Reusebales/DropDown';
import { TierList, tierList } from '~/data/tierList';
import { ValueOf } from 'react-native-gesture-handler/lib/typescript/typeUtils';
import UpdateCourseTier from './_components/UpdateCourseTier';

const Admin_EditCourse = () => {
  useAdminOnly(); // Admin Only
  const { id }: { id: string } = useLocalSearchParams();

  // Selected Tier
  const [selectedTier, setSelectedTier] = useState<null | Pick<TierList[number], 'label'>>(null);

  // Main Query
  const { data: course, refetch, isLoading } = useQueryEditCourse(+id);

  // Add Chapter
  const handleAddChapter = useCallback(
    async (course_id: number) => {
      const { error } = await supabaseClient
        .from('courses_chapters')
        .insert({ chapter_name: '_فصل جديد', course_id: course_id });
      refetch();
    },
    [refetch]
  );
  // Add Lesson
  const handleAddLesson = useCallback(
    async (chapter_id: number) => {
      const { data: lesson } = await supabaseClient
        .from('courses_lessons')
        .insert({ lesson_name: 'درس جديد', chapter_id: chapter_id })
        .select()
        .single();
      await supabaseClient.from('courses_links').insert({
        lesson_id: lesson?.id ?? 999,
        lesson_link:
          'https://res.cloudinary.com/dhbctone5/video/upload/v1762383158/samples/sea-turtle.mp4',
        course_id: +id,
      });

      refetch();
    },
    [refetch, id]
  );

  // Delete Chapter
  const handleDeleteChapter = useCallback(
    async (chapter_id: number) => {
      const { error } = await supabaseClient.from('courses_chapters').delete().eq('id', chapter_id);
      refetch();
    },
    [refetch]
  );

  // Delete Lesson
  const handleDeleteLesson = useCallback(
    async (lesson_id: number) => {
      const { error } = await supabaseClient.from('courses_lessons').delete().eq('id', lesson_id);
      refetch();
    },
    [refetch]
  );

  return (
    <Background>
      <LoadingAnimation show={isLoading}></LoadingAnimation>
      {course && (
        <FadeIn>
          <MyAccordion expandProp={true}>
            <View className="flex-1 flex-col items-center">
              {/** Publish Button */}
              <AdminPublishButton
                id={course.id}
                isPublished={course.is_published}
                table="courses"
                refetch={refetch}></AdminPublishButton>
              {/**Main Container */}
              <View className=" w-[95%] flex-col items-center  rounded-lg bg-slate-300 p-4">
                {/** Course Title ( non- Editable ) */}
                <Text className="mb-4 rounded-xl bg-slate-500 p-4 font-Kufi text-2xl font-extrabold text-slate-100 underline underline-offset-4">
                  {course.title}
                </Text>
                {/** Course tier DropDown */}

                <UpdateCourseTier
                  courseId={course.id}
                  initialValue={course.tier!}></UpdateCourseTier>
                <Text className="m-2 mr-4 place-self-end font-Kufi text-2xl font-semibold">
                  البيانات الرئيسية
                </Text>
                <AdminUpdateField
                  label="عنوان الدورة"
                  fieldName="title"
                  id={course.id}
                  table="courses"
                  liveValue={course.title}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  label="رابط التليجرام"
                  fieldName="telegram_link"
                  id={course.courses_telegram_links?.id ?? 99999}
                  table="courses_telegram_links"
                  liveValue={course.courses_telegram_links?.telegram_link}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  label="رابط صورة الدورة"
                  fieldName="image"
                  id={course.id}
                  table="courses"
                  liveValue={course.cover_image}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  label="الوصف القصير"
                  fieldName="short_description"
                  id={course.id}
                  table="courses"
                  liveValue={course.short_description}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  label="الوصف الطويل"
                  fieldName="long_description"
                  id={course.id}
                  table="courses"
                  liveValue={course.long_description}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  label="سعر الدورة (0 = مجاني)"
                  fieldName="price"
                  id={course.id}
                  table="courses"
                  liveValue={course.price.toString()}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  label="مدة الدورة"
                  fieldName="duration"
                  id={course.id}
                  table="courses"
                  liveValue={course.duration}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  label="تصنيف الدورة"
                  fieldName="genre"
                  id={course.id}
                  table="courses"
                  liveValue={course.genre}
                  refetch={refetch}></AdminUpdateField>
                {/**Chapter Information Header */}
                <View className="w-full flex-row-reverse items-center justify-between ">
                  <Text className="m-2 mr-4 mt-8 items-center place-self-end font-Kufi text-2xl font-semibold">
                    بيانات الفصول
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleAddChapter(course.id)}
                    className=" rounded-full bg-blue-500 p-4">
                    <Text className="font-Kufi font-semibold text-slate-100">أضافة فصل </Text>
                  </TouchableOpacity>
                </View>
                {course.courses_chapters
                  .sort((a, b) => a.id - b.id)
                  .map((itemChapter, index) => {
                    return (
                      <View className="  w-full flex-col  bg-slate-300 p-2" key={index}>
                        <View className="flex-row items-center justify-center">
                          <Text className="self-center font-Kufi text-lg font-bold">
                            {itemChapter.chapter_name}
                          </Text>
                          <TouchableOpacity
                            delayLongPress={3000}
                            onLongPress={() => handleDeleteChapter(itemChapter.id)}
                            className="m-2 items-center justify-center rounded-full bg-red-500 p-2">
                            <Trash2 color={'white'} />
                          </TouchableOpacity>
                        </View>
                        <View className="w-full items-center rounded-md  p-2">
                          <AdminUpdateField
                            label="عنوان الفصل"
                            fieldName="name"
                            id={itemChapter.id}
                            table="courses_chapters"
                            liveValue={itemChapter.chapter_name}
                            refetch={refetch}></AdminUpdateField>
                          {/**lesson Infromation Header */}
                          <View className="w-full flex-row-reverse items-center justify-between ">
                            <Text className="m-2 mr-4 mt-8 place-self-end font-Kufi text-2xl font-semibold">
                              بيانات الدروس
                            </Text>
                            <TouchableOpacity
                              onPress={() => handleAddLesson(itemChapter.id)}
                              className=" rounded-full bg-blue-500 p-4">
                              <Text className="font-Kufi font-semibold text-slate-100">
                                أضافة درس
                              </Text>
                            </TouchableOpacity>
                          </View>
                          {itemChapter.courses_lessons
                            .sort((a, b) => a.id - b.id)
                            .map((itemLesson, index) => {
                              return (
                                <View className=" w-full flex-col   bg-slate-300 " key={index}>
                                  <View className="w-full items-center rounded-md  ">
                                    <View className="flex-row items-center justify-center">
                                      <Text className="font-Kufi font-semibold">
                                        {itemLesson.lesson_name}
                                      </Text>
                                      <TouchableOpacity
                                        onLongPress={() => handleDeleteLesson(itemLesson.id)}
                                        delayLongPress={3000}>
                                        <Trash2 className="m-2"></Trash2>
                                      </TouchableOpacity>
                                    </View>
                                    <AdminUpdateField
                                      label="عنوان الدرس"
                                      fieldName="name"
                                      id={itemLesson.id}
                                      table="courses_lessons"
                                      liveValue={itemLesson.lesson_name}
                                      refetch={refetch}></AdminUpdateField>

                                    <AdminUpdateField
                                      label="رابط فيديو الدرس"
                                      fieldName="link"
                                      id={itemLesson.courses_links?.id}
                                      table="courses_links"
                                      liveValue={itemLesson.courses_links?.lesson_link}
                                      refetch={refetch}></AdminUpdateField>
                                  </View>
                                </View>
                              );
                            })}
                        </View>
                      </View>
                    );
                  })}
              </View>
            </View>
          </MyAccordion>
        </FadeIn>
      )}
    </Background>
  );
};

export default memo(Admin_EditCourse);
