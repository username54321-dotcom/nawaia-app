import { memo, useCallback, useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { FlashList } from '@shopify/flash-list';

import { supabaseClient } from '~/utils/supabase';
import { useQueryGetBookList } from '~/HelperFunctions/Queries/GetBookList';
import BookCard from '../Reusebales/BookCard';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';

const BookList = () => {
  //Main Query
  const { data: bookList, refetch, isLoading } = useQueryGetBookList();

  //Real Time
  useFocusEffect(() => {
    const channel = supabaseClient.channel('refetch courses');
    channel
      .on('postgres_changes', { event: '*', schema: 'public', table: 'books' }, () => {
        refetch();
      })
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  });

  const [contWidth, setContWidth] = useState(() => Dimensions.get('window').width);
  const colNum = useMemo(
    () => (Math.floor(contWidth / 375) > 3 ? 3 : Math.floor(contWidth / 375)),
    [contWidth]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => <BookCard key={index} bookItem={item} />,
    []
  );

  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  return (
    <>
      {/** Loading Indicator */}
      <LoadingAnimation show={isLoading} />

      {bookList && (
        <View
          onLayout={(e) => setContWidth(e.nativeEvent.layout.width)}
          className="mx-auto w-[90%] md:w-2/3 ">
          <FlashList
            numColumns={colNum}
            data={bookList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </View>
      )}
    </>
  );
};

export default memo(BookList);
