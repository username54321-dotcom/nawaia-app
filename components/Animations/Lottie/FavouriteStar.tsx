import { useMemo } from 'react';
import { DotLottie } from '@lottiefiles/dotlottie-react-native';
import { View } from 'moti';

const FavouriteStar = () => {
  const source = useMemo(() => require('assets/lottie/Favourite app icon.lottie'), []);
  return (
    <>
      <View className="size-fit border-2">
        <DotLottie source={source} style={style.lotie}></DotLottie>
      </View>
    </>
  );
};

export default FavouriteStar;

const style = { lotie: { width: 200, height: 100 } };
