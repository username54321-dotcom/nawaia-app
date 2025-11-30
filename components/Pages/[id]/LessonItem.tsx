import { memo, useRef, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useModalVisibleType, useIsAuth, useIsAuthType, useModalVisible } from '~/store/store';
import { supabaseClient } from '~/utils/supabase';
import MyAccordion from '~/components/Reusebales/MyAccordion';
import Lexical from './../../Reusebales/Lexical';
import RenderHTML from 'react-native-render-html';
import tw from 'twrnc';
import VideoModal from './PIPVideo';
import { Check } from 'lucide-react-native';
import FadeIn from '~/components/Animations/FadeIn';
import DraftIcon from './DraftIcon';
type props = {
  LessonItemProp: {
    chapter_id: number | null;
    created_at: string;
    id: number;
    name: string;
    position: number | null;
    links: {
      created_at: string;
      id: number;
      lesson_id: number;
      link: string;
    } | null;
    notes: {
      content: string | null;
      created_at: string;
      id: number;
      lesson_id: number | null;
      user_id: string | null;
    }[];
    video_progress: {
      created_at: string;
      id: number;
      lesson_id: number;
      timestamp: number;
      user_id: string;
    }[];
    lesson_completed: {
      created_at: string;
      id: number;
      is_completed: boolean;
      lesson_id: number;
      user_id: string;
    }[];
  };
  note: string | null;
  refetch: () => void;
};

const LessonItem = ({ LessonItemProp, note, refetch }: props) => {
  const setModalVisible = useModalVisible((state: useModalVisibleType) => state.setModalVisible); // Change Modal Visibility
  const [expand, setExpand] = useState<boolean>(false); // Expand Accordion State
  const isAuth = useIsAuth((state: useIsAuthType) => state.isAuth);
  // Auth State
  const Note = useRef<string | null | undefined>(null); // State for note user input
  const [ViewEditor, setViewEditor] = useState(false);
  const [VideoPlayer, setVideoPlayer] = useState(false);

  return (
    <>
      {/** VideoPlayer Modal */}
      <MyAccordion expandProp={VideoPlayer}>
        {VideoPlayer && LessonItemProp && (
          <VideoModal
            isCompleted={LessonItemProp.lesson_completed[0]?.is_completed ?? false}
            lessonId={LessonItemProp.id}
            link={LessonItemProp.links?.link ?? ''}></VideoModal>
        )}
      </MyAccordion>
      {/**Lesson Container */}
      <Pressable
        onPress={() => (isAuth ? setVideoPlayer(!VideoPlayer) : setModalVisible(true))}
        className="group h-12 w-full flex-row-reverse items-center justify-between hover:bg-slate-300">
        {/**Lesson Name and Icon */}
        <View className="flex-row-reverse items-center justify-end px-4">
          {isAuth && <DraftIcon setExpand={setExpand}></DraftIcon>}

          <Text className="font-Kufi font-semibold group-hover:text-red-700">
            {LessonItemProp.name}
          </Text>
        </View>

        {/** Watch Lesson Button */}
        <View>
          <View className="flex-row items-center">
            {/** Conditional Completed Icon */}
            {(LessonItemProp.lesson_completed[0]?.is_completed ?? false) && (
              <>
                <FadeIn>
                  <View className="ml-2 rounded-full bg-emerald-500 p-1">
                    <Check size={18} color={'white'} />
                  </View>
                </FadeIn>
              </>
            )}
            <Text className="pl-4 font-Kufi font-semibold text-red-700">مشاهدة</Text>
          </View>
        </View>
      </Pressable>
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
                className="m-2 size-fit self-center rounded-lg bg-red-700 px-6 py-2">
                <Text className="font font-Kufi font-semibold text-neutral-50">حفظ</Text>
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
                  source={{ html: note || 'لا توجد مذكرات' }}
                />
              </ScrollView>
              {/**Edit Notes Button */}
              <Pressable
                onPress={() => setViewEditor(true)}
                className="m-2 size-fit self-center rounded-lg bg-red-700 px-6 py-2 ">
                <Text className="font font-Kufi font-semibold text-neutral-50">
                  {note ? 'تعديل' : 'أضف مذكراتك'}
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
