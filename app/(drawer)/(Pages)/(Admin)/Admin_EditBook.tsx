import Background from '~/components/Background';
import { Text, View } from 'react-native';
import AdminUpdateField from '../../../../components/Pages/AdminPage/AdminUpdateField';
import AdminPublishButton from '../../../../components/Pages/AdminPage/AdminPublishButton';
import { useLocalSearchParams } from 'expo-router';
import { memo } from 'react';
import FadeIn from '~/components/Animations/FadeIn';
import MyAccordion from '~/components/Reusebales/MyAccordion';
import useAdminOnly from '~/HelperFunctions/Hooks/AdminOnly';
import { useQueryGetBook } from '~/HelperFunctions/Queries/GetBook';

const Admin_EditBook = () => {
  useAdminOnly(); // Admin Only
  const { id }: { id: string } = useLocalSearchParams();

  // Main Query
  const { data: book, refetch } = useQueryGetBook(+id);

  return (
    <Background>
      {book && (
        <FadeIn>
          <MyAccordion expandProp={true}>
            <View className="flex-1 flex-col items-center">
              {/** Publish Button */}
              <AdminPublishButton
                refetch={refetch}
                id={book.id}
                isPublished={book.is_published}
                table="books"></AdminPublishButton>
              {/**Main Container */}
              <View className=" w-[95%] flex-col items-center  rounded-lg bg-slate-300 p-4">
                <Text className="mb-4 rounded-xl bg-slate-500 p-4 font-Kufi text-2xl font-extrabold text-slate-100 underline underline-offset-4">
                  {book.book_name}
                </Text>
                {/** Book Title ( non- Editable ) */}
                <Text className="m-2 mr-4 place-self-end font-Kufi text-2xl font-semibold">
                  البيانات الرئيسية
                </Text>
                <AdminUpdateField
                  label="عنوان الكتاب"
                  fieldName="book_name"
                  id={book.id}
                  table="books"
                  liveValue={book.book_name}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  label="رابط التليجرام"
                  fieldName="telegram_link"
                  id={book.book_links[0].id}
                  table="book_links"
                  liveValue={book.book_links[0].telegram_link}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  label="رابط صورة الكتاب"
                  fieldName="image"
                  id={book.id}
                  table="books"
                  liveValue={book.cover_image}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  label="الوصف القصير"
                  fieldName="short_description"
                  id={book.id}
                  table="books"
                  liveValue={book.short_description}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  label="الوصف الطويل"
                  fieldName="long_description"
                  id={book.id}
                  table="books"
                  liveValue={book.long_description}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  label="سعر الكتاب (0 = مجاني)"
                  fieldName="price"
                  id={book.id}
                  table="books"
                  liveValue={book.price?.toString()}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  label="مدة الكتاب"
                  fieldName="duration"
                  id={book.id}
                  table="books"
                  liveValue={book.duration}
                  refetch={refetch}></AdminUpdateField>
                <AdminUpdateField
                  label="تصنيف الكتاب"
                  fieldName="genre"
                  id={book.id}
                  table="books"
                  liveValue={book.genre}
                  refetch={refetch}></AdminUpdateField>
              </View>
            </View>
          </MyAccordion>
        </FadeIn>
      )}
    </Background>
  );
};

export default memo(Admin_EditBook);
