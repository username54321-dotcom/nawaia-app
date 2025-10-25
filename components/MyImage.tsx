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
  const key = Math.random();
  return (
    <MotiView key={key} style={tw`${className || ''} overflow-hidden`}>
      <Image style={{ width: '100%', height: '100%' }} key={key} {...imageProps} />
    </MotiView>
  );
};

export default MyImage1;
