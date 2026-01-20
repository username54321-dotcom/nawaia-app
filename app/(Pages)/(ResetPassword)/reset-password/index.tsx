import { View, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import Background from '~/components/Background';
import { supabaseClient } from '~/utils/supabase';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FadeIn from '~/components/Animations/FadeIn';
import MyImage from '~/components/Reusebales/MyImage';
import { imgLogo } from '~/assets/images/ImageExports';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import MyController from '~/app/(Pages)/account/_components/SignedOut/MyController';
import { Check } from 'lucide-react-native';
import Head from 'expo-router/head';
import { useTranslation } from 'react-i18next';
// *Schema
const schema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'كلمة المرور يجب أن تتكون من 8 أحرف على الأقل.' })
      .regex(/[a-z]/, { message: 'كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل.' })
      .regex(/[A-Z]/, { message: 'كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل.' })
      .regex(/[0-9]/, { message: 'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل (مثل !@#$).',
      })
      .regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, {
        message: 'الرجاء استخدام الحروف الإنجليزية والأرقام والرموز فقط لكلمة المرور.',
      }),
    confirmPassword: z.string(),
    // termsAccepted: z
    //   .boolean()
    //   .refine((val) => val === true, { message: 'يجب عليك الموافقة على الشروط والأحكام.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين.',
    path: ['confirmPassword'],
  });

//* Types
type FormTypes = z.infer<typeof schema>;

const ResetPassword = () => {
  const { t } = useTranslation();
  const params = useLocalSearchParams()['#'];
  const router = useRouter();
  const [userName, setUserName] = useState<null | string>(null);
  const [userEmail, setUserEmail] = useState<undefined | string>(undefined);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const updatePassword = async (data: FormTypes) => {
    const response = await supabaseClient.auth.updateUser({ password: data.password });
    response.data && setPasswordUpdated(true);
  };

  // useForm Initialization
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormTypes>({ resolver: zodResolver(schema), mode: 'onChange' });
  // Get Access token and sign in to supabase
  useEffect(() => {
    async function effect() {
      //Get Session Tokens From URL
      if (params) {
        const hash = new URLSearchParams(params.toString());
        const access_token = hash.get('access_token');
        const refresh_token = hash.get('refresh_token');
        // Login If Session is retrieved
        if (access_token && refresh_token) {
          const { data: isLoggedIn } = await supabaseClient.auth.setSession({
            access_token: access_token,
            refresh_token: refresh_token,
          });
          // Get UserName And Email
          if (isLoggedIn) {
            const userName = (await supabaseClient.auth.getUser()).data.user?.user_metadata
              .display_name;
            const userEmail = (await supabaseClient.auth.getUser()).data.user?.email;
            setUserName(userName);
            setUserEmail(userEmail);
          }
        }
      } else {
        router.push('/');
      }
    }
    effect();
  }, [params, router]);
  return (
    <Background>
      <Head>
        <title>{t('reset_password_title')}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <FadeIn>
        {/** Parent Container */}
        <View className="mx-auto mt-8 w-4/5 max-w-[400px] self-center rounded-md border-[1px] border-gray-500 bg-neutral-200 p-8 pb-8">
          {/**Logo */}
          <MyImage className="size-18 mb-6 self-center" source={imgLogo}></MyImage>
          {/**Separator */}
          <View className=" mb-4 w-4/5 self-center border-t-[1px] border-gray-500"></View>
          {/** User Is Filling form */}
          {!passwordUpdated && (
            <>
              {/** Welcome Message */}
              {userName && (
                <>
                  <View className="self-center">
                    <Text className="mb-4 mt-2 font-Kufi text-xl font-semibold text-neutral-800">{`أهلا ${userName}`}</Text>
                  </View>
                </>
              )}
              <MyController
                control={control}
                error={errors.password}
                name="password"
                title="أكتب كلمة السر الجديدة"
                placeholder=""
                secure={true}></MyController>
              <MyController
                control={control}
                error={errors.confirmPassword}
                name="confirmPassword"
                title="أعد كتابة كلمة السر"
                placeholder=""
                secure={true}></MyController>
              <Pressable
                onPress={handleSubmit(updatePassword)}
                className="mt-6 size-fit self-center rounded-md border-[1px] bg-red-700  px-4 py-1">
                <Text className="font-Kufi   text-gray-50">تغيير كلمة السر</Text>
              </Pressable>
            </>
          )}
          {/** Password Updated */}
          {passwordUpdated && (
            <>
              {/**Parent View */}
              <View className="items-center justify-center">
                {/** Succes Icon */}
                <FadeIn>
                  <View className=" mx-auto size-fit rounded-full bg-emerald-500 p-1">
                    <Check size={45} color={'white'} />
                  </View>
                  <Text className="mb-8 mt-4 self-center text-center font-Kufi text-base font-bold text-neutral-800">
                    تم تعيين كلمة المرور بنجاح !
                  </Text>
                </FadeIn>
              </View>
            </>
          )}
        </View>
      </FadeIn>
    </Background>
  );
};

export default ResetPassword;
