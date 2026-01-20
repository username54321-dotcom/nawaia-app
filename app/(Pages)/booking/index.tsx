import { View } from 'react-native';
import Background from '~/components/Background';

import { RenderHTML } from 'react-native-render-html';
import { useQueryGetPublicAssets } from '~/HelperFunctions/Queries/GetPublicAssests';
import FadeIn from '~/components/Animations/FadeIn';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';
import ContactWhatsApp from '~/components/ContactWhatsApp';
import Head from 'expo-router/head';

import { useTranslation } from 'react-i18next';

const Booking = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useQueryGetPublicAssets();
  return (
    <Background>
      <Head>
        <title>{t('booking_title')}</title>
        <meta name="description" content={t('booking_desc')} />
        <link rel="canonical" href="https://nawaia.net/booking" />
        <meta property="og:title" content={t('booking_title')} />
        <meta property="og:description" content={t('booking_desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nawaia.net/booking" />
        <meta property="og:image" content="https://nawaia.net/favicon.png" />
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
      <ContactWhatsApp className="self-center" message="أحجز أستشارتك الآن"></ContactWhatsApp>
    </Background>
  );
};

export default Booking;
