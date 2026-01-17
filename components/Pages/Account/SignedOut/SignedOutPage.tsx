import { memo, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TvIcon } from 'lucide-react-native';
import Background from '~/components/Background';
import { Pressable, Text, View } from 'react-native';
import MyImage from '~/components/Reusebales/MyImage';
import { imgLogo } from '~/assets/images/ImageExports';
import { supabaseClient } from '~/utils/supabase';

import { useModalVisible, useModalVisibleType } from '~/store/store';
import MyController from './MyController';
import FadeIn from '~/components/Animations/FadeIn';
import axios from 'axios';

// *Schema
const createSchema = (t: any) =>
  z
    .object({
      username: z
        .string({ message: t('required') })
        .min(3, { message: t('username_min') })
        .max(30, { message: t('username_max') })
        .regex(/^[a-zA-Z0-9_]+$/, {
          message: t('username_regex'),
        }),
      email: z.string({ message: t('required') }).email({ message: t('email_invalid') }),
      password: z
        .string({ message: t('required') })
        .min(8, { message: t('password_min') })
        .regex(/[a-z]/, { message: t('password_lower') })
        .regex(/[A-Z]/, { message: t('password_upper') })
        .regex(/[0-9]/, { message: t('password_digit') })
        .regex(/[^a-zA-Z0-9]/, {
          message: t('password_special'),
        })
        .regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, {
          message: t('password_chars'),
        }),
      confirmPassword: z.string({ message: t('required') }),
      phone: z.coerce
        .number({
          message: t('phone_invalid'),
        })
        .refine(
          (x) => {
            const valid = x.toString().length >= 10 && x.toString().length <= 20;
            return valid;
          },
          {
            message: t('phone_invalid'),
          }
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('password_mismatch'),
      path: ['confirmPassword'],
    });

//* Types
type FormTypes = z.infer<ReturnType<typeof createSchema>>;

// ***Functions
const SignUp = () => {
  const { t } = useTranslation();
  const schema = useMemo(() => createSchema(t), [t]);
  const setModalVisible = useModalVisible((state: useModalVisibleType) => state.setModalVisible);

  const [SignUpError, setSignUpError] = useState<string | null>(null);
  const HandleOnSubmit = async (data: FormTypes) => {
    // Get Location Data
    const locationData = await axios
      .get('https://hdxnyotrpjmrigmpdpkn.supabase.co/functions/v1/telemetry')
      .then(
        (x) => x.data,
        () => setSignUpError('Something Went Wrong Please Try Again.')
      );

    if (!locationData) return;
    // Actual Signing Up
    const { data: SignUpData, error: SignUpError } = await supabaseClient.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { display_name: data.username, phone: data.phone, locationData: locationData },
      },
    });
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
      <FadeIn>
        <View className="mx-auto mt-8 w-4/5 max-w-[400px] self-center rounded-md border-[1px] border-gray-500 bg-neutral-200 p-8 ">
          {/**Logo */}
          <MyImage className="size-18 mb-6 self-center" source={imgLogo}></MyImage>
          {/**Separator */}
          <View className=" mb-4 w-4/5 self-center border-t-[1px] border-gray-500"></View>
          {/**Inputs Parent View*/}
          <View className="mx-2">
            {/**Username */}
            <MyController
              control={control}
              error={errors.username}
              name="username"
              placeholder={t('username_label')}
              title={t('username_label')}
            />
            {/**E-Mail */}

            <MyController
              control={control}
              error={errors.email}
              name="email"
              placeholder={t('email_label')}
              title={t('email_label')}
            />
            {/**Password */}

            <MyController
              control={control}
              error={errors.password}
              secure={true}
              icon={TvIcon}
              name="password"
              placeholder={t('password_label')}
              title={t('password_label')}
            />
            {/**Confirm Password */}

            <MyController
              control={control}
              error={errors.confirmPassword}
              secure={true}
              icon={TvIcon}
              name="confirmPassword"
              placeholder={t('confirm_password_label')}
              title={t('confirm_password_label')}
            />
            {/**Phone Number*/}

            <MyController
              control={control}
              error={errors.phone}
              name="phone"
              placeholder={t('phone_label')}
              title={t('phone_label')}
            />
          </View>
          {/**Sign Up Button */}

          <Pressable
            onPress={handleSubmit(HandleOnSubmit)}
            className="mt-4 size-fit self-center rounded-md border-[1px] bg-red-700  px-4 py-1">
            <Text className="font-Kufi   text-gray-50">{t('sign_up_btn')}</Text>
          </Pressable>
          {/** Approval Notice */}
          <View className="mx-auto mt-2 w-full  py-2 ">
            <Text className="m-auto mr-2 font-Kufi text-xs font-semibold italic text-neutral-700 ">
              {t('approval_notice')}
            </Text>
          </View>
          <Text>{SignUpError}</Text>
          {/**Separator */}
          <View className=" mb-4 mt-2 w-4/5 self-center border-t-[1px] border-gray-500"></View>
          <Pressable onPress={() => setModalVisible(true)} className="items-center justify-center">
            <Text className="font-Kufi text-xs">{t('already_subscriber')}</Text>
            <Text className="textbase mb-2 font-Kufi font-semibold text-blue-700 underline underline-offset-8 ">
              {t('sign_in_link')}
            </Text>
          </Pressable>
        </View>
      </FadeIn>
    </Background>
  );
};

export default memo(SignUp);
