import { Text, Pressable, Linking } from 'react-native';
import MyImage from '~/components/Reusebales/MyImage';
import { useIsAuth, useModalVisible } from '~/store/store';

const TelegramButton = ({ telegramLink }: { telegramLink: string | null | undefined }) => {
  const logo = require('assets/svg/telegram_.png');
  const { setModalVisible } = useModalVisible();
  const { isAuth } = useIsAuth();
  const handleOnPress = async () => {
    isAuth && Linking.openURL(telegramLink ?? 'https://web.telegram.org');
    !isAuth && setModalVisible(true);
  };
  return (
    <Pressable
      onPress={handleOnPress}
      className=" size-fit flex-row-reverse items-center justify-center rounded-xl border-[1px] border-slate-400 bg-sky-100 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-sky-200">
      <MyImage source={logo} className="size-[20px] rounded-full   "></MyImage>
      <Text className=" mr-1  font-Kufi text-xs font-semibold text-neutral-600">
        جروب التليجرام
      </Text>
    </Pressable>
  );
};

export default TelegramButton;
