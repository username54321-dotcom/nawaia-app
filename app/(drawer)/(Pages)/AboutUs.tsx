import { View } from 'react-native';
import Background from '~/components/Background';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';
import FadeIn from '~/components/Animations/FadeIn';
import RenderHTML from 'react-native-render-html';
import { useQueryGetPublicAssets } from '~/HelperFunctions/Queries/GetPublicAssests';
import Head from 'expo-router/head';

const BoutUs = () => {
  const { data, isLoading } = useQueryGetPublicAssets();
  return (
    <Background>
      <Head>
        <title>About Us | Nawaia</title>
        <meta name="description" content="Learn more about Nawaia and our mission." />
        <meta property="og:title" content="About Us | Nawaia" />
        <meta property="og:description" content="Learn more about Nawaia and our mission." />
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
