import { useState } from "react";
import {useForm, Controller, FieldValues, FieldError} from "react-hook-form";
import useItems from "../api/useItems";
import ComboBox, { Item } from "./Combobox";
import Input from "./Input";
import Button from "./Button.tsx";

//Step 4: Form
const Form = () => {
  const [selectedUniversity, setSelectedUniversity] = useState("");

  //Step 2: Dynamic input
  const { control, handleSubmit, reset, formState: { errors } } = useForm();

  const {data: universities, isLoading, error: fetchError} = useItems(selectedUniversity);

  const onSubmit = (data: FieldValues) => {
    alert(`Jméno: ${data.firstName}\nUniverzita: ${selectedUniversity || "nevyplněno"}`);

    reset()
    setSelectedUniversity("")
  };

  const handleSelectUniversity = (item: Item) => {
    setSelectedUniversity(item.name);
  };

  return (
    <form className="space-y-8 border border-gray-500 px-4 py-8 rounded-xl bg-white shadow-md" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <Controller
          name="firstName"
          control={control}
          rules={{ required: "Toto pole je povinné" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Vaše křestní jméno"
              id="firstName"
              placeholder="Křestní jméno"
              value={value}
              onBlur={onBlur}
              onSearch={onChange}
              error={errors.firstName as FieldError}
            />
          )}
        />
        <Controller
          name="university"
          control={control}
          render={({ field }) => (
            <ComboBox
              {...field}
              label="Univerzita, na kterou chodíte"
              id="university"
              placeholder="Univerzita"
              items={universities || []}
              onSelect={handleSelectUniversity}
              search={selectedUniversity}
              onSearch={setSelectedUniversity}
              error={errors.university as FieldError}
              isLoading={isLoading}
              fetchError={fetchError}
            />
          )}
        />
      </div>

      <Button type="submit" className="w-full">
        Odeslat
      </Button>
    </form>
  );
};

export default Form;