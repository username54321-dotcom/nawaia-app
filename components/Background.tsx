import { ScrollView } from 'react-native';
import DynamicBanner from './Banner/DynamicBanner';
import { memo } from 'react';

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
