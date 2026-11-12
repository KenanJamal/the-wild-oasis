import { createContext, useContext, type ReactNode } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.header<{ columns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledFooter = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
interface TableContextValue {
  columns: string;
}

const TableContext = createContext<TableContextValue | null>(null);

function useTableContext() {
  const context = useContext(TableContext);
  if (!context) throw new Error("Table components must be used inside <Table>");
  return context;
}

interface TableProps {
  // Value for grid-template-columns, shared by the header and every row
  columns: string;
  children: ReactNode;
}

export default function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}
function Header({ children }: { children: ReactNode }) {
  const { columns } = useTableContext();
  return (
    <StyledHeader as="header" columns={columns}>
      {children}
    </StyledHeader>
  );
}
interface BodyProps<T> {
  data: T[] | undefined;
  render: (item: T) => ReactNode;
}

function Body<T>({ data, render }: BodyProps<T>) {
  if (!data || data.length === 0) {
    return <Empty>No data available</Empty>;
  }
  return <StyledBody>{data.map((ele) => render(ele))}</StyledBody>;
}
function Row({ children }: { children: ReactNode }) {
  const { columns } = useTableContext();
  return <StyledRow columns={columns}>{children}</StyledRow>;
}
function Footer({ children }: { children: ReactNode }) {
  return <StyledFooter>{children}</StyledFooter>;
}
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
