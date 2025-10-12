import { View, Text } from 'react-native';
import React from 'react';
import { useIsPortrait } from '../../../utils/Hooks';
import PortraitBanner from '../../../components/Banner/Portrait/PortraitBanner';
import LandscapeBanner from '../../../components/Banner/Landscape/LandscapeBanner';

const Books = () => {
  return (
    <>
      {useIsPortrait() ? <PortraitBanner /> : <LandscapeBanner />}
      <Text>Books</Text>
    </>
  );
};

export default Books;
