import { View, Text, Image, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';
import { useRouter } from 'expo-router';

const CourseList = () => {
  const router = useRouter();
  const HandleOnPress = (item) => {
    router.push({ pathname: `/(drawer)/(Pages)/(CoursePage)/${item.id}` });
  };
  const { data, isSuccess } = useQuery({
    queryKey: ['Courses Flatlist'],

    queryFn: async () => (await supabaseClient.from('courses').select('*')).data,
  });

  return isSuccess ? (
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <View className="bg-slate-200-200 flex-row flex-wrap justify-center ">
        {data?.map((item) => (
          <>
            <View className=" m-4 max-w-fit flex-col items-center justify-start rounded-2xl  bg-neutral-200  shadow-md shadow-slate-400">
              <Image
                className=" m-2 rounded-b-md rounded-t-2xl shadow-md shadow-neutral-300"
                source={{ uri: item.image }}
                style={{ aspectRatio: 1, width: 350 }}></Image>

              <View className="w-full">
                <Text className="font-Kufi m-2 mr-4 self-end  text-2xl font-bold text-slate-700">
                  {item.title}
                </Text>
                <Text className="  font-Kufi mb-4 mt-1 max-w-[345px] self-end pr-[12px] text-right   text-sm font-semibold text-slate-500">
                  {item.short_description}
                </Text>
                <Pressable
                  onPress={() => HandleOnPress(item)}
                  className=" m-6 mt-auto flex items-center justify-center  rounded-md   bg-[#BE1E2D] px-12 py-2 shadow-md     shadow-neutral-500 ">
                  <Text className="font-Kufi text-base font-semibold text-slate-100  ">عرض</Text>
                </Pressable>
              </View>
            </View>
          </>
        ))}
      </View>
    </ScrollView>
  ) : null;
};

export default CourseList;
