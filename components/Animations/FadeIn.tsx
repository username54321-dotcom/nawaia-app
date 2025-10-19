import React from 'react';
import { MotiView } from 'moti';
import { useIsFocused } from '@react-navigation/native';
import randomItem from 'random-item';

type FadeInProps = {
  className?: string;
  children?: React.ReactNode;
};

const FadeIn = ({ className, children }: FadeInProps) => {
  const isFocused = useIsFocused() ? 'focused' : 'blurred';
  const number = randomItem([100, 150, 200]);
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: [1], scale: [1.03, 1] }}
      transition={{ duration: 250, type: 'timing', delay: number }}
      key={isFocused}
      className={className}>
      {children}
    </MotiView>
  );
};

export default FadeIn;
