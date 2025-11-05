import { View, Text } from 'react-native';
import { useIsAuth } from '~/store/store';
import { useEffect, memo } from 'react';
import LessonItem from './LessonItem';

type chapterType = {
  id: number;
  name: string;
  lessons: {
    id: number;
    name: string;
    position: number;
    links: { link: string }[];
    notes: {
      id: number;
      content: string;
      user_id: string;
      lesson_id: number;
      created_at: string;
    }[];
  }[];
};
type lessonType = {
  id: number;
  name: string;
  position: number;
  links?: { link: string }[];
  notes: { id: number; content: string; user_id: string; lesson_id: number; created_at: string }[];
};

type propTypes = {
  chaptersData: chapterType[];
  refetch: () => void;
};
const IdContent = ({ chaptersData, refetch }: propTypes) => {
  const { isAuth } = useIsAuth();

  return (
    <>
      {chaptersData
        .sort((a, b) => a.id - b.id)
        .map((chapter: chapterType, index: number) => {
          return (
            <View key={index} className="w-full">
              {/**Chapter Name Container */}
              <View className="m-2  h-12 w-full items-center self-center rounded-md bg-slate-200 p-2 px-6 text-xl">
                <Text className="font-Kufi text-lg font-semibold text-slate-600">
                  {chapter.name}
                </Text>
              </View>
              {/** Lessons List */}
              {chapter.lessons.map((Lesson: lessonType, index: any) => (
                <View key={index}>
                  <LessonItem
                    lessonData={Lesson}
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
