'use client'

import { logout } from '@/actions/logout'
import { useCurrentUser } from '@/hooks/use-current-user'

function DashboardPage() {
	const user = useCurrentUser()

	const onClick = () => {
		logout()
	}

	return (
		<div className="rounded-xl bg-white p-10">
			<button onClick={onClick} type="submit">
				Sign Out
			</button>
		</div>
	)
}

export default DashboardPage
