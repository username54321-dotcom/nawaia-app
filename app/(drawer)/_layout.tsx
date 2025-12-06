import { Stack } from 'expo-router';
import { memo } from 'react';

const DrawerLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="(Pages)/Account" options={{ headerShown: false }} />
        <Stack.Screen
          name="(Pages)/(Admin)/Admin_EditCourse.tsx"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="(Pages)/(Admin)/Admin_SelectCourse" options={{ headerShown: false }} />
        <Stack.Screen name="(Pages)/Books" options={{ headerShown: false }} />
        <Stack.Screen name="(Pages)/Courses" options={{ headerShown: false }} />
        <Stack.Screen name="(Pages)/Course" options={{ headerShown: false }} />
        <Stack.Screen name="(Pages)/Test" options={{ headerShown: false }} /> */}
      </Stack>
    </>
  );
};

export default memo(DrawerLayout);
