import { useQuery } from "@tanstack/react-query";
import {
  getJsonForHistoryByProductId,
  getProductById,
  getProducts,
} from "./product.api";
import { getUserById } from "../user/user.api";

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}

export function useGetProductById(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}

export function useGetUserById(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
}

export function useGetJsonForHistoryByProductId(id: string) {
  return useQuery({
    queryKey: ["history"],
    queryFn: () => getJsonForHistoryByProductId(id),
    enabled: !!id,
  });
}
