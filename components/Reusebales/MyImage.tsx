import { Image, ImageProps } from 'expo-image';
import { MotiView } from 'moti';
import { ComponentProps, memo } from 'react';
import tw from 'twrnc';
import { View } from 'react-native';
import ProgressBarInline from './../Animations/Lottie/ProgressBarInline';

type MyImageProps = Omit<ImageProps, 'className'> & {
  className?: string; // For the container MotiView
  imageClassName?: string; // For the Image itself
  motiProps?: ComponentProps<typeof MotiView>;
  percentCompleted?: number;
};

const MyImage1 = ({ className, percentCompleted, ...imageProps }: MyImageProps) => {
  return (
    <MotiView style={tw`${className || ''} overflow-hidden`}>
      <Image
        style={{ width: '100%', height: '100%' }}
        cachePolicy={'memory-disk'}
        {...imageProps}></Image>
      {percentCompleted && (
        <View className="absolute bottom-0 w-full">
          <ProgressBarInline percentCompleted={percentCompleted ?? 0}></ProgressBarInline>
        </View>
      )}
    </MotiView>
  );
};

export default memo(MyImage1);
