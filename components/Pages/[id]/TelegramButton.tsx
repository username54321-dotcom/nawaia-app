import { Pressable, Linking, View } from 'react-native';
import { useModalVisible, useIsAuth, useIsAuthType, useModalVisibleType } from '~/store/store';
import MyImage from '~/components/Reusebales/MyImage';

import { memo, useMemo, useCallback } from 'react';

const TelegramButton = ({ telegramLink }: { telegramLink: string | null | undefined }) => {
  const logo = useMemo(() => require('assets/svg/telegram_.png'), []);
  const setModalVisible = useModalVisible((state: useModalVisibleType) => state.setModalVisible);
  const isAuth = useIsAuth((state: useIsAuthType) => state.isAuth);

  const handleOnPress = useCallback(async () => {
    isAuth && Linking.openURL(telegramLink ?? 'https://web.telegram.org');
    !isAuth && setModalVisible(true);
  }, [isAuth, setModalVisible, telegramLink]);

  return (
    <Pressable
      onPress={handleOnPress}
      className=" size-fit flex-row-reverse items-center justify-center rounded-xl border-[1px] border-slate-400 bg-sky-500 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-sky-300">
      <View className="rounded-full bg-white p-[2px]">
        <MyImage source={logo} className=" size-[20px] translate-x-[-0.5]  rounded-full "></MyImage>
      </View>
    </Pressable>
  );
};

export default memo(TelegramButton);
