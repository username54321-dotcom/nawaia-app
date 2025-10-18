import { View, Text, BackHandler } from 'react-native';
import Background from '~/components/Background';
import FadeIn from './../../../components/Animations/FadeIn';

const About = () => {
  return (
    <Background>
      <FadeIn>
        <View className="h-96 w-full bg-black"></View>
        <View className="h-96 w-full bg-white"></View>
        <View className="h-96 w-full bg-black"></View>
        <View className="h-96 w-full bg-white"></View>
        <View className="h-96 w-full bg-black"></View>
      </FadeIn>
    </Background>
  );
};

export default About;
