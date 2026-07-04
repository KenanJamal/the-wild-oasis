import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreatCabinForm from "./CreateCabinForm.jsx";
import { useDeleteCabin } from "./useDeleteCabin.js";
import {
  DocumentDuplicateIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { useCreateCabin } from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";
// v1

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabinMutation } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const { id, name, image, maxCapacity, regularPrice, discount } = cabin;
  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
    });
  }
  return (
    <>
      <Table.Row>
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount}%</Discount>
        <div>
          <Modal>
            <Modal.Open opens={`edit-cabin`}>
              <button>
                <PencilIcon style={{ width: "1.8rem", height: "1.8rem" }} />
              </button>
            </Modal.Open>
            <Modal.Window name={`edit-cabin`}>
              <CreatCabinForm editingCabin={cabin} />
            </Modal.Window>
            <Modal.Open opens={`delete-cabin`}>
              <button>
                <TrashIcon
                  style={{
                    width: "1.8rem",
                    height: "1.8rem",
                    color: "var(--color-red-700)",
                  }}
                />
              </button>
            </Modal.Open>
            <Modal.Window name={`delete-cabin`}>
              <ConfirmDelete
                resource="cabins"
                onConfirm={() => deleteCabinMutation(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
          <button disabled={isCreating} onClick={() => handleDuplicate()}>
            <DocumentDuplicateIcon
              style={{ width: "1.8rem", height: "1.8rem" }}
            />
          </button>
        </div>
      </Table.Row>
    </>
  );
}
export default CabinRow;
