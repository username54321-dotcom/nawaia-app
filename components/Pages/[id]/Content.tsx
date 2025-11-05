import { View, Text } from 'react-native';
import { useIsAuth } from '~/store/store';
import { memo } from 'react';
import LessonItem from './LessonItem';
import { Tables } from '~/utils/database.types';

type lessonsType = Tables<'lessons'> & {
  notes: Tables<'notes'>[];
  links: Tables<'links'>[];
};

export type ChaptersArrayType = (Tables<'chapters'> & {
  lessons: lessonsType[];
})[];
type refetchType = () => void;

const IdContent = ({
  chaptersData,
  refetch,
}: {
  chaptersData: ChaptersArrayType;
  refetch: refetchType;
}) => {
  const { isAuth } = useIsAuth();

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
