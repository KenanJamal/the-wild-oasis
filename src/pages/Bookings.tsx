import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingsTable from "../features/bookings/BookingTable";
import BookingsTableOperations from "../features/bookings/BookingTableOperations";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingsTableOperations />
      </Row>
      <BookingsTable />
    </>
  );
}

export default Bookings;
