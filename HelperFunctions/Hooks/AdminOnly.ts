import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useIsAuth, useIsAuthType } from "~/store/store";

export default function useAdminOnly() {
  const isAdmin = useIsAuth((state: useIsAuthType) => state.isAdmin);
  const router = useRouter();
  useEffect(() => {
    !isAdmin && router.replace("/");
  }, [isAdmin, router]);
  return isAdmin;
}
