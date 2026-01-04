import { MotiView } from 'moti';
import { ComponentProps, memo } from 'react';
import tw from 'twrnc';
import { View, Image } from 'react-native';
import ProgressBarInline from './../Animations/Lottie/ProgressBarInline';

type MyImageProps = Omit<typeof Image, 'className'> & {
  className?: string; // For the container MotiView
  imageClassName?: string; // For the Image itself
  percentCompleted?: number;
};

const MyImage = ({ className, percentCompleted, ...props }: MyImageProps) => {
  return (
    <View style={tw`${className || ''} overflow-hidden`}>
      <Image style={{ width: '100%', height: '100%' }} {...props}></Image>
      {!!percentCompleted && (
        <View className="absolute bottom-0 w-full">
          <ProgressBarInline percentCompleted={percentCompleted}></ProgressBarInline>
        </View>
      )}
    </View>
  );
};

export default MyImage;
