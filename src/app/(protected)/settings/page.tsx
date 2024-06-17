'use client'

import { useState, useTransition } from 'react'
import { useSession } from 'next-auth/react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { UserRole } from '@prisma/client'

import { SettingsSchema } from '@/schemas'
import { settings } from '@/actions/settings'
import { useCurrentUser } from '@/hooks/use-current-user'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormField,
	FormControl,
	FormItem,
	FormLabel,
	FormDescription,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import FormSuccess from '@/components/form-success'
import FormError from '@/components/form-error'

function SettingsPage() {
	const user = useCurrentUser()
	const [error, setError] = useState<string | undefined>()
	const [success, setSuccess] = useState<string | undefined>()
	// update session from client
	const { update } = useSession()
	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof SettingsSchema>>({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			name: user?.name || undefined,
			email: user?.email || undefined,
			password: undefined,
			newPassword: undefined,
			role: user?.role || undefined,
			isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
		},
	})

	function onSubmit(values: z.infer<typeof SettingsSchema>) {
		startTransition(() => {
			settings(values)
				.then((data) => {
					if (data.error) {
						setError(data.error)
					}

					if (data.success) {
						update()
						setSuccess(data.success)
					}
				})
				.catch(() => setError('Something went wrong!'))
		})
		//: TODO: remove previous success or error messages on page
	}
	return (
		<Card className="w-[600px]">
			<CardHeader>
				<p className="text-center text-2xl font-semibold">⚙️ Settings</p>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="space-y-4">
							<FormField
								name="name"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Jhon Doe"
												disabled={isPending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{!user?.isOauth && (
								<>
									<FormField
										name="email"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="jhon.doe@example.com"
														type="email"
														disabled={isPending}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										name="password"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="********"
														type="password"
														disabled={isPending}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										name="newPassword"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>New Password</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="********"
														type="password"
														disabled={isPending}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</>
							)}
							<FormField
								name="role"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<Select
											disabled={isPending}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a role" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
												<SelectItem value={UserRole.USER}>User</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							{!user?.isOauth && (
								<FormField
									name="isTwoFactorEnabled"
									control={form.control}
									render={({ field }) => (
										<FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
											<div className="space-y-0.5">
												<FormLabel>Two-factor authentication</FormLabel>
												<FormDescription>
													Enable two-factor authentication
												</FormDescription>
											</div>
											<FormControl>
												<Switch
													disabled={isPending}
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							)}
						</div>
						<FormSuccess message={success} />
						<FormError message={error} />
						<Button disabled={isPending} type="submit">
							Save
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export default SettingsPage
