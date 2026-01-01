import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "~/utils/supabase";

export function useQueryGetCourseList() {
  return useQuery({
    queryKey: ["Public Courses List"],

    queryFn: async () => {
      const { data } = await supabaseClient
        .from("courses")
        .select(
          "*,courses_user_favourites(is_favourite),courses_chapters(courses_lessons(courses_lessons_completed(is_completed)))",
        );
      return data;
    },
    staleTime: Infinity,
  });
}
