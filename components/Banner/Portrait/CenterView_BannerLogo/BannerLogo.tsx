import { Text, Image, Pressable } from 'react-native';
import { imgLogo } from '../../../../assets/images/ImageExports';
import { useRouter } from 'expo-router';
import { memo } from 'react';

const BannerLogo = () => {
  const router = useRouter();
  const NavHome = () => router.push('/');
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

        <Text className=" translate-y-0  font-Playwrite text-3xl font-semibold  text-[#BE1E2D]">
          Nawaia
        </Text>
        <Text className="font-Playywright ml-1 translate-y-[6px] text-xl font-semibold text-slate-600">
          Academy
        </Text>
      </Pressable>
    </>
  );
};

export default memo(BannerLogo);
