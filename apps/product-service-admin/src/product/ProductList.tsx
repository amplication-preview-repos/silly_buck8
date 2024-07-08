import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  TextField,
  DateField,
  BooleanField,
} from "react-admin";
import Pagination from "../Components/Pagination";

export const ProductList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Products"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <TextField label="ID" source="id" />
        <DateField source="createdAt" label="Created At" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="description" source="description" />
        <TextField label="code" source="code" />
        <TextField label="externalCode" source="externalCode" />
        <BooleanField label="archived" source="archived" />
        <TextField label="pathName" source="pathName" />
        <BooleanField label="vatEnabled" source="vatEnabled" />
        <BooleanField label="useParentVat" source="useParentVat" />
        <TextField label="images" source="images" />
        <TextField label="minPrice" source="minPrice" />
        <TextField label="buyPrice" source="buyPrice" />
        <TextField label="barcodes" source="barcodes" />
        <TextField label="attributes" source="attributes" />
        <TextField label="article" source="article" />
        <TextField label="weight" source="weight" />
        <TextField label="volume" source="volume" />
        <TextField label="meta" source="meta" />
        <TextField label="start" source="start" />
        <TextField label="end" source="end" />
        <TextField label="day" source="day" />
        <TextField label="price" source="price" />
        <TextField label="accountId" source="accountId" />
        <BooleanField label="shared" source="shared" />
        <TextField label="updated" source="updated" />
        <TextField label="name" source="name" />
        <TextField label="effectiveVat" source="effectiveVat" />
        <BooleanField
          label="effectiveVatEnabled"
          source="effectiveVatEnabled"
        />
        <TextField label="vat" source="vat" />
        <TextField label="salePrices" source="salePrices" />
      </Datagrid>
    </List>
  );
};
