import { MotiView } from 'moti';
import { ComponentProps } from 'react';
import { Pressable } from 'react-native';

import tw from 'twrnc';

type MyViewProps = ComponentProps<typeof MotiView> & {
  className?: string;
};

const MyView = ({ children, style, className, ...props }: MyViewProps) => {
  return (
    <Pressable>
      <MotiView style={[tw.style(className, ' flex-shrink'), style]} {...props}>
        {children}
      </MotiView>
    </Pressable>
  );
};

export default MyView;
