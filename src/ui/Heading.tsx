import styled, { css } from "styled-components";

// 1. Define the allowed values for the 'as' prop
interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4";
}

// 2. Pass the interface to the styled function using angle brackets <HeadingProps>
const Heading = styled.h1<HeadingProps>`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    
    ${(props) =>
    props.as === "h4" &&
    css`
      text-align: center;
      font-size: 3rem;
      font-weight: 600;
    `}
    
  line-height: 1.4;
`;

export default Heading;