import { customAxios } from "..";

const USER_BASE_URL = "/user";

export async function login(email: string) {
  return await customAxios.post(`${USER_BASE_URL}/login`, {
    email,
  });
}

//producer user BASE_URL

export async function createProducer(
  name: string,
  email: string,
  profile_pic: string = "https://images.unsplash.com/photo-1505471768190-275e2ad7b3f9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  role: "FARMER" = "FARMER"
) {
  return await customAxios.post(`${USER_BASE_URL}/register`, {
    name,
    email,
    profile_pic,
    role,
  });
}

export async function getUserById(id: string) {
  return (await customAxios.get(`${USER_BASE_URL}/${id}`)).data.data as User;
}
