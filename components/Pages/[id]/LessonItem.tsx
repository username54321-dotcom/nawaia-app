import { memo, useRef, useState } from 'react';
import { View, Text, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useIsAuth, useModalVisible } from '~/store/store';
import { supabaseClient } from '~/utils/supabase';
import * as Linking from 'expo-linking';
import MyAccordion from '~/components/Reusebales/MyAccordion';
import RotatingChevron from './../../Animations/RotatingChevron';
import Lexical from './../../Reusebales/Lexical';
import RenderHTML from 'react-native-render-html';
import tw from 'twrnc';
interface propTypes {
  lessonData: {
    id: number;
    name: string;
    position: number;
    links: { link: string };
    notes?: {
      id: number;
      content: string;
      user_id: string;
      lesson_id: number;
      created_at: string;
    }[];
  };

  note?: string;
  refetch: () => void;
}

const LessonItem = ({ lessonData, refetch, note }: propTypes) => {
  const { setModalVisible } = useModalVisible(); // Change Modal Visibility
  const [expand, setExpand] = useState(false); // Expand Accordion State
  const { isAuth } = useIsAuth(); // Auth State
  const Note = useRef<string | null | undefined>(null); // State for note user input
  const [ViewEditor, setViewEditor] = useState(false);

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
            {lessonData.name}
          </Text>
        </View>
        {/** Watch Lesson Button */}
        <View>
          <Pressable
            onPress={() =>
              isAuth ? Linking.openURL(lessonData.links.link) : setModalVisible(true)
            }>
            <Text className="pl-4 font-Kufi font-semibold text-red-700">مشاهدة</Text>
          </Pressable>
        </View>
      </View>
      {/** Notes Accordion */}
      <MyAccordion expandProp={expand}>
        {/** Rich Text Editor Editor */}
        {expand && ViewEditor && (
          <>
            <View className="mt-2 w-full items-center self-center rounded-md  p-2">
              <Lexical
                initialHtml={note}
                onStateChange={({ html }) => (Note.current = html)}></Lexical>
            </View>

            <Pressable
              onPress={async () => {
                const { data: isUpserted } = await supabaseClient
                  .from('notes')
                  .upsert(
                    {
                      lesson_id: lessonData.id,
                      content: Note.current?.replace('<p class="mb-1"><br></p>', ''),
                      // course_id: courseId,
                    },
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
            <ScrollView
              // style={tw`max-h-75 self-center w-11/12`}
              className="mt-2 max-h-[600px] w-11/12 self-center  rounded-xl ">
              <RenderHTML
                contentWidth={2000}
                baseStyle={tw`bg-slate-200 px-4 py-2 `}
                source={{ html: note || 'لا توجد ملاحظات' }}
              />
            </ScrollView>
            {/**Edit Notes Button */}
            <Pressable
              onPress={() => setViewEditor(true)}
              className="m-2 size-fit self-center rounded-lg bg-red-700 px-6 py-2 ">
              <Text className="font font-Kufi font-semibold text-neutral-50">
                {note ? 'تعديل' : 'أضف ملاحظاتك'}
              </Text>
            </Pressable>
          </>
        )}
      </MyAccordion>
    </>
  );
};

export default memo(LessonItem);
