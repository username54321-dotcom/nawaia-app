import { ScrollView, View } from 'react-native';
import { supabaseClient } from '~/utils/supabase';

import { memo } from 'react';
import CourseCard from '../Reusebales/CourseCard';
import { useFocusEffect } from 'expo-router';
import { useQueryGetBookList } from '~/HelperFunctions/Queries/GetBookList';
import BookCard from '../Reusebales/BookCard';

const BookList = () => {
  //Main Query
  const { data: bookList, refetch } = useQueryGetBookList();

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
  return (
    bookList && (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-center">
          {bookList
            .sort((a, b) => b.id - a.id)
            ?.map((itemBook, index) => (
              <BookCard key={index} bookItem={itemBook}></BookCard>
            ))}
        </View>
      </ScrollView>
    )
  );
};

export default memo(BookList);
