import { Stack } from 'expo-router';
import { memo } from 'react';

const DrawerLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="(Pages)/account" options={{ headerShown: false }} />
        <Stack.Screen
          name="(Pages)/(Admin)/admin-edit-course"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="(Pages)/(Admin)/admin-select-course" options={{ headerShown: false }} />
        <Stack.Screen name="(Pages)/books" options={{ headerShown: false }} />
        <Stack.Screen name="(Pages)/courses" options={{ headerShown: false }} />
        <Stack.Screen name="(Pages)/course" options={{ headerShown: false }} />
        <Stack.Screen name="(Pages)/test" options={{ headerShown: false }} /> */}
      </Stack>
    </>
  );
};

export default memo(DrawerLayout);
