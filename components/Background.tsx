import { Platform, ScrollView } from 'react-native';
import DynamicBanner from './Banner/DynamicBanner';
import { SafeAreaView } from 'react-native-safe-area-context';

const Background = ({ children }: { children?: React.ReactNode }) => {
  const cPlatform = Platform.OS;
  return (
    <>
      {/** Web */}
      {cPlatform === 'web' && (
        <>
          <DynamicBanner></DynamicBanner>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            {children}
          </ScrollView>
        </>
      )}
      {/** For Android */}
      {cPlatform !== 'web' && (
        <SafeAreaView className="h-screen w-screen">
          <DynamicBanner></DynamicBanner>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            {children}
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default Background;
