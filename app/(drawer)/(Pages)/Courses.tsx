import { useIsPortrait } from '../../../utils/Hooks';
import PortraitBanner from '../../../components/Banner/PortraitBanner';
import LandscapeBanner from '../../../components/Banner/LandscapeBanner';
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
