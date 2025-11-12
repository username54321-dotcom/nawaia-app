import Background from '~/components/Background';

import { useRef } from 'react';
import { Pressable } from 'react-native';
import { DotLottie, Dotlottie } from '@lottiefiles/dotlottie-react-native';
import ProgressCircle from './../../../components/Animations/Lottie/ProgressCircle';

const Test = ({ show }: { show: boolean }) => {
  const lottieRef = useRef<Dotlottie>(null);

  return (
    <>
      <Background>
        <ProgressCircle></ProgressCircle>
      </Background>
    </>
  );
};

export default Test;
