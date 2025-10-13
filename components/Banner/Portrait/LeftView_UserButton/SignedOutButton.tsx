import { Pressable, Text, View } from 'react-native';
import { User } from 'lucide-react-native';
import { useNavigation, useRouter } from 'expo-router';

const SignedOutButton = () => {
  const router = useRouter();
  const SignInPage = () => {
    router.push('/(drawer)/(Pages)/Courses');
  };
  return (
    <Pressable onPress={SignInPage} className=" ">
      <User
        className=" min-h-fit min-w-fit rounded-xl border-[0.5px] border-black bg-white p-2 shadow-sm shadow-slate-400 "
        size={24}
        strokeWidth={2}
        strokeOpacity={0.7}
        color={'#BE1E2D'}></User>
      <View className="flex-justify-center absolute right-[-5] top-[-5] size-5 items-center rounded-full border-2  border-red-500 bg-yellow-400 ">
        <Text className="font-bold">!</Text>
      </View>
    </Pressable>
  );
};

export default SignedOutButton;
