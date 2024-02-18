import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInventoryByUserId,
  getInventoriesByUserId,
  updateInventoryById,
} from "./inventory.api";
import { showNotification } from "@mantine/notifications";

export function useInventoriesByUserId(id: string) {
  return useQuery({
    queryKey: ["inventories", id],
    queryFn: () => getInventoriesByUserId(id),
    enabled: !!id,
  });
}

export function useUpdateInventoryById(id: string) {
  return useMutation({
    mutationFn: (data: Partial<Inventory>) => updateInventoryById(id, data),
    onSuccess: () => {
      showNotification({
        message: "Inventory updated successfully",
        color: "green",
      });
    },
    onError: (error) => {
      showNotification({ message: error.message, color: "red" });
    },
  });
}

export function useAddInventoryByUserId(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Inventory>) => createInventoryByUserId(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventories", id],
      });
      showNotification({
        message: "Inventory added successfully",
        color: "green",
      });
    },
    onError: (error) => {
      showNotification({ message: error.message, color: "red" });
    },
  });
}
