import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthentcated } = useUser();
  useEffect(() => {
    if (!isAuthentcated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthentcated, isLoading, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (isAuthentcated) {
    return children;
  }
}

export default ProtectedRoute;
