import { View, Text, Image, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';

const CoursesFlatlist = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ['Courses Flatlist'],
    queryFn: async () => (await supabaseClient.from('courses').select('*')).data,
  });

  return isSuccess ? (
    <ScrollView>
      <View className="flex-row flex-wrap justify-evenly bg-neutral-600 pt-4">
        {data?.map((item) => (
          <>
            <View className="mx-4 my-4 flex-col items-center justify-center rounded-lg border-[1px] border-neutral-300 bg-neutral-200 p-4">
              <Text className="text-2xl font-bold text-neutral-700">{item.title}</Text>
              <Image
                className="mt-2 rounded-3xl"
                source={{ uri: item.image }}
                style={{ aspectRatio: 1, width: 350 }}></Image>
              <Text className="mt-2 max-w-[350px] text-center font-semibold text-neutral-700">
                {' '}
                {item.short_description}
              </Text>
            </View>
          </>
        ))}
      </View>
    </ScrollView>
  ) : null;
};

export default CoursesFlatlist;
