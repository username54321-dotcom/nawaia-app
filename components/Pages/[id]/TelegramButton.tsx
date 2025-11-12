import { Pressable, Linking, View } from 'react-native';
import { useModalVisible, useIsAuth, useIsAuthType, useModalVisibleType } from '~/store/store';
import MyImage1 from '~/components/Reusebales/MyImage';
import { DotLottie, Dotlottie, Mode } from '@lottiefiles/dotlottie-react-native';
import { style } from 'twrnc';
import { useMemo } from 'react';

const TelegramButton = ({ telegramLink }: { telegramLink: string | null | undefined }) => {
  const logo = require('assets/svg/telegram_.png');
  const setModalVisible = useModalVisible((state: useModalVisibleType) => state.setModalVisible);
  const isAuth = useIsAuth((state: useIsAuthType) => state.isAuth);

  const handleOnPress = async () => {
    isAuth && Linking.openURL(telegramLink ?? 'https://web.telegram.org');
    !isAuth && setModalVisible(true);
  };

  const source = useMemo(() => require('~/assets/lottie/telegram icon.lottie'), []);
  return (
    <Pressable
      onPress={handleOnPress}
      className=" size-fit flex-row-reverse items-center justify-center rounded-xl border-[1px] border-slate-400 bg-sky-500 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-sky-300">
      <View className="rounded-full bg-white p-[2px]">
        <MyImage1
          source={logo}
          className=" size-[20px] translate-x-[-0.5]  rounded-full "></MyImage1>
      </View>
    </Pressable>
  );
};

export default TelegramButton;
