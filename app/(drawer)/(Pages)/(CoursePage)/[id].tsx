import { useLocalSearchParams, Redirect } from 'expo-router';
import { Text, ScrollView, Image, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';
import { AlarmClock, DollarSign } from 'lucide-react-native';
import { Image as ExpoImage } from 'expo-image';
import FadeIn from './../../../../components/Animations/FadeIn';
import { AnimatePresence, MotiView } from 'moti';
import Background from '~/components/Background';
import { GenreIcons } from './../../../../components/GenresIcons';
import { tw } from 'twrnc';

const CoursePage = () => {
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
        <AnimatePresence exitBeforeEnter={true}>
          {isSuccess && data?.length > 0 && (
            <MotiView key="content" className="flex-1">
              <FadeIn>
                <ScrollView className="flex-1 flex-col  p-4">
                  <View className="flex-1 flex-col items-center justify-start">
                    <Text className="mt-4 font-Kufi text-2xl font-semibold">{data[0]?.title}</Text>
                    <ExpoImage
                      className=" m-2 mt-4 self-center rounded-md shadow-md shadow-neutral-300"
                      source={{ uri: data[0].image }}
                      style={{ aspectRatio: 1, width: 350, maxWidth: 600 }}></ExpoImage>

                    <View className="m-2 flex  flex-row-reverse items-center justify-center transition-all duration-200">
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
                  </View>
                </ScrollView>
              </FadeIn>
            </MotiView>
          )}
        </AnimatePresence>
      </Background>
    </>
  );
};

export default CoursePage;
