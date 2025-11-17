import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as router from 'expo-router';
import { Database, Tables, TablesInsert } from '~/utils/database.types';

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
        pathname: '/Admin_EditAssetsPage',
        params: { table: table, id: id, fieldName: fieldName, label: label },
      });
    },
    [nav]
  );
  return (
    <View className="my-4 flex-row  flex-wrap items-center justify-center">
      <TouchableOpacity
        onPress={() =>
          handleNavigate({
            table: 'public_assets',
            id: 1,
            fieldName: 'home_page',
            label: 'الصفحة الرئيسية',
          })
        }
        className="mx-2 rounded-md bg-blue-500 p-4">
        <Text className="font-Kufi font-semibold text-blue-50">تعديل الصفحة الرئيسية</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleNavigate({
            table: 'public_assets',
            id: 1,
            fieldName: 'booking_page',
            label: 'صفحة حجز الاستشارة',
          })
        }
        className="mx-2 rounded-md bg-blue-500 p-4">
        <Text className="font-Kufi font-semibold text-blue-50">تعديل صفحة حجز الاستشارة</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Admin_EditAssestsComponent;
