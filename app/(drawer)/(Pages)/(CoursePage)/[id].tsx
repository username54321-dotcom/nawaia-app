import { useLocalSearchParams, Redirect } from 'expo-router';
import { Text, View, Pressable } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';
import { AlarmClock, DollarSign } from 'lucide-react-native';
import FadeIn from './../../../../components/Animations/FadeIn';
import Background from '~/components/Background';
import { GenreIcons } from './../../../../components/GenresIcons';
import MyImage1 from './../../../../components/MyImage';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import { useState } from 'react';
import IdContent from './../../../../components/Pages/[id]/Content';
const CoursePage = () => {
  const [TextExpand, setTextExpand] = useState(false);
  const { id } = useLocalSearchParams();
  const { data, isSuccess } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      // await new Promise((r) => setTimeout(r, 10000));
      return (await supabaseClient.from('courses').select('*').eq('id', id)).data;
    },
  });
  return (
    <>
      <Background>
        {isSuccess && data?.length > 0 && (
          <FadeIn>
            <View
              aria-label="Main Course Card"
              className="mx-auto max-w-[700px] flex-1 flex-col items-center justify-start">
              <Text className="mt-4 font-Kufi text-2xl font-semibold">{data[0]?.title}</Text>

              <MyImage1
                aria-label="Course Image"
                className="m-2 mt-4 self-center overflow-hidden rounded-md shadow-md shadow-neutral-300"
                source={{ uri: data[0].image }}
                style={{ aspectRatio: 1, width: 350, maxWidth: 600 }}></MyImage1>

              <View
                aria-label="Course Tags"
                className="m-2 flex  flex-row-reverse items-center justify-center transition-all duration-200">
                <View className="ml-2 size-fit flex-row-reverse items-center justify-center rounded-xl border-[1px] border-slate-400 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-slate-200 ">
                  <DollarSign size={18} color={'#404040'} />
                  <Text className=" mr-1 translate-y-[2px] font-Kufi text-xs font-semibold text-neutral-600 ">
                    {data[0].price} ر.س
                  </Text>
                </View>
                <View className="ml-2 size-fit flex-row-reverse items-center justify-center rounded-xl  border-[1px] border-slate-400 px-4 py-2  transition-all duration-200 hover:scale-105 hover:bg-slate-200   ">
                  <AlarmClock size={18} color={'#404040'} />
                  <Text className=" mr-2 translate-y-[2px] font-Kufi text-xs font-semibold text-neutral-600 ">
                    {data[0].duration}
                  </Text>
                </View>
                <View className="ml-2 size-fit flex-row-reverse items-center justify-center  rounded-xl border-[1px]   border-slate-400 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-slate-200 ">
                  {GenreIcons[data[0].genre]}

                  <Text className=" mr-2 translate-y-[2px] font-Kufi text-xs font-semibold text-neutral-600  ">
                    {data[0].genre}
                  </Text>
                </View>
              </View>
              <View
                aria-label="Description Container "
                className=" mx-4 my-6 flex size-fit rounded-md border-2 border-slate-600 bg-slate-200 pt-1 ">
                <Text
                  aria-label="Long Description Text"
                  className=" m-2  text-center font-Kufi   text-lg font-semibold  text-neutral-700">
                  {data[0].short_description}
                </Text>
                <View
                  aria-label="Separator"
                  className="m-4 h-1 w-4/5 self-center border-t-2 opacity-75"></View>
                <Text
                  aria-label="Long Description Text"
                  className={`z-10 m-2 mb-0 w-[90%] self-center  px-4 text-right  font-Kufi text-base text-neutral-700 transition-all  duration-300 ${TextExpand ? null : 'line-clamp-6'}`}>
                  {data[0].long_description}
                </Text>
                <Pressable
                  className="flex items-center justify-start"
                  onPress={() => setTextExpand((state) => !state)}>
                  <Text className="text-md m-2 font-Kufi font-semibold text-red-800">
                    {TextExpand ? 'أخفاء' : 'عرض المزيد'}
                  </Text>
                </Pressable>
                <View
                  aria-label="Separator"
                  className="my-4 h-1 w-4/5 self-center border-t-2 opacity-75"></View>
              </View>
              <IdContent data={data}></IdContent>
            </View>
          </FadeIn>
        )}
      </Background>
    </>
  );
};

export default CoursePage;
