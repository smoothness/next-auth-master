'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import UserInfo from '@/components/user-info'

function ServerPage() {
	const user = useCurrentUser()

	return <UserInfo user={user} label="🖥️ Client Component" />
}

export default ServerPage
