import { View, Text, Pressable } from 'react-native';
import { useCallback } from 'react';
import useAdminOnly from '~/HelperFunctions/Hooks/AdminOnly';
import Background from '~/components/Background';
import { ListUsers } from '~/HelperFunctions/Queries/ListUsers';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';

const Admin_GiveAccess = () => {
  useAdminOnly();
  const { data, refetch } = ListUsers();
  const router = useRouter();
  const handleNav = useCallback((userId: string) => {
    router.navigate({ pathname: '/Admin_EditUser', params: { userId: userId } });
  }, []);
  return (
    <Background>
      <View className="mx-auto mt-6 w-full border-2 lg:w-2/3 xl:w-1/2">
        <FlashList
          data={data?.filter((i) => !i.is_admin)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item: user }) => (
            <>
              <Pressable
                onPress={() => handleNav(user.user_id ?? '')}
                className="m-2  mx-6 gap-2 rounded-xl border-2 bg-neutral-300 px-4 py-2 transition-all duration-300 hover:scale-105 ">
                <Text className="font-Kufi">أسم المستخدم : {user.user_name}</Text>
                <Text className="font-Kufi">البريد الالكتروني : {user.email}</Text>
                <Text className="font-Kufi">رقم الهاتف : {user.phone_number}</Text>
                <Text className="font-Kufi"> معتمد : {user.is_approved?.toString()}</Text>
                <Text className=" font-Kufi">نوعية الأشتراك : {user.memebership}</Text>
              </Pressable>
            </>
          )}></FlashList>
      </View>
    </Background>
  );
};

export default Admin_GiveAccess;
