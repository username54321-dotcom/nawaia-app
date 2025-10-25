import Background from '~/components/Background';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import MyController from './../../../components/Pages/SignUp/SignUpInput';
// *Schema
const schema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'اسم المستخدم يجب أن يتكون من 3 أحرف على الأقل.' })
      .max(20, { message: 'اسم المستخدم يجب ألا يزيد عن 20 حرفًا.' })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'اسم المستخدم يمكن أن يحتوي فقط على أحرف وأرقام وشرطة سفلية (_).',
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

    // يمكنك إضافة حقول اختيارية مثل هذا
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, { message: 'يجب عليك الموافقة على الشروط والأحكام.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين.',
    path: ['confirmPassword'], // هنا نحدد مكان ظهور رسالة الخطأ
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
        error={errors.email}
        name="email"
        className=""
        placeholder="email"></MyController>
      <MyController
        control={control}
        error={errors.password}
        name="password"
        className="border-4"
        placeholder="password"></MyController>
    </Background>
  );
};

export default SignUp;
