import LandscapeBanner from '~/components/Banner/LandscapeBanner';
import PortraitBanner from '~/components/Banner/PortraitBanner';
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
