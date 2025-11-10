import { ScrollView, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicBanner from './Banner/DynamicBanner';
import { memo } from 'react';
import { usePathname, useRouter } from 'expo-router';
import MyDrawer from './MyDrawer/MyDrawer';
import { useRoute } from '@react-navigation/native';

const Background = ({ children }: { children?: React.ReactNode }) => {
  return (
    // <SafeAreaView className="h-screen w-screen">
    <>
      <DynamicBanner></DynamicBanner>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        {children}
      </ScrollView>
    </>
    // {/* </SafeAreaView> */}
  );
};

export default memo(Background);
