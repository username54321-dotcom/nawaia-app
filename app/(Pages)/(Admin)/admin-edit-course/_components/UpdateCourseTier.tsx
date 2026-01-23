import { useMutation } from '@tanstack/react-query';
import { Check } from 'lucide-react-native';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ValueOf } from 'react-native-gesture-handler/lib/typescript/typeUtils';
import FadeIn from '~/components/Animations/FadeIn';
import DropDown from '~/components/Reusebales/DropDown';
import { TierList, tierList } from '~/data/tierList';
import { supabaseClient } from '~/utils/supabase';

type props = {
  initialValue: ValueOf<Pick<TierList[number], 'label'>>;
  courseId: number;
};

const UpdateCourseTier = ({ initialValue, courseId }: props) => {
  const [selectedTier, setSelectedTier] = useState<null | props['initialValue']>(null);
  const { data: tierUpdated, mutate: updateTier } = useMutation({
    mutationKey: ['updateTier'],
    mutationFn: async () => {
      const { data } = await supabaseClient
        .from('courses')
        .update({ tier: selectedTier! })
        .eq('id', courseId)
        .select()
        .single();
      data && setSelectedTier(null);
      return data;
    },
  });

  return (
    <>
      <View className="childContainer flex-row items-center">
        <DropDown
          data={tierList}
          className="border-black "
          inintialValue={initialValue}
          setState={setSelectedTier}></DropDown>
      </View>
      {selectedTier !== null && (
        <>
          <FadeIn>
            <Pressable
              onPress={() => updateTier()}
              className="defaultPressable mb-4 border-red-500 px-4 py-2 ">
              <Text selectable={false} className="defaultText">
                تحديث مستوي الأشتراك
              </Text>
            </Pressable>
          </FadeIn>
        </>
      )}
      {tierUpdated && selectedTier === null && (
        <FadeIn>
          <View className=" mx-auto size-fit rounded-full bg-emerald-500 p-1">
            <Check size={25} color={'white'} />
          </View>
          <Text className="font-لاشسث mb-8 mt-4 self-center text-center font-Kufi text-base text-neutral-800">
            تم تغيير مستوي الأشتراك بنجاح !
          </Text>
        </FadeIn>
      )}
    </>
  );
};

export default UpdateCourseTier;
