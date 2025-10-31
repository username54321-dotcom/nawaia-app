import React, { memo } from 'react';
import { MotiView, useAnimationState } from 'moti';
import { VisibilitySensor } from '@futurejj/react-native-visibility-sensor';

type FadeInProps = {
  className?: string;
  children?: React.ReactNode;
};

const ScrollEffect = ({ className, children }: FadeInProps) => {
  const animation = useAnimationState({
    hidden: { opacity: 0.5, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  });

  const HandleAnimation = (v: number) => {
    v > 10 && animation.transitionTo('visible');
    v < 10 && animation.transitionTo('hidden');
  };
  return (
    <VisibilitySensor onChange={() => {}} onPercentChange={HandleAnimation}>
      <MotiView
        state={animation}
        transition={{ type: 'timing', duration: 200 }}
        className={className}>
        {children}
      </MotiView>
    </VisibilitySensor>
  );
};

export default memo(ScrollEffect);
