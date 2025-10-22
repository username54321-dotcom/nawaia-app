import { View, Text, Pressable, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import { MotiView, useAnimationState } from 'moti';
import { useIsFocused } from '@react-navigation/native';
import { VisibilitySensor } from '@futurejj/react-native-visibility-sensor';

const MyModal = () => {
  const [ModalVisible, setModalVisible] = useState(false);
  const animation = useAnimationState({
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: [1.1, 1, 0.9, 1] },
  });
  useEffect(() => (ModalVisible ? animation.transitionTo('to') : animation.transitionTo('from')));

  return (
    <Pressable onPress={() => setModalVisible(true)} className="size-24 bg-red-500">
      <Modal
        transparent={true}
        visible={ModalVisible}
        animationType="fade"
        className="size-48 items-center justify-center bg-transparent">
        <View className="flex-1 items-center justify-center bg-slate-900/30">
          <MotiView transition={{ type: 'spring', damping: 75 }} state={animation}>
            <View className="">
              <Pressable
                onPress={() => setModalVisible(false)}
                className="flex size-fit items-center justify-center rounded-xl bg-red-500">
                <Text className="font px-4 py-2 font-Playwrite font-semibold text-white">
                  Cancel Modal
                </Text>
              </Pressable>
            </View>
          </MotiView>
        </View>
      </Modal>
    </Pressable>
  );
};

export default MyModal;
