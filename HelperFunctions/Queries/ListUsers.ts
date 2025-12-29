import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "~/utils/supabase";

export function ListUsers() {
    return useQuery({
        queryKey: ["listUsers"],
        queryFn: async () => {
            const { data } = await supabaseClient.from("profiles").select("*");
            return data;
        },
    });
}
