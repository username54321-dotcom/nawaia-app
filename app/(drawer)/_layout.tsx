import { Drawer } from 'expo-router/drawer';
import { useWindowDimensions } from 'react-native';

import { useWidth } from './../../utils/Hooks';

const DrawerLayout = () => {
  return (
    <>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          drawerPosition: 'right',
          drawerStyle: { width: useWidth(33) },
        }}>
        <Drawer.Screen name="index" options={{ drawerLabel: 'الرئيسة' }}></Drawer.Screen>
        <Drawer.Screen
          name="(tabs)"
          options={{ drawerItemStyle: { display: 'none' } }}></Drawer.Screen>
      </Drawer>
    </>
  );
};

export default DrawerLayout;
