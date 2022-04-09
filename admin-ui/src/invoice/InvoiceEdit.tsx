import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  DateTimeInput,
  NumberInput,
} from "react-admin";

export const InvoiceEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <DateTimeInput label="ActualDate" source="actualDate" />
        <NumberInput step={1} label="VendorID" source="vendorId" />
      </SimpleForm>
    </Edit>
  );
};
