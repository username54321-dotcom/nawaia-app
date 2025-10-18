import { Text, Image, Pressable } from 'react-native';
import { imgLogo } from '../../../../assets/images/ImageExports';
import { useHeight } from '~/utils/Hooks';
import { useRouter } from 'expo-router';
import { MotiText, MotiView } from 'moti';

const BannerLogo = () => {
  const NavHome = () => useRouter().push('/');
  return (
    <>
      <Pressable
        onPress={NavHome}
        className=" flex-1 translate-x-[-1px]  flex-row items-center justify-center ">
        <Image
          className="translate-x-[-4px]"
          style={{ height: 45, width: 45 }}
          resizeMode="contain"
          onLoadStart={() => <Text>test</Text>}
          source={imgLogo}
        />

        <MotiText className=" font-PlayywrightHandwritten  text-2xl font-semibold tracking-wide  text-[#BE1E2D]">
          Dahlia
        </MotiText>
        <Text className="font-Playywright ml-1 translate-y-1 text-xl font-semibold text-slate-600">
          Academy
        </Text>
      </Pressable>
    </>
  );
};

export default BannerLogo;
