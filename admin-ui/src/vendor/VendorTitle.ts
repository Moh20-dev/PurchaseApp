import { Vendor as TVendor } from "../api/vendor/Vendor";

export const VENDOR_TITLE_FIELD = "name";

export const VendorTitle = (record: TVendor): string => {
  return record.name || record.id;
};
