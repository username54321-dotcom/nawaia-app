import { MotiView, useAnimationState, View } from 'moti';
import { ChevronDown } from 'lucide-react-native';
import { style } from 'twrnc';
import { Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import tw from 'twrnc';

const RotatingChevron = ({ className, onPress }: { className?: string; onPress?: () => void }) => {
  const [collapsed, setCollapsed] = useState(true);
  const handleOnPress = () => {
    onPress && onPress();
    setCollapsed((v) => !v);
  };
  //Arrow Animation
  const arrowAnimation = useAnimationState({
    collapsed: { rotate: '0deg' },
    expanded: { rotate: '180deg' },
  });
  //Animation Handling
  useEffect(() => {
    collapsed && arrowAnimation.transitionTo('collapsed');
    !collapsed && arrowAnimation.transitionTo('expanded');
  });
  return (
    <MotiView state={arrowAnimation} style={style(className)}>
      <Pressable className="p2" onPress={handleOnPress}>
        <ChevronDown color={tw.color('red-700')}></ChevronDown>
      </Pressable>
    </MotiView>
  );
};

export default RotatingChevron;
