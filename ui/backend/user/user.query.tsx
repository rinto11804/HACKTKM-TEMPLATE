import { useMutation } from '@tanstack/react-query'
import { createProducer, login } from './user.api'
import { showNotification } from '@mantine/notifications'


export function useLogin() {
    return useMutation({
        mutationFn: ({ email }: { email: string }) => login(email),
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
export function useRegister() {
    return useMutation({
        mutationFn: ({ name, email }: { name: string, email: string }) => createProducer(name, email),
        onSuccess: () => {
            showNotification({ message: "User registered successfully", color: "green" })
        },
        onError: (error) => {
            showNotification({ message: error.message, color: "red" })
        }
    })
}