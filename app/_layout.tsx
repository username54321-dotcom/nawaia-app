import 'react-native-url-polyfill/auto';
import '../global.css';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts, AtomicAge_400Regular } from '@expo-google-fonts/atomic-age';
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
  }, []);

  // Track isAdmin
  useEffect(() => {
    async function apply() {
      const userID = (await supabaseClient.auth.getUser()).data.user?.id;
      const isAdmin = [
        '50e44d88-7255-41a4-888f-54906447f692',
        'dd678e74-531f-4a4f-8974-4fc45974a2ef',
      ].includes(userID ?? '');
      setIsAdmin(isAdmin);
    }
    apply();
  }, [IsAuth, setIsAdmin]);

  // Loading Fonts
  const [Fontloaded] = useFonts({
    AtomicAge: AtomicAge_400Regular,
    Kufi: require('~/assets/fonts/NotoKufiArabic-VariableFont_wght.ttf'),
    'Playwrite DE Grund Thin': require('~/assets/fonts/PlaywriteDEGrund-VariableFont_wght.ttf'),
    'Playwrite GB S Thin': require('~/assets/fonts/PlaywriteGBS-VariableFont_wght.ttf'),
    Boggle: require('~/assets/fonts/BBHSansBogle-Regular.ttf'),
  });

  if (!Fontloaded) {
    return null;
  }
  return (
    <StrictMode>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={tanstackQueryClient}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          </Stack>
          <MyModal></MyModal>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </StrictMode>
  );
}
