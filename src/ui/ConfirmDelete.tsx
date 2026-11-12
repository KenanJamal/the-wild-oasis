import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

interface ConfirmDeleteProps {
  resource: string;
  onConfirm: () => void;
  disabled?: boolean;
  // Injected by Modal.Window
  onClose?: () => void;
}

function ConfirmDelete({
  resource,
  onConfirm,
  disabled,
  onClose,
}: ConfirmDeleteProps) {
  function handleConfirmClick() {
    onConfirm();
  }

  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resource}</Heading>
      <p>Are you sure you want to delete this {resource} permanently?</p>

      <div>
        <Button variation="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variation="danger"
          onClick={handleConfirmClick}
          disabled={disabled}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
