import { View, Text, Pressable } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { MotiView, useAnimationState } from 'moti';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';

interface propTypes {
  shortDescription: string;
  longDescription: string;
}

const TextAccordion = ({ shortDescription, longDescription }: propTypes) => {
  const [TextExpand, setTextExpand] = useState(false);
  const [contentHeight, setContentHeight] = useState(200);

  const animation = useAnimationState({
    from: { height: 300 },
    to: { height: contentHeight + 50 },
  });

  useEffect(
    () => (TextExpand ? animation.transitionTo('to') : animation.transitionTo('from')),
    [TextExpand, animation, contentHeight]
  );

  return (
    <>
      {/** Parent View */}
      <MotiView
        state={animation}
        style={tw`overflow-hidden w-4/5 max-w-[600px] mx-4 my-6 flex size-fit rounded-md border-2 border-slate-600 bg-slate-200 pt-1 `}>
        {/** Text View */}
        <View
          onLayout={(e) => {
            setContentHeight(e.nativeEvent.layout.height);
          }}>
          <Text className=" m-2  text-center font-Kufi   text-lg font-semibold  text-neutral-700">
            {shortDescription}
          </Text>
          {/** Separator */}
          <View className="m-4 h-1 w-4/5 self-center border-t-2 opacity-75"></View>
          <Text
            className={` m-2 mx-auto  mb-0  w-[90%] border-4  px-4 text-right font-Kufi text-base  text-neutral-700 `}>
            {longDescription}
          </Text>
          {/** Separator */}
          <View className="pb-22 my-4 h-1 w-4/5 self-center border-t-2 opacity-75"></View>
        </View>
        {/** Gradient View */}
        <View className="absolute bottom-0 h-12 w-full  ">
          <LinearGradient
            locations={[0.1, 1]}
            className="absolute bottom-0 h-20 w-full opacity-60 "
            colors={['transparent', '#000000']}></LinearGradient>
          <Pressable
            className="  absolute bottom-0 w-full flex-col items-center justify-end "
            onPress={() => setTextExpand((state) => !state)}>
            <View className="mb-2  rounded-lg border-[1px] bg-red-700/90">
              <Text className="m-2 font-Kufi font-semibold leading-3     text-slate-100 ">
                {TextExpand ? 'أخفاء' : 'عرض المزيد'}
              </Text>
            </View>
          </Pressable>
        </View>
      </MotiView>
    </>
  );
};

export default TextAccordion;
