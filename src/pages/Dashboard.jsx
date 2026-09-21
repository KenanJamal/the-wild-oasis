import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashBoardFilter from "../features/dashboard/DashBoardFilter";
import DashBoardLayout from "../features/dashboard/DashBoardLayout";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashBoardFilter />
      </Row>
      <DashBoardLayout />
    </>
  );
}

export default Dashboard;
