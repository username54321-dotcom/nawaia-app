import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "~/utils/supabase";

export function GetUserRow(userId: string) {
    return useQuery({
        queryKey: ["getUser", userId],
        queryFn: async () => {
            const { data } = await supabaseClient.from("profiles").select("*")
                .eq(
                    "user_id",
                    userId,
                ).single();
            return data;
        },
    });
}
