import Background from './../../../components/Background';
import { View, Text, Pressable } from 'react-native';
import { MotiView, MotiText } from 'moti';
import DynamicBanner from './../../../components/Banner/DynamicBanner';
import { v4 as uuid } from 'uuid';
import { supabaseClient } from '~/utils/supabase';
import { memo } from 'react';

const HealthJourney = () => {
  const data = [
    {
      Lessons: [
        {
          LessonLink: 'https://www.example.com',
          lessonName: 'Lesson 1',
        },
        {
          LessonLink: 'https://www.example.com',
          lessonName: 'Lesson 2',
        },
        {
          LessonLink: 'https://www.example.com',
          lessonName: 'Lesson 2',
        },
      ],
      chapterName: 'chapter 1',
    },
    {
      Lessons: [
        {
          LessonLink: 'https://www.example.com',
          lessonName: 'Lesson 1',
        },
        {
          LessonLink: 'https://www.example.com',
          lessonName: 'Lesson 2',
        },
        {
          LessonLink: 'https://www.example.com',
          lessonName: 'Lesson 2',
        },
      ],
      chapterName: 'chapter 2',
    },
    {
      Lessons: [
        {
          LessonLink: 'https://www.example.com',
          lessonName: 'Lesson 1',
        },
        {
          LessonLink: 'https://www.example.com',
          lessonName: 'Lesson 2',
        },
        {
          LessonLink: 'https://www.example.com',
          lessonName: 'Lesson 2',
        },
      ],
      chapterName: 'chapter 3',
    },
  ];
  const test = data.map((chapter) => {
    const updatedLessons = chapter.Lessons.map((lesson) => ({
      uuid: Math.random(),
      ...lesson,
    }));
    return {
      ...chapter,
      Lessons: updatedLessons,
    };
  });

  const handleInsert = async () => {
    const { data: out, error } = await supabaseClient
      .from('auth_courses')
      .update({ content: test })
      .eq('id', 2)
      .limit(1)
      .single();
  };

  return (
    <>
      <DynamicBanner></DynamicBanner>
      <Pressable onPress={handleInsert} className="size-12 bg-red-500"></Pressable>
    </>
  );
};

export default memo(HealthJourney);
