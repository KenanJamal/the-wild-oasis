import { XMarkIcon } from "@heroicons/react/16/solid";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

import { keyframes } from "styled-components";

const popIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  animation: ${popIn} 0.25s ease-out;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  animation: ${fadeIn} 0.25s ease-out;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
const modalContext = createContext();
function Modal({ children }) {
  const [openWindow, setIsOpenWindow] = useState("");
  const close = () => setIsOpenWindow("");
  const open = (name) => setIsOpenWindow(name);
  return (
    <modalContext.Provider value={{ openWindow, open, close }}>
      {children}
    </modalContext.Provider>
  );
}
function Open({ children, opens: nameOfTheWindowToOpen }) {
  const { open } = useContext(modalContext);
  return cloneElement(children, {
    onClick: () => open(nameOfTheWindowToOpen),
  });
}
function Window({ children, name }) {
  const ref = useRef();
  const { openWindow, close } = useContext(modalContext);
  // handling clicking outside :)
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    }
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [close]);
  //****** */
  if (name !== openWindow) {
    return null;
  }
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <XMarkIcon />
        </Button>
        <div>{cloneElement(children, { onClose: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
}
Modal.Open = Open;
Modal.Window = Window;
export default Modal;
