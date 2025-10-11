import { Drawer } from 'expo-router/drawer';
import { useWidth } from './../../utils/Hooks';
import { Home, Info } from 'lucide-react-native';

const DrawerLayout = () => {
  return (
    <>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          drawerPosition: 'right',
          drawerStyle: { width: useWidth(50) },
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
      </Drawer>
    </>
  );
};

export default DrawerLayout;
