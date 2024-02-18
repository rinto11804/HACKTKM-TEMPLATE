import { customAxios } from "..";

const PRODUCT_BASE_PATH = "/product";

export async function getProducts() {
  return (await customAxios.get(PRODUCT_BASE_PATH)).data.data as Product[];
}

export async function getProductById(id: string) {
  return (await customAxios.get(`${PRODUCT_BASE_PATH}/${id}`)).data
    .data as ProduceDetailed;
}

export async function getJsonForHistoryByProductId(id: string) {
  return (await customAxios.get(`${PRODUCT_BASE_PATH}/price/${id}`)).data
    .data as {
    district: string;
    data: {
      date: string;
      price: string;
    }[];
  }[];
}
