import 'react-native-url-polyfill/auto';
import '../global.css';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts, AtomicAge_400Regular } from '@expo-google-fonts/atomic-age';
import MyModal from '~/components/Pages/[id]/MyModal/MyModal';
import { useIsAuth } from '~/store/store';
import { StrictMode } from 'react';
import MyDrawer from './../components/MyDrawer/MyDrawer';
import { View } from 'react-native';
import { supabaseClient } from '~/utils/supabase';

//Tanstack Query Init
const tanstackQueryClient = new QueryClient();

export default function RootLayout() {
  const trackAuth = useIsAuth((state) => state.startAuthTrack); // Track User Authentication
  trackAuth();

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
