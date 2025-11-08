import { View } from 'react-native';
import { useEffect } from 'react';
import Background from '~/components/Background';
import { MotiView, useAnimationState } from 'moti';
import { style } from 'twrnc';

const Test = ({ show }: { show: boolean }) => {
  const animation = useAnimationState({
    hide: { scaleX: 0 },
    show: { scaleX: 1 },
  });
  useEffect(() => {
    show && animation.transitionTo('show');
    !show && animation.transitionTo('hide');
  });
  return (
    <Background>
      <MotiView style={style('absolute right-0', { transformOrigin: 'right' })} state={animation}>
        <View className="h-96 w-[30vw]  bg-blue-400"></View>
      </MotiView>
    </Background>
  );
};

export default Test;
