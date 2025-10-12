import { useIsPortrait } from '~/utils/Hooks';
import PortraitBanner from '../../../components/Banner/Portrait/PortraitBanner';
import LandscapeBanner from '../../../components/Banner/Landscape/LandscapeBanner';
import { Text } from 'react-native';

const About = () => {
  return (
    <>
      {useIsPortrait() ? <PortraitBanner /> : <LandscapeBanner />}
      <Text>About</Text>
    </>
  );
};

export default About;
