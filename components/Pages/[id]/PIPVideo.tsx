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
  const didSeek = useRef(false);
  const triggerCount = useRef(0);
  const updateTimeStamp = () => {
    triggerCount.current += 1;
    console.log('updated ' + triggerCount.current);
  };
  const playEventListener = player.addListener(
    'playingChange',
    async ({ isPlaying, oldIsPlaying }) =>
      !isPlaying &&
      oldIsPlaying &&
      (await supabaseClient
        .from('video_progress')
        .upsert(
          { lesson_id: lessonId, timestamp: player.currentTime.toFixed(0) },
          { onConflict: 'user_id,lesson_id' }
        ))
  );

  const handleOnFirstFrame = async () => {
    playerRef.current?.startPictureInPicture();
    didLoad.current = true;
    const { data, error } = await supabaseClient
      .from('video_progress')
      .select('timestamp')
      .eq('lesson_id', lessonId)
      .single();
    console.log(data);
    player.seekBy(data?.timestamp ?? 0);
    didSeek.current = true;
  };
  //Interval sendTimestamp
  useEffect(() => {
    const interval = setInterval(async () => {
      if (didLoad) {
        const currentTimeStamp = +player.currentTime.toFixed(0);
        const { data, error } = await supabaseClient
          .from('video_progress')
          .upsert(
            { lesson_id: lessonId, timestamp: currentTimeStamp },
            { onConflict: 'user_id,lesson_id' }
          );
      }
    }, 30 * 1000);
    return () => {
      clearInterval(interval);
      player.release();
    };
  }, [player, lessonId]);

  //Triggered Timestamp

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
