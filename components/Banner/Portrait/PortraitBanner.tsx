import { View, Pressable, Text, Image } from 'react-native';
import { Menu } from 'lucide-react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useHeight } from '~/utils/Hooks';
import SignedOutButton from './UserButton/SignedOutButton';

const PortraitBanner = () => {
  const nav = useNavigation();

  return (
    //Banner View
    <View
      className={` mx-auto  h-[8vh] min-h-[75] w-[100%] flex-row items-center justify-between  bg-neutral-200 shadow-md shadow-neutral-400 `}>
      {/* Left View */}
      <SignedOutButton />
      {/* center View */}
      <View className="h-full flex-1 flex-row items-center justify-center ">
        <Image
          className=""
          style={{ height: useHeight(7), width: useHeight(7) }}
          resizeMode="contain"
          onLoadStart={() => <Text>test</Text>}
          source={require('~/assets/images/logo-1.png')}
        />
        <Text className="ml-1 text-3xl font-bold tracking-wide text-[#BE1E2D]">Dahlia</Text>
        <Text className="ml-1 pt-1 text-xl font-semibold text-slate-600">Academy</Text>
      </View>
      {/* Right View */}
      <View className="flex w-[16%] flex-row items-center justify-end">
        <Pressable
          className={`m-4 h-fit w-fit rounded-md border-[0.5px] bg-[#BE1E2D] p-1  shadow-sm shadow-slate-400`}
          onPress={() => {
            nav.dispatch(DrawerActions.toggleDrawer());
            console.log('aaaa');
          }}>
          <Menu size={24} color="white" strokeWidth={1.5} />
        </Pressable>
      </View>
    </View>
  );
};

export default PortraitBanner;
//1488b2  397029
