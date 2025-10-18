import Background from './../../../components/Background';
import { View } from 'react-native';
import { MotiView, MotiText } from 'moti';
import DynamicBanner from './../../../components/Banner/DynamicBanner';

const HealthJourney = () => {
  return (
    <>
      <DynamicBanner></DynamicBanner>
      <MotiView className="flex-1 bg-slate-500" animate={{ opacity: 1 }}></MotiView>
    </>
  );
};

export default HealthJourney;
