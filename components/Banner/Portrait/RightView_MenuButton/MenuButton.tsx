import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Menu } from 'lucide-react-native';
import { Pressable } from 'react-native';

const MenuButton = () => {
  const nav = useNavigation();
  return (
    <Pressable
      className={`rounded-md] m-4 h-fit w-fit p-1  `}
      onPress={() => {
        nav.dispatch(DrawerActions.toggleDrawer());
        console.log('aaaa');
      }}>
      <Menu size={30} color="#BE1E2D" strokeWidth={3} />
    </Pressable>
  );
};

export default MenuButton;
