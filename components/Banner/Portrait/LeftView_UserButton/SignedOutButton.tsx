import { View } from 'react-native';
import { User } from 'lucide-react-native';

const SignedOutButton = () => {
  return (
    <View className="w-[16%] ">
      <User
        className="m-4 min-h-fit min-w-fit rounded-xl border-[0.5px] border-black bg-white p-2 shadow-sm shadow-slate-400 "
        size={24}
        strokeWidth={2}
        strokeOpacity={0.7}
        color={'#BE1E2D'}></User>
    </View>
  );
};

export default SignedOutButton;
