import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { useEditCabins } from "./useEditCabins";
import { useCreateCabin } from "./useCreateCabin";

function CreateCabinForm({ editingCabin = {}, onClose }) {
  const { editCabin, isEditing } = useEditCabins();
  const { createCabin, isCreating } = useCreateCabin();
  const { id: editId, ...editValues } = editingCabin;
  const isWorking = isCreating || isEditing;

  const edittingSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: edittingSession ? editValues : {},
  });
  const { errors } = formState;
  function handleSubmitForm(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (!edittingSession)
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            onClose?.();
            reset();
          },
        },
      );
    else {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            onClose?.();
            reset();
          },
        },
      );
    }
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form
      type={onClose ? "modal" : "regular"}
      onSubmit={handleSubmit(handleSubmitForm, onError)}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",

            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: edittingSession ? false : "This field is required",
            min: {
              value: 200,
              message: "Price should be at least 200",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount Percentage" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register("discount", {
            required: edittingSession ? false : "This field is required",
            validate: (value) =>
              value < 100 || "Discount should be less than 100 %",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          disabled={isWorking}
          {...register("description", {
            required: edittingSession ? false : "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Image" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={isWorking}
          {...register("image", {
            required: edittingSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          onClick={() => {
            onClose?.();
          }}
          variation="secondary"
          type="button"
          type="reset"
        >
          Cancel
        </Button>
        <Button variation="primary" disabled={isWorking}>
          {edittingSession ? "Update Cabin" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
