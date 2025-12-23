import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useIsAuth, useIsAuthType } from "~/store/store";
import { supabaseClient } from "~/utils/supabase";

export function GetIsApproved(isAuth: boolean) {
    const isApprovedStore = useIsAuth((x: useIsAuthType) => x.isApproved);
    const setIsApprovedStore = useIsAuth((x: useIsAuthType) => x.setIsApproved);
    return useQuery({
        queryKey: ["isApproved"],
        queryFn: async () => {
            const uuid = await supabaseClient.auth.getSession().then((x) =>
                x.data.session?.user.id
            );
            console.log(uuid);
            if (isApprovedStore) return;
            // console.log(isApprovedStore);
            const isApproved = await axios.post(
                "https://hdxnyotrpjmrigmpdpkn.supabase.co/functions/v1/is_approved",
                { uuid: uuid },
            ).then((x) => x.data.approved);
            setIsApprovedStore(isApproved);
            return isApproved;
        },
        enabled: isAuth,
        refetchInterval: 60 * 1000,
    });
}
