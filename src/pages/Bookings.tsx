import Heading from "../ui/Heading.tsx";
import Row from "../ui/Row.tsx";
import BookingsTable from "../features/bookings/BookingTable.tsx";
import BookingsTableOperations from "../features/bookings/BookingTableOperations.jsx";

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
