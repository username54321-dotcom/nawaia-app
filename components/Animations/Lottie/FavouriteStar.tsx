import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dotlottie, DotLottie, Mode } from '@lottiefiles/dotlottie-react-native';
import { Pressable } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { useIsFirstRender } from '@uidotdev/usehooks';
import { supabaseClient } from '~/utils/supabase';

interface propTypes {
  isFavourite: boolean;
  courseID: number;
}

const FavouriteStar = ({ isFavourite, courseID }: propTypes) => {
  const QueryClient = useQueryClient();
  const firstRender = useIsFirstRender();
  const source = useMemo(() => require('assets/lottie/Favourite app icon.lottie'), []);
  const iconRef = useRef<Dotlottie>(null);
  const [iconLoaded, setIconLoaded] = useState(false);
  const visibleState = useRef(false);
  const handlePress = async () => {
    const isPlaying = await iconRef.current?.isPlaying();
    if (visibleState.current && !isPlaying) {
      iconRef.current?.setFrame(1);
      visibleState.current = false;
      await supabaseClient
        .from('user_favourites')
        .upsert({ course_id: courseID, is_favourite: false }, { onConflict: 'user_id, course_id' });
      return;
    }
    if (!visibleState.current) {
      iconRef.current?.setFrame(1);
      iconRef.current?.play();
      visibleState.current = true;
      await supabaseClient
        .from('user_favourites')
        .upsert({ course_id: courseID, is_favourite: true }, { onConflict: 'user_id, course_id' });
      return;
    }
  };

  // Initial Animation State on Page Mount
  useEffect(() => {
    async function effect() {
      const isPlaying = await iconRef.current?.isPlaying();
      // if isFavourite
      if (isFavourite && iconLoaded && iconRef.current && !isPlaying) {
        iconRef.current.setFrame(60);
        visibleState.current = true;
      }
      // if not Favourited
      if (!isFavourite && iconLoaded && iconRef.current && !isPlaying) {
        iconRef.current.setFrame(1);
        visibleState.current = false;
      }
    }
    effect();
  }, [iconLoaded, isFavourite]);

  return (
    <Pressable
      onPress={handlePress}
      className={` flex size-8 items-center justify-center overflow-hidden `}>
      <DotLottie
        onLoad={() => setIconLoaded(true)}
        ref={iconRef}
        source={source}
        style={style.lottie}></DotLottie>
    </Pressable>
  );
};

export default memo(FavouriteStar);

const iconScale = 1.7;
const style = { lottie: { width: 77 * iconScale, height: 32 * iconScale } };
