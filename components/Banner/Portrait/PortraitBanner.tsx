import { View } from 'react-native';
import SignedOutButton from './LeftView_UserButton/SignedOutButton';
import BannerLogo from './CenterView_BannerLogo/BannerLogo';
import MenuButton from './RightView_MenuButton/MenuButton';

const PortraitBanner = ({ className }: { className?: string }) => {
  return (
    // Parent View
    <View
      className={
        ` z-[1]   h-[8vh] min-h-[75] w-full flex-row items-center justify-between  bg-neutral-200 shadow-md shadow-neutral-300 ` +
        className
      }>
      {/* Left View */}
      <View className="flex h-full w-[16%] items-center justify-center">
        <SignedOutButton />
      </View>
      {/* center View */}
      <View className=" flex-1 flex-row items-center justify-center ">
        <BannerLogo />
      </View>
      {/* Right View */}
      <View className="flex w-[16%] flex-row items-center justify-center">
        <MenuButton></MenuButton>
      </View>
    </View>
  );
};

export default PortraitBanner;
