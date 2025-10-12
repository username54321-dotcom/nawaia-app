import { useIsPortrait } from '../../../utils/Hooks';
import PortraitBanner from '../../../components/Banner/Portrait/PortraitBanner';
import LandscapeBanner from '../../../components/Banner/Landscape/LandscapeBanner';
import { Text } from 'react-native';
function Courses() {
  return (
    <>
      {useIsPortrait() ? <PortraitBanner /> : <LandscapeBanner />}
      <Text>Courses</Text>
    </>
  );
}

export default Courses;
