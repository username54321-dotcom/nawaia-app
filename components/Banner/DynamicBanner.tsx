import { useIsPortrait } from '~/utils/Hooks';
import LandscapeBanner from './Landscape/LandscapeBanner';
import PortraitBanner from './Portrait/PortraitBanner';
import { memo } from 'react';

const DynamicBanner = () => {
  return <>{useIsPortrait() ? <PortraitBanner /> : <LandscapeBanner />}</>;
};

export default memo(DynamicBanner);
