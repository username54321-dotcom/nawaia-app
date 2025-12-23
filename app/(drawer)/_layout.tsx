import { Stack } from 'expo-router';
import { memo } from 'react';
import { GetIsApproved } from '~/HelperFunctions/Queries/getIsApproved';
import { useIsAuth, useIsAuthType } from '~/store/store';

const DrawerLayout = () => {
  const isAuth = useIsAuth((state: useIsAuthType) => state.isAuth);

  GetIsApproved(isAuth);

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
