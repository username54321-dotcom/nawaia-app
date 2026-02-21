import 'react-native-url-polyfill/auto';
import '../global.css';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import MyModal from '~/components/MyModal/MyModal';
import { useIsAuth, useIsAuthType, useModalVisible, useModalVisibleType } from '~/store/store';
import { useEffect } from 'react';
import { PortalHost } from '@rn-primitives/portal';

import { supabaseClient } from '~/utils/supabase';
import ApprovedModal from '~/components/ApprovedModal';
import NotPurchasedModal from '~/components/NotPurchasedModal';

//Tanstack Query Init
const tanstackQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * (60 * 1000),
      gcTime: 10 * (60 * 1000),
      retry: 3,
      retryDelay: (attemptNumber) => attemptNumber * 500,
      refetchOnWindowFocus: false,
      refetchOnMount: 'always',
    },
    mutations: {
      retry: 3,
      retryDelay: (attemptNumber) => attemptNumber * 500,
    },
  },
});

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
  const notPurchasedModal = useModalVisible((x: useModalVisibleType) => x.notPurchasedModal);

  if (!Fontloaded) {
    return null;
  }
  return (
    // <StrictMode>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={tanstackQueryClient}>
        <Head>
          {/* Language */}
          <html lang="ar" />

          {/* Essential Meta */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#BE1E2D" />
          <meta name="author" content="نوايا" />

          {/* Favicon */}
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" />

          {/* Open Graph Global */}
          <meta property="og:locale" content="ar_SA" />
          <meta property="og:locale:alternate" content="en_US" />
          <meta property="og:site_name" content="نوايا | Nawaia" />
          <meta property="og:image:width" content="512" />
          <meta property="og:image:height" content="512" />
          <meta property="og:image:alt" content="شعار نوايا - Nawaia Logo" />

          {/* Organization Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'نوايا',
              alternateName: 'Nawaia',
              url: 'https://nawaia.net',
              logo: 'https://nawaia.net/favicon.png',
              description:
                'منصة تعليمية متكاملة تقدم دورات أونلاين، مكتبة كتب متنوعة، واستشارات متخصصة',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: ['Arabic', 'English'],
              },
            })}
          </script>

          {/* WebSite Schema for Sitelinks Searchbox */}
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'نوايا | Nawaia',
              alternateName: 'Nawaia Educational Platform',
              url: 'https://nawaia.net',
              inLanguage: ['ar', 'en'],
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://nawaia.net/courses?search={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            })}
          </script>
        </Head>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
        <PortalHost />
        {registerModal && <MyModal></MyModal>}
        {approvedModal && <ApprovedModal></ApprovedModal>}
        {notPurchasedModal && <NotPurchasedModal></NotPurchasedModal>}
      </QueryClientProvider>
    </GestureHandlerRootView>
    // </StrictMode>
  );
}
