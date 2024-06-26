import { newPassword } from '@/actions/new-password'
import { UserRole } from '@prisma/client'
import * as z from 'zod'

export const LoginSchema = z.object({
	email: z.string().email({ message: 'Email is required' }),
	password: z.string().min(1, { message: 'Password is required' }),
	code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	email: z.string().email({ message: 'Email is required' }),
	password: z.string().min(8, { message: 'Minimum 8 characters required' }),
})

export const ResetSchema = z.object({
	email: z.string().email({ message: 'Email is required' }),
})

export const NewPasswordSchema = z.object({
	password: z.string().min(8, { message: 'Minimum 8 characters required' }),
})

export const SettingsSchema = z
	.object({
		name: z.optional(z.string()),
		email: z.optional(z.string().email()),
		isTwoFactorEnabled: z.optional(z.boolean()),
		role: z.enum([UserRole.ADMIN, UserRole.USER]),
		password: z.optional(z.string().min(8)),
		newPassword: z.optional(z.string().min(8)),
	})
	.refine(
		(data) => {
			if (data.password && !data.newPassword) return false
			return true
		},
		{ message: 'New Password is required', path: ['newPassword'] }
	)
	.refine(
		(data) => {
			if (!data.password && data.newPassword) return false
			return true
		},
		{ message: 'Password is required', path: ['password'] }
	)
	.refine(
		(data) => {
			if (data.password && data.newPassword && data.password.length < 8)
				return false

			return true
		},
		{ message: 'Password must be at least 8 characters', path: ['password'] }
	)
// .refine(
// 	(data) => {
// 		if (
// 			data.password &&
// 			data.newPassword &&
// 			data.password !== data.newPassword
// 		)
// 			return false

// 		return true
// 	},
// 	{ message: 'Passwords must match', path: ['password', 'newPassword'] }
// )
