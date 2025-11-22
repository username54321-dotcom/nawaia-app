import Background from '~/components/Background';
import { memo } from 'react';
import BookList from '~/components/Books/BookList';
import { addDummyBook } from '~/HelperFunctions/addDummyBook';
import { Pressable } from 'react-native';

const Books = () => {
  const handleOnPress = async () => {
    try {
      await addDummyBook();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Background>
      <Pressable onPress={handleOnPress} className="size-12 bg-red-500"></Pressable>
      <BookList></BookList>
    </Background>
  );
};

export default memo(Books);
