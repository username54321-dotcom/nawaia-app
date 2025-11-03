import { memo, useRef, useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useIsAuth, useModalVisible } from '~/store/store';
import { supabaseClient } from '~/utils/supabase';
import * as Linking from 'expo-linking';
import MyAccordion from '~/components/Reusebales/MyAccordion';
import RotatingChevron from './../../Animations/RotatingChevron';
import Lexical from './../../Reusebales/Lexical';
import RenderHTML from 'react-native-render-html';
import tw from 'twrnc';

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
  const [ViewEditor, setViewEditor] = useState(false);

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
        {/** Rich Text Editor Editor */}
        {expand && ViewEditor && (
          <>
            <View className="mt-2 w-full items-center self-center rounded-md border-[1px] p-2">
              <Lexical
                initialHtml={getContent(Lesson.uuid)}
                onStateChange={({ html }) => (Note.current = html)}></Lexical>
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
                setViewEditor(false);
              }}
              className="my-1 size-fit self-center rounded-md bg-red-500 px-6">
              <Text className="font-Playwrite font-semibold text-white">Save</Text>
            </Pressable>
          </>
        )}
        {/** Notes Container */}
        {expand && !ViewEditor && (
          <>
            {/**Notes HTML */}
            <RenderHTML
              contentWidth={2000}
              baseStyle={tw`bg-blue-100 p-4 rounded-md self-center w-11/12`}
              source={{ html: getContent(Lesson.uuid) || 'لا توجد ملاحظات' }}
            />
            {/**Edit Notes Button */}
            <Pressable
              onPress={() => setViewEditor(true)}
              className="m-2 size-fit self-center rounded-lg bg-red-700 px-6 py-2 ">
              <Text className="font font-Kufi font-semibold text-neutral-50">
                {getContent(Lesson.uuid) ? 'تعديل' : 'أضف ملاحظاتك'}
              </Text>
            </Pressable>
          </>
        )}
      </MyAccordion>
    </>
  );
};

export default memo(LessonItem);
