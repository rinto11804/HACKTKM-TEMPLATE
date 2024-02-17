import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAssets, getAssetsByProducerId, postAssets } from './asset.api';
import { showNotification } from '@mantine/notifications';

export function useAllAssets() {
    return useQuery({
        queryKey: ["all-assets"],
        queryFn: getAssets
    })
}

export function usePostAssets() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: postAssets,
        onSuccess: () => {
            showNotification({ message: "Asset created successfully", color: "green" })
            queryClient.invalidateQueries({ queryKey: ["all-assets"] })
        },
        onError: (error) => {
            showNotification({ message: error.message, color: "red" })
        }
    })
}

export function useAllAssetsByProducerId(producerId = JSON.parse(localStorage.getItem("user") as string)?.id) {
    return useQuery({
        queryKey: ["all-assets", producerId],
        queryFn: () => getAssetsByProducerId(producerId)
    })
}