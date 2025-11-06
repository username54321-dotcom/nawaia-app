import { Drawer } from 'expo-router/drawer';
import { memo, useEffect, useState } from 'react';
import { useIsAuth } from '~/store/store';
import { supabaseClient } from '~/utils/supabase';

const DrawerLayout = () => {
  const { isAuth } = useIsAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    (async () => {
      const admin =
        (await supabaseClient.auth.getUser()).data.user?.id ===
        '50e44d88-7255-41a4-888f-54906447f692';
      setIsAdmin(admin);
    })();
  }, [isAuth]);
  return (
    <>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerType: 'back',
          drawerPosition: 'right',

          drawerStyle: { width: '50%' },
        }}>
        <Drawer.Screen name="index" options={{ drawerLabel: 'الرئيسة' }}></Drawer.Screen>
        <Drawer.Screen name="(Pages)/Courses" options={{ drawerLabel: 'دورات' }}></Drawer.Screen>
        <Drawer.Screen
          name="(Pages)/Books"
          options={{
            drawerLabel: 'كتب',
          }}></Drawer.Screen>

        <Drawer.Screen
          name="(Pages)/Course"
          options={{ drawerItemStyle: { display: 'none' } }}></Drawer.Screen>
        <Drawer.Screen
          name="(Pages)/Account"
          options={{
            drawerItemStyle: { display: !isAuth ? 'flex' : 'none' },
            drawerLabel: 'انشيء حسابك',
          }}></Drawer.Screen>
        <Drawer.Screen
          name="(Pages)/Admin_EditCourse"
          options={{ drawerItemStyle: { display: 'none' } }}></Drawer.Screen>
        <Drawer.Screen
          name="(Pages)/Admin_SelectCourse"
          options={{
            drawerLabel: 'أضافة او تعديل المحتوي',
            drawerItemStyle: {
              display: isAdmin ? 'flex' : 'none',
            },
          }}></Drawer.Screen>
      </Drawer>
    </>
  );
};

export default memo(DrawerLayout);
