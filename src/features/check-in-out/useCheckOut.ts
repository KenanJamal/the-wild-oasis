import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId }) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      toast.success("Booking checked out successfully");
      navigate("/bookings");
    },
    onError: () => {
      toast.error("Booking could not be checked out");
    },
  });

  return { checkout, isCheckingOut };
}
