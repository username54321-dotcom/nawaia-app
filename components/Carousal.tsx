import { useQuery } from '@tanstack/react-query';
import { memo, useState } from 'react';
import { View, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { supabaseClient } from '~/utils/supabase';

function MyCarousal({ className }: { className?: string }) {
  const newData = [
    'https://plus.unsplash.com/premium_photo-1686729237226-0f2edb1e8970?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbHBhcGVyfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000',
    'https://www.skyweaver.net/images/media/wallpapers/wallpaper2.jpg',
    'https://cdn.pixabay.com/photo/2023/08/07/13/44/tree-8175062_1280.jpg',
  ];

  const [containerHeight, setContainerHeight] = useState(1);

  return (
    <>
      <>
        <View className={className}>
          <View
            //onLayout={(event) => setContainerHeight(event.nativeEvent.layout.height)}
            className="  flex items-center justify-center self-center  portrait:h-[100vw] portrait:w-[100vw] landscape:h-[60vh] landscape:w-[60vh] "
            onLayout={(event) => setContainerHeight(event.nativeEvent.layout.height)}>
            {true && (
              <Carousel
                autoPlay={true}
                autoPlayInterval={3 * 1000}
                data={newData}
                loop={true}
                pagingEnabled={true}
                snapEnabled={true}
                width={containerHeight || 1}
                height={containerHeight}
                mode="parallax"
                modeConfig={{
                  parallaxScrollingScale: 0.9,
                  parallaxScrollingOffset: 100,
                  parallaxAdjacentItemScale: 0.7,
                }}
                renderItem={({ item }) => (
                  <View className="flex-1 items-center justify-center">
                    <View className="aspect-square h-full max-w-fit items-center justify-center overflow-hidden rounded-xl  ">
                      <Image
                        source={{ uri: item }}
                        style={{ aspectRatio: 1, height: '100%' }}></Image>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </>
    </>
  );
}

export default memo(MyCarousal);
