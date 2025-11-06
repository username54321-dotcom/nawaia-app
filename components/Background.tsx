import { ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicBanner from './Banner/DynamicBanner';
import { memo } from 'react';
import { useNavigation, useRouter } from 'expo-router';

const Background = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const nav = useNavigation();

  return (
    <SafeAreaView className="flex-1">
      <DynamicBanner></DynamicBanner>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(Background);
