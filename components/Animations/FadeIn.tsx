import React, { memo, useEffect } from 'react';
import { MotiView, useAnimationState } from 'moti';
import { useIsFocused } from '@react-navigation/native';

type FadeInProps = {
  className?: string;
  children?: React.ReactNode;
};

const FadeIn = ({ className, children }: FadeInProps) => {
  const isFocus = useIsFocused();
  const animation = useAnimationState({
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: [1] },
    from: { opacity: 0, scale: 0 },
  });
  useEffect(() => {
    !isFocus && animation.transitionTo('hidden');
    isFocus && animation.transitionTo('visible');
  }, [isFocus, animation]);

  return (
    <MotiView state={animation} transition={{ type: 'spring' }} className={className}>
      {children}
    </MotiView>
  );
};

export default memo(FadeIn);
