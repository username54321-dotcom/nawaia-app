import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "~/utils/supabase";

export function useQueryGetCourse(id: number) {
  return useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      if (id) {
        const { data, error } = await supabaseClient
          .from("courses")
          .select(
            "*,courses_telegram_links(*),courses_user_history(*),courses_chapters(*,courses_lessons(*,courses_links(*),courses_notes(*),courses_user_video_progress(*),courses_lessons_completed(*)))",
          )
          .eq("id", +id)
          .single();
        return data;
      }
      return null;
    },
    enabled: !!id,
    staleTime: Infinity,
  });
}
