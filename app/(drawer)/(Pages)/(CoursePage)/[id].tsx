import { useLocalSearchParams } from 'expo-router';
import { Text, View, Pressable } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';
import { AlarmClock, DollarSign } from 'lucide-react-native';
import FadeIn from './../../../../components/Animations/FadeIn';
import Background from '~/components/Background';
import { GenreIcons } from './../../../../components/GenresIcons';
import MyImage1 from './../../../../components/MyImage';
import IdContent from './../../../../components/Pages/[id]/Content';
import TextAccordion from './../../../../components/Pages/[id]/TextAccordion';
import { useModalVisible } from '~/store/store';
const CoursePage = () => {
  const { ModalVisible, setModalVisible } = useModalVisible();
  const { id } = useLocalSearchParams();
  const { data, isSuccess } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      // await new Promise((r) => setTimeout(r, 10000));
      return (await supabaseClient.from('courses').select('*').eq('id', id).limit(1).single()).data;
    },
  });
  return (
    <>
      <Background>
        <Pressable
          className="size-12 bg-red-500"
          onPress={async () =>
            await supabaseClient.from('test').insert({ course_title: data.title })
          }></Pressable>
        {isSuccess && data && (
          <FadeIn>
            <Pressable
              onPress={async () =>
                console.log(await supabaseClient.from('test').select('course_title,id'))
              }
              className="size-12 bg-green-800"></Pressable>
            <View
              aria-label="Main Course Card"
              className="mx-auto w-full max-w-[1000px] flex-1 flex-col items-center justify-start ">
              <Text className="mt-4 font-Kufi text-2xl font-semibold">{data[0]?.title}</Text>

              <MyImage1
                aria-label="Course Image"
                className="m-2 mt-4 self-center overflow-hidden rounded-md shadow-md shadow-neutral-300"
                source={{ uri: data.image }}
                style={{ aspectRatio: 1, width: 350, maxWidth: 600 }}></MyImage1>

              <View
                aria-label="Course Tags"
                className="m-2 flex  flex-row-reverse items-center justify-center transition-all duration-200">
                <View className="ml-2 size-fit flex-row-reverse items-center justify-center rounded-xl border-[1px] border-slate-400 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-slate-200 ">
                  <DollarSign size={18} color={'#404040'} />
                  <Text className=" mr-1 translate-y-[2px] font-Kufi text-xs font-semibold text-neutral-600 ">
                    {data.price} ر.س
                  </Text>
                </View>
                <View className="ml-2 size-fit flex-row-reverse items-center justify-center rounded-xl  border-[1px] border-slate-400 px-4 py-2  transition-all duration-200 hover:scale-105 hover:bg-slate-200   ">
                  <AlarmClock size={18} color={'#404040'} />
                  <Text className=" mr-2 translate-y-[2px] font-Kufi text-xs font-semibold text-neutral-600 ">
                    {data.duration}
                  </Text>
                </View>
                <View className="ml-2 size-fit flex-row-reverse items-center justify-center  rounded-xl border-[1px]   border-slate-400 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-slate-200 ">
                  {GenreIcons[data.genre]}

                  <Text className=" mr-2 translate-y-[2px] font-Kufi text-xs font-semibold text-neutral-600  ">
                    {data.genre}
                  </Text>
                </View>
              </View>
              <TextAccordion data={data}></TextAccordion>

              <IdContent data={data}></IdContent>
            </View>
          </FadeIn>
        )}
      </Background>
    </>
  );
};

export default CoursePage;
