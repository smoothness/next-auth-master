'use client'

import { UserRole } from '@prisma/client'

import { useCurrentRole } from '@/hooks/use-current-role'
import FormError from '@/components/form-error'

interface RoleGateProps {
	children: React.ReactNode
	allowedRole: UserRole
}

function RoleGate({ children, allowedRole }: RoleGateProps) {
	const role = useCurrentRole()

	if (role !== allowedRole) {
		return <FormError message="You are not authorized to access this page." />
	}

	return <>{children}</>
}

export default RoleGate
