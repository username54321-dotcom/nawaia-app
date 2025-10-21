import { View, Text, Pressable } from 'react-native';

import Background from '~/components/Background';
import { AnimatePresence, MotiView } from 'moti';
import { useState } from 'react';
import tw from 'twrnc';

const Books = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      <Background>
        <View className="size-24 bg-black"></View>
      </Background>
    </>
  );
};

export default Books;
