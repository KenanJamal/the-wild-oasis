import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login as loginAPI,
  type LoginCredentials,
} from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: LoginCredentials) =>
      loginAPI({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error(
        "Provided email or password are incorrect. Please try again.",
      );
    },
  });
  return { login, isLoading };
}
