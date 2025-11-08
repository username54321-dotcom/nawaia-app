import { Menu } from 'lucide-react-native';
import { memo, useState } from 'react';
import { Pressable } from 'react-native';
import MyDrawer from './../../../MyDrawer/MyDrawer';

const MenuButton = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <Pressable onPress={() => setDrawerVisible((v) => !v)} className={`m-4 size-fit rounded-md`}>
      <Menu size={28} color="#BE1E2D" strokeWidth={2} />
      <MyDrawer drawerVisible={drawerVisible} setDrawerVisible={setDrawerVisible}></MyDrawer>
    </Pressable>
  );
};

export default memo(MenuButton);
