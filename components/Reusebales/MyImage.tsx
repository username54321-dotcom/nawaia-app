import tw from 'twrnc';
import { View, Image, ImageProps } from 'react-native';
import ProgressBarInline from './../Animations/Lottie/ProgressBarInline';

type MyImageProps = ImageProps & {
  className?: string; // For the container View
  imageClassName?: string; // For the Image itself (currently unused)
  percentCompleted?: number;
};

const MyImage = ({ className, percentCompleted, ...props }: MyImageProps) => {
  return (
    <View style={tw`${className || ''} overflow-hidden`}>
      <Image
        style={{ width: '100%', height: '100%' }}
        accessibilityLabel={props.accessibilityLabel}
        alt={props.accessibilityLabel} // Explicitly passing alt for web if possible, though accessibilityLabel should handle it
        {...props}></Image>
      {!!percentCompleted && (
        <View className="absolute bottom-0 w-full">
          <ProgressBarInline percentCompleted={percentCompleted}></ProgressBarInline>
        </View>
      )}
    </View>
  );
};

export default MyImage;
