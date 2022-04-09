import { SortOrder } from "../../util/SortOrder";

export type InvoiceOrderByInput = {
  actualDate?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  updatedAt?: SortOrder;
  vendorId?: SortOrder;
};
