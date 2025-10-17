import { Text, Image, Pressable } from 'react-native';
import { imgLogo } from '../../../../assets/images/ImageExports';
import { useHeight } from '~/utils/Hooks';
import { useRouter } from 'expo-router';

const BannerLogo = () => {
  const NavHome = () => useRouter().push('/');
  return (
    <>
      <Pressable
        onPress={NavHome}
        className=" flex-1 translate-x-[-1px]  flex-row items-center justify-center ">
        <Image
          className=""
          style={{ height: useHeight(5), width: useHeight(7) }}
          resizeMode="contain"
          onLoadStart={() => <Text>test</Text>}
          source={imgLogo}
        />
        <Text className=" font-PlayywrightHandwritten  text-2xl font-semibold tracking-wide  text-[#BE1E2D]">
          Dahlia
        </Text>
        <Text className="font-Playywright ml-1 translate-y-1 text-xl font-semibold text-slate-600">
          Academy
        </Text>
      </Pressable>
    </>
  );
};

export default BannerLogo;
