'use client'

import React from 'react'

import { logout } from '@/actions/logout'

interface ButtonProps {
	children?: React.ReactNode
}

function LogoutButton({ children }: ButtonProps) {
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
