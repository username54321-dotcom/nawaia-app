import React, { memo, useEffect, useMemo, useRef } from 'react';
import { MotiView, useAnimationState } from 'moti';
import { useIsFocused } from '@react-navigation/native';
import tw from 'twrnc';

type FadeInProps = {
  className?: string;
  children?: React.ReactNode;
};
// Memo Objects
const transition = { type: 'spring' } as const;
// Component
const FadeIn = ({ className, children }: FadeInProps) => {
  const isMounted = useRef(false);
  const isFocus = useIsFocused();
  const animation = useAnimationState({
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    from: { opacity: 0, scale: 0 },
  });
  useEffect(() => {
    !isFocus && animation.transitionTo('hidden');
    isFocus && (isMounted.current = true) && animation.transitionTo('visible');
  }, [isFocus, animation]);

  return (
    <MotiView state={animation} transition={transition} style={tw`${className ?? ''}`}>
      {children}
    </MotiView>
  );
};

export default memo(FadeIn);
