import styled from "styled-components";
import LogOut from "../features/authentication/logOut";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/20/solid";
import UserAvatar from "../features/authentication/UserAvatar";
const StyledHeaderMenu = styled.ul`
  display: flex;
  justify-content: flex-end;
  gap: 0.4rem;
  align-items: center;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <UserAvatar />
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <UserIcon />
        </ButtonIcon>
      </li>
      <li>
        <LogOut />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
