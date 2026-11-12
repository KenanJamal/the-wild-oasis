import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type MouseEvent,
  type ReactNode,
  type SetStateAction,
} from "react";
import styled from "styled-components";
import useClickOutside from "../hooks/useClickOutside";
import { createPortal } from "react-dom";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface Position {
  x: number;
  y: number;
}

const StyledList = styled.ul<{ position: Position }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
// The id of the open menu, or "" when every menu is closed
type MenuId = string | number;

interface MenuContextValue {
  isOpen: MenuId;
  setIsOpen: Dispatch<SetStateAction<MenuId>>;
  position: Position;
  setPosition: Dispatch<SetStateAction<Position>>;
  close: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) throw new Error("Menu components must be used inside <Menus>");
  return context;
}

function Menus({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<MenuId>("");
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const close = () => setIsOpen("");
  return (
    <MenuContext.Provider
      value={{ isOpen, setIsOpen, setPosition, position, close }}
    >
      <div>{children}</div>
    </MenuContext.Provider>
  );
}
interface ToggleProps {
  children: ReactNode;
  id: MenuId;
}

function Toggle({ children, id }: ToggleProps) {
  const { isOpen, setIsOpen, setPosition, close } = useMenuContext();
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    isOpen === "" ? setIsOpen(id) : close();
  }
  return <StyledToggle onClick={handleClick}>{children}</StyledToggle>;
}
function List({ children, id }: ToggleProps) {
  const { isOpen, position, close } = useMenuContext();
  const ref = useClickOutside<HTMLUListElement>(close);
  if (isOpen !== id) return null;
  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body,
  );
}
interface ButtonProps {
  children: ReactNode;
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

function Button({ children, icon, onClick, disabled }: ButtonProps) {
  const { close } = useMenuContext();
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <StyledButton onClick={handleClick} disabled={disabled}>
      {icon}
      {children}
    </StyledButton>
  );
}
Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
