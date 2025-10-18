import { View, Text } from 'react-native';

import Background from '~/components/Background';
import MySkeleton from './../../../components/MySkeleton';

const Books = () => {
  return (
    <>
      <Background>
        <View className="h-48 w-full"></View>
        <MySkeleton className="h-12 w-full"></MySkeleton>
      </Background>
    </>
  );
};

export default Books;
