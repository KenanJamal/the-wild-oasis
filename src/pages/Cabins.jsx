import { useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [cabinsForm, setCabinsForm] = useState(true);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setCabinsForm((prev) => !prev)}>
          Add New Cabin
        </Button>
        {cabinsForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
