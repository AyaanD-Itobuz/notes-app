import zod from 'zod';

export const userLoginSchema = zod.object({
    body : zod.object({
        email : zod.string().email(),
        password: zod
            .string()
            .min(6)
            .refine(value => /[A-Z]/.test(value), {
                message: 'Password must contain at least one uppercase letter',
            })
            .refine(value => /[0-9]/.test(value), {
                message: 'Password must contain at least one number',
            })
            .refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
                message: 'Password must contain at least one special character',
            })
    })
})