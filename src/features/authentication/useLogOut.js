import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut as apiLogOut } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logOut, isLoading } = useMutation({
    mutationFn: apiLogOut,
    onSuccess: () => {
      queryClient.removeQueries(["user"]);
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { logOut, isLoading };
}
