import 'react-native-url-polyfill/auto';
import '../global.css';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import MyModal from '~/components/Pages/[id]/MyModal/MyModal';
import { useIsAuth, useIsAuthType, useModalVisible, useModalVisibleType } from '~/store/store';
import { useEffect } from 'react';

import { supabaseClient } from '~/utils/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApprovedModal from './../components/ApprovedModal';

//Tanstack Query Init
const tanstackQueryClient = new QueryClient();

export default function RootLayout() {
  // Track Auth Changes
  const setIsAdmin = useIsAuth((state: useIsAuthType) => state.setIsAdmin);
  const setIsAuth = useIsAuth((state: useIsAuthType) => state.setIsAuth);
  const setIsApproved = useIsAuth((x: useIsAuthType) => x.setIsApproved);

  // Track Auth Changes
  useEffect(() => {
    const apply = async () => {
      // Listen for Auth Changes
      supabaseClient.auth.onAuthStateChange(async (_, session) => {
        // Signed Out
        if (!session) {
          setIsAuth(false);
          setIsAdmin(false);
          setIsApproved(false);
          return;
        }
        // Signed In
        if (!!session) {
          const isAdmin = session.user.app_metadata.isAdmin ?? false;
          const isApproved = session.user.app_metadata.isApproved ?? false;
          setIsAuth(true);
          setIsAdmin(isAdmin);
          setIsApproved(isApproved);
        }
      });
    };
    apply();
  }, [setIsAuth, setIsAdmin, setIsApproved]);

  // Loading Fonts
  const [Fontloaded] = useFonts({
    Kufi: require('~/assets/fonts/NotoKufiArabic-VariableFont_wght.ttf'),
    'Playwrite DE Grund Thin': require('~/assets/fonts/PlaywriteDEGrund-VariableFont_wght.ttf'),
  });

  const registerModal = useModalVisible((x: useModalVisibleType) => x.ModalVisible);
  const approvedModal = useModalVisible((x: useModalVisibleType) => x.approvedModal);

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
        {registerModal && <MyModal></MyModal>}
        {true && <ApprovedModal></ApprovedModal>}
      </QueryClientProvider>
    </GestureHandlerRootView>
    // </StrictMode>
  );
}
