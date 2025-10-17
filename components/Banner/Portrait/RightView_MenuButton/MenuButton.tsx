import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Menu } from 'lucide-react-native';
import { Pressable } from 'react-native';

const MenuButton = () => {
  const nav = useNavigation();
  return (
    <Pressable
      className={`m-4  size-fit  rounded-md p-2 hover:bg-neutral-300 `}
      onPress={() => {
        nav.dispatch(DrawerActions.toggleDrawer());
        console.log('aaaa');
      }}>
      <Menu size={28} color="#BE1E2D" strokeWidth={2} />
    </Pressable>
  );
};

export default MenuButton;
