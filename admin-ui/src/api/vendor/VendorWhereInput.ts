import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type VendorWhereInput = {
  id?: StringFilter;
  name?: StringNullableFilter;
};
