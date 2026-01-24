import { memo, useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { Database } from '~/utils/database.types';
import { supabaseClient } from '~/utils/supabase';

// PropTypes
interface propTypes {
  liveValue: string | undefined | null;
  table: keyof Database['public']['Tables'];
  id: number | undefined;
  fieldName: string;
  refetch?: () => void;
  label: string;
}

const AdminUpdateField = ({ liveValue, table, id, fieldName, refetch, label }: propTypes) => {
  // Dont Touch
  const [visibleValue, setVisibleValue] = useState(liveValue);

  // Update Value mutation
  const { mutate: updateField, isPending } = useMutation({
    mutationKey: ['updateField', table, id, fieldName],
    mutationFn: async () => {
      const { error } = await supabaseClient
        .from(table)
        .update({ [fieldName]: visibleValue })
        .eq('id', id ?? 99999);
      if (error) throw error;
    },
    onSuccess: () => {
      refetch && refetch();
    },
  });

  // Dont Touch
  useEffect(() => {
    setVisibleValue(liveValue);
  }, [liveValue]);
  return (
    // Main Container
    <View className="m-2 my-1  w-full flex-row-reverse items-center rounded-md  p-2 ">
      <View className="w-full flex-1   p-2">
        <Text className="mb-2 mr-2 self-end font-Kufi text-base font-semibold">{label}</Text>
        <View className="flex-1 flex-row-reverse justify-between  gap-2 ">
          {/** live value container */}

          <View className="  w-2/5 flex-1 rounded-md border-[1px] bg-slate-500">
            <Text className=" p-2 text-right  text-slate-50">{liveValue}</Text>
          </View>
          {/**Text Input */}
          <TextInput
            multiline={true}
            value={visibleValue ?? ''}
            onChangeText={setVisibleValue}
            className=" w-2/5 flex-1 rounded-md border-[1px] bg-slate-100 p-2"></TextInput>
          {/**Update Button */}
          <Pressable
            onPress={() => updateField()}
            disabled={isPending}
            className=" mr-auto size-fit self-center rounded-lg bg-red-500 px-6 py-2 ">
            {isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text selectable={false} className="  font-bold text-white">
                Update
              </Text>
            )}
          </Pressable>
          {}
        </View>
      </View>

      <View className="  absolute bottom-[0] w-full place-self-end border-t-[1px]"></View>
    </View>
  );
};

export default memo(AdminUpdateField);
