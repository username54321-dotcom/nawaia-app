import { View, Text, Image } from 'react-native';
import React from 'react';
import { useHeight, useWidth } from '~/utils/Hooks';

const LandscapeBanner = () => {
  return (
    <>
      <View
        className="h-[7vh] min-h-[60] w-full flex-row items-center justify-between border-b-[1px] border-neutral-400 bg-neutral-200 shadow-gray-400 
">
        <View className="  flex-row justify-start border-2 border-black ">
          <Image
            className="ml-6 "
            style={{ width: useHeight(7, 60) * 3.47826086957, height: useHeight(7, 60) }}
            resizeMode="contain"
            source={require('~/assets/images/2-Photoroom (2).png')}
          />
        </View>
        <View className=" w-[50vw] flex-row justify-center border-2 border-red-500">
          <Text className="text-2xl">test</Text>
        </View>
      </View>
    </>
  );
};

export default LandscapeBanner;
