import { LinkIcon } from 'lucide-react-native';
import { memo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useIsAuth, useModalVisible } from '~/store/store';
import { supabaseClient } from '~/utils/supabase';
import * as Linking from 'expo-linking';

interface PropsTypes {
  Lesson: { lessonName: string; LessonLink: string; uuid: string };
  refetch: () => void;
  courseID: number;
  notes?: { content: string }[];
}

const LessonItem = ({ Lesson, refetch, courseID, notes }: PropsTypes) => {
  const { setModalVisible } = useModalVisible();
  const [Note, setNote] = useState<string | null>(null);
  const { isAuth } = useIsAuth();
  const getContent = (lesson_id: string) => {
    return notes?.filter((note: any) => note.lesson_id == lesson_id)[0]?.content;
  };

  return (
    <>
      {/**Lesson Container */}
      <View className="group h-12 w-full flex-row-reverse items-center justify-between hover:bg-slate-300">
        {/**Lesson Name and Icon */}
        <View className="flex-row-reverse items-center justify-end px-4">
          <LinkIcon size={16} strokeWidth={2.5} className="ml-6 " />
          <Text
            aria-label="LessonName Text"
            className="font-Kufi font-semibold group-hover:text-red-700">
            {Lesson.lessonName}
          </Text>
        </View>
        {/** Watch Lesson Button */}
        <View>
          <Pressable
            onPress={() => (isAuth ? Linking.openURL(Lesson.LessonLink) : setModalVisible(true))}>
            <Text className="pl-4 font-Kufi font-semibold text-red-700">مشاهدة</Text>
          </Pressable>
        </View>
      </View>
      <TextInput className="border-2" onChangeText={(e) => setNote(e)}></TextInput>
      <Pressable
        onPress={async () => {
          const { data: isUpserted } = await supabaseClient
            .from('notes')
            .upsert(
              { lesson_id: Lesson.uuid, content: Note, course_id: courseID },
              { onConflict: 'user_id, lesson_id' }
            )
            .select();
          isUpserted && refetch();
        }}
        className="-y2 size-fit rounded-md bg-red-500 px-6">
        <Text className="font-Playwrite font-semibold text-white">Save</Text>
      </Pressable>
      <Pressable className="border-2">
        <Text className="h-12">{getContent(Lesson.uuid)}</Text>
      </Pressable>
    </>
  );
};

export default memo(LessonItem);
