import { View, Text } from 'react-native';
import React from 'react';
import { useIsPortrait } from '../../../utils/Hooks';
import PortraitBanner from '../../../components/Banner/Portrait/PortraitBanner';
import LandscapeBanner from '../../../components/Banner/Landscape/LandscapeBanner';
import { Skeleton } from 'moti/skeleton';
import Background from '~/components/Background';
import MySkeleton from './../../../components/MySkeleton';

const Books = () => {
  return (
    <>
      <Background>
        <View className="h-48 w-full"></View>
        <MySkeleton className="h-12 w-full"></MySkeleton>
      </Background>
    </>
  );
};

export default Books;
