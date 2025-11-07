import { useQuery } from '@tanstack/react-query';
import Background from '~/components/Background';
import { supabaseClient } from '~/utils/supabase';
import { Text, View } from 'react-native';
import AdminUpdateField from '../../../components/Pages/AdminPage/AdminUpdateField';
import AdminPublishButton from '../../../components/Pages/AdminPage/AdminPublishButton';
import { useLocalSearchParams } from 'expo-router';
import { memo } from 'react';
import FadeIn from '~/components/Animations/FadeIn';

const Admin_EditCourse = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const { data: course, refetch } = useQuery({
    queryKey: ['edit course', id],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from('courses')
        .select('*,telegram_links(*), chapters(*, lessons(*, links(*)))')
        .eq('id', +id)
        .single();
      return data;
    },
  });

  return (
    <Background>
      {course && (
        <FadeIn>
          <View className="flex-1 flex-col items-center">
            <AdminPublishButton
              id={course.id}
              isPublished={course.published}
              refetch={refetch}
              table="courses"></AdminPublishButton>
            {/**Course Information */}
            <Text className="mb-4 text-2xl font-semibold">{course.title}</Text>
            <View className=" w-[95%] flex-col items-center  bg-slate-300 p-4">
              <Text className="m-2 text-2xl font-extrabold">Course Information</Text>
              <AdminUpdateField
                fieldName="title"
                id={course.id}
                table="courses"
                liveValue={course.title}
                refetch={refetch}></AdminUpdateField>
              <AdminUpdateField
                fieldName="telegram_link"
                id={course.telegram_links?.id ?? 9999}
                table="telegram_links"
                liveValue={course.telegram_links?.telegram_link}
                refetch={refetch}></AdminUpdateField>
              <AdminUpdateField
                fieldName="image"
                id={course.id}
                table="courses"
                liveValue={course.image}
                refetch={refetch}></AdminUpdateField>
              <AdminUpdateField
                fieldName="short_description"
                id={course.id}
                table="courses"
                liveValue={course.short_description}
                refetch={refetch}></AdminUpdateField>
              <AdminUpdateField
                fieldName="long_description"
                id={course.id}
                table="courses"
                liveValue={course.long_description}
                refetch={refetch}></AdminUpdateField>
              <AdminUpdateField
                fieldName="price"
                id={course.id}
                table="courses"
                liveValue={course.price.toString()}
                refetch={refetch}></AdminUpdateField>
              <AdminUpdateField
                fieldName="duration"
                id={course.id}
                table="courses"
                liveValue={course.duration}
                refetch={refetch}></AdminUpdateField>
              <AdminUpdateField
                fieldName="genre"
                id={course.id}
                table="courses"
                liveValue={course.genre}
                refetch={refetch}></AdminUpdateField>
            </View>
            {/**Chapter Information */}
            <Text className="m-2 text-2xl font-extrabold">Chapters Info</Text>
            {course.chapters
              .sort((a, b) => a.id - b.id)
              .map((itemChapter, index) => {
                return (
                  <View className=" w-[95%] flex-col items-center  bg-slate-300 p-2" key={index}>
                    <Text className="text-xl font-bold">{itemChapter.name}</Text>
                    <View className="w-full items-center rounded-md border-[3px] p-2">
                      <AdminUpdateField
                        fieldName="name"
                        id={itemChapter.id}
                        table="chapters"
                        liveValue={itemChapter.name}
                        refetch={refetch}></AdminUpdateField>
                      {/**lesson Infromation */}
                      <Text className="m-2 text-2xl font-extrabold">Lesson Information</Text>
                      {itemChapter.lessons
                        .sort((a, b) => a.id - b.id)
                        .map((itemLesson, index) => {
                          return (
                            <View
                              className=" w-[95%] flex-col items-center  bg-slate-300 p-4"
                              key={index}>
                              <View className="w-full items-center rounded-md p-4">
                                <AdminUpdateField
                                  fieldName="name"
                                  id={itemLesson.id}
                                  table="lessons"
                                  liveValue={itemLesson.name}
                                  refetch={refetch}></AdminUpdateField>

                                <AdminUpdateField
                                  fieldName="link"
                                  id={itemLesson.links?.id}
                                  table="links"
                                  liveValue={itemLesson.links?.link}
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
        </FadeIn>
      )}
    </Background>
  );
};

export default memo(Admin_EditCourse);
