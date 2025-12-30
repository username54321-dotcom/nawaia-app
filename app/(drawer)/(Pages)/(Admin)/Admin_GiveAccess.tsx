import { View, Text, Pressable } from 'react-native';
import { useCallback } from 'react';
import useAdminOnly from '~/HelperFunctions/Hooks/AdminOnly';
import Background from '~/components/Background';
import { ListUsers } from '~/HelperFunctions/Queries/ListUsers';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { useIsPortrait } from '~/utils/Hooks';

const Admin_GiveAccess = () => {
  useAdminOnly();
  const isPortrait = useIsPortrait();
  const { data, refetch } = ListUsers();
  const router = useRouter();
  const handleNav = useCallback(
    (userId: string) => {
      router.navigate({ pathname: '/Admin_EditUser', params: { userId: userId } });
    },
    [router]
  );
  return (
    <Background>
      <View className=" w-perc90 h- self-center p-6 lg:w-2/3 xl:w-1/2">
        <FlashList
          data={data?.filter((i) => !i.is_admin)}
          keyExtractor={(item) => item.id.toString()}
          numColumns={isPortrait ? 2 : 3}
          renderItem={({ item: user }) => (
            <>
              <Pressable
                onPress={() => handleNav(user.user_id ?? '')}
                className="border-thin border-colorThin bg-card-bg hover:bg-highlighted mx-2 w-fit gap-2 rounded-lg py-6 transition-all duration-300 ">
                <Text className="text-main  px-6 font-Kufi">أسم المستخدم : {user.user_name}</Text>
                <Text className="text-main  px-6 font-Kufi">البريد الالكتروني : {user.email}</Text>
                <Text className="text-main  px-6 font-Kufi">رقم الهاتف : {user.phone_number}</Text>
                <Text className="text-main  px-6 font-Kufi">
                  معتمد : {user.is_approved?.toString()}
                </Text>
                <Text className=" text-main  px-6 font-Kufi">
                  نوعية الأشتراك : {user.memebership}
                </Text>
              </Pressable>
            </>
          )}></FlashList>
      </View>
    </Background>
  );
};

export default Admin_GiveAccess;
