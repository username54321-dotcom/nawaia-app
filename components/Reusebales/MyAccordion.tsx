import React, { memo, ReactNode, useEffect, useState } from 'react';
import { MotiView, useAnimationState } from 'moti';
import { View, Pressable } from 'react-native';
import tw from 'twrnc';
import { ChevronDown, ChevronsDown, ChevronsUp } from 'lucide-react-native';

interface propTypes {
  children: ReactNode;
  className?: string;
  expandProp?: boolean;
}

const MyAccordion = ({ children, className, expandProp }: propTypes) => {
  const [ExpandedHeight, setExpandedHeight] = useState(0);
  const [IsExpand, setIsExpand] = useState(false);

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
  }, [expandProp, animationState]);
  return (
    <>
      <View className={` ${className}`}>
        <MotiView state={animationState} style={[tw`overflow-hidden  `]}>
          <View onLayout={(e) => setExpandedHeight(e.nativeEvent.layout.height)}>{children}</View>
        </MotiView>
      </View>
    </>
  );
};

export default MyAccordion;
