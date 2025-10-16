import '../global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { useFonts, AtomicAge_400Regular } from '@expo-google-fonts/atomic-age';

const tanstackQueryClient = new QueryClient();

export default function RootLayout() {
  const [Fontloaded] = useFonts({
    AtomicAge: AtomicAge_400Regular,
    Kufi: require('~/assets/fonts/NotoKufiArabic-VariableFont_wght.ttf'),
    PlayWrite: require('~/assets/fonts/PlaywriteDEGrund-VariableFont_wght.ttf'),
    PlaywriteHandWritten: require('~/assets/fonts/PlaywriteGBS-VariableFont_wght.ttf'),
  });

  if (!Fontloaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={tanstackQueryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
