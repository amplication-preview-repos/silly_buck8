import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  BooleanInput,
  NumberInput,
  DateTimeInput,
} from "react-admin";

export const ProductCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="description" multiline source="description" />
        <TextInput label="code" source="code" />
        <TextInput label="externalCode" source="externalCode" />
        <BooleanInput label="archived" source="archived" />
        <TextInput label="pathName" source="pathName" />
        <BooleanInput label="vatEnabled" source="vatEnabled" />
        <BooleanInput label="useParentVat" source="useParentVat" />
        <div />
        <NumberInput label="minPrice" source="minPrice" />
        <NumberInput label="buyPrice" source="buyPrice" />
        <div />
        <div />
        <TextInput label="article" source="article" />
        <NumberInput label="weight" source="weight" />
        <NumberInput label="volume" source="volume" />
        <div />
        <DateTimeInput label="start" source="start" />
        <DateTimeInput label="end" source="end" />
        <TextInput label="day" source="day" />
        <NumberInput label="price" source="price" />
        <TextInput label="accountId" source="accountId" />
        <BooleanInput label="shared" source="shared" />
        <DateTimeInput label="updated" source="updated" />
        <TextInput label="name" source="name" />
        <NumberInput step={1} label="effectiveVat" source="effectiveVat" />
        <BooleanInput
          label="effectiveVatEnabled"
          source="effectiveVatEnabled"
        />
        <NumberInput step={1} label="vat" source="vat" />
        <div />
      </SimpleForm>
    </Create>
  );
};
