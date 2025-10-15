import { Pressable, Text, View } from 'react-native';
import { User } from 'lucide-react-native';
import { useNavigation, useRouter } from 'expo-router';
import { supabaseClient } from '~/utils/supabase';
import { useAuthStore } from '~/store/store';
import { SafeAreaView } from './../../../../node_modules/moti/build/components/safe-area-view';

const SignedOutButton = () => {
  const { isAuth } = useAuthStore();
  const router = useRouter();
  const SignInPage = () => {
    router.push('/(drawer)/(Pages)/Courses');
  };
  return (
    <Pressable onPress={SignInPage} className=" ">
      <User
        className=" min-h-fit min-w-fit rounded-xl   p-2  shadow-slate-400 "
        size={30}
        strokeWidth={2}
        strokeOpacity={1}
        color={'#BE1E2D'}></User>
      {!isAuth ? (
        <>
          <View className="flex-justify-center absolute right-[-5] top-[-5] size-5   items-center  rounded-full border-2 border-red-500 bg-yellow-600 ">
            <Text className=" font-bold">!</Text>
          </View>
          <View className="flex-justify-center absolute right-[-5] top-[-5] size-5 animate-ping items-center rounded-full  border-2 border-red-500 bg-yellow-600 ">
            <Text className=" font-bold">!</Text>
          </View>
        </>
      ) : (
        <View className="flex-justify-center absolute right-[-5] top-[-5] size-5  items-center rounded-full border-green-500 bg-green-400  "></View>
      )}
    </Pressable>
  );
};

export default SignedOutButton;
