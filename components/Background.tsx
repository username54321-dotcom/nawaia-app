import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicBanner from './Banner/DynamicBanner';
import { memo } from 'react';

const Background = ({ children }: { children?: React.ReactNode }) => {
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
