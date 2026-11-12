import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { insertCabin } from "../../services/apiCabins";
export function useCreateCabin() {
  const queryClient = useQueryClient();
  const {
    mutate: createCabin,

    isLoading: isCreating,
  } = useMutation({
    mutationFn: insertCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { createCabin, isCreating };
}
