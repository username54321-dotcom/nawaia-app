import Background from './../../components/Background';
import FlashList from './../../components/Home/FlashList';
import { ScrollView, Text } from 'react-native';
import CourseList from './../../components/Home/FlashList';
import MyCarousal from './../../components/Carousal';
import { View } from 'lucide-react-native';

export default function Home() {
  return (
    <>
      <Background>
        <MyCarousal className="p-10  font-semibold"></MyCarousal>
        <Text className="font-Playwrite m-2 mb-0 text-2xl">Example Title</Text>
        <Text className="font-Playwrite m-4">
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque animi quis, ut at quaerat
          itaque explicabo libero? Vitae sunt sit odio atque dolore dicta fugit! Quos sed minus
          delectus maxime!'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque animi
          quis, ut at quaerat itaque explicabo libero? Vitae sunt sit odio atque dolore dicta fugit!
          Quos sed minus delectus maxime!'Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Cumque animi quis, ut at quaerat itaque explicabo libero? Vitae sunt sit odio atque dolore
          dicta fugit! Quos sed minus delectus maxime!
        </Text>

        <CourseList></CourseList>
      </Background>
    </>
  );
}
