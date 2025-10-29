import { useNavigation, useRouter } from 'expo-router';
import { LinkIcon } from 'lucide-react-native';
import { View, Text, Pressable, TextInput } from 'react-native';
import * as Linking from 'expo-linking';
import { useIsAuth, useModalVisible } from '~/store/store';
import { useEffect, useState } from 'react';
import { supabaseClient } from '~/utils/supabase';
import FadeIn from './../../Animations/FadeIn';

const IdContent = ({ data, refetch }: { data: any; refetch: any }) => {
  const content = data.content;
  const [Note, setNote] = useState<string | null>(null);
  const { isAuth } = useIsAuth();
  const { setModalVisible } = useModalVisible();
  const getContent = (lesson_id) => {
    return data?.notes?.filter((item) => item.lesson_id == lesson_id)[0]?.content;
  };
  useEffect(() => {
    refetch();
  }, [isAuth, refetch]);
  return (
    <>
      {content.map((item: any, index: any) => {
        return (
          <View className="w-full" key={index}>
            {/**Chapter Name Container */}
            <View
              className="m-2  h-12 w-full items-center self-center rounded-md bg-slate-200 p-2 px-6 text-xl"
              key={item.id}>
              <Text
                aria-label="ChapterName Text"
                className="font-Kufi text-lg font-semibold text-slate-600">
                {item.chapterName}
              </Text>
            </View>
            {/** Lessons List */}
            {item.Lessons.map((item: any, index: any) => (
              <View key={index}>
                {/**Lesson Container */}
                <View className="group h-12 w-full flex-row-reverse items-center justify-between hover:bg-slate-300">
                  {/**Lesson Name and Icon */}
                  <View className="flex-row-reverse items-center justify-end px-4">
                    <LinkIcon size={16} strokeWidth={2.5} className="ml-6 " />
                    <Text
                      aria-label="LessonName Text"
                      className="font-Kufi font-semibold group-hover:text-red-700">
                      {item.lessonName}
                    </Text>
                  </View>
                  {/** Watch Lesson Button */}
                  <View>
                    <Pressable
                      onPress={() =>
                        isAuth ? Linking.openURL(item.LessonLink) : setModalVisible(true)
                      }>
                      <Text className="pl-4 font-Kufi font-semibold text-red-700">مشاهدة</Text>
                    </Pressable>
                  </View>
                </View>

                <TextInput className="border-2" onChangeText={(e) => setNote(e)}></TextInput>
                <Pressable
                  onPress={async () => {
                    const { data: any } = await supabaseClient
                      .from('notes')
                      .upsert(
                        { lesson_id: item.uuid, content: Note, course_id: data.id },
                        { onConflict: 'user_id, lesson_id' }
                      );
                    data && refetch();
                  }}
                  className="size-8 bg-red-500"></Pressable>

                <Text className="min-w-1">{getContent(item.uuid)}</Text>
              </View>
            ))}
          </View>
        );
      })}
    </>
  );
};

export default IdContent;
