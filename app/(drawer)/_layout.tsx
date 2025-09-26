import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => {
  return (
    <>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          drawerPosition: 'right',
          drawerStyle: {},
        }}>
        <Drawer.Screen name="index" options={{ drawerLabel: 'الرئيسة' }}></Drawer.Screen>
      </Drawer>
    </>
  );
};

export default DrawerLayout;
