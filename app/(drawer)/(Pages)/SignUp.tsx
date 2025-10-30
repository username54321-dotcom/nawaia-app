import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TvIcon } from 'lucide-react-native';
import Background from '~/components/Background';
import MyController from '../../../components/Pages/SignUp/MyController';
import { Pressable, Text, View } from 'react-native';
import MyImage1 from './../../../components/MyImage';
import { imgLogo } from '~/assets/images/ImageExports';
import { supabaseClient } from '~/utils/supabase';
import { useRouter } from 'expo-router';
import { useModalVisible } from '~/store/store';

// *Schema
const schema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'اسم المستخدم يجب أن يتكون من 3 أحرف على الأقل.' })
      .max(30, { message: 'اسم المستخدم يجب ألا يزيد عن 30 حرفًا.' })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'اسم المستخدم يجب أن يتكون من أحرف وأرقام أنجليزية',
      }),
    email: z.string().email({ message: 'الرجاء إدخال عنوان بريد إلكتروني صالح.' }),
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

// ***Functions
const SignUp = () => {
  const { setModalVisible } = useModalVisible();
  const router = useRouter();
  const [SignUpError, setSignUpError] = useState<string | null>(null);
  const HandleOnSubmit = async (data: FormTypes) => {
    const { data: SignUpData, error: SignUpError } = await supabaseClient.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { display_name: data.username } },
    });
    SignUpData && router.push({ pathname: '/' });
    SignUpError && setSignUpError(SignUpError.message);
  };
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormTypes>({ resolver: zodResolver(schema), mode: 'onChange' });

  // **** Return Statement ***
  return (
    <Background>
      {/**SignUp Card */}
      <View className="mx-auto mt-8 w-4/5 max-w-[400px] self-center rounded-md border-[1px] border-gray-500 bg-neutral-200 p-8 ">
        {/**Logo */}
        <MyImage1 className="size-18 mb-6 self-center" source={imgLogo}></MyImage1>
        {/**Separator */}
        <View className=" mb-4 w-4/5 self-center border-t-[1px] border-gray-500"></View>
        {/**Inputs Parent View*/}
        <View className="mx-2">
          {/**Username */}
          <MyController
            control={control}
            error={errors.username}
            name="username"
            placeholder="أسم المستخدم"
            title="أسم المستخدم"
          />
          {/**E-Mail */}

          <MyController
            control={control}
            error={errors.email}
            name="email"
            placeholder="البريد الالكتروني"
            title="البريد الالكتروني"
          />
          {/**Password */}

          <MyController
            control={control}
            error={errors.password}
            secure={true}
            icon={TvIcon}
            name="password"
            placeholder="كلمة السر"
            title="كلمة السر"
          />
          {/**Confirm Password */}

          <MyController
            control={control}
            error={errors.confirmPassword}
            secure={true}
            icon={TvIcon}
            name="confirmPassword"
            placeholder="تأكيد كلمة السر"
            title="تأكيد كلمة السر"
          />
        </View>
        {/**Sign Up Button */}

        <Pressable
          onPress={handleSubmit(HandleOnSubmit)}
          className="mt-4 size-fit self-center rounded-md border-[1px] bg-red-700  px-4 py-1">
          <Text className="font-Kufi   text-gray-50">أشتراك</Text>
        </Pressable>
        <Text>{SignUpError}</Text>
        {/**Separator */}
        <View className=" mb-4 mt-6 w-4/5 self-center border-t-[1px] border-gray-500"></View>
        <Pressable onPress={() => setModalVisible(true)} className="items-center justify-center">
          <Text>لديك حساب ؟ سجل دخولك</Text>
        </Pressable>
        <Pressable
          onPress={async () => await supabaseClient.auth.signOut()}
          className="size-12 bg-red-500"></Pressable>
      </View>
    </Background>
  );
};

export default SignUp;
