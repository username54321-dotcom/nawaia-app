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
        {' '}
        <View style={tw`size-48 bg-black`}></View>{' '}
      </Background>
    </>
  );
};

export default Books;
