import Background from '~/components/Background';
import { memo } from 'react';
import BookList from '~/components/Books/BookList';

const Books = () => {
  return (
    <Background>
      <BookList></BookList>
    </Background>
  );
};

export default memo(Books);
