import { useEffect, useMemo, useRef, useState } from 'react';
import { Dotlottie, DotLottie } from '@lottiefiles/dotlottie-react-native';
import { Pressable } from 'react-native';

interface propTypes {
  isFavourite: boolean;
}

const FavouriteStar = ({ isFavourite }: propTypes) => {
  console.log('rendered');
  const source = useMemo(() => require('assets/lottie/Favourite app icon.lottie'), []);
  const ref = useRef<Dotlottie>(null);
  const [state, setState] = useState<boolean>(isFavourite);
  const handlePress = async () => {
    if (!state) {
      ref.current?.play();
      setState(true);
      return;
    }
    ref.current?.setFrame(0);
    setState(false);
  };

  return (
    <Pressable
      onPress={handlePress}
      className={`transition-all duration-300 ${state ? ' scale-125' : ''}`}>
      {/* <View className="absolute -z-10 flex size-full items-center justify-center ">
        <View className="size-10 items-center justify-center rounded-full  bg-neutral-300/50"></View>
      </View> */}
      <DotLottie ref={ref} source={source} style={style.lotie}></DotLottie>
    </Pressable>
  );
};

export default FavouriteStar;

const style = { lotie: { width: 165, height: 75 } };
