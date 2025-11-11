import { View, Text, Pressable } from 'react-native';
import { memo } from 'react';
import { Tables } from '~/utils/database.types';
import FadeIn from '../Animations/FadeIn';
import MyImage from './MyImage';
import { useRouter } from 'expo-router';
import CompletionBar from './../Pages/[id]/CompletionBar';
import { useIsAuth, useIsAuthType } from '~/store/store';

interface propTypes {
  courseItem: Tables<'courses'>;
  className?: string;
  percentCompleted?: number;
}

const CourseCard = ({ courseItem, className, percentCompleted }: propTypes) => {
  const router = useRouter();
  // Navigate to Course
  const HandleOnPress = (CourseId: number) => {
    router.push({ pathname: `/(drawer)/(Pages)/Course`, params: { id: CourseId } });
  };
  const isAuth = useIsAuth((state: useIsAuthType) => state.isAuth);
  return (
    <FadeIn>
      <View
        className={
          'm-4 size-fit max-w-fit flex-col items-center   justify-start rounded-2xl bg-neutral-200 shadow-md shadow-slate-400 ' +
          className
        }>
        <MyImage
          className="m-2 rounded-b-md rounded-t-2xl  shadow-md shadow-neutral-300"
          source={{ uri: courseItem.image }}
          style={{ aspectRatio: 1, width: 350, height: 350 }}></MyImage>
        {/** Completion Bar */}
        {isAuth && (
          <>
            <CompletionBar
              className="mb-2 w-48 self-center "
              percentCompleted={percentCompleted ?? 0}></CompletionBar>
          </>
        )}
        <View className=" w-full  shrink-0">
          <Text className="m-2 mr-4 self-end font-Kufi  text-2xl font-bold text-slate-700">
            {courseItem.title}
          </Text>
          <Text className="  mb-4 mt-1 line-clamp-2 h-12 max-w-[345px] self-end pl-2 pr-[12px] text-right  font-Kufi text-sm font-semibold text-slate-500 ">
            {courseItem.short_description}
          </Text>

          <Pressable
            onPress={() => HandleOnPress(courseItem.id)}
            className="relative bottom-0 m-6 mt-auto flex  items-center justify-center rounded-md bg-[#BE1E2D]  px-12 py-2 shadow-md shadow-neutral-500 transition-all duration-200 hover:scale-105 ">
            <Text className="  font-Kufi text-base font-semibold text-slate-100  ">عرض</Text>
          </Pressable>
        </View>
        {!courseItem.published && (
          <View
            className={`absolute  rounded-xl  px-4 py-2  ${courseItem.published ? 'bg-green-500' : 'bg-red-500'}`}>
            <Text className="font-semibold text-white ">
              {courseItem.published ? 'Published' : 'UnPublished'}
            </Text>
          </View>
        )}
      </View>
    </FadeIn>
  );
};

export default memo(CourseCard);
