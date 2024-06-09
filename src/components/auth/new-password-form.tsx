'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { NewPasswordSchema } from '@/schemas'
import { newPassword } from '@/actions/new-password'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import CardWrapper from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'

function NewPasswordForm() {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')
	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: '',
		},
	})

	function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
		setError('')
		setSuccess('')

		startTransition(() => {
			newPassword(values, token).then((data) => {
				setError(data?.error)
				setSuccess(data?.success)
			})
		})
	}

	return (
		<CardWrapper
			headerLabel="Enter a new password"
			backButtonLabel="Back to login"
			backButtonHref="/auth/login"
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="password"
											placeholder="********"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type="submit" className="w-full" disabled={isPending}>
						Reset password
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}

export default NewPasswordForm
