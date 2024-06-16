'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import UserButton from '@/components/auth/user-button'

export function Navbar() {
	const pathnmame = usePathname()

	return (
		<nav className="flex w-[600px] items-center justify-between rounded-xl bg-secondary p-4 shadow-sm">
			<div className="flex gap-x-2">
				{/* server component example */}
				<Button
					asChild
					variant={pathnmame === '/server' ? 'default' : 'outline'}
				>
					<Link href="/server">Server</Link>
				</Button>

				{/* client component example */}
				<Button
					asChild
					variant={pathnmame === '/client' ? 'default' : 'outline'}
				>
					<Link href="/client">Client</Link>
				</Button>

				<Button
					asChild
					variant={pathnmame === '/admin' ? 'default' : 'outline'}
				>
					<Link href="/admin">Admin</Link>
				</Button>

				<Button
					asChild
					variant={pathnmame === '/dashboard' ? 'default' : 'outline'}
				>
					<Link href="/dashboard">Dashboard</Link>
				</Button>
			</div>
			<UserButton />
		</nav>
	)
}
