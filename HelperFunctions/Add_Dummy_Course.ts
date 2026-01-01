import { supabaseClient } from "~/utils/supabase";

const inputChapters = [
  {
    name: "_الفصل الأول",
    position: 1,
    lessons: [
      {
        name: "الدرس الأول",
        position: 1,
        link:
          "https://res.cloudinary.com/dhbctone5/video/upload/v1762383158/samples/sea-turtle.mp4",
      },
    ],
  },
];

export const addDummyCourse = async () => {
  // Create Course Row
  const { data: courseData } = await supabaseClient
    .from("courses")
    .insert({
      title: "أسم الكورس_",
      cover_image:
        "https://www.shutterstock.com/image-vector/blank-image-photo-placeholder-icon-600nw-2501054919.jpg",
      short_description: " الوصف القصير_",
      price: 999,
      long_description:
        "الوصف الطويل_Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      duration: "ست ساعات",
      genre: "courses",
    })
    .select()
    .single();
  //insert Telegram Link
  if (courseData) {
    const {} = await supabaseClient
      .from("courses_telegram_links")
      .insert({
        course_id: courseData?.id,
        telegram_link: "https://web.telegram.org",
      });
  }
  const courseId = courseData?.id; // Inserted CourseID

  //Loop for every Chapter

  for await (const item_inputChapter of inputChapters) {
    const { data: chapterData } = await supabaseClient
      .from("courses_chapters")
      .insert({
        course_id: courseId,
        chapter_name: item_inputChapter.name,
        position: item_inputChapter.position,
      })
      .select()
      .single();
    const chapterId = chapterData?.id; // Inserted Chapter ID
    // Loop to Insert Every Lesson

    for await (const item_inputLesson of item_inputChapter.lessons) {
      //Insert Single Lesson
      const { data: lessonData } = await supabaseClient
        .from("courses_lessons")
        .insert({
          chapter_id: chapterId,
          course_id: courseId,
          lesson_name: item_inputLesson.name,
          position: item_inputLesson.position,
        })
        .select()
        .single();
      const lessonId = lessonData?.id; // Lesson ID
      //Insert Lesson Link
      if (lessonId && courseData) {
        const { data: linkData } = await supabaseClient
          .from("courses_links")
          .insert({
            lesson_id: lessonId,
            lesson_link: item_inputLesson.link,
            course_id: courseData?.id,
            chapter_id: chapterId,
          })
          .select()
          .single();
      }
    }
  }
};
