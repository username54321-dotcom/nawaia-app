import { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';

import { VideoView, useVideoPlayer } from 'expo-video';
import tw from 'twrnc';

import { useQueryClient } from '@tanstack/react-query';

import { supabaseClient } from '~/utils/supabase';

const COMPLETION_THRESHOLD = 0.9;
const PROGRESS_SAVE_INTERVAL_MS = 30_000;
const PAUSE_DEBOUNCE_MS = 1000;

type PIPVideoProps = {
  link: string;
  lessonId: number;
  isCompleted: boolean;
  courseId: number | null;
};

const PIPVideo = ({ link, lessonId, isCompleted, courseId }: PIPVideoProps) => {
  const queryClient = useQueryClient();
  const playerRef = useRef<VideoView>(null);
  const hasLoadedRef = useRef(false);

  const player = useVideoPlayer(link, (p) => {
    p.timeUpdateEventInterval = 1000;
    p.muted = true;
  });

  const saveProgress = useCallback(
    async (timestamp: number) => {
      await supabaseClient
        .from('courses_user_video_progress')
        .upsert({ timestamp, lesson_id: lessonId }, { onConflict: 'user_id,lesson_id' });
    },
    [lessonId]
  );

  const markLessonCompleted = useCallback(async () => {
    await supabaseClient
      .from('courses_lessons_completed')
      .insert({ is_completed: true, lesson_id: lessonId });
    queryClient.invalidateQueries({ queryKey: ['course', courseId] });
  }, [lessonId, courseId, queryClient]);

  // Save progress on pause (debounced)
  useEffect(() => {
    const listener = player.addListener('playingChange', async ({ isPlaying, oldIsPlaying }) => {
      if (!isPlaying && oldIsPlaying) {
        await new Promise((resolve) => setTimeout(resolve, PAUSE_DEBOUNCE_MS));
        if (!player.playing) {
          await saveProgress(Math.floor(player.currentTime));
        }
      }
    });
    return () => listener.remove();
  }, [player, saveProgress]);

  // Mark lesson as completed when 90% watched
  useEffect(() => {
    if (isCompleted) return;

    const interval = setInterval(async () => {
      const { duration, currentTime } = player;
      if (duration > 0 && currentTime / duration >= COMPLETION_THRESHOLD) {
        await markLessonCompleted();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isCompleted, player, markLessonCompleted]);

  // Periodic progress save
  useEffect(() => {
    const interval = setInterval(async () => {
      if (hasLoadedRef.current && player.playing) {
        await saveProgress(Math.floor(player.currentTime));
      }
    }, PROGRESS_SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      player.release();
    };
  }, [player, saveProgress]);

  const handleFirstFrameRender = useCallback(async () => {
    hasLoadedRef.current = true;

    const { data } = await supabaseClient
      .from('courses_user_video_progress')
      .select('timestamp')
      .eq('lesson_id', lessonId)
      .single();

    if (data?.timestamp) {
      player.seekBy(data.timestamp);
    }
    player.play();
  }, [lessonId, player]);

  return (
    <View className="aspect-video w-full self-center border-2">
      <VideoView
        ref={playerRef}
        style={tw`flex-1`}
        player={player}
        contentFit="fill"
        allowsPictureInPicture
        startsPictureInPictureAutomatically={false}
        fullscreenOptions={{ enable: true }}
        onFirstFrameRender={handleFirstFrameRender}
      />
    </View>
  );
};

export default PIPVideo;
