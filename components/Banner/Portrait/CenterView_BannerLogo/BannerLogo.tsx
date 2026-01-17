import { Text, Pressable } from 'react-native';
import { imgLogo } from '../../../../assets/images/ImageExports';
import { Link } from 'expo-router';
import { memo } from 'react';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';

const BannerLogo = () => {
  const { t } = useTranslation();
  return (
    <>
      <Link asChild href={'/'}>
        <Pressable
          role="link"
          accessibilityLabel="Nawaia Home"
          className=" flex-1 translate-x-[-1px]  flex-row items-center justify-center ">
          <Image
            className="translate-x-[-4px]"
            transition={null}
            style={imageStyle}
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
      </Link>
    </>
  );
};

export default memo(BannerLogo);
const imageStyle = { height: 45, width: 45 };
