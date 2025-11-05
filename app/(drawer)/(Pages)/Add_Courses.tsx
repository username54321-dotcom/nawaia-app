import Background from '~/components/Background';
import { Pressable, View } from 'react-native';
import { supabaseClient } from '~/utils/supabase';

const inputChapters = [
  {
    name: 'Chapter 1',
    position: 1,
    lessons: [
      { name: 'Lesson 1', position: 1, link: 'example.com' },
      { name: 'Lesson 2', position: 2, link: 'example.com' },
      { name: 'Lesson 3', position: 3, link: 'example.com' },
    ],
  },
  {
    name: 'Chapter 2',
    position: 2,
    lessons: [
      { name: 'Lesson 1', position: 1, link: 'example.com' },
      { name: 'Lesson 2', position: 2, link: 'example.com' },
      { name: 'Lesson 3', position: 3, link: 'example.com' },
    ],
  },
  {
    name: 'Chapter 3',
    position: 3,
    lessons: [
      { name: 'Lesson 1', position: 1, link: 'example.com' },
      { name: 'Lesson 2', position: 2, link: 'example.com' },
      { name: 'Lesson 3', position: 3, link: 'example.com' },
    ],
  },
];

const Add_Courses = () => {
  const handleOnPress = async () => {
    // Create Course Row
    const { data: courseData } = await supabaseClient
      .from('courses')
      .insert({
        title: 'example title',
        image:
          'https://aliaspace.ams3.digitaloceanspaces.com/OIexLk38nG1aLI1Y1pRDXsDLOBrrG4mHrqjc1Txb.jpg',
        short_description: 'example short description',
        price: 999,
        long_description: 'Long Description',
        duration: '6 hours',
        genre: 'courses',
      })
      .select()
      .single();
    console.log('courseData :', courseData);
    const courseId = courseData.id; // Inserted CourseID
    console.log('courseID: ', courseId);

    //Loop for every Chapter
    for await (const item_inputChapter of inputChapters) {
      const { data: chapterData } = await supabaseClient
        .from('chapters')
        .insert({
          course_id: courseId,
          name: item_inputChapter.name,
          position: item_inputChapter.position,
        })
        .select()
        .single();
      const chapterId = chapterData.id; // Inserted Chapter ID
      console.log('chapter ID: ', chapterId);
      // Loop to Insert Every Lesson

      for await (const item_inputLesson of item_inputChapter.lessons) {
        //Insert Single Lesson
        const { data: lessonData } = await supabaseClient
          .from('lessons')
          .insert({
            chapter_id: chapterId,
            name: item_inputLesson.name,
            position: item_inputLesson.position,
          })
          .select()
          .single();
        const lessonId = lessonData.id; // Lesson ID
        //Insert Lesson Link
        const { data: linkData } = await supabaseClient
          .from('links')
          .insert({ lesson_id: lessonId, link: item_inputLesson.link })
          .select()
          .single();
      }
    }
  };
  const getRow = async () => {
    const { data, error } = await supabaseClient
      .from('courses')
      .select('title,chapters(name)')
      .eq('id', 12)
      .single();
    // error && console.log(error);
    console.log(data);
  };
  return (
    <>
      <Background>
        <View className="flex-1 items-center justify-center border-2">
          <Pressable onPress={handleOnPress} className="size-12 bg-red-500"></Pressable>
          <Pressable className="m-10 size-12 bg-blue-500"></Pressable>
        </View>
      </Background>
    </>
  );
};

export default Add_Courses;
