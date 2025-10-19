import { MotiView } from 'moti';
import { ComponentProps } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import tw from 'twrnc';

type MyViewProps = Omit<ComponentProps<typeof MotiView>, 'style'> & {
  className?: string;
  style?: StyleProp<ViewStyle>;
};

const MyView = ({ children, className, ...props }: MyViewProps) => {
  return (
    <MotiView style={tw`${className || ''}`} {...props}>
      {children}
    </MotiView>
  );
};

export default MyView;
