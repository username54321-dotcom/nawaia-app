import { View, Text, Pressable, Modal, TextInput } from 'react-native';
import React, { memo, useEffect, useRef, useState } from 'react';
import { MotiView, useAnimationState } from 'moti';

import { Eye, Lock, Mail, X } from 'lucide-react-native';
import { useModalVisible, useModalVisibleType } from '~/store/store';

import { useRouter } from 'expo-router';
import { supabaseClient } from '~/utils/supabase';
import FadeIn from './../../../Animations/FadeIn';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

const MyModal = () => {
  const setModalVisible = useModalVisible((state: useModalVisibleType) => state.setModalVisible);
  const ModalVisible = useModalVisible((state: useModalVisibleType) => state.ModalVisible);
  const QueryClient = useQueryClient();
  const router = useRouter();
  //States
  const [ShowPasswordIcon, setShowPasswordIcon] = useState(false);
  const [ShowPassword, setShowPassword] = useState(false);
  const [LoginError, setLoginError] = useState(false);
  const [SignInSuccess, setSignInSuccess] = useState(false);
  // Input Refs
  const EmailInput = useRef(null);
  const PasswordInput = useRef(null);
  //Clear and Cancel
  const HandleCancelButton = () => {
    setLoginError(false);
    setModalVisible(false);
    setShowPassword(false);
    setShowPasswordIcon(false);
    setSignInSuccess(false);
  };
  //Try to Sign In
  const HandleSignIn = async () => {
    const email = EmailInput.current?.value;
    const password = PasswordInput?.current?.value;
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });
    error && setLoginError(true);
    // If Sign in Success
    if (data.user) {
      QueryClient.invalidateQueries();
      setSignInSuccess(true);
      setTimeout(() => {
        data.user && HandleCancelButton();
      }, 1000);
    }
  };
  // Show Password
  const HandleShowPassword = (v: string) => {
    if (v.length > 0) {
      setShowPasswordIcon(true);
      setShowPasswordIcon(false);
    }
  };
  // Animations (required for modals * always visible !!)
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
          <View className="flex-col items-center justify-center rounded-xl border-4 border-slate-600 bg-slate-300 px-10 pt-10   ">
            {/* Cancel Button */}
            <Pressable
              onPress={HandleCancelButton}
              className="absolute right-1 top-1 flex size-fit items-center justify-center rounded-xl p-1 ">
              <X color={'#334155'} strokeWidth={2} />
            </Pressable>

            {/**Please Login Message */}
            <Text className="mb-6 font-Kufi font-bold">برجاء تسجيل الدخول لمشاهدة المحتوي !</Text>
            {/**Email Input */}
            <View className="  flex-row items-center justify-center rounded-md border-[1px]  bg-slate-100/40">
              <Mail className="mx-1" color={'#475569'} />
              <TextInput
                ref={EmailInput}
                placeholder="البريد الالكتروني"
                className=" rounded-r-md border-l-[1px] bg-slate-100 p-2 outline-none placeholder:text-right  placeholder:text-gray-500  "></TextInput>
            </View>
            {/**Password Input */}
            <View className=" mt-2 flex-row items-center justify-center rounded-md border-[1px]  bg-slate-100/40 ">
              <Lock className={`mx-1  `} color={'#475569'} />
              <View>
                <TextInput
                  ref={PasswordInput}
                  secureTextEntry={!ShowPassword}
                  onChangeText={HandleShowPassword}
                  onSubmitEditing={HandleSignIn}
                  placeholder="كلمة المرور"
                  className=" rounded-r-md border-l-[1px] bg-slate-100 p-2 outline-none placeholder:text-right  placeholder:text-gray-500  "></TextInput>
                <Pressable
                  onPress={() => setShowPassword(!ShowPassword)}
                  className={`absolute right-2 h-full justify-center ${ShowPasswordIcon ? '' : ' hidden'} `}>
                  <Eye size={18} color={'#475569'} />
                </Pressable>
              </View>
            </View>
            {/** Login Error */}
            <Text className={`mt-2 text-red-800 ${LoginError ? '' : 'hidden'}`}>
              الرجاء التحقق من بياناتك !
            </Text>
            {/**SignIn Button */}
            <Pressable
              onPress={HandleSignIn}
              className="mt-4 rounded-md border-[1px] bg-red-700  px-4 py-1">
              <Text className="font-Kufi text-sm leading-6 text-slate-100 ">تسجيل الدخول</Text>
            </Pressable>
            {/**SignIn Succesfull */}
            {SignInSuccess && (
              <FadeIn>
                <Text className="mt-2 font-Kufi">تم تسجبل الدخول بنجاح !</Text>
              </FadeIn>
            )}
            {/**Separator */}
            <View className="mt-4 w-full border-[1px] border-slate-700 opacity-75"></View>
            {/**Create Your Account */}
            <View className="mt-2 items-center justify-center">
              <Text className="font-Kufi text-xs">غير مشترك ؟ </Text>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  router.push('/(drawer)/(Pages)/Account');
                }}>
                <Text className="textbase mb-2 font-Kufi font-semibold text-blue-700 underline underline-offset-8 ">
                  أنشيء حسابك الآن
                </Text>
              </Pressable>
            </View>
          </View>
        </MotiView>
      </View>
    </Modal>
  );
};

export default memo(MyModal);
