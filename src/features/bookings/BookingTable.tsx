import BookingRow from "./BookingRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Pagination from "../../ui/Pagination";

// OPTION 1: If you are using the Supabase generated types (Recommended)
// import { Database } from "../../database.types";
// type Booking = Database["public"]["Tables"]["bookings"]["Row"];

// OPTION 2: If you are defining types manually for now, 
// outline the properties your BookingRow component expects:
export interface Booking {
  id: number | string;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: string;
  guests: { 
    fullName: string; 
    email: string; 
  };
  cabins: { 
    name: string; 
  };
}

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading) return <Spinner />;
  if (!bookings || bookings.length === 0) return <Empty resource={"bookings"} />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        
        <Table.Body
          data={bookings}
          // Add the type annotation to the booking parameter here
          render={(booking: Booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;