import Background from '~/components/Background';

import { Pressable, TextInput, View } from 'react-native';
import { supabaseClient } from '~/utils/supabase';
import { useRef } from 'react';

const Test = () => {
  return (
    <Background>
      <Pressable
        className=" size-12 "
        onPress={async () => {
          const data = await supabaseClient.auth.getUser();
        }}></Pressable>
    </Background>
  );
};

export default Test;
