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
  //   const userInput = useRef('');
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
    <View className="size-fit flex-row items-center justify-center ">
      <Text>{fieldName}</Text>
      <TextInput
        multiline={true}
        value={visibleValue}
        onChangeText={setVisibleValue}
        className="m-2 h-12  rounded-xl border-2 p-2"></TextInput>
      <Pressable onPress={handleUpdate} className="m-2 size-fit rounded-lg bg-red-500 p-2">
        <Text className="  font-bold text-white">Update</Text>
      </Pressable>
      <View>
        <Text>{'Live Value: '}</Text>
        <Text className="max-w-[350px] text-wrap">{liveValue}</Text>
      </View>
    </View>
  );
};

export default AdminUpdateField;
