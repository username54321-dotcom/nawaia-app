import { useMemo, useRef } from 'react';
import { Dotlottie, DotLottie } from '@lottiefiles/dotlottie-react-native';

const ProgressCircle = (PercentCompleted: number) => {
  const source = useMemo(() => require('assets/lottie/Loading Bar  Progress Bar.lottie'), []);
  const lottieRef = useRef<Dotlottie>(null);

  return (
    <>
      <DotLottie
        speed={2}
        segment={[-1, PercentCompleted * 2.5]}
        ref={lottieRef}
        style={{ width: 200, height: 200 }}
        source={source}></DotLottie>
    </>
  );
};

export default ProgressCircle;
