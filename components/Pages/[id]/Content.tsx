import { View, Text } from 'react-native';
import { memo } from 'react';
import LessonItem from './LessonItem';
import { Tables } from '~/utils/database.types';

type test = (Tables<'courses_chapters'> & {
  courses_lessons: (Tables<'courses_lessons'> & {
    courses_lessons_completed: Tables<'courses_lessons_completed'>[];
    courses_notes: Tables<'courses_notes'>[];
    courses_links: Tables<'courses_links'>;
    courses_user_video_progress: Tables<'courses_user_video_progress'>[];
  })[];
})[];
type refetchType = () => void;

const IdContent = ({ chaptersData, refetch }: { chaptersData: test; refetch: refetchType }) => {
  return (
    <>
      {chaptersData
        .sort((a, b) => a.id - b.id)
        .map((chapter, index) => {
          return (
            <View key={index} className="w-full">
              {/**Chapter Name Container */}
              <View className="m-2  h-12 w-full items-center self-center rounded-md bg-slate-200 p-2 px-6 text-xl">
                <Text className="font-Kufi text-lg font-semibold text-slate-600">
                  {chapter.chapter_name}
                </Text>
              </View>
              {/** Lessons List */}
              {chapter.courses_lessons.map((Lesson) => (
                <>
                  <LessonItem
                    lessonItem={Lesson}
                    refetch={refetch}
                    note={Lesson.courses_notes[0]?.note_content}></LessonItem>
                </>
              ))}
            </View>
          );
        })}
    </>
  );
};

export default memo(IdContent);
