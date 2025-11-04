import { useQuery } from '@tanstack/react-query';
import Background from '~/components/Background';
import { supabaseClient } from '~/utils/supabase';
import { Pressable, Text, View } from 'react-native';
import AdminUpdateField from './../../../components/Pages/AdminPage/AdminUpdateField';
import AdminPublishButton from './../../../components/Pages/AdminPage/AdminPublishButton';
import LessonItem from '~/components/Pages/[id]/LessonItem';

const Admin_AddPages = () => {
  const { data: courseList, refetch } = useQuery({
    queryKey: ['Admin courses'],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from('courses')
        .select('*, chapters(*, lessons(*, links(*)))');
      console.log(data);
      return data;
    },
  });

  return (
    <Background>
      {courseList &&
        courseList.map((itemCourse, index) => {
          return (
            <View key={index} className="flex-1 flex-col items-center">
              <AdminPublishButton
                id={itemCourse.id}
                isPublished={itemCourse.published}
                refetch={refetch}
                table="courses"></AdminPublishButton>
              {/**Course Information */}
              <Text className="m-2 text-2xl font-extrabold">Course Information</Text>
              <View className=" flex-col items-center justify-center bg-slate-300 p-4">
                <AdminUpdateField
                  fieldName="title"
                  id={itemCourse.id}
                  table="courses"
                  liveValue={itemCourse.title}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  fieldName="image"
                  id={itemCourse.id}
                  table="courses"
                  liveValue={itemCourse.image}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  fieldName="short_description"
                  id={itemCourse.id}
                  table="courses"
                  liveValue={itemCourse.short_description}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  fieldName="long_description"
                  id={itemCourse.id}
                  table="courses"
                  liveValue={itemCourse.long_description}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  fieldName="price"
                  id={itemCourse.id}
                  table="courses"
                  liveValue={itemCourse.price.toString()}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  fieldName="duration"
                  id={itemCourse.id}
                  table="courses"
                  liveValue={itemCourse.duration}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  fieldName="genre"
                  id={itemCourse.id}
                  table="courses"
                  liveValue={itemCourse.genre}
                  refetch={refetch}></AdminUpdateField>
              </View>
              {/**Chapter Information */}
              <Text>Chapters Info</Text>
              {itemCourse.chapters.map((itemChapter, index) => {
                return (
                  <View key={index}>
                    <AdminUpdateField
                      fieldName="name"
                      id={itemChapter.id}
                      table="chapters"
                      liveValue={itemChapter.name}
                      refetch={refetch}></AdminUpdateField>
                    {/**lesson Infromation */}
                    <Text>Lesson Information</Text>
                    {itemChapter.lessons.map((itemLesson, index) => {
                      return (
                        <View key={index}>
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
                            refetch={refetch}></AdminUpdateField>{' '}
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          );
        })}
    </Background>
  );
};

export default Admin_AddPages;
