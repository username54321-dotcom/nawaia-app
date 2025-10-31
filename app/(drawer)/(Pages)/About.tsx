import { View, Text, BackHandler, Pressable } from 'react-native';
import Background from '~/components/Background';
import FadeIn from './../../../components/Animations/FadeIn';
import { supabaseClient } from '~/utils/supabase';
import IdContent from './../../../components/Pages/[id]/Content';
import MyAccordion from '~/components/Reusebales/MyAccordion';

const About = () => {
  return (
    <Background>
      <Pressable
        onPress={async () => {
          const { data } = await supabaseClient.from('1_courses').select(`
      id,
      title,
      chapters:2_chapters (
        id,
        title,
        position,
        lessons:3_lessons (
          id,
          title,
          position
          links:4_links!lesson_id(link)
        )
      )
    `);
        }}
        className="size-12 bg-red-500"></Pressable>

      {/** */}

      <Pressable
        onPress={async () => {
          const { data } = await supabaseClient
            .from('1_courses')
            .insert({ title: 'myTitle' })
            .select()
            .single();
          let uuid = data.id;
          const { data: chapterData } = await supabaseClient
            .from('2_chapters')
            .insert({ course_id: uuid })
            .select()
            .single();
          uuid = chapterData.id;
        }}
        className="size-12 bg-blue-500"></Pressable>
      <MyAccordion initialHeight={200} className="h-12 w-1/2">
        <View className="size-[700px] bg-red-500"></View>
      </MyAccordion>
    </Background>
  );
};

export default About;
