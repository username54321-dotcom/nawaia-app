import { View } from 'react-native';
import { useEffect } from 'react';
import Background from '~/components/Background';
import { MotiView, useAnimationState } from 'moti';
import { style } from 'twrnc';
import { LottieView } from './../../../node_modules/lottie-react-native/src/LottieView/index';
const Test = ({ show }: { show: boolean }) => {
  return (
    <>
      <Background>
        <LottieView></LottieView>
      </Background>
    </>
  );
};

export default Test;
