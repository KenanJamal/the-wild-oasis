import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useEditSettings } from "./useEditSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    error,
    settings: {
      minBookingLength,
      maxBookingLeng,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isEditing, updateSettings } = useEditSettings();
  if (isLoading) return <Spinner />;
  function handleChangedSetting(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSettings({ [field]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isEditing}
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleChangedSetting(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isEditing}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLeng}
          onBlur={(e) => handleChangedSetting(e, "maxBookingLeng")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isEditing}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleChangedSetting(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isEditing}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleChangedSetting(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
