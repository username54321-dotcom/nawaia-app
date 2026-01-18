import { View, Text, Pressable, Linking } from 'react-native';
import Background from '~/components/Background';
import { DotLottie } from '@lottiefiles/dotlottie-react-native';

import { RenderHTML } from 'react-native-render-html';
import { useQueryGetPublicAssets } from '~/HelperFunctions/Queries/GetPublicAssests';
import FadeIn from '~/components/Animations/FadeIn';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';
import ContactWhatsApp from './../../../components/ContactWhatsApp';
import Head from 'expo-router/head';

const Booking = () => {
  const { data, isLoading } = useQueryGetPublicAssets();
  return (
    <Background>
      <Head>
        <title>Booking | Nawaia</title>
        <meta name="description" content="Book your consultation now." />
        <meta property="og:title" content="Booking | Nawaia" />
        <meta property="og:description" content="Book your consultation now." />
      </Head>
      <View className=" flex-col items-center justify-start">
        {/** Loading Indicator */}
        <LoadingAnimation show={isLoading}></LoadingAnimation>
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
      <ContactWhatsApp message="أحجز أستشارتك الآن"></ContactWhatsApp>
    </Background>
  );
};

export default Booking;
