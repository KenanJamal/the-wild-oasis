import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import type { TablesUpdate } from "../../../database.types";

interface CheckinVariables {
  bookingId: number;
  breakfast: Pick<
    TablesUpdate<"bookings">,
    "hasBreakfast" | "extrasPrice" | "totalPrice"
  >;
}
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: CheckinVariables) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ type: "active" });
      toast.success("Booking checked in successfully");
      navigate("/bookings");
    },
    onError: () => {
      toast.error("Booking could not be checked in");
    },
  });

  return { checkin, isCheckingIn };
}
