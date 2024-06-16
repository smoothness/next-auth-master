'use client'

import React from 'react'

import { logout } from '@/actions/logout'

interface LogoutButtonProps {
	children?: React.ReactNode
}

function LogoutButton({ children }: LogoutButtonProps) {
	function onClick() {
		logout()
	}

	return (
		<span onClick={onClick} className="inline-block cursor-pointer">
			{children}
		</span>
	)
}

export default LogoutButton
