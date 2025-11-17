import { View, Text, Pressable } from 'react-native';
import { memo, useCallback } from 'react';
import { Tables } from '~/utils/database.types';
import FadeIn from '../Animations/FadeIn';
import MyImage from './MyImage';
import { useRouter } from 'expo-router';
import CompletionBar from './../Pages/[id]/CompletionBar';
import { useIsAuth, useIsAuthType } from '~/store/store';
import FavouriteStar from './../Animations/Lottie/FavouriteStar';

interface propTypes {
  courseItem: Tables<'courses'>;
  className?: string;
  percentCompleted?: number;
}

const CourseCard = ({ courseItem, className, percentCompleted }: propTypes) => {
  const router = useRouter();
  // Navigate to Course
  const HandleOnPress = useCallback(
    (CourseId: number) => {
      router.push({ pathname: `/Course`, params: { id: CourseId } });
    },
    [router]
  );
  const isAuth = useIsAuth((state: useIsAuthType) => state.isAuth);
  return (
    <FadeIn>
      {/** Main Container */}
      <View
        className={
          'm-4 size-fit max-w-fit flex-col items-center   justify-start rounded-2xl bg-neutral-200 shadow-md shadow-slate-400 ' +
          className
        }>
        {/** Course Image */}
        <MyImage
          className="m-2 rounded-b-md rounded-t-2xl  shadow-md shadow-neutral-300"
          source={{ uri: courseItem.image }}
          style={{ aspectRatio: 1, width: 350, height: 350 }}></MyImage>
        {/** Completion Bar */}
        {isAuth && (
          <>
            <View className="w-[80%]">
              <CompletionBar
                className="mx-4 mb-2 w-48 self-center "
                percentCompleted={percentCompleted ?? 0}></CompletionBar>
            </View>
          </>
        )}
        {/** Course Details Container */}
        <View className=" w-full  shrink-0">
          {/** Course Title */}
          <Text className="m-2 mr-4 self-end font-Kufi  text-2xl font-bold text-slate-700">
            {courseItem.title}
          </Text>
          {/** Course Short Description */}
          <Text className="  mb-4 mt-1 line-clamp-2 h-12 max-w-[345px] self-end pl-2 pr-[12px] text-right  font-Kufi text-sm font-semibold text-slate-500 ">
            {courseItem.short_description}
          </Text>
          {/** Navigate to Course Button */}
          <Pressable
            onPress={() => HandleOnPress(courseItem.id)}
            className="relative bottom-0 m-6 mt-auto flex  items-center justify-center rounded-md bg-[#BE1E2D]  px-12 py-2 shadow-md shadow-neutral-500 transition-all duration-200 hover:scale-105 ">
            <Text className="  font-Kufi text-base font-semibold text-slate-100  ">عرض</Text>
          </Pressable>
        </View>
        {/** Is Published Tag */}
        {!courseItem.published && (
          <View
            className={`absolute  rounded-xl  px-4 py-2  ${courseItem.published ? 'bg-green-500' : 'bg-red-500'}`}>
            <Text className="font-semibold text-white ">
              {courseItem.published ? 'Published' : 'UnPublished'}
            </Text>
          </View>
        )}
        <FavouriteStar></FavouriteStar>
      </View>
    </FadeIn>
  );
};

export default memo(CourseCard);
