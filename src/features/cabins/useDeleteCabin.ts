import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: deleteCabinMutation, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { deleteCabinMutation, isDeleting };
}
