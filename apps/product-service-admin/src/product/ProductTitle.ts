import { Product as TProduct } from "../api/product/Product";

export const PRODUCT_TITLE_FIELD = "pathName";

export const ProductTitle = (record: TProduct): string => {
  return record.pathName?.toString() || String(record.id);
};
