import { Href, router, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';

//handleNavigateTypes
export interface navTypes {
  table: string;
  id: number;
  fieldName: string;
  label: string;
}

const Admin_EditAssestsComponent = () => {
  const nav = useRouter();
  const handleNavigate = useCallback(
    ({ table, id, fieldName, label }: navTypes) => {
      nav.navigate({
        pathname: '/admin-edit-assets-page',
        params: { table: table, id: id, fieldName: fieldName, label: label },
      });
    },
    [nav]
  );
  const simpleNav = useCallback((path: Href) => {
    router.push(path);
  }, []);
  return (
    <View className="m-4 flex-row  flex-wrap items-center justify-center">
      <Pressable
        onPress={() =>
          handleNavigate({
            table: 'public_assets',
            id: 1,
            fieldName: 'home_page',
            label: 'الصفحة الرئيسية',
          })
        }
        className="m-2 rounded-md bg-blue-500 p-4">
        <Text selectable={false} className="font-Kufi font-semibold text-blue-50">
          تعديل الصفحة الرئيسية
        </Text>
      </Pressable>
      <Pressable
        onPress={() =>
          handleNavigate({
            table: 'public_assets',
            id: 1,
            fieldName: 'booking_page',
            label: 'صفحة حجز الاستشارة',
          })
        }
        className="m-2 rounded-md bg-blue-500 p-4">
        <Text selectable={false} className="font-Kufi font-semibold text-blue-50">
          تعديل صفحة حجز الاستشارة
        </Text>
      </Pressable>
      <Pressable
        onPress={() =>
          handleNavigate({
            table: 'public_assets',
            id: 1,
            fieldName: 'about_us_page_content',
            label: 'صفحة من نحن ؟ ',
          })
        }
        className="m-2 rounded-md bg-blue-500 p-4">
        <Text selectable={false} className="font-Kufi font-semibold text-blue-50">
          تعديل صفحة من نحن ؟
        </Text>
      </Pressable>
      <Pressable
        onPress={() => simpleNav('/admin-select-book')}
        className="m-2 rounded-md bg-blue-500 p-4">
        <Text selectable={false} className="font-Kufi font-semibold text-blue-50">
          تعديل الكتب
        </Text>
      </Pressable>{' '}
      <Pressable
        onPress={() => simpleNav('/admin-select-course')}
        className="m-2 rounded-md bg-blue-500 p-4">
        <Text selectable={false} className="font-Kufi font-semibold text-blue-50">
          تعديل الدورات
        </Text>
      </Pressable>
      <Pressable
        onPress={() => simpleNav('/admin-give-access')}
        className="m-2 rounded-md bg-red-500 p-4">
        <Text selectable={false} className="font-Kufi font-semibold text-blue-50">
          منح الأذونات
        </Text>
      </Pressable>
    </View>
  );
};

export default Admin_EditAssestsComponent;
