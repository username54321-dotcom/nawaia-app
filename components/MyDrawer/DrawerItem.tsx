import { Text, Pressable } from 'react-native';
import React from 'react';
import * as router from 'expo-router';
import { usePathname, useRouter } from 'expo-router';

interface propTypes {
  targetPage: router.Href;
  label: string;
  setDrawerVisible: (value: boolean) => void;
}
const DrawerItem = ({ targetPage, label, setDrawerVisible }: propTypes) => {
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
        className={`my-2 w-full items-center rounded-xl   py-1 ${samePath && 'bg-neutral-600'}`}>
        <Text
          className={`font-Kufi font-semibold text-neutral-600 ${samePath && 'text-neutral-200'}`}>
          {label}
        </Text>
      </Pressable>
    </>
  );
};

export default DrawerItem;
