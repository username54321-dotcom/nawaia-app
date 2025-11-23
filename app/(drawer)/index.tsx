import Background from './../../components/Background';
import { View } from 'react-native';
import FadeIn from './../../components/Animations/FadeIn';
import { memo } from 'react';

import { RenderHTML } from 'react-native-render-html';
import { useQueryGetPublicAssets } from '~/HelperFunctions/Queries/GetPublicAssests';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';

const Home = () => {
  // Public Assets Query
  const { data, isLoading } = useQueryGetPublicAssets();

  return (
    <Background>
      {/** Loading Indicator */}

      <>
        <LoadingAnimation show={isLoading}></LoadingAnimation>
      </>

      <FadeIn>
        <View className="flex-1 flex-col items-center justify-start">
          {data && (
            <>
              <View className="my-4 w-5/6   lg:w-2/3 xl:w-1/2">
                <RenderHTML source={{ html: data.home_page ?? '' }}></RenderHTML>
              </View>
            </>
          )}
        </View>
      </FadeIn>
    </Background>
  );
};

export default memo(Home);
