import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "~/utils/supabase";

export function useListUsers() {
    return useQuery({
        queryKey: ["listUsers"],
        queryFn: async () => {
            const { data } = await supabaseClient.from("profiles").select("*");
            return data;
        },
    });
}
