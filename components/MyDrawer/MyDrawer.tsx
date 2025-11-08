import { useEffect } from 'react';
import { useAnimationState, MotiView } from 'moti';
import { Modal, Pressable, Text, View } from 'react-native';
import { style } from 'twrnc';
import { useRoute } from '@react-navigation/native';
import DrawerItem from './DrawerItem';
interface propTypes {
  drawerVisible: boolean;
  setDrawerVisible: (value: boolean) => void;
}

const MyDrawer = ({ drawerVisible, setDrawerVisible }: propTypes) => {
  const animation = useAnimationState({
    hide: { scaleX: 0 },
    show: { scaleX: 1 },
  });
  useEffect(() => {
    drawerVisible && animation.transitionTo('show');
    !drawerVisible && animation.transitionTo('hide');
  }, [drawerVisible, animation]);
  return (
    <Modal visible={drawerVisible} transparent={true} animationType="fade">
      <Pressable
        onPress={() => setDrawerVisible((e: boolean) => !e)}
        className="flex-1 bg-black/20 ">
        <Pressable className="h-full w-2/3 self-end">
          <MotiView
            transition={{ type: 'timing', duration: 200 }}
            style={[style('flex-1'), { transformOrigin: 'right' }]}
            state={animation}>
            <View className="flex-1 flex-col items-center  rounded-l-xl bg-neutral-300 px-6 py-6">
              <DrawerItem
                setDrawerVisible={setDrawerVisible}
                label="الرئيسية"
                targetPage="/"></DrawerItem>
              <DrawerItem
                setDrawerVisible={setDrawerVisible}
                label="دورات"
                targetPage="/Courses"></DrawerItem>
              <DrawerItem
                setDrawerVisible={setDrawerVisible}
                label="كتب"
                targetPage="/Books"></DrawerItem>
            </View>
          </MotiView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default MyDrawer;
