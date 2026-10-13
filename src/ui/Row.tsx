import styled, { css } from "styled-components";

// 1. Rename the interface to avoid conflicting with the component name
// 2. Change 'as' to 'type' to match the props used in your css logic
interface RowProps {
  type?: "horizontal" | "vertical";
}

// 3. Pass the <RowProps> interface to the styled.div
const Row = styled.div<RowProps>`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;