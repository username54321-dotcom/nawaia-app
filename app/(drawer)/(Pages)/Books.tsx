import { View, Text, Pressable } from 'react-native';

import Background from '~/components/Background';
import { AnimatePresence, MotiView } from 'moti';
import { useState } from 'react';

const Books = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      <Background>
        <AnimatePresence>
          {toggle && (
            <MotiView
              key={1111}
              exit={{ opacity: 0.2 }}
              exitTransition={{ type: 'timing', duration: 1000 }}>
              <View className="h-12 w-28 bg-blue-500"></View>
            </MotiView>
          )}
          <MotiView>
            <Pressable
              onPress={() => setToggle(!toggle)}
              className="m-20 h-12 w-28 bg-green-500 "></Pressable>
          </MotiView>
        </AnimatePresence>
      </Background>
    </>
  );
};

export default Books;
