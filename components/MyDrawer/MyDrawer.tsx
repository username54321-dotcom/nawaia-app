import { memo, useCallback, useEffect, useMemo } from 'react';
import { useAnimationState, MotiView } from 'moti';
import { Modal, Pressable, Text, View } from 'react-native';
import { style } from 'twrnc';
import DrawerItem from './DrawerItem';
import { useIsAuth, useIsAuthType } from '~/store/store';
import {
  ArrowBigDown,
  CalendarDays,
  CircleUserRound,
  GraduationCap,
  House,
  LibraryBig,
  ShieldUser,
  Users,
} from 'lucide-react-native';
import { supabaseClient } from '~/utils/supabase';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
interface propTypes {
  drawerVisible: boolean;
  setDrawerVisible: (value: boolean) => void;
}

import { useTranslation } from 'react-i18next';

const MyDrawer = ({ drawerVisible, setDrawerVisible }: propTypes) => {
  const { t } = useTranslation();
  const isAdmin = useIsAuth((state: useIsAuthType) => state.isAdmin);
  const isAuth = useIsAuth((state: useIsAuthType) => state.isAuth);
  const router = useRouter();
  const animation = useAnimationState({
    hide: { scaleX: 0 },
    show: { scaleX: 1 },
  });
  // Hide Drawer
  const handleDisableDrawer = useCallback(() => setDrawerVisible(false), [setDrawerVisible]);
  // Handle Logout
  const handleLogout = useCallback(async () => {
    await supabaseClient.auth.signOut();
    router.replace('/');
  }, [router]);
  // Moti Animation Styles
  const motiStyles = useMemo(() => {
    return style(['flex-1'], { transformOrigin: 'right' });
  }, []);
  useEffect(() => {
    drawerVisible && animation.transitionTo('show');
    !drawerVisible && animation.transitionTo('hide');
  }, [drawerVisible, animation]);
  return (
    // Main Modal
    <Modal visible={drawerVisible} transparent={true} animationType="fade">
      {/**Covering Button to Hide Drawer */}
      <Pressable onPress={handleDisableDrawer} className="flex-1 bg-black/40 ">
        {/** Main Container *(is Pressable to Negate Parent Action) */}
        <Pressable className="native:w-1/2 h-full   min-w-fit self-end">
          {/** Animation Container */}
          <MotiView
            transition={{ type: 'timing', duration: 200 }}
            style={motiStyles}
            state={animation}>
            {/** Main Drawer Items Container */}
            <View className="flex-1 flex-col items-center  rounded-l-xl bg-neutral-300 px-6 py-6">
              {/** Navigation Items */}
              <DrawerItem
                Icon={House}
                setDrawerVisible={setDrawerVisible}
                label={t('nav_home')}
                targetPage="/"></DrawerItem>
              <DrawerItem
                Icon={GraduationCap}
                setDrawerVisible={setDrawerVisible}
                label={t('nav_courses')}
                targetPage="/Courses"></DrawerItem>
              <DrawerItem
                Icon={LibraryBig}
                setDrawerVisible={setDrawerVisible}
                label={t('nav_books')}
                targetPage="/Books"></DrawerItem>
              <DrawerItem
                Icon={CalendarDays}
                setDrawerVisible={setDrawerVisible}
                label={t('nav_booking')}
                targetPage="/Booking"></DrawerItem>
              <DrawerItem
                Icon={Users}
                setDrawerVisible={setDrawerVisible}
                label={t('nav_about_us')}
                targetPage="/AboutUs"></DrawerItem>
              {isAdmin && (
                <DrawerItem
                  Icon={ShieldUser}
                  setDrawerVisible={setDrawerVisible}
                  label={t('nav_admin_content')}
                  targetPage="/Admin_SelectEditOption"></DrawerItem>
              )}
              {isAuth && (
                <Pressable onPress={handleLogout} className="mt-auto ">
                  <Text className="font-Kufi font-semibold text-[#525252]">{t('sign_out')}</Text>
                </Pressable>
              )}
            </View>
          </MotiView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default memo(MyDrawer);
