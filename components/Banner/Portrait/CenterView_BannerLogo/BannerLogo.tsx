import { Text, Pressable } from 'react-native';
import { imgLogo } from '../../../../assets/images/ImageExports';
import { useRouter } from 'expo-router';
import { memo, useMemo } from 'react';
import { Image } from 'expo-image';

const BannerLogo = () => {
  const router = useRouter();

  return (
    <>
      <Pressable
        onPress={() => router.push('/')}
        className=" flex-1 translate-x-[-1px]  flex-row items-center justify-center ">
        <Image
          className="translate-x-[-4px]"
          transition={null}
          style={{ height: 45, width: 45 }}
          contentFit="contain"
          source={imgLogo}
          cachePolicy={'memory-disk'}
        />

        <Text className=" translate-y-0  font-Playwrite text-3xl font-semibold  text-[#BE1E2D]">
          Nawaia
        </Text>
        {/* <Text className="font-Playywright ml-1 translate-y-[6px] text-xl font-semibold text-slate-600">
          Academy
        </Text> */}
      </Pressable>
    </>
  );
};

export default memo(BannerLogo);
