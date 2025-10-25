import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TvIcon } from 'lucide-react-native';

import Background from '~/components/Background';
import MyController from './../../../components/Pages/SignUp/SignUpInput';
import { Pressable, View } from 'react-native';

// *Schema
const schema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'اسم المستخدم يجب أن يتكون من 3 أحرف على الأقل.' })
      .max(20, { message: 'اسم المستخدم يجب ألا يزيد عن 20 حرفًا.' })
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
  const HandleOnSubmit = (data: FormTypes) => {
    console.log(data);
  };
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormTypes>({ resolver: zodResolver(schema), mode: 'onChange' });

  // **** Return Statement ***
  return (
    <Background>
      <MyController
        control={control}
        error={errors.username}
        name="username"
        placeholder="أسم المستخدم"
        title="أسم المستخدم"
      />
      <MyController
        control={control}
        error={errors.email}
        name="email"
        placeholder="Email"
        title="البريد الالكتروني"
      />
      <MyController
        control={control}
        error={errors.password}
        secure={true}
        icon={TvIcon}
        name="password"
        placeholder="Password"
        title="كلمة السر"
      />
      <MyController
        control={control}
        error={errors.confirmPassword}
        secure={true}
        icon={TvIcon}
        name="confirmPassword"
        placeholder="Confirm Password"
        title="تأكيد كلمة السر"
      />
      <Pressable onPress={handleSubmit(HandleOnSubmit)} className="size-16 bg-red-500"></Pressable>
    </Background>
  );
};

export default SignUp;
