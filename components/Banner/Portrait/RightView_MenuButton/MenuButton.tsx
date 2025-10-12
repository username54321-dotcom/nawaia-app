import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Menu } from 'lucide-react-native';
import { Pressable } from 'react-native';

const MenuButton = () => {
  const nav = useNavigation();
  return (
    <Pressable
      className={`m-4 h-fit w-fit rounded-md border-[0.5px] bg-[#BE1E2D] p-1  shadow-sm shadow-slate-400`}
      onPress={() => {
        nav.dispatch(DrawerActions.toggleDrawer());
        console.log('aaaa');
      }}>
      <Menu size={24} color="white" strokeWidth={1.5} />
    </Pressable>
  );
};

export default MenuButton;
