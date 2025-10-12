import LandscapeBanner from '~/components/Banner/Landscape/LandscapeBanner';
import PortraitBanner from '~/components/Banner/Portrait/PortraitBanner';
import { useIsPortrait } from '~/utils/Hooks';
import CoursesFlatlist from './../../components/Home/CoursesFlatlist';

export default function Home() {
  return (
    <>
      {/* Banner */}
      {useIsPortrait() ? <PortraitBanner /> : <LandscapeBanner />}
      {/* Page */}
      <CoursesFlatlist></CoursesFlatlist>
    </>
  );
}
