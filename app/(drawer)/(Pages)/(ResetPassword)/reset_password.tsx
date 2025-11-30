import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Background from '~/components/Background';
import { supabaseClient } from '~/utils/supabase';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ResetPassword = () => {
  const params = useLocalSearchParams()['#'];
  const router = useRouter();

  const passwordInput = useRef('');

  // Get Access token and sign in to supabase
  useEffect(() => {
    async function effect() {
      if (params) {
        const hash = new URLSearchParams(params.toString());
        const access_token = hash.get('access_token');
        const refresh_token = hash.get('refresh_token');
        if (access_token && refresh_token) {
          const data = await supabaseClient.auth.setSession({
            access_token: access_token,
            refresh_token: refresh_token,
          });
        }
      } else {
        router.push('/');
      }
    }
    effect();
  }, [params, router]);
  return (
    <Background>
      <TextInput
        className="w-30 h-12 border-2"
        onChangeText={(v) => (passwordInput.current = v)}></TextInput>
      <Pressable
        className="size-12 bg-blue-500"
        onPress={async () => {
          const data = await supabaseClient.auth.updateUser({ password: passwordInput.current });
          console.log(data);
        }}></Pressable>
    </Background>
  );
};

export default ResetPassword;
