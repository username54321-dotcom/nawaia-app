import Background from './../../components/Background';
import FlashList from './../../components/Home/FlashList';
import { ScrollView } from 'react-native';
import CourseList from './../../components/Home/FlashList';

export default function Home() {
  return (
    <>
      <Background>
        <CourseList></CourseList>
      </Background>
    </>
  );
}
