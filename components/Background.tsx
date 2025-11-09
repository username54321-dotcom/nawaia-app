import { ScrollView, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicBanner from './Banner/DynamicBanner';
import { memo } from 'react';
import { usePathname, useRouter } from 'expo-router';
import MyDrawer from './MyDrawer/MyDrawer';
import { useRoute } from '@react-navigation/native';

const Background = ({ children }: { children?: React.ReactNode }) => {
  return (
    <SafeAreaView className="h-screen w-screen">
      <DynamicBanner></DynamicBanner>
      {/* <Pressable
        onPress={() => router.push('/(drawer)/(Pages)/Account')}
        className="size-12 bg-red-500"></Pressable>
        <Pressable
        onPress={() => router.push('/(drawer)/(Pages)/Admin_EditCourse')}
        className="size-12 bg-red-500"></Pressable>
        <Pressable
        onPress={() => router.push('/(drawer)/(Pages)/Admin_SelectCourse')}
        className="size-12 bg-red-500"></Pressable>
        <Pressable
        onPress={() => router.push('/(drawer)/(Pages)/Books')}
        className="size-12 bg-red-500"></Pressable>
        <Pressable
        onPress={() => router.push('/(drawer)/(Pages)/Course')}
        className="size-12 bg-red-500"></Pressable>
        <Pressable
        onPress={() => router.push('/(drawer)/(Pages)/Courses')}
        className="size-12 bg-red-500"></Pressable>
        <Pressable
        onPress={() => router.push('/(drawer)/(Pages)/Test')}
        className="size-12 bg-red-500"></Pressable> */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(Background);
