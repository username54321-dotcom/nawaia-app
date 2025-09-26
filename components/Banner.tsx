import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Menu } from 'lucide-react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Image } from 'react-native';

const Banner = () => {
  const nav = useNavigation();

  return (
    <View className="h-[10%] w-full flex-row items-center justify-between bg-neutral-200   shadow-md shadow-gray-400">
      <View style={{ width: 75 }} />

      <Image width={100} resizeMode="contain" source={require('~/assets/images/2.png')}></Image>

      <Pressable onPress={() => nav.dispatch(DrawerActions.toggleDrawer())}>
        <Menu className=" m-2" size={30} />
      </Pressable>
    </View>
  );
};

export default Banner;
