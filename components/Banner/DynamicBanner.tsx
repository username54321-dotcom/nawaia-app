import { useIsPortrait } from '~/utils/Hooks';
import LandscapeBanner from './Landscape/LandscapeBanner';
import PortraitBanner from './Portrait/PortraitBanner';
import { memo } from 'react';
import MyDrawer from './../MyDrawer/MyDrawer';

const DynamicBanner = () => {
  return <>{useIsPortrait() ? <PortraitBanner /> : <LandscapeBanner />}</>;
};

export default memo(DynamicBanner);
