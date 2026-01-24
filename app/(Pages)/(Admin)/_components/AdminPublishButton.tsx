import { useMutation } from '@tanstack/react-query';
import { memo } from 'react';
import { Text, Pressable, ActivityIndicator } from 'react-native';
import { Database } from '~/utils/database.types';
import { supabaseClient } from '~/utils/supabase';
import { useTranslation } from 'react-i18next';

interface propTypes {
  isPublished: boolean;
  table: keyof Database['public']['Tables'];

  id: number;
  refetch?: () => void;
}

const AdminPublishButton = ({ id, isPublished, table, refetch }: propTypes) => {
  const { t } = useTranslation();

  const { mutate: togglePublish, isPending } = useMutation({
    mutationKey: ['togglePublish', table, id],
    mutationFn: async () => {
      const isPublishedObject =
        table === 'books' ? { published: !isPublished } : { is_published: !isPublished };
      const { error } = await supabaseClient
        .from(table)
        .update({ id: id, ...isPublishedObject })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      refetch && refetch();
    },
  });

  return (
    <Pressable
      role="button"
      accessibilityLabel={isPublished ? 'Unpublish' : 'Publish'}
      onPress={() => togglePublish()}
      disabled={isPending}
      className={`m-2 size-fit rounded-md p-2 ${isPublished ? 'bg-green-600' : 'bg-red-600'} `}>
      {isPending ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text selectable={false} className=" font-bold text-white">
          {isPublished ? t('published') : t('unpublished')}
        </Text>
      )}
    </Pressable>
  );
};

export default memo(AdminPublishButton);
