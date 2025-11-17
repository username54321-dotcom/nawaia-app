import { View, Text, Pressable, Linking } from 'react-native';
import Background from '~/components/Background';
import { DotLottie } from '@lottiefiles/dotlottie-react-native';

import { RenderHTML } from 'react-native-render-html';
import { useQueryGetPublicAssets } from '~/HelperFunctions/Queries/GetPublicAssests';
import FadeIn from '~/components/Animations/FadeIn';

const Booking = () => {
  const { data } = useQueryGetPublicAssets();
  return (
    <Background>
      <View className=" flex-col items-center justify-start">
        {data && (
          <>
            <View className="my-4 w-5/6   lg:w-2/3 xl:w-1/2">
              <FadeIn>
                <RenderHTML source={{ html: data.booking_page ?? '' }}></RenderHTML>
              </FadeIn>
            </View>
          </>
        )}
      </View>
      <View className=" items-center justify-center">
        <Pressable
          onPress={() => Linking.openURL('https://wa.me/971589235048')}
          className="group my-6 h-12 flex-row items-center justify-center rounded-full border-[1px] border-neutral-700 bg-neutral-200 pr-6 transition-all duration-200  hover:bg-neutral-600">
          <View className=" absolute left-0 -translate-x-10">
            <DotLottie
              autoplay={true}
              useFrameInterpolation={true}
              loop={true}
              source={require('~/assets/lottie/whatsapp loop.lottie')}
              style={{ width: 100, height: 100 }}></DotLottie>
          </View>
          <Text className="ml-10 font-Kufi text-xl font-semibold text-neutral-800 transition-all duration-200 group-hover:text-neutral-200">
            أحجز أستشارتك{' '}
          </Text>
        </Pressable>
      </View>
    </Background>
  );
};

export default Booking;
