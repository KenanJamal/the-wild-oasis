import type { Tables } from "../../database.types";

// The generated Supabase types mark almost every column as nullable, because the
// tables have no NOT NULL constraints. The app always fills these columns in, so the
// domain types below make them required. Anything not listed stays nullable.
type WithRequired<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};

export type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";

export type Cabin = WithRequired<
  Tables<"cabins">,
  "name" | "maxCapacity" | "regularPrice" | "discount" | "image"
>;

export type Guest = WithRequired<
  Tables<"guests">,
  "fullName" | "email" | "nationality" | "nationalID"
>;

export type Settings = WithRequired<
  Tables<"settings">,
  | "minBookingLength"
  | "maxBookingLeng"
  | "maxGuestsPerBooking"
  | "breakfastPrice"
>;

export type Booking = Omit<
  WithRequired<
    Tables<"bookings">,
    | "cabinId"
    | "guestId"
    | "startDate"
    | "endDate"
    | "numNights"
    | "numGuests"
    | "cabinPrice"
    | "extrasPrice"
    | "totalPrice"
    | "hasBreakfast"
    | "isPaid"
  >,
  "status"
> & { status: BookingStatus };

// Shapes returned by the queries in services/apiBookings.ts

/** `select("*, cabins(*), guests(*)")` */
export type BookingDetails = Booking & { cabins: Cabin; guests: Guest };

/** One row of the bookings table */
export type BookingListItem = Pick<
  Booking,
  | "id"
  | "startDate"
  | "endDate"
  | "numNights"
  | "numGuests"
  | "status"
  | "totalPrice"
> & {
  cabins: Pick<Cabin, "name">;
  guests: Pick<Guest, "fullName" | "email">;
};

export type RecentBooking = Pick<
  Booking,
  "created_at" | "totalPrice" | "extrasPrice"
>;

export type RecentStay = Booking & { guests: Pick<Guest, "fullName"> };

export type TodayActivityBooking = Booking & {
  guests: Pick<Guest, "fullName" | "nationality" | "countryFlag">;
};

export interface UserMetadata {
  full_name?: string;
  avatar?: string;
}

// Colors that have --color-<name>-100 / -700 variables in GlobalStyles
export type ColorName = "blue" | "green" | "yellow" | "silver" | "indigo" | "red";

export interface Option {
  value: string;
  label: string;
}
