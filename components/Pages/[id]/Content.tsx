import { View, Text } from 'react-native';
import { memo } from 'react';
import LessonItem from './LessonItem';
import { Tables } from '~/utils/database.types';

type ChaptersArrayType = {
  course_id: number | null;
  created_at: string;
  id: number;
  name: string;
  position: number | null;
  lessons: {
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
  }[];
}[];
type refetchType = () => void;

const IdContent = ({
  chaptersData,
  refetch,
}: {
  chaptersData: ChaptersArrayType;
  refetch: refetchType;
}) => {
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
                  {chapter.name}
                </Text>
              </View>
              {/** Lessons List */}
              {chapter.lessons.map((Lesson, index) => (
                <View key={index}>
                  <LessonItem
                    LessonItemProp={Lesson}
                    refetch={refetch}
                    note={Lesson.notes[0]?.content}
                    // notes={data.notes}
                  ></LessonItem>
                </View>
              ))}
            </View>
          );
        })}
    </>
  );
};

export default memo(IdContent);
