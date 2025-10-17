import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicBanner from './Banner/DynamicBanner';

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="flex-1">
      <DynamicBanner></DynamicBanner>
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
};

export default Background;
