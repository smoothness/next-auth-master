import { ExtendedUser } from '$/next-auth'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface UserInfoProps {
	user?: ExtendedUser
	label: string
}

function UserInfo({ user, label }: UserInfoProps) {
	return (
		<Card>
			<CardHeader className="w-[600px]">
				<p className="text-center text-2xl font-semibold">{label}</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<span className="text-sm font-medium">ID</span>
					<span className="max-w-[200px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
						{user?.id}
					</span>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<span className="text-sm font-medium">Name</span>
					<span className="max-w-[200px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
						{user?.name}
					</span>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<span className="text-sm font-medium">Email</span>
					<span className="max-w-[200px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
						{user?.email}
					</span>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<span className="text-sm font-medium">Role</span>
					<span className="max-w-[200px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
						{user?.role}
					</span>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<span className="text-sm font-medium">Two Factor Authentication</span>
					<Badge variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}>
						{user?.isTwoFactorEnabled ? 'Enabled' : 'Disabled'}
					</Badge>
				</div>
			</CardContent>
		</Card>
	)
}

export default UserInfo
