import { memo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { supabaseClient } from '~/utils/supabase';

interface propTypes {
  isPublished: boolean;
  table: 'courses' | 'lessons' | 'chapters' | 'links';
  id: number;
  refetch: () => void;
}

const AdminPublishButton = ({ id, isPublished, table, refetch }: propTypes) => {
  const handlePublish = async () => {
    const { data, error } = await supabaseClient
      .from(table)
      .update({ id: id, published: !isPublished })
      .eq('id', id);
    refetch();
  };
  return (
    <Pressable
      onPress={handlePublish}
      className={`m-2 size-fit rounded-md p-2 ${isPublished ? 'bg-green-600' : 'bg-red-600'} `}>
      <Text className=" font-bold text-white">{isPublished ? 'Published' : 'UnPublished'}</Text>
    </Pressable>
  );
};

export default memo(AdminPublishButton);
