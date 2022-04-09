import { DateTimeFilter } from "../../util/DateTimeFilter";
import { StringFilter } from "../../util/StringFilter";
import { IntFilter } from "../../util/IntFilter";

export type InvoiceWhereInput = {
  actualDate?: DateTimeFilter;
  id?: StringFilter;
  vendorId?: IntFilter;
};
