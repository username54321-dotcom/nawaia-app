import { View, Text, Pressable } from 'react-native';
import { useCallback } from 'react';
import useAdminOnly from '~/HelperFunctions/Hooks/AdminOnly';
import Background from '~/components/Background';
import { ListUsers } from '~/HelperFunctions/Queries/ListUsers';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useIsPortrait } from '~/utils/Hooks';

const Admin_GiveAccess = () => {
  useAdminOnly();
  const isPortrait = useIsPortrait();
  const { data, refetch } = ListUsers();
  const router = useRouter();
  const handleNav = useCallback(
    (userId: string) => {
      router.navigate({ pathname: '/admin-edit-user', params: { userId: userId } });
    },
    [router]
  );
  return (
    <Background>
      <View className="rootContainer">
        <FlashList
          data={data?.filter((i) => !i.is_admin)}
          keyExtractor={(item) => item.id.toString()}
          numColumns={isPortrait ? 1 : 3}
          renderItem={({ item: user }) => (
            <>
              <Pressable
                onPress={() => handleNav(user.user_id ?? '')}
                className="bg-card-bg m-2 w-fit gap-2 rounded-lg border-thin border-colorThin py-6 transition-all duration-300 hover:bg-highlighted ">
                <Text className="defaultText">أسم المستخدم : {user.user_name}</Text>
                <Text className="defaultText">البريد الالكتروني : {user.email}</Text>
                <Text className="defaultText">رقم الهاتف : {user.phone_number}</Text>
                <Text className="defaultText">معتمد : {user.is_approved?.toString()}</Text>
                <Text className="defaultText">شريحة الأشتراك : {user.tier}</Text>
              </Pressable>
            </>
          )}></FlashList>
      </View>
    </Background>
  );
};

export default Admin_GiveAccess;
