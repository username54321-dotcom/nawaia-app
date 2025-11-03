import { View, Text, Image, Pressable } from 'react-native';
import { useHeight } from '~/utils/Hooks';
import { useRouter } from 'expo-router';
import { memo } from 'react';

const LandscapeBanner = () => {
  const router = useRouter();
  return (
    <>
      <View
        className="h-[7vh] min-h-[60] w-full flex-row items-center justify-center gap-4 border-b-[1px] border-neutral-400 bg-neutral-200 shadow-gray-400 
">
        <Pressable
          onPress={() => {
            router.push('/(drawer)/(Pages)/About');
          }}>
          <Text className="text-l  font-semibold">عن الأكاديمية</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            router.push('/(drawer)/(Pages)/HealthJourney');
          }}>
          <Text className="text-l  font-semibold">رحلات الصحة</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            router.push('/(drawer)/(Pages)/Books');
          }}>
          <Text className="text-l  font-semibold">كتب</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            router.push('/(drawer)/(Pages)/Courses');
          }}>
          <Text className="text-l  font-semibold">دورات</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            router.push('/(drawer)');
          }}>
          <Text className="text-l  font-semibold">الرئيسية</Text>
        </Pressable>

        <View className="   flex-row justify-center  ">
          <Image
            className="ml-4 "
            style={{ width: useHeight(7, 60) * 3.47826086957, height: useHeight(7, 60) }}
            resizeMode="contain"
            source={require('~/assets/images/2-Photoroom (2).png')}
          />
        </View>
      </View>
    </>
  );
};

export default memo(LandscapeBanner);
