import { memo, useRef, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { ModalState, useIsAuth, useIsAuthType, useModalVisible } from '~/store/store';
import { supabaseClient } from '~/utils/supabase';
import MyAccordion from '~/components/Reusebales/MyAccordion';
import RotatingChevron from './../../Animations/RotatingChevron';
import Lexical from './../../Reusebales/Lexical';
import RenderHTML from 'react-native-render-html';
import tw from 'twrnc';
import { Tables } from '~/utils/database.types';
import VideoModal from './PIPVideo';
type props = {
  LessonItemProp: Tables<'lessons'> & {
    notes: Tables<'notes'>[];
    links: Tables<'links'>;
    video_progress: Tables<'video_progress'>;
  };
  note: string | null;
  refetch: () => void;
};

const LessonItem = ({ LessonItemProp, note }: props) => {
  const setModalVisible = useModalVisible((state: ModalState) => state.setModalVisible); // Change Modal Visibility
  const [expand, setExpand] = useState(false); // Expand Accordion State
  const isAuth = useIsAuth((state: useIsAuthType) => state.isAuth);
  // Auth State
  const Note = useRef<string | null | undefined>(null); // State for note user input
  const [ViewEditor, setViewEditor] = useState(false);
  const [VideoPlayer, setVideoPlayer] = useState(false);

  return (
    <>
      {/** VideoPlayer Modal */}
      <MyAccordion expandProp={VideoPlayer}>
        {VideoPlayer && (
          <VideoModal lessonId={LessonItemProp.id} link={LessonItemProp.links.link}></VideoModal>
        )}
      </MyAccordion>
      {/**Lesson Container */}
      <View className="group h-12 w-full flex-row-reverse items-center justify-between hover:bg-slate-300">
        {/**Lesson Name and Icon */}
        <View className="flex-row-reverse items-center justify-end px-4">
          {isAuth && (
            <RotatingChevron
              onPress={() => setExpand((v) => !v)}
              className="ml-4 rounded-md "></RotatingChevron>
          )}

          <Text className="font-Kufi font-semibold group-hover:text-red-700">
            {LessonItemProp.name}
          </Text>
        </View>
        {/** Watch Lesson Button */}
        <View>
          <Pressable
            onPress={() => (isAuth ? setVideoPlayer(!VideoPlayer) : setModalVisible(true))}>
            <Text className="pl-4 font-Kufi font-semibold text-red-700">مشاهدة</Text>
          </Pressable>
        </View>
      </View>
      {/** Notes Accordion */}
      {isAuth && (
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
                  await supabaseClient
                    .from('notes')
                    .upsert(
                      {
                        lesson_id: LessonItemProp.id,
                        content: Note.current?.replace('<p class="mb-1"><br></p>', ''),
                      },
                      { onConflict: 'user_id, lesson_id' }
                    )
                    .select();

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
              <ScrollView className="mt-2 max-h-[600px] w-11/12 self-center  rounded-xl ">
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
      )}
    </>
  );
};

export default memo(LessonItem);
