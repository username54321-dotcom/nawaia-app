import PortraitBanner from '~/components/Banner/PortraitBanner';
import { Text, Image, View } from 'react-native';
import { imgHero } from '~/assets/images/MyImages';
import { useHeight, useWidth } from '~/utils/Hooks';
import { useIsPortrait } from '~/utils/Hooks';
import LandscapeBanner from '~/components/Banner/LandscapeBanner';

export default function Home() {
  return <>{useIsPortrait() ? <PortraitBanner /> : <LandscapeBanner />}</>;
}
