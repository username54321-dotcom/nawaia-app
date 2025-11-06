import Background from '~/components/Background';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { VideoView, useVideoPlayer } from 'expo-video';
import { View, Pressable } from 'react-native';
import { useFocusEffect } from 'expo-router';

const About = () => {
  const player = useVideoPlayer({
    uri: 'https://res.cloudinary.com/dhbctone5/video/upload/v1762383240/PlaceHolderVideo_rovqaa.mp4',
  });
  const playerRef = useRef<VideoView>(null);
  player.seekBy(5);

  return (
    <Background>
      <View className="size-40">
        <Pressable className="size-12 bg-red-500"></Pressable>
        <VideoView
          onFirstFrameRender={() => player.seekBy(5)}
          ref={playerRef}
          startsPictureInPictureAutomatically={true}
          playsInline={true}
          allowsFullscreen={true}
          allowsPictureInPicture={true}
          player={player}></VideoView>
      </View>
    </Background>
  );
};

export default memo(About);
