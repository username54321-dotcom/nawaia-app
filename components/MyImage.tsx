import { Image, ImageProps } from 'expo-image';
import { MotiView } from 'moti';
import { ComponentProps } from 'react';
import tw from 'twrnc';

type MyImageProps = Omit<ImageProps, 'className'> & {
  className?: string; // For the container MotiView
  imageClassName?: string; // For the Image itself
  motiProps?: ComponentProps<typeof MotiView>;
};

const MyImage1 = ({ className, ...imageProps }: MyImageProps) => {
  return (
    <MotiView style={tw`${className}`}>
      <Image {...imageProps} />
    </MotiView>
  );
};

export default MyImage1;
