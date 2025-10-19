import React from 'react';
import { MotiView } from 'moti';
import { useIsFocused } from '@react-navigation/native';
import randomItem from 'random-item';

type FadeInProps = {
  className?: string;
  children?: React.ReactNode;
};

const FadeIn = ({ className, children }: FadeInProps) => {
  const number = randomItem([1.02, 1.03, 1.04]);
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: [1], scale: [number, 1] }}
      transition={{ duration: 200, type: 'timing' }}
      // key={isFocused}
      className={className}>
      {children}
    </MotiView>
  );
};

export default FadeIn;
