import { customAxios } from "..";

export async function getUserByEmailAndPassword(
  email: string,
  password: string
) {
  return await customAxios.post("/login", { email, password });
}

//producer user BASE_URL
const PRODUCER_BASE_PATH = "/producer";

export async function createProducer(
  name: string,
  email: string,
  password: string
) {
  return await customAxios.post(PRODUCER_BASE_PATH, { name, email, password });
}
