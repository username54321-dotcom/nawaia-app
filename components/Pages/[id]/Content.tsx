import { View, Text } from 'react-native';
import { useIsAuth } from '~/store/store';
import { useEffect, memo } from 'react';
import LessonItem from './LessonItem';

const IdContent = ({ data, refetch }: { data: any; refetch: any }) => {
  const content = data.content;
  const { isAuth } = useIsAuth();

  useEffect(() => {
    refetch();
  }, [isAuth, refetch]);
  return (
    <>
      {content.map((item: any, index: any) => {
        return (
          <View className="w-full" key={index}>
            {/**Chapter Name Container */}
            <View
              className="m-2  h-12 w-full items-center self-center rounded-md bg-slate-200 p-2 px-6 text-xl"
              key={item.id}>
              <Text
                aria-label="ChapterName Text"
                className="font-Kufi text-lg font-semibold text-slate-600">
                {item.chapterName}
              </Text>
            </View>
            {/** Lessons List */}
            {item.Lessons.map((Lesson: any, index: any) => (
              <View key={index}>
                <LessonItem
                  Lesson={Lesson}
                  courseID={data.id}
                  refetch={refetch}
                  notes={data.notes}></LessonItem>
              </View>
            ))}
          </View>
        );
      })}
    </>
  );
};

export default memo(IdContent);
