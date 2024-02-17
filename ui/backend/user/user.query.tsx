import { useMutation } from '@tanstack/react-query'
import { createProducer, getUserByEmailAndPassword } from './user.api'
import { showNotification } from '@mantine/notifications'


export function useLogin() {
    return useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => getUserByEmailAndPassword(email, password),
        onSuccess: (data) => {
            showNotification({ message: "Logged in successfully", color: "green" })
            console.log(data)
            localStorage.setItem("user", JSON.stringify(data.data.data))
        },
        onError: (error) => {
            showNotification({ message: error.message, color: "red" })
        }
    })
}
export function useCreateProducer() {
    return useMutation({
        mutationFn: ({ name, email, password }: { name: string, email: string, password: string }) => createProducer(name, email, password),
        onSuccess: () => {
            showNotification({ message: "Producer created successfully", color: "green" })
        },
        onError: (error) => {
            showNotification({ message: error.message, color: "red" })
        }
    })
}