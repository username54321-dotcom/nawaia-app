import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { memo } from 'react';
import { useIsAuth, useIsAuthType, useModalVisible, useModalVisibleType } from '~/store/store';
import { CircleUser, LogIn, UserRoundPen } from 'lucide-react-native';
import tw from 'twrnc';

const LandscapeBanner = () => {
  const isAuth = useIsAuth((state: useIsAuthType) => state.isAuth);
  const isAdmin = useIsAuth((state: useIsAuthType) => state.isAdmin);
  const router = useRouter();
  const showSignIn = useModalVisible((state: useModalVisibleType) => state.setModalVisible);
  return (
    <>
      {/** Main Container */}
      <View className="h-[7vh] min-h-[60] w-full flex-row items-center justify-center border-b-[1px] border-neutral-400 bg-neutral-200 shadow-gray-400">
        {/**Main Content Container */}
        <View className=" h-full w-2/3 flex-row">
          {/**Left Container */}
          <View className="h-full flex-1 flex-row items-center ">
            {/** Signed Out */}
            {/** SignIn SignUp Buttons */}
            {!isAuth && (
              <>
                {/** Sign Up Button */}
                <Pressable
                  onPress={() => router.push('/Account')}
                  className="m-2 flex-row items-center  rounded-md bg-[#BE1E2D] p-2 py-1">
                  <Text className="font-Kufi text-neutral-50">انشاء عضوية</Text>
                  <UserRoundPen size={18} className="mb-1 ml-1" color={tw.color('neutral-50')} />
                </Pressable>
                {/** Sign In Button */}
                <Pressable onPress={() => showSignIn(true)}>
                  <View className="flex-row items-center rounded-md border-[1px] border-neutral-400 p-2 py-1">
                    <Text className="font-Kufi font-semibold text-[#BE1E2D]">تسجيل الدخول</Text>
                    <LogIn className="ml-1" color={'#BE1E2D'} size={18} />
                  </View>
                </Pressable>
              </>
            )}

            {/**Signed In */}
            {isAuth && (
              <>
                <Pressable
                  onPress={() => router.push('/Account')}
                  className="m-2 flex-row items-center  rounded-md bg-[#BE1E2D] p-2 py-1">
                  <Text className="font-Kufi text-neutral-50">حسابي </Text>

                  <CircleUser size={18} className="mb-1 ml-1" color={tw.color('neutral-50')} />
                </Pressable>
              </>
            )}
          </View>
          {/**Right Container */}
          <View className="h-full flex-1 flex-row-reverse items-center ">
            <Pressable
              onPress={() => router.push('/')}
              className=" ml-4 flex-row items-center  justify-center  ">
              <Text className=" font-Playywrite  translate-y-0 text-3xl font-bold  text-[#BE1E2D]">
                NAWAIA
              </Text>
              <Text className="font-Playywrite font-base  ml-1 translate-y-0 text-3xl  text-slate-600">
                Academy
              </Text>
            </Pressable>
            {/** Navigation Container */}
            <View className="flex-row-reverse ">
              <Pressable onPress={() => router.push('/')}>
                <Text className="m-2 font-Kufi text-base hover:text-[#BE1E2D]">الرئيسية</Text>
              </Pressable>
              <Pressable onPress={() => router.push('/Courses')}>
                <Text className="m-2 font-Kufi text-base hover:text-[#BE1E2D]">دورات</Text>
              </Pressable>{' '}
              <Pressable className="group" onPress={() => router.push('/Books')}>
                <Text className="m-2 font-Kufi  text-base text-neutral-800 group-hover:text-[#BE1E2D]">
                  كتب
                </Text>
              </Pressable>
              <Pressable className="group" onPress={() => router.push('/(drawer)/(Pages)/Booking')}>
                <Text className="m-2 font-Kufi  text-base text-neutral-800 group-hover:text-[#BE1E2D]">
                  أحجز أستشارة
                </Text>
              </Pressable>
              {isAdmin && (
                <Pressable
                  className="bg- rounded-lg bg-slate-300"
                  onPress={() => router.push('/Admin_SelectCourse')}>
                  <Text className="m-2 font-Kufi  text-base text-neutral-800 group-hover:text-[#BE1E2D]">
                    ( انشاء و تعديل المحتوي )
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default memo(LandscapeBanner);
