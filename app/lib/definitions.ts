import { z } from 'zod';

export const SignupFormSchema = z.object({
    name: z.string().min(2, { error: "Name must be at least two characters long!" }).trim(),
    email: z.email({ error: "Please enter a valid email." }).trim(),
    password: z.string().min(8, { error: "Password must be at least 8 characters long." })
        .regex(/[a-zA-Z]/, { error: "Must contain one letter" })
        .regex(/[0-9]/, { error: "Must contain one number" })
        .regex(/[^a-zA-Z0-9]/, {
            error: "Must contain one special character."
        })
        .trim()
})

export type FormState = {
    errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
    }
    message?: string
}
    | undefined