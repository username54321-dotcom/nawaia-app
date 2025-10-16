import { Text, Image, Pressable } from 'react-native';
import { imgLogo } from '../../../../assets/images/ImageExports';
import { useHeight } from '~/utils/Hooks';
import { useRouter } from 'expo-router';

const BannerLogo = () => {
  const NavHome = () => useRouter().push('/');
  return (
    <>
      <Pressable onPress={NavHome} className=" flex-1  flex-row items-center justify-center ">
        <Image
          className=""
          style={{ height: useHeight(7), width: useHeight(7) }}
          resizeMode="contain"
          onLoadStart={() => <Text>test</Text>}
          source={imgLogo}
        />
        <Text className=" font-PlayywrightHandwritten ml-1 text-3xl font-semibold tracking-wider  text-[#BE1E2D]">
          Dahlia
        </Text>
        <Text className="font-Playywright ml-1 pt-2 text-xl font-semibold text-slate-600">
          Academy
        </Text>
      </Pressable>
    </>
  );
};

export default BannerLogo;
