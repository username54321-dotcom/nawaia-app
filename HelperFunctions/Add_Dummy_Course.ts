import { supabaseClient } from '~/utils/supabase';

const inputChapters = [
  {
    name: '_الفصل الأول',
    position: 1,
    lessons: [
      {
        name: 'الدرس الأول',
        position: 1,
        link: 'https://res.cloudinary.com/dhbctone5/video/upload/v1762383158/samples/sea-turtle.mp4',
      },
      {
        name: 'الدرس الثاني',
        position: 2,
        link: 'https://res.cloudinary.com/dhbctone5/video/upload/v1762383158/samples/sea-turtle.mp4',
      },
      {
        name: 'الدرس الثالث',
        position: 3,
        link: 'https://res.cloudinary.com/dhbctone5/video/upload/v1762383158/samples/sea-turtle.mp4',
      },
    ],
  },
  {
    name: '_الفصل الثاني',
    position: 2,
    lessons: [
      {
        name: 'الدرس الأول',
        position: 1,
        link: 'https://res.cloudinary.com/dhbctone5/video/upload/v1762383158/samples/sea-turtle.mp4',
      },
      {
        name: 'الدرس الثاني',
        position: 2,
        link: 'https://res.cloudinary.com/dhbctone5/video/upload/v1762383158/samples/sea-turtle.mp4',
      },
      {
        name: 'الدرس الثالث',
        position: 3,
        link: 'https://res.cloudinary.com/dhbctone5/video/upload/v1762383158/samples/sea-turtle.mp4',
      },
    ],
  },
  {
    name: '_الفصل الثالث',
    position: 3,
    lessons: [
      {
        name: 'الدرس الأول',
        position: 1,
        link: 'https://res.cloudinary.com/dhbctone5/video/upload/v1762383158/samples/sea-turtle.mp4',
      },
      {
        name: 'الدرس الثاني',
        position: 2,
        link: 'https://res.cloudinary.com/dhbctone5/video/upload/v1762383158/samples/sea-turtle.mp4',
      },
      {
        name: 'الدرس الثالث',
        position: 3,
        link: 'https://res.cloudinary.com/dhbctone5/video/upload/v1762383158/samples/sea-turtle.mp4',
      },
    ],
  },
];

export const addDummyCourse = async () => {
  // Create Course Row
  const { data: courseData } = await supabaseClient
    .from('courses')
    .insert({
      title: 'أسم الكورس_',
      image:
        'https://www.shutterstock.com/image-vector/blank-image-photo-placeholder-icon-600nw-2501054919.jpg',
      short_description: 'الوصف القصير_',
      price: 999,
      long_description: 'الوصف الطويل_',
      duration: 'ست ساعات',
      genre: 'courses',
    })
    .select()
    .single();
  //insert Telegram Link
  const {} = await supabaseClient
    .from('telegram_links')
    .insert({ course_id: courseData?.id, telegram_link: 'https://web.telegram.org' });

  const courseId = courseData?.id; // Inserted CourseID

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
    const chapterId = chapterData?.id; // Inserted Chapter ID
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
      const lessonId = lessonData?.id; // Lesson ID
      //Insert Lesson Link
      const { data: linkData } = await supabaseClient
        .from('links')
        .insert({ lesson_id: lessonId, link: item_inputLesson.link })
        .select()
        .single();
    }
  }
};
