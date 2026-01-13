import { View, Text, Modal, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { useModalVisible, useModalVisibleType } from '~/store/store';
import { MotiView, useAnimationState } from 'moti';
import { X } from 'lucide-react-native';
import ContactWhatsApp from './ContactWhatsApp';

const NotPurchasedModal = () => {
  const modalVisible = useModalVisible((x: useModalVisibleType) => x.notPurchasedModal);
  const setModalVisible = useModalVisible((x: useModalVisibleType) => x.setNotPurchasedModal);

  // Animations (required for modals * always visible !!)
  const animation = useAnimationState({
    from: { opacity: 0, scale: 1 },
    to: { opacity: 1, scale: 1 },
  });
  useEffect(() => (modalVisible ? animation.transitionTo('to') : animation.transitionTo('from')));

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="fade"
      className="size-48 items-center justify-center bg-transparent">
      <Pressable
        role="button"
        accessibilityLabel="Close Modal"
        className="flex-1 items-center justify-center  bg-slate-900/30"
        onPress={() => setModalVisible(!modalVisible)}>
        <MotiView transition={{ type: 'spring', damping: 75 }} state={animation}>
          {/*Main Container */}
          <View className="border-6  max-w-[80vw] flex-col items-center justify-center rounded-xl border-4 border-slate-600 bg-slate-300 px-10 pt-10   ">
            {/* Cancel Button */}
            <Pressable
              role="button"
              accessibilityLabel="Close"
              onPress={() => setModalVisible(false)}
              className="absolute right-1 top-1 flex size-fit items-center justify-center rounded-xl p-1 ">
              <X color={'#334155'} strokeWidth={2} />
            </Pressable>

            {/** Not Purchased Message */}
            <Text className="defaultText mb-5 text-center text-xl font-extrabold ">
              عذراً، هذا الكورس غير متاح لك حالياً
            </Text>
            {/** Contact Us Prompt */}
            <Text className="defaultText mb-5 text-center  text-sm font-bold ">
              للاشتراك في هذا الكورس والحصول على صلاحية الدخول، يرجى التواصل مع فريق العمل عبر
              واتساب.
            </Text>
            {/** Whatsapp Animation */}
            <ContactWhatsApp message="تواصل معنا"></ContactWhatsApp>
          </View>
        </MotiView>
      </Pressable>
    </Modal>
  );
};

export default NotPurchasedModal;
