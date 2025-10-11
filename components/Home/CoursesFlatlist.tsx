import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';

const CoursesFlatlist = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ['Courses Flatlist'],
    queryFn: async () => (await supabaseClient.from('courses').select('*')).data,
  });

  return isSuccess ? (
    <ScrollView>
      <View className="flex-row flex-wrap justify-evenly bg-slate-100 ">
        {data?.map((item) => (
          <>
            <View className="shadow-neutral-4 mx-4 my-4 flex-col items-center justify-center rounded-2xl bg-neutral-200  p-4 shadow-md shadow-slate-400">
              <Text className="text-2xl font-bold text-slate-600">{item.title}</Text>
              <Image
                className="mt-2 rounded-3xl shadow-md shadow-neutral-300"
                source={{ uri: item.image }}
                style={{ aspectRatio: 1, width: 350 }}></Image>
              <Text className="mt-2 max-w-[350px] text-center font-semibold text-slate-600">
                {' '}
                {item.short_description}
              </Text>
              <Pressable className="flex items-center justify-center rounded-md bg-[#BE1E2D]  px-4 py-1 shadow-md shadow-slate-500 active:bg-red-900">
                <Text className="text-l font-bold text-white ">عرض</Text>
              </Pressable>
            </View>
          </>
        ))}
      </View>
    </ScrollView>
  ) : null;
};

export default CoursesFlatlist;
