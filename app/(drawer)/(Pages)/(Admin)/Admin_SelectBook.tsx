import { View, Text, Pressable } from 'react-native';
import { memo, useCallback, useState } from 'react';
import { supabaseClient } from '~/utils/supabase';
import Background from '~/components/Background';
import FadeIn from '~/components/Animations/FadeIn';
import AdminPublishButton from '../../../../components/Pages/AdminPage/AdminPublishButton';
import { Plus, Trash2 } from 'lucide-react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import MyImage1 from '~/components/Reusebales/MyImage';
import useAdminOnly from '~/HelperFunctions/Hooks/AdminOnly';
import { useQueryGetBookList } from '~/HelperFunctions/Queries/GetBookList';
import { addDummyBook } from '~/HelperFunctions/addDummyBook';

const Admin_SelectBook = () => {
  const router = useRouter();

  useAdminOnly();

  //Main Query
  const { data: bookList, refetch } = useQueryGetBookList();

  //Delete a Book
  const handleDelete = useCallback(async (id: number) => {
    await supabaseClient.from('books').delete().eq('id', id);
  }, []);

  //Prevent Double Adding Courses
  const [cantAdd, setCantAdd] = useState(false);

  // Add a Dummy Course
  const handleAddDummyBook = useCallback(async () => {
    setCantAdd(true);
    await addDummyBook();
    refetch();
    setCantAdd(false);
  }, [refetch]);

  //Navigate to edit page
  const handleEditBook = useCallback(
    (id: number) => {
      router.navigate({ pathname: '/Admin_EditBook', params: { id: id } });
    },
    [router]
  );

  // RealTime
  useFocusEffect(() => {
    const channel = supabaseClient.channel('realtime select book');
    channel
      .on('postgres_changes', { event: '*', table: 'books', schema: 'public' }, () => refetch())
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  });

  return (
    <Background>
      {bookList && (
        <View className="flex-1 flex-row flex-wrap items-center justify-center">
          {bookList
            .sort((a, b) => a.id - b.id)
            .map((item_book, index) => {
              return (
                <View key={index}>
                  <FadeIn>
                    {/** Main Container */}
                    <View className="   m-4 size-fit max-w-fit flex-col items-center   justify-start rounded-2xl bg-neutral-200 shadow-md shadow-slate-400">
                      {/** Cover_Image */}
                      <MyImage1
                        className="m-2 rounded-b-md rounded-t-2xl  shadow-md shadow-neutral-300"
                        source={{ uri: item_book.cover_image }}
                        style={{ aspectRatio: 1, width: 350, height: 350 }}></MyImage1>
                      {/** Book Title */}
                      <View className=" w-full  shrink-0">
                        <Text className="m-2 mr-4 self-end font-Kufi  text-2xl font-bold text-slate-700">
                          {item_book.book_name}
                        </Text>
                        {/** Book Short Description */}
                        <Text className="  mb-4 mt-1 line-clamp-2 h-12 max-w-[345px] self-end pl-2 pr-[12px] text-right  font-Kufi text-sm font-semibold text-slate-500 ">
                          {item_book.short_description}
                        </Text>
                        {/** Delete Edit Publish Container */}
                        <View className="size-fit w-full flex-row items-center justify-between ">
                          {/**Delete Button */}

                          <Pressable
                            onLongPress={() => handleDelete(item_book.id)}
                            delayLongPress={7000}
                            className="m-2 size-fit rounded-md bg-red-500 p-2 active:scale-105">
                            <Trash2 color={'white'} />
                          </Pressable>
                          {/**Edit Course */}
                          <Pressable
                            onPress={() => handleEditBook(item_book.id)}
                            className="items-center justify-center rounded-md bg-blue-500">
                            <Text className="px-6 py-2 text-xl font-semibold text-white">Edit</Text>
                          </Pressable>
                          {/**Publish Button */}
                          <AdminPublishButton
                            id={item_book.id}
                            isPublished={item_book.is_published}
                            table="books"></AdminPublishButton>
                        </View>
                      </View>
                    </View>
                  </FadeIn>
                </View>
              );
            })}
          {/**Add a new course */}
          <Pressable
            disabled={cantAdd}
            onPress={handleAddDummyBook}
            className={`m-4 size-24 items-center justify-center rounded-full bg-blue-500 ${cantAdd && 'bg-red-500'}`}>
            <Plus size={50} color={'white'} />
          </Pressable>
        </View>
      )}
    </Background>
  );
};

export default memo(Admin_SelectBook);
