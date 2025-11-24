import { useEffect, useMemo, useRef, useState } from 'react';
import { Dotlottie, DotLottie } from '@lottiefiles/dotlottie-react-native';
import FadeIn from '../FadeIn';

const ProgressCircle = ({ PercentCompleted }: { PercentCompleted: number }) => {
  const source = useMemo(() => require('assets/lottie/Loading Bar  Progress Bar.lottie'), []);
  const lottieRef = useRef<Dotlottie>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  // Show Animation After Delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAnimation(true);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      {showAnimation && (
        <DotLottie
          useFrameInterpolation={true}
          speed={2}
          autoplay={true}
          segment={[-1, PercentCompleted * 2.5]}
          ref={lottieRef}
          style={{ width: 35, height: 35 }}
          source={source}></DotLottie>
      )}
    </>
  );
};

export default ProgressCircle;
