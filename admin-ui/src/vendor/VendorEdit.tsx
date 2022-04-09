import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const VendorEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Name" source="name" />
      </SimpleForm>
    </Edit>
  );
};
