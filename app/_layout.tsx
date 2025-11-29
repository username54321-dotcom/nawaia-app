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

//Tanstack Query Init
const tanstackQueryClient = new QueryClient();

export default function RootLayout() {
  // Track Auth Changes
  const IsAuth = useIsAuth((state: useIsAuthType) => state.isAuth);
  const setIsAdmin = useIsAuth((state: useIsAuthType) => state.setIsAdmin);
  const setIsAuth = useIsAuth((state: useIsAuthType) => state.setIsAuth);
  useEffect(() => {
    const apply = async () => {
      supabaseClient.auth.onAuthStateChange((_, session) => {
        setIsAuth(!!session);
      });
    };
    apply();
  }, [setIsAuth]);

  // Track isAdmin
  useEffect(() => {
    async function apply() {
      const userID = (await supabaseClient.auth.getUser()).data.user?.id;
      const isAdmin = [
        '50e44d88-7255-41a4-888f-54906447f692',
        '09b7af41-c884-4454-84df-c733a4e47ecf',
      ].includes(userID ?? '');
      setIsAdmin(isAdmin);
    }
    apply();
  }, [IsAuth, setIsAdmin]);

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
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
        <MyModal></MyModal>
      </QueryClientProvider>
    </GestureHandlerRootView>
    // </StrictMode>
  );
}
