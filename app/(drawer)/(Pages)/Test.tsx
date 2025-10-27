import { View, Text, Pressable } from 'react-native';
import React from 'react';
import Background from '~/components/Background';
import { supabaseClient } from '~/utils/supabase';

const test = () => {
  return (
    <Background>
      <View className="flex-1 items-center justify-center">
        <Pressable
          onPress={async () => await supabaseClient.from('test').insert({})}
          className="size-14   bg-green-700"></Pressable>
      </View>
    </Background>
  );
};

export default test;
