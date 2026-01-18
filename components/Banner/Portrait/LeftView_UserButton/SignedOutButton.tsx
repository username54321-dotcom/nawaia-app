import { Pressable, View } from 'react-native';
import { User } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useIsAuth, useIsAuthType } from '~/store/store';
import { memo } from 'react';

const SignedOutButton = () => {
  const isAuth = useIsAuth((state: useIsAuthType) => state.isAuth);

  return (
    <Link asChild href={'/account'}>
      <Pressable role="link" accessibilityLabel="Account Page">
        <View className="size-fit rounded-md p-1">
          <User size={28} strokeWidth={2} strokeOpacity={1} color={'#BE1E2D'}></User>
        </View>
        {!isAuth ? (
          <>
            <View className=" flex-justify-center absolute  right-[-5] top-[-5] z-10 size-3 items-center rounded-full     bg-yellow-500   "></View>
            <View className="flex-justify-center absolute right-[-5]   top-[-5] size-3 animate-ping-slow-interval items-center rounded-full  border-2  border-yellow-500 bg-yellow-500 "></View>
          </>
        ) : (
          <View className="flex-justify-center absolute right-[-5] top-[-5] size-3  items-center rounded-full border-green-500 bg-green-400  "></View>
        )}
      </Pressable>
    </Link>
  );
};

export default memo(SignedOutButton);
