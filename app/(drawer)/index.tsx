import { Text } from 'react-native';
import LandscapeBanner from '~/components/Banner/LandscapeBanner';
import PortraitBanner from '~/components/Banner/PortraitBanner';
import { useIsPortrait } from '~/utils/Hooks';
export default function Home() {
  return (
    <>
      {useIsPortrait() ? <PortraitBanner /> : <LandscapeBanner />}
      <Text>HomePage</Text>
    </>
  );
}
