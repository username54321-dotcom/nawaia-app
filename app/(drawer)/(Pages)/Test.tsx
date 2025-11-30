import Background from '~/components/Background';

import { Pressable, TextInput, View } from 'react-native';
import { supabaseClient } from '~/utils/supabase';
import { useRef } from 'react';

const Test = () => {
  const emailInput = useRef('');
  const handleReset = async () => {
    console.log(emailInput.current);
    const data = await supabaseClient.auth.resetPasswordForEmail(emailInput.current, {
      redirectTo: 'http://localhost:8081/ResetPassword',
    });
    console.log(data);
  };
  return (
    <Background>
      <View className="flex-1 items-center justify-center">
        <TextInput
          onChangeText={(v) => (emailInput.current = v)}
          className="h-12 w-20 border-2"></TextInput>
        <Pressable onPress={handleReset} className="size-12 border-2 bg-red-500"></Pressable>
      </View>
    </Background>
  );
};

export default Test;
