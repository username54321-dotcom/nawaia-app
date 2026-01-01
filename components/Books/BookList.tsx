import { ScrollView, View } from 'react-native';
import { supabaseClient } from '~/utils/supabase';

import { memo, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useQueryGetBookList } from '~/HelperFunctions/Queries/GetBookList';
import BookCard from '../Reusebales/BookCard';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';
import { FlashList } from '@shopify/flash-list';

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
  const [contWidth, setContWidth] = useState(0);
  const colNum = Math.floor(contWidth / 375) > 3 ? 3 : Math.floor(contWidth / 375);

  return (
    <>
      {/** Loading Indicator */}
      <LoadingAnimation show={isLoading}></LoadingAnimation>

      {bookList && (
        <>
          <View
            onLayout={(e) => setContWidth(e.nativeEvent.layout.width)}
            className="mx-auto w-[90%] md:w-2/3 ">
            <FlashList
              numColumns={colNum}
              data={bookList.sort((a, b) => b.id - a.id)}
              renderItem={({ item, index }) => (
                <BookCard key={index} bookItem={item}></BookCard>
              )}></FlashList>
          </View>
        </>
      )}
    </>
  );
};

export default memo(BookList);
