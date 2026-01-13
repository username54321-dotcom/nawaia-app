import { useQueryClient } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import { Text, Pressable } from 'react-native';
import { Database } from '~/utils/database.types';
import { supabaseClient } from '~/utils/supabase';

interface propTypes {
  isPublished: boolean;
  table: keyof Database['public']['Tables'];

  id: number;
  refetch?: () => void;
}

const AdminPublishButton = ({ id, isPublished, table, refetch }: propTypes) => {
  // refactor problem
  const handlePublish = useCallback(async () => {
    const isPublishedObject =
      table === 'books' ? { published: !isPublished } : { is_published: !isPublished };
    const { data: success } = await supabaseClient
      .from(table)
      .update({ id: id, ...isPublishedObject })
      .eq('id', id)
      .select();
    if (success && refetch) {
      refetch();
    }
  }, [isPublished, id, table, refetch]);
  return (
    <Pressable
      role="button"
      accessibilityLabel={isPublished ? 'Unpublish' : 'Publish'}
      onPress={handlePublish}
      className={`m-2 size-fit rounded-md p-2 ${isPublished ? 'bg-green-600' : 'bg-red-600'} `}>
      <Text className=" font-bold text-white">{isPublished ? 'Published' : 'UnPublished'}</Text>
    </Pressable>
  );
};

export default memo(AdminPublishButton);
