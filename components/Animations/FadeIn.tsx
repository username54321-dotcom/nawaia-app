import React, { useEffect } from 'react';
import { MotiView, useAnimationState } from 'moti';
import { useIsFocused } from '@react-navigation/native';
import randomItem from 'random-item';

type FadeInProps = {
  className?: string;
  children?: React.ReactNode;
};

const FadeIn = ({ className, children }: FadeInProps) => {
  const number = randomItem([1.02, 1.03, 1.04]);
  const isFocus = useIsFocused();
  const animation = useAnimationState({
    from: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: [number, 1] },
  });
  useEffect(() => {
    isFocus ? animation.transitionTo('animate') : animation.transitionTo('from');
  }, [isFocus]);
  return (
    <MotiView
      style={{ transform: [{ rotateZ: 0 }] }}
      state={animation}
      key={Math.random()}
      transition={{ duration: 200, type: 'timing' }}
      className={className}>
      {children}
    </MotiView>
  );
};

export default FadeIn;
