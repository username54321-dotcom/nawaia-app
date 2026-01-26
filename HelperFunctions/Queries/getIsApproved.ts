import { useQuery } from "@tanstack/react-query";
import { useIsAuth, useIsAuthType } from "~/store/store";
import { supabaseClient } from "~/utils/supabase";

export function useGetIsApproved(isAuth: boolean) {
    const isApprovedStore = useIsAuth((x: useIsAuthType) => x.isApproved);
    const setIsApprovedStore = useIsAuth((x: useIsAuthType) => x.setIsApproved);
    return useQuery({
        queryKey: ["isApproved"],
        queryFn: async () => {
            if (isApprovedStore) return;
            if (!isAuth) return;
            const isApproved =
                (await supabaseClient.from("profiles").select("is_approved")
                    .single()).data?.is_approved;
            if (isApprovedStore === isApproved) return;
            setIsApprovedStore(isApproved);
        },
        enabled: isAuth && !isApprovedStore,
        refetchInterval: 60 * 1000,
    });
}
