import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicBanner from './Banner/DynamicBanner';

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView>
      <DynamicBanner></DynamicBanner>
      {children}
    </SafeAreaView>
  );
};

export default Background;
