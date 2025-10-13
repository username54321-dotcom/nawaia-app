import { useIsPortrait } from '../../../utils/Hooks';
import PortraitBanner from '../../../components/Banner/Portrait/PortraitBanner';
import LandscapeBanner from '../../../components/Banner/Landscape/LandscapeBanner';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { supabaseClient } from '~/utils/supabase';

function Courses() {
  const [Email, SetEmail] = useState('');
  const [Password, SetPassword] = useState('');
  const [SiPassword, SetSiPassword] = useState('');
  const [SiEmail, SetSiEmail] = useState('');
  const signUp = async () => {
    const { data, error } = await supabaseClient.auth.signUp({ email: Email, password: Password });
    error ? alert(error) : alert('Success');
  };
  const signIn = async () => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: SiEmail,
      password: SiPassword,
    });
    error ? alert('error : ' + JSON.stringify(error)) : alert('success: ' + JSON.stringify(data));
  };
  return (
    <>
      {useIsPortrait() ? <PortraitBanner /> : <LandscapeBanner />}
      <TextInput
        placeholder="Enter Email"
        onChangeText={(text) => SetEmail(text)}
        className="mx-14 mt-14 h-10 rounded-xl border-[1px] border-black bg-slate-300 px-4 font-semibold "></TextInput>

      <TextInput
        secureTextEntry={true}
        placeholder="Enter Password"
        onChangeText={(text) => SetPassword(text)}
        className="mx-14 mt-14 h-10 rounded-xl border-[1px] border-black bg-slate-300 px-4 font-semibold "></TextInput>

      <Pressable
        onPress={() => signUp()}
        className="m-10 mx-auto flex h-10 w-28 items-center justify-center rounded-xl border bg-green-600 ">
        <Text className=" font-bold text-slate-200">Sign Up</Text>
      </Pressable>
      {/*sadjaspidjaopsidjapsdjoa8*/}

      <TextInput
        placeholder="Enter Email"
        onChangeText={(text) => SetSiEmail(text)}
        className="mx-14 mt-14 h-10 rounded-xl border-[1px] border-black bg-slate-300 px-4 font-semibold "></TextInput>

      <TextInput
        secureTextEntry={true}
        placeholder="Enter Password"
        onChangeText={(text) => SetSiPassword(text)}
        className="mx-14 mt-14 h-10 rounded-xl border-[1px] border-black bg-slate-300 px-4 font-semibold "></TextInput>

      <Pressable
        onPress={() => signIn()}
        className="m-10 mx-auto flex h-10 w-28 items-center justify-center rounded-xl border bg-green-600 ">
        <Text className="m-4 font-bold text-slate-200">Sign In</Text>
      </Pressable>
    </>
  );
}

export default Courses;
