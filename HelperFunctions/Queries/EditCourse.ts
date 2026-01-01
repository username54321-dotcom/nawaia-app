import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "~/utils/supabase";

export function useQueryEditCourse(id: number) {
  return useQuery({
    queryKey: ["edit course", id],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from("courses")
        .select(
          "*,courses_telegram_links(*), courses_chapters(*, courses_lessons(*, courses_links(*)))",
        )
        .eq("id", +id)
        .single();
      return data;
    },
    staleTime: Infinity,
  });
}
