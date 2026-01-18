import { View, Text, Pressable, Linking } from 'react-native';
import { DotLottie } from '@lottiefiles/dotlottie-react-native';
import { useState } from 'react';

type Props = {
  message: string;
  className?: string;
};

const ContactWhatsApp = ({ message, className }: Props) => {
  const [showAnim, setShowAnim] = useState(false);

  return (
    <View className={className ?? ''}>
      <Pressable
        role="link"
        accessibilityLabel="Contact via WhatsApp"
        onLayout={() => setShowAnim(true)}
        onPress={() => Linking.openURL('https://wa.me/971589235048')}
        className="group my-6 h-12 flex-row items-center justify-center rounded-full border-[1px] border-neutral-700 bg-neutral-200 pr-6 transition-all duration-200  hover:bg-neutral-600">
        <View className=" absolute left-0 -translate-x-10">
          {showAnim && (
            <DotLottie
              autoplay={true}
              useFrameInterpolation={true}
              loop={true}
              source={require('~/assets/lottie/whatsapp loop.lottie')}
              style={{ width: 100, height: 100 }}></DotLottie>
          )}
        </View>

        <Text className="ml-14 font-Kufi text-xl font-semibold text-neutral-800 transition-all duration-200 group-hover:text-neutral-200">
          {message}
        </Text>
      </Pressable>
    </View>
  );
};

export default ContactWhatsApp;
