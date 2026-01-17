import { View, Text, Modal, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { useModalVisible, useModalVisibleType } from '~/store/store';
import { MotiView, useAnimationState } from 'moti';
import { X } from 'lucide-react-native';

import { useTranslation } from 'react-i18next';

const ApprovedModal = () => {
  const { t } = useTranslation();
  const modalVisible = useModalVisible((x: useModalVisibleType) => x.approvedModal);
  const setModalVisible = useModalVisible((x: useModalVisibleType) => x.setApprovedModal);

  // Animations (required for modals * always visible !!)
  const animation = useAnimationState({
    from: { opacity: 0, scale: 0 },
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

            {/** Not Approved Message */}
            <Text className="mb-5 font-Kufi text-xl font-extrabold text-neutral-800">
              {t('account_not_approved')}
            </Text>
            <Text className="mb-5 font-Kufi text-sm font-bold text-neutral-800">
              {t('try_again_later')}
            </Text>
          </View>
        </MotiView>
      </Pressable>
    </Modal>
  );
};

export default ApprovedModal;
