import { memo, useCallback } from 'react';
import { Text, Pressable } from 'react-native';
import { supabaseClient } from '~/utils/supabase';

interface propTypes {
  isPublished: boolean;
  table: 'courses' | 'lessons' | 'chapters' | 'links' | 'books';
  id: number;
}

const AdminPublishButton = ({ id, isPublished, table }: propTypes) => {
  // refactor problem
  const handlePublish = useCallback(async () => {
    const isPublishedObject =
      table === 'books' ? { is_published: !isPublished } : { published: !isPublished };
    const {} = await supabaseClient
      .from(table)
      .update({ id: id, ...isPublishedObject })
      .eq('id', id);
  }, [isPublished, id, table]);
  return (
    <Pressable
      onPress={handlePublish}
      className={`m-2 size-fit rounded-md p-2 ${isPublished ? 'bg-green-600' : 'bg-red-600'} `}>
      <Text className=" font-bold text-white">{isPublished ? 'Published' : 'UnPublished'}</Text>
    </Pressable>
  );
};

export default memo(AdminPublishButton);
