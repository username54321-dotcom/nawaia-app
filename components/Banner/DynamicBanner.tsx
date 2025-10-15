import { useIsPortrait } from '~/utils/Hooks';
import LandscapeBanner from './Landscape/LandscapeBanner';
import PortraitBanner from './Portrait/PortraitBanner';

const DynamicBanner = () => {
  return <>{useIsPortrait() ? <PortraitBanner /> : <LandscapeBanner />}</>;
};

export default DynamicBanner;
