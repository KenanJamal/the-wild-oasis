import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { insertCabin, type NewCabin } from "../../services/apiCabins";

interface EditCabinVariables {
  newCabinData: NewCabin;
  id: number;
}

export function useEditCabins() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }: EditCabinVariables) =>
      insertCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { editCabin, isEditing };
}
