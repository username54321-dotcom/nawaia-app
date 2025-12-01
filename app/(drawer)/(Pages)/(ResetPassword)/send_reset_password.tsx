import Background from '~/components/Background';
import { TextInput, Pressable, Text, View } from 'react-native';
import { useCallback, useRef, useState } from 'react';
import { supabaseClient } from '~/utils/supabase';
import MyImage from '~/components/Reusebales/MyImage';
import { imgLogo } from '~/assets/images/ImageExports';
import FadeIn from '~/components/Animations/FadeIn';
import { Check } from 'lucide-react-native';

const SendResetPassword = () => {
  const emailInput = useRef<string>('');
  const [invalidEmail, setinvalidEmail] = useState<null | boolean>(null);
  const [emailSent, setEmailSent] = useState(false);

  // Set User Inputted Email
  const setInputEmail = useCallback((value: string) => {
    emailInput.current = value;
  }, []);

  //Check if Email is Valid
  const verifyEmail = useCallback(async () => {
    // Reset Error State
    setinvalidEmail(false);
    // Not Email Provided
    emailInput.current.length === 0 && setinvalidEmail(true);
    // Check if User Inputted an Email
    if (emailInput.current?.length > 0) {
      // Invoke RPC Function
      const { data: respIsValid } = await supabaseClient.rpc('email_exists', {
        email_check: emailInput.current.toLocaleLowerCase(),
      });
      setinvalidEmail(!respIsValid);
      // If The Email is Valid
      if (respIsValid) {
        const { data: emailSent } = await supabaseClient.auth.resetPasswordForEmail(
          emailInput.current,
          { redirectTo: 'https://nawaia.net/reset_password' }
        );
        emailSent && setEmailSent(true);
      }
    }
  }, []);

  return (
    <Background>
      <FadeIn>
        {/** Parent View */}
        <View className="  flex-row  justify-center ">
          {/** Card Componenet */}
          <View className=" mx-auto mt-8 w-4/5 max-w-[400px] self-center rounded-md border-[1px] border-gray-500 bg-neutral-200 p-8">
            <MyImage className="size-18 mb-4 self-center" source={imgLogo}></MyImage>
            {/** Title */}
            <Text className="mb-4 self-center font-Kufi font-bold text-neutral-800">
              أعادة تعيين كلمة المرور
            </Text>
            {/**Separator */}
            <View className=" mb-4 w-4/5 self-center border-t-[1px] border-gray-500"></View>

            {/** If The Email is not Yet Sent */}
            {!emailSent && (
              // Parent View
              <View className=" p-2">
                {/** Text Input Label */}
                <Text className="mb-2 mt-2 self-end  font-Kufi text-xs font-bold text-gray-900">
                  البريد الألكتروني
                </Text>
                {/** Text Input */}
                <TextInput
                  onChangeText={(v) => setInputEmail(v)}
                  className={`size-fit w-full rounded-md border-[1px] border-gray-500 bg-slate-100 p-2  outline-none placeholder:text-right placeholder:text-gray-500 ${invalidEmail && 'border-red-500'}`}></TextInput>
                {!invalidEmail === false && (
                  <>
                    <Text className="w-full text-right font-Kufi text-xs text-red-600">
                      هذا البريد الألكتروني غير مربوط بحساب
                    </Text>
                  </>
                )}
                <Pressable
                  onPress={verifyEmail}
                  className="mt-4 size-fit self-center rounded-md border-[1px] bg-red-700  px-4 py-1">
                  <Text className="font-Kufi   text-gray-50">متابعة</Text>
                </Pressable>
              </View>
            )}
            {/** If The Email Was Successfully Sent */}
            {emailSent && (
              // Parent View
              <View className="items-center justify-center">
                {/** Succes Icon */}
                <FadeIn>
                  <View className=" mx-auto size-fit rounded-full bg-emerald-500 p-1">
                    <Check size={45} color={'white'} />
                  </View>
                  <Text className="mb-8 mt-4 self-center text-center font-Kufi text-base font-bold text-neutral-800">
                    تفقد بريدك الإلكتروني!
                  </Text>
                </FadeIn>

                <FadeIn delay={500}>
                  {/**Separator */}
                  <View className=" mb-4 w-4/5 self-center border-t-[1px] border-gray-500"></View>
                  <Text className="font-semi mt-4 text-center font-Kufi text-xs">
                    لقد أرسلنا لك رابطاً لتغيير كلمة المرور. إذا لم تجد الرسالة، يرجى التحقق من مجلد
                    الرسائل غير المرغوب فيها (Spam).
                  </Text>
                </FadeIn>
              </View>
            )}
          </View>
        </View>
      </FadeIn>
    </Background>
  );
};

export default SendResetPassword;
