import { View, Pressable } from 'react-native';
import { Menu } from 'lucide-react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Banner = () => {
  const nav = useNavigation();

  return (
    <View className="h-[10%] w-full flex-row items-center justify-between bg-neutral-200 shadow-md shadow-gray-400">
      {/* Left Spacer */}
      <View className="w-[75px]" />

      {/* Image Container (This will now be perfectly centered) */}
      <View className="h-[80%] flex-1 items-center justify-center ">
        <Image
          style={{ maxHeight: hp('10%'), maxWidth: wp('66%') }}
          resizeMode="contain"
          source={require('~/assets/images/2-Photoroom (2).png')}
        />
      </View>

      {/* Right Spacer and Button Container */}
      <Pressable
        className={` mr-2  h-[60%] w-[10%] flex-row items-start justify-end`}
        onPress={() => nav.dispatch(DrawerActions.toggleDrawer())}>
        <Menu size={hp('5%')} color="black" />
      </Pressable>
    </View>
  );
};

export default Banner;
