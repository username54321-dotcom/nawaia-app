import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { memo } from 'react';
import { useIsAuth, useIsAuthType, useModalVisible, useModalVisibleType } from '~/store/store';
import { CircleUser, LogIn, UserRoundPen } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import tw from 'twrnc';

const LandscapeBanner = () => {
  const { t } = useTranslation();
  const isAuth = useIsAuth((state: useIsAuthType) => state.isAuth);
  const isAdmin = useIsAuth((state: useIsAuthType) => state.isAdmin);
  const showSignIn = useModalVisible((state: useModalVisibleType) => state.setModalVisible);
  return (
    <>
      {/** Main Container */}
      <View className="h-[7vh] min-h-[60] w-full flex-row  items-center justify-center  border-b-[1px] border-neutral-400 bg-neutral-200 shadow-gray-400">
        {/**Main Content Container */}
        <View className=" h-full w-2/3 flex-row flex-wrap ">
          {/**Left Container */}
          <View className="flex-warp h-full flex-1 flex-row items-center ">
            {/** SignIn SignUp Buttons */}
            {!isAuth && (
              <>
                {/** Signed Out */}
                {/** Sign Up Button */}
                <Link asChild href={'/Account'}>
                  <Pressable className="m-2 flex-row items-center  rounded-md bg-[#BE1E2D] p-2 py-1">
                    <Text className="font-Kufi text-neutral-50">{t('create_membership')}</Text>
                    <UserRoundPen size={18} className="mb-1 ml-1" color={tw.color('neutral-50')} />
                  </Pressable>
                </Link>
                {/** Sign In Button */}

                <Pressable onPress={() => showSignIn(true)}>
                  <View className="flex-row items-center rounded-md border-[1px] border-neutral-400 p-2 py-1">
                    <Text className="font-Kufi font-semibold text-[#BE1E2D]">
                      {t('sign_in_link')}
                    </Text>
                    <LogIn className="ml-1" color={'#BE1E2D'} size={18} />
                  </View>
                </Pressable>
              </>
            )}

            {/**Signed In */}
            {isAuth && (
              <>
                <Link asChild href={'/Account'}>
                  <Pressable className="m-2 flex-row items-center  rounded-md bg-[#BE1E2D] p-2 py-1">
                    <Text className="font-Kufi text-neutral-50">{t('my_account')} </Text>

                    <CircleUser size={18} className="mb-1 ml-1" color={tw.color('neutral-50')} />
                  </Pressable>
                </Link>
              </>
            )}
          </View>
          {/**Right Container */}
          <View className="h-full w-fit flex-1 flex-row-reverse items-center  ">
            <Link asChild href={'/'}>
              <Pressable className=" ml-4 flex-row items-center  justify-center  ">
                <Text className=" font-Playywrite  translate-y-0 text-3xl font-bold  text-[#BE1E2D]">
                  {t('app_name')}
                </Text>
                {/* <Text className="font-Playywrite font-base  ml-1 translate-y-0 text-3xl  text-slate-600">
                Academy
                </Text> */}
              </Pressable>
            </Link>
            {/** Navigation Container */}
            <View className="flex-row-reverse ">
              <Link asChild href={'/'}>
                <Pressable>
                  <Text className="m-2 font-Kufi text-base hover:text-[#BE1E2D]">
                    {t('nav_home')}
                  </Text>
                </Pressable>
              </Link>
              <Link asChild href={'/Courses'}>
                <Pressable>
                  <Text className="m-2 font-Kufi text-base hover:text-[#BE1E2D]">
                    {t('nav_courses')}
                  </Text>
                </Pressable>
              </Link>
              <Link asChild href={'/Books'}>
                <Pressable className="group">
                  <Text className="m-2 font-Kufi  text-base text-neutral-800 group-hover:text-[#BE1E2D]">
                    {t('nav_books')}
                  </Text>
                </Pressable>
              </Link>
              <Link asChild href={'/Booking'}>
                <Pressable className="group">
                  <Text className="m-2 font-Kufi  text-base text-neutral-800 group-hover:text-[#BE1E2D]">
                    {t('nav_booking')}
                  </Text>
                </Pressable>
              </Link>
              <Link asChild href={'/AboutUs'}>
                <Pressable className="group">
                  <Text className="m-2 font-Kufi  text-base text-neutral-800 group-hover:text-[#BE1E2D]">
                    {t('nav_about_us')}
                  </Text>
                </Pressable>
              </Link>
              {isAdmin && (
                <Link asChild href={'/Admin_SelectEditOption'}>
                  <Pressable className="bg- rounded-lg bg-slate-300">
                    <Text className="m-2 font-Kufi  text-base text-neutral-800 group-hover:text-[#BE1E2D]">
                      ({t('nav_admin_content')})
                    </Text>
                  </Pressable>
                </Link>
              )}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default memo(LandscapeBanner);
