import { customAxios } from "..";

const INVENTORY_BASE_PATH = "/inventory";

export async function getInventoriesByUserId(id: string) {
  return (await customAxios.get(`${INVENTORY_BASE_PATH}/${id}`)).data
    .data as Inventory[];
}

export async function updateInventoryById(
  id: string,
  data: Partial<Inventory>
) {
  data = { ...data, id };
  return await customAxios.put(`${INVENTORY_BASE_PATH}/${id}`, data);
}

export async function createInventoryByUserId(
  id: string,
  data: Partial<Inventory>
) {
  data = { ...data, user_id: id };
  return await customAxios.post(`${INVENTORY_BASE_PATH}`, data);
}
