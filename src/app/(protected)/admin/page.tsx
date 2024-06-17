'use client'

import { UserRole } from '@prisma/client'

import { admin } from '@/actions/admin'
import RoleGate from '@/components/auth/role-gate'
import FormSuccess from '@/components/form-success'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

function AdminPage() {
	function onApiRouteClick() {
		fetch('/api/admin').then((res) => {
			if (res.ok) {
				toast.success('Allowed API route!')
			} else {
				toast.error('Forbidden API route!')
			}
		})
	}

	function onServerActionClick() {
		admin().then((res) => {
			if (res.success) {
				toast.success(res.success)
			} else {
				toast.error(res.error)
			}
		})
	}

	return (
		<Card className="w-[600px]">
			<CardHeader>
				<p className="text-center text-2xl font-semibold">🔑 Admin</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<RoleGate allowedRole={UserRole.ADMIN}>
					<FormSuccess message="You are now an admin." />
				</RoleGate>
				<div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">Admin-only API Route</p>
					<Button onClick={onApiRouteClick}>Click to test</Button>
				</div>

				<div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">Admin-only Server Action</p>
					<Button onClick={onServerActionClick}>Click to test</Button>
				</div>
			</CardContent>
		</Card>
	)
}

export default AdminPage
