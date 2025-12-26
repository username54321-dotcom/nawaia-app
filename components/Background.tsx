import { Platform, ScrollView, Text, Pressable } from 'react-native';
import DynamicBanner from './Banner/DynamicBanner';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsAuth, useIsAuthType } from '~/store/store';
import { supabaseClient } from '~/utils/supabase';

const Background = ({ children }: { children?: React.ReactNode }) => {
  const cPlatform = Platform.OS;
  const isApproved = useIsAuth((x: useIsAuthType) => x.isApproved);
  return (
    <>
      {/** Web */}
      {cPlatform === 'web' && (
        <>
          {/* <Text>Local Value = {isApproved.toString()}</Text>
          <Pressable
            onPress={async () => await supabaseClient.auth.refreshSession()}
            className="bg-red-500 p-4">
            <Text>Refresh Token</Text>
          </Pressable> */}
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
