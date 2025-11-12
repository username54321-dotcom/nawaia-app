import Background from '~/components/Background';

import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { Pressable } from 'react-native';
import { DotLottie, Dotlottie } from '@lottiefiles/dotlottie-react-native';

const Test = ({ show }: { show: boolean }) => {
  const lottieRef = useRef<Dotlottie>(null);

  return (
    <>
      <Background>
        <DotLottie
          ref={lottieRef}
          style={{ width: 200, height: 200 }}
          source={require('~/assets/lottie/Loading Bar  Progress Bar.lottie')}></DotLottie>
        <Pressable
          className="size-12 bg-red-500"
          onPress={() => {
            lottieRef.current?.play();
          }}></Pressable>
      </Background>
    </>
  );
};

export default Test;
