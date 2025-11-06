import { View, Pressable } from 'react-native';
import { useVideoPlayer } from 'expo-video/build/VideoPlayer.web';
import { useEffect, useRef } from 'react';
import { VideoView } from 'expo-video';
import { supabaseClient } from '~/utils/supabase';

type propTypes = {
  link: string;
  lessonId: number;
};

const VideoModal = ({ link, lessonId }: propTypes) => {
  const player = useVideoPlayer({ uri: link });
  const playerRef = useRef<VideoView>(null);
  const didLoad = useRef(false);
  const triggerCount = useRef(0);
  const updateTimeStamp = () => {
    triggerCount.current += 1;
  };
  const playEventListener = player.addListener(
    'playingChange',
    ({ isPlaying }) => !isPlaying && updateTimeStamp()
  );

  const handleOnFirstFrame = () => {
    playerRef.current?.startPictureInPicture();
    didLoad.current = true;
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (didLoad) {
        const currentTimeStamp = +player.currentTime.toFixed(0);
        const { data, error } = await supabaseClient
          .from('video_progress')
          .upsert(
            { lesson_id: lessonId, timstamp: currentTimeStamp },
            { onConflict: 'user_id,lesson_id' }
          );
      }
    }, 100000);
    return () => {
      clearInterval(interval);
      player.release();
    };
  }, [player, lessonId, triggerCount]);
  return (
    <View className="aspect-video self-center border-2">
      <VideoView
        ref={playerRef}
        allowsPictureInPicture={true}
        startsPictureInPictureAutomatically={true}
        onFirstFrameRender={handleOnFirstFrame}
        contentFit="fill"
        player={player}></VideoView>
    </View>
  );
};

export default VideoModal;
