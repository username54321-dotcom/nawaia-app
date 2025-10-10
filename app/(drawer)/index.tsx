import Banner from '../../components/Banner/PortraitBanner';
import { Text, Image, View } from 'react-native';
import { imgHero } from './../../assets/images/MyImages';
import { useHeight, useWidth } from '~/utils/Hooks';

export default function Home() {
  return (
    <>
      <Banner></Banner>
      <Image
        source={imgHero}
        height={useHeight(80)}
        width={useWidth(100)}
        resizeMethod="scale"
        resizeMode="stretch"></Image>
    </>
  );
}
