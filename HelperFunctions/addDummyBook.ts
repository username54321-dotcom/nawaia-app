import { supabaseClient } from '~/utils/supabase';

export const addDummyBook = async () => {
  // Create Book Row
  const { data: bookData } = await supabaseClient
    .from('books')
    .insert({
      book_name: 'أسم الكتاب_',
      cover_image:
        'https://www.shutterstock.com/image-vector/blank-image-photo-placeholder-icon-600nw-2501054919.jpg',
      short_description: ' الوصف القصير_',
      price: 999,
      long_description:
        'الوصف الطويل_Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      duration: 'ست ساعات',
      genre: 'Books',
    })
    .select()
    .single();
  //insert Book Link
  if (bookData) {
    const {} = await supabaseClient
      .from('book_links')
      .insert({ book_id: bookData?.id, book_link: 'https://example.com' });
  }
};
