import { motify } from 'moti';
import { ComponentProps } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

const MotifiedView = motify(View)();

type MyViewProps = ComponentProps<typeof MotifiedView> & {
  className?: string;
};

const MyView = ({ children, style, className, ...props }: MyViewProps) => {
  return (
    <MotifiedView className={className} style={[tw.style(className || ''), style]} {...props}>
      {children}
    </MotifiedView>
  );
};

export default MyView;
