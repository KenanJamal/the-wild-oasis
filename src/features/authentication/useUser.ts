import { useQuery } from "@tanstack/react-query";
import { getCurrenUser } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrenUser,
  });
  return { user, isLoading, isAuthentcated: user?.role === "authenticated" };
}
