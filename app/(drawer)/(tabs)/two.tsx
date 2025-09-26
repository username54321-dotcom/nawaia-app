import { Stack } from 'expo-router';

import { View, TextInput } from 'react-native';

export default function Home() {
  return (
    <>
      <View className="flex-1 bg-red-300">
        <TextInput className="h-12 w-24 border-2 border-black"></TextInput>
      </View>
    </>
  );
}
