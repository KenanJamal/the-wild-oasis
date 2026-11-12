import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogOut } from "./useLogOut";
function LogOut() {
  const { logOut, isLoading } = useLogOut();
  return (
    <ButtonIcon onClick={logOut} disabled={isLoading}>
      <ArrowRightOnRectangleIcon />
    </ButtonIcon>
  );
}

export default LogOut;
