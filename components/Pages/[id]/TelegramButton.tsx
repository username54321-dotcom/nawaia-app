import { Text, Pressable, Linking, View } from 'react-native';
import { useIsAuth, useModalVisible } from '~/store/store';
import MyImage1 from '~/components/Reusebales/MyImage';

const TelegramButton = ({ telegramLink }: { telegramLink: string | null | undefined }) => {
  const logo = require('assets/svg/telegram_.png');
  const { setModalVisible } = useModalVisible();
  const { isAuth } = useIsAuth((state) => state.isAuth);

  const handleOnPress = async () => {
    isAuth && Linking.openURL(telegramLink ?? 'https://web.telegram.org');
    !isAuth && setModalVisible(true);
  };
  return (
    <Pressable
      onPress={handleOnPress}
      className=" size-fit flex-row-reverse items-center justify-center rounded-xl border-[1px] border-slate-400 bg-sky-500 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-sky-200">
      <View className="rounded-full bg-white p-[2px]">
        <MyImage1
          source={logo}
          className=" size-[20px] translate-x-[-0.5]  rounded-full "></MyImage1>
      </View>
      {/* <Text className=" mr-1  font-Kufi text-xs font-semibold text-neutral-600">
        جروب التليجرام
      </Text> */}
    </Pressable>
  );
};

export default TelegramButton;
