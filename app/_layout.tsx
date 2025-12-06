import 'react-native-url-polyfill/auto';
import '../global.css';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import MyModal from '~/components/Pages/[id]/MyModal/MyModal';
import { useIsAuth, useIsAuthType } from '~/store/store';
import { StrictMode, useEffect } from 'react';

import { supabaseClient } from '~/utils/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';

//Tanstack Query Init
const tanstackQueryClient = new QueryClient();

export default function RootLayout() {
  // Track Auth Changes
  const setIsAdmin = useIsAuth((state: useIsAuthType) => state.setIsAdmin);
  const setIsAuth = useIsAuth((state: useIsAuthType) => state.setIsAuth);

  // Track Auth Changes
  useEffect(() => {
    const apply = async () => {
      // Listen for Auth Changes
      supabaseClient.auth.onAuthStateChange(async (_, session) => {
        setIsAuth(!!session); // Set Auth State

        // Handle Admin Status
        const uuid = (await supabaseClient.auth.getSession()).data.session?.user.id;
        if (uuid) {
          const { data: isAdmin } = await supabaseClient.functions.invoke('verifyIsAdmin', {
            body: { uuid: uuid },
          });
          setIsAdmin(isAdmin);
        }
      });
    };
    apply();
  }, [setIsAuth, setIsAdmin]);

  // Loading Fonts
  const [Fontloaded] = useFonts({
    Kufi: require('~/assets/fonts/NotoKufiArabic-VariableFont_wght.ttf'),
    'Playwrite DE Grund Thin': require('~/assets/fonts/PlaywriteDEGrund-VariableFont_wght.ttf'),
  });

  if (!Fontloaded) {
    return null;
  }
  return (
    // <StrictMode>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={tanstackQueryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <SafeAreaView>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          </SafeAreaView>
        </Stack>
        <MyModal></MyModal>
      </QueryClientProvider>
    </GestureHandlerRootView>
    // </StrictMode>
  );
}
