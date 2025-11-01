import { memo, useRef, useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useIsAuth, useModalVisible } from '~/store/store';
import { supabaseClient } from '~/utils/supabase';
import * as Linking from 'expo-linking';
import MyAccordion from '~/components/Reusebales/MyAccordion';
import RotatingChevron from './../../Animations/RotatingChevron';

interface PropsTypes {
  Lesson: { lessonName: string; LessonLink: string; uuid: string };
  refetch: () => void;
  courseID: number;
  notes?: { content: string }[];
}

const LessonItem = ({ Lesson, refetch, courseID, notes }: PropsTypes) => {
  const { setModalVisible } = useModalVisible(); // Change Modal Visibility
  const [expand, setExpand] = useState(false); // Expand Accordion State
  const { isAuth } = useIsAuth(); // Auth State
  const Note = useRef<string | null>(null); // State for note user input

  // Filter Notes for Selected Lesson
  const getContent = (lesson_id: string) => {
    return notes?.filter((note: any) => +note.lesson_id === +lesson_id)[0]?.content;
  };

  return (
    <>
      {/**Lesson Container */}

      <View className="group h-12 w-full flex-row-reverse items-center justify-between hover:bg-slate-300">
        {/**Lesson Name and Icon */}
        <View className="flex-row-reverse items-center justify-end px-4">
          <RotatingChevron
            onPress={() => setExpand((v) => !v)}
            className="ml-4 rounded-md "></RotatingChevron>

          <Text className="font-Kufi font-semibold group-hover:text-red-700">
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
      {/** Notes Accordion */}
      <MyAccordion expandProp={expand}>
        <View className="mt-2 size-fit items-center self-center rounded-md border-[1px] p-2">
          <TextInput
            onChangeText={(v) => (Note.current = v)}
            multiline={true}
            className="outline-none"></TextInput>
        </View>
        <Pressable
          onPress={async () => {
            const { data: isUpserted } = await supabaseClient
              .from('notes')
              .upsert(
                { lesson_id: Lesson.uuid, content: Note.current, course_id: courseID },
                { onConflict: 'user_id, lesson_id' }
              )
              .select();
            isUpserted && refetch();
          }}
          className="my-1 size-fit self-center rounded-md bg-red-500 px-6">
          <Text className="font-Playwrite font-semibold text-white">Save</Text>
        </Pressable>
        <Text>{getContent(Lesson.uuid)}</Text>
      </MyAccordion>
    </>
  );
};

export default memo(LessonItem);
