import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "~/utils/supabase";

export function useQueryGetCourseHistory() {
  return useQuery({
    queryKey: ["course history"],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from("courses_user_history")
        .select("*,courses(*,courses_courses_user_favourites(*)) ");
      return data;
    },
    staleTime: Infinity,
  });
}
