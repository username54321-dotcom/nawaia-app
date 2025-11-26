import { View } from 'react-native';
import { useEffect, useRef } from 'react';
import { VideoView, useVideoPlayer } from 'expo-video';
import { supabaseClient } from '~/utils/supabase';
import { useQueryClient } from '@tanstack/react-query';

type propTypes = {
  link: string;
  lessonId: number;
  isCompleted: boolean;
};

const VideoModal = ({ link, lessonId, isCompleted }: propTypes) => {
  const queryClient = useQueryClient();
  const player = useVideoPlayer(link, (player) => {
    player.timeUpdateEventInterval = 1000;
    player.muted = true;
  });
  const playerRef = useRef<VideoView>(null);
  const didLoad = useRef(false);
  const didSeek = useRef(false);

  // Save Progress on Pause
  useEffect(() => {
    const playEventListener = player.addListener(
      'playingChange',
      async ({ isPlaying, oldIsPlaying }) => {
        if (!isPlaying && oldIsPlaying) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          !isPlaying &&
            oldIsPlaying &&
            (await supabaseClient
              .from('video_progress')
              .upsert(
                { timestamp: +player.currentTime.toFixed(0), lesson_id: lessonId },
                { onConflict: 'user_id,lesson_id' }
              ));
        }
      }
    );
    return () => {
      playEventListener.remove();
    };
  }, [player, lessonId]);

  // Set Video Watched on 90%
  useEffect(() => {
    const interval = setInterval(async () => {
      const duration = player.duration;
      const timestamp = player.currentTime;
      const is90percent = timestamp / duration >= 0.9;
      if (is90percent && !isCompleted) {
        await supabaseClient
          .from('lesson_completed')
          .insert({ is_completed: true, lesson_id: lessonId });
        queryClient.invalidateQueries({ queryKey: ['Public Courses List'] });
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isCompleted, queryClient]);

  const handleOnFirstFrame = async () => {
    didLoad.current = true;
    const { data, error } = await supabaseClient
      .from('video_progress')
      .select('timestamp')
      .eq('lesson_id', lessonId)
      .single();
    player.seekBy(data?.timestamp ?? 0);
    player.play();
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

  return (
    <View
      className={` } aspect-video self-center 
    border-2
    `}>
      <VideoView
        ref={playerRef}
        allowsFullscreen={true}
        allowsPictureInPicture={true}
        startsPictureInPictureAutomatically={false}
        onFirstFrameRender={handleOnFirstFrame}
        contentFit="fill"
        player={player}></VideoView>
    </View>
  );
};

export default VideoModal;
