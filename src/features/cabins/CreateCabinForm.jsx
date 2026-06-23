import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { is } from "date-fns/locale";

function CreateCabinForm({ editingCabin = {} }) {
  const { id: editId, ...editValues } = editingCabin;
  const isEdiiting = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEdiiting ? editValues : {},
  });
  const queryClient = useQueryClient();
  const { errors } = formState;
  const {
    mutate: editCabin,

    isLoading: isEditing,
  } = useMutation({
    mutationFn: ({ newCabinData, id }) => insertCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const {
    mutate: createCabin,

    isLoading: isCreating,
  } = useMutation({
    mutationFn: insertCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const isWorking = isCreating || isEditing;
  function handleSubmitForm(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (!isEdiiting) createCabin({ ...data, image });
    else {
      editCabin({ newCabinData: { ...data, image }, id: editId });
    }
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(handleSubmitForm, onError)}>
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
            required: "This field is required",
            min: {
              value: 200,
              message: "Price should be at least 200",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
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
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Image" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={isWorking}
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="button" type="reset">
          Cancel
        </Button>
        <Button variation="primary" disabled={isWorking}>
          {isEdiiting ? "Update Cabin" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
