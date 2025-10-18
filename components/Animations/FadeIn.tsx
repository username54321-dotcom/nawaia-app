import React from 'react';
import { MotiView } from 'moti';
import { useIsFocused } from '@react-navigation/native';

type FadeInProps = {
  className?: string;
  children?: React.ReactNode;
};

const FadeIn = ({ className, children }: FadeInProps) => {
  const isFocused = useIsFocused() ? 'focused' : 'blurred';

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      key={isFocused}
      className={className}>
      {children}
    </MotiView>
  );
};

export default FadeIn;
