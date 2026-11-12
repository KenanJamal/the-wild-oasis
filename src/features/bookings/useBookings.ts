import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBookings,
  type BookingsFilter,
  type BookingsSortBy,
} from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constans";
import type { Booking } from "../../types";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  //filter
  const filterValue = searchParams.get("status");
  const filter: BookingsFilter | null =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // sort
  const sortValue = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction = ""] = sortValue.split("-");
  const sortBy: BookingsSortBy = { field: field as keyof Booking, direction };
  const page = Number(searchParams.get("page")) || 1;
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () =>
      getBookings({
        filter,
        sortBy,
        page,
      }),
  });
  const bookings = data?.data;
  const count = data?.count ?? 0;
  // prefetch next page
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          page: page + 1,
        }),
    });
  }
  // prefetch previous page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          page: page - 1,
        }),
    });
  }
  return { isLoading, bookings, count, error };
}
