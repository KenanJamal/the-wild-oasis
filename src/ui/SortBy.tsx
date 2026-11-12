import type { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import type { Option } from "../types";

function SortBy({ options }: { options: Option[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedValue = searchParams.get("sortBy") || "";
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={selectedValue}
    ></Select>
  );
}

export default SortBy;
