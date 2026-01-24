import { View } from 'react-native';
import Background from '~/components/Background';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';
import FadeIn from '~/components/Animations/FadeIn';
import RenderHTML from 'react-native-render-html';
import { useQueryGetPublicAssets } from '~/HelperFunctions/Queries/GetPublicAssests';
import Head from 'expo-router/head';
import { useTranslation } from 'react-i18next';

const BoutUs = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useQueryGetPublicAssets();
  return (
    <Background>
      <Head>
        <title>{t('about_us_title')}</title>
        <meta name="description" content={t('about_us_desc')} />
        <meta name="keywords" content={t('about_us_keywords')} />
        <link rel="canonical" href="https://nawaia.net/about-us" />
        <meta property="og:title" content={t('about_us_title')} />
        <meta property="og:description" content={t('about_us_desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nawaia.net/about-us" />
        <meta property="og:image" content="https://nawaia.net/favicon.png" />
        <meta name="twitter:title" content={t('about_us_title')} />
        <meta name="twitter:description" content={t('about_us_desc')} />
      </Head>
      <View className=" flex-col items-center justify-start">
        {/** Loading Indicator */}
        <LoadingAnimation show={isLoading}></LoadingAnimation>
        {data && (
          <>
            <View className="my-4 w-5/6   lg:w-2/3 xl:w-1/2">
              <FadeIn>
                <RenderHTML source={{ html: data.about_us_page_content ?? '' }}></RenderHTML>
              </FadeIn>
            </View>
          </>
        )}
      </View>
      <View className=" items-center justify-center"></View>
    </Background>
  );
};

export default BoutUs;
