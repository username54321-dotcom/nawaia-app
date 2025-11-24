import { Text, Pressable, View } from 'react-native';
import React from 'react';
import * as router from 'expo-router';
import { usePathname, useRouter } from 'expo-router';
import { LucideIcon } from 'lucide-react-native';

interface propTypes {
  targetPage: router.Href;
  label: string;
  setDrawerVisible: (value: boolean) => void;
  Icon?: LucideIcon;
}
const DrawerItem = ({ targetPage, label, setDrawerVisible, Icon }: propTypes) => {
  const router = useRouter();
  const path = usePathname();
  const samePath = path === targetPage;
  const handleNavigation = () => {
    setDrawerVisible(false);
    router.push(targetPage);
  };

  return (
    <>
      <Pressable
        onPress={handleNavigation}
        className={`my-2 w-full flex-row items-center justify-between rounded-xl py-1 ${samePath && ' bg-neutral-600'}`}>
        <Text
          className={`mx-auto px-4 pr-2 font-Kufi font-semibold  ${samePath ? ' text-neutral-200' : ' text-neutral-600'}`}>
          {label}
        </Text>
        <View className="mr-2">{Icon && <Icon color={samePath ? '#e5e5e5' : '#525252'} />}</View>
      </Pressable>
    </>
  );
};

export default DrawerItem;
