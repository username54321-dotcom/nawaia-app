import Background from './../../components/Background';
import { Text, View } from 'react-native';
import FadeIn from './../../components/Animations/FadeIn';
import { memo } from 'react';
import MyDrawer from './../../components/MyDrawer/MyDrawer';

const Home = () => {
  return (
    <View className="flex-1">
      <Background>
        <FadeIn>
          <Text className="m-2 mb-0 font-Playwrite text-2xl">Example Title</Text>
          <Text className="m-4 font-Playwrite">'Lorem ipsum dolor sit amet...'</Text>
        </FadeIn>
      </Background>
    </View>
  );
};

export default memo(Home);
