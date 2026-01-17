import React, { memo, useMemo } from 'react';
import { MotiView } from 'moti';
import { useIsFocused } from '@react-navigation/native';
import tw from 'twrnc';

type FadeInProps = {
  className?: string;
  children?: React.ReactNode;
  delay?: number;
};

const FadeIn = ({ className, children, delay = 0 }: FadeInProps) => {
  const isFocus = useIsFocused();

  const transition = useMemo(
    () => ({
      type: 'spring' as const,
      delay,
    }),
    [delay]
  );

  const style = useMemo(() => tw`${className ?? ''}`, [className]);

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isFocus ? 1 : 0,
        scale: isFocus ? 1 : 0.8,
      }}
      transition={transition}
      style={style}>
      {children}
    </MotiView>
  );
};

export default memo(FadeIn);
