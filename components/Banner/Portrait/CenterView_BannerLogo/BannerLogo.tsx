import { Text, Image } from 'react-native';
import { imgLogo } from '../../../../assets/images/ImageExports';
import { useHeight } from '~/utils/Hooks';

const BannerLogo = () => {
  return (
    <>
      <Image
        className=""
        style={{ height: useHeight(7), width: useHeight(7) }}
        resizeMode="contain"
        onLoadStart={() => <Text>test</Text>}
        source={imgLogo}
      />
      <Text className="ml-1 text-3xl font-bold tracking-wide text-[#BE1E2D]">Dahlia</Text>
      <Text className="ml-1 pt-1 text-xl font-semibold text-slate-600">Academy</Text>
    </>
  );
};

export default BannerLogo;
