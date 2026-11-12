import type { TablesUpdate } from "../../database.types";
import type {
  Booking,
  BookingDetails,
  BookingListItem,
  RecentBooking,
  RecentStay,
  TodayActivityBooking,
} from "../types";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constans";

export interface BookingsFilter {
  field: keyof Booking;
  value: string;
}

export interface BookingsSortBy {
  field: keyof Booking;
  direction: string;
}

interface GetBookingsParams {
  filter: BookingsFilter | null;
  sortBy: BookingsSortBy;
  page: number;
}

export async function getBookings({ filter, sortBy, page }: GetBookingsParams) {
  let query = supabase
    .from("bookings")
    .select(
      "id , startDate, endDate , numNights , numGuests , status ,totalPrice , cabins(name), guests(fullName ,email)",
      { count: "exact" },
    );
  if (filter) {
    query = query.eq(filter.field, filter.value);
  }
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query.returns<BookingListItem[]>();

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return { data, count };
}
export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .returns<BookingDetails[]>()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }))
    .returns<RecentBooking[]>();

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday())
    .returns<RecentStay[]>();

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
    )
    .order("created_at")
    .returns<TodayActivityBooking[]>();

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id: number, obj: TablesUpdate<"bookings">) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
