import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  DateTimeInput,
  NumberInput,
} from "react-admin";

export const InvoiceCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <DateTimeInput label="ActualDate" source="actualDate" />
        <NumberInput step={1} label="VendorID" source="vendorId" />
      </SimpleForm>
    </Create>
  );
};
