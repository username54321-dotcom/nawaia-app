import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { supabaseClient } from '~/utils/supabase';

interface propTypes {
  liveValue: string;
  table: 'courses' | 'lessons' | 'chapters' | 'links';
  id: number;
  fieldName: string;
  refetch: () => void;
}

const AdminUpdateField = ({ liveValue, table, id, fieldName, refetch }: propTypes) => {
  const [visibleValue, setVisibleValue] = useState(liveValue);
  const handleUpdate = async () => {
    const { data: error } = await supabaseClient
      .from(table)
      .update({ [fieldName]: visibleValue, id: id })
      .eq('id', id);
    refetch();
  };
  useEffect(() => {
    setVisibleValue(liveValue);
  }, [liveValue]);
  return (
    <View className="m-2 my-1  w-full flex-row items-center justify-between rounded-md  p-2 ">
      <View className="m-2 h-full w-2/5 flex-col justify-between ">
        <Text className="font-bold">{fieldName}</Text>
        <TextInput
          multiline={true}
          value={visibleValue}
          onChangeText={setVisibleValue}
          className=" h-full rounded-sm border-2 bg-slate-100 p-2"></TextInput>
      </View>

      <View className="w-2/5 p-2">
        <Text className="text-lg font-semibold">{'Live Value: '}</Text>
        <Text className=" text-wra text-base">{liveValue}</Text>
      </View>
      <View className="w-1/5 items-center justify-center">
        <Pressable onPress={handleUpdate} className="  size-fit rounded-lg bg-red-500 px-6 py-2 ">
          <Text className="  font-bold text-white">Update</Text>
        </Pressable>
      </View>
      <View className="  absolute bottom-0 w-full place-self-end border-[1px]"></View>
    </View>
  );
};

export default AdminUpdateField;
