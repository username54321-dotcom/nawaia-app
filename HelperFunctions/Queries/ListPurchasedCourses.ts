import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "~/utils/supabase";

export function useListPurchaseCourses(uuid: string) {
    return useQuery(
        {
            queryKey: ["list purchased courses", uuid],
            queryFn: async () => {
                const { data } = await supabaseClient.from("courses_purchase")
                    .select("*,course_id(*)").eq("user_id", uuid);
                return data;
            },
        },
    );
}
