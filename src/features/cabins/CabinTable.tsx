import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";
import type { Cabin } from "../../types";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  // filter
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (!cabins) return <Empty resource="cabins" />;
  const filteredValue = searchParams.get("discount") || "all";
  let filteredCabins: Cabin[] = [];
  if (filteredValue === "all") {
    filteredCabins = cabins;
  } else if (filteredValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else if (filteredValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }
  // sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const sortField = field as keyof Cabin;
  const sortedCabins = filteredCabins.sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];
    let result;
    if (typeof valueA === "string" && typeof valueB === "string") {
      result = valueA.localeCompare(valueB);
    } else {
      result = Number(valueA) - Number(valueB);
    }
    return direction === "asc" ? result : -result;
  });
  return (
    <Menus>
      <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.Header>
          <div></div>
          <div>Cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(ele) => {
            return <CabinRow cabin={ele} key={ele.id} />;
          }}
        />
      </Table>
    </Menus>
  );
}
export default CabinTable;
