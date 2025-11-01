import React, { memo, ReactNode, useEffect, useState } from 'react';
import { MotiView, useAnimationState } from 'moti';
import { View } from 'react-native';
import tw from 'twrnc';

interface propTypes {
  children: ReactNode;
  className?: string;
  expandProp?: boolean;
}

const MyAccordion = ({ children, className, expandProp }: propTypes) => {
  const [ExpandedHeight, setExpandedHeight] = useState(0);

  //Animation State
  const animationState = useAnimationState({
    collapse: { height: 0 },
    expand: { height: ExpandedHeight },
  });

  // Handle Animation
  useEffect(() => {
    if (expandProp) {
      animationState.transitionTo('expand');
    } else {
      animationState.transitionTo('collapse');
    }
  }, [expandProp, animationState, ExpandedHeight]);
  return (
    <>
      <View className={` ${className}`}>
        <MotiView state={animationState} style={tw.style([`overflow-hidden `])}>
          <View onLayout={(e) => setExpandedHeight(e.nativeEvent.layout.height)}>{children}</View>
        </MotiView>
      </View>
    </>
  );
};

export default memo(MyAccordion);
