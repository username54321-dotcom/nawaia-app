import { View, Pressable, Platform, Text } from 'react-native';
import { Menu } from 'lucide-react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Image } from 'react-native';
import { useHeight, useWidth } from '~/utils/Hooks';

const PortraitBanner = () => {
  const nav = useNavigation();

  return (
    //Banner View
    <View
      className={`h-[8vh] min-h-[75] w-full flex-row items-center justify-between border-b-[1px] border-neutral-400 bg-neutral-200 py-10  shadow-gray-400 `}>
      {/* Left View */}
      <View className="w-[16%]"></View>
      {/* center View */}
      <View className="h-full flex-1 items-center justify-center ">
        <Image
          style={{
            height: useHeight(8, 75),
            minHeight: 50,
            width: useWidth(66),
          }}
          resizeMode="contain"
          onLoadStart={() => <Text>test</Text>}
          source={require('~/assets/images/2-Photoroom (2).png')}
        />
      </View>
      {/* Right View */}
      <View className="flex w-[16%] flex-row items-center justify-end">
        <Pressable
          className={`m-4 h-fit w-fit rounded-md border-[1.5px] border-neutral-800 bg-neutral-300 p-1`}
          onPress={() => {
            nav.dispatch(DrawerActions.toggleDrawer());
            console.log('aaaa');
          }}>
          <Menu size={useHeight(3, 25)} color="black" strokeWidth={2} />
        </Pressable>
      </View>
    </View>
  );
};

export default PortraitBanner;
//1488b2  397029
