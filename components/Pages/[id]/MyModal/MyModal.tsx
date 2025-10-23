import { View, Text, Pressable, Modal, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { MotiView, useAnimationState } from 'moti';

import { Eye, Lock, Mail, X } from 'lucide-react-native';
import { useIsAuth, useModalVisible } from '~/store/store';

const MyModal = ({ show }: { show: any }) => {
  const { ModalVisible, setModalVisible } = useModalVisible();
  const { isAuth, setIsAuth } = useIsAuth();
  const [ShowPasswordIcon, setShowPasswordIcon] = useState(false);
  const [ShowPassword, setShowPassword] = useState(false);

  const HandleShowPassword = (v) =>
    v.length > 0 ? setShowPasswordIcon(true) : setShowPasswordIcon(false);

  const animation = useAnimationState({
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 },
  });
  useEffect(() => (ModalVisible ? animation.transitionTo('to') : animation.transitionTo('from')));

  return (
    <Modal
      transparent={true}
      visible={ModalVisible}
      animationType="fade"
      className="size-48 items-center justify-center bg-transparent">
      <View className="flex-1 items-center justify-center bg-slate-900/30">
        <MotiView transition={{ type: 'spring', damping: 75 }} state={animation}>
          {/*Main Container */}
          <View className="flex-col items-center justify-center rounded-xl border-4 border-slate-600 bg-slate-300 px-10 py-10  ">
            {/* Cancel Button */}
            <Pressable
              onPress={() => setModalVisible(false)}
              className="absolute right-1 top-1 flex size-fit items-center justify-center rounded-xl p-1 ">
              <X color={'#334155'} strokeWidth={2} />
            </Pressable>
            {/**Please Login Message */}
            <Text className="font mb-4 font-Kufi font-semibold">
              برجاء تسجيل الدخول لمشاهدة المحتوي !
            </Text>
            {/**Email Input */}
            <View className="  flex-row items-center justify-center rounded-md border-[1px]  bg-slate-100/40">
              <Mail className="mx-1" color={'#475569'} />
              <TextInput
                placeholder="البريد الالكتروني"
                className=" rounded-r-md border-l-[1px] bg-slate-100 p-2 outline-none placeholder:text-right  placeholder:text-gray-500  "></TextInput>
            </View>
            {/**Password Input */}
            <View className=" mt-2 flex-row items-center justify-center rounded-md border-[1px]  bg-slate-100/40 ">
              <Lock className={`mx-1  `} color={'#475569'} />
              <View>
                <TextInput
                  secureTextEntry={ShowPassword ? true : false}
                  onChangeText={HandleShowPassword}
                  placeholder="كلمة المرور"
                  className=" rounded-r-md border-l-[1px] bg-slate-100 p-2 outline-none placeholder:text-right  placeholder:text-gray-500  "></TextInput>
                <Pressable
                  onPress={() => setShowPassword(!ShowPassword)}
                  className={`absolute right-2 h-full justify-center ${ShowPasswordIcon ? '' : ' hidden'} `}>
                  <Eye size={18} color={'#475569'} />
                </Pressable>
              </View>
            </View>
          </View>
        </MotiView>
      </View>
    </Modal>
  );
};

export default MyModal;
