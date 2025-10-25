import { Drawer } from 'expo-router/drawer';
import { useIsAuth } from '~/store/store';

const DrawerLayout = () => {
  const { isAuth } = useIsAuth();
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
          name="(Pages)/HealthJourney"
          options={{ drawerLabel: 'رحلات الصحة' }}></Drawer.Screen>
        <Drawer.Screen
          name="(Pages)/About"
          options={{ drawerLabel: 'عن الأكاديمية' }}></Drawer.Screen>
        <Drawer.Screen
          name="(Pages)/(CoursePage)/[id]"
          options={{ drawerItemStyle: { display: 'none' } }}></Drawer.Screen>
        <Drawer.Screen
          name="(Pages)/SignUp"
          options={{
            drawerItemStyle: { display: !isAuth ? 'flex' : 'none' },
            drawerLabel: 'انشيء حسابك',
          }}></Drawer.Screen>
      </Drawer>
    </>
  );
};

export default DrawerLayout;
