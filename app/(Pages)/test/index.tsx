import Background from '~/components/Background';

import { Pressable, TextInput, View } from 'react-native';
import { supabaseClient } from '~/utils/supabase';
import { useRef } from 'react';
import Head from 'expo-router/head';

const Test = () => {
  return (
    <Background>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Pressable
        className=" size-12 "
        onPress={async () => {
          const data = await supabaseClient.auth.getUser();
        }}></Pressable>
    </Background>
  );
};

export default Test;
