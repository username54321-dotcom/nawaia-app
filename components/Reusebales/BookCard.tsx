import { View, Text, Pressable } from 'react-native';
import { memo } from 'react';
import { Tables } from '~/utils/database.types';
import FadeIn from '../Animations/FadeIn';
import MyImage from './MyImage';
import { Link } from 'expo-router';

interface propTypes {
  bookItem: Tables<'books'>;
  className?: string;
}

const CourseCard = ({ bookItem, className }: propTypes) => {
  return (
    <FadeIn>
      {/** Main Container */}
      <View
        className={
          'mx-auto my-2 size-fit max-w-fit flex-col items-center justify-start  overflow-hidden rounded-2xl bg-neutral-200 shadow-md shadow-slate-400 ' +
          className
        }>
        {/** Course Image */}
        <MyImage
          className="m-2 rounded-b-md rounded-t-2xl  shadow-md shadow-neutral-300"
          source={{ uri: bookItem.image }}
          style={{ aspectRatio: 1, width: 350, height: 350 }}></MyImage>

        {/** Course Details Container */}
        <View className=" w-full  shrink-0">
          {/** Course Title */}
          <Text className="m-2 mr-4 mt-2 self-end font-Kufi  text-2xl font-bold text-slate-700">
            {bookItem.title}
          </Text>
          {/** Course Short Description */}
          <Text className="  mb-4 mt-1 line-clamp-2 h-12 max-w-[345px] self-end pl-2 pr-[12px] text-right  font-Kufi text-sm font-semibold text-slate-500 ">
            {bookItem.short_description}
          </Text>
          {/** Navigate to Course Button */}
          <Link asChild href={{ pathname: '/Book', params: { id: bookItem.id } }}>
            <Pressable className="m-6 mt-auto flex-col  items-center justify-center rounded-md bg-[#BE1E2D]  px-12 py-2 shadow-md shadow-neutral-500 transition-all duration-200 hover:scale-105 ">
              <Text className="  font-Kufi text-base font-semibold text-slate-100  ">عرض</Text>
            </Pressable>
          </Link>
        </View>
        {/** Is Published Tag */}
        {!bookItem.published && (
          <View
            className={`absolute  left-0 rounded-sm rounded-br-xl  px-4 py-2  ${bookItem.published ? 'bg-green-500' : 'bg-red-500'}`}>
            <Text className="font-semibold text-white ">
              {bookItem.published ? 'Published' : 'UnPublished'}
            </Text>
          </View>
        )}
      </View>
    </FadeIn>
  );
};

export default memo(CourseCard);
