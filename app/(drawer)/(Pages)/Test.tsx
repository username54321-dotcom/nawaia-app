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
      <Pressable
        className="size-12 bg-red-500"
        onPress={async () => {
          console.time();
          const data = await await supabaseClient.functions.invoke('verifyIsAdmin', {
            body: { uuid: 'sasa' },
          });
          console.timeEnd();
          console.log(data);
        }}></Pressable>
    </Background>
  );
};

export default Test;
