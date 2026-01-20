import Background from '~/components/Background';
import Head from 'expo-router/head';
import { Dimensions, View } from 'react-native';
import FadeIn from '~/components/Animations/FadeIn';
import { memo } from 'react';

import { RenderHTML } from 'react-native-render-html';
import { useQueryGetPublicAssets } from '~/HelperFunctions/Queries/GetPublicAssests';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';

import { LanguageSwitcher } from '~/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  // Public Assets Query
  const { data, isLoading } = useQueryGetPublicAssets();

  return (
    <Background>
      <Head>
        <title>{t('home_title')}</title>
        <meta name="description" content={t('meta_description')} />
        <link rel="canonical" href="https://nawaia.net/" />
        <meta property="og:title" content={t('home_title')} />
        <meta property="og:description" content={t('meta_description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nawaia.net/" />
        <meta property="og:image" content="https://nawaia.net/favicon.png" />
      </Head>
      {/* * Loading Indicator */}
      <LoadingAnimation show={isLoading}></LoadingAnimation>
      <View className="flex-1 flex-col items-center justify-start">
        <View className="absolute right-5 top-12 z-50">
          <LanguageSwitcher />
        </View>
        {data && (
          <>
            <View className="my-4 w-5/6   lg:w-2/3 xl:w-1/2">
              <FadeIn>
                <RenderHTML
                  source={{ html: data.home_page ?? '' }}
                  contentWidth={Dimensions.get('window').width}></RenderHTML>
              </FadeIn>
            </View>
          </>
        )}
      </View>
    </Background>
  );
};

export default memo(Home);
