import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Menu } from 'lucide-react-native';
import { memo } from 'react';
import { Pressable } from 'react-native';

const MenuButton = () => {
  const nav = useNavigation();
  return (
    <Pressable
      onPress={() => {
        nav.dispatch(DrawerActions.toggleDrawer());
      }}
      className={`m-4 size-fit rounded-md`}>
      <Menu size={28} color="#BE1E2D" strokeWidth={2} />
    </Pressable>
  );
};

export default memo(MenuButton);
