import { Platform, ScrollView, Text } from 'react-native';
import DynamicBanner from './Banner/DynamicBanner';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsAuth, useIsAuthType } from '~/store/store';

const Background = ({ children }: { children?: React.ReactNode }) => {
  const cPlatform = Platform.OS;
  const isApproved = useIsAuth((x: useIsAuthType) => x.isApproved);
  return (
    <>
      {/** Web */}
      {cPlatform === 'web' && (
        <>
          <Text>{isApproved.toString()}</Text>
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
