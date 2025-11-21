import { useMemo, useRef } from 'react';
import { Dotlottie, DotLottie } from '@lottiefiles/dotlottie-react-native';

const ProgressCircle = ({ PercentCompleted }: { PercentCompleted: number }) => {
  const source = useMemo(() => require('assets/lottie/Loading Bar  Progress Bar.lottie'), []);
  const lottieRef = useRef<Dotlottie>(null);

  return (
    <>
      <DotLottie
        useFrameInterpolation={true}
        speed={2}
        autoplay={true}
        segment={[-1, PercentCompleted * 2.5]}
        ref={lottieRef}
        style={{ width: 35, height: 35 }}
        source={source}></DotLottie>
    </>
  );
};

export default ProgressCircle;
